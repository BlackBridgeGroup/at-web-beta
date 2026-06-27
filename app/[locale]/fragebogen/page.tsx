import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteShell } from '../../../components/SiteShell';
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

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container" style={{ maxWidth: 560 }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
            Questionnaire
          </p>
          <h1 className="at-h1" style={{ margin: '0 0 var(--space-4)' }}>{d.questionnaire.title}</h1>

          <div className="at-card" style={{ padding: 'var(--space-4)' }}>
            <form style={{ display: 'grid', gap: 'var(--space-2)' }}>
              <input className="at-input" placeholder={d.questionnaire.name} required />
              <input className="at-input" placeholder={d.questionnaire.role} required />
              <input className="at-input" placeholder={d.questionnaire.languages} />
              <input className="at-input" placeholder={d.questionnaire.region} />
              <input className="at-input" placeholder={d.questionnaire.availability} />
              <select className="at-input" defaultValue="">
                <option value="" disabled>{d.questionnaire.contact}</option>
                <option>WhatsApp</option>
                <option>Telegram</option>
                <option>Email</option>
                <option>Phone</option>
              </select>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <input type="checkbox" required style={{ marginTop: 2, flexShrink: 0 }} />
                {d.questionnaire.consent}
              </label>
              <button type="submit" className="at-btn at-btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
                {d.questionnaire.continue}
              </button>
            </form>
          </div>

          <p style={{ marginTop: 'var(--space-2)', color: 'var(--text-subtle)', fontSize: '0.8125rem', textAlign: 'center' }}>
            Submission is enabled after Supabase configuration.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
