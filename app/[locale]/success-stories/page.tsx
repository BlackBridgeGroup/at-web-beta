import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = { title: 'Success Stories' };

type LS = Record<string, string>;
const stories: { slug: string; name: string; hotel: string; role: LS; region: LS; quote: LS }[] = [
  {
    slug: 'jan-from-brno', name: 'Jan K.', hotel: 'Arlberg Resort',
    role: { de: 'Chef de Partie', cz: 'Chef de Partie', en: 'Chef de Partie' },
    region: { de: 'Tirol', cz: 'Tyrolsko', en: 'Tyrol' },
    quote: {
      en: '"I had offers within a week. The team helped me sort housing and my first Austrian payslip — things I had no idea about."',
      de: '„Ich hatte innerhalb einer Woche Angebote. Das Team half mir mit der Unterkunft und meiner ersten österreichischen Lohnabrechnung — Dinge, von denen ich keine Ahnung hatte."',
      cz: '„Měl jsem nabídky během týdne. Tým mi pomohl s bydlením i s první rakouskou výplatní páskou — věci, o kterých jsem neměl tušení."',
    },
  },
  {
    slug: 'petra-from-prague', name: 'Petra M.', hotel: 'Grand Hotel Zell am See',
    role: { de: 'Rezeptionistin', cz: 'Recepční', en: 'Receptionist' },
    region: { de: 'Salzburg', cz: 'Salcbursko', en: 'Salzburg' },
    quote: {
      en: "\"AlpenTalent matched me to a role that actually fit — not just a role with an open slot. I've been here two seasons now.\"",
      de: '„AlpenTalent hat mich mit einer Stelle gematcht, die wirklich passt — nicht einfach mit einer offenen Position. Ich bin jetzt schon zwei Saisonen hier."',
      cz: '„AlpenTalent mě spároval s pozicí, která opravdu sedí — ne jen s volným místem. Jsem tu už dvě sezóny."',
    },
  },
  {
    slug: 'tomas-from-bratislava', name: 'Tomáš B.', hotel: 'AlpinResort Obertauern',
    role: { de: 'Sous Chef', cz: 'Sous Chef', en: 'Sous Chef' },
    region: { de: 'Salzburg', cz: 'Salcbursko', en: 'Salzburg' },
    quote: {
      en: '"The trial shift idea was new to me but it made sense. I got to see the kitchen before committing — and the head chef got to see me cook."',
      de: '„Die Idee des Schnuppertags war neu für mich, aber sie ergab Sinn. Ich konnte die Küche sehen, bevor ich mich entschied — und der Küchenchef konnte mich kochen sehen."',
      cz: '„Nápad se zkušební směnou pro mě byl nový, ale dával smysl. Viděl jsem kuchyni, než jsem se rozhodl — a šéfkuchař viděl, jak vařím."',
    },
  },
];

const T: Record<string, { eyebrow: string; h1: string; sub: string }> = {
  de: { eyebrow: 'Erfolgsgeschichten', h1: 'Echte Menschen. Echte Stellen.', sub: 'Von Tschechien und der Slowakei zu Hotels in ganz Österreich — hier sind einige der Menschen, denen wir geholfen haben, ihren Platz zu finden.' },
  cz: { eyebrow: 'Příběhy úspěchu', h1: 'Skuteční lidé. Skutečné role.', sub: 'Z Česka a Slovenska do hotelů po celém Rakousku — tady jsou někteří z lidí, kterým jsme pomohli najít své místo.' },
  en: { eyebrow: 'Success stories', h1: 'Real people. Real roles.', sub: "From Czech Republic and Slovakia to hotels across Austria — here are some of the people we've helped find their place." },
};

export default async function SuccessStories({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = T[locale] ?? T.de;

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container">
          <div style={{ maxWidth: 560, marginBottom: 'var(--space-6)' }}>
            <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.eyebrow}</p>
            <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>{t.h1}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.7 }}>{t.sub}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
            {stories.map(story => (
              <Link key={story.slug} href={`/${locale}/success-stories/${story.slug}`} className="at-card at-card--interactive" style={{ display: 'block', padding: 'var(--space-4)', textDecoration: 'none' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'color-mix(in srgb, var(--at-alpine-green) 14%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-2)', color: 'var(--at-alpine-green)' }} aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <p className="at-h3" style={{ margin: '0 0 2px', color: 'var(--text)' }}>{story.name}</p>
                <p style={{ margin: '0 0 var(--space-2)', color: 'var(--at-alpine-green)', fontSize: '0.875rem', fontWeight: 500 }}>{(story.role[locale] ?? story.role.en)} · {story.hotel}</p>
                <p style={{ margin: '0 0 var(--space-2)', color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, fontStyle: 'italic' }}>{story.quote[locale] ?? story.quote.en}</p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="at-chip">{story.region[locale] ?? story.region.en}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
