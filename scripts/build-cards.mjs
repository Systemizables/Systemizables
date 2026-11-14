// Builds the images the README uses below the header, each in a dark and a light version:
//   assets/cards/heading-*.svg   section headings
//   assets/cards/project-*.svg   the banner above each current project
//   assets/cards/earlier-*.svg   the cards for the earlier projects
//   assets/cards/footer-*.svg    the closing row of dots
//
// Run it again after changing any of the text below:
//   node scripts/build-cards.mjs

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { themes, escapeXml } from './theme.mjs';
import { fonts, drawText, textWidth } from './text.mjs';

const HEADINGS = [
  { slug: 'working-on', text: "What I'm working on" },
  { slug: 'earlier', text: 'Earlier projects' },
];

// `logoHeight` is how tall the logo is drawn. `wordmark` is set when the logo does not spell the name.
const PROJECTS = [
  {
    slug: 'simly',
    name: 'Simly',
    logo: 'simly',
    logoHeight: 30,
    role: 'Full-stack software engineer',
    stack: ['TypeScript', 'Node.js', 'Express', 'MongoDB', 'GraphQL'],
  },
  {
    slug: 'yallahjoz',
    name: 'YallaHjoz',
    logo: 'yallahjoz',
    logoHeight: 46,
    wordmark: 'YallaHjoz',
    role: 'Table bookings for Zahle',
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    slug: 'jay',
    name: 'Jay',
    logo: 'jay',
    logoHeight: 16,
    wordmark: 'Jay',
    role: 'Private AI operator',
    stack: ['TypeScript', 'NestJS', 'Next.js', 'PostgreSQL', 'Docker'],
  },
];

const EARLIER = [
  {
    slug: 'jobportal',
    name: 'JobPortal',
    lines: ['Spring Boot job board API', 'with JWT auth and MongoDB'],
    language: 'Java',
  },
  {
    slug: 'election',
    name: 'Election analysis predictor',
    lines: ['Zahle election data: turnout,', 'coalitions and forecasts'],
    language: 'Python',
  },
  {
    slug: 'sports',
    name: 'Sports analysis app',
    lines: ['NBA and football stats, scraped', 'and ranked into a GOAT list'],
    language: 'HTML',
  },
  {
    slug: 'agricrop',
    name: 'AgriCrop',
    lines: ['A community site where farmers', 'advertise their produce'],
    language: 'HTML',
  },
];

function panel(theme, width, height) {
  return `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${theme.bgFrom}"/>
      <stop offset="1" stop-color="${theme.bgTo}"/>
    </linearGradient>
  </defs>
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="12" fill="url(#bg)" stroke="${theme.border}"/>`;
}

function svg(width, height, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeXml(title)}">
  <title>${escapeXml(title)}</title>
  ${body}
</svg>
`;
}

// A section heading: the olive square from the header, then the title in spaced capitals.
// It sits straight on the page, so it has no panel behind it.
function buildHeading(theme, heading) {
  const text = heading.text.toUpperCase();
  const size = 13;
  const spacing = 2.4;
  const width = Math.ceil(22 + textWidth(fonts.monoBold, text, size, spacing));
  return svg(
    width,
    22,
    heading.text,
    `<rect x="0" y="6" width="10" height="10" fill="${theme.accent}"/>
  ${drawText(fonts.monoBold, text, { x: 22, y: 16, size, spacing, fill: theme.pageText })}`,
  );
}

// Places a logo file inside a card, at a given height, keeping its proportions.
async function embedLogo(name, themeName, x, centreY, height) {
  const file = new URL(`../assets/logos/${name}-${themeName}.svg`, import.meta.url);
  const source = await readFile(file, 'utf8');
  const [, attributes, inner] = source.match(/<svg([^>]*)>([\s\S]*)<\/svg>/);
  const viewBox = attributes.match(/viewBox="([^"]+)"/)[1];
  const [, , boxWidth, boxHeight] = viewBox.split(/\s+/).map(Number);
  const width = (height * boxWidth) / boxHeight;
  const fill = attributes.match(/\sfill="([^"]+)"/);
  return {
    width,
    markup: `<svg x="${x}" y="${centreY - height / 2}" width="${width.toFixed(1)}" height="${height}" viewBox="${viewBox}"${fill ? ` fill="${fill[1]}"` : ''}>${inner}</svg>`,
  };
}

async function buildProject(theme, themeName, project) {
  const width = 840;
  const height = 100;
  const logo = await embedLogo(project.logo, themeName, 28, 34, project.logoHeight);
  const wordmark = project.wordmark
    ? drawText(fonts.display, project.wordmark, { x: 28 + logo.width + 12, y: 44, size: 28, fill: theme.text })
    : '';
  return svg(
    width,
    height,
    `${project.name}: ${project.role}. ${project.stack.join(', ')}.`,
    `${panel(theme, width, height)}
  ${logo.markup}
  ${wordmark}
  ${drawText(fonts.monoBold, project.role.toUpperCase(), { x: width - 28, y: 39, size: 11, spacing: 1.6, anchor: 'end', fill: theme.secondary })}
  <line x1="28" y1="66" x2="${width - 28}" y2="66" stroke="${theme.rule}"/>
  ${drawText(fonts.mono, project.stack.join(' · '), { x: 28, y: 85, size: 12, fill: theme.accentText })}`,
  );
}

function buildEarlier(theme, project) {
  const width = 412;
  const height = 132;
  const lines = project.lines
    .map((line, index) =>
      drawText(fonts.body, line, { x: 24, y: 66 + index * 18, size: 13, fill: theme.secondary }),
    )
    .join('\n  ');
  const arrowRight = width - 24;
  return svg(
    width,
    height,
    `${project.name}: ${project.lines.join(' ')}. ${project.language}.`,
    `${panel(theme, width, height)}
  ${drawText(fonts.display, project.name, { x: 24, y: 40, size: 21, fill: theme.text })}
  ${lines}
  <rect x="24" y="103" width="8" height="8" fill="${theme.accent}"/>
  ${drawText(fonts.mono, project.language.toUpperCase(), { x: 40, y: 111, size: 11, spacing: 1, fill: theme.muted })}
  <path d="M${arrowRight - 13} 107h13m-4-4l4 4l-4 4" fill="none" stroke="${theme.muted}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  );
}

// The closing row of dots: dim at the edges, bright in the middle.
function buildFooter(theme) {
  const width = 840;
  const count = 37;
  const step = 22;
  const first = (width - (count - 1) * step) / 2;
  const middle = (count - 1) / 2;
  const dots = [];
  for (let index = 0; index < count; index += 1) {
    const closeness = 1 - Math.abs(index - middle) / middle;
    const level = Math.min(4, Math.floor(closeness * 5));
    dots.push(`<circle cx="${first + index * step}" cy="12" r="3.5" fill="${theme.levels[level]}"/>`);
  }
  return svg(width, 24, 'A row of dots', dots.join(''));
}

const directory = fileURLToPath(new URL('../assets/cards/', import.meta.url));
await mkdir(directory, { recursive: true });

let count = 0;
for (const [themeName, theme] of Object.entries(themes)) {
  const files = new Map();
  for (const heading of HEADINGS) files.set(`heading-${heading.slug}`, buildHeading(theme, heading));
  for (const project of PROJECTS) {
    files.set(`project-${project.slug}`, await buildProject(theme, themeName, project));
  }
  for (const project of EARLIER) files.set(`earlier-${project.slug}`, buildEarlier(theme, project));
  files.set('footer', buildFooter(theme));

  for (const [name, content] of files) {
    await writeFile(`${directory}${name}-${themeName}.svg`, content);
    count += 1;
  }
}
console.log(`Wrote ${count} images to assets/cards/`);
