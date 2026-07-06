import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = { title: 'Success Stories' };

const T: Record<Locale, {
  eyebrow: string;
  h1: string;
  sub: string;
  cardTitle: string;
  cardBody: string;
  cta: string;
}> = {
  de: {
    eyebrow: 'Referenzen',
    h1: 'Verifizierte Geschichten folgen.',
    sub: 'Wir veroeffentlichen hier erst Fallstudien, wenn Namen, Rollen und Ergebnisse sauber freigegeben sind.',
    cardTitle: 'Bis dahin: persoenlicher Recruiting-Prozess',
    cardBody: 'AlpenTalent prueft Kandidaten, Bedarf und Rahmenbedingungen manuell. Fuer Hotels ist der schnellste Weg eine kurze Anfrage mit aktueller Rolle und Region.',
    cta: 'Anfrage senden',
  },
  cz: {
    eyebrow: 'Reference',
    h1: 'Ověřené příběhy brzy doplníme.',
    sub: 'Případové studie zveřejníme až ve chvíli, kdy budou jména, role i výsledky reálně potvrzené.',
    cardTitle: 'Mezitím: osobní náborový proces',
    cardBody: 'AlpenTalent ručně ověřuje kandidáty, potřebu i podmínky. Pro uchazeče je nejlepší začít krátkým profilem.',
    cta: 'Vyplnit profil',
  },
  en: {
    eyebrow: 'References',
    h1: 'Verified stories are coming.',
    sub: 'We will publish case studies only after names, roles, and outcomes are properly approved.',
    cardTitle: 'Until then: personal recruiting process',
    cardBody: 'AlpenTalent manually reviews candidates, hiring needs, and conditions. The fastest first step is a short profile or hiring enquiry.',
    cta: 'Start now',
  },
};

export default async function SuccessStories({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = T[locale] ?? T.de;
  const ctaHref = locale === 'de' ? '/de/contact' : `/${locale}/fragebogen`;

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
            {t.eyebrow}
          </p>
          <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>{t.h1}</h1>
          <p style={{ margin: '0 0 var(--space-5)', color: 'var(--text-muted)', lineHeight: 1.7 }}>{t.sub}</p>

          <div className="at-card" style={{ padding: 'var(--space-4)' }}>
            <p className="at-h3" style={{ margin: '0 0 var(--space-2)' }}>{t.cardTitle}</p>
            <p style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)', lineHeight: 1.7 }}>{t.cardBody}</p>
            <Link href={ctaHref} className="at-btn at-btn--primary">{t.cta}</Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
