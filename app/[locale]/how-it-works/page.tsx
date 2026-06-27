import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../components/SiteShell';
import { HowItWorksSection } from '../../../components/HowItWorksSection';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Five simple steps to find your hospitality role in Austria.',
};

const T: Record<string, {
  eyebrow: string; h1: string; sub: string;
  candTitle: string; candText: string; candCta: string;
  empTitle: string; empText: string; empCta: string;
}> = {
  de: {
    eyebrow: 'Der Ablauf',
    h1: 'In fünf Schritten zu deiner Stelle in Österreich.',
    sub: 'Keine CV-Akrobatik. Keine Headhunter-Gebühren. Ein klarer Weg von der ersten Frage bis zum ersten Tag.',
    candTitle: 'Ich suche eine Stelle', candText: 'Erzähl uns von dir und wir matchen dich mit dem richtigen Hotel.', candCta: 'Stellen finden →',
    empTitle: 'Ich suche Personal', empText: 'Vorqualifizierte Fachkräfte, bereit für Österreich.', empCta: 'Für Arbeitgeber →',
  },
  cz: {
    eyebrow: 'Jak to probíhá',
    h1: 'Pět kroků k tvé roli v Rakousku.',
    sub: 'Žádné kličky s životopisem. Žádné poplatky headhunterům. Jasná cesta od první otázky po první den.',
    candTitle: 'Hledám práci', candText: 'Řekni nám o sobě a spárujeme tě se správným hotelem.', candCta: 'Najít příležitosti →',
    empTitle: 'Hledám personál', empText: 'Předvybraní profesionálové, připravení do Rakouska.', empCta: 'Pro zaměstnavatele →',
  },
  en: {
    eyebrow: 'The process',
    h1: 'Five steps to your role in Austria.',
    sub: 'No CV gymnastics. No headhunter fees. A clear path from first question to first day.',
    candTitle: "I'm looking for a role", candText: 'Tell us about yourself and get matched to the right hotel.', candCta: 'Find opportunities →',
    empTitle: "I'm hiring for my hotel", empText: 'Pre-matched hospitality talent, ready for Austria.', empCta: 'For employers →',
  },
};

export default async function HowItWorks({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = T[locale] ?? T.de;

  return (
    <SiteShell locale={locale}>
      {/* Page header */}
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)', textAlign: 'center', background: 'var(--bg)' }}>
        <div className="at-container" style={{ maxWidth: 640 }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
            {t.eyebrow}
          </p>
          <h1 className="at-display" style={{ margin: '0 0 var(--space-3)' }}>
            {t.h1}
          </h1>
          <p style={{ margin: 0, fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {t.sub}
          </p>
        </div>
      </div>

      {/* Steps (full version) */}
      <HowItWorksSection locale={locale} compact={false} />

      {/* Dual CTA */}
      <section style={{ paddingBlock: 'var(--space-8)' }}>
        <div className="at-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-3)' }}>
          <div className="at-card" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: 'var(--at-alpine-green)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h2 className="at-h2" style={{ margin: '0 0 8px' }}>{t.candTitle}</h2>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 var(--space-3)' }}>{t.candText}</p>
            <Link href={`/${locale}/jobs`} className="at-btn at-btn--primary">{t.candCta}</Link>
          </div>
          <div className="at-card" style={{ padding: 'var(--space-4)', textAlign: 'center', background: 'var(--at-alpine-green)', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: 'rgba(255,255,255,0.9)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z"/><path d="M6 12H4a2 2 0 0 0-2 2v8h4"/><path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
            </div>
            <h2 className="at-h2" style={{ margin: '0 0 8px', color: '#fff' }}>{t.empTitle}</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', margin: '0 0 var(--space-3)' }}>{t.empText}</p>
            <Link href={`/${locale}/for-employers`} className="at-btn" style={{ background: '#fff', color: 'var(--at-alpine-green)', fontWeight: 700 }}>{t.empCta}</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
