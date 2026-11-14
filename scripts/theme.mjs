// Colours shared by the generated profile images.
// Every image is built twice, once per GitHub colour scheme.

export const themes = {
  dark: {
    bgFrom: '#191C1B',
    bgTo: '#252D27',
    border: '#373C38',
    text: '#F1F2ED',
    pageText: '#C9CEC6',
    secondary: '#ABB0AA',
    muted: '#7F867F',
    accent: '#7E8E5F',
    accentText: '#9AA77F',
    rule: '#2C332E',
    // Contributions in a day, from none to many: one hue, dim to bright.
    levels: ['#343C35', '#4D5C3E', '#6F7F52', '#96A674', '#C9D5A6'],
  },
  light: {
    bgFrom: '#F6F7F2',
    bgTo: '#E9ECE1',
    border: '#D3D8C9',
    text: '#191C1B',
    pageText: '#30362F',
    secondary: '#4A504A',
    muted: '#6E756C',
    accent: '#6B7B4C',
    accentText: '#3B4731',
    rule: '#DCE0D3',
    // Contributions in a day, from none to many: one hue, pale to deep.
    levels: ['#D3D8C8', '#B4C191', '#8E9D6A', '#64744A', '#3B4731'],
  },
};

export function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
