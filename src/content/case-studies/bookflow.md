---
title: 'BookFlow — bookings and deposits with no backend to run'
summary: 'A booking system for a small service business: real availability, Stripe deposits, an admin dashboard. The entire backend is Postgres and two Edge Functions. No Node server, no queue, no ORM.'
role: 'Full-stack engineer'
year: 2026
stack:
  - Next.js
  - TypeScript
  - Supabase
  - Postgres
  - Stripe
  - Tailwind CSS
problem: 'Small service businesses take bookings by phone and DM. Slots get double-booked, no-shows cost real money, and the usual fix is a subscription product that ends up owning the customer relationship. I wanted to find out how much of that could be a database rather than a backend.'
solution: 'Opening hours are stored as weekly rules plus per-date exceptions and turned into slots on demand, so changing your Tuesday hours is a one-row update rather than a backfill. Double-booking is prevented by a Postgres exclusion constraint rather than an application check. Stripe Checkout takes the deposit, and a signature-verified webhook is the only thing that can mark a booking paid.'
outcome: 'Seven tables with row-level security and two Edge Functions, deployed on Vercel and Supabase. Nothing to scale or patch beyond the database. Anonymous customers have no read access to the bookings table at all — they create one through a security-definer function and read it back by confirmation token.'
metrics:
  - label: 'Backend services to run'
    value: '0'
  - label: 'Edge Functions'
    value: '2'
  - label: 'Tables, all under RLS'
    value: '7'
featured: true
order: 2
draft: false
# Add images by dropping files next to this file and uncommenting:
# cover: ./cover.png
# coverAlt: 'The BookFlow slot picker and admin dashboard'
---

> Placeholder body. The frontmatter above is real and already drives the card, the
> summary block and the stat row — this section is where the longer story goes once you
> write it.

## Double-booking is a database problem

The tempting fix is to check availability before writing the booking. That check is a
race: two customers can both pass it in the same instant and both commit. So the rule
lives in the schema instead —

```sql
constraint bookings_no_overlap exclude using gist (during with &&)
  where (status in ('pending', 'confirmed'))
```

Whatever the application believes, Postgres will not let both rows exist. The pre-check
in `create_pending_booking()` stays, but its only job is turning a constraint violation
into a friendly message.

## Why anonymous customers cannot read bookings

A row-level security policy permissive enough to show someone their own booking is also
permissive enough to leak everyone else's name, email and phone number. There is no way
to identify an anonymous customer at the database level that an attacker cannot also
claim.

So anonymous users have no policy at all. They write through a `security definer`
function and read back a single row via an unguessable confirmation token, resolved
server-side. Less elegant than a clever policy, and considerably harder to get wrong.

## Grants are a separate gate from RLS

Postgres authorisation has two doors: a role needs a table-level privilege before RLS
policies are ever consulted. Supabase used to open the first one automatically for new
tables in `public`; it no longer does. A schema shipped without explicit grants fails in
a way that looks like an RLS bug and isn't.
