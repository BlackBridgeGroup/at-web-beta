import type { MetadataRoute } from 'next';

const siteUrl = 'https://alpentalent.com';
const locales = ['de', 'cz', 'en'];

const publicRoutes = [
  '',
  'about',
  'contact',
  'datenschutz',
  'entry-consultation',
  'faq',
  'for-employers',
  'fragebogen',
  'how-it-works',
  'impressum',
  'jobs',
  'regions',
  'resources',
  'salary-guide',
  'success-stories',
];

const regionSlugs = ['tyrol', 'salzburg', 'vorarlberg', 'vienna', 'styria', 'carinthia'];
const resourceSlugs = [
  'moving-to-austria',
  'german-for-hospitality',
  'understanding-your-austrian-contract',
  'staff-housing-in-austria',
  'seasonal-vs-permanent-work',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    '/',
    ...locales.flatMap(locale => publicRoutes.map(route => `/${locale}${route ? `/${route}` : ''}`)),
    ...locales.flatMap(locale => regionSlugs.map(slug => `/${locale}/regions/${slug}`)),
    ...locales.flatMap(locale => resourceSlugs.map(slug => `/${locale}/resources/${slug}`)),
  ];

  return paths.map(path => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));
}
