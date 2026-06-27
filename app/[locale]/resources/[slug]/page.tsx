import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../../lib/i18n';
import type { Metadata } from 'next';

function GuideIcon({ category, size = 20 }: { category: string; size?: number }) {
  const shared = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (category) {
    case 'Moving':   return <svg {...shared}><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>;
    case 'Language': return <svg {...shared}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case 'Legal':    return <svg {...shared}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    case 'Housing':  return <svg {...shared}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case 'Work':     return <svg {...shared}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    default: return null;
  }
}

const guides = [
  {
    slug: 'moving-to-austria',
    category: 'Moving',
    title: 'Moving to Austria: the practical guide',
    summary: 'Registration, Anmeldung, bank account, SIM card — everything you need in the first two weeks.',
    readTime: '8 min read',
    sections: [
      {
        heading: 'Before you arrive',
        body: 'Confirm your housing address — you will need this for the Anmeldung (residence registration). Bring your passport, employment contract, and any educational or language certificates. Make copies of everything. Austrian bureaucracy is efficient but thorough.',
      },
      {
        heading: 'Anmeldung (residence registration)',
        body: 'Within three days of moving into your accommodation, you must register at the local Magistrat (city hall) or Bezirksamt (district office). Bring your passport and accommodation confirmation. You will receive a Meldezettel — this document is essential for opening a bank account, registering for health insurance, and almost everything else.',
      },
      {
        heading: 'Bank account',
        body: 'With your Meldezettel and passport, you can open an account at any Austrian bank. Bank Austria, Erste Bank and Raiffeisen have English-speaking staff in tourist areas. Some candidates use N26 or Wise as a temporary solution before establishing an Austrian account — but an Austrian account is better for payroll and rent payments.',
      },
      {
        heading: 'Health insurance (Krankenkasse)',
        body: 'As an employee, your employer is required by law to register you with the Austrian Social Insurance (ÖGK). Your contributions are deducted automatically from your salary. You will receive a health insurance card (e-card) within a few weeks. Keep the card — you will need it for all doctor visits.',
      },
      {
        heading: 'SIM card and phone',
        body: 'A2, Drei, and Magenta are the main networks. A2 is popular with migrant workers for its affordable roaming and Czech/Slovak customer service in some areas. You only need your passport to buy a prepaid SIM. Monthly plans start around €15–20 for unlimited data.',
      },
      {
        heading: 'Getting around',
        body: 'Austria has excellent public transport. In resort towns, your employer often provides a transport pass or ski pass. Österreichische Bundesbahnen (ÖBB) trains connect all major cities. The KlimaTicket Österreich (around €1,095/year) gives unlimited travel on all public transport nationwide and is worth it if you travel frequently.',
      },
    ],
  },
  {
    slug: 'german-for-hospitality',
    category: 'Language',
    title: 'German for hospitality workers',
    summary: 'The 100 phrases you\'ll use every day in a hotel or restaurant. No fluff, just the essentials.',
    readTime: '6 min read',
    sections: [
      {
        heading: 'Greetings and check-in',
        body: 'Guten Morgen (Good morning) · Guten Tag (Good day) · Guten Abend (Good evening) · Herzlich willkommen (Welcome) · Wie kann ich Ihnen helfen? (How can I help you?) · Haben Sie eine Reservierung? (Do you have a reservation?) · Hier ist Ihr Schlüssel (Here is your key) · Ihr Zimmer ist Nummer... (Your room is number...)',
      },
      {
        heading: 'At the restaurant',
        body: 'Haben Sie einen Tisch reserviert? (Did you reserve a table?) · Für wie viele Personen? (For how many people?) · Bitte folgen Sie mir (Please follow me) · Darf ich die Speisekarte bringen? (May I bring the menu?) · Sind Sie bereit zu bestellen? (Are you ready to order?) · Guten Appetit! · Stimmt so (Keep the change) · Möchten Sie noch etwas? (Would you like anything else?)',
      },
      {
        heading: 'In the kitchen',
        body: 'Bestellung! (Order!) · Abgeholt! (Picked up!) · Service! (Table waiting!) · Vorsicht, heiß! (Careful, hot!) · Mise en place · Zwei Minuten (Two minutes) · Sauber (Clean) · Nachschub (Restock) · Schicht (Shift) · Pause (Break)',
      },
      {
        heading: 'Practical situations',
        body: 'Ich spreche etwas Deutsch (I speak a little German) · Können Sie das bitte wiederholen? (Could you please repeat that?) · Ich verstehe das nicht (I don\'t understand) · Bitte langsamer (Slower please) · Wo ist... (Where is...) · Ich brauche Hilfe (I need help)',
      },
    ],
  },
  {
    slug: 'understanding-your-austrian-contract',
    category: 'Legal',
    title: 'Understanding your Austrian work contract',
    summary: 'What Kollektivvertrag means, what you\'re entitled to, and what to check before you sign.',
    readTime: '7 min read',
    sections: [
      {
        heading: 'Kollektivvertrag (KV) — the collective agreement',
        body: 'Almost all hospitality roles in Austria fall under a Kollektivvertrag — a sector-wide collective agreement negotiated between employer associations and trade unions. The KV sets minimum wages, maximum hours, overtime rules and holiday entitlements. Your contract cannot pay less than the KV minimum. The hospitality KV (Hotel- und Gastgewerbe KV) is updated annually, usually in December.',
      },
      {
        heading: 'Bruttolohn vs. Nettolohn',
        body: 'Your contract will state a Bruttolohn (gross salary). After deductions for income tax (Lohnsteuer), social insurance (Sozialversicherung — around 18% employee contribution), and housing (if deducted), your Nettolohn (net salary) will be roughly 65–75% of gross for most hospitality salaries. Housing deductions are capped and must appear clearly in your contract.',
      },
      {
        heading: 'Working hours',
        body: 'The maximum regular working week is 40 hours, with 8 hours per day. Overtime starts at hour 41 (weekly) or hour 9 (daily) and is paid at 150% of your hourly rate. Shift work is common in hospitality; you are entitled to at least 11 consecutive hours of rest between shifts.',
      },
      {
        heading: 'Paid leave',
        body: 'You are entitled to 5 weeks (25 days) of paid annual leave after your first year. In your first year, leave is proportional to months worked. Public holidays are paid separately. Sick leave: you must notify your employer immediately and provide a doctor\'s note (Krankenstand-Meldung) within three days.',
      },
      {
        heading: 'What to check before you sign',
        body: '1. The Bruttolohn must be at or above the KV minimum for your position and experience level. 2. Housing deduction (if any) should be specified with the exact amount. 3. The contract should state your working location — not just "Austria". 4. Trial period (Probezeit) is usually one month — legal maximum is one month for blue-collar workers. 5. Notice period (Kündigungsfrist) after the trial: check both your notice and the employer\'s notice period.',
      },
    ],
  },
  {
    slug: 'staff-housing-in-austria',
    category: 'Housing',
    title: 'Staff housing in Austrian hotels',
    summary: 'What to expect, what\'s usually included, and your rights as a tenant.',
    readTime: '5 min read',
    sections: [
      {
        heading: 'What staff housing typically looks like',
        body: 'Most Austrian resort hotels offer staff housing in nearby apartment buildings or chalets. A typical arrangement is a shared flat with 2–4 rooms, shared kitchen and bathroom. Private rooms are increasingly common in higher-end properties. City hotels (Vienna, Salzburg city) are less likely to offer housing — you\'ll typically need to find private accommodation.',
      },
      {
        heading: 'What\'s included',
        body: 'Standard: bed, wardrobe, Wi-Fi, shared kitchen and bathroom. Often included: bedding and towels (especially for first arrival), basic cleaning supplies. Sometimes included: meals during working shifts (Naturalverpflegung) — this has a small tax value and appears on your payslip. Rarely included: private bathroom, parking.',
      },
      {
        heading: 'Housing deduction',
        body: 'If your employer deducts housing from your salary, this must appear in your contract. The maximum deductible amount is set by the Kollektivvertrag — check the current rate before signing. For 2024/2025, maximum deductions for a single room are approximately €190–230/month depending on amenities.',
      },
      {
        heading: 'Your rights',
        body: 'Housing tied to employment (Dienstgeberwohnung) ends when your employment ends — typically with a notice period specified in your contract. You are a tenant during your employment and have basic tenant rights under Austrian law, including the right to notice before a housing inspection and the right to a habitable, heated space.',
      },
    ],
  },
  {
    slug: 'seasonal-vs-permanent-work',
    category: 'Work',
    title: 'Seasonal vs permanent roles in Austria',
    summary: 'The pros and cons of each, and how to plan a career path through Austrian hospitality.',
    readTime: '6 min read',
    sections: [
      {
        heading: 'Seasonal roles',
        body: 'Seasonal contracts in Austrian hospitality typically run December–April (winter season) or June–September (summer season). They usually include housing, provide excellent experience in high-volume, fast-paced environments, and pay well relative to comparable roles in Czech Republic or Slovakia. The tradeoff: contracts end at season close, and you\'ll need to find your next placement well in advance.',
      },
      {
        heading: 'Permanent roles',
        body: 'Permanent (ganzjährig) roles are more common in city hotels, large resort chains, and restaurant groups. They offer stability, career progression, and continuous income. Housing is less commonly included for permanent city roles. After 5 years of continuous employment, you earn enhanced dismissal protections under Austrian law.',
      },
      {
        heading: 'Career path through seasonal work',
        body: 'Many successful hospitality professionals in Austria began with seasonal contracts. A typical path: Season 1 (entry level kitchen assistant or housekeeper) → Season 2 (commis chef or experienced front desk) → Season 3+ (chef de partie, senior receptionist, supervisor). Each season builds local references and Austrian work history, making the next placement easier to negotiate.',
      },
      {
        heading: 'The two-season strategy',
        body: 'The most effective approach for candidates from Czech Republic and Slovakia: do one winter season and one summer season in the same region. This builds relationships with local employers, gives you two seasons of Austrian experience, and often leads to a permanent offer from one of the properties. AlpenTalent actively helps with this transition.',
      },
    ],
  },
];

export function generateStaticParams() {
  return locales.flatMap(locale =>
    guides.map(g => ({ locale, slug: g.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = normalizeLocale(raw) as Locale;
  const guide = guides.find(g => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.summary,
    alternates: {
      canonical: `https://alpentalent.com/${locale}/resources/${slug}`,
      languages: {
        de: `/de/resources/${slug}`,
        cs: `/cz/resources/${slug}`,
        en: `/en/resources/${slug}`,
      },
    },
  };
}

export default async function ResourceDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  const guide = guides.find(g => g.slug === slug);
  if (!guide) notFound();

  const related = guides.filter(g => g.slug !== slug).slice(0, 3);

  return (
    <SiteShell locale={locale}>
      {/* Article header */}
      <div style={{ background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)', paddingBlock: 'clamp(40px, 6vw, 72px)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <Link
            href={`/${locale}/resources`}
            style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-3)' }}
          >
            ← AlpenLife guide
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-2)' }}>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--at-alpine-light)',
                color: 'var(--at-alpine-green)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {guide.category}
            </span>
            <span style={{ color: 'var(--text-subtle)', fontSize: '0.8125rem' }}>{guide.readTime}</span>
          </div>

          <h1
            className="at-display"
            style={{ margin: '0 0 var(--space-2)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            {guide.title}
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
            {guide.summary}
          </p>
        </div>
      </div>

      {/* Article body */}
      <div className="at-container" style={{ paddingBlock: 'var(--space-6)', maxWidth: 720 }}>
        <article>
          {guide.sections.map((section, i) => (
            <section key={i} style={{ marginBottom: 'var(--space-5)' }}>
              <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)', color: 'var(--text)' }}>
                {section.heading}
              </h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                {section.body}
              </p>
            </section>
          ))}
        </article>

        {/* CTA */}
        <div
          className="at-card"
          style={{
            padding: 'var(--space-4)',
            background: 'var(--at-alpine-light)',
            border: '1px solid color-mix(in srgb, var(--at-alpine-green) 20%, transparent)',
            marginTop: 'var(--space-6)',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--at-alpine-green)' }}>
            Ready to find your role?
          </p>
          <p style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            Browse hospitality jobs across Austria — housing-aware matching included.
          </p>
          <Link href={`/${locale}/jobs`} className="at-btn at-btn--primary">
            Browse open roles →
          </Link>
        </div>

        {/* Related guides */}
        {related.length > 0 && (
          <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)' }}>
            <h2 className="at-h2" style={{ margin: '0 0 var(--space-3)' }}>More guides</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {related.map(g => (
                <Link
                  key={g.slug}
                  href={`/${locale}/resources/${g.slug}`}
                  className="at-card at-card--interactive"
                  style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2)', textDecoration: 'none' }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-chip)',
                      background: 'var(--at-alpine-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--at-alpine-green)',
                    }}
                    aria-hidden="true"
                  >
                    <GuideIcon category={g.category} size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="at-h3" style={{ margin: '0 0 2px', fontSize: '0.9375rem' }}>{g.title}</p>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{g.readTime}</p>
                  </div>
                  <span style={{ color: 'var(--primary)', flexShrink: 0 }} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
