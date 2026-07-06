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
    en: 'For Hotels & Restaurants | AlpenTalent',
    de: 'Für Hotellerie & Gastronomie | AlpenTalent',
    cz: 'Pro hotely a restaurace | AlpenTalent',
  };
  const descriptions: Record<Locale, string> = {
    en: 'Pre-screened, language-matched hospitality talent for Austrian hotels and restaurants. Retained search, lead-gen campaigns, and embedded RPO.',
    de: 'Vorgeprüfte, sprachlich passende Mitarbeiter für Hotellerie und Gastronomie in Österreich.',
    cz: 'Předem prověření pracovníci v hotelnictví pro rakouské hotely a restaurace.',
  };
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `https://alpentalent.com/${locale}/for-employers`,
      languages: { de: '/de/for-employers', cs: '/cz/for-employers', en: '/en/for-employers' },
    },
  };
}

// Icons are not localized — matched to services by index.
const SERVICE_ICONS = [
  <svg key="0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>,
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  <svg key="4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
];

type Content = {
  hero: { eyebrow: string; h1: string; sub: string; post: string; talk: string };
  servEyebrow: string; servHeading: string;
  services: { title: string; body: string }[];
  howEyebrow: string; howHeading: string; steps: [string, string, string][];
  priceEyebrow: string; priceHeading: string; priceSub: string;
  tiers: { name: string; price: string; description: string; features: string[]; cta: string; kind: 'login' | 'contact'; featured?: boolean }[];
  faqEyebrow: string; faqHeading: string; faq: [string, string][];
  ctaT: string; ctaB: string;
};

const T: Record<string, Content> = {
  de: {
    hero: { eyebrow: 'Für Hotels & Restaurants', h1: 'Personal für Hotellerie & Gastronomie, das bereit für Österreich ist.', sub: 'Vorgeprüft, sprachlich passend, wohnbewusst. Menschen, die bleiben.', post: 'Stelle ausschreiben', talk: 'Sprechen Sie mit uns' },
    servEyebrow: 'Unsere Leistungen', servHeading: 'Alles, was du für dein Team brauchst.',
    services: [
      { title: 'Offene Stellen', body: 'Schreibe Stellen aus und verwalte deine offenen Positionen im Arbeitgeber-Dashboard.' },
      { title: 'Passende Kandidaten', body: 'Erhalte vorgeprüfte, sprachlich passende Kandidaten, die bereit für Österreich sind.' },
      { title: 'Interviews', body: 'Wir helfen bei Vorbereitung und Koordination. Du wählst, wen du triffst.' },
      { title: 'Vermittlungen', body: 'Verfolge Vermittlungen und Schnuppertage an einem Ort.' },
      { title: 'Kampagnen', body: 'Meta-Kampagnen und Landing Pages, die Kandidaten direkt zu dir bringen.' },
      { title: 'Employer Branding', body: 'Hebe dich von anderen ab — bei Fachkräften in Österreich und Mitteleuropa.' },
    ],
    howEyebrow: 'So läuft die Einstellung', howHeading: 'Von der Stelle bis zum ersten Tag in 3 Schritten',
    steps: [
      ['01', 'Sag uns, was du brauchst', 'Schreibe eine Stelle aus oder sprich mit unserem Team. Wir klären Rolle, Timing und Anforderungen.'],
      ['02', 'Erhalte passende Kandidaten', 'Innerhalb von Tagen erhältst du vorgeprüfte Profile, passend zu deiner Rolle und deinem Hotel.'],
      ['03', 'Interview & Vermittlung', 'Triff die Kandidaten, vereinbare einen Schnuppertag — wir begleiten dich bis zur Vermittlung.'],
    ],
    priceEyebrow: 'Preise', priceHeading: 'Einfache Wege, mit uns zu arbeiten.', priceSub: 'Keine Überraschungen. Der genaue Preis hängt von deinem Bedarf ab — sprich mit uns.',
    tiers: [
      { name: 'Lead-Gen', price: 'Setup-Gebühr', description: 'Wir schalten Meta-Kampagnen, die Kandidateninteresse direkt zu dir bringen.', features: ['Meta-Werbekampagnen', 'Landing Page', 'WhatsApp-Automatisierung', 'Wöchentliches Reporting'], cta: 'Sprechen Sie mit uns', kind: 'contact' },
      { name: 'Retained Search', price: 'Festpreis pro Vermittlung', description: 'Wir finden, prüfen und vermitteln die richtige Person. Du zahlst erst, wenn jemand antritt.', features: ['Kandidatensuche', 'Manuelle Prüfung', 'Sprachbewertung', 'Koordination Schnuppertag'], cta: 'Loslegen', kind: 'login', featured: true },
      { name: 'Embedded / RPO', price: 'Monatliches Retainer', description: 'AlpenTalent wird deine eingebettete Recruiting-Funktion — wir betreiben deine gesamte Pipeline.', features: ['Dedizierter Recruiter', 'Unbegrenzte Vermittlungen', 'Pipeline-Management', 'Employer Branding'], cta: 'Sprechen Sie mit uns', kind: 'contact' },
    ],
    faqEyebrow: 'FAQ', faqHeading: 'Fragen von Hotels',
    faq: [
      ['Wie schnell findet ihr Kandidaten?', 'Das hängt von Rolle, Region und Saison ab. Wenn das Anforderungsprofil klar ist, starten wir sofort mit Suche, Prüfung und Ansprache.'],
      ['Vermittelt ihr nur tschechische und slowakische Kandidaten?', 'Unsere Spezialisierung sind Hospitality-Fachkräfte aus Mitteleuropa — Tschechien, Slowakei und zunehmend Ungarn und Rumänien. EU-Bürger dürfen in Österreich frei arbeiten, es gibt also keine Visa-Hürden.'],
      ['Was, wenn eine Vermittlung nicht klappt?', 'Bei Retained-Search-Vermittlungen bieten wir eine Ersatzgarantie. Verlässt ein vermittelter Kandidat innerhalb der Garantiezeit, suchen und vermitteln wir ohne zusätzliche Gebühr Ersatz. Details stehen in deiner Vereinbarung.'],
      ['Koordiniert ihr die Unterkunft?', 'Wir kommunizieren deine Wohnsituation beim Matching an die Kandidaten — viele bevorzugen Stellen mit Personalunterkunft. Wir beraten, wie du dein Angebot klar darstellst; die Unterkunft selbst organisieren wir nicht.'],
      ['Kann ich ohne Registrierung eine Stelle ausschreiben?', 'Für die Ausschreibung brauchst du eine kurze Google-Anmeldung. Wir prüfen deine Hoteldaten vor dem Matching, damit Kandidaten nur seriöse Anfragen sehen.'],
      ['Ist der Preis verhandelbar?', 'Unsere Servicemodelle richten sich nach deinem Volumen und deiner Situation. Lead-Gen und RPO sind besonders flexibel. Sprich mit uns — wir finden lieber ein passendes Modell, als einen guten Partner an einer starren Preisliste zu verlieren.'],
    ],
    ctaT: 'Bereit, dein nächstes Teammitglied zu treffen?', ctaB: 'Schreibe in Minuten eine Stelle aus oder sprich zuerst mit uns.',
  },
  cz: {
    hero: { eyebrow: 'Pro hotely a restaurace', h1: 'Personál pro pohostinství, připravený do Rakouska.', sub: 'Prověření, jazykově sladění, s vyřešeným bydlením. Lidé, kteří zůstanou.', post: 'Zadat pozici', talk: 'Ozvěte se nám' },
    servEyebrow: 'Naše služby', servHeading: 'Vše, co potřebuješ pro svůj tým.',
    services: [
      { title: 'Otevřené pozice', body: 'Zadávej pozice a spravuj je v zaměstnavatelském dashboardu.' },
      { title: 'Spárovaní kandidáti', body: 'Dostávej prověřené, jazykově sladěné kandidáty připravené do Rakouska.' },
      { title: 'Pohovory', body: 'Pomůžeme s přípravou a koordinací. Ty vybíráš, koho potkáš.' },
      { title: 'Umístění', body: 'Sleduj umístění a zkušební směny na jednom místě.' },
      { title: 'Kampaně', body: 'Meta kampaně a landing pages, které přivedou kandidáty přímo k tobě.' },
      { title: 'Employer branding', body: 'Vynikni mezi profesionály v Rakousku a střední Evropě.' },
    ],
    howEyebrow: 'Jak nábor probíhá', howHeading: 'Od pozice po první den ve 3 krocích',
    steps: [
      ['01', 'Řekni nám, co potřebuješ', 'Zadej pozici nebo mluv s naším týmem. Vyjasníme roli, načasování a požadavky.'],
      ['02', 'Dostaneš spárované kandidáty', 'Během pár dní dostaneš prověřené profily na míru tvé pozici a hotelu.'],
      ['03', 'Pohovor & umístění', 'Potkej kandidáty, domluv zkušební směnu — provedeme tě až k umístění.'],
    ],
    priceEyebrow: 'Ceny', priceHeading: 'Jednoduché způsoby spolupráce.', priceSub: 'Žádná překvapení. Přesná cena závisí na tvých potřebách — ozvi se.',
    tiers: [
      { name: 'Lead-gen', price: 'Vstupní poplatek', description: 'Spustíme Meta kampaně, které přivedou zájem kandidátů přímo k tobě.', features: ['Meta reklamní kampaně', 'Landing page', 'WhatsApp automatizace', 'Týdenní reporting'], cta: 'Ozvěte se nám', kind: 'contact' },
      { name: 'Retained search', price: 'Pevná cena za umístění', description: 'Najdeme, prověříme a umístíme správného člověka. Platíš, až někdo nastoupí.', features: ['Vyhledávání kandidátů', 'Ruční prověření', 'Jazykové posouzení', 'Koordinace zkušební směny'], cta: 'Začít', kind: 'login', featured: true },
      { name: 'Embedded / RPO', price: 'Měsíční paušál', description: 'AlpenTalent funguje jako tvé interní recruiting oddělení — vedeme celou pipeline.', features: ['Vyhrazený recruiter', 'Neomezená umístění', 'Správa pipeline', 'Employer branding'], cta: 'Ozvěte se nám', kind: 'contact' },
    ],
    faqEyebrow: 'FAQ', faqHeading: 'Otázky od hotelů',
    faq: [
      ['Jak rychle najdete kandidáty?', 'Záleží na pozici, regionu a sezóně. Když je zadání jasné, začínáme hned se sourcingem, kontrolou a oslovením.'],
      ['Umisťujete jen české a slovenské kandidáty?', 'Specializujeme se na profesionály ze střední Evropy — Česko, Slovensko a stále víc Maďarsko a Rumunsko. Občané EU mohou v Rakousku volně pracovat, takže žádné vízové překážky.'],
      ['Co když umístění nevyjde?', 'U retained search nabízíme garanční dobu na náhradu. Pokud umístěný kandidát odejde během garance, najdeme a umístíme náhradu bez dalšího poplatku. Detaily jsou ve smlouvě.'],
      ['Zařizujete bydlení?', 'Situaci s bydlením sdělujeme kandidátům při párování — mnozí preferují pozice s ubytováním. Poradíme, jak nabídku jasně prezentovat; samotné bydlení nezařizujeme.'],
      ['Můžu zadat pozici bez registrace?', 'K zadání potřebuješ rychlé přihlášení přes Google. Údaje hotelu ověřujeme před matchingem, aby kandidáti viděli jen seriózní poptávky.'],
      ['Je cena vyjednatelná?', 'Naše modely se přizpůsobí tvému objemu a situaci. Lead-gen a RPO jsou obzvlášť flexibilní. Ozvi se — radši najdeme model, který sedí, než abychom kvůli rigidnímu ceníku přišli o dobrého partnera.'],
    ],
    ctaT: 'Připraveni potkat svého dalšího kolegu?', ctaB: 'Zadej pozici za pár minut, nebo se nejdřív ozvi.',
  },
  en: {
    hero: { eyebrow: 'For hotels & restaurants', h1: "Hire hospitality talent that's ready for Austria.", sub: "Pre-screened, language-matched, housing-aware. People who'll stay.", post: 'Post a vacancy', talk: 'Talk to us' },
    servEyebrow: 'Our services', servHeading: 'Everything you need to build your team.',
    services: [
      { title: 'Active vacancies', body: 'Post roles and manage your open positions from your employer dashboard.' },
      { title: 'Matched candidates', body: 'Receive pre-screened, language-matched candidates who are ready for Austria.' },
      { title: 'Interviews', body: 'We help you prepare and coordinate. You choose who to meet.' },
      { title: 'Placements', body: 'Track placements and trial shifts in one place.' },
      { title: 'Campaigns', body: 'Meta campaigns and landing pages that bring candidates directly to you.' },
      { title: 'Employer branding', body: 'Stand out to hospitality talent across Austria and Central Europe.' },
    ],
    howEyebrow: 'How hiring works', howHeading: 'From vacancy to first day in 3 steps',
    steps: [
      ['01', 'Tell us what you need', 'Post a vacancy or speak with our team. We clarify role, timing, and requirements.'],
      ['02', 'Receive matched candidates', 'Within days, you receive pre-screened profiles matched to your specific role and hotel.'],
      ['03', 'Interview & place', 'Meet the candidates, arrange a trial shift, and we support you through to placement.'],
    ],
    priceEyebrow: 'Pricing', priceHeading: 'Simple ways to work with us.', priceSub: 'No surprises. The exact pricing depends on your needs — talk to us.',
    tiers: [
      { name: 'Lead-gen', price: 'Setup fee', description: 'We run Meta campaigns that bring inbound candidate interest directly to you.', features: ['Meta ad campaigns', 'Landing page', 'WhatsApp automation', 'Weekly reporting'], cta: 'Talk to us', kind: 'contact' },
      { name: 'Retained search', price: 'Fixed fee per placement', description: 'We find, screen, and place the right person. You pay only when someone starts.', features: ['Candidate sourcing', 'Manual screening', 'Language assessment', 'Trial shift coordination'], cta: 'Get started', kind: 'login', featured: true },
      { name: 'Embedded / RPO', price: 'Monthly retainer', description: 'AlpenTalent acts as your embedded talent function — we run your whole hiring pipeline.', features: ['Dedicated recruiter', 'Unlimited placements', 'Pipeline management', 'Employer branding'], cta: 'Talk to us', kind: 'contact' },
    ],
    faqEyebrow: 'FAQ', faqHeading: 'Questions from hotels',
    faq: [
      ['How quickly can you find candidates?', 'It depends on role, region, and season. Once the requirement is clear, we start sourcing, screening, and outreach immediately.'],
      ['Do you only place Czech and Slovak candidates?', 'Our primary specialisation is Central European hospitality talent — Czech Republic, Slovakia, and increasingly Hungary and Romania. EU citizens have the right to work freely in Austria, so there are no visa hurdles.'],
      ["What if a placement doesn't work out?", 'We offer a replacement guarantee period on retained search placements. If a placed candidate leaves within the guarantee window, we source and place a replacement at no additional fee. Details are in your service agreement.'],
      ['Do you coordinate housing?', 'We communicate your housing situation to candidates during matching — many prioritise roles with staff housing. We advise on how to present your housing offering clearly; we do not arrange housing on your behalf.'],
      ['Can I post a vacancy without registering?', 'You need a quick Google sign-in to post a vacancy. We verify hotel details before matching so candidates only see serious enquiries.'],
      ['Is pricing negotiable?', "Our service models are designed around your volume and situation. Lead-gen and RPO pricing is especially flexible. Talk to us — we'd rather find a model that fits than lose a good-fit partner over a rigid rate card."],
    ],
    ctaT: 'Ready to meet your next team member?', ctaB: 'Post a vacancy in minutes or talk to us first.',
  },
};

export default async function ForEmployers({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = T[locale] ?? T.de;
  const loginHref = '/login?role=employer';
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
          <p style={{ margin: '0 0 var(--space-4)', fontSize: '1.125rem', opacity: 0.9, lineHeight: 1.6 }}>{t.hero.sub}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href={loginHref} className="at-btn" style={{ background: '#fff', color: 'var(--at-alpine-green)', fontWeight: 700 }}>{t.hero.post}</Link>
            <Link href={contactHref} className="at-btn" style={{ background: 'transparent', color: '#fff', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.5)' }}>{t.hero.talk}</Link>
          </div>
        </div>
        <div style={{ marginTop: 64 }}><Ridge variant="hero" opacity={1} /></div>
      </section>

      {/* Services bento */}
      <BentoSection
        eyebrow={t.servEyebrow}
        heading={t.servHeading}
        tiles={t.services.map((s, i) => ({ icon: SERVICE_ICONS[i], title: s.title, body: s.body }))}
      />

      {/* How hiring works */}
      <section style={{ paddingBlock: 'var(--space-8)', background: 'var(--bg-sunken)' }}>
        <div className="at-container" style={{ maxWidth: 800 }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.howEyebrow}</p>
          <h2 className="at-h1" style={{ margin: '0 0 var(--space-4)' }}>{t.howHeading}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
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

      {/* Pricing */}
      <section style={{ paddingBlock: 'var(--space-8)' }}>
        <div className="at-container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.priceEyebrow}</p>
            <h2 className="at-h1" style={{ margin: '0 0 8px' }}>{t.priceHeading}</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>{t.priceSub}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-2)' }}>
            {t.tiers.map(tier => (
              <div key={tier.name} className="at-card" style={{ padding: 'var(--space-4)', background: tier.featured ? 'var(--at-alpine-green)' : 'var(--bg-elevated)', color: tier.featured ? '#fff' : 'var(--text)', border: tier.featured ? '2px solid var(--at-alpine-green)' : undefined }}>
                <p style={{ margin: '0 0 4px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>{tier.name}</p>
                <p className="at-h2" style={{ margin: '0 0 8px', color: tier.featured ? '#fff' : 'var(--text)' }}>{tier.price}</p>
                <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.875rem', opacity: 0.85, lineHeight: 1.6 }}>{tier.description}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-3)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', opacity: 0.9 }}>
                      <span aria-hidden="true" style={{ color: tier.featured ? 'var(--at-alpine-light)' : 'var(--at-alpine-green)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={tier.kind === 'login' ? loginHref : contactHref} className="at-btn" style={{ width: '100%', justifyContent: 'center', background: tier.featured ? '#fff' : 'transparent', color: tier.featured ? 'var(--at-alpine-green)' : 'var(--primary)', boxShadow: tier.featured ? 'none' : 'inset 0 0 0 1.5px var(--primary)', fontWeight: 700 }}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingBlock: 'var(--space-8)', background: 'var(--bg-sunken)', borderTop: '1px solid var(--border)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.faqEyebrow}</p>
          <h2 className="at-h1" style={{ margin: '0 0 var(--space-4)' }}>{t.faqHeading}</h2>
          <div>
            <Accordion items={t.faq} />
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ paddingBlock: 'var(--space-6)', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="at-container" style={{ textAlign: 'center' }}>
          <h2 className="at-h2" style={{ margin: '0 0 8px' }}>{t.ctaT}</h2>
          <p style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)' }}>{t.ctaB}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link href={loginHref} className="at-btn at-btn--primary">{t.hero.post}</Link>
            <Link href={contactHref} className="at-btn at-btn--secondary">{t.hero.talk}</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
