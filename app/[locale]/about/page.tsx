import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../components/SiteShell';
import { Ridge } from '../../../components/Ridge';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const raw = (await params).locale;
  const locale = normalizeLocale(raw) as Locale;
  const titles: Record<Locale, string> = {
    en: 'About AlpenTalent — Human Support, AI Matching',
    de: 'Über AlpenTalent — Menschliche Unterstützung, KI-Matching',
    cz: 'O AlpenTalent — Lidská podpora, AI matching',
  };
  const descriptions: Record<Locale, string> = {
    en: 'AlpenTalent connects hospitality professionals with hotels and restaurants across Austria — combining AI matching with genuine human support.',
    de: 'AlpenTalent verbindet Hoteliers mit vorgeprüften Fachkräften aus Mitteleuropa — mit KI-Matching und echtem menschlichem Support.',
    cz: 'AlpenTalent propojuje odborníky v pohostinství s hotely v Rakousku — AI matching s lidskou podporou.',
  };
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `https://alpentalent.com/${locale}/about`,
      languages: { de: '/de/about', cs: '/cz/about', en: '/en/about' },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
    },
  };
}

const stats = [
  { v: '300+', l: 'Partner hotels', verify: true },
  { v: '10,000+', l: 'Hospitality professionals', verify: true },
  { v: '4.9★', l: 'Candidate satisfaction', verify: true },
  { v: 'Austria-wide', l: 'All major regions', verify: false },
];

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AlpenTalent',
    url: 'https://alpentalent.com',
    logo: 'https://alpentalent.com/logo.png',
    description: 'Hospitality talent marketplace for Austria — AI matching with human support.',
    foundingLocation: { '@type': 'Place', addressCountry: 'AT', addressLocality: 'Vienna' },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+43-676-9124013',
        contactType: 'customer service',
        availableLanguage: ['German', 'English', 'Czech'],
      },
    ],
    sameAs: [],
  };

  return (
    <SiteShell locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div style={{ paddingBlock: 'clamp(64px, 10vw, 112px)' }}>
        <div className="at-container" style={{ maxWidth: 680 }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
            About AlpenTalent
          </p>
          <h1 className="at-display" style={{ margin: '0 0 var(--space-3)' }}>
            Human support. AI matching. A team that cares.
          </h1>
          <p style={{ margin: 0, fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            AlpenTalent connects hospitality professionals with hotels and restaurants across Austria.
            We combine AI-powered matching with genuine human support — because finding a role in a new country
            is a life decision, not a transaction.
          </p>
        </div>
      </div>

      <Ridge variant="divider" opacity={0.06} />

      {/* Mission */}
      <section style={{ paddingBlock: 'var(--space-8)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
            <div>
              <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)' }}>Our mission</h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Austria's hospitality industry needs skilled people. Central European professionals
                want quality work in a stable country. AlpenTalent bridges this gap — with honesty,
                speed, and respect for everyone involved.
              </p>
            </div>
            <div>
              <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)' }}>How we work</h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                AI handles matching and screening at scale. Humans handle the conversations that matter —
                interview prep, housing questions, candidate concerns, employer relationships.
                We never automate care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust markers */}
      <section style={{ background: 'var(--bg-sunken)', paddingBlock: 'var(--space-6)', borderBlock: '1px solid var(--border)' }}>
        <div className="at-container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(24px, 5vw, 64px)' }}>
            {stats.map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <p
                  style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--at-alpine-green)', fontVariantNumeric: 'tabular-nums' }}
                  {...(s.verify ? { 'data-placeholder': 'verify' } : {})}
                >
                  {s.v}
                </p>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ paddingBlock: 'var(--space-8)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <h2 className="at-h2" style={{ margin: '0 0 var(--space-4)' }}>What we believe</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
            {[
              ['🤝', 'Honest matching', 'We only send a profile to an employer when we genuinely believe it\'s a fit — not to fill a slot.'],
              ['🏠', 'Housing first', 'We always clarify the housing situation before matching. A role without housing isn\'t a complete offer.'],
              ['🌍', 'Respect for mobility', 'Moving country is a big decision. We support it with real information, not just job listings.'],
              ['⚡', 'Speed matters', 'Hospitality teams need people fast. We move quickly without cutting corners on quality.'],
            ].map(([emoji, title, body]) => (
              <div key={title} className="at-card" style={{ padding: 'var(--space-3)' }}>
                <p style={{ margin: '0 0 8px', fontSize: '1.25rem' }} aria-hidden="true">{emoji}</p>
                <p className="at-h3" style={{ margin: '0 0 6px' }}>{title}</p>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingBlock: 'var(--space-8)', textAlign: 'center', background: 'var(--bg-sunken)', borderTop: '1px solid var(--border)' }}>
        <div className="at-container" style={{ maxWidth: 480 }}>
          <h2 className="at-h2" style={{ margin: '0 0 8px' }}>Want to work together?</h2>
          <p style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)' }}>
            Whether you're a candidate, employer, or potential partner — we'd love to hear from you.
          </p>
          <Link href={`/${locale}/contact`} className="at-btn at-btn--primary">Get in touch</Link>
        </div>
      </section>
    </SiteShell>
  );
}
