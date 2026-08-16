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
    'Full-stack engineer in Athens. I build web apps end to end in TypeScript, usually Next.js or Vue on the front and Supabase or Node behind it.',
  email: 'hello@example.com',
  /** Availability line in the hero. Set to null to hide the badge entirely. */
  availability: 'Available for freelance work',
} as const;

/** Replace the placeholder URLs — they are the only ones in the project. */
export const LINKS = [
  { label: 'GitHub', href: 'https://github.com/your-handle' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle' },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/your-handle' },
  { label: 'Malt', href: 'https://www.malt.com/profile/your-handle' },
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
      'Whole features, or whole products. Next.js or Nuxt on the front, Supabase or Node behind it, TypeScript the whole way through.',
    points: ['Next.js', 'Vue & Nuxt', 'Supabase', 'Node'],
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
    points: ['React & Vue', 'Design systems', 'Accessibility', 'Web Vitals'],
  },
  {
    title: 'Ongoing contracts',
    description:
      "A few days a month, for as long as it's useful. Feature work, code review, refactors, and being around to answer questions.",
    points: ['Part-time retainer', 'Code review', 'Refactors', 'Mentoring'],
  },
] as const;

/** mailto: with a pre-filled subject so enquiries arrive already labelled. */
export const MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent(
  'Project enquiry',
)}`;
