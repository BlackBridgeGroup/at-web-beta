import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { cookies, headers } from 'next/headers';
import { GoogleLogin } from '../../components/GoogleLogin';
import { Ridge } from '../../components/Ridge';
import { createClient } from '../../lib/supabase/server';
import { getDictionary, normalizeLocale } from '../../lib/i18n';

export default async function Login() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (user) {
    const { data: u } = await s.from('users').select('role').eq('id', user.id).maybeSingle();
    if (u?.role) redirect(`/${u.role}/dashboard`);
  }

  const ck = await cookies();
  const hd = await headers();
  const localeRaw = ck.get('alpentalent_locale')?.value || hd.get('accept-language') || 'de';
  const locale = normalizeLocale(localeRaw);
  const d = getDictionary(locale);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-3)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ridge background motif */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          pointerEvents: 'none',
        }}
      >
        <Ridge variant="footer" opacity={0.06} />
      </div>

      {/* Card */}
      <div
        className="at-card"
        style={{
          width: '100%',
          maxWidth: 420,
          padding: 'clamp(28px, 5vw, 48px)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.25rem',
            color: 'var(--at-alpine-green)',
            margin: '0 0 var(--space-4)',
            letterSpacing: '-0.02em',
          }}
        >
          AlpenTalent
        </p>

        <h1
          className="at-h2"
          style={{ margin: '0 0 8px' }}
        >
          {d.auth.title}
        </h1>
        <p style={{ margin: '0 0 var(--space-4)', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          {d.auth.intro}
        </p>

        <Suspense fallback={<div style={{ padding: 24, color: 'var(--text-muted)' }}>…</div>}>
          <GoogleLogin t={d.auth} />
        </Suspense>

        <p
          style={{
            marginTop: 'var(--space-3)',
            fontSize: '0.75rem',
            color: 'var(--text-subtle)',
            lineHeight: 1.6,
          }}
        >
          {d.auth.scopes}
        </p>
      </div>
    </div>
  );
}
