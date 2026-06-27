import type { ReactNode } from 'react';
import { Ridge } from './Ridge';

interface EmptyStateProps {
  title: string;
  body?: string;
  action?: ReactNode;
}

export function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingBlock: 'var(--space-8)',
        gap: 'var(--space-2)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400, opacity: 0.3 }}>
        <Ridge variant="empty" opacity={1} />
      </div>
      <h3 className="at-h2" style={{ margin: 0, maxWidth: 340 }}>
        {title}
      </h3>
      {body && (
        <p
          style={{
            margin: 0,
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            maxWidth: 300,
            lineHeight: 1.6,
          }}
        >
          {body}
        </p>
      )}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}
