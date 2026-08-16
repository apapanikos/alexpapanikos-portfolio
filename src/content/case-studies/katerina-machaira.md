---
title: 'Katerina Machaira — a portfolio the designer edits herself'
summary: 'A portfolio site for a UI/UX designer in Athens. Next.js on the front, Strapi behind it, so she publishes and reorders her own case studies without a developer in the loop.'
role: 'Full-stack developer'
client: 'Katerina Machaira'
year: 2022
stack:
  - Next.js
  - React
  - Strapi
  - Vercel
problem: "A designer's portfolio is the product they are judged on, and it changes constantly — a new case study, a reordered project list, a rewritten intro before an application goes out. Every one of those edits going through a developer means the site is always a little out of date."
solution: 'Next.js for the site and Strapi as a headless CMS behind it. Case studies, images and copy are content entries rather than markup, so adding a project is a form she fills in. Static-first rendering on Vercel keeps the pages quick on a phone, which is where most of these links get opened.'
outcome: 'Three case studies live, and she has published and revised content since without needing me. The site has been her working portfolio through a job search rather than a thing she has to ask someone to update.'
liveUrl: 'https://katerinamachaira.vercel.app'
featured: true
order: 3
draft: false
# Add images by dropping files next to this file and uncommenting:
# cover: ./cover.png
# coverAlt: 'The Katerina Machaira portfolio homepage'
---

> Placeholder body. The frontmatter above is real and already drives the card, the
> summary block and the meta description — this section is where the longer story goes
> once you write it.

## The brief was ownership, not features

The functional requirements were small: a homepage, an about section, a list of case
studies, a contact block. The requirement that shaped the build was that she should never
have to ask me to change any of it.

## Why a CMS and not Markdown

Markdown in the repo would have been simpler for me and useless for her. A headless CMS
costs a bit more setup and moves the editing surface to somewhere she can actually reach,
which is the whole point of the project.
