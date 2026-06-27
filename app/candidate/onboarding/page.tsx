import { GuidedQuestionnaire } from '../../../components/GuidedQuestionnaire';
import { SiteShell } from '../../../components/SiteShell';
import { getAppLocale } from '../../../lib/appLocale';
import { getDictionary } from '../../../lib/i18n';

export default async function OnboardingPage() {
  const locale = await getAppLocale();
  const d = getDictionary(locale);

  return (
    <SiteShell app locale={locale}>
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBlock: 'var(--space-6)',
          paddingInline: 'var(--space-3)',
        }}
      >
        <div
          className="at-card at-q"
          style={{
            width: '100%',
            padding: 'clamp(24px, 5vw, 40px)',
          }}
        >
          {/* Logo */}
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1rem',
              color: 'var(--at-alpine-green)',
              margin: '0 0 var(--space-4)',
              letterSpacing: '-0.02em',
            }}
          >
            AlpenTalent
          </p>

          <GuidedQuestionnaire
            role="candidate"
            labels={d.app.q}
            profileLabels={d.app.profile}
          />
        </div>
      </div>
    </SiteShell>
  );
}
