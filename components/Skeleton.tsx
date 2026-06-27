interface SkeletonBlockProps {
  width?: number | string;
  height: number;
  radius?: string;
  style?: React.CSSProperties;
}

function SkeletonBlock({ width, height, radius, style }: SkeletonBlockProps) {
  return (
    <div
      style={{
        width: width ?? '100%',
        height,
        borderRadius: radius ?? 'var(--radius-sm)',
        background: 'var(--border)',
        ...style,
      }}
    />
  );
}

interface SkeletonProps {
  variant?: 'text' | 'card' | 'row';
  lines?: number;
}

export function Skeleton({ variant = 'text', lines = 3 }: SkeletonProps) {
  const pulse: React.CSSProperties = { animation: 'at-skeleton-pulse 1.5s ease-in-out infinite' };

  if (variant === 'card') {
    return (
      <div className="at-card" style={{ padding: 'var(--space-3)', ...pulse }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
          <SkeletonBlock width={40} height={40} radius="var(--radius-chip)" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <SkeletonBlock width="60%" height={14} />
            <SkeletonBlock width="40%" height={12} />
          </div>
        </div>
        <SkeletonBlock width="80%" height={18} style={{ marginBottom: 8 }} />
        <SkeletonBlock width="50%" height={14} style={{ marginBottom: 8 }} />
        <SkeletonBlock height={14} style={{ marginBottom: 16 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <SkeletonBlock width={70} height={26} radius="var(--radius-chip)" />
          <SkeletonBlock width={100} height={26} radius="var(--radius-chip)" />
        </div>
      </div>
    );
  }

  if (variant === 'row') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 0',
          borderBottom: '1px solid var(--border)',
          ...pulse,
        }}
      >
        <SkeletonBlock width={40} height={40} radius="var(--radius-chip)" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <SkeletonBlock width="55%" height={14} />
          <SkeletonBlock width="35%" height={12} />
        </div>
        <SkeletonBlock width={50} height={24} radius="var(--radius-pill)" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...pulse }}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock key={i} width={i === lines - 1 ? '60%' : '100%'} height={14} />
      ))}
    </div>
  );
}
