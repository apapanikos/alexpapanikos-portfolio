// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Absolute site URL. Needed for canonical tags, Open Graph and the sitemap.
 * Set PUBLIC_SITE_URL in Vercel's project settings; the fallback keeps local
 * builds working. See .env.example.
 */
const site = process.env.PUBLIC_SITE_URL ?? 'https://alexpapanikos.dev';

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
