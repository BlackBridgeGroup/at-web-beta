type RidgeVariant = 'hero' | 'divider' | 'footer' | 'empty';

interface RidgeProps {
  variant?: RidgeVariant;
  opacity?: number;
  className?: string;
}

const paths: Record<RidgeVariant, string> = {
  hero: 'M0 80 L60 40 L120 65 L180 20 L240 50 L300 10 L360 45 L420 25 L480 55 L540 15 L600 50 L660 30 L720 60 L780 20 L840 55 L900 35 L960 65 L1020 25 L1080 50 L1140 15 L1200 45 L1200 120 L0 120 Z',
  divider: 'M0 30 L100 10 L200 25 L300 5 L400 20 L500 8 L600 22 L700 4 L800 18 L900 6 L1000 20 L1100 8 L1200 18 L1200 40 L0 40 Z',
  footer: 'M0 60 L80 30 L160 50 L240 15 L320 40 L400 10 L480 35 L560 20 L640 45 L720 12 L800 38 L880 18 L960 42 L1040 20 L1120 40 L1200 25 L1200 80 L0 80 Z',
  empty: 'M0 50 L150 20 L300 40 L450 10 L600 35 L750 15 L900 38 L1050 8 L1200 30 L1200 60 L0 60 Z',
};

const viewBoxes: Record<RidgeVariant, string> = {
  hero: '0 0 1200 120',
  divider: '0 0 1200 40',
  footer: '0 0 1200 80',
  empty: '0 0 1200 60',
};

export function Ridge({ variant = 'divider', opacity = 0.08, className }: RidgeProps) {
  return (
    <svg
      viewBox={viewBoxes[variant]}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ display: 'block', width: '100%', opacity, color: 'var(--at-alpine-green)' }}
      className={className}
    >
      <path d={paths[variant]} fill="currentColor" />
    </svg>
  );
}
