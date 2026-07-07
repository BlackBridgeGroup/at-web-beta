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
    en: 'For Candidates — Build a Hospitality Career in the DACH Region | AlpenTalent',
    de: 'Für Kandidat:innen — Karriere in der DACH-Hotellerie | AlpenTalent',
    cz: 'Pro uchazeče — kariéra v hotelnictví v regionu DACH | AlpenTalent',
  };
  const descriptions: Record<Locale, string> = {
    en: 'Work in Austria and across the DACH region. Career consultation, candidate pool, hospitality jobs, and honest guidance for EU and international professionals.',
    de: 'Arbeite in Österreich und in der DACH-Region. Karriereberatung, Kandidatenpool, Hospitality-Jobs und ehrliche Begleitung für EU- und internationale Fachkräfte.',
    cz: 'Pracuj v Rakousku a v regionu DACH. Kariérní konzultace, kandidátský pool, pozice v hotelnictví a upřímné vedení pro pracovníky z EU i mezinárodně.',
  };
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `https://alpentalent.com/${locale}/for-candidates`,
      languages: { de: '/de/for-candidates', cs: '/cz/for-candidates', en: '/en/for-candidates' },
    },
  };
}

type Card = { title: string; body: string; href: string; cta: string };
type Content = {
  eyebrow: string; h1: string; sub: string;
  cardsEyebrow: string;
  cards: Card[];
  ctaT: string; ctaB: string; ctaBook: string; ctaJobs: string;
};

const T: Record<string, Content> = {
  de: {
    eyebrow: 'Für Kandidat:innen',
    h1: 'Bau deine Hospitality-Karriere in der DACH-Region.',
    sub: 'Wir helfen Fachkräften aus der EU und international, in Österreich zu arbeiten — mit Blick auf Deutschland und die Schweiz. Ehrliche Beratung, echte Rollen, menschliche Begleitung.',
    cardsEyebrow: 'Wie wir dir helfen',
    cards: [
      { title: 'In Österreich arbeiten', body: 'Hotels und Restaurants in ganz Österreich — mit Perspektive auf Deutschland und die Schweiz.', href: '/jobs', cta: 'Offene Rollen ansehen' },
      { title: 'Entry Consultation', body: 'Für Fachkräfte von außerhalb der EU (€100): Assessment, Dokumentenprüfung, Marktorientierung, Aktionsplan. EU-Bürger:innen brauchen sie nicht.', href: '/entry-consultation', cta: 'Mehr erfahren' },
      { title: 'Kandidatenpool', body: 'Ist dein Profil in unserem Pool, matchen wir dich mit passenden offenen Rollen — nur mit deiner Zustimmung.', href: '/entry-consultation', cta: 'So kommst du rein' },
      { title: 'Hospitality-Jobs', body: 'Rezeption, Küche, Service, Housekeeping, Management — Rollen für jede Erfahrungsstufe.', href: '/jobs', cta: 'Jobs durchsuchen' },
      { title: 'Karriere-Orientierung', body: 'Gehälter, Regionen, Saison, Umzug — praktische Guides, damit du weißt, was dich erwartet.', href: '/resources', cta: 'Ratgeber lesen' },
      { title: 'Gehaltsguide', body: 'Reale Gehaltsspannen für Hospitality-Rollen in Österreich, ehrlich und aktuell.', href: '/salary-guide', cta: 'Gehälter ansehen' },
    ],
    ctaT: 'Bereit anzufangen?', ctaB: 'Buche eine Beratung oder schau dir zuerst die offenen Rollen an.',
    ctaBook: 'Beratung buchen', ctaJobs: 'Rollen ansehen',
  },
  cz: {
    eyebrow: 'Pro uchazeče',
    h1: 'Vybuduj si kariéru v hotelnictví v regionu DACH.',
    sub: 'Pomáháme pracovníkům z EU i mezinárodně pracovat v Rakousku — s výhledem na Německo a Švýcarsko. Upřímné poradenství, reálné pozice, lidský přístup.',
    cardsEyebrow: 'Jak ti pomůžeme',
    cards: [
      { title: 'Práce v Rakousku', body: 'Hotely a restaurace po celém Rakousku — s perspektivou Německa a Švýcarska.', href: '/jobs', cta: 'Zobrazit pozice' },
      { title: 'Vstupní konzultace', body: 'Pro pracovníky mimo EU (€100): posouzení, revize dokumentů, orientace na trhu, akční plán. Občané EU ji nepotřebují.', href: '/entry-consultation', cta: 'Zjistit více' },
      { title: 'Kandidátský pool', body: 'Když je tvůj profil v poolu, spárujeme tě s vhodnými otevřenými pozicemi — jen s tvým souhlasem.', href: '/entry-consultation', cta: 'Jak se dostat dovnitř' },
      { title: 'Pozice v hotelnictví', body: 'Recepce, kuchyně, obsluha, úklid, management — role pro každou úroveň praxe.', href: '/jobs', cta: 'Procházet pozice' },
      { title: 'Kariérní orientace', body: 'Platy, regiony, sezóna, přesun — praktické průvodce, ať víš, co tě čeká.', href: '/resources', cta: 'Číst rádce' },
      { title: 'Průvodce platy', body: 'Reálná platová rozpětí pro pozice v hotelnictví v Rakousku, upřímně a aktuálně.', href: '/salary-guide', cta: 'Zobrazit platy' },
    ],
    ctaT: 'Připraven začít?', ctaB: 'Rezervuj si konzultaci nebo se nejdřív podívej na otevřené pozice.',
    ctaBook: 'Rezervovat konzultaci', ctaJobs: 'Zobrazit pozice',
  },
  en: {
    eyebrow: 'For candidates',
    h1: 'Build a hospitality career across the DACH region.',
    sub: 'We help EU and international professionals work in Austria — with an eye on Germany and Switzerland. Honest guidance, real roles, human support.',
    cardsEyebrow: 'How we help you',
    cards: [
      { title: 'Work in Austria', body: 'Hotels and restaurants across Austria — with a path toward Germany and Switzerland.', href: '/jobs', cta: 'See open roles' },
      { title: 'Entry Consultation', body: 'For professionals from outside the EU (€100): assessment, document review, market orientation, action plan. EU citizens don’t need it.', href: '/entry-consultation', cta: 'Learn more' },
      { title: 'Candidate pool', body: 'Once your profile is in our pool, we match you with suitable open roles — only with your consent.', href: '/entry-consultation', cta: 'How to join' },
      { title: 'Hospitality jobs', body: 'Reception, kitchen, service, housekeeping, management — roles for every experience level.', href: '/jobs', cta: 'Browse jobs' },
      { title: 'Career guidance', body: 'Salaries, regions, seasons, relocation — practical guides so you know what to expect.', href: '/resources', cta: 'Read the guides' },
      { title: 'Salary guide', body: 'Real salary ranges for hospitality roles in Austria — honest and current.', href: '/salary-guide', cta: 'See salaries' },
    ],
    ctaT: 'Ready to start?', ctaB: 'Book a consultation or browse the open roles first.',
    ctaBook: 'Book a consultation', ctaJobs: 'See roles',
  },
};

export default async function ForCandidates({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = T[locale] ?? T.de;
  const base = `/${locale}`;

  return (
    <SiteShell locale={locale}>
      {/* Hero */}
      <section style={{ background: 'var(--at-alpine-green)', color: '#fff', paddingBlock: 'clamp(64px, 10vw, 112px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.07, pointerEvents: 'none' }} aria-hidden="true">
          <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
            <path d="M0 200 L100 130 L200 170 L300 80 L400 150 L500 60 L600 140 L700 70 L800 160 L900 50 L1000 130 L1100 90 L1200 120 L1200 300 L0 300Z" fill="white" />
          </svg>
        </div>
        <div className="at-container" style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.75 }}>{t.eyebrow}</p>
          <h1 className="at-display" style={{ color: '#fff', margin: '0 0 var(--space-3)' }}>{t.h1}</h1>
          <p style={{ margin: '0 0 var(--space-4)', fontSize: '1.125rem', opacity: 0.9, lineHeight: 1.6 }}>{t.sub}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href={`${base}/entry-consultation`} className="at-btn" style={{ background: '#fff', color: 'var(--at-alpine-green)', fontWeight: 700 }}>{t.ctaBook}</Link>
            <Link href={`${base}/jobs`} className="at-btn" style={{ background: 'transparent', color: '#fff', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.5)' }}>{t.ctaJobs}</Link>
          </div>
        </div>
        <div style={{ marginTop: 64 }}><Ridge variant="hero" opacity={1} /></div>
      </section>

      {/* Cards */}
      <section style={{ paddingBlock: 'var(--space-8)' }}>
        <div className="at-container">
          <p style={{ margin: '0 0 var(--space-4)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.cardsEyebrow}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
            {t.cards.map(card => (
              <Link key={card.title} href={`${base}${card.href}`} className="at-card" style={{ padding: 'var(--space-4)', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p className="at-h3" style={{ margin: 0 }}>{card.title}</p>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6, flex: 1 }}>{card.body}</p>
                <span style={{ color: 'var(--at-alpine-green)', fontWeight: 600, fontSize: '0.875rem' }}>{card.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ background: 'var(--bg-sunken)', paddingBlock: 'var(--space-8)', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="at-container" style={{ maxWidth: 620 }}>
          <h2 className="at-h1" style={{ margin: '0 0 8px' }}>{t.ctaT}</h2>
          <p style={{ margin: '0 0 var(--space-4)', color: 'var(--text-muted)' }}>{t.ctaB}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link href={`${base}/entry-consultation`} className="at-btn at-btn--primary" style={{ fontWeight: 700 }}>{t.ctaBook}</Link>
            <Link href={`${base}/jobs`} className="at-btn" style={{ boxShadow: 'inset 0 0 0 1.5px var(--primary)', color: 'var(--primary)' }}>{t.ctaJobs}</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
