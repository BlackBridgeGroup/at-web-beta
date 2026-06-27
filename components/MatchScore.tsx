export function matchBandColor(score: number): string {
  if (score >= 90) return 'var(--match-high)';
  if (score >= 80) return 'var(--match-mid)';
  if (score >= 70) return 'var(--match-warn)';
  return 'var(--match-low)';
}

// 70–79 (Sunset) fails contrast on light bg — must use dark text
export function matchBandTextColor(score: number): string {
  if (score >= 70 && score < 80) return 'var(--at-neutral-900)';
  if (score < 70) return 'var(--at-neutral-400)';
  return 'inherit';
}

interface MatchScoreProps {
  score: number;
  variant?: 'pill' | 'ring';
}

export function MatchScore({ score, variant = 'pill' }: MatchScoreProps) {
  const color = matchBandColor(score);
  const textColor = matchBandTextColor(score);

  if (variant === 'ring') {
    const R = 20;
    const circ = 2 * Math.PI * R;
    const dash = (score / 100) * circ;
    return (
      <div
        aria-label={`${score}% match score`}
        role="img"
        style={{ position: 'relative', width: 60, height: 60, flexShrink: 0 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
          <circle cx="30" cy="30" r={R} fill="none" stroke="var(--border)" strokeWidth="4" />
          <circle
            cx="30"
            cy="30"
            r={R}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            transform="rotate(-90 30 30)"
          />
        </svg>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: textColor === 'inherit' ? color : textColor,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {score}%
        </span>
      </div>
    );
  }

  // Pill variant
  return (
    <div
      aria-label={`${score}% match`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 10px',
        borderRadius: 'var(--radius-pill)',
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
        fontSize: '0.75rem',
        fontWeight: 700,
        color: textColor === 'inherit' ? color : textColor,
        fontVariantNumeric: 'tabular-nums',
        flexShrink: 0,
      }}
    >
      <span aria-hidden="true" style={{ color }}>●</span>
      {score}% Match
    </div>
  );
}
