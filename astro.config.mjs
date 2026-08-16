// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Absolute site URL, used for canonical tags, Open Graph and the sitemap.
 *
 * Resolution order:
 *  1. PUBLIC_SITE_URL, if you want to pin it explicitly.
 *  2. VERCEL_PROJECT_PRODUCTION_URL, which Vercel sets at build time to the
 *     shortest production domain — your custom domain once one is attached,
 *     the .vercel.app domain before that. Set even on preview builds, so
 *     preview deployments still emit canonical URLs pointing at production.
 *  3. A localhost fallback for `npm run build` with neither set.
 */
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

const site =
  process.env.PUBLIC_SITE_URL ??
  (vercelProductionUrl ? `https://${vercelProductionUrl}` : 'http://localhost:4321');

// https://astro.build/config
export default defineConfig({
  site,
  // Fully static. Vercel serves the output from its edge CDN — no adapter,
  // no serverless functions, nothing to cold-start.
  output: 'static',

  integrations: [mdx(), sitemap()],

  // Self-hosted, subsetted and preloaded by Astro. No third-party requests,
  // no layout shift.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Geist',
      cssVariable: '--font-geist',
      weights: ['400 700'],
      styles: ['normal'],
      // Latin only — the copy is English. Add 'greek' or 'latin-ext' here if
      // you translate the site; each extra subset is another preloaded file.
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      weights: ['400 500'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'monospace'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
