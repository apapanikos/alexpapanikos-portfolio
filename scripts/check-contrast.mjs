/**
 * Reads the palette straight out of src/styles/global.css and checks every
 * text/background pair in both themes against WCAG AA (4.5:1).
 *
 * Run with `npm run contrast` after changing any colour. Exits non-zero on a
 * failure, so it also works as a CI or pre-commit gate.
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const CSS = fileURLToPath(new URL('../src/styles/global.css', import.meta.url));

/** oklch() -> sRGB. Returns the clamped colour plus whether it left the gamut. */
function oklchToRgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  const gamma = (t) =>
    t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(Math.max(t, 0), 1 / 2.4) - 0.055;
  return {
    rgb: linear.map((v) => Math.min(1, Math.max(0, gamma(v)))),
    clipped: linear.some((v) => v < -0.002 || v > 1.002),
  };
}

const luminance = ([r, g, b]) => {
  const lin = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const hex = (rgb) =>
  '#' + rgb.map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');

/** Pulls `--name: oklch(L C H)` declarations out of a block of CSS. */
function parseBlock(css, selector) {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`Could not find "${selector}" in global.css`);
  const block = css.slice(css.indexOf('{', start) + 1, css.indexOf('}', start));
  const tokens = {};
  for (const [, name, l, c, h] of block.matchAll(
    /--([\w-]+):\s*oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/g,
  )) {
    tokens[name] = oklchToRgb(Number(l), Number(c), Number(h));
  }
  return tokens;
}

const css = await readFile(CSS, 'utf8');
const themes = { light: parseBlock(css, ':root {'), dark: parseBlock(css, '.dark {') };

const FOREGROUNDS = ['fg', 'fg-muted', 'fg-subtle', 'accent'];
const BACKGROUNDS = ['bg', 'surface', 'surface-2'];
const AA = 4.5;

let failures = 0;

for (const [name, tokens] of Object.entries(themes)) {
  console.log(`\n${name.toUpperCase()}`);

  for (const fg of FOREGROUNDS) {
    if (!tokens[fg]) continue;
    const results = BACKGROUNDS.filter((bg) => tokens[bg]).map((bg) => {
      const ratio = contrast(tokens[fg].rgb, tokens[bg].rgb);
      if (ratio < AA) failures++;
      return `${bg} ${ratio.toFixed(2)}${ratio >= AA ? '' : ' ✗'}`;
    });
    const gamut = tokens[fg].clipped ? ' [out of sRGB gamut]' : '';
    console.log(`  ${fg.padEnd(10)} ${hex(tokens[fg].rgb)}  ${results.join('   ')}${gamut}`);
    if (tokens[fg].clipped) failures++;
  }

  // Button labels sit on the accent fill rather than a page background.
  if (tokens['accent-fg'] && tokens['accent']) {
    const ratio = contrast(tokens['accent-fg'].rgb, tokens['accent'].rgb);
    if (ratio < AA) failures++;
    console.log(
      `  ${'accent-fg'.padEnd(10)} ${hex(tokens['accent-fg'].rgb)}  on accent ${ratio.toFixed(2)}${ratio >= AA ? '' : ' ✗'}`,
    );
  }
}

if (failures > 0) {
  console.error(`\n${failures} pair(s) below WCAG AA (${AA}:1).`);
  process.exit(1);
}

console.log(`\nAll pairs meet WCAG AA (${AA}:1).`);
