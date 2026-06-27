import { DashboardShell } from '../../../components/DashboardShell';
import { EmptyState } from '../../../components/EmptyState';
import { getAppLocale } from '../../../lib/appLocale';
import { getDictionary } from '../../../lib/i18n';

export default async function SavedJobsPage() {
  const locale = await getAppLocale();
  const d = getDictionary(locale);

  return (
    <DashboardShell role="candidate" locale={locale} signOutLabel={d.app.dash.signOut}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h1 className="at-h1" style={{ margin: '0 0 4px' }}>Saved jobs</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          Roles you've bookmarked to apply later
        </p>
      </div>

      <EmptyState
        title="No saved jobs yet"
        body="Tap the heart icon on any job listing to save it here."
        action={<a href={`/${locale}/jobs`} className="at-btn at-btn--primary">Browse jobs →</a>}
      />
    </DashboardShell>
  );
}
