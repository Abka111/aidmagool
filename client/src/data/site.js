export const ORG = {
  short: 'AID',
  full: 'Aid for Integrated Development',
  email: 'info@aiddev.net',
  phone: '+251 2527 83968',
  phoneHref: 'tel:+251252783968',
  whatsapp: 'https://wa.me/251915104100',
  registration: 'Registered CSO No. 6818',
  locations: 'Addis Ababa & Jijiga, Ethiopia',
};

export const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'Who We Are', to: '/about' },
      { label: 'Our Approach', to: '/about#approach' },
      { label: 'How We Work', to: '/about#how-we-work' },
      { label: 'Our Story', to: '/about#our-story' },
      { label: 'Mission & Vision', to: '/about#mission' },
    ],
  },
  {
    label: 'Our Impact',
    to: '/impact',
    children: [
      { label: 'Achievements', to: '/impact' },
      { label: 'Education & Protection', to: '/impact#education' },
      { label: 'Health & Nutrition', to: '/impact#health' },
      { label: 'Food & Livelihoods', to: '/impact#food' },
      { label: 'WASH and ES & NFI', to: '/impact#wash' },
    ],
  },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Team', to: '/team' },
  { label: 'Partners', to: '/partners' },
  { label: 'Blog', to: '/blog' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
];

/* Lucide dropped third-party brand glyphs, so social marks are drawn inline. */
export const BRAND_PATHS = {
  facebook:
    'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z',
  x: 'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z',
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z',
  whatsapp:
    'M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.02a9.78 9.78 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.77 9.77 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.81-9.8 2.62 0 5.08 1.03 6.93 2.88a9.74 9.74 0 0 1 2.87 6.93c0 5.4-4.4 9.81-9.79 9.81zM20.52 3.45A11.7 11.7 0 0 0 12.05 0C5.56 0 .28 5.28.28 11.76c0 2.07.54 4.1 1.57 5.88L.18 24l6.5-1.7a11.72 11.72 0 0 0 5.36 1.36h.01c6.49 0 11.77-5.28 11.77-11.76 0-3.14-1.22-6.1-3.44-8.32z',
};

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/share/17A2RieCsJ/', path: BRAND_PATHS.facebook },
  { name: 'X (Twitter)', href: 'https://x.com/AidforIDev', path: BRAND_PATHS.x },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/aid-for-integrated-development-aid/',
    path: BRAND_PATHS.linkedin,
  },
];
