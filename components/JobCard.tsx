'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MatchScore } from './MatchScore';
import { getDictionary, type Locale } from '../lib/i18n';

interface JobCardProps {
  slug?: string;
  hotelName: string;
  roleName: string;
  location: string;
  salary: string;
  contractType?: string;
  housingProvided?: boolean;
  matchScore?: number;
  compact?: boolean;
  locale?: Locale;
  showSaveHeart?: boolean;
  defaultSaved?: boolean;
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? 'var(--accent)' : 'none'}
      stroke={filled ? 'var(--accent)' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function HotelLogoPlaceholder() {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-chip)',
        background: 'var(--at-alpine-light)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--at-alpine-green)',
      }}
      aria-hidden="true"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z"/>
        <path d="M6 12H4a2 2 0 0 0-2 2v8h4"/>
        <path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/>
        <path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
      </svg>
    </div>
  );
}

export function JobCard({
  slug,
  hotelName,
  roleName,
  location,
  salary,
  contractType = 'Full-time',
  housingProvided,
  matchScore,
  compact = false,
  locale = 'de',
  showSaveHeart = false,
  defaultSaved = false,
}: JobCardProps) {
  const [saved, setSaved] = useState(defaultSaved);
  const href = slug ? `/${locale}/jobs/${slug}` : `/${locale}/jobs`;
  const d = getDictionary(locale);
  const jc = d.ui.jobCard;

  if (compact) {
    return (
      <Link
        href={href}
        className="at-card at-card--interactive"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          textDecoration: 'none',
          gap: 12,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--text)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {roleName}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {hotelName} · {salary}
          </p>
        </div>
        {matchScore != null && <MatchScore score={matchScore} variant="pill" />}
      </Link>
    );
  }

  return (
    <div
      className="at-card at-card--interactive"
      style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-3)', position: 'relative' }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 12,
          gap: 8,
        }}
      >
        <HotelLogoPlaceholder />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          {matchScore != null && <MatchScore score={matchScore} variant="pill" />}
          {showSaveHeart && (
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                setSaved(v => !v);
              }}
              aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
              aria-pressed={saved}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: saved ? 'var(--accent)' : 'var(--text-subtle)',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 'var(--radius-sm)',
                transition: 'color var(--dur-fast) var(--ease)',
              }}
            >
              <HeartIcon filled={saved} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <p style={{ margin: '0 0 2px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
        {hotelName}
      </p>
      <p className="at-h3" style={{ margin: '0 0 6px', color: 'var(--text)' }}>
        {roleName}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          style={{ color: 'var(--text-subtle)', flexShrink: 0 }}
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{location}</span>
      </div>

      <p
        style={{
          margin: '0 0 12px',
          fontWeight: 600,
          fontSize: '0.9375rem',
          color: 'var(--text)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {salary}
      </p>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'auto' }}>
        <span className="at-chip">{contractType}</span>
        {housingProvided && (
          <span className="at-chip at-chip--selected">{jc.housingIncluded}</span>
        )}
      </div>

      {/* CTA */}
      <Link
        href={href}
        style={{
          display: 'block',
          marginTop: 16,
          textAlign: 'right',
          color: 'var(--primary)',
          fontSize: '0.875rem',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        {jc.viewJob}
      </Link>
    </div>
  );
}
