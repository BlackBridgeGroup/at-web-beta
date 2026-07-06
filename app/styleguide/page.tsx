/**
 * /styleguide — AlpenTalent Design System Preview
 * Shows every primitive variant + state in light AND dark.
 */
import { Ridge } from '../../components/Ridge';
import { ThemeToggle } from '../../components/ThemeToggle';
import { MatchScore } from '../../components/MatchScore';
import { StatCard } from '../../components/StatCard';
import { Accordion } from '../../components/Accordion';
import { EmptyState } from '../../components/EmptyState';
import { Skeleton } from '../../components/Skeleton';
import { PriceTier } from '../../components/PricingBlock';
import { JobCard } from '../../components/JobCard';

export const metadata = { title: 'Styleguide — AlpenTalent DS' };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 'var(--space-8)' }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--at-alpine-green)',
          margin: '0 0 var(--space-3)',
        }}
      >
        {title}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
        {children}
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', margin: '4px 0 0', textAlign: 'center' }}>
      {children}
    </p>
  );
}

function Swatch({ name, value, border }: { name: string; value: string; border?: boolean }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-chip)',
          background: value,
          border: border ? '1px solid var(--border)' : undefined,
        }}
      />
      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '4px 0 0', fontFamily: 'monospace' }}>{name}</p>
      <p style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', margin: '2px 0 0', fontFamily: 'monospace' }}>{value}</p>
    </div>
  );
}

export default function Styleguide() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Sticky header */}
      <div
        style={{
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--border)',
          padding: '20px var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--at-alpine-green)' }}>
            AlpenTalent
          </span>
          <span style={{ marginLeft: 12, fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 500 }}>
            Design System · LOCKED_V1
          </span>
        </div>
        <ThemeToggle />
      </div>

      <div className="at-container" style={{ paddingBlock: 'var(--space-8)' }}>

        {/* ── COLORS ── */}
        <Section title="Color Palette — Base (LOCKED)">
          <Swatch name="--at-alpine-green" value="#2D6A4F" />
          <Swatch name="--at-alpine-mid" value="#52B788" />
          <Swatch name="--at-alpine-light" value="#D8F3DC" border />
          <Swatch name="--at-sunset" value="#F4A261" />
          <Swatch name="--at-neutral-900" value="#1C1C1A" />
          <Swatch name="--at-neutral-700" value="#3D3D38" />
          <Swatch name="--at-neutral-400" value="#8C8C84" />
          <Swatch name="--at-neutral-100" value="#F2F0EB" border />
        </Section>

        <Section title="Color — Semantic (adapts to theme)">
          {[
            ['--bg', 'var(--bg)'],
            ['--bg-elevated', 'var(--bg-elevated)'],
            ['--bg-sunken', 'var(--bg-sunken)'],
            ['--primary', 'var(--primary)'],
            ['--accent', 'var(--accent)'],
            ['--positive', 'var(--positive)'],
            ['--border', 'var(--border)'],
          ].map(([name, val]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{ width: 56, height: 56, borderRadius: 'var(--radius-chip)', background: val, border: '1px solid var(--border)' }}
              />
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '4px 0 0', fontFamily: 'monospace' }}>{name}</p>
            </div>
          ))}
        </Section>

        {/* ── MATCH SCORE ── */}
        <Section title="MatchScore — Pill + Ring variants (4 bands)">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <MatchScore score={92} variant="pill" />
              <Label>≥90 · High (Alpine Green)</Label>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MatchScore score={85} variant="pill" />
              <Label>80–89 · Mid (Alpine Mid)</Label>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MatchScore score={75} variant="pill" />
              <Label>70–79 · Warn (Sunset + dark text)</Label>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MatchScore score={62} variant="pill" />
              <Label>&lt;70 · Low (Neutral)</Label>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', marginTop: 16, width: '100%' }}>
            {[92, 85, 75, 62].map(s => (
              <div key={s} style={{ textAlign: 'center' }}>
                <MatchScore score={s} variant="ring" />
                <Label>Ring · {s}%</Label>
              </div>
            ))}
          </div>
        </Section>

        {/* ── TYPOGRAPHY ── */}
        <Section title="Typography (Plus Jakarta Sans / Inter)">
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1, margin: 0 }}>
                Find your role in Austria.
              </p>
              <Label>--text-display · Plus Jakarta Sans 800 · 40–56px</Label>
            </div>
            <div>
              <p className="at-h1" style={{ margin: 0 }}>Kitchen Assistant — Sample Alpine Hotel</p>
              <Label>at-h1 · Plus Jakarta Sans 700 · 28px</Label>
            </div>
            <div>
              <p className="at-h2" style={{ margin: 0 }}>Kitzbühel, Tyrol — Seasonal role</p>
              <Label>at-h2 · Plus Jakarta Sans 600 · 22px</Label>
            </div>
            <div>
              <p className="at-h3" style={{ margin: 0 }}>Housing included · Full-time · €2,400/month</p>
              <Label>at-h3 · Plus Jakarta Sans 600 · 18px</Label>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.571, margin: 0 }}>
                We find, screen and place staff from Czech Republic and Slovakia in Austrian hotels and restaurants. Pre-qualified. Transparent. Success-based.
              </p>
              <Label>body · Inter 400 · 14px/1.571</Label>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontVariantNumeric: 'tabular-nums', fontSize: '1.5rem', fontWeight: 700, color: 'var(--at-alpine-green)', margin: 0 }}>
                €2,400 / month · 92 · sample
              </p>
              <Label>tabular-nums · use on all numbers</Label>
            </div>
          </div>
        </Section>

        {/* ── BUTTONS ── */}
        <Section title="Button — Variants">
          {[
            ['at-btn at-btn--primary', 'Primary →', 'Primary · Alpine Green'],
            ['at-btn at-btn--secondary', 'Secondary', 'Secondary · outline'],
            ['at-btn at-btn--accent', 'Accent CTA', 'Accent · Sunset'],
            ['at-btn at-btn--ghost', 'Ghost link', 'Ghost · no bg'],
            ['at-btn at-btn--primary at-btn--sm', 'Small', 'Small variant'],
          ].map(([cls, label, note]) => (
            <div key={cls} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className={cls}>{label}</button>
              <Label>{note}</Label>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="at-btn at-btn--primary" disabled>Disabled</button>
            <Label>Disabled state</Label>
          </div>
        </Section>

        {/* ── CHIPS / BADGES ── */}
        <Section title="Chip / Tag — Variants">
          {[
            ['at-chip', 'Full-time', 'Default'],
            ['at-chip at-chip--selected', '✓ Housing', 'Selected · Alpine Light'],
            ['at-chip at-chip--new', 'NEW', 'New · Sunset'],
          ].map(([cls, label, note]) => (
            <div key={cls}>
              <span className={cls}>{label}</span>
              <Label>{note}</Label>
            </div>
          ))}
        </Section>

        <Section title="Badge — Status Pills">
          {[
            ['at-badge at-badge--green', 'Active', 'Green'],
            ['at-badge at-badge--mid', 'Matched', 'Mid'],
            ['at-badge at-badge--sunset', 'Trial', 'Sunset'],
            ['at-badge at-badge--neutral', 'Pending', 'Neutral'],
          ].map(([cls, label, note]) => (
            <div key={cls}>
              <span className={cls}>{label}</span>
              <Label>{note}</Label>
            </div>
          ))}
        </Section>

        {/* ── STAT CARDS ── */}
        <Section title="StatCard — Dashboard stat tile">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 180px)', gap: 12 }}>
            <StatCard value="12" label="New matches" href="/candidate/matches" linkLabel="View matches" verify />
            <StatCard value="3" label="Applications" href="/candidate/applications" linkLabel="View all" />
            <StatCard value="1" label="Messages" href="/candidate/messages" linkLabel="Read" />
            <StatCard value="5" label="Saved jobs" href="/candidate/saved" linkLabel="See saved" />
          </div>
        </Section>

        {/* ── JOB CARD ── */}
        <Section title="JobCard — Full + Compact + Save heart">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, width: '100%' }}>
            <JobCard
              slug="kitchen-assistant-hotel-edelweiss"
              hotelName="Sample Alpine Hotel"
              roleName="Kitchen Assistant"
              location="Kitzbühel, Austria"
              salary="€2,400 / month"
              contractType="Full-time"
              housingProvided={true}
              matchScore={92}
              showSaveHeart={true}
              locale="en"
            />
            <JobCard
              slug="receptionist-sample-hotel"
              hotelName="Sample Lakeside Hotel"
              roleName="Receptionist"
              location="Zell am See, Austria"
              salary="€2,200 / month"
              contractType="Full-time"
              housingProvided={true}
              matchScore={75}
              showSaveHeart={true}
              locale="en"
            />
            <JobCard
              slug="chef-arlberg"
              hotelName="Sample Mountain Resort"
              roleName="Chef de Partie"
              location="St. Anton, Austria"
              salary="€2,800 / month"
              matchScore={62}
              locale="en"
            />
          </div>
          <div style={{ width: '100%', marginTop: 16 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginBottom: 8 }}>Compact variant:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 400 }}>
              <JobCard hotelName="Sample Alpine Hotel" roleName="Kitchen Assistant" location="Kitzbühel" salary="€2,400 / month" matchScore={92} compact locale="en" />
              <JobCard hotelName="Sample Mountain Resort" roleName="Chef de Partie" location="St. Anton" salary="€2,800 / month" matchScore={75} compact locale="en" />
            </div>
          </div>
        </Section>

        {/* ── ACCORDION ── */}
        <Section title="Accordion — FAQ (white, minimal, a11y)">
          <div style={{ width: '100%', maxWidth: 640 }}>
            <Accordion
              items={[
                ['Is AlpenTalent free for candidates?', 'Yes. Candidates never pay. Hotels cover the placement fee — not you.'],
                ['Do I need to speak German?', 'Not always. Many roles are English-friendly; we match by the level each role actually needs.'],
                ['How long does it take?', 'Our team reviews profiles manually and follows up with the next realistic step.'],
              ]}
            />
          </div>
        </Section>

        {/* ── PRICING ── */}
        <Section title="PriceTier — Pricing block (data-placeholder=verify on prices)">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, width: '100%' }}>
            <PriceTier
              name="Lead-gen"
              price="Auf Anfrage"
              features={['KI-Matching', 'Kandidatenpool', 'Erstansprache automatisiert']}
              cta="Anfragen"
              ctaHref="/de/contact"
            />
            <PriceTier
              name="Retained Search"
              price="Auf Anfrage"
              period="/ Stelle"
              features={['Alles aus Lead-gen', 'Exklusiv', 'Persönlicher Kontakt', 'Interview-Prep']}
              cta="Demo buchen"
              ctaHref="/de/contact"
              featured={true}
            />
            <PriceTier
              name="Embedded / RPO"
              price="Auf Anfrage"
              period="/ Monat"
              features={['Laufendes Management', 'Branding-Support', 'Monatliches Reporting']}
              cta="Mehr erfahren"
              ctaHref="/de/contact"
            />
          </div>
        </Section>

        {/* ── EMPTY STATE ── */}
        <Section title="EmptyState — Ridge + message + action">
          <div style={{ width: '100%', background: 'var(--bg-sunken)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}>
            <EmptyState
              title="No roles match yet"
              body="Try adjusting your filters, or clear them to see all open roles."
              action={<button className="at-btn at-btn--secondary at-btn--sm">Clear filters</button>}
            />
          </div>
        </Section>

        {/* ── SKELETON ── */}
        <Section title="Skeleton — Loading placeholders">
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            <div>
              <Skeleton variant="card" />
              <Label>Card skeleton</Label>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="row" />
                <Skeleton variant="row" />
                <Skeleton variant="row" />
              </div>
              <Label>Row skeleton</Label>
            </div>
            <div>
              <Skeleton variant="text" lines={4} />
              <Label>Text skeleton · 4 lines</Label>
            </div>
          </div>
        </Section>

        {/* ── RIDGE ── */}
        <Section title="Ridge SVG — Mountain motif (currentColor)">
          <div style={{ width: '100%' }}>
            {(['hero', 'divider', 'footer', 'empty'] as const).map(variant => (
              <div key={variant} style={{ marginBottom: 16 }}>
                <div style={{ background: 'var(--at-alpine-green)', borderRadius: 'var(--radius-chip)', padding: '0 0 8px', overflow: 'hidden' }}>
                  <Ridge variant={variant} opacity={1} />
                </div>
                <Label>Ridge/{variant}</Label>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CARDS ── */}
        <Section title="Card — Static + interactive hover">
          <div className="at-card" style={{ padding: 'var(--space-3)', maxWidth: 280 }}>
            <p className="at-h3" style={{ margin: '0 0 8px' }}>Static card</p>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>bg-elevated · border · shadow-card</p>
          </div>
          <div className="at-card at-card--interactive" style={{ padding: 'var(--space-3)', maxWidth: 280, cursor: 'pointer' }}>
            <p className="at-h3" style={{ margin: '0 0 8px' }}>Interactive card</p>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Hover: Alpine Green border · translateY(−2px) · shadow-lift</p>
          </div>
        </Section>

        {/* ── SHADOWS ── */}
        <Section title="Elevation / Shadow">
          {(['var(--shadow-sm)', 'var(--shadow-card)', 'var(--shadow-lift)', 'var(--shadow-pop)'] as const).map(val => (
            <div key={val} style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-card)', background: 'var(--bg-elevated)', boxShadow: val }} />
              <Label>{val.replace('var(--', '').replace(')', '')}</Label>
            </div>
          ))}
        </Section>

        {/* ── DARK MODE ── */}
        <Section title="Theme Parity (toggle Light/Dark/Auto above ↑)">
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <div className="at-card" style={{ padding: 'var(--space-3)' }}>
              <p className="at-h3" style={{ margin: '0 0 4px' }}>Current theme</p>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                bg: <code style={{ fontSize: '0.75rem', background: 'var(--bg-sunken)', padding: '1px 5px', borderRadius: 4 }}>var(--bg)</code>
              </p>
            </div>
            <div style={{ background: '#141A15', padding: 'var(--space-3)', borderRadius: 'var(--radius-card)', border: '1px solid #2C382E' }}>
              <p style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', color: '#F2F0EB' }}>Dark preview</p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#B9C2BB' }}>bg: #141A15 · primary: #52B788 (Alpine Mid)</p>
            </div>
          </div>
        </Section>

        {/* ── A11Y ── */}
        <Section title="Accessibility Guardrails">
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.875rem' }}>
            {[
              ['✅ PASS', '#2D6A4F on #F2F0EB', '8.9:1', 'Alpine Green on Warm BG'],
              ['✅ PASS', '#FFFFFF on #2D6A4F', '8.9:1', 'White text on Alpine Green'],
              ['✅ PASS', '#1C1C1A on #F2F0EB', '16.7:1', 'Body text'],
              ['⚠️ LARGE ONLY', '#8C8C84 on #F2F0EB', '3.6:1', 'Neutral-400 — only placeholders/tertiary'],
              ['⛔ NEVER body', '#F4A261 on #F2F0EB', '2.4:1', 'Sunset — use dark text on Sunset bg (70–79 match)'],
            ].map(([status, pair, ratio, note]) => (
              <div key={pair} style={{ display: 'flex', gap: 12, padding: '8px 12px', borderRadius: 'var(--radius-chip)', background: 'var(--bg-sunken)', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, flexShrink: 0 }}>{status}</span>
                <code style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{pair}</code>
                <span style={{ fontWeight: 700, color: 'var(--at-alpine-green)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{ratio}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{note}</span>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}
