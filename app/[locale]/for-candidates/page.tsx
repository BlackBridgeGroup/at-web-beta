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
    en: 'Work in Austria. Free registration, free knowledge hub, hospitality jobs and salary guides. Recruitment is free for candidates — employers pay the fee.',
    de: 'Arbeite in Österreich. Kostenlose Registrierung, kostenloser Wissens-Hub, Hospitality-Jobs und Gehaltsguides. Die Vermittlung ist für Kandidaten kostenlos — die Gebühr zahlt der Arbeitgeber.',
    cz: 'Pracuj v Rakousku. Registrace zdarma, znalostní hub zdarma, pozice v hotelnictví a průvodce platy. Zprostředkování je pro uchazeče zdarma — poplatek platí zaměstnavatel.',
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
  disclaimer: string;
};

const T: Record<string, Content> = {
  de: {
    eyebrow: 'Für Kandidat:innen',
    h1: 'Deine Hospitality-Karriere in Österreich — kostenlos.',
    sub: 'Registrierung kostenlos. Infos kostenlos. Vermittlung kostenlos — die Gebühr zahlt der Arbeitgeber, niemals du. Wir verbinden Fachkräfte aus der EU und international mit Hotels und Restaurants in Österreich.',
    cardsEyebrow: 'Alles kostenlos für dich',
    cards: [
      { title: 'Kostenlos registrieren', body: 'Profil anlegen, Lebenslauf hochladen, in unsere Kandidatendatenbank aufgenommen werden. Freiwillig und jederzeit widerrufbar.', href: '/fragebogen', cta: 'Jetzt registrieren' },
      { title: 'Offene Rollen', body: 'Rezeption, Küche, Service, Housekeeping, Management — in ganz Österreich, für jede Erfahrungsstufe.', href: '/jobs', cta: 'Rollen ansehen' },
      { title: 'Wissens-Hub', body: 'Arbeiten in Österreich, Bewerbungstipps, Unterkunft, Dokumente — allgemeine, kostenlose Infos für alle.', href: '/resources', cta: 'Ratgeber lesen' },
      { title: 'Gehaltsguide', body: 'Reale Gehaltsspannen für Hospitality-Rollen in Österreich, ehrlich und aktuell.', href: '/salary-guide', cta: 'Gehälter ansehen' },
      { title: 'Regionen', body: 'Tirol, Salzburg, Wien und mehr — wo in Österreich gearbeitet wird und was dich erwartet.', href: '/regions', cta: 'Regionen entdecken' },
      { title: 'Häufige Fragen', body: 'Wie der Ablauf funktioniert, was kostenlos ist und wie die Vermittlung läuft.', href: '/faq', cta: 'FAQ öffnen' },
    ],
    ctaT: 'Bereit anzufangen?', ctaB: 'Registriere dich kostenlos oder schau dir zuerst die offenen Rollen an.',
    ctaBook: 'Kostenlos registrieren', ctaJobs: 'Rollen ansehen',
    disclaimer: 'Alle Informationen auf dieser Website sind allgemeiner Natur und stellen keine Rechts-, Aufenthalts- oder Immigrationsberatung dar. Für rechtsverbindliche Auskünfte wende dich an eine:n Rechtsanwält:in oder die zuständige Behörde.',
  },
  cz: {
    eyebrow: 'Pro uchazeče',
    h1: 'Tvoje kariéra v hotelnictví v Rakousku — zdarma.',
    sub: 'Registrace zdarma. Informace zdarma. Zprostředkování zdarma — poplatek platí zaměstnavatel, nikdy ty. Spojujeme pracovníky z EU i mezinárodně s hotely a restauracemi v Rakousku.',
    cardsEyebrow: 'Vše pro tebe zdarma',
    cards: [
      { title: 'Registrace zdarma', body: 'Vytvoř profil, nahraj životopis, zařaď se do naší kandidátské databáze. Dobrovolně a kdykoli odvolatelné.', href: '/fragebogen', cta: 'Registrovat se' },
      { title: 'Otevřené pozice', body: 'Recepce, kuchyně, obsluha, úklid, management — po celém Rakousku, pro každou úroveň praxe.', href: '/jobs', cta: 'Zobrazit pozice' },
      { title: 'Znalostní hub', body: 'Práce v Rakousku, tipy na přihlášku, ubytování, dokumenty — obecné, bezplatné informace pro všechny.', href: '/resources', cta: 'Číst rádce' },
      { title: 'Průvodce platy', body: 'Reálná platová rozpětí pro pozice v hotelnictví v Rakousku, upřímně a aktuálně.', href: '/salary-guide', cta: 'Zobrazit platy' },
      { title: 'Regiony', body: 'Tyrolsko, Salcbursko, Vídeň a další — kde se v Rakousku pracuje a co tě čeká.', href: '/regions', cta: 'Objevit regiony' },
      { title: 'Časté dotazy', body: 'Jak probíhá proces, co je zdarma a jak funguje zprostředkování.', href: '/faq', cta: 'Otevřít FAQ' },
    ],
    ctaT: 'Připraven začít?', ctaB: 'Zaregistruj se zdarma nebo se nejdřív podívej na otevřené pozice.',
    ctaBook: 'Registrovat se zdarma', ctaJobs: 'Zobrazit pozice',
    disclaimer: 'Veškeré informace na tomto webu jsou obecné povahy a nepředstavují právní, pobytové ani imigrační poradenství. Pro právně závazné informace se obrať na advokáta nebo příslušný úřad.',
  },
  en: {
    eyebrow: 'For candidates',
    h1: 'Your hospitality career in Austria — free.',
    sub: 'Free registration. Free information. Free recruitment — the fee is paid by the employer, never by you. We connect EU and international professionals with hotels and restaurants in Austria.',
    cardsEyebrow: 'Everything free for you',
    cards: [
      { title: 'Register for free', body: 'Create a profile, upload your CV, join our candidate database. Voluntary and revocable at any time.', href: '/fragebogen', cta: 'Register now' },
      { title: 'Open roles', body: 'Reception, kitchen, service, housekeeping, management — across Austria, for every experience level.', href: '/jobs', cta: 'See roles' },
      { title: 'Knowledge Hub', body: 'Working in Austria, application tips, accommodation, documents — general, free information for everyone.', href: '/resources', cta: 'Read the guides' },
      { title: 'Salary guide', body: 'Real salary ranges for hospitality roles in Austria — honest and current.', href: '/salary-guide', cta: 'See salaries' },
      { title: 'Regions', body: 'Tyrol, Salzburg, Vienna and more — where the work is in Austria and what to expect.', href: '/regions', cta: 'Explore regions' },
      { title: 'FAQ', body: 'How the process works, what is free, and how recruitment happens.', href: '/faq', cta: 'Open FAQ' },
    ],
    ctaT: 'Ready to start?', ctaB: 'Register for free or browse the open roles first.',
    ctaBook: 'Register for free', ctaJobs: 'See roles',
    disclaimer: 'All information on this website is general in nature and does not constitute legal, residence, or immigration advice. For legally binding information, consult a lawyer or the competent authority.',
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
            <Link href={`${base}/fragebogen`} className="at-btn" style={{ background: '#fff', color: 'var(--at-alpine-green)', fontWeight: 700 }}>{t.ctaBook}</Link>
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
          <p style={{ margin: 'var(--space-5) 0 0', fontSize: '0.8125rem', color: 'var(--text-subtle)', lineHeight: 1.6, maxWidth: 760 }}>{t.disclaimer}</p>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ background: 'var(--bg-sunken)', paddingBlock: 'var(--space-8)', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="at-container" style={{ maxWidth: 620 }}>
          <h2 className="at-h1" style={{ margin: '0 0 8px' }}>{t.ctaT}</h2>
          <p style={{ margin: '0 0 var(--space-4)', color: 'var(--text-muted)' }}>{t.ctaB}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link href={`${base}/fragebogen`} className="at-btn at-btn--primary" style={{ fontWeight: 700 }}>{t.ctaBook}</Link>
            <Link href={`${base}/jobs`} className="at-btn" style={{ boxShadow: 'inset 0 0 0 1.5px var(--primary)', color: 'var(--primary)' }}>{t.ctaJobs}</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
