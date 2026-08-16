/**
 * Single source of truth for everything personal about this site.
 * Change these values and the whole site follows.
 */

export const SITE = {
  name: 'Alex Papanikos',
  /** Used in <title> suffixes and the JSON-LD person entry. */
  jobTitle: 'Full-stack Engineer',
  location: 'Athens, Greece',
  /** Short positioning line. Also the default meta description. */
  description:
    'Full-stack engineer in Athens. I build web apps end to end in TypeScript — Next.js or Vue on the front, Supabase and Postgres behind it — and lead a team of ten by day.',
  email: 'alexanderpapanikos@gmail.com',
  /** Availability line in the hero. Set to null to hide the badge entirely. */
  availability: 'Available for freelance work',
} as const;

export const LINKS = [
  { label: 'GitHub', href: 'https://github.com/apapanikos' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexpapanikos' },
] as const;

export const NAV = [
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/#work' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const SERVICES = [
  {
    title: 'Full-stack builds',
    description:
      'Whole features, or whole products. Next.js or Nuxt on the front, Postgres behind it, TypeScript the whole way through.',
    points: ['Next.js', 'Vue & Nuxt', 'Supabase', 'Postgres'],
  },
  {
    title: 'MVPs for founders',
    description:
      'You have an idea and a date you need it by. I do the schema, the auth, the billing and the interface, then hand it over with notes on how it all works.',
    points: ['Auth & RLS', 'Schema design', 'Stripe', 'Handover docs'],
  },
  {
    title: 'Frontend work',
    description:
      "Where I started, and still the part I'm quickest at. Design systems, awkward state, accessibility, and pages that stay fast on a bad connection.",
    points: ['React & Vue', 'Angular & NgRx', 'Design systems', 'Web Vitals'],
  },
  {
    title: 'Ongoing contracts',
    description:
      "A few days a month, for as long as it's useful. Feature work, code review, refactors, and being around to answer questions.",
    points: ['Part-time retainer', 'Code review', 'Refactors', 'Mentoring'],
  },
] as const;

/**
 * Compact track record. Employers are described rather than named, so the site
 * doesn't advertise freelance availability alongside a current employer's brand.
 */
export const EXPERIENCE = [
  {
    period: '2023 — now',
    role: 'Software Engineering Team Lead',
    org: "One of the world's largest iGaming companies",
    detail:
      'Joined as a senior engineer on sportsbook and casino reward systems, then took over the team. Ten engineers across web and mobile, plus the internal frontend library the company builds its products on.',
  },
  {
    period: '2019 — 2023',
    role: 'Lead Frontend Engineer',
    org: 'B2B retail analytics',
    detail:
      'Led four engineers building B2B platforms. Moved the Angular workspace to Nx for build times that scaled, and designed the async multi-chunk upload the product ran on.',
  },
  {
    period: '2021 — now',
    role: 'Freelance',
    org: 'Independent',
    detail:
      'Client work and my own products, alongside the day job. Everything on this page came out of that time.',
  },
] as const;

/** mailto: with a pre-filled subject so enquiries arrive already labelled. */
export const MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent(
  'Project enquiry',
)}`;
