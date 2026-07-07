import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { Accordion } from '../../../components/Accordion';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const raw = (await params).locale;
  const locale = normalizeLocale(raw) as Locale;
  const titles: Record<Locale, string> = {
    en: 'FAQ — Frequently Asked Questions',
    de: 'Häufig gestellte Fragen',
    cz: 'Časté dotazy',
  };
  const descriptions: Record<Locale, string> = {
    en: 'Answers to common questions about finding a hospitality job in Austria, housing, and working with AlpenTalent.',
    de: 'Antworten zu Jobs in Österreich, Unterkunft, Bewerbungsprozess und Zusammenarbeit mit AlpenTalent.',
    cz: 'Odpovědi k práci v Rakousku, ubytování, profilu uchazeče a spolupráci s AlpenTalent.',
  };
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `https://alpentalent.com/${locale}/faq`,
      languages: { de: '/de/faq', cs: '/cz/faq', en: '/en/faq' },
    },
  };
}

type FaqContent = {
  h1: string;
  description: string;
  groups: { heading: string; items: [string, string][] }[];
};

const content: Record<Locale, FaqContent> = {
  de: {
    h1: 'Häufig gestellte Fragen',
    description: 'Antworten zu Jobs in Österreich, Unterkunft, Bewerbungsprozess und Zusammenarbeit mit AlpenTalent.',
    groups: [
      {
        heading: 'Kandidaten',
        items: [
          ['Ist AlpenTalent für Kandidaten kostenlos?', 'Ja. Kandidaten zahlen nichts für die Vermittlung. Die Gebühr wird vom Arbeitgeber getragen.'],
          ['Muss ich Deutsch sprechen?', 'Nicht immer. Manche Rollen sind englischfreundlich; wir prüfen, welches Sprachniveau die jeweilige Stelle wirklich braucht.'],
          ['Hilft AlpenTalent bei der Unterkunft?', 'Viele Hotels bieten Personalunterkunft an. Wir klären das vorab und berücksichtigen es beim Matching.'],
          ['Wie lange dauert es, eine Rolle zu finden?', 'Unser Team prüft Profile manuell. Wenn eine passende Rolle verfügbar ist, bekommst du den nächsten Schritt direkt. Wenn nicht, bleibt dein Profil für neue Rollen aktiv.'],
          ['Kann ich mich von außerhalb Österreichs bewerben?', 'Ja. Wir arbeiten vor allem mit Kandidaten aus der EU. EU-Bürger dürfen grundsätzlich frei in Österreich arbeiten.'],
          ['Welche Rollen gibt es?', 'Rezeption, Küche, Housekeeping, Service und Managementrollen in österreichischen Hotels und Restaurants — saisonal oder ganzjährig.'],
          ['Was passiert nach dem Profil?', 'Wir prüfen dein Profil manuell. Nur wenn Region, Erfahrung, Sprache und Verfügbarkeit passen, schlagen wir eine konkrete Rolle vor.'],
        ],
      },
      {
        heading: 'Arbeitgeber',
        items: [
          ['Wie schnell findet ihr Kandidaten?', 'Das hängt von Rolle, Region und Saison ab. Bei klaren Anforderungen starten wir sofort mit Suche und Prüfung.'],
          ['Was kostet AlpenTalent?', 'Die Konditionen hängen vom Bedarf ab. Für den Start empfehlen wir eine kurze Anfrage, damit wir Rolle, Volumen und Modell sauber klären.'],
          ['Vermittelt ihr nur EU-Kandidaten?', 'Unser Schwerpunkt liegt auf mitteleuropäischen Kandidaten (EU), zunehmend auch international. Je nach Rolle und Arbeitgeber prüfen wir passende Profile aus verschiedenen Ländern.'],
          ['Was passiert, wenn eine Vermittlung nicht klappt?', 'Für vermittelte Rollen können Ersatz- oder Nachbesetzungsregeln vereinbart werden. Die genauen Bedingungen gehören in die konkrete Vereinbarung.'],
        ],
      },
      {
        heading: 'Unterkunft',
        items: [
          ['Was ist Personalunterkunft?', 'Viele österreichische Hotels stellen Zimmer oder Apartments für Mitarbeitende bereit, oft in der Nähe des Betriebs.'],
          ['Ist Unterkunft im Gehalt enthalten?', 'Das ist je nach Arbeitgeber unterschiedlich. Wir klären vorab, ob Unterkunft kostenlos ist oder ein Abzug vereinbart wird.'],
          ['Muss ich selbst eine Wohnung finden?', 'Nur wenn die Rolle keine Personalunterkunft beinhaltet. Unsere Ratgeber erklären Anmeldung, private Wohnungssuche und typische Abläufe.'],
          ['Was ist die Anmeldung?', 'Die Anmeldung ist die verpflichtende Wohnsitzmeldung in Österreich. Sie ist wichtig für Bankkonto, Sozialversicherung und weitere Behördenschritte.'],
        ],
      },
    ],
  },
  cz: {
    h1: 'Časté dotazy',
    description: 'Odpovědi k práci v Rakousku, ubytování, profilu uchazeče a spolupráci s AlpenTalent.',
    groups: [
      {
        heading: 'Uchazeči',
        items: [
          ['Je AlpenTalent pro uchazeče zdarma?', 'Ano. Uchazeči nic neplatí. Poplatek za zprostředkování hradí zaměstnavatel.'],
          ['Musím umět německy?', 'Ne vždy. Některé role jsou vhodné i s angličtinou; vždy řešíme skutečný požadavek konkrétní pozice.'],
          ['Pomůžete mi s ubytováním?', 'Mnoho hotelů nabízí ubytování pro personál. Předem ověřujeme, jestli je dostupné a za jakých podmínek.'],
          ['Jak dlouho trvá najít práci?', 'Profil kontrolujeme ručně. Pokud máme vhodnou roli, ozveme se s dalším krokem. Pokud ne, profil necháme aktivní pro nové příležitosti.'],
          ['Můžu se hlásit mimo Rakousko?', 'Ano. Pracujeme hlavně s kandidáty z EU. Občané EU mohou v Rakousku obecně pracovat bez pracovního povolení.'],
          ['Jaké pozice nabízíte?', 'Recepce, kuchyně, housekeeping, obsluha a manažerské role v rakouských hotelech a restauracích — sezónní i celoroční.'],
          ['Co se stane po vyplnění profilu?', 'Profil ručně projdeme. Konkrétní roli navrhneme až ve chvíli, kdy dává smysl region, zkušenost, jazyk i dostupnost.'],
        ],
      },
      {
        heading: 'Zaměstnavatelé',
        items: [
          ['Jak rychle najdete kandidáty?', 'Záleží na pozici, regionu a sezóně. Pokud je zadání jasné, začínáme se sourcingem a kontrolou okamžitě.'],
          ['Kolik AlpenTalent stojí?', 'Podmínky závisí na potřebě. Nejlepší je poslat krátkou poptávku, abychom vyjasnili roli, objem a model spolupráce.'],
          ['Zprostředkováváte jen kandidáty z EU?', 'Zaměřujeme se hlavně na kandidáty ze střední Evropy (EU), stále víc i mezinárodně. Podle role a zaměstnavatele prověřujeme vhodné profily z různých zemí.'],
          ['Co když umístění nevyjde?', 'U konkrétních rolí lze domluvit pravidla náhrady. Přesné podmínky patří do konkrétní dohody.'],
        ],
      },
      {
        heading: 'Ubytování',
        items: [
          ['Co je ubytování pro personál?', 'Mnoho rakouských hotelů poskytuje pokoj nebo byt pro zaměstnance, často poblíž provozu.'],
          ['Je ubytování součástí mzdy?', 'Liší se to podle zaměstnavatele. Předem ověřujeme, jestli je ubytování zdarma, nebo se strhává určitá částka.'],
          ['Musím si hledat bydlení sám/sama?', 'Jen pokud konkrétní role ubytování nemá. V našich průvodcích najdeš informace k Anmeldung, hledání bytu i běžným postupům.'],
          ['Co je Anmeldung?', 'Anmeldung je povinné přihlášení pobytu v Rakousku. Je důležité pro bankovní účet, sociální pojištění i další úřední kroky.'],
        ],
      },
    ],
  },
  en: {
    h1: 'Frequently Asked Questions',
    description: 'Answers to common questions about finding a hospitality job in Austria, housing, and working with AlpenTalent.',
    groups: [
      {
        heading: 'Candidates',
        items: [
          ['Is AlpenTalent free for candidates?', 'Yes. Candidates never pay to find a role. Our fee is covered by the employer.'],
          ['Do I need to speak German?', 'Not always. Many roles are English-friendly; we match you by the language level each role actually requires.'],
          ['Will you help with housing?', 'Many partner hotels provide staff housing, and we clarify housing before matching.'],
          ['How long does it take to find a role?', 'Our team reviews profiles manually. If we have a fitting role, you receive the next step directly; if not, we keep your profile active for new openings.'],
          ['Can I apply from outside Austria?', 'Yes. We work mainly with candidates from the EU. EU citizens generally have the right to work freely in Austria.'],
          ['What roles are available?', 'Reception, kitchen, housekeeping, waiting staff, and management roles across Austrian hotels and restaurants — seasonal and permanent.'],
          ['What happens after I fill in my profile?', 'Our team reviews your profile manually. We suggest a role only when region, experience, language, and availability make sense.'],
        ],
      },
      {
        heading: 'Employers',
        items: [
          ['How quickly can you find candidates?', 'It depends on role, region, and season. With clear requirements, we can start sourcing and screening immediately.'],
          ['What does it cost?', 'Commercial terms depend on the hiring need. Send a short enquiry so we can clarify the role, volume, and collaboration model.'],
          ['Do you only place EU candidates?', 'Our main focus is Central European (EU) talent, increasingly international too. Depending on the role and employer, we review suitable profiles from various countries.'],
          ['What if a placement does not work out?', 'Replacement rules can be agreed for specific placements. The exact conditions belong in the concrete agreement.'],
        ],
      },
      {
        heading: 'Housing',
        items: [
          ['What is staff housing?', 'Many Austrian hotels provide rooms or apartments for staff, often near the property.'],
          ['Is housing included in the salary?', 'Conditions vary by employer. We clarify whether housing is free or deducted before matching.'],
          ['Do I need to arrange housing myself?', 'Only if the role does not include staff housing. Our guides cover Anmeldung, private housing, and common steps.'],
          ['What is an Anmeldung?', 'The Anmeldung is mandatory residence registration in Austria. It matters for your bank account, social insurance, and later administrative steps.'],
        ],
      },
    ],
  },
};

export default async function FAQ({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = content[locale] ?? content.de;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.groups.flatMap(cat =>
      cat.items.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      }))
    ),
  };

  return (
    <SiteShell locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ paddingBlock: 'clamp(48px, 8vw, 80px)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
            FAQ
          </p>
          <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>{t.h1}</h1>
          <p style={{ margin: '0 0 var(--space-6)', color: 'var(--text-muted)', lineHeight: 1.7 }}>{t.description}</p>

          {t.groups.map(cat => (
            <section key={cat.heading} style={{ marginBottom: 'var(--space-6)' }}>
              <h2
                className="at-h3"
                style={{ margin: '0 0 var(--space-2)', color: 'var(--at-alpine-green)' }}
              >
                {cat.heading}
              </h2>
              <Accordion items={cat.items} />
            </section>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
