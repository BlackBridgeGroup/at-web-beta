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
  return {
    title: titles[locale],
    description: 'Answers to common questions about finding a hospitality job in Austria, housing, and working with AlpenTalent.',
    alternates: {
      canonical: `https://alpentalent.com/${locale}/faq`,
      languages: { de: '/de/faq', cs: '/cz/faq', en: '/en/faq' },
    },
  };
}

const faqs: { heading: string; items: [string, string][] }[] = [
  {
    heading: 'Candidates',
    items: [
      ['Is AlpenTalent free for candidates?', 'Yes. Candidates never pay to find a role. Our fee is covered by the employer.'],
      ['Do I need to speak German?', 'Not always. Many roles are English-friendly; we match you by the language level each role actually requires.'],
      ['Will you help with housing?', 'Many partner hotels provide staff housing, and we flag it on every role. Our AlpenLife guide also covers private housing options.'],
      ['How long does it take to find a role?', 'Most candidates receive their first matches within 48 hours of completing their profile. Human review by our team takes 1–2 working days.'],
      ['Can I apply from outside Austria?', 'Yes. We work with candidates from across the EU — particularly Czech Republic, Slovakia, Hungary and Romania. EU citizens have the right to work freely in Austria.'],
      ['What roles are available?', 'Reception, kitchen, housekeeping, waiting staff, and management roles across Austrian hotels and restaurants — seasonal and permanent.'],
      ['What happens after I fill in my profile?', 'Our team reviews your profile manually. If we have matching roles, you\'ll receive them directly. If not, we\'ll let you know and keep your profile active for new openings.'],
    ],
  },
  {
    heading: 'Employers',
    items: [
      ['How quickly can you find candidates?', 'Typically within 5–10 working days for standard roles. Urgent placements can sometimes be arranged faster — contact us to discuss.'],
      ['What does it cost?', 'We offer retained search (fixed fee per placement), lead-gen Meta campaigns, and embedded RPO on a monthly retainer. Exact pricing depends on your volume and needs.'],
      ['Do you only place Czech and Slovak candidates?', 'Our primary specialisation is Central European talent — Czech Republic, Slovakia, and increasingly Hungary and Romania. EU citizens have the right to work freely in Austria.'],
      ['What if a placement doesn\'t work out?', 'We offer a replacement guarantee period on retained search placements. If a placed candidate leaves within the window, we source and place a replacement at no additional placement fee.'],
    ],
  },
  {
    heading: 'Housing',
    items: [
      ['What is staff housing?', 'Many Austrian hotels provide accommodation for their team — typically a private or shared room near the property. It\'s flagged on every role where it\'s available.'],
      ['Is housing included in the salary?', 'Conditions vary. Some hotels include it free; others deduct a small amount (capped by the Kollektivvertrag). We clarify this upfront for every role.'],
      ['Do I need to arrange housing myself?', 'Only if the role doesn\'t include it. Our AlpenLife guide has practical advice on finding private accommodation, registering (Anmeldung), and navigating Austrian tenancy.'],
      ['What is an Anmeldung?', 'The Anmeldung is your mandatory residence registration in Austria, done at the local Magistrat or Bezirksamt within three days of moving in. You\'ll need it for your bank account, health insurance card, and tax registration.'],
    ],
  },
];

export default async function FAQ({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap(cat =>
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
          <h1 className="at-h1" style={{ margin: '0 0 var(--space-6)' }}>Frequently asked questions</h1>

          {faqs.map(cat => (
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
