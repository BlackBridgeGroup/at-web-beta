import { DashboardShell } from './DashboardShell';
import type { Locale } from '../lib/i18n';

const SOON: Record<string, string> = {
  de: 'Dieser Bereich wird gerade vorbereitet. Schau bald wieder vorbei.',
  cz: 'Tato sekce se připravuje. Brzy bude k dispozici.',
  en: 'This section is coming soon.',
};

export function SectionStub({
  role,
  locale = 'de',
  userName,
  titles,
}: {
  role: 'candidate' | 'employer' | 'partner';
  locale?: Locale;
  userName?: string;
  titles: Record<string, string>;
}) {
  const title = titles[locale] ?? titles.de ?? titles.en ?? '';
  return (
    <DashboardShell role={role} locale={locale} userName={userName}>
      <div style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
        <h1 className="at-h1" style={{ marginTop: 0 }}>{title}</h1>
        <div
          className="at-card"
          style={{
            padding: 'var(--space-4)',
            marginTop: 'var(--space-3)',
            color: 'var(--text-muted)',
            maxWidth: 520,
          }}
        >
          {SOON[locale] ?? SOON.de}
        </div>
      </div>
    </DashboardShell>
  );
}
