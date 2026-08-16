---
title: 'Fyna — a finance dashboard that goes one level deeper'
summary: 'Most budgeting apps tell you that you spent €800 on "monthly expenses". Fyna tells you €250 of it was coffee, shows you the month-over-month trend, and lets you model what cutting it does to your year.'
role: 'Product, design and engineering'
year: 2026
stack:
  - Next.js
  - TypeScript
  - Supabase
  - Postgres
  - Tailwind CSS
  - Sentry
problem: 'Every budgeting app I tried stopped at the category level. Knowing I spent €800 on "monthly expenses" tells me nothing I can act on. The question worth answering is which subcategory moved this month, and what happens to the year if I change it.'
solution: 'Entries carry a category and a subcategory, so the dashboard can drill from a total down to the line that actually moved. Around that sit recurring entries, CSV import with column mapping for whatever shape a bank exports, savings buckets, debt tracking, a payday allocation planner, and a what-if planner that projects a spending cut forward.'
outcome: 'Live and in daily use. Row-level security per user in Postgres, Sentry on the failure paths, and a full data export in PDF, CSV and JSON alongside account deletion — a finance app holding your data should let you take it back.'
liveUrl: 'https://app.fyna.finance'
featured: true
order: 1
draft: false
# Add images by dropping files next to this file and uncommenting:
# cover: ./cover.png
# coverAlt: 'The Fyna dashboard showing income, expenses and savings rate'
---

> Placeholder body. The frontmatter above is real and already drives the card, the
> summary block and the meta description — this section is where the longer story goes
> once you write it.

## Why subcategories are the whole point

A category tells you where money went in the abstract. A subcategory tells you what to
change. The schema treats subcategories as first-class rather than as a text field on an
entry, which is what makes the drill-down and the month-over-month "top movers" view
possible at all.

## Importing from a real bank

No two banks export the same CSV. Rather than maintain a list of per-bank parsers, the
importer asks you to map columns once and remembers the shape. It is less magical and
considerably less likely to break when a bank quietly changes a header.

## Taking the data back out

Export covers PDF, CSV and JSON, and account deletion actually deletes. This started as a
GDPR obligation and turned into a feature worth having: it is the difference between a
tool you are trying and a tool you are trusting.
