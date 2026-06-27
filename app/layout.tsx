import './globals.css';
import type { Metadata } from 'next';
import { ThemeScript } from '../components/ThemeScript';

export const metadata: Metadata = {
  metadataBase: new URL('https://alpentalent.com'),
  title: { default: 'AlpenTalent | Hospitality Jobs Austria', template: '%s | AlpenTalent' },
  description: 'Find your hospitality role in Austria. Pre-matched jobs in hotels and restaurants — for candidates and employers.',
  alternates: { languages: { de: '/de', cs: '/cz', en: '/en', 'x-default': '/en' } },
  openGraph: { title: 'AlpenTalent', description: 'Hospitality talent marketplace for Austria.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
