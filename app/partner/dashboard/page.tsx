import { DashboardShell } from '../../../components/DashboardShell';
import { createClient } from '../../../lib/supabase/server';
import { getAppLocale } from '../../../lib/appLocale';
import { getDictionary } from '../../../lib/i18n';

export default async function PartnerDashboard() {
  const locale = await getAppLocale();
  const d = getDictionary(locale);
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();

  const { data: p } = await s
    .from('partner_profiles')
    .select('*')
    .eq('user_id', user!.id)
    .maybeSingle();

  const { data: h } = await s
    .from('status_history')
    .select('*')
    .eq('subject_id', user!.id)
    .order('ts', { ascending: false });

  const status = p?.status ?? 'NEW_PARTNER';

  return (
    <DashboardShell role="partner" locale={locale} userName={p?.name} signOutLabel={d.app.dash.signOut}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h1 className="at-h1" style={{ margin: '0 0 4px' }}>
          {d.app.dash.partnerTitle} 👋
        </h1>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          {p?.company ?? d.app.dash.profileEmpty} · {d.app.status[status] ?? status}
        </p>
      </div>

      <div className="at-card" style={{ padding: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <p className="at-h3" style={{ margin: '0 0 4px' }}>{d.app.dash.partnerProposal}</p>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>{p?.proposal ?? d.app.dash.proposalEmpty}</p>
      </div>

      <div>
        <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)' }}>{d.app.dash.updates}</h2>
        {h?.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {h.map((x: any) => (
              <div key={x.id} className="at-card" style={{ padding: '12px 16px', display: 'flex', gap: 16 }}>
                <span style={{ color: 'var(--at-alpine-green)', fontWeight: 600, fontSize: '0.875rem' }}>
                  {d.app.status[x.new_status] ?? x.new_status}
                </span>
                <span style={{ color: 'var(--text-subtle)', fontSize: '0.8125rem' }}>{x.ts}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>{d.app.dash.noUpdates}</p>
        )}
      </div>
    </DashboardShell>
  );
}
