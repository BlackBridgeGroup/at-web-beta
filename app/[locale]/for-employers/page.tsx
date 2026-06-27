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

const employerFaq: [string, string][] = [
  ['How quickly can you find candidates?', 'Typically within 5–10 working days for standard roles. Urgent placements can sometimes be arranged faster — contact us to discuss.'],
  ['Do you only place Czech and Slovak candidates?', 'Our primary specialisation is Central European hospitality talent — Czech Republic, Slovakia, and increasingly Hungary and Romania. EU citizens have the right to work freely in Austria, so there are no visa hurdles.'],
  ['What if a placement doesn\'t work out?', 'We offer a replacement guarantee period on retained search placements. If a placed candidate leaves within the guarantee window, we source and place a replacement at no additional fee. Details are in your service agreement.'],
  ['Do you coordinate housing?', 'We communicate your housing situation to candidates during matching — many prioritise roles with staff housing. We advise on how to present your housing offering clearly; we do not arrange housing on your behalf.'],
  ['Can I post a vacancy without registering?', 'You need a quick Google sign-in to post a vacancy. We verify your hotel details within 24 hours before matching begins.'],
  ['Is pricing negotiable?', 'Our service models are designed around your volume and situation. Lead-gen and RPO pricing is especially flexible. Talk to us — we\'d rather find a model that fits than lose a good-fit partner over a rigid rate card.'],
];

const services = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>,
    title: 'Active vacancies', body: 'Post roles and manage your open positions from your employer dashboard.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    title: 'Matched candidates', body: 'Receive pre-screened, language-matched candidates who are ready for Austria.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Interviews', body: 'We help you prepare and coordinate. You choose who to meet.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: 'Placements', body: 'Track placements and trial shifts in one place.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: 'Campaigns', body: 'Meta campaigns and landing pages that bring candidates directly to you.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
    title: 'Employer branding', body: 'Stand out to hospitality talent across Austria and Central Europe.',
  },
];

const pricingTiers = [
  {
    name: 'Lead-gen',
    price: 'Setup fee',
    description: 'We run Meta campaigns that bring inbound candidate interest directly to you.',
    features: ['Meta ad campaigns', 'Landing page', 'WhatsApp automation', 'Weekly reporting'],
    cta: 'Talk to us',
    href: '/contact',
  },
  {
    name: 'Retained search',
    price: 'Fixed fee per placement',
    description: 'We find, screen, and place the right person. You pay only when someone starts.',
    features: ['Candidate sourcing', 'Manual screening', 'Language assessment', 'Trial shift coordination'],
    cta: 'Get started',
    href: '/login?role=employer',
    featured: true,
  },
  {
    name: 'Embedded / RPO',
    price: 'Monthly retainer',
    description: 'AlpenTalent acts as your embedded talent function — we run your whole hiring pipeline.',
    features: ['Dedicated recruiter', 'Unlimited placements', 'Pipeline management', 'Employer branding'],
    cta: 'Talk to us',
    href: '/contact',
  },
];

export default async function ForEmployers({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

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
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.75 }}>For hotels & restaurants</p>
          <h1 className="at-display" style={{ color: '#fff', margin: '0 0 var(--space-3)' }}>Hire hospitality talent that's ready for Austria.</h1>
          <p style={{ margin: '0 0 var(--space-4)', fontSize: '1.125rem', opacity: 0.9, lineHeight: 1.6 }}>Pre-screened, language-matched, housing-aware. People who'll stay.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href={`/login?role=employer`} className="at-btn" style={{ background: '#fff', color: 'var(--at-alpine-green)', fontWeight: 700 }}>Post a vacancy</Link>
            <Link href={`/${locale}/contact`} className="at-btn" style={{ background: 'transparent', color: '#fff', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.5)' }}>Talk to us</Link>
          </div>
        </div>
        <div style={{ marginTop: 64 }}><Ridge variant="hero" opacity={1} /></div>
      </section>

      {/* Services bento */}
      <BentoSection
        eyebrow="Our services"
        heading="Everything you need to build your team."
        tiles={services.map(s => ({
          icon: s.icon,
          title: s.title,
          body: s.body,
        }))}
      />

      {/* How hiring works */}
      <section style={{ paddingBlock: 'var(--space-8)', background: 'var(--bg-sunken)' }}>
        <div className="at-container" style={{ maxWidth: 800 }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>How hiring works</p>
          <h2 className="at-h1" style={{ margin: '0 0 var(--space-4)' }}>From vacancy to first day in 3 steps</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
            {[
              ['01', 'Tell us what you need', 'Post a vacancy or speak with our team. We clarify role, timing, and requirements.'],
              ['02', 'Receive matched candidates', 'Within days, you receive pre-screened profiles matched to your specific role and hotel.'],
              ['03', 'Interview & place', 'Meet the candidates, arrange a trial shift, and we support you through to placement.'],
            ].map(([num, title, body]) => (
              <div key={num} style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--at-alpine-light)', lineHeight: 1, flexShrink: 0 }}>{num}</span>
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
            <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>Pricing</p>
            <h2 className="at-h1" style={{ margin: '0 0 8px' }}>Simple ways to work with us.</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>No surprises. The exact pricing depends on your needs — talk to us.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-2)' }}>
            {pricingTiers.map(tier => (
              <div
                key={tier.name}
                className="at-card"
                style={{
                  padding: 'var(--space-4)',
                  background: tier.featured ? 'var(--at-alpine-green)' : 'var(--bg-elevated)',
                  color: tier.featured ? '#fff' : 'var(--text)',
                  border: tier.featured ? '2px solid var(--at-alpine-green)' : undefined,
                }}
              >
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
                <Link
                  href={`/${locale}${tier.href}`}
                  className="at-btn"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: tier.featured ? '#fff' : 'transparent',
                    color: tier.featured ? 'var(--at-alpine-green)' : 'var(--primary)',
                    boxShadow: tier.featured ? 'none' : 'inset 0 0 0 1.5px var(--primary)',
                    fontWeight: 700,
                  }}
                >
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
          <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>FAQ</p>
          <h2 className="at-h1" style={{ margin: '0 0 var(--space-4)' }}>Questions from hotels</h2>
          <div data-placeholder="verify">
            <Accordion items={employerFaq} />
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ paddingBlock: 'var(--space-6)', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="at-container" style={{ textAlign: 'center' }}>
          <h2 className="at-h2" style={{ margin: '0 0 8px' }}>Ready to meet your next team member?</h2>
          <p style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)' }}>Post a vacancy in minutes or talk to us first.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link href="/login?role=employer" className="at-btn at-btn--primary">Post a vacancy</Link>
            <Link href={`/${locale}/contact`} className="at-btn at-btn--secondary">Talk to us</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
