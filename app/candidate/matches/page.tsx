import { DashboardShell } from '../../../components/DashboardShell';
import { JobCard } from '../../../components/JobCard';
import { MatchScore } from '../../../components/MatchScore';
import { EmptyState } from '../../../components/EmptyState';
import { createClient } from '../../../lib/supabase/server';
import { getAppLocale } from '../../../lib/appLocale';
import { getDictionary } from '../../../lib/i18n';

export default async function MatchesPage() {
  const locale = await getAppLocale();
  const d = getDictionary(locale);
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();

  const { data: subs } = await s
    .from('submissions')
    .select('id,status,score,trial_date,roles(title,region,salary_offer)')
    .eq('candidate_user_id', user!.id)
    .eq('status', 'MATCHED')
    .order('score', { ascending: false });

  const matches = subs ?? [];

  return (
    <DashboardShell role="candidate" locale={locale} signOutLabel={d.app.dash.signOut}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h1 className="at-h1" style={{ margin: '0 0 4px' }}>Your matches</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          {matches.length > 0
            ? `${matches.length} role${matches.length !== 1 ? 's' : ''} matched to your profile, ranked by fit`
            : 'Matches appear here once our team reviews your profile'}
        </p>
      </div>

      {matches.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {matches.map((m: any) => {
            const role = m.roles as any;
            return (
              <div
                key={m.id}
                className="at-card"
                style={{ padding: 'var(--space-4)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}
              >
                {/* Score ring */}
                <MatchScore score={m.score ?? 0} variant="ring" />

                {/* Role info */}
                <div style={{ flex: 1, minWidth: 180 }}>
                  <p style={{ margin: '0 0 2px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    Hotel · {role?.region ?? '—'}
                  </p>
                  <p className="at-h3" style={{ margin: '0 0 6px' }}>{role?.title ?? 'Role'}</p>
                  <p style={{ margin: '0 0 10px', fontWeight: 600, fontSize: '0.9375rem' }}>
                    {role?.salary_offer ? `€${role.salary_offer}/mo` : '—'}
                  </p>

                  {/* Match breakdown chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {m.score >= 80 && (
                      <span className="at-chip at-chip--selected" style={{ fontSize: '0.75rem' }}>Role match</span>
                    )}
                    {m.score >= 85 && (
                      <span className="at-chip at-chip--selected" style={{ fontSize: '0.75rem' }}>Location match</span>
                    )}
                    {m.score >= 90 && (
                      <span className="at-chip at-chip--selected" style={{ fontSize: '0.75rem' }}>Language match</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', flexShrink: 0 }}>
                  <a
                    href={`/${locale}/jobs`}
                    className="at-btn at-btn--primary at-btn--sm"
                  >
                    View job →
                  </a>
                  {m.trial_date && (
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Trial: {new Date(m.trial_date).toLocaleDateString('en-AT', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No matches yet"
          body="We'll match you to roles once your profile is reviewed. This usually takes 1–2 business days."
          action={<a href="/candidate/dashboard" className="at-btn at-btn--secondary">Back to dashboard</a>}
        />
      )}
    </DashboardShell>
  );
}
