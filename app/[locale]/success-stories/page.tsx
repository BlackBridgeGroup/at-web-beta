import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = { title: 'Success Stories' };

const stories = [
  { slug: 'jan-from-brno', name: 'Jan K.', role: 'Chef de Partie', hotel: 'Arlberg Resort', region: 'Tyrol', quote: '"I had offers within a week. The team helped me sort housing and my first Austrian payslip — things I had no idea about." '},
  { slug: 'petra-from-prague', name: 'Petra M.', role: 'Receptionist', hotel: 'Grand Hotel Zell am See', region: 'Salzburg', quote: '"AlpenTalent matched me to a role that actually fit — not just a role with an open slot. I\'ve been here two seasons now."' },
  { slug: 'tomas-from-bratislava', name: 'Tomáš B.', role: 'Sous Chef', hotel: 'AlpinResort Obertauern', region: 'Salzburg', quote: '"The trial shift idea was new to me but it made sense. I got to see the kitchen before committing — and the head chef got to see me cook."' },
];

export default async function SuccessStories({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container">
          <div style={{ maxWidth: 560, marginBottom: 'var(--space-6)' }}>
            <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
              Success stories
            </p>
            <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>Real people. Real roles.</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              From Czech Republic and Slovakia to hotels across Austria — here are some of the people we've helped find their place.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
            {stories.map(story => (
              <Link
                key={story.slug}
                href={`/${locale}/success-stories/${story.slug}`}
                className="at-card at-card--interactive"
                style={{ display: 'block', padding: 'var(--space-4)', textDecoration: 'none' }}
              >
                {/* Photo placeholder */}
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--at-alpine-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-2)', color: 'var(--at-alpine-green)' }} aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <p className="at-h3" style={{ margin: '0 0 2px', color: 'var(--text)' }}>{story.name}</p>
                <p style={{ margin: '0 0 var(--space-2)', color: 'var(--at-alpine-green)', fontSize: '0.875rem', fontWeight: 500 }}>{story.role} · {story.hotel}</p>
                <p style={{ margin: '0 0 var(--space-2)', color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, fontStyle: 'italic' }}>{story.quote}</p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="at-chip">{story.region}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
