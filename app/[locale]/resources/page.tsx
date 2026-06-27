import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { locales, normalizeLocale, getDictionary, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = { title: 'AlpenLife Resources' };

const guides = [
  { slug: 'moving-to-austria',                    category: 'Moving',   title: 'Moving to Austria: the practical guide',        summary: 'Registration, Anmeldung, bank account, SIM card — everything you need in the first two weeks.',                        readTime: '8 min' },
  { slug: 'german-for-hospitality',               category: 'Language', title: 'German for hospitality workers',                summary: 'The 100 phrases you\'ll use every day in a hotel or restaurant. No fluff, just the essentials.',                       readTime: '6 min' },
  { slug: 'understanding-your-austrian-contract', category: 'Legal',    title: 'Understanding your Austrian work contract',     summary: 'What Kollektivvertrag means, what you\'re entitled to, and what to check before you sign.',                            readTime: '7 min' },
  { slug: 'staff-housing-in-austria',             category: 'Housing',  title: 'Staff housing in Austrian hotels',              summary: 'What to expect, what\'s usually included, and your rights as a tenant.',                                             readTime: '5 min' },
  { slug: 'seasonal-vs-permanent-work',           category: 'Work',     title: 'Seasonal vs permanent roles in Austria',        summary: 'The pros and cons of each, and how to plan a career path through Austrian hospitality.',                            readTime: '6 min' },
];

function IconTile({ category, size = 48 }: { category: string; size?: number }) {
  const s = size;
  const shared = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (category) {
    case 'Moving':
      return <svg {...shared}><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>;
    case 'Language':
      return <svg {...shared}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case 'Legal':
      return <svg {...shared}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    case 'Housing':
      return <svg {...shared}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case 'Work':
      return <svg {...shared}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    default:
      return null;
  }
}

export default async function Resources({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const d = getDictionary(locale);
  const r = d.ui.resources;

  const [featured, ...rest] = guides;

  return (
    <SiteShell locale={locale}>
      <style>{`
        .guide-card {
          transition: border-color var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease);
        }
        .guide-card:hover {
          border-color: var(--at-alpine-green) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px color-mix(in srgb, var(--at-alpine-green) 12%, transparent);
        }
        .guide-card:hover .guide-arrow {
          transform: translateX(3px);
        }
        .guide-arrow {
          transition: transform var(--dur-fast) var(--ease);
        }
      `}</style>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--at-alpine-green) 0%, #1E4D38 100%)',
        paddingTop: 'clamp(48px, 7vw, 72px)',
        paddingBottom: 0,
        position: 'relative',
      }}>
        <div className="at-container" style={{ paddingBottom: 'clamp(40px, 5vw, 56px)' }}>
          <p style={{ margin: '0 0 10px', fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>
            {r.eyebrow}
          </p>
          <h1 className="at-display" style={{ margin: '0 0 var(--space-2)', color: '#fff', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', maxWidth: 600 }}>
            {r.heading}
          </h1>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.65, maxWidth: 520 }}>
            {r.sub}
          </p>
        </div>

        {/* Mountain-ridge divider */}
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true" style={{ display: 'block', width: '100%', height: 52 }}>
          <path d="M0 80 L60 40 L120 65 L180 20 L240 50 L300 10 L360 45 L420 25 L480 55 L540 15 L600 50 L660 30 L720 60 L780 20 L840 55 L900 35 L960 65 L1020 25 L1080 50 L1140 15 L1200 45 L1200 80 L0 80 Z" fill="var(--bg)" />
        </svg>
      </div>

      <div className="at-container" style={{ paddingBlock: 'var(--space-6)' }}>

        {/* Featured guide */}
        <Link
          href={`/${locale}/resources/${featured.slug}`}
          className="at-card guide-card"
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            padding: 'var(--space-5)',
            marginBottom: 'var(--space-3)',
            textDecoration: 'none',
            background: 'var(--at-alpine-light)',
            border: '1px solid color-mix(in srgb, var(--at-alpine-green) 18%, transparent)',
            borderRadius: 20,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          {/* Icon */}
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: 'color-mix(in srgb, var(--at-alpine-green) 12%, transparent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'var(--at-alpine-green)',
          }} aria-hidden="true">
            <IconTile category={featured.category} size={28} />
          </div>

          {/* Copy */}
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--at-alpine-green)' }}>
                {featured.category}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{featured.readTime} read</span>
            </div>
            <h2 className="at-h2" style={{ margin: '0 0 var(--space-1)', color: 'var(--text)', fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)' }}>
              {featured.title}
            </h2>
            <p style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.65 }}>
              {featured.summary}
            </p>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--at-alpine-green)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Read guide <span className="guide-arrow">→</span>
            </span>
          </div>
        </Link>

        {/* 2-up grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-2)' }}>
          {rest.map(guide => (
            <Link
              key={guide.slug}
              href={`/${locale}/resources/${guide.slug}`}
              className="at-card guide-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                padding: 'var(--space-4)',
                textDecoration: 'none',
                borderRadius: 20,
                border: '1px solid var(--border)',
              }}
            >
              {/* Icon tile */}
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'var(--at-alpine-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--at-alpine-green)',
                flexShrink: 0,
              }} aria-hidden="true">
                <IconTile category={guide.category} size={22} />
              </div>

              {/* Category + time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--at-alpine-green)' }}>
                  {guide.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{guide.readTime} read</span>
              </div>

              {/* Title + summary */}
              <div>
                <p className="at-h3" style={{ margin: '0 0 6px', color: 'var(--text)' }}>{guide.title}</p>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{guide.summary}</p>
              </div>

              {/* Arrow */}
              <span style={{ marginTop: 'auto', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--at-alpine-green)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                Read guide <span className="guide-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
