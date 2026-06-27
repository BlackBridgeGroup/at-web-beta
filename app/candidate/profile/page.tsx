import Link from 'next/link';
import { DashboardShell } from '../../../components/DashboardShell';
import { getAppLocale } from '../../../lib/appLocale';
import { createClient } from '../../../lib/supabase/server';

const T: Record<string, { title: string; account: string; name: string; email: string; edit: string; note: string }> = {
  de: { title: 'Profil', account: 'Konto', name: 'Name', email: 'E-Mail', edit: 'Profil bearbeiten', note: 'Aktualisiere deine Angaben über den Fragebogen.' },
  cz: { title: 'Profil', account: 'Účet', name: 'Jméno', email: 'E-mail', edit: 'Upravit profil', note: 'Své údaje aktualizuješ přes dotazník.' },
  en: { title: 'Profile', account: 'Account', name: 'Name', email: 'Email', edit: 'Edit profile', note: 'Update your details via the questionnaire.' },
};

export default async function ProfilePage() {
  const locale = await getAppLocale();
  const t = T[locale] ?? T.de;
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  const name = (user?.user_metadata?.name as string | undefined) ?? (user?.user_metadata?.full_name as string | undefined) ?? '—';
  const email = user?.email ?? '—';

  return (
    <DashboardShell role="candidate" locale={locale} userName={name !== '—' ? name : undefined}>
      <div style={{ padding: 'clamp(20px, 4vw, 40px)', maxWidth: 640 }}>
        <h1 className="at-h1" style={{ marginTop: 0 }}>{t.title}</h1>

        <div className="at-card" style={{ padding: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600 }}>{t.account}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: 8, color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            <span>{t.name}</span><span style={{ color: 'var(--text)' }}>{name}</span>
            <span>{t.email}</span><span style={{ color: 'var(--text)' }}>{email}</span>
          </div>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <Link href="/candidate/onboarding" className="at-btn at-btn--secondary at-btn--sm">{t.edit}</Link>
          </div>
          <p style={{ margin: 'var(--space-3) 0 0', fontSize: '0.8125rem', color: 'var(--text-subtle)' }}>{t.note}</p>
        </div>
      </div>
    </DashboardShell>
  );
}
