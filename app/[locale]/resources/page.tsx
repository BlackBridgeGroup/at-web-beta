import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { locales, normalizeLocale, getDictionary, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = { title: 'AlpenLife Resources' };

type Guide = {
  slug: string;
  cat: 'Moving' | 'Language' | 'Legal' | 'Housing' | 'Work';
  catL: Record<string, string>;
  title: Record<string, string>;
  summary: Record<string, string>;
  min: number;
};

const GUIDES: Guide[] = [
  {
    slug: 'moving-to-austria', cat: 'Moving',
    catL: { de: 'Umzug', cz: 'Stěhování', en: 'Moving' },
    title: {
      de: 'Umzug nach Österreich: der Praxisleitfaden',
      cz: 'Stěhování do Rakouska: praktický průvodce',
      en: 'Moving to Austria: the practical guide',
    },
    summary: {
      de: 'Anmeldung, Bankkonto, SIM-Karte — alles, was du in den ersten zwei Wochen brauchst.',
      cz: 'Přihlášení, bankovní účet, SIM karta — vše, co potřebuješ v prvních dvou týdnech.',
      en: 'Registration, Anmeldung, bank account, SIM card — everything you need in the first two weeks.',
    },
    min: 8,
  },
  {
    slug: 'german-for-hospitality', cat: 'Language',
    catL: { de: 'Sprache', cz: 'Jazyk', en: 'Language' },
    title: {
      de: 'Deutsch für Hotellerie & Gastronomie',
      cz: 'Němčina pro pohostinství',
      en: 'German for hospitality workers',
    },
    summary: {
      de: 'Die 100 Sätze, die du täglich im Hotel oder Restaurant brauchst. Ohne Schnickschnack.',
      cz: '100 frází, které použiješ každý den v hotelu nebo restauraci. Žádná vata, jen to podstatné.',
      en: "The 100 phrases you'll use every day in a hotel or restaurant. No fluff, just the essentials.",
    },
    min: 6,
  },
  {
    slug: 'understanding-your-austrian-contract', cat: 'Legal',
    catL: { de: 'Recht', cz: 'Právo', en: 'Legal' },
    title: {
      de: 'Dein österreichischer Arbeitsvertrag verständlich',
      cz: 'Rozumět rakouské pracovní smlouvě',
      en: 'Understanding your Austrian work contract',
    },
    summary: {
      de: 'Was der Kollektivvertrag bedeutet, worauf du Anspruch hast und was du vor der Unterschrift prüfen solltest.',
      cz: 'Co znamená Kollektivvertrag, na co máš nárok a co zkontrolovat před podpisem.',
      en: "What Kollektivvertrag means, what you're entitled to, and what to check before you sign.",
    },
    min: 7,
  },
  {
    slug: 'staff-housing-in-austria', cat: 'Housing',
    catL: { de: 'Wohnen', cz: 'Bydlení', en: 'Housing' },
    title: {
      de: 'Personalunterkünfte in österreichischen Hotels',
      cz: 'Ubytování pro personál v rakouských hotelech',
      en: 'Staff housing in Austrian hotels',
    },
    summary: {
      de: 'Was dich erwartet, was üblicherweise inklusive ist und welche Rechte du als Mieter hast.',
      cz: 'Co očekávat, co bývá v ceně a jaká máš práva nájemníka.',
      en: "What to expect, what's usually included, and your rights as a tenant.",
    },
    min: 5,
  },
  {
    slug: 'seasonal-vs-permanent-work', cat: 'Work',
    catL: { de: 'Arbeit', cz: 'Práce', en: 'Work' },
    title: {
      de: 'Saison- vs. Ganzjahresstellen in Österreich',
      cz: 'Sezónní vs. stálé pozice v Rakousku',
      en: 'Seasonal vs permanent roles in Austria',
    },
    summary: {
      de: 'Vor- und Nachteile beider und wie du deinen Karriereweg in der Hotellerie planst.',
      cz: 'Výhody a nevýhody obojího a jak si naplánovat kariéru v rakouském pohostinství.',
      en: 'The pros and cons of each, and how to plan a career path through Austrian hospitality.',
    },
    min: 6,
  },
];

const READ_LABEL: Record<string, string> = { de: 'Leitfaden lesen', cz: 'Číst průvodce', en: 'Read guide' };
const MIN_LABEL: Record<string, (m: number) => string> = {
  de: m => `${m} Min. Lesezeit`,
  cz: m => `${m} min čtení`,
  en: m => `${m} min read`,
};

function IconTile({ category, size = 22 }: { category: string; size?: number }) {
  const s = size;
  const shared = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (category) {
    case 'Moving':
      return <svg {...shared}><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>;
    case 'Language':
      return <svg {...shared}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case 'Legal':
      return <svg {...shared}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    case 'Housing':
      return <svg {...shared}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case 'Work':
      return <svg {...shared}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    default:
      return null;
  }
}

export default async function Resources({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const d = getDictionary(locale);
  const r = d.ui.resources;
  const readLabel = READ_LABEL[locale] ?? READ_LABEL.de;
  const minLabel = MIN_LABEL[locale] ?? MIN_LABEL.de;

  return (
    <SiteShell locale={locale}>
      <style>{`
        .guide-card { transition: border-color var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease); }
        .guide-card:hover { border-color: var(--at-alpine-green) !important; transform: translateY(-2px); box-shadow: 0 8px 24px color-mix(in srgb, var(--at-alpine-green) 12%, transparent); }
        .guide-card:hover .guide-arrow { transform: translateX(3px); }
        .guide-arrow { transition: transform var(--dur-fast) var(--ease); }
      `}</style>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--at-alpine-green) 0%, #1E4D38 100%)', paddingTop: 'clamp(48px, 7vw, 72px)', paddingBottom: 0, position: 'relative' }}>
        <div className="at-container" style={{ paddingBottom: 'clamp(40px, 5vw, 56px)' }}>
          <p style={{ margin: '0 0 10px', fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>{r.eyebrow}</p>
          <h1 className="at-display" style={{ margin: '0 0 var(--space-2)', color: '#fff', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', maxWidth: 600 }}>{r.heading}</h1>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.65, maxWidth: 520 }}>{r.sub}</p>
        </div>
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true" style={{ display: 'block', width: '100%', height: 52 }}>
          <path d="M0 80 L60 40 L120 65 L180 20 L240 50 L300 10 L360 45 L420 25 L480 55 L540 15 L600 50 L660 30 L720 60 L780 20 L840 55 L900 35 L960 65 L1020 25 L1080 50 L1140 15 L1200 45 L1200 80 L0 80 Z" fill="var(--bg)" />
        </svg>
      </div>

      {/* Uniform card grid — equal cards, theme-aware (works in light + dark) */}
      <div className="at-container" style={{ paddingBlock: 'var(--space-6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-3)' }}>
          {GUIDES.map(g => (
            <Link
              key={g.slug}
              href={`/${locale}/resources/${g.slug}`}
              className="at-card guide-card"
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', padding: 'var(--space-4)', textDecoration: 'none', borderRadius: 20, border: '1px solid var(--border)', background: 'var(--bg-elevated)' }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'color-mix(in srgb, var(--at-alpine-green) 14%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--at-alpine-green)', flexShrink: 0 }} aria-hidden="true">
                <IconTile category={g.cat} size={22} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--at-alpine-green)' }}>{g.catL[locale] ?? g.catL.de}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{minLabel(g.min)}</span>
              </div>
              <div>
                <p className="at-h3" style={{ margin: '0 0 6px', color: 'var(--text)' }}>{g.title[locale] ?? g.title.de}</p>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{g.summary[locale] ?? g.summary.de}</p>
              </div>
              <span style={{ marginTop: 'auto', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--at-alpine-green)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                {readLabel} <span className="guide-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
