---
title: 'Ledgerly — analytics for indie SaaS founders'
summary: 'A multi-tenant analytics product built on Next.js and Supabase. I did the schema, the security rules, the billing and the interface, and stayed on afterwards to keep it moving.'
role: 'Full-stack engineer'
client: 'Ledgerly'
year: 2025
stack:
  - Next.js
  - TypeScript
  - Supabase
  - Postgres
  - Tailwind CSS
  - Stripe
problem: 'The founders had a prototype that worked in a demo and nowhere else. Tenancy was enforced in application code, so a single missed filter would have leaked one customer''s data to another. Dashboards took about six seconds to paint, and every new signup needed someone to run setup steps by hand.'
solution: 'I rebuilt it as one codebase: a multi-tenant Postgres schema with row-level security, server-rendered reads so the first paint already has data in it, optimistic updates on anything the user touches, and Stripe writing subscription state into the database instead of the UI guessing at it.'
outcome: 'Signup became self-serve. The dashboard settled under a second on real customer data. They took their first paid plan five weeks in, and I stayed on two days a month afterwards.'
metrics:
  - label: 'Time to first paying customer'
    value: '5 weeks'
  - label: 'Dashboard LCP, p75'
    value: '0.9s'
  - label: 'Manual setup steps'
    value: '0'
featured: true
order: 1
draft: false
# Add images by dropping files next to this file and uncommenting:
# cover: ./cover.png
# coverAlt: 'The Ledgerly dashboard showing revenue and churn charts'
# gallery:
#   - src: ./onboarding.png
#     alt: 'The three-step self-serve onboarding flow'
#   - src: ./billing.png
#     alt: 'Plan selection and billing settings'
---

> Placeholder copy. Replace everything below with the real story. The frontmatter above
> already drives the summary block, the stat row and the card on the home page.

## Where it started

Two founders, a working prototype, and a growing list of things they were afraid to touch.
Data was fetched in the browser after hydration, which meant three round trips before the
first chart appeared. More importantly, nothing in the database stopped one customer's
query from returning another customer's rows. That was the thing I wanted fixed first.

## What changed

I put tenancy in the database. Every table got an `org_id` and a row-level security policy
tied to the signed-in user's membership. An unscoped query now returns nothing instead of
returning everything, which is a much better failure mode.

Reads moved to the server. The dashboard renders with the user's session already applied,
so the first paint has data in it. The filters, the date picker and the inline editors are
the only parts that ship JavaScript.

Billing became state rather than a side effect. Stripe webhooks write to a `subscriptions`
table and the app reads entitlements from there. One place to look when a customer says
their plan is wrong.

## What I'd keep doing

Two days on the schema and the security policies before writing any components. It felt
slow at the time and saved weeks later. On anything with tenants I would not start
differently.
