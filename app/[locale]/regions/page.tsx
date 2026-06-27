import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = { title: 'Austrian Regions' };

const regions = [
  { slug: 'tyrol',     name: 'Tyrol',     openRoles: 48, highlights: 'Kitzbühel, Innsbruck, St. Anton' },
  { slug: 'salzburg',  name: 'Salzburg',  openRoles: 32, highlights: 'Salzburg city, Zell am See, Obertauern' },
  { slug: 'vorarlberg',name: 'Vorarlberg',openRoles: 21, highlights: 'Lech, Bregenz, Montafon' },
  { slug: 'vienna',    name: 'Vienna',    openRoles: 19, highlights: 'International hotels, restaurants' },
  { slug: 'styria',    name: 'Styria',    openRoles: 12, highlights: 'Graz, Schladming, Bad Aussee' },
  { slug: 'carinthia', name: 'Carinthia', openRoles: 9,  highlights: 'Klagenfurt, Velden, Villach' },
];

function RegionIcon({ slug }: { slug: string }) {
  const shared = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (slug) {
    case 'tyrol':      return <svg {...shared}><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5-5-5 5"/><path d="M17 17l-5 5-5-5"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M7 7l-5 5 5 5"/><path d="M17 7l5 5-5 5"/></svg>;
    case 'salzburg':   return <svg {...shared}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
    case 'vorarlberg': return <svg {...shared}><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>;
    case 'vienna':     return <svg {...shared}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z"/><path d="M6 12H4a2 2 0 0 0-2 2v8h4"/><path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>;
    case 'styria':     return <svg {...shared}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
    case 'carinthia':  return <svg {...shared}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>;
    default: return null;
  }
}

export default async function Regions({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container">
          <div style={{ maxWidth: 560, marginBottom: 'var(--space-6)' }}>
            <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
              Where we work
            </p>
            <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>Austrian regions</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              From Alpine ski resorts in Tyrol to city hotels in Vienna — we cover all major hospitality regions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-2)' }}>
            {regions.map(r => (
              <Link
                key={r.slug}
                href={`/${locale}/regions/${r.slug}`}
                className="at-card at-card--interactive"
                style={{ display: 'block', padding: 'var(--space-3)', textDecoration: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ color: 'var(--at-alpine-green)', flexShrink: 0 }}><RegionIcon slug={r.slug} /></div>
                  <div>
                    <p className="at-h3" style={{ margin: '0 0 2px', color: 'var(--text)' }}>{r.name}</p>
                    <span className="at-badge at-badge--green">{r.openRoles} open roles</span>
                  </div>
                </div>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{r.highlights}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
