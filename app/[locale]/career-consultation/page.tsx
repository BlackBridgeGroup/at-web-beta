import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../components/SiteShell';
import { BentoSection } from '../../../components/BentoSection';
import { Accordion } from '../../../components/Accordion';
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
    en: 'Career Consultation — Hospitality Career Consulting | AlpenTalent',
    de: 'Career Consultation — Karriereberatung Hotellerie | AlpenTalent',
    cz: 'Kariérní konzultace — kariérní poradenství v hotelnictví | AlpenTalent',
  };
  const descriptions: Record<Locale, string> = {
    en: 'A €100 professional hospitality career consultation for the DACH region — assessment, CV & document review, market orientation, and a personal action plan. Consulting only; no job or visa guarantee.',
    de: 'Eine professionelle Karriereberatung (€100) für die Hotellerie in der DACH-Region — Assessment, CV- und Dokumentenprüfung, Marktorientierung und persönlicher Aktionsplan. Nur Beratung; keine Job- oder Visa-Garantie.',
    cz: 'Profesionální kariérní konzultace (€100) pro hotelnictví v regionu DACH — posouzení, revize CV a dokumentů, orientace na trhu a osobní akční plán. Pouze poradenství; žádná garance práce ani víza.',
  };
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `https://alpentalent.com/${locale}/career-consultation`,
      languages: { de: '/de/career-consultation', cs: '/cz/career-consultation', en: '/en/career-consultation' },
    },
  };
}

// Icons matched to deliverables by index (not localized).
const ICONS = [
  <svg key="0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  <svg key="4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
  <svg key="5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
];

type Content = {
  hero: { eyebrow: string; h1: string; sub: string; price: string; book: string; ask: string };
  payDisclaimer: string;
  audienceTitle: string; audienceBody: string; audienceLink: string;
  incEyebrow: string; incHeading: string;
  includes: { title: string; body: string }[];
  howEyebrow: string; howHeading: string; steps: [string, string, string][];
  priceEyebrow: string; priceHeading: string; priceName: string; priceValue: string; priceNote: string; priceMethod: string; priceLegal: string; priceCta: string;
  legalTitle: string; legalBody: string;
  faqEyebrow: string; faqHeading: string; faq: [string, string][];
  ctaT: string; ctaB: string; ctaBtn: string;
};

const T: Record<string, Content> = {
  de: {
    hero: {
      eyebrow: 'Für internationale Kandidat:innen · Karriereberatung',
      h1: 'Starte deine Hospitality-Karriere in Österreich.',
      sub: 'Für Fachkräfte von außerhalb der EU: eine professionelle Karriereberatung für den Einstieg in die österreichische Hotellerie — Assessment, Dokumentenprüfung, Marktorientierung und ein persönlicher Aktionsplan. Danach kommst du in unseren Kandidatenpool.',
      price: '€100 · einmalig · für die Beratung',
      book: 'Beratung buchen',
      ask: 'Erst Fragen? WhatsApp',
    },
    payDisclaimer: 'Die Zahlung erhöht nicht deine Chancen auf ein Jobangebot, ein Visum oder eine Aufenthalts-/Arbeitserlaubnis. Über Visum und Arbeitserlaubnis entscheiden ausschließlich die österreichischen Behörden.',
    audienceTitle: 'Bist du EU-Bürger:in?',
    audienceBody: 'Dann darfst du in Österreich frei arbeiten und brauchst diese Beratung nicht. Für dich geht es direkt und kostenlos zu den offenen Rollen. Die Career Consultation ist für Fachkräfte von außerhalb der EU gedacht, die einen Weg nach Österreich aufbauen.',
    audienceLink: 'Offene Rollen ansehen →',
    incEyebrow: 'Was du bekommst', incHeading: 'Deine Career Consultation.',
    includes: [
      { title: 'Persönliche Beratung', body: 'Ein 1:1-Gespräch über deine Ziele, Erfahrung und realistische Wege in der DACH-Hotellerie.' },
      { title: 'Kandidaten-Assessment', body: 'Ehrliche Einschätzung deines Profils: Stärken, Lücken und wo du am besten passt.' },
      { title: 'CV- & Dokumentenprüfung', body: 'Wir prüfen Lebenslauf und Unterlagen und sagen dir, was für den DACH-Markt fehlt.' },
      { title: 'DACH-Marktorientierung', body: 'Überblick über Rollen, Regionen, Gehälter, Saison und wie die Branche in AT/DE/CH funktioniert.' },
      { title: 'Profil im Kandidatenpool', body: 'Dein Profil kommt in die AlpenTalent-Datenbank — Basis für spätere Vermittlung.' },
      { title: 'Persönlicher Aktionsplan', body: 'Konkrete nächste Schritte, damit du weißt, woran du arbeitest.' },
    ],
    howEyebrow: 'So läuft es', howHeading: 'Von der Buchung zum Kandidatenpool',
    steps: [
      ['01', 'Beratung buchen', 'Du buchst deine Career Consultation und wir stimmen einen Termin ab.'],
      ['02', 'Beratung & Assessment', 'Wir besprechen dein Profil, prüfen deine Unterlagen und geben ehrliches Feedback.'],
      ['03', 'Pool & nächste Schritte', 'Dein Profil kommt in den Pool. Passt du auf eine offene Rolle, starten wir den Recruiting-Prozess.'],
    ],
    priceEyebrow: 'Preis', priceHeading: 'Ein klarer Preis, keine Überraschungen.',
    priceName: 'Career Consultation', priceValue: '€100', priceNote: 'Einmalig, für die professionelle Beratung.', priceMethod: 'Bezahlung per Rechnung und Überweisung — nach der Buchung senden wir dir eine Rechnung.',
    priceLegal: 'Der Betrag ist die Bezahlung für Beratung — nicht für eine Anstellung und nicht für ein Visum.',
    priceCta: 'Beratung buchen',
    legalTitle: 'Wichtig — bitte lesen',
    legalBody: 'Die Career Consultation ist eine professionelle Beratungsleistung. Sie beinhaltet keine Garantie auf eine Anstellung und keine Garantie auf ein Visum oder eine Arbeitserlaubnis. Wir sind keine Rechts- oder Immigrationsberater. Der Recruiting-Erfolgshonorar wird von Arbeitgebern getragen — als Kandidat:in zahlst du nur die Beratung.',
    faqEyebrow: 'FAQ', faqHeading: 'Häufige Fragen',
    faq: [
      ['Was bekomme ich für €100?', 'Eine persönliche Beratung, ein Assessment deines Profils, CV- und Dokumentenprüfung, eine DACH-Marktorientierung, die Aufnahme in unseren Kandidatenpool und einen persönlichen Aktionsplan.'],
      ['Garantiert ihr mir einen Job oder ein Visum?', 'Nein. Die Career Consultation ist Beratung. Wir garantieren weder Anstellung noch Visum noch Arbeitserlaubnis und geben keine Rechtsberatung. Wir helfen dir, dich professionell und realistisch zu positionieren.'],
      ['Muss ich später für die Vermittlung zahlen?', 'Nein. Das Erfolgshonorar für eine Vermittlung zahlen die Arbeitgeber. Als Kandidat:in zahlst du nur die einmalige Beratung.'],
      ['Für wen ist das gedacht?', 'Für Hospitality-Fachkräfte von außerhalb der EU — z. B. Nepal, Philippinen, Indien, Sri Lanka, Indonesien, Vietnam. EU-Bürger:innen dürfen in Österreich ohne Bewilligung arbeiten und brauchen keine Beratung; für sie führt der Weg direkt und kostenlos über die offenen Rollen.'],
      ['Was passiert nach der Beratung?', 'Dein Profil bleibt in unserem Pool. Wenn eine offene Rolle zu dir passt, melden wir uns und starten den Recruiting-Prozess — nur mit deiner Zustimmung.'],
    ],
    ctaT: 'Bereit für den ersten Schritt?', ctaB: '30 Minuten. Ehrliche Einschätzung. Danach weißt du, wo du stehst.', ctaBtn: 'Beratung buchen',
  },
  cz: {
    hero: {
      eyebrow: 'Pro mezinárodní uchazeče · Kariérní poradenství',
      h1: 'Nastartuj svou kariéru v hotelnictví v Rakousku.',
      sub: 'Pro pracovníky mimo EU: profesionální kariérní konzultace pro vstup do rakouského hotelnictví — posouzení, revize dokumentů, orientace na trhu a osobní akční plán. Poté se dostaneš do našeho kandidátského poolu.',
      price: '€100 · jednorázově · za konzultaci',
      book: 'Rezervovat konzultaci',
      ask: 'Nejdřív dotazy? WhatsApp',
    },
    payDisclaimer: 'Platba nezvyšuje tvoje šance na nabídku práce, vízum ani povolení k pobytu/práci. O vízu a pracovním povolení rozhodují výhradně rakouské úřady.',
    audienceTitle: 'Jsi občan EU?',
    audienceBody: 'Pak můžeš v Rakousku pracovat volně a tuhle konzultaci nepotřebuješ. Pro tebe vede cesta rovnou a zdarma na otevřené pozice. Kariérní konzultace je pro pracovníky mimo EU, kteří si budují cestu do Rakouska.',
    audienceLink: 'Zobrazit otevřené pozice →',
    incEyebrow: 'Co dostaneš', incHeading: 'Tvá kariérní konzultace.',
    includes: [
      { title: 'Osobní konzultace', body: 'Rozhovor 1:1 o tvých cílech, praxi a reálných cestách v DACH hotelnictví.' },
      { title: 'Posouzení kandidáta', body: 'Upřímné zhodnocení tvého profilu: silné stránky, mezery a kam se nejlíp hodíš.' },
      { title: 'Revize CV a dokumentů', body: 'Projdeme životopis a podklady a řekneme ti, co pro DACH trh chybí.' },
      { title: 'Orientace na trhu DACH', body: 'Přehled pozic, regionů, platů, sezónnosti a jak obor funguje v AT/DE/CH.' },
      { title: 'Profil v kandidátském poolu', body: 'Tvůj profil se dostane do databáze AlpenTalent — základ pro pozdější umístění.' },
      { title: 'Osobní akční plán', body: 'Konkrétní další kroky, ať víš, na čem pracovat.' },
    ],
    howEyebrow: 'Jak to probíhá', howHeading: 'Od rezervace do kandidátského poolu',
    steps: [
      ['01', 'Rezervuj konzultaci', 'Rezervuješ si kariérní konzultaci a domluvíme termín.'],
      ['02', 'Konzultace a posouzení', 'Probereme tvůj profil, projdeme podklady a dáme upřímnou zpětnou vazbu.'],
      ['03', 'Pool a další kroky', 'Tvůj profil jde do poolu. Když sedneš na otevřenou pozici, spustíme nábor.'],
    ],
    priceEyebrow: 'Cena', priceHeading: 'Jasná cena, žádná překvapení.',
    priceName: 'Kariérní konzultace', priceValue: '€100', priceNote: 'Jednorázově, za profesionální poradenství.', priceMethod: 'Platba fakturou a převodem — po rezervaci ti pošleme fakturu.',
    priceLegal: 'Částka je platbou za poradenství — ne za zaměstnání a ne za vízum.',
    priceCta: 'Rezervovat konzultaci',
    legalTitle: 'Důležité — přečti si',
    legalBody: 'Kariérní konzultace je profesionální poradenská služba. Nezahrnuje garanci zaměstnání ani garanci víza či pracovního povolení. Nejsme právní ani imigrační poradci. Náborový success fee platí zaměstnavatelé — jako uchazeč platíš pouze konzultaci.',
    faqEyebrow: 'FAQ', faqHeading: 'Časté dotazy',
    faq: [
      ['Co dostanu za €100?', 'Osobní konzultaci, posouzení profilu, revizi CV a dokumentů, orientaci na trhu DACH, zařazení do kandidátského poolu a osobní akční plán.'],
      ['Garantujete práci nebo vízum?', 'Ne. Kariérní konzultace je poradenství. Negarantujeme zaměstnání, vízum ani pracovní povolení a neposkytujeme právní poradenství. Pomůžeme ti nastavit se profesionálně a realisticky.'],
      ['Musím pak platit za nábor?', 'Ne. Success fee za umístění platí zaměstnavatelé. Jako uchazeč platíš jen jednorázovou konzultaci.'],
      ['Pro koho to je?', 'Pro pracovníky v hotelnictví mimo EU — např. Nepál, Filipíny, Indie, Srí Lanka, Indonésie, Vietnam. Občané EU můžou v Rakousku pracovat bez povolení a konzultaci nepotřebují; pro ně vede cesta rovnou a zdarma přes otevřené pozice.'],
      ['Co se děje po konzultaci?', 'Tvůj profil zůstává v poolu. Když se objeví vhodná pozice, ozveme se a spustíme nábor — jen s tvým souhlasem.'],
    ],
    ctaT: 'Připraven udělat první krok?', ctaB: '30 minut. Upřímné zhodnocení. Pak víš, kde stojíš.', ctaBtn: 'Rezervovat konzultaci',
  },
  en: {
    hero: {
      eyebrow: 'For international candidates · Career consulting',
      h1: 'Start your hospitality career in Austria.',
      sub: 'For professionals from outside the EU: a professional career consultation for entering Austrian hospitality — assessment, document review, market orientation, and a personal action plan. Afterwards you enter our candidate pool.',
      price: '€100 · one-time · for the consultation',
      book: 'Book a consultation',
      ask: 'Questions first? WhatsApp',
    },
    payDisclaimer: 'Payment does not increase your chances of a job offer, visa, or residence/work permit. Visas and work authorization are decided exclusively by the Austrian authorities.',
    audienceTitle: 'Are you an EU citizen?',
    audienceBody: 'Then you can work in Austria freely and don’t need this consultation. For you the path goes straight to the open roles, for free. The Career Consultation is for professionals from outside the EU building a path to Austria.',
    audienceLink: 'See open roles →',
    incEyebrow: 'What you get', incHeading: 'Your Career Consultation.',
    includes: [
      { title: 'Personal consultation', body: 'A 1:1 conversation about your goals, experience, and realistic paths in DACH hospitality.' },
      { title: 'Candidate assessment', body: 'An honest read on your profile: strengths, gaps, and where you fit best.' },
      { title: 'CV & document review', body: 'We review your CV and documents and tell you what the DACH market expects.' },
      { title: 'DACH market orientation', body: 'An overview of roles, regions, pay, seasonality, and how the industry works in AT/DE/CH.' },
      { title: 'Profile in the candidate pool', body: 'Your profile enters the AlpenTalent database — the basis for future matching.' },
      { title: 'Personal action plan', body: 'Concrete next steps, so you know exactly what to work on.' },
    ],
    howEyebrow: 'How it works', howHeading: 'From booking to the candidate pool',
    steps: [
      ['01', 'Book a consultation', 'You book your Career Consultation and we agree a time.'],
      ['02', 'Consultation & assessment', 'We discuss your profile, review your documents, and give honest feedback.'],
      ['03', 'Pool & next steps', 'Your profile enters the pool. If you fit an open role, we start the recruitment process.'],
    ],
    priceEyebrow: 'Price', priceHeading: 'One clear price, no surprises.',
    priceName: 'Career Consultation', priceValue: '€100', priceNote: 'One-time, for the professional consultation.', priceMethod: 'Payment by invoice and bank transfer — we send you an invoice after booking.',
    priceLegal: 'The fee is payment for consulting — not for employment, and not for a visa.',
    priceCta: 'Book a consultation',
    legalTitle: 'Important — please read',
    legalBody: 'The Career Consultation is a professional consulting service. It does not include any guarantee of employment and no guarantee of a visa or work permit. We are not legal or immigration advisors. The recruitment success fee is paid by employers — as a candidate you pay only for the consultation.',
    faqEyebrow: 'FAQ', faqHeading: 'Common questions',
    faq: [
      ['What do I get for €100?', 'A personal consultation, an assessment of your profile, a CV and document review, a DACH market orientation, entry into our candidate pool, and a personal action plan.'],
      ['Do you guarantee a job or a visa?', 'No. The Career Consultation is consulting. We do not guarantee employment, a visa, or a work permit, and we do not give legal advice. We help you position yourself professionally and realistically.'],
      ['Do I have to pay for placement later?', 'No. The placement success fee is paid by employers. As a candidate you only pay the one-time consultation.'],
      ['Who is this for?', 'Hospitality professionals from outside the EU — e.g. Nepal, Philippines, India, Sri Lanka, Indonesia, Vietnam. EU citizens can work in Austria without a permit and don’t need this; for them the path goes straight to the open roles, for free.'],
      ['What happens after the consultation?', 'Your profile stays in our pool. When a suitable role comes up, we reach out and start the recruitment process — only with your consent.'],
    ],
    ctaT: 'Ready to take the first step?', ctaB: '30 minutes. An honest read. Afterwards you know where you stand.', ctaBtn: 'Book a consultation',
  },
};

const WHATSAPP = 'https://wa.me/436769124013';

export default async function EntryConsultation({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = T[locale] ?? T.de;
  const contactHref = `/${locale}/contact`;

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
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.75 }}>{t.hero.eyebrow}</p>
          <h1 className="at-display" style={{ color: '#fff', margin: '0 0 var(--space-3)' }}>{t.hero.h1}</h1>
          <p style={{ margin: '0 0 var(--space-3)', fontSize: '1.125rem', opacity: 0.9, lineHeight: 1.6 }}>{t.hero.sub}</p>
          <p style={{ margin: '0 0 var(--space-4)', fontWeight: 700, fontSize: '1rem', opacity: 0.95 }}>{t.hero.price}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href={contactHref} className="at-btn" style={{ background: '#fff', color: 'var(--at-alpine-green)', fontWeight: 700 }}>{t.hero.book}</Link>
            <a href={WHATSAPP} className="at-btn" style={{ background: 'transparent', color: '#fff', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.5)' }}>{t.hero.ask}</a>
          </div>
          <p style={{ margin: 'var(--space-3) 0 0', fontSize: '0.75rem', opacity: 0.8, lineHeight: 1.6, maxWidth: 560 }}>{t.payDisclaimer}</p>
        </div>
        <div style={{ marginTop: 64 }}><Ridge variant="hero" opacity={1} /></div>
      </section>

      {/* Audience clarifier — EU vs non-EU */}
      <section style={{ paddingBlock: 'var(--space-5)', background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)' }}>
        <div className="at-container" style={{ maxWidth: 820, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ maxWidth: 620 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, color: 'var(--text)' }}>{t.audienceTitle}</p>
            <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{t.audienceBody}</p>
          </div>
          <Link href={`/${locale}/jobs`} className="at-btn" style={{ boxShadow: 'inset 0 0 0 1.5px var(--primary)', color: 'var(--primary)', fontWeight: 700, whiteSpace: 'nowrap' }}>{t.audienceLink}</Link>
        </div>
      </section>

      {/* What's included */}
      <BentoSection
        eyebrow={t.incEyebrow}
        heading={t.incHeading}
        tiles={t.includes.map((s, i) => ({ icon: ICONS[i], title: s.title, body: s.body }))}
      />

      {/* How it works */}
      <section style={{ paddingBlock: 'var(--space-8)', background: 'var(--bg-sunken)' }}>
        <div className="at-container" style={{ maxWidth: 800 }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.howEyebrow}</p>
          <h2 className="at-h1" style={{ margin: '0 0 var(--space-4)' }}>{t.howHeading}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
            {t.steps.map(([num, title, body]) => (
              <div key={num} style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--at-alpine-green)', lineHeight: 1, flexShrink: 0 }}>{num}</span>
                <div>
                  <p className="at-h3" style={{ margin: '0 0 4px' }}>{title}</p>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price */}
      <section style={{ paddingBlock: 'var(--space-8)' }}>
        <div className="at-container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-5)' }}>
            <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.priceEyebrow}</p>
            <h2 className="at-h1" style={{ margin: 0 }}>{t.priceHeading}</h2>
          </div>
          <div className="at-card" style={{ maxWidth: 420, margin: '0 auto', padding: 'var(--space-5)', textAlign: 'center', border: '2px solid var(--at-alpine-green)' }}>
            <p style={{ margin: '0 0 4px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t.priceName}</p>
            <p style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '3rem', color: 'var(--at-alpine-green)', lineHeight: 1 }}>{t.priceValue}</p>
            <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9375rem', color: 'var(--text-muted)' }}>{t.priceNote}</p>
            <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{t.priceMethod}</p>
            <p style={{ margin: '0 0 var(--space-3)', fontSize: '0.8125rem', color: 'var(--text-subtle)', lineHeight: 1.6 }}>{t.priceLegal}</p>
            <Link href={contactHref} className="at-btn at-btn--primary" style={{ width: '100%', justifyContent: 'center', fontWeight: 700 }}>{t.priceCta}</Link>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.6875rem', color: 'var(--text-subtle)', lineHeight: 1.5 }}>{t.payDisclaimer}</p>
          </div>
        </div>
      </section>

      {/* Legal band */}
      <section style={{ paddingBlock: 'var(--space-6)', background: 'var(--bg-sunken)', borderBlock: '1px solid var(--border)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: '0.9375rem' }}>{t.legalTitle}</p>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>{t.legalBody}</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingBlock: 'var(--space-8)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.faqEyebrow}</p>
          <h2 className="at-h1" style={{ margin: '0 0 var(--space-4)' }}>{t.faqHeading}</h2>
          <Accordion items={t.faq} />
        </div>
      </section>

      {/* CTA band */}
      <section style={{ background: 'var(--at-alpine-green)', color: '#fff', paddingBlock: 'var(--space-8)', textAlign: 'center' }}>
        <div className="at-container" style={{ maxWidth: 620 }}>
          <h2 className="at-h1" style={{ color: '#fff', margin: '0 0 8px' }}>{t.ctaT}</h2>
          <p style={{ margin: '0 0 var(--space-4)', opacity: 0.9 }}>{t.ctaB}</p>
          <Link href={contactHref} className="at-btn" style={{ background: '#fff', color: 'var(--at-alpine-green)', fontWeight: 700 }}>{t.ctaBtn}</Link>
        </div>
      </section>
    </SiteShell>
  );
}
