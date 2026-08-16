/**
 * Generates the raster brand assets that can't be SVG: the PNG/ICO favicons,
 * the Apple touch icon and the default Open Graph card.
 *
 * Run with `npm run assets` after changing the name or accent colour in
 * src/consts.ts. Output lands in public/ and is committed to the repo.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const PUBLIC_DIR = fileURLToPath(new URL('../public/', import.meta.url));

// Keep in sync with src/consts.ts and the palette in src/styles/global.css.
const NAME = 'Alex Papanikos';
const TAGLINE = 'Full-stack Engineer · Athens';
const SUBLINE = 'TypeScript · Next.js · Vue · Supabase';

const ACCENT = '#017044'; // --accent, light theme
const ACCENT_DARK = '#4bc98a'; // --accent, dark theme (used on the ink OG card)
const INK = '#0a0c10';
const PAPER = '#fdfdfe';

const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const MONO = 'SF Mono, Menlo, Consolas, monospace';

/**
 * The plus mark, lifted from the section rails in SectionGrid.astro. Chosen
 * over a monogram because it survives 16px: two strokes stay legible at tab
 * size where a letterform turns to mush.
 */
const mark = (size, stroke) => `
  <g fill="none" stroke="${stroke}" stroke-width="${size * 0.085}" stroke-linecap="butt">
    <path d="M${size * 0.5} ${size * 0.22} V${size * 0.78}" />
    <path d="M${size * 0.22} ${size * 0.5} H${size * 0.78}" />
  </g>`;

const iconSvg = (size) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${size * 0.09}" fill="${ACCENT}" />
    ${mark(size, PAPER)}
  </svg>`;

/** The same 72px grid that sits behind the hero. */
const gridDefs = `
  <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
    <path d="M72 0 L0 0 0 72" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1" />
  </pattern>
  <linearGradient id="fade" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#fff" stop-opacity="0.9" />
    <stop offset="65%" stop-color="#fff" stop-opacity="0" />
  </linearGradient>
  <mask id="gridMask"><rect width="1200" height="630" fill="url(#fade)" /></mask>`;

const ogSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>${gridDefs}</defs>
    <rect width="1200" height="630" fill="${INK}" />
    <rect width="1200" height="630" fill="url(#grid)" mask="url(#gridMask)" />
    <rect x="0" y="0" width="1200" height="4" fill="${ACCENT_DARK}" />

    <g transform="translate(80, 74)">
      <rect width="58" height="58" rx="5" fill="${ACCENT_DARK}" />
      ${mark(58, INK)}
    </g>

    <text x="80" y="336" font-family="${SANS}" font-size="88" font-weight="700"
          letter-spacing="-3.5" fill="${PAPER}">${NAME}</text>
    <text x="80" y="404" font-family="${SANS}" font-size="33" font-weight="500"
          letter-spacing="-0.4" fill="#a4a8b0">${TAGLINE}</text>

    <rect x="80" y="474" width="14" height="14" fill="${ACCENT_DARK}" />
    <text x="112" y="486" font-family="${MONO}" font-size="22"
          letter-spacing="2.2" fill="#898e97">${SUBLINE.toUpperCase()}</text>
  </svg>`;

/**
 * Wraps a 32×32 PNG in a minimal ICONDIR header. Every browser since IE11
 * reads PNG-compressed .ico entries, so no BMP encoding is needed.
 */
const pngToIco = (png) => {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(32, 6); // width
  header.writeUInt8(32, 7); // height
  header.writeUInt8(0, 8); // palette size
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(header.length, 18);
  return Buffer.concat([header, png]);
};

const render = (svg) => sharp(Buffer.from(svg)).png({ compressionLevel: 9 });

await mkdir(PUBLIC_DIR, { recursive: true });

await writeFile(new URL('favicon.svg', `file://${PUBLIC_DIR}`), iconSvg(64).trim());

const favicon32 = await render(iconSvg(32)).toBuffer();
await writeFile(new URL('favicon.ico', `file://${PUBLIC_DIR}`), pngToIco(favicon32));

await render(iconSvg(180)).toFile(`${PUBLIC_DIR}apple-touch-icon.png`);
await render(ogSvg).toFile(`${PUBLIC_DIR}og-default.png`);

console.log('Wrote favicon.svg, favicon.ico, apple-touch-icon.png, og-default.png');
