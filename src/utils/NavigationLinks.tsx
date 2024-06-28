import type { NavigationLinks } from '@/types/NavigationLink.schema';

export const LINKS = {
  Landing: {
    Landing: {
      label: 'Home',
      href: '/',
      auth: false,
    },
    LinkA: {
      label: 'Link A',
      href: '/#',
      auth: false,
    },
    LinkB: {
      label: 'Link B',
      href: '/#',
      auth: false,
    },
  },
};

export const HEADER_LINKS: NavigationLinks = [
  // LINKS.Landing.LinkA,
  // LINKS.Landing.LinkB,
  // LINKS.Other,
];
