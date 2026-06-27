'use client';
import { createClient } from '../lib/supabase/browser';

export function SignOut({ label = 'Sign out' }: { label?: string }) {
  return (
    <button
      className="at-btn at-btn--ghost at-btn--sm"
      style={{ width: '100%', justifyContent: 'center', color: 'var(--text-muted)' }}
      onClick={async () => {
        await createClient().auth.signOut();
        location.href = '/login';
      }}
    >
      {label}
    </button>
  );
}
