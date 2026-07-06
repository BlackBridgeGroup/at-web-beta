import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteShell } from '../../../components/SiteShell';
import { QuestionnaireLeadForm } from '../../../components/PublicLeadForm';
import { getDictionary, locales, normalizeLocale } from '../../../lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) return {};
  const locale = normalizeLocale(raw);
  const d = getDictionary(locale);
  return {
    title: d.questionnaire.title,
    alternates: { canonical: `/${locale}/fragebogen`, languages: { de: '/de/fragebogen', cs: '/cz/fragebogen', en: '/en/fragebogen', 'x-default': '/de/fragebogen' } },
  };
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function Fragebogen({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw);
  const d = getDictionary(locale);
  const eyebrow = {
    de: 'Fragebogen',
    cz: 'Dotazník',
    en: 'Questionnaire',
  }[locale];

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container" style={{ maxWidth: 560 }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
            {eyebrow}
          </p>
          <h1 className="at-h1" style={{ margin: '0 0 var(--space-4)' }}>{d.questionnaire.title}</h1>

          <div className="at-card" style={{ padding: 'var(--space-4)' }}>
            <QuestionnaireLeadForm locale={locale} labels={d.questionnaire} />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
