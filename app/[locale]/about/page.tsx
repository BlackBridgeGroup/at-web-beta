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
    openGraph: { title: titles[locale], description: descriptions[locale] },
  };
}

type Val = { icon: 'handshake' | 'home' | 'globe' | 'zap'; title: string; body: string };
type Content = {
  eyebrow: string; h1: string; sub: string;
  missionT: string; missionB: string; howT: string; howB: string;
  statLabels: [string, string, string, string]; austriaWide: string;
  believe: string; values: Val[];
  ctaT: string; ctaB: string; ctaBtn: string;
};

const T: Record<string, Content> = {
  de: {
    eyebrow: 'Über AlpenTalent',
    h1: 'Menschlicher Support. KI-Matching. Ein Team, das sich kümmert.',
    sub: 'AlpenTalent verbindet Hospitality-Fachkräfte mit Hotels und Restaurants in ganz Österreich. Wir kombinieren KI-gestütztes Matching mit echtem menschlichem Support — denn eine Stelle in einem neuen Land zu finden ist eine Lebensentscheidung, keine Transaktion.',
    missionT: 'Unsere Mission',
    missionB: 'Österreichs Hotellerie braucht qualifizierte Menschen. Fachkräfte aus Mitteleuropa wollen gute Arbeit in einem stabilen Land. AlpenTalent schließt diese Lücke — mit Ehrlichkeit, Tempo und Respekt für alle Beteiligten.',
    howT: 'Wie wir arbeiten',
    howB: 'Die KI übernimmt Matching und Vorauswahl im großen Maßstab. Menschen übernehmen die Gespräche, die zählen — Interviewvorbereitung, Wohnfragen, Anliegen der Kandidaten, Beziehungen zu Arbeitgebern. Fürsorge automatisieren wir nie.',
    statLabels: ['Partnerhotels', 'Fachkräfte', 'Bewertung', 'Alle Regionen'],
    austriaWide: 'Österreichweit',
    believe: 'Woran wir glauben',
    values: [
      { icon: 'handshake', title: 'Ehrliches Matching', body: 'Wir schicken ein Profil nur dann an einen Arbeitgeber, wenn wir wirklich an einen Match glauben — nicht um eine Stelle zu füllen.' },
      { icon: 'home', title: 'Wohnen zuerst', body: 'Wir klären die Wohnsituation immer vor dem Matching. Eine Stelle ohne Unterkunft ist kein vollständiges Angebot.' },
      { icon: 'globe', title: 'Respekt für Mobilität', body: 'Ein Umzug ins Ausland ist eine große Entscheidung. Wir begleiten sie mit echten Informationen, nicht nur Stellenanzeigen.' },
      { icon: 'zap', title: 'Tempo zählt', body: 'Hospitality-Teams brauchen schnell Leute. Wir handeln zügig — ohne Abstriche bei der Qualität.' },
    ],
    ctaT: 'Zusammenarbeiten?',
    ctaB: 'Ob Kandidat, Arbeitgeber oder potenzieller Partner — wir freuen uns auf deine Nachricht.',
    ctaBtn: 'Kontakt aufnehmen',
  },
  cz: {
    eyebrow: 'O AlpenTalent',
    h1: 'Lidská podpora. AI matching. Tým, kterému na tom záleží.',
    sub: 'AlpenTalent propojuje profesionály v pohostinství s hotely a restauracemi po celém Rakousku. Spojujeme AI matching s opravdovou lidskou podporou — protože najít práci v nové zemi je životní rozhodnutí, ne transakce.',
    missionT: 'Naše mise',
    missionB: 'Rakouské pohostinství potřebuje šikovné lidi. Profesionálové ze střední Evropy chtějí kvalitní práci ve stabilní zemi. AlpenTalent tuhle mezeru propojuje — s poctivostí, rychlostí a respektem ke všem.',
    howT: 'Jak pracujeme',
    howB: 'AI zvládá párování a předvýběr ve velkém. Lidé řeší rozhovory, na kterých záleží — přípravu na pohovor, otázky bydlení, starosti kandidátů, vztahy se zaměstnavateli. Péči nikdy neautomatizujeme.',
    statLabels: ['partnerských hotelů', 'profesionálů', 'spokojenost', 'Všechny regiony'],
    austriaWide: 'Celé Rakousko',
    believe: 'Čemu věříme',
    values: [
      { icon: 'handshake', title: 'Poctivé párování', body: 'Profil pošleme zaměstnavateli jen tehdy, když opravdu věříme, že sedí — ne abychom zaplnili místo.' },
      { icon: 'home', title: 'Bydlení na prvním místě', body: 'Situaci s bydlením vždy vyjasníme před párováním. Pozice bez ubytování není kompletní nabídka.' },
      { icon: 'globe', title: 'Respekt k mobilitě', body: 'Stěhování do zahraničí je velké rozhodnutí. Podpoříme ho reálnými informacemi, ne jen inzeráty.' },
      { icon: 'zap', title: 'Na rychlosti záleží', body: 'Týmy v pohostinství potřebují lidi rychle. Jednáme svižně — bez slev na kvalitě.' },
    ],
    ctaT: 'Chcete spolupracovat?',
    ctaB: 'Ať jste uchazeč, zaměstnavatel, nebo potenciální partner — rádi se ozveme.',
    ctaBtn: 'Ozvěte se',
  },
  en: {
    eyebrow: 'About AlpenTalent',
    h1: 'Human support. AI matching. A team that cares.',
    sub: 'AlpenTalent connects hospitality professionals with hotels and restaurants across Austria. We combine AI-powered matching with genuine human support — because finding a role in a new country is a life decision, not a transaction.',
    missionT: 'Our mission',
    missionB: "Austria's hospitality industry needs skilled people. Central European professionals want quality work in a stable country. AlpenTalent bridges this gap — with honesty, speed, and respect for everyone involved.",
    howT: 'How we work',
    howB: 'AI handles matching and screening at scale. Humans handle the conversations that matter — interview prep, housing questions, candidate concerns, employer relationships. We never automate care.',
    statLabels: ['Partner hotels', 'Hospitality professionals', 'Candidate satisfaction', 'All major regions'],
    austriaWide: 'Austria-wide',
    believe: 'What we believe',
    values: [
      { icon: 'handshake', title: 'Honest matching', body: "We only send a profile to an employer when we genuinely believe it's a fit — not to fill a slot." },
      { icon: 'home', title: 'Housing first', body: "We always clarify the housing situation before matching. A role without housing isn't a complete offer." },
      { icon: 'globe', title: 'Respect for mobility', body: 'Moving country is a big decision. We support it with real information, not just job listings.' },
      { icon: 'zap', title: 'Speed matters', body: 'Hospitality teams need people fast. We move quickly without cutting corners on quality.' },
    ],
    ctaT: 'Want to work together?',
    ctaB: "Whether you're a candidate, employer, or potential partner — we'd love to hear from you.",
    ctaBtn: 'Get in touch',
  },
};

function ValIcon({ icon }: { icon: Val['icon'] }) {
  const p = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (icon) {
    case 'handshake': return <svg {...p}><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>;
    case 'home': return <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case 'globe': return <svg {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case 'zap': return <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  }
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = T[locale] ?? T.de;

  const stats = [
    { v: '300+', l: t.statLabels[0], verify: true },
    { v: '10,000+', l: t.statLabels[1], verify: true },
    { v: '4.9★', l: t.statLabels[2], verify: true },
    { v: t.austriaWide, l: t.statLabels[3], verify: false },
  ];

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'AlpenTalent',
    url: 'https://alpentalent.com', logo: 'https://alpentalent.com/logo.png',
    description: 'Hospitality talent marketplace for Austria — AI matching with human support.',
    foundingLocation: { '@type': 'Place', addressCountry: 'AT', addressLocality: 'Vienna' },
    contactPoint: [{ '@type': 'ContactPoint', telephone: '+43-676-9124013', contactType: 'customer service', availableLanguage: ['German', 'English', 'Czech'] }],
    sameAs: [],
  };

  return (
    <SiteShell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div style={{ paddingBlock: 'clamp(64px, 10vw, 112px)' }}>
        <div className="at-container" style={{ maxWidth: 680 }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.eyebrow}</p>
          <h1 className="at-display" style={{ margin: '0 0 var(--space-3)' }}>{t.h1}</h1>
          <p style={{ margin: 0, fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{t.sub}</p>
        </div>
      </div>

      <Ridge variant="divider" opacity={0.06} />

      {/* Mission */}
      <section style={{ paddingBlock: 'var(--space-8)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
            <div>
              <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)' }}>{t.missionT}</h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.8 }}>{t.missionB}</p>
            </div>
            <div>
              <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)' }}>{t.howT}</h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.8 }}>{t.howB}</p>
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
                <p style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--at-alpine-green)', fontVariantNumeric: 'tabular-nums' }} {...(s.verify ? { 'data-placeholder': 'verify' } : {})}>{s.v}</p>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ paddingBlock: 'var(--space-8)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <h2 className="at-h2" style={{ margin: '0 0 var(--space-4)' }}>{t.believe}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
            {t.values.map(val => (
              <div key={val.title} className="at-card" style={{ padding: 'var(--space-3)' }}>
                <div style={{ marginBottom: 10, color: 'var(--at-alpine-green)' }}><ValIcon icon={val.icon} /></div>
                <p className="at-h3" style={{ margin: '0 0 6px' }}>{val.title}</p>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{val.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingBlock: 'var(--space-8)', textAlign: 'center', background: 'var(--bg-sunken)', borderTop: '1px solid var(--border)' }}>
        <div className="at-container" style={{ maxWidth: 480 }}>
          <h2 className="at-h2" style={{ margin: '0 0 8px' }}>{t.ctaT}</h2>
          <p style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)' }}>{t.ctaB}</p>
          <Link href={`/${locale}/contact`} className="at-btn at-btn--primary">{t.ctaBtn}</Link>
        </div>
      </section>
    </SiteShell>
  );
}
