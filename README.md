# Portfolio

Personal site for a freelance full-stack engineer: a one-pager plus a case study page
per project. It is also meant to be a work sample, so it is static, fast and accessible,
with about 1 KB of JavaScript on the wire.

**Astro 7** · **TypeScript (strict)** · **Tailwind CSS 4** · **Content Collections** ·
deploys to **Vercel**

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

The dev server runs at http://localhost:4321.

| Script            | What it does                                            |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Dev server with HMR                                      |
| `npm run build`   | Type-checks (`astro check`), then builds to `dist/`      |
| `npm run preview` | Serves the production build locally                      |
| `npm run check`   | Type-check only                                          |
| `npm run assets`  | Regenerates the favicons and Open Graph card             |
| `npm run contrast`| Checks the palette against WCAG AA (exits 1 on failure)  |

---

## Make it yours

Everything personal lives in one file: **`src/consts.ts`**.

- `SITE` — name, job title, location, email, the availability badge (set
  `availability` to `null` to hide it).
- `LINKS` — GitHub, LinkedIn and freelance profiles. **These are placeholders** and
  are the only fake URLs in the project.
- `SERVICES` — the four service cards on the home page.
- `NAV` — header links.

Then:

1. Update the site URL in `.env` (see below) so canonical tags, Open Graph and the
   sitemap point at the right origin.
2. Change `NAME`, `TAGLINE` and `ACCENT` at the top of `scripts/generate-assets.mjs`
   and run `npm run assets` to regenerate the favicon and OG card.
3. Adjust the accent colour in `src/styles/global.css` if you want something other than
   jade. It is the only hue in the palette — everything else is neutral — so changing
   `--accent`, `--accent-hover`, `--accent-soft` and `--ring` in both `:root` and
   `.dark` re-skins the whole site. Then run `npm run contrast`, which reads those
   values back out of the CSS and fails if any pair drops below WCAG AA.

---

## Adding a case study

Drop a `.md` or `.mdx` file into `src/content/case-studies/`. The filename becomes the
URL (`ledgerly.md` → `/work/ledgerly`). No other wiring is needed — the home page grid,
the routes and the sitemap all pick it up.

The schema is in [`src/content.config.ts`](src/content.config.ts) and is enforced at
build time, so a typo in frontmatter fails the build rather than the page.

```yaml
---
title: 'Ledgerly — analytics for indie SaaS'
summary: 'One or two sentences. Used on the work grid and as the meta description.'
role: 'Full-stack engineer'
client: 'Ledgerly' # optional
year: 2025
stack: ['Next.js', 'Supabase', 'Tailwind CSS']

# The story. One short paragraph each — these render as the three-column block.
problem: '…'
solution: '…'
outcome: '…'

# Optional
metrics:
  - { label: 'Dashboard LCP, p75', value: '0.9s' }
liveUrl: 'https://example.com'
repoUrl: 'https://github.com/you/repo'
cover: ./cover.png
coverAlt: 'Describe the image for screen readers'
gallery:
  - { src: ./detail.png, alt: 'Describe this one too' }

featured: true # show on the home page grid
order: 1 # grid sort order, ascending
draft: false # true hides it from production builds
---
Long-form detail goes here as normal Markdown.
```

**Images.** Put them next to the Markdown file and reference them relatively
(`./cover.png`). Astro optimises, resizes and hashes them at build time. Without a
cover, the card falls back to a styled placeholder — the site looks finished either way.

**Drafts.** Set `draft: true` (visible in `npm run dev`, excluded from the build), or
prefix the filename with `_` to have the loader skip it entirely.

---

## Deploying to Vercel

The site builds to static HTML — no adapter, no serverless functions, nothing to
cold-start.

1. Push the repo to GitHub.
2. In Vercel, **Add New → Project** and import it. Vercel detects Astro; the build
   command and output directory are also pinned in `vercel.json`.
3. Under **Settings → Environment Variables**, add `PUBLIC_SITE_URL` for Production,
   Preview and Development — see `.env.example`. Without it the build falls back to the
   default in `astro.config.mjs`, and canonical/OG URLs will point at the wrong origin.
4. Deploy, then add your custom domain under **Settings → Domains**.

`vercel.json` also sets immutable caching for hashed assets and fonts, plus
`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and a restrictive
`Permissions-Policy`.

### Local env

```bash
cp .env.example .env
```

`PUBLIC_SITE_URL` is the only variable. Nothing here needs a secret.

---

## How it's put together

```
src/
├── components/
│   ├── home/              Home page sections (Hero, Services, SelectedWork, ContactCta)
│   ├── Container.astro    Width + gutter primitive
│   ├── Cta.astro          The one button style, solid and outline
│   ├── Eyebrow.astro      Small uppercase section label
│   ├── Footer.astro
│   ├── Header.astro
│   ├── SectionGrid.astro  Decorative page rails + plus marks
│   ├── Seo.astro          Meta, Open Graph, JSON-LD, fonts, favicons
│   ├── ThemeToggle.astro
│   └── WorkCard.astro     Case study card for the grid
├── content/
│   └── case-studies/      ← drop Markdown here
├── layouts/
│   └── BaseLayout.astro   Shell, theme script, scroll-reveal observer
├── pages/
│   ├── index.astro        The one-pager
│   ├── 404.astro
│   ├── robots.txt.ts      Generated so the sitemap URL tracks PUBLIC_SITE_URL
│   └── work/[...slug].astro
├── styles/global.css      Palette, type scale, prose styles, reveal animation
├── consts.ts              ← everything personal
└── content.config.ts      ← the case study schema
```

### Design and performance notes

- **No framework islands.** Nothing on this site needs React or Vue, so nothing ships
  it. The theme toggle and the scroll reveal are ~1 KB of vanilla TypeScript that Astro
  inlines into the HTML — the pages make zero JavaScript requests.
- **Theme.** Class-based dark mode on `<html>`, resolved by a blocking inline script
  before first paint so there's no flash. It follows the OS until the visitor picks a
  side, then remembers the choice in `localStorage`.
- **Motion.** Sections rise 14px and fade, staggered via a `--reveal-delay` custom
  property, driven by one `IntersectionObserver` for the whole page. Content is only
  hidden once JS confirms it can reveal it again, so it stays readable without
  JavaScript, and the whole effect is skipped under `prefers-reduced-motion`.
- **Type.** Geist for everything readable, Geist Mono for labels, indices, metadata and
  stat rows. Self-hosted and subsetted by Astro's fonts API: one preloaded file, no
  third-party requests, no layout shift. Latin only; add subsets in `astro.config.mjs`
  if you translate the site.
- **Colour.** Cool graphite neutrals and a single deep jade accent, with no second hue
  anywhere. Every foreground/background pair in both themes meets WCAG AA (4.5:1 or
  better). If you change `--accent`, re-check it.
- **The grid.** The faint field behind the hero, the contact panel and the empty work
  cards is two CSS gradients (`.grid-field` in `global.css`) with a radial mask. No
  image request, and it re-colours itself with the theme.
- **Page rails.** `SectionGrid.astro` draws two vertical hairlines at the container
  edges with a small plus mark where each meets a section border, so the page's
  underlying grid is visible. Add it as the first child of a `relative` section and
  give that section's `<Container>` a `relative` class. Rails only appear from `xl` up,
  where there is real gutter to show them in; below that they would hug the viewport
  edge and read as a rendering glitch. Pass `texture` to add the grid field behind a
  section, but only where there is genuine empty space — on sections built from
  bordered cards the two grids fight each other.
- **Accessibility.** Semantic landmarks, a skip link, one visible focus style
  everywhere, labelled controls, and cards that are a single tab stop.

---

## A note on the macOS `._*` files

This repo lives on an exFAT volume, so macOS writes AppleDouble sidecar files next to
every real file. They're gitignored and harmless, and the content loader skips them.
