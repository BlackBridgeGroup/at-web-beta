import { DashboardShell } from '../../../components/DashboardShell';
import { JobCard } from '../../../components/JobCard';
import { StatCard } from '../../../components/StatCard';
import { EmptyState } from '../../../components/EmptyState';
import { MatchScore } from '../../../components/MatchScore';
import { createClient } from '../../../lib/supabase/server';
import { getAppLocale } from '../../../lib/appLocale';
import { getDictionary } from '../../../lib/i18n';

function greeting(name?: string) {
  const h = new Date().getHours();
  const time = h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
  return `Good ${time}${name ? `, ${name.split(' ')[0]}` : ''}`;
}

export default async function CandidateDashboard() {
  const locale = await getAppLocale();
  const d = getDictionary(locale);
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();

  const { data: p } = await s
    .from('candidate_profiles')
    .select('*')
    .eq('user_id', user!.id)
    .maybeSingle();

  const { data: subs } = await s
    .from('submissions')
    .select('id,status,score,trial_date,roles(title,region,salary_offer)')
    .eq('candidate_user_id', user!.id);

  const required = ['country', 'region', 'roles_wanted', 'language', 'availability'];
  const missing = required.filter(x => !p?.[x]);
  const profilePct = Math.round(((required.length - missing.length) / required.length) * 100);
  const status = p?.status ?? 'NEW_PROFILE';

  const allSubs = subs ?? [];
  const matches = allSubs.filter((x: any) => x.status === 'MATCHED');
  const newMatches = matches.length;
  const applications = allSubs.length;

  const topMatch = [...matches].sort((a: any, b: any) => (b.score ?? 0) - (a.score ?? 0))[0];

  return (
    <DashboardShell role="candidate" locale={locale} userName={p?.name} signOutLabel={d.app.dash.signOut}>
      {/* Greeting */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h1 className="at-h1" style={{ margin: '0 0 4px' }}>{greeting(p?.name)} 👋</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          Here's what's happening with your job search today.
        </p>
      </div>

      {/* Profile completion */}
      {profilePct < 100 && (
        <div
          className="at-card"
          style={{
            padding: 'var(--space-3)',
            marginBottom: 'var(--space-4)',
            borderLeft: '3px solid var(--at-sunset)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
            <p style={{ margin: 0, fontSize: '0.9375rem' }}>
              Profile <strong>{profilePct}% complete</strong> — finish to unlock better matches
            </p>
            <a href="/candidate/profile" className="at-btn at-btn--secondary at-btn--sm">
              Complete profile
            </a>
          </div>
          <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <div
              style={{
                width: `${profilePct}%`,
                height: '100%',
                background: profilePct >= 80 ? 'var(--at-alpine-green)' : 'var(--at-sunset)',
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-4)',
        }}
      >
        <StatCard value={String(newMatches)} label="New matches" href="/candidate/matches" linkLabel="View matches" badge={newMatches > 0 ? `+${newMatches} new` : undefined} />
        <StatCard value={String(applications)} label="Applications" href="/candidate/applications" linkLabel="View all" />
        <StatCard value="0" label="Messages" href="/candidate/messages" linkLabel="Open messages" />
        <StatCard value="0" label="Saved jobs" href="/candidate/saved" linkLabel="View saved" />
      </div>

      {/* Status block */}
      <div
        className="at-card"
        style={{
          padding: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--at-alpine-green)', flexShrink: 0 }}
          aria-hidden="true"
        />
        <div>
          <p style={{ margin: '0 0 2px', fontWeight: 600 }}>{d.app.status[status] ?? status}</p>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{d.app.next[status] ?? ''}</p>
        </div>
      </div>

      {/* Top match hero */}
      {topMatch && (
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <h2 className="at-h2" style={{ margin: 0 }}>Best match</h2>
            <a href="/candidate/matches" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
              All matches →
            </a>
          </div>
          <div
            className="at-card"
            style={{
              padding: 'var(--space-5)',
              background: 'var(--at-alpine-green)',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              gap: 'var(--space-4)',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* Ridge motif */}
            <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.08, pointerEvents: 'none' }}>
              <svg viewBox="0 0 800 72" style={{ width: '100%', height: 48, display: 'block' }} preserveAspectRatio="none">
                <path d="M0 72 L60 36 L120 54 L180 18 L240 46 L300 10 L360 42 L420 24 L480 52 L540 16 L600 48 L660 22 L720 50 L800 32 L800 72 Z" fill="white" />
              </svg>
            </div>
            <MatchScore score={topMatch.score ?? 0} variant="ring" />
            <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
              <p style={{ margin: '0 0 2px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                Hotel · {(topMatch as any).roles?.region ?? '—'}
              </p>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: '#fff' }}>
                {(topMatch as any).roles?.title ?? 'Role'}
              </p>
              <p style={{ margin: '0 0 var(--space-3)', fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontSize: '0.9375rem' }}>
                {(topMatch as any).roles?.salary_offer ? `€${(topMatch as any).roles.salary_offer}/mo` : '—'}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a href="/candidate/matches" className="at-btn" style={{ background: '#fff', color: 'var(--at-alpine-green)', fontWeight: 700, fontSize: '0.875rem' }}>
                  Apply now →
                </a>
                <a href="/candidate/matches" className="at-btn" style={{ background: 'transparent', color: '#fff', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.45)', fontSize: '0.875rem' }}>
                  View job
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended matches ranked list */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)', gap: 12 }}>
          <h2 className="at-h2" style={{ margin: 0 }}>Recommended matches</h2>
          {matches.length > 5 && (
            <a href="/candidate/matches" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
              See all →
            </a>
          )}
        </div>
        <style>{`
          .rec-row { transition: background var(--dur-fast, 0.12s) ease; }
          .rec-row:hover { background: var(--bg-elevated) !important; }
        `}</style>
        {matches.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[...matches]
              .sort((a: any, b: any) => (b.score ?? 0) - (a.score ?? 0))
              .slice(0, 5)
              .map((x: any, i: number) => (
                <div
                  key={x.id}
                  className="rec-row at-card"
                  style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.8125rem', color: 'var(--text-subtle)', minWidth: 22, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <MatchScore score={x.score ?? 0} variant="pill" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {x.roles?.title ?? 'Role'}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {x.roles?.region ?? '—'}
                      {x.roles?.salary_offer ? ` · €${x.roles.salary_offer}/mo` : ''}
                    </p>
                  </div>
                  <a href="/candidate/matches" style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}>
                    View →
                  </a>
                </div>
              ))}
          </div>
        ) : (
          <EmptyState
            title="No matches yet"
            body="Complete your profile to get matched to open roles."
            action={<a href="/candidate/profile" className="at-btn at-btn--primary">Complete profile →</a>}
          />
        )}
      </div>
    </DashboardShell>
  );
}
