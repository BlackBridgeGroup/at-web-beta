import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../../lib/i18n';
import type { Metadata } from 'next';

const stories = [
  {
    slug: 'jan-from-brno',
    name: 'Jan K.',
    role: 'Chef de Partie',
    hotel: 'Arlberg Resort',
    region: 'Tyrol',
    country: 'Czech Republic',
    matchScore: 91,
    quote: '"I had offers within a week. The team helped me sort housing and my first Austrian payslip — things I had no idea about."',
    body: [
      'Jan studied culinary arts in Brno and spent three years at a local hotel before deciding to take his career to the next level. "I knew Austria was the right move — the salaries are better, the resorts are incredible, and being EU, the paperwork is simpler than I thought."',
      'He submitted his profile to AlpenTalent on a Tuesday. By Thursday, he had two matches. "What surprised me was how specific the matches were. Not just Chef de Partie roles — they matched me to Arlberg Resort specifically because of my experience with alpine cuisine and my basic German."',
      'The trial shift sealed the deal. "It felt professional. The kitchen team were welcoming, and I could tell immediately that the head chef was someone I could learn from. I signed the contract at the end of the trial."',
      'Jan has been at Arlberg Resort for two seasons. "The housing is good — a shared flat with two other team members, both from Slovakia. The mountain is 10 minutes on foot. I\'m now looking at the sous chef opening here."',
    ],
    facts: [
      ['Role', 'Chef de Partie'],
      ['Hotel', 'Arlberg Resort, St. Anton'],
      ['Salary', '€2,800 / month'],
      ['Housing', 'Included'],
      ['Time to offer', '5 days'],
    ],
  },
  {
    slug: 'petra-from-prague',
    name: 'Petra M.',
    role: 'Receptionist',
    hotel: 'Grand Hotel Zell am See',
    region: 'Salzburg',
    country: 'Czech Republic',
    matchScore: 87,
    quote: '"AlpenTalent matched me to a role that actually fit — not just a role with an open slot. I\'ve been here two seasons now."',
    body: [
      'Petra worked the front desk at a boutique hotel in Prague for four years before looking for an opportunity abroad. "I spoke English and Czech, had some German from school, and a real desire to work somewhere that takes hospitality seriously. Austria ticked every box."',
      '"The Google sign-in was quick. Within two minutes I had filled in my profile — roles, region preference, language levels, and whether I needed housing. That last part matters enormously and most platforms ignore it."',
      'Her match came back within 48 hours. Grand Hotel Zell am See was looking specifically for someone with Czech language skills — they host many Czech guests during ski season. "That\'s the kind of thing you don\'t know to put on a CV, but the matching caught it."',
      'Petra is now entering her third season. "The lake is beautiful in summer. The team has become like a second family. I\'ve also improved my German enough to handle most guest conversations without switching to English."',
    ],
    facts: [
      ['Role', 'Receptionist'],
      ['Hotel', 'Grand Hotel Zell am See'],
      ['Salary', '€2,200 / month'],
      ['Housing', 'Included'],
      ['Time to offer', '4 days'],
    ],
  },
  {
    slug: 'tomas-from-bratislava',
    name: 'Tomáš B.',
    role: 'Sous Chef',
    hotel: 'AlpinResort Obertauern',
    region: 'Salzburg',
    country: 'Slovakia',
    matchScore: 84,
    quote: '"The trial shift idea was new to me but it made sense. I got to see the kitchen before committing — and the head chef got to see me cook."',
    body: [
      'Tomáš had been sous chef at a restaurant in Bratislava for two years when he decided to accelerate his career. "Slovakia and Austria are neighbouring countries — culturally close, but the salary difference for hospitality is significant. I\'d been thinking about the move for a while."',
      '"A colleague told me about AlpenTalent. I set up my profile in the evening, ticked sous chef, listed my experience with international cuisine, marked Salzburg as my preferred region, and went to sleep. By morning I had a message from the team."',
      'The trial shift at AlpinResort Obertauern lasted two days. "I cooked on both outlets — the main restaurant and the mountain hut. The resort is serious about food quality. That matters to me."',
      '"AlpenTalent helped coordinate the trial, the housing paperwork, and even gave me a checklist for registering in Austria — Anmeldung, tax number, bank account. That kind of support is what makes the difference when you\'re moving abroad alone."',
    ],
    facts: [
      ['Role', 'Sous Chef'],
      ['Hotel', 'AlpinResort Obertauern'],
      ['Salary', '€3,000 / month'],
      ['Housing', 'Support provided'],
      ['Time to offer', '8 days'],
    ],
  },
];

export function generateStaticParams() {
  return locales.flatMap(locale =>
    stories.map(s => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = normalizeLocale(raw) as Locale;
  const story = stories.find(s => s.slug === slug);
  if (!story) return {};
  return {
    title: `${story.name} — ${story.role} in ${story.region}`,
    description: story.quote.replace(/"/g, ''),
    alternates: {
      canonical: `https://alpentalent.com/${locale}/success-stories/${slug}`,
      languages: {
        de: `/de/success-stories/${slug}`,
        cs: `/cz/success-stories/${slug}`,
        en: `/en/success-stories/${slug}`,
      },
    },
  };
}

export default async function StoryDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  const story = stories.find(s => s.slug === slug);
  if (!story) notFound();

  const related = stories.filter(s => s.slug !== slug);

  return (
    <SiteShell locale={locale}>
      {/* Header */}
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 80px)', background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <Link
            href={`/${locale}/success-stories`}
            style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-3)' }}
          >
            ← Success stories
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'var(--space-3)' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--at-alpine-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              👤
            </div>
            <div>
              <h1 className="at-h1" style={{ margin: '0 0 4px' }}>{story.name}</h1>
              <p style={{ margin: 0, color: 'var(--at-alpine-green)', fontWeight: 600, fontSize: '0.9375rem' }}>
                {story.role} · {story.hotel}
              </p>
            </div>
          </div>

          <blockquote
            style={{
              margin: '0',
              padding: '16px 20px',
              borderLeft: '3px solid var(--at-alpine-green)',
              background: 'var(--at-alpine-light)',
              borderRadius: '0 var(--radius-card) var(--radius-card) 0',
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '1.0625rem',
                lineHeight: 1.6,
                fontStyle: 'italic',
                color: 'var(--text)',
              }}
            >
              {story.quote}
            </p>
          </blockquote>
        </div>
      </div>

      {/* Body */}
      <div className="at-container" style={{ paddingBlock: 'var(--space-6)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'start',
          }}
        >
          {/* Story text */}
          <div>
            {story.body.map((para, i) => (
              <p key={i} style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                {para}
              </p>
            ))}

            <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="at-chip">{story.region}</span>
              <span className="at-chip">{story.country}</span>
            </div>
          </div>

          {/* Facts panel */}
          <div>
            <div className="at-card" style={{ padding: 'var(--space-3)' }}>
              <p
                style={{
                  margin: '0 0 var(--space-2)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-subtle)',
                }}
              >
                Placement details
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {story.facts.map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{label}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{value}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border)' }}>
                <Link href={`/${locale}/jobs`} className="at-btn at-btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Find your role →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related stories */}
        {related.length > 0 && (
          <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)' }}>
            <h2 className="at-h2" style={{ margin: '0 0 var(--space-3)' }}>More stories</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-2)' }}>
              {related.map(s => (
                <Link
                  key={s.slug}
                  href={`/${locale}/success-stories/${s.slug}`}
                  className="at-card at-card--interactive"
                  style={{ display: 'block', padding: 'var(--space-3)', textDecoration: 'none' }}
                >
                  <p className="at-h3" style={{ margin: '0 0 4px', color: 'var(--text)' }}>{s.name}</p>
                  <p style={{ margin: '0 0 var(--space-2)', color: 'var(--at-alpine-green)', fontSize: '0.875rem', fontWeight: 500 }}>
                    {s.role} · {s.hotel}
                  </p>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8125rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                    {s.quote.slice(0, 90)}…
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
