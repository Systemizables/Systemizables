// Draws text as outlines, so every visitor sees the same typefaces.
// An image in a README cannot load a font, and a font it names is only used
// where the visitor happens to have it installed.

import { readFileSync } from 'node:fs';
import opentype from 'opentype.js';

function loadFont(fileName) {
  const file = readFileSync(new URL(`../assets/fonts/${fileName}`, import.meta.url));
  return opentype.parse(file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength));
}

export const fonts = {
  display: loadFont('Gloock-Regular.ttf'),
  body: loadFont('DMSans-Regular.ttf'),
  mono: loadFont('RedHatMono-Regular.ttf'),
  monoBold: loadFont('RedHatMono-SemiBold.ttf'),
};

function options(size, spacing) {
  return { kerning: true, letterSpacing: spacing / size };
}

// The width of a piece of text in pixels. `spacing` is extra space between letters, in pixels.
export function textWidth(font, text, size, spacing = 0) {
  return font.getAdvanceWidth(text, size, options(size, spacing)) - spacing;
}

// A <path> that draws `text` with its baseline at `y`.
// `anchor` is 'start' (x is the left edge) or 'end' (x is the right edge).
export function drawText(font, text, { x, y, size, fill, spacing = 0, anchor = 'start', attributes = '' }) {
  for (const character of text) {
    if (character !== ' ' && font.charToGlyph(character).index === 0) {
      throw new Error(`The font ${font.names.fullName.en} has no glyph for "${character}".`);
    }
  }
  const left = anchor === 'end' ? x - textWidth(font, text, size, spacing) : x;
  const path = font.getPath(text, left, y, size, options(size, spacing));
  return `<path${attributes ? ` ${attributes}` : ''} fill="${fill}" d="${path.toPathData(1)}"/>`;
}
