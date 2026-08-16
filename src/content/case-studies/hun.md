---
title: 'hun — an artist site where the artwork is the design'
summary: "A single page for an electronic music artist. The colour and geometry come entirely from the artist's own gradient pieces; the interface stays quiet around them, under one grain layer covering the whole document."
role: 'Design engineer'
year: 2026
stack:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Supabase
problem: 'Artist sites tend to fail in one of two directions: a template that buries the work under stock styling, or a bespoke build so heavy the first image takes five seconds to arrive. There was also no release to count down to, so the usual campaign structure had nothing to hang on.'
solution: 'The artwork carries the design. A set of grainy, high-saturation gradient pieces supplies all the colour, and the UI stays restrained around them. One global grain layer sits over the entire document so the interface and the imagery read as the same material rather than art pasted onto a website. The page works as a standing hub — wordmark, where to listen, who it is, and a mailing list.'
outcome: "Server Components by default, with 'use client' on only four things: the hero wordmark, the scroll cue, the reveal wrapper and the signup form. The grain and the wordmark drift are pure CSS and SVG and ship no JavaScript at all. Signups go straight to Postgres through a Server Action."
featured: true
order: 3
draft: false
# Add images by dropping files next to this file and uncommenting:
# cover: ./cover.png
# coverAlt: 'The hun homepage, wordmark filled with cover artwork'
---

> Placeholder body. The frontmatter above is real and already drives the card, the
> summary block and the meta description — this section is where the longer story goes
> once you write it.

## One grain layer over everything

The artwork is grainy by nature. Placing clean UI on top of it makes the images look
pasted on. Running a single grain layer across the whole document instead — interface
included — makes the page read as one surface. It is a CSS and SVG effect, so it costs
nothing at runtime.

## A mailing list nobody can read

The `waitlist` table has row-level security enabled and zero policies. That is deliberate
rather than unfinished: with RLS on and no policy present, the anonymous and
authenticated roles can do nothing at all — no select, no insert. Nobody can enumerate
the list from a browser even holding the publishable key. Writes happen in a Server
Action using the service-role key, and `src/lib/supabase/server.ts` imports `server-only`
so the build fails rather than shipping that key to the client.

## The unique index is on lower(email)

A plain unique constraint would happily accept `Alex@x.com` and `alex@x.com` as two
different people. The action lowercases before inserting and the index enforces it, so
the correctness does not depend on the application remembering.
