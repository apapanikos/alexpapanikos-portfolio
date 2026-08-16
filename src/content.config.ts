import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Case studies.
 *
 * Add one by dropping a `.md` or `.mdx` file into `src/content/case-studies/`.
 * Files prefixed with `_` or `.` are ignored, so `_draft.md` is a scratchpad.
 *
 * Frontmatter holds the short, structured story (problem → solution → outcome)
 * that renders as the summary block. The Markdown body is free-form long-form
 * detail rendered underneath it.
 */
const caseStudies = defineCollection({
  loader: glob({
    pattern: '**/[^_.]*.{md,mdx}',
    base: './src/content/case-studies',
  }),
  schema: ({ image }) =>
    z.object({
      /** Case study title, e.g. "Ledgerly — analytics for indie SaaS". */
      title: z.string(),
      /** One or two sentences. Shown on the work grid and in meta descriptions. */
      summary: z.string(),
      /** What you did, e.g. "Lead frontend engineer". */
      role: z.string(),
      /** Client or product name. Omit for self-initiated work. */
      client: z.string().optional(),
      /** Year the work shipped. */
      year: z.number().int().min(2000).max(2100),
      /** Technologies, in the order you want them listed. */
      stack: z.array(z.string()).nonempty(),

      /** The story. Keep each to a short paragraph. */
      problem: z.string(),
      solution: z.string(),
      outcome: z.string(),

      /** Optional hard numbers, rendered as a small stat row. */
      metrics: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .default([]),

      /**
       * Image slots. Put files next to the Markdown (or in `src/assets/`) and
       * reference them relatively — Astro optimises and hashes them at build.
       * Both are optional: without them, a styled placeholder renders instead.
       */
      cover: image().optional(),
      coverAlt: z.string().default(''),
      gallery: z
        .array(z.object({ src: image(), alt: z.string() }))
        .default([]),

      /** Optional outbound links shown in the case study header. */
      liveUrl: z.url().optional(),
      repoUrl: z.url().optional(),

      /** Show on the home page grid. */
      featured: z.boolean().default(true),
      /** Sort order on the grid, ascending. */
      order: z.number().default(99),
      /** Excluded from production builds while true. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { caseStudies };
