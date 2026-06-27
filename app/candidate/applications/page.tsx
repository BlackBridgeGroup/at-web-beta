import { DashboardShell } from '../../../components/DashboardShell';
import { MatchScore } from '../../../components/MatchScore';
import { EmptyState } from '../../../components/EmptyState';
import { createClient } from '../../../lib/supabase/server';
import { getAppLocale } from '../../../lib/appLocale';
import { getDictionary } from '../../../lib/i18n';

const STAGES = ['MATCHED', 'REVIEW', 'SENT_TO_EMPLOYER', 'TRIAL_SCHEDULED', 'PLACED'] as const;
const STAGE_LABELS: Record<string, string> = {
  MATCHED: 'Matched',
  REVIEW: 'In review',
  SENT_TO_EMPLOYER: 'Sent',
  TRIAL_SCHEDULED: 'Trial',
  PLACED: 'Placed',
};

function stageIndex(status: string) {
  const idx = STAGES.indexOf(status as (typeof STAGES)[number]);
  return idx === -1 ? (status === 'REJECTED' ? -1 : 0) : idx;
}

function StageTimeline({ status }: { status: string }) {
  const isRejected = status === 'REJECTED';
  const current = stageIndex(status);

  if (isRejected) {
    return (
      <span
        style={{
          display: 'inline-block',
          padding: '3px 10px',
          borderRadius: 'var(--radius-pill)',
          fontSize: '0.75rem',
          fontWeight: 600,
          background: 'color-mix(in srgb, var(--at-neutral-400) 15%, transparent)',
          color: 'var(--text-subtle)',
        }}
      >
        Not progressed
      </span>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {STAGES.map((stage, i) => {
        const reached = i <= current;
        const active = i === current;
        return (
          <div key={stage} style={{ display: 'flex', alignItems: 'center' }}>
            {/* Dot */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: reached ? 'var(--at-alpine-green)' : 'var(--border)',
                outline: active ? '3px solid color-mix(in srgb, var(--at-alpine-green) 25%, transparent)' : 'none',
                flexShrink: 0,
              }}
              aria-label={STAGE_LABELS[stage]}
            />
            {/* Connector line */}
            {i < STAGES.length - 1 && (
              <div
                style={{
                  width: 28,
                  height: 2,
                  background: i < current ? 'var(--at-alpine-green)' : 'var(--border)',
                }}
              />
            )}
          </div>
        );
      })}
      <span style={{ marginLeft: 8, fontSize: '0.75rem', fontWeight: 600, color: 'var(--at-alpine-green)' }}>
        {STAGE_LABELS[status] ?? status}
      </span>
    </div>
  );
}

export default async function ApplicationsPage() {
  const locale = await getAppLocale();
  const d = getDictionary(locale);
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();

  const { data: subs } = await s
    .from('submissions')
    .select('id,status,score,trial_date,roles(title,region,salary_offer)')
    .eq('candidate_user_id', user!.id)
    .order('id', { ascending: false });

  const allSubs = subs ?? [];

  return (
    <DashboardShell role="candidate" locale={locale} signOutLabel={d.app.dash.signOut}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h1 className="at-h1" style={{ margin: '0 0 4px' }}>Applications</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          {allSubs.length > 0
            ? `${allSubs.length} application${allSubs.length !== 1 ? 's' : ''} tracked`
            : 'Your applications will appear here'}
        </p>
      </div>

      {allSubs.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {allSubs.map((sub: any) => {
            const role = sub.roles as any;
            return (
              <div key={sub.id} className="at-card" style={{ padding: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
                  {/* Role info */}
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      Hotel · {role?.region ?? '—'}
                    </p>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9375rem' }}>
                      {role?.title ?? 'Role'}
                    </p>
                    {role?.salary_offer && (
                      <p style={{ margin: '2px 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        €{role.salary_offer}/mo
                      </p>
                    )}
                  </div>

                  {/* Match score */}
                  {sub.score != null && <MatchScore score={sub.score} variant="pill" />}
                </div>

                {/* Stage timeline */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <StageTimeline status={sub.status} />
                  {sub.trial_date && sub.status === 'TRIAL_SCHEDULED' && (
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--at-sunset)', fontWeight: 600 }}>
                      Trial day: {new Date(sub.trial_date).toLocaleDateString('en-AT', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No applications yet"
          body="When our team submits your profile to a hotel, it will appear here."
          action={<a href={`/${locale}/jobs`} className="at-btn at-btn--primary">Browse jobs →</a>}
        />
      )}
    </DashboardShell>
  );
}
