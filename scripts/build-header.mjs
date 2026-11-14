// Builds the profile header: assets/header-dark.svg and assets/header-light.svg.
//
// The dot grid on the right is my contribution calendar for the last twelve weeks:
// one column per week, one dot per day, brighter on busier days. It is the same
// information as the contribution graph GitHub already shows on the profile page,
// with no repository names and no numbers.
//
//   GITHUB_TOKEN=<any GitHub token> node scripts/build-header.mjs

import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { themes, fonts, escapeXml } from './theme.mjs';

const LOGIN = 'Systemizables';
const NAME = 'Joseph Sfeir';
const TAGLINE = 'Software engineer from Zahle, Lebanon';
const LINES = [
  'Full-stack engineer at Simly',
  'Building YallaHjoz, table bookings for Zahle',
  'Building Jay, a private AI operator',
  'Studying Computer & Communications Engineering',
];

const WIDTH = 840;
const HEIGHT = 220;

// The dot field on the right: scattered dots that settle into the calendar, then drift apart again.
const WEEKS = 12;
const GRID = { x: 550, y: 36, stepX: 22, stepY: 21, radius: 3.5 };
const FIELD = { minX: 500, maxX: 816, minY: 20, maxY: 200 };
const LEVELS = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];
const LOOP_SECONDS = 12;
const SECONDS_PER_LINE = 4;

// A fixed seed, so the scatter is the same on every build.
function seededRandom(seed) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

// The last twelve weeks of the contribution calendar, as GitHub draws it:
// weeks from Sunday to Saturday, the current week unfinished.
async function readWeeks() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('Set GITHUB_TOKEN to read the contribution calendar.');

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'profile-header',
    },
    body: JSON.stringify({
      query: `query ($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar { weeks { contributionDays { weekday contributionLevel } } }
          }
        }
      }`,
      variables: { login: LOGIN },
    }),
  });
  const body = await response.json();
  if (!response.ok || body.errors || !body.data?.user) {
    const reason = JSON.stringify(body.errors || body.message || response.status);
    throw new Error(`GitHub did not return the calendar: ${reason}`);
  }
  return body.data.user.contributionsCollection.contributionCalendar.weeks.slice(-WEEKS);
}

function buildDots(weeks, theme) {
  const random = seededRandom(20261114);
  const dots = [];
  weeks.forEach((week, col) => {
    for (const day of week.contributionDays) {
      const row = day.weekday;
      const x = GRID.x + col * GRID.stepX;
      const y = GRID.y + row * GRID.stepY;
      const scatteredX = Math.min(FIELD.maxX, Math.max(FIELD.minX, x + (random() - 0.5) * 150));
      const scatteredY = Math.min(FIELD.maxY, Math.max(FIELD.minY, y + (random() - 0.5) * 110));
      const dx = Math.round(scatteredX - x);
      const dy = Math.round(scatteredY - y);
      const delay = ((col + row) * 0.05).toFixed(2);
      const fill = theme.levels[Math.max(0, LEVELS.indexOf(day.contributionLevel))];
      dots.push(
        `<circle class="dot" cx="${x}" cy="${y}" r="${GRID.radius}" fill="${fill}" style="--dx:${dx}px;--dy:${dy}px;animation-delay:${delay}s"/>`,
      );
    }
  });
  return dots.join('\n    ');
}

function buildLines() {
  return LINES.map((line, index) => {
    const delay = index * SECONDS_PER_LINE;
    return `<text class="line" x="68" y="170" style="animation-delay:${delay}s">${escapeXml(line)}</text>`;
  }).join('\n    ');
}

function buildHeader(theme, weeks) {
  const lineLoop = LINES.length * SECONDS_PER_LINE;
  // Each line is visible for a quarter of the loop when there are four lines.
  const visibleUntil = (100 / LINES.length).toFixed(2);
  const fadedInAt = (12 / LINES.length).toFixed(2);
  const fadeOutFrom = (88 / LINES.length).toFixed(2);
  const description = `${TAGLINE}. ${LINES.join('. ')}. The dot grid is my contribution calendar for the last ${WEEKS} weeks.`;
  const gridRight = GRID.x + (WEEKS - 1) * GRID.stepX + GRID.radius;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(NAME)}</title>
  <desc id="desc">${escapeXml(description)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${theme.bgFrom}"/>
      <stop offset="1" stop-color="${theme.bgTo}"/>
    </linearGradient>
  </defs>
  <style>
    .name { font: 400 54px ${fonts.serif}; fill: ${theme.text}; }
    .tagline { font: 400 17px ${fonts.sans}; fill: ${theme.secondary}; }
    .caption { font: 400 10px ${fonts.mono}; fill: ${theme.muted}; letter-spacing: 1px; }
    .line { font: 400 14px ${fonts.mono}; fill: ${theme.accentText}; opacity: 0; animation: line ${lineLoop}s infinite; }
    .dot { animation: settle ${LOOP_SECONDS}s ease-in-out infinite both; }
    @keyframes line {
      0% { opacity: 0; transform: translateY(6px); }
      ${fadedInAt}%, ${fadeOutFrom}% { opacity: 1; transform: translateY(0); }
      ${visibleUntil}%, 100% { opacity: 0; transform: translateY(-6px); }
    }
    @keyframes settle {
      0%, 10% { transform: translate(var(--dx), var(--dy)); opacity: 0.35; }
      40%, 78% { transform: translate(0, 0); opacity: 1; }
      100% { transform: translate(var(--dx), var(--dy)); opacity: 0.35; }
    }
    @media (prefers-reduced-motion: reduce) {
      .dot { animation: none; }
      .line { animation: none; }
      .line:first-of-type { opacity: 1; }
    }
  </style>
  <rect x="0.5" y="0.5" width="${WIDTH - 1}" height="${HEIGHT - 1}" rx="14" fill="url(#bg)" stroke="${theme.border}"/>
  <text class="name" x="48" y="96">${escapeXml(NAME)}</text>
  <text class="tagline" x="50" y="128">${escapeXml(TAGLINE)}</text>
  <rect x="50" y="160" width="9" height="9" fill="${theme.accent}"/>
  <g>
    ${buildLines()}
  </g>
  <g>
    ${buildDots(weeks, theme)}
  </g>
  <text class="caption" x="${gridRight}" y="194" text-anchor="end">LAST ${WEEKS} WEEKS</text>
</svg>
`;
}

const weeks = await readWeeks();
const assetsDirectory = fileURLToPath(new URL('../assets/', import.meta.url));
await mkdir(assetsDirectory, { recursive: true });
for (const [name, theme] of Object.entries(themes)) {
  await writeFile(`${assetsDirectory}header-${name}.svg`, buildHeader(theme, weeks));
  console.log(`Wrote assets/header-${name}.svg`);
}
