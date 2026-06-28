import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../../lib/i18n';
import type { Metadata } from 'next';

type LS = Record<string, string>;
type Story = {
  slug: string; name: string; hotel: string; matchScore: number;
  role: LS; region: LS; country: LS; quote: LS;
  body: Record<string, string[]>;
  facts: Record<string, [string, string][]>;
};

const stories: Story[] = [
  {
    slug: 'jan-from-brno', name: 'Jan K.', hotel: 'Arlberg Resort', matchScore: 91,
    role: { de: 'Chef de Partie', cz: 'Chef de Partie', en: 'Chef de Partie' },
    region: { de: 'Tirol', cz: 'Tyrolsko', en: 'Tyrol' },
    country: { de: 'Tschechien', cz: 'Česko', en: 'Czech Republic' },
    quote: {
      en: '"I had offers within a week. The team helped me sort housing and my first Austrian payslip — things I had no idea about."',
      de: '„Ich hatte innerhalb einer Woche Angebote. Das Team half mir mit der Unterkunft und meiner ersten österreichischen Lohnabrechnung — Dinge, von denen ich keine Ahnung hatte."',
      cz: '„Měl jsem nabídky během týdne. Tým mi pomohl s bydlením i s první rakouskou výplatní páskou — věci, o kterých jsem neměl tušení."',
    },
    body: {
      en: [
        'Jan studied culinary arts in Brno and spent three years at a local hotel before deciding to take his career to the next level. "I knew Austria was the right move — the salaries are better, the resorts are incredible, and being EU, the paperwork is simpler than I thought."',
        'He submitted his profile to AlpenTalent on a Tuesday. By Thursday, he had two matches. "What surprised me was how specific the matches were. Not just Chef de Partie roles — they matched me to Arlberg Resort specifically because of my experience with alpine cuisine and my basic German."',
        'The trial shift sealed the deal. "It felt professional. The kitchen team were welcoming, and I could tell immediately that the head chef was someone I could learn from. I signed the contract at the end of the trial."',
        "Jan has been at Arlberg Resort for two seasons. \"The housing is good — a shared flat with two other team members, both from Slovakia. The mountain is 10 minutes on foot. I'm now looking at the sous chef opening here.\"",
      ],
      de: [
        'Jan studierte Kochkunst in Brünn und arbeitete drei Jahre in einem lokalen Hotel, bevor er seine Karriere auf die nächste Stufe heben wollte. „Ich wusste, dass Österreich der richtige Schritt war — die Gehälter sind besser, die Resorts unglaublich, und als EU-Bürger ist der Papierkram einfacher, als ich dachte."',
        'Er reichte sein Profil an einem Dienstag bei AlpenTalent ein. Bis Donnerstag hatte er zwei Matches. „Was mich überraschte, war, wie genau die Matches waren. Nicht nur Chef-de-Partie-Stellen — sie matchten mich gezielt mit dem Arlberg Resort wegen meiner Erfahrung mit alpiner Küche und meinem Grunddeutsch."',
        'Der Schnuppertag besiegelte den Deal. „Es war professionell. Das Küchenteam war herzlich, und ich merkte sofort, dass ich vom Küchenchef etwas lernen kann. Am Ende des Schnuppertags unterschrieb ich den Vertrag."',
        'Jan ist seit zwei Saisonen im Arlberg Resort. „Die Unterkunft ist gut — eine WG mit zwei anderen Teammitgliedern, beide aus der Slowakei. Der Berg ist 10 Minuten zu Fuß entfernt. Jetzt schaue ich mir die Sous-Chef-Stelle hier an."',
      ],
      cz: [
        'Jan studoval kuchařské umění v Brně a tři roky pracoval v místním hotelu, než se rozhodl posunout kariéru dál. „Věděl jsem, že Rakousko je správný krok — platy jsou lepší, střediska úžasná, a jako občan EU je papírování jednodušší, než jsem čekal."',
        'Profil poslal do AlpenTalentu v úterý. Do čtvrtka měl dvě nabídky. „Překvapilo mě, jak přesné to spárování bylo. Ne jen pozice Chef de Partie — spárovali mě konkrétně s Arlberg Resort kvůli mé zkušenosti s alpskou kuchyní a základní němčině."',
        'Zkušební směna to zpečetila. „Bylo to profesionální. Kuchyňský tým byl vstřícný a hned jsem poznal, že se od šéfkuchaře můžu učit. Na konci směny jsem podepsal smlouvu."',
        'Jan je v Arlberg Resort už dvě sezóny. „Bydlení je dobré — sdílený byt se dvěma kolegy, oba ze Slovenska. Na horu je to 10 minut pěšky. Teď koukám po zdejší pozici sous chefa."',
      ],
    },
    facts: {
      en: [['Role', 'Chef de Partie'], ['Hotel', 'Arlberg Resort, St. Anton'], ['Salary', '€2,800 / month'], ['Housing', 'Included'], ['Time to offer', '5 days']],
      de: [['Position', 'Chef de Partie'], ['Hotel', 'Arlberg Resort, St. Anton'], ['Gehalt', '€2.800 / Monat'], ['Unterkunft', 'Inklusive'], ['Zeit bis zum Angebot', '5 Tage']],
      cz: [['Pozice', 'Chef de Partie'], ['Hotel', 'Arlberg Resort, St. Anton'], ['Mzda', '€2 800 / měsíc'], ['Bydlení', 'V ceně'], ['Čas do nabídky', '5 dní']],
    },
  },
  {
    slug: 'petra-from-prague', name: 'Petra M.', hotel: 'Grand Hotel Zell am See', matchScore: 87,
    role: { de: 'Rezeptionistin', cz: 'Recepční', en: 'Receptionist' },
    region: { de: 'Salzburg', cz: 'Salcbursko', en: 'Salzburg' },
    country: { de: 'Tschechien', cz: 'Česko', en: 'Czech Republic' },
    quote: {
      en: "\"AlpenTalent matched me to a role that actually fit — not just a role with an open slot. I've been here two seasons now.\"",
      de: '„AlpenTalent hat mich mit einer Stelle gematcht, die wirklich passt — nicht einfach mit einer offenen Position. Ich bin jetzt schon zwei Saisonen hier."',
      cz: '„AlpenTalent mě spároval s pozicí, která opravdu sedí — ne jen s volným místem. Jsem tu už dvě sezóny."',
    },
    body: {
      en: [
        'Petra worked the front desk at a boutique hotel in Prague for four years before looking for an opportunity abroad. "I spoke English and Czech, had some German from school, and a real desire to work somewhere that takes hospitality seriously. Austria ticked every box."',
        '"The Google sign-in was quick. Within two minutes I had filled in my profile — roles, region preference, language levels, and whether I needed housing. That last part matters enormously and most platforms ignore it."',
        'Her match came back within 48 hours. Grand Hotel Zell am See was looking specifically for someone with Czech language skills — they host many Czech guests during ski season. "That\'s the kind of thing you don\'t know to put on a CV, but the matching caught it."',
        'Petra is now entering her third season. "The lake is beautiful in summer. The team has become like a second family. I\'ve also improved my German enough to handle most guest conversations without switching to English."',
      ],
      de: [
        'Petra arbeitete vier Jahre an der Rezeption eines Boutique-Hotels in Prag, bevor sie eine Chance im Ausland suchte. „Ich sprach Englisch und Tschechisch, hatte etwas Schuldeutsch und den echten Wunsch, irgendwo zu arbeiten, wo Gastfreundschaft ernst genommen wird. Österreich erfüllte alles."',
        '„Die Google-Anmeldung war schnell. Innerhalb von zwei Minuten hatte ich mein Profil ausgefüllt — Stellen, Regionswunsch, Sprachniveaus und ob ich eine Unterkunft brauche. Gerade Letzteres ist enorm wichtig, und die meisten Plattformen ignorieren es."',
        'Ihr Match kam innerhalb von 48 Stunden. Das Grand Hotel Zell am See suchte gezielt jemanden mit Tschechischkenntnissen — sie beherbergen in der Skisaison viele tschechische Gäste. „So etwas schreibt man nicht in den Lebenslauf, aber das Matching erkannte es."',
        'Petra geht nun in ihre dritte Saison. „Der See ist im Sommer wunderschön. Das Team ist wie eine zweite Familie geworden. Mein Deutsch ist inzwischen gut genug, um die meisten Gespräche ohne Englisch zu führen."',
      ],
      cz: [
        'Petra čtyři roky pracovala na recepci butikového hotelu v Praze, než začala hledat příležitost v zahraničí. „Mluvila jsem anglicky a česky, ze školy uměla trochu německy a měla opravdovou touhu pracovat někde, kde berou pohostinství vážně. Rakousko splňovalo všechno."',
        '„Přihlášení přes Google bylo rychlé. Za dvě minuty jsem měla vyplněný profil — pozice, preferovaný region, jazykové úrovně a jestli potřebuji bydlení. Právě to poslední je strašně důležité a většina platforem to ignoruje."',
        'Nabídka přišla do 48 hodin. Grand Hotel Zell am See hledal cíleně někoho s češtinou — v lyžařské sezóně hostí spoustu českých hostů. „To do životopisu nenapíšete, ale spárování to zachytilo."',
        'Petra teď vstupuje do třetí sezóny. „Jezero je v létě nádherné. Tým se stal druhou rodinou. Němčinu jsem zlepšila natolik, že většinu hovorů zvládnu bez přepínání do angličtiny."',
      ],
    },
    facts: {
      en: [['Role', 'Receptionist'], ['Hotel', 'Grand Hotel Zell am See'], ['Salary', '€2,200 / month'], ['Housing', 'Included'], ['Time to offer', '4 days']],
      de: [['Position', 'Rezeptionistin'], ['Hotel', 'Grand Hotel Zell am See'], ['Gehalt', '€2.200 / Monat'], ['Unterkunft', 'Inklusive'], ['Zeit bis zum Angebot', '4 Tage']],
      cz: [['Pozice', 'Recepční'], ['Hotel', 'Grand Hotel Zell am See'], ['Mzda', '€2 200 / měsíc'], ['Bydlení', 'V ceně'], ['Čas do nabídky', '4 dny']],
    },
  },
  {
    slug: 'tomas-from-bratislava', name: 'Tomáš B.', hotel: 'AlpinResort Obertauern', matchScore: 84,
    role: { de: 'Sous Chef', cz: 'Sous Chef', en: 'Sous Chef' },
    region: { de: 'Salzburg', cz: 'Salcbursko', en: 'Salzburg' },
    country: { de: 'Slowakei', cz: 'Slovensko', en: 'Slovakia' },
    quote: {
      en: '"The trial shift idea was new to me but it made sense. I got to see the kitchen before committing — and the head chef got to see me cook."',
      de: '„Die Idee des Schnuppertags war neu für mich, aber sie ergab Sinn. Ich konnte die Küche sehen, bevor ich mich entschied — und der Küchenchef konnte mich kochen sehen."',
      cz: '„Nápad se zkušební směnou pro mě byl nový, ale dával smysl. Viděl jsem kuchyni, než jsem se rozhodl — a šéfkuchař viděl, jak vařím."',
    },
    body: {
      en: [
        'Tomáš had been sous chef at a restaurant in Bratislava for two years when he decided to accelerate his career. "Slovakia and Austria are neighbouring countries — culturally close, but the salary difference for hospitality is significant. I\'d been thinking about the move for a while."',
        '"A colleague told me about AlpenTalent. I set up my profile in the evening, ticked sous chef, listed my experience with international cuisine, marked Salzburg as my preferred region, and went to sleep. By morning I had a message from the team."',
        'The trial shift at AlpinResort Obertauern lasted two days. "I cooked on both outlets — the main restaurant and the mountain hut. The resort is serious about food quality. That matters to me."',
        '"AlpenTalent helped coordinate the trial, the housing paperwork, and even gave me a checklist for registering in Austria — Anmeldung, tax number, bank account. That kind of support is what makes the difference when you\'re moving abroad alone."',
      ],
      de: [
        'Tomáš war zwei Jahre Sous Chef in einem Restaurant in Bratislava, als er beschloss, seine Karriere zu beschleunigen. „Die Slowakei und Österreich sind Nachbarländer — kulturell nah, aber der Gehaltsunterschied in der Gastronomie ist erheblich. Ich hatte den Schritt schon länger im Kopf."',
        '„Ein Kollege erzählte mir von AlpenTalent. Ich legte abends mein Profil an, wählte Sous Chef, listete meine Erfahrung mit internationaler Küche auf, markierte Salzburg als Wunschregion und ging schlafen. Am Morgen hatte ich eine Nachricht vom Team."',
        'Der Schnuppertag im AlpinResort Obertauern dauerte zwei Tage. „Ich kochte in beiden Outlets — dem Hauptrestaurant und der Berghütte. Das Resort nimmt Lebensmittelqualität ernst. Das ist mir wichtig."',
        '„AlpenTalent half bei der Koordination des Schnuppertags, dem Papierkram für die Unterkunft und gab mir sogar eine Checkliste für die Anmeldung in Österreich — Meldezettel, Steuernummer, Bankkonto. Diese Unterstützung macht den Unterschied, wenn man allein ins Ausland zieht."',
      ],
      cz: [
        'Tomáš byl dva roky sous chefem v restauraci v Bratislavě, když se rozhodl zrychlit kariéru. „Slovensko a Rakousko jsou sousední země — kulturně blízké, ale rozdíl v platech v gastronomii je výrazný. Nad tím krokem jsem přemýšlel už delší dobu."',
        '„Kolega mi řekl o AlpenTalentu. Večer jsem si založil profil, zaškrtl sous chef, vypsal zkušenost s mezinárodní kuchyní, označil Salcbursko jako preferovaný region a šel spát. Ráno jsem měl zprávu od týmu."',
        'Zkušební směna v AlpinResort Obertauern trvala dva dny. „Vařil jsem na obou provozech — v hlavní restauraci i v horské chatě. Středisko bere kvalitu jídla vážně. To je pro mě důležité."',
        '„AlpenTalent pomohl zkoordinovat zkušební směnu, papírování kolem bydlení a dal mi i checklist k přihlášení v Rakousku — Anmeldung, daňové číslo, bankovní účet. Taková podpora dělá rozdíl, když se stěhuješ do zahraničí sám."',
      ],
    },
    facts: {
      en: [['Role', 'Sous Chef'], ['Hotel', 'AlpinResort Obertauern'], ['Salary', '€3,000 / month'], ['Housing', 'Support provided'], ['Time to offer', '8 days']],
      de: [['Position', 'Sous Chef'], ['Hotel', 'AlpinResort Obertauern'], ['Gehalt', '€3.000 / Monat'], ['Unterkunft', 'Mit Unterstützung'], ['Zeit bis zum Angebot', '8 Tage']],
      cz: [['Pozice', 'Sous Chef'], ['Hotel', 'AlpinResort Obertauern'], ['Mzda', '€3 000 / měsíc'], ['Bydlení', 'S podporou'], ['Čas do nabídky', '8 dní']],
    },
  },
];

const UI: Record<string, { back: string; details: string; findRole: string; more: string }> = {
  de: { back: '← Erfolgsgeschichten', details: 'Vermittlungsdetails', findRole: 'Finde deine Stelle →', more: 'Weitere Geschichten' },
  cz: { back: '← Příběhy úspěchu', details: 'Detaily umístění', findRole: 'Najdi svou roli →', more: 'Další příběhy' },
  en: { back: '← Success stories', details: 'Placement details', findRole: 'Find your role →', more: 'More stories' },
};

export function generateStaticParams() {
  return locales.flatMap(locale => stories.map(s => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = normalizeLocale(raw) as Locale;
  const story = stories.find(s => s.slug === slug);
  if (!story) return {};
  const role = story.role[locale] ?? story.role.en;
  const region = story.region[locale] ?? story.region.en;
  return {
    title: `${story.name} — ${role}, ${region}`,
    description: (story.quote[locale] ?? story.quote.en).replace(/[„""]/g, ''),
    alternates: {
      canonical: `https://alpentalent.com/${locale}/success-stories/${slug}`,
      languages: { de: `/de/success-stories/${slug}`, cs: `/cz/success-stories/${slug}`, en: `/en/success-stories/${slug}` },
    },
  };
}

export default async function StoryDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const u = UI[locale] ?? UI.de;

  const story = stories.find(s => s.slug === slug);
  if (!story) notFound();
  const related = stories.filter(s => s.slug !== slug);
  const pick = (ls: LS) => ls[locale] ?? ls.en;

  return (
    <SiteShell locale={locale}>
      {/* Header */}
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 80px)', background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <Link href={`/${locale}/success-stories`} style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-3)' }}>{u.back}</Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'var(--space-3)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'color-mix(in srgb, var(--at-alpine-green) 14%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--at-alpine-green)', flexShrink: 0 }} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <h1 className="at-h1" style={{ margin: '0 0 4px' }}>{story.name}</h1>
              <p style={{ margin: 0, color: 'var(--at-alpine-green)', fontWeight: 600, fontSize: '0.9375rem' }}>{pick(story.role)} · {story.hotel}</p>
            </div>
          </div>

          <blockquote style={{ margin: 0, padding: '16px 20px', borderLeft: '3px solid var(--at-alpine-green)', background: 'color-mix(in srgb, var(--at-alpine-green) 8%, var(--bg-elevated))', borderRadius: '0 var(--radius-card) var(--radius-card) 0' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.0625rem', lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text)' }}>{pick(story.quote)}</p>
          </blockquote>
        </div>
      </div>

      {/* Body */}
      <div className="at-container" style={{ paddingBlock: 'var(--space-6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', alignItems: 'start' }}>
          <div>
            {(story.body[locale] ?? story.body.en).map((para, i) => (
              <p key={i} style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9375rem' }}>{para}</p>
            ))}
            <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="at-chip">{pick(story.region)}</span>
              <span className="at-chip">{pick(story.country)}</span>
            </div>
          </div>

          {/* Facts panel */}
          <div>
            <div className="at-card" style={{ padding: 'var(--space-3)' }}>
              <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-subtle)' }}>{u.details}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(story.facts[locale] ?? story.facts.en).map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{label}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{value}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border)' }}>
                <Link href={`/${locale}/jobs`} className="at-btn at-btn--primary" style={{ width: '100%', justifyContent: 'center' }}>{u.findRole}</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related stories */}
        {related.length > 0 && (
          <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)' }}>
            <h2 className="at-h2" style={{ margin: '0 0 var(--space-3)' }}>{u.more}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-2)' }}>
              {related.map(s => (
                <Link key={s.slug} href={`/${locale}/success-stories/${s.slug}`} className="at-card at-card--interactive" style={{ display: 'block', padding: 'var(--space-3)', textDecoration: 'none' }}>
                  <p className="at-h3" style={{ margin: '0 0 4px', color: 'var(--text)' }}>{s.name}</p>
                  <p style={{ margin: '0 0 var(--space-2)', color: 'var(--at-alpine-green)', fontSize: '0.875rem', fontWeight: 500 }}>{pick(s.role)} · {s.hotel}</p>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8125rem', lineHeight: 1.6, fontStyle: 'italic' }}>{pick(s.quote).slice(0, 90)}…</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
