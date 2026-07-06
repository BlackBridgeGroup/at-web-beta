import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteShell } from '../../components/SiteShell';
import { Hero } from '../../components/Hero';
import { TrustBar } from '../../components/TrustBar';
import { BentoSection } from '../../components/BentoSection';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { PricingBlock } from '../../components/PricingBlock';
import { Accordion } from '../../components/Accordion';
import { getDictionary, locales, normalizeLocale, type Locale } from '../../lib/i18n';

const base = 'https://alpentalent.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) return {};
  const locale = normalizeLocale(raw);
  const d = getDictionary(locale);
  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        de: `${base}/de`,
        cs: `${base}/cz`,
        en: `${base}/en`,
        'x-default': `${base}/en`,
      },
    },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      url: `${base}/${locale}`,
      siteName: 'AlpenTalent',
      locale: locale === 'de' ? 'de_AT' : locale === 'cz' ? 'cs_CZ' : 'en_GB',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

const deWhyIcons = [
  <svg key="ai" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
  <svg key="verified" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  <svg key="speed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="shield" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
];

const enWhyIcons = [
  <svg key="verified" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  <svg key="location" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  <svg key="housing" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  <svg key="human" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
];

const dePricingTiers = [
  {
    name: 'Lead-gen',
    price: 'Auf Anfrage',
    note: 'Kein Risiko — Zahlung nur bei Antritt',
    features: [
      'KI-gestütztes Kandidaten-Matching',
      'Vorqualifizierter Kandidatenpool',
      'Automatisierte Erstansprache',
      'Transparentes Kandidaten-Dashboard',
    ],
    cta: 'Jetzt anfragen',
    ctaHref: '/de/contact',
  },
  {
    name: 'Retained Search',
    price: 'Auf Anfrage',
    period: '/ Stelle',
    note: 'Exklusiver Suchauftrag für Ihre Vakanz',
    features: [
      'Alles aus Lead-gen',
      'Exklusive Kandidatensuche',
      'Persönlicher Ansprechpartner',
      'Interview-Vorbereitung inklusive',
      'Probearbeitstag-Koordination',
    ],
    cta: 'Demo buchen',
    ctaHref: '/de/contact',
    featured: true,
  },
  {
    name: 'Embedded / RPO',
    price: 'Auf Anfrage',
    period: '/ Monat',
    note: 'Für Hotels mit laufendem Personalbedarf',
    features: [
      'Alles aus Retained Search',
      'Laufendes Kandidaten-Management',
      'Employer-Branding-Unterstützung',
      'Onboarding-Koordination',
      'Monatliches Reporting',
    ],
    cta: 'Mehr erfahren',
    ctaHref: '/de/contact',
  },
];

function buildOrgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AlpenTalent',
    url: base,
    logo: `${base}/og-image.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+436769124013',
      contactType: 'customer service',
      availableLanguage: ['German', 'Czech', 'English'],
    },
    sameAs: ['https://wa.me/436769124013'],
    areaServed: { '@type': 'Country', name: 'Austria' },
    description:
      'Hospitality talent marketplace connecting Czech and Slovak professionals with Austrian hotels and restaurants.',
  };
}

function buildFaqSchema(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function buildBreadcrumbSchema(locale: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'AlpenTalent', item: base },
      { '@type': 'ListItem', position: 2, name, item: `${base}/${locale}` },
    ],
  };
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const d = getDictionary(locale);
  const hp = d.homepage;

  const isEmployer = locale === 'de';
  const isCandidate = locale !== 'de';
  const isEn = locale === 'en';

  const whyIcons = isEmployer ? deWhyIcons : enWhyIcons;

  const breadcrumbName = isEmployer
    ? 'Recruiting für Hotels'
    : locale === 'cz'
    ? 'Práce v Rakousku'
    : 'Hospitality Jobs in Austria';

  const schemas = [
    buildOrgSchema(),
    ...(isCandidate ? [buildFaqSchema(hp.faq.items)] : []),
    buildBreadcrumbSchema(locale, breadcrumbName),
  ];

  // ── Why-bento tiles: clean, uniform feature cards in a single row ─────────
  const enrichedWhyTiles = hp.why.tiles.map((t: any, i: number) => ({
    title: t.title,
    body: t.body,
    icon: whyIcons[i],
  }));

  return (
    <SiteShell locale={locale}>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* 1. Hero */}
      <Hero
        locale={locale}
        eyebrow={hp.hero.eyebrow}
        h1={hp.hero.h1}
        sub={hp.hero.sub}
        primaryLabel={hp.hero.primary}
        primaryHref={hp.hero.primaryHref}
        secondaryLabel={hp.hero.secondary}
        secondaryHref={hp.hero.secondaryHref}
        showPhotoPanel={true}
      />

      {/* 2. Trust bar */}
      <TrustBar variant={isEmployer ? 'employer' : 'candidate'} locale={locale} />

      {/* 3. Why AlpenTalent */}
      <BentoSection
        eyebrow={hp.why.eyebrow}
        heading={hp.why.heading}
        tiles={enrichedWhyTiles}
      />

      {/* 4. DE only — Problem section */}
      {isEmployer && (
        <section
          style={{
            paddingBlock: 'var(--space-8)',
            background: 'var(--bg-sunken)',
            borderBlock: '1px solid var(--border)',
          }}
        >
          <div className="at-container">
            {/* Section header */}
            <div style={{ marginBottom: 'var(--space-5)', maxWidth: 640 }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
                Das Problem
              </p>
              <h2 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>
                Österreichs Hotellerie kämpft mit Personalmangel.
              </h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Hotels und Restaurants verlieren Wochen durch manuelle Suche, zersplitterte
                Bewerbungen und Kandidaten, die im Prozess abspringen.
              </p>
            </div>

            {/* 3 problem tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)', marginBottom: 'var(--space-5)' }}>
              {[
                { title: 'Lange Vakanzen', body: 'Monate ohne geeignete Kandidaten — Gäste warten, Team überlastet.' },
                { title: 'Falsche Treffer', body: 'Kandidaten, die nicht passen — Gespräche ohne Ergebnis, Zeit verloren.' },
                { title: 'Frühe Abgänge', body: 'Neue Mitarbeiter kündigen in den ersten Wochen — der Kreislauf beginnt von vorn.' },
              ].map(item => (
                <div key={item.title} className="at-card" style={{ padding: 'var(--space-3)', borderTop: '3px solid var(--danger, #E53E3E)' }}>
                  <p className="at-h3" style={{ margin: '0 0 6px' }}>{item.title}</p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.body}</p>
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'var(--space-2)' }}>
              {[
                { num: 'Fast', label: 'persoenliche Rueckmeldung' },
                { num: '100%', label: 'manuell geprueft' },
                { num: 'Profil', label: 'vor Lebenslauf-Spam' },
                { num: '0', label: 'Vorauszahlung' },
              ].map(s => (
                <div key={s.label} className="at-card" style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                  <p
                    style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--at-alpine-green)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}
                  >
                    {s.num}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4b. DE only — KI-matching section */}
      {isEmployer && (
        <section style={{ paddingBlock: 'var(--space-8)', background: 'var(--bg)' }}>
          <div className="at-container">
            <div className="at-bento-ki" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-2)' }}>
              {/* Green highlight tile (span 2) */}
              <div
                className="at-card"
                style={{ background: 'var(--at-alpine-green)', color: '#fff', padding: 'var(--space-5)', gridColumn: 'span 2' }}
              >
                <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.75 }}>
                  KI-Matching
                </p>
                <h2 style={{ margin: '0 0 var(--space-2)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.25rem, 3vw, 1.875rem)', lineHeight: 1.15 }}>
                  Nur Kandidat:innen, die wirklich passen.
                </h2>
                <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.65, maxWidth: 520 }}>
                  Unser Algorithmus gleicht Qualifikationen, Sprache und Region ab — und unsere Recruiter prüfen jeden Match manuell nach. Keine Massen-CVs.
                </p>
              </div>
              {/* Fit check */}
              <div className="at-card" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', color: 'var(--at-alpine-green)', lineHeight: 1 }}>
                  Fit
                </p>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text)' }}>Vor jeder Vorstellung</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Profil, Region, Sprache, Startdatum</p>
              </div>
              {/* Consent check */}
              <div className="at-card" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', color: 'var(--at-alpine-green)', lineHeight: 1 }}>
                  OK
                </p>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text)' }}>Kein Auto-Forward</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Kandidaten werden vorab abgestimmt</p>
              </div>
              {/* Photo tile */}
              <div
                className="at-card"
                style={{ padding: 0, minHeight: 200, overflow: 'hidden', gridColumn: 'span 2', background: 'linear-gradient(135deg, var(--at-alpine-light) 0%, var(--bg-sunken) 100%)' }}
              >
                <div style={{ height: '100%', minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: 0.45 }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--at-alpine-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span style={{ fontSize: '0.75rem', color: 'var(--at-alpine-green)', fontWeight: 600 }}>Authentisches Team-Foto hier</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5a. DE — How hiring works (employer flow, compact) */}
      {isEmployer && <HowItWorksSection locale={locale} compact />}

      {/* 5b. EN — Visa & Relocation band */}
      {isEn && (
        <section
          style={{
            paddingBlock: 'var(--space-8)',
            background: 'var(--bg-elevated)',
            borderBlock: '1px solid var(--border)',
          }}
        >
          <div className="at-container">
            <p
              style={{
                margin: '0 0 8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--at-alpine-green)',
              }}
            >
              {hp.visa.eyebrow}
            </p>
            <h2 className="at-h1" style={{ margin: '0 0 8px', maxWidth: 560 }}>
              {hp.visa.heading}
            </h2>
            <p style={{ margin: '0 0 var(--space-5)', color: 'var(--text-muted)', maxWidth: 540 }}>
              {hp.visa.sub}
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 'var(--space-2)',
              }}
            >
              {hp.visa.items.map(([, title, body]: [string, string, string], vi: number) => {
                const visaIcons = [
                  <svg key="v0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg>,
                  <svg key="v1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                  <svg key="v2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
                  <svg key="v3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                ];
                return (
                <div
                  key={title}
                  className="at-card"
                  style={{ padding: 'var(--space-3)', background: 'var(--bg)' }}
                >
                  <div style={{ marginBottom: 8, color: 'var(--at-alpine-green)' }} aria-hidden="true">
                    {visaIcons[vi]}
                  </div>
                  <p className="at-h3" style={{ margin: '0 0 4px' }}>{title}</p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {body}
                  </p>
                </div>
              ); })}
            </div>
          </div>
        </section>
      )}

      {/* 5c. EN — Platform showcase band */}
      {isEn && (
        <section style={{ paddingBlock: 'var(--space-8)' }}>
          <div className="at-container">
            <p
              style={{
                margin: '0 0 8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--at-alpine-green)',
              }}
            >
              {hp.showcase.eyebrow}
            </p>
            <h2 className="at-h1" style={{ margin: '0 0 8px', maxWidth: 560 }}>
              {hp.showcase.heading}
            </h2>
            <p style={{ margin: '0 0 var(--space-5)', color: 'var(--text-muted)', maxWidth: 540 }}>
              {hp.showcase.sub}
            </p>
            <ol
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 'var(--space-2)',
              }}
            >
              {hp.showcase.items.map(([title, body]: [string, string], i: number) => (
                <li
                  key={title}
                  className="at-card"
                  style={{ padding: 'var(--space-3)', background: 'var(--bg-elevated)' }}
                >
                  <p
                    style={{
                      margin: '0 0 8px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.5rem',
                      color: 'var(--at-alpine-green)',
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="at-h3" style={{ margin: '0 0 4px' }}>{title}</p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 6. Candidate intake (candidate locales only) */}
      {isCandidate && (
        <section style={{ paddingBlock: 'var(--space-8)' }}>
          <div className="at-container">
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-4)',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <h2 className="at-h1" style={{ margin: 0 }}>
                {locale === 'cz' ? 'Pošli profil, role vybereme osobně.' : 'Send your profile. We match roles personally.'}
              </h2>
              <Link href={`/${locale}/fragebogen`} className="at-btn at-btn--primary at-btn--sm">
                {locale === 'cz' ? 'Vyplnit dotazník' : 'Complete questionnaire'}
              </Link>
            </div>
            <div className="at-card" style={{ padding: 'var(--space-4)', display: 'grid', gap: 'var(--space-2)' }}>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {locale === 'cz'
                  ? 'Aktuální nabídky neukazujeme jako anonymní seznam. Nejdřív ověříme tvoje zkušenosti, němčinu, dostupnost a region. Pak tě spojíme jen s rolemi, které dávají smysl.'
                  : 'We do not publish anonymous roles as a generic job board. First we review your experience, language level, availability, and region. Then we connect you only with roles that make sense.'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span className="at-chip">Service</span>
                <span className="at-chip">Kitchen</span>
                <span className="at-chip">Housekeeping</span>
                <span className="at-chip">Reception</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6b. EN/CZ — Compact how-it-works */}
      {isCandidate && <HowItWorksSection locale={locale} compact />}

      {/* 7. DE only — Pricing tiers */}
      {isEmployer && (
        <PricingBlock
          eyebrow="Konditionen"
          heading="Transparent. Kein Risiko."
          sub="Sie zahlen erst, wenn jemand erfolgreich antritt. Keine Vorauszahlung, keine versteckten Kosten."
          tiers={dePricingTiers}
        />
      )}

      {/* 7b. DE only — Closing demo band */}
      {isEmployer && (
        <section style={{ paddingBlock: 'var(--space-7)', background: 'var(--at-alpine-green)', color: '#fff' }}>
          <div className="at-container" style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.75 }}>
              Nächster Schritt
            </p>
            <h2 className="at-h2" style={{ color: '#fff', margin: '0 0 8px' }}>
              30 Minuten. Kein Risiko. Erste Kandidaten in Sicht.
            </h2>
            <p style={{ margin: '0 auto var(--space-4)', opacity: 0.85, lineHeight: 1.6, maxWidth: 480 }}>
              Lernen Sie unser Modell kennen — und wir verstehen Ihren Personalbedarf.
            </p>
            <Link href="/de/contact" className="at-btn" style={{ background: '#fff', color: 'var(--at-alpine-green)', fontWeight: 700 }}>
              Demo buchen →
            </Link>
          </div>
        </section>
      )}

      {/* 8. Explore bento */}
      <BentoSection
        eyebrow={hp.explore.eyebrow}
        heading={hp.explore.heading}
        tiles={hp.explore.tiles.map((t: any) => {
          const slug = (t.href as string)?.split('/').pop();
          const icon = (() => {
            const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
            switch (slug) {
              case 'salary-guide':    return <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>;
              case 'regions':         return <svg {...p}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
              case 'resources':       return <svg {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
              case 'success-stories': return <svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
              default:                return null;
            }
          })();
          return { title: t.title, body: t.body, icon };
        })}
      />

      {/* 9. Cross-link band */}
      {isEmployer ? (
        <section
          style={{
            paddingBlock: 'var(--space-5)',
            background: 'var(--bg-sunken)',
            borderBlock: '1px solid var(--border)',
          }}
        >
          <div
            className="at-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <p style={{ margin: '0 0 2px', fontWeight: 600, color: 'var(--text)' }}>
                {hp.candidateBand.heading}
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {hp.candidateBand.sub}
              </p>
            </div>
            <Link href={hp.candidateBand.href} className="at-btn at-btn--ghost at-btn--sm">
              {hp.candidateBand.cta}
            </Link>
          </div>
        </section>
      ) : (
        <section
          style={{
            paddingBlock: 'var(--space-5)',
            background: 'var(--bg-sunken)',
            borderBlock: '1px solid var(--border)',
          }}
        >
          <div
            className="at-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <p style={{ margin: '0 0 2px', fontWeight: 600, color: 'var(--text)' }}>
                {hp.employerBand.heading}
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {hp.employerBand.sub}
              </p>
            </div>
            <Link href={hp.employerBand.href} className="at-btn at-btn--ghost at-btn--sm">
              {hp.employerBand.cta}
            </Link>
          </div>
        </section>
      )}

      {/* 10. DE only — Trust layer */}
      {isEmployer && (
        <section
          style={{
            paddingBlock: 'var(--space-4)',
            background: 'var(--bg-elevated)',
            borderBlock: '1px solid var(--border)',
          }}
        >
          <div className="at-container">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
                justifyContent: 'center',
              }}
            >
              {[
                'Menschliche Prüfung inklusive',
                'DSGVO-konform',
                'Hotellerie-Expertise',
                'Transparente Kommunikation',
                'Österreich-first',
              ].map(label => (
                <span
                  key={label}
                  className="at-chip"
                  style={{ cursor: 'default' }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. FAQ preview */}
      <section style={{ paddingBlock: 'var(--space-8)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <h2 className="at-h2" style={{ margin: '0 0 var(--space-3)' }}>
            {hp.faq.heading}
          </h2>
          <Accordion items={hp.faq.items} />
          <div style={{ marginTop: 'var(--space-3)' }}>
            <Link href={`/${locale}/faq`} className="at-btn at-btn--ghost at-btn--sm">
              {hp.faq.seeAll}
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
