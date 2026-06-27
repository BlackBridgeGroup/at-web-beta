'use client';
import { useState } from 'react';

interface AccordionProps {
  items: [string, string][] | { question: string; answer: string }[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const normalized = items.map(item =>
    Array.isArray(item)
      ? { question: item[0], answer: item[1] }
      : item
  );

  return (
    <div className={className} style={{ borderTop: '1px solid var(--border)' }}>
      {normalized.map((item, i) => (
        <AccordionItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          padding: 'var(--space-2) 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '0.9375rem',
          color: 'var(--text)',
        }}
      >
        <span>{question}</span>
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            color: 'var(--text-subtle)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            borderRadius: 'var(--radius-pill)',
            border: '1.5px solid var(--border-strong)',
            transition: 'transform var(--dur-fast) var(--ease)',
            transform: open ? 'rotate(45deg)' : 'none',
            fontSize: '1.1rem',
            lineHeight: 1,
            fontWeight: 300,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p
          style={{
            margin: '0 0 var(--space-2)',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            fontSize: '0.875rem',
          }}
        >
          {answer}
        </p>
      )}
    </div>
  );
}
