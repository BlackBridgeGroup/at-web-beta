import type { CSSProperties } from 'react';
import { DashboardShell } from '../../../components/DashboardShell';
import { StatCard } from '../../../components/StatCard';
import { MatchScore } from '../../../components/MatchScore';
import { EmptyState } from '../../../components/EmptyState';
import { createClient } from '../../../lib/supabase/server';
import { getAppLocale } from '../../../lib/appLocale';
import { getDictionary } from '../../../lib/i18n';
import Link from 'next/link';

function greeting(name?: string) {
  const h = new Date().getHours();
  const time = h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
  return `Good ${time}${name ? `, ${name.split(' ')[0]}` : ''}`;
}

const stagePillStyle = (status: string): CSSProperties => {
  const map: Record<string, { bg: string; color: string }> = {
    MATCHED:           { bg: 'color-mix(in srgb, var(--at-alpine-mid) 15%, transparent)',   color: 'var(--at-alpine-mid)' },
    SENT_TO_EMPLOYER:  { bg: 'color-mix(in srgb, var(--at-alpine-green) 15%, transparent)', color: 'var(--at-alpine-green)' },
    TRIAL_SCHEDULED:   { bg: 'color-mix(in srgb, var(--at-sunset) 15%, transparent)',       color: 'var(--at-neutral-900)' },
    PLACED:            { bg: 'color-mix(in srgb, var(--at-alpine-green) 15%, transparent)', color: 'var(--at-alpine-green)' },
    REJECTED:          { bg: 'color-mix(in srgb, var(--at-neutral-400) 15%, transparent)',  color: 'var(--text-subtle)' },
  };
  const s = map[status] ?? { bg: 'var(--bg-sunken)', color: 'var(--text-muted)' };
  return {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 'var(--radius-pill)',
    fontSize: '0.75rem',
    fontWeight: 600,
    ...s,
  };
};

export default async function EmployerDashboard() {
  const locale = await getAppLocale();
  const d = getDictionary(locale);
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();

  const { data: p } = await s
    .from('employer_profiles')
    .select('*')
    .eq('user_id', user!.id)
    .maybeSingle();

  const { data: roles } = await s
    .from('roles')
    .select('*,submissions(id,candidate_user_id,score,status,trial_date)')
    .eq('employer_user_id', user!.id);

  const status = p?.status ?? 'NEW_COMPANY';
  const totalCandidates = roles?.reduce((a: number, r: any) => a + (r.submissions?.length ?? 0), 0) ?? 0;
  const interviews = roles?.reduce((a: number, r: any) => a + (r.submissions?.filter((s: any) => s.status === 'TRIAL_SCHEDULED').length ?? 0), 0) ?? 0;
  const placements = roles?.reduce((a: number, r: any) => a + (r.submissions?.filter((s: any) => s.status === 'PLACED').length ?? 0), 0) ?? 0;

  return (
    <DashboardShell role="employer" locale={locale} userName={p?.contact_person} signOutLabel={d.app.dash.signOut}>
      {/* Greeting */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h1 className="at-h1" style={{ margin: '0 0 4px' }}>{greeting(p?.contact_person)} 👋</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          {p?.company_name ?? 'Your company'} · {d.app.status[status] ?? status}
        </p>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-4)',
        }}
      >
        <StatCard value={String(roles?.length ?? 0)} label="Active vacancies" />
        <StatCard value={String(totalCandidates)} label="Candidates" />
        <StatCard value={String(interviews)} label="Interviews" />
        <StatCard value={String(placements)} label="Placements" />
      </div>

      {/* Candidates table header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)', gap: 12, flexWrap: 'wrap' }}>
        <h2 className="at-h2" style={{ margin: 0 }}>Candidates</h2>
        <Link href="/employer/vacancies/new" className="at-btn at-btn--primary at-btn--sm">
          + Post a vacancy
        </Link>
      </div>

      {(() => {
        const allCandidates = (roles ?? []).flatMap((role: any) =>
          (role.submissions ?? []).map((sub: any) => ({
            ...sub,
            roleName: role.title,
            roleRegion: role.region,
          }))
        ).sort((a: any, b: any) => (b.score ?? 0) - (a.score ?? 0));

        if (allCandidates.length === 0) {
          return (
            <EmptyState
              title="No vacancies yet"
              body="Post your first vacancy to start receiving matched candidates."
              action={
                <Link href="/employer/vacancies/new" className="at-btn at-btn--primary">
                  Post a vacancy →
                </Link>
              }
            />
          );
        }

        return (
          <div className="at-card" style={{ overflow: 'hidden' }}>
            <style>{`
              .cand-row { transition: background var(--dur-fast, 0.12s) ease; }
              .cand-row:hover { background: var(--bg-sunken) !important; }
              .cand-table-header { display: flex; }
              @media (max-width: 600px) {
                .cand-table-header { display: none !important; }
                .cand-row { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; padding: 16px !important; }
                .cand-row-action { align-self: flex-end; }
              }
            `}</style>

            {/* Column headers */}
            <div
              className="cand-table-header"
              style={{
                alignItems: 'center',
                gap: 12,
                padding: '10px 16px',
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: 'var(--text-subtle)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg-sunken)',
              }}
            >
              <span style={{ flex: '0 0 34px' }} />
              <span style={{ flex: 3 }}>Candidate</span>
              <span style={{ flex: 3 }}>Role</span>
              <span style={{ flex: 2 }}>Match</span>
              <span style={{ flex: 2 }}>Stage</span>
              <span style={{ flex: 2 }}>Last activity</span>
              <span style={{ flex: '0 0 56px', textAlign: 'right' }}>Action</span>
            </div>

            {/* Rows */}
            {allCandidates.map((c: any) => (
              <div
                key={c.id}
                className="cand-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    flex: '0 0 34px',
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'var(--at-alpine-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--at-alpine-green)',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>

                {/* Candidate */}
                <div style={{ flex: 3, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Candidate
                  </p>
                </div>

                {/* Role */}
                <div style={{ flex: 3, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.roleName}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.roleRegion}</p>
                </div>

                {/* Match */}
                <div style={{ flex: 2 }}>
                  {c.score != null && <MatchScore score={c.score} variant="pill" />}
                </div>

                {/* Stage */}
                <div style={{ flex: 2 }}>
                  <span style={stagePillStyle(c.status)}>
                    {d.app.status[c.status] ?? c.status}
                  </span>
                </div>

                {/* Last activity */}
                <div style={{ flex: 2 }}>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    {c.trial_date
                      ? new Date(c.trial_date).toLocaleDateString('en-AT', { day: 'numeric', month: 'short' })
                      : '—'}
                  </p>
                </div>

                {/* Action */}
                <div className="cand-row-action" style={{ flex: '0 0 56px', display: 'flex', justifyContent: 'flex-end' }}>
                  <a
                    href={`/employer/candidates/${c.id}`}
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--primary)',
                      fontWeight: 600,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    View →
                  </a>
                </div>
              </div>
            ))}
          </div>
        );
      })()}
    </DashboardShell>
  );
}
