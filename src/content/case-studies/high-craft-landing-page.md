---
title: 'Meridian — a launch page with almost no JavaScript in it'
summary: 'A one-page launch site for a hardware startup. Built in Astro, typography-first, with the scroll effects done in CSS. Nine days from brief to live.'
role: 'Frontend engineer'
client: 'Meridian'
year: 2025
stack:
  - Astro
  - TypeScript
  - Tailwind CSS
  - Vercel
problem: 'The old page came out of a page builder and shipped 1.4 MB of JavaScript to animate four sections. It scored 38 on mobile, the hero jumped twice while the fonts loaded, and nobody on the team could change a headline without filing a ticket.'
solution: 'I rebuilt it as a static Astro page. Fonts are self-hosted and subsetted so nothing shifts, the scroll effects are CSS plus one IntersectionObserver, images are art-directed per breakpoint, and the copy lives in a content collection so the team edits Markdown instead of emailing an agency.'
outcome: 'The page ships about 14 KB of JavaScript and paints in well under a second on a throttled connection. It has held 100 in Lighthouse since launch, and signups from the same ad spend went up in the first month.'
metrics:
  - label: 'JavaScript shipped'
    value: '14 KB'
  - label: 'Lighthouse, mobile'
    value: '100'
  - label: 'Largest Contentful Paint'
    value: '0.6s'
featured: true
order: 2
draft: false
# Add images by dropping files next to this file and uncommenting:
# cover: ./cover.png
# coverAlt: 'The Meridian hero section on desktop and mobile'
# gallery:
#   - src: ./typography.png
#     alt: 'Type scale and spacing system used across the page'
#   - src: ./dark-mode.png
#     alt: 'The same page rendered in dark mode'
---

> Placeholder copy. Replace everything below with the real story. The frontmatter above
> already drives the summary block, the stat row and the card on the home page.

## The brief

One page, one product. The company sells on build quality, so the page had to look like it
was made by people who care about build quality. That was most of the brief.

## How it was built

The whole page runs on one type scale with a fluid display size, and almost nothing else
carries visual weight. When the type is doing the work you need fewer tricks.

Motion is deliberately small. Sections move up fourteen pixels and fade over 700ms,
staggered by index, all driven by a single `IntersectionObserver`. Under
`prefers-reduced-motion` it collapses to a plain fade.

Images are art-directed per breakpoint and served as AVIF with a WebP fallback, sized so
the hero is never bigger than the viewport actually needs.

## Why it's fast

Mostly by leaving things out. No animation library, no icon package, no analytics in the
critical path, and fonts served from the same origin as the HTML. None of it is clever.

## What I'd change

The content collection was worth it, but I set it up on day seven. If I did it again it
would go in first, because writing the copy directly into components and then pulling it
back out cost me half a day.
