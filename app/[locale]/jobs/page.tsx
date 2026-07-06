import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

const copy: Record<Locale, {
  h1: string;
  sub: string;
  cta: string;
  note: string;
  roles: string[];
}> = {
  de: {
    h1: 'Hospitality-Rollen in Österreich',
    sub: 'AlpenTalent arbeitet nicht wie ein anonymes Jobboard. Wir nehmen dein Profil auf, prüfen Region, Sprache, Erfahrung und Verfügbarkeit und schlagen passende Rollen persönlich vor.',
    cta: 'Profil senden',
    note: 'Für Kandidaten kostenlos. Keine Weitergabe deines Profils ohne Zustimmung.',
    roles: ['Service', 'Küche', 'Housekeeping', 'Rezeption', 'Saisonrollen', 'Ganzjahresstellen'],
  },
  cz: {
    h1: 'Práce v hotelnictví v Rakousku',
    sub: 'AlpenTalent není anonymní job board. Nejdřív zjistíme tvoje zkušenosti, němčinu, dostupnost a region. Potom tě spojíme jen s rolemi, které dávají smysl.',
    cta: 'Vyplnit profil',
    note: 'Pro uchazeče zdarma. Tvůj profil neposíláme zaměstnavateli bez tvého souhlasu.',
    roles: ['Obsluha', 'Kuchyně', 'Housekeeping', 'Recepce', 'Sezónní práce', 'Celoroční role'],
  },
  en: {
    h1: 'Hospitality roles in Austria',
    sub: 'AlpenTalent is not an anonymous job board. We collect your profile, review region, language, experience, and availability, then suggest fitting roles personally.',
    cta: 'Send profile',
    note: 'Free for candidates. We never share your profile with an employer without your consent.',
    roles: ['Service', 'Kitchen', 'Housekeeping', 'Reception', 'Seasonal roles', 'Year-round roles'],
  },
};

export default async function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = copy[locale] ?? copy.de;

  return (
    <SiteShell locale={locale}>
      <section style={{ background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)', paddingBlock: 'clamp(56px, 8vw, 96px)' }}>
        <div className="at-container" style={{ maxWidth: 760 }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
            AlpenTalent
          </p>
          <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>{t.h1}</h1>
          <p style={{ margin: '0 0 var(--space-4)', color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '1rem' }}>{t.sub}</p>
          <Link href={`/${locale}/fragebogen`} className="at-btn at-btn--primary">{t.cta}</Link>
        </div>
      </section>

      <section style={{ paddingBlock: 'var(--space-6)' }}>
        <div className="at-container" style={{ maxWidth: 760 }}>
          <div className="at-card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'var(--space-3)' }}>
              {t.roles.map(role => <span key={role} className="at-chip">{role}</span>)}
            </div>
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.7 }}>{t.note}</p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
