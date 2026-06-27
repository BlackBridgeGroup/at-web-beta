import { DashboardShell } from '../../../components/DashboardShell';
import { EmptyState } from '../../../components/EmptyState';
import { getAppLocale } from '../../../lib/appLocale';
import { getDictionary } from '../../../lib/i18n';

export default async function MessagesPage() {
  const locale = await getAppLocale();
  const d = getDictionary(locale);

  return (
    <DashboardShell role="candidate" locale={locale} signOutLabel={d.app.dash.signOut}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h1 className="at-h1" style={{ margin: '0 0 4px' }}>Messages</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          Direct messages from AlpenTalent and your hotels
        </p>
      </div>

      <EmptyState
        title="No messages yet"
        body="We'll reach out here when a hotel wants to connect. In the meantime, questions? WhatsApp us directly."
        action={
          <a
            href="https://wa.me/436769124013"
            className="at-btn at-btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us →
          </a>
        }
      />
    </DashboardShell>
  );
}
