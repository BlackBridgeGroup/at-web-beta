'use client';import React from'react';import Link from'next/link';import{usePathname}from'next/navigation';import{useMemo,useState}from'react';
type Locale='de'|'cz'|'en';type Flow='menu'|'employer'|'candidate'|'partner'|'general'|'escalate';type Msg={from:'bot'|'user',text:string};
const labels={de:{open:'Fragen?',title:'AlpenTalent Empfang',menu:'Wie kann ich helfen?',emp:'🍽️ Ich suche Mitarbeiter',cand:'👨‍🍳 Ich suche Arbeit in Österreich',part:'🤝 Partnerschaft oder Kooperation',gen:'❓ Allgemeine Frage',next:'Weiter',send:'Senden',ask:'Frage stellen',register:'Mit Google registrieren',questionnaire:'Zum Fragebogen',human:'Menschliche Hilfe',thanksEmp:'Thank you. AlpenTalent will review your request and contact you shortly.',thanksCand:'Thank you. Your profile has been recorded and will be reviewed by AlpenTalent.',thanksPart:'Danke. AlpenTalent prüft deine Kooperationsanfrage und meldet sich persönlich.',fallback:'Certainly. Please leave your contact details and AlpenTalent will contact you personally.'},cz:{open:'Otázky?',title:'AlpenTalent recepce',menu:'Jak můžu pomoci?',emp:'🍽️ Hledám zaměstnance',cand:'👨‍🍳 Hledám práci v Rakousku',part:'🤝 Partnerství nebo spolupráce',gen:'❓ Obecná otázka',next:'Další',send:'Odeslat',ask:'Zeptat se',register:'Registrovat přes Google',questionnaire:'Na dotazník',human:'Kontakt s člověkem',thanksEmp:'Thank you. AlpenTalent will review your request and contact you shortly.',thanksCand:'Thank you. Your profile has been recorded and will be reviewed by AlpenTalent.',thanksPart:'Děkujeme. AlpenTalent návrh zkontroluje a ozve se osobně.',fallback:'Certainly. Please leave your contact details and AlpenTalent will contact you personally.'},en:{open:'Questions?',title:'AlpenTalent reception',menu:'How can I help?',emp:'🍽️ I am looking for employees',cand:'👨‍🍳 I am looking for a job in Austria',part:'🤝 Partnership or cooperation',gen:'❓ General question',next:'Next',send:'Send',ask:'Ask',register:'Sign in with Google',questionnaire:'Open questionnaire',human:'Human help',thanksEmp:'Thank you. AlpenTalent will review your request and contact you shortly.',thanksCand:'Thank you. Your profile has been recorded and will be reviewed by AlpenTalent.',thanksPart:'Thank you. AlpenTalent will review your cooperation request and contact you shortly.',fallback:'Certainly. Please leave your contact details and AlpenTalent will contact you personally.'}};
const fields={employer:['Company name','City','Type of business','Positions needed','Number of employees','Preferred start date','Phone number','Email address'],candidate:['Full name','Nationality','Current country','German level','English level','Experience','Desired position','Preferred region in Austria','Availability','Phone number','Email address'],partner:['Name','Company','Website','Cooperation proposal','Email','Phone'],escalate:['Contact details']} as const;
function key(s:string){return s.toLowerCase().replace(/[^a-z]+/g,'_').replace(/^_|_$/g,'')}
export function ReceptionistWidget({app=false,locale:forcedLocale}:{app?:boolean;locale?:Locale}){const path=usePathname();const locale=(forcedLocale||(path.startsWith('/cz')||path.startsWith('/cs')?'cz':path.startsWith('/en')?'en':'de')) as Locale;const t=labels[locale];const[open,setOpen]=useState(false);const[flow,setFlow]=useState<Flow>('menu');const[step,setStep]=useState(0);const[value,setValue]=useState('');const[data,setData]=useState<Record<string,string>>({});const[msgs,setMsgs]=useState<Msg[]>([{from:'bot',text:t.menu}]);const loginRole=flow==='employer'?'employer':flow==='partner'?'partner':'candidate';const questionnaire=`/${locale}/fragebogen?role=candidate`;const qLogin=`/login?role=${loginRole}`;const activeFields=flow==='employer'||flow==='candidate'||flow==='partner'||flow==='escalate'?fields[flow]:[];const current=activeFields[step];const actions=useMemo(()=>app?null:<div style={{display:'flex',flexDirection:'column',gap:8,marginTop:4}}><Link className="at-btn at-btn--primary" style={{justifyContent:'center'}} href={questionnaire}>{t.questionnaire}</Link><Link className="at-btn at-btn--secondary" style={{justifyContent:'center'}} href={qLogin}>{t.register}</Link></div>,[app,questionnaire,qLogin,t]);function choose(next:Flow){setFlow(next);setStep(0);setData({});const first=next==='general'?(app?'Ask about AlpenTalent or your own dashboard status.':'Ask about AlpenTalent services, recruiting, hospitality jobs in Austria, or the process.'):next==='menu'?t.menu:fields[next as keyof typeof fields]?.[0]||t.menu;setMsgs(m=>[...m,{from:'user',text:next},{from:'bot',text:first}])}async function complete(payload:Record<string,string>){if(flow==='candidate'){setMsgs(m=>[...m,{from:'bot',text:t.thanksCand},{from:'bot',text:locale==='cz'?'Prosím pokračujte přes dotazník a Google registraci, aby byl souhlas GDPR jasně uložen.':locale==='en'?'Please continue through the questionnaire and Google sign-in so GDPR consent is captured clearly.':'Bitte weiter über Fragebogen und Google-Registrierung, damit die DSGVO-Einwilligung sauber erfasst wird.'}]);return}if(flow==='employer'||flow==='partner'||flow==='escalate')await fetch('/api/receptionist-lead',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({kind:flow==='employer'?'employer':flow==='partner'?'partner':'general',locale,payload})});setMsgs(m=>[...m,{from:'bot',text:flow==='partner'?t.thanksPart:flow==='employer'?t.thanksEmp:t.fallback}])}async function submit(){const trimmed=value.trim();if(!trimmed)return;if(flow==='general'){setMsgs(m=>[...m,{from:'user',text:trimmed},{from:'bot',text:'…'}]);setValue('');const res=await fetch('/api/assistant',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:trimmed,locale,context:app?'app':'public'})});const json=await res.json();setMsgs(m=>[...m.slice(0,-1),{from:'bot',text:json.answer||t.fallback}]);return}if(!current)return;const nextData={...data,[key(current)]:trimmed};setMsgs(m=>[...m,{from:'user',text:trimmed}]);setValue('');if(step+1<activeFields.length){setData(nextData);setStep(step+1);setMsgs(m=>[...m,{from:'bot',text:activeFields[step+1]}])}else await complete(nextData)}  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    right: 18,
    bottom: 90,
    width: 'min(380px, calc(100vw - 36px))',
    maxHeight: '74vh',
    overflowY: 'auto',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-card)',
    boxShadow: 'var(--shadow-pop)',
    zIndex: 'var(--z-widget)' as any,
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 'var(--z-widget)' as any }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="at-btn at-btn--primary"
        style={{
          borderRadius: 'var(--radius-pill)',
          padding: '14px 20px',
          boxShadow: 'var(--shadow-lift)',
          fontSize: '0.875rem',
          fontWeight: 700,
        }}
      >
        {t.open}
      </button>

      {open && (
        <section style={panelStyle} aria-label={t.title}>
          {/* Header */}
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 16px',
              borderBottom: '1px solid var(--border)',
              flexShrink: 0,
            }}
          >
            <strong style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{t.title}</strong>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1, padding: 4 }}
            >
              ×
            </button>
          </header>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {msgs.map((m, i) => (
              <p
                key={i}
                style={{
                  margin: 0,
                  padding: '10px 13px',
                  borderRadius: 'var(--radius-input)',
                  lineHeight: 1.5,
                  fontSize: '0.875rem',
                  background: m.from === 'bot' ? 'var(--bg-sunken)' : 'var(--at-alpine-light)',
                  color: m.from === 'bot' ? 'var(--text)' : 'var(--at-alpine-green)',
                  alignSelf: m.from === 'bot' ? 'flex-start' : 'flex-end',
                  maxWidth: '85%',
                }}
              >
                {m.text}
              </p>
            ))}
          </div>

          {/* Controls */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {flow === 'menu' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  ['employer', t.emp],
                  ['candidate', t.cand],
                  ['partner', t.part],
                  ['general', t.gen],
                  ['escalate', t.human],
                ].map(([f, label]) => (
                  <button
                    key={f}
                    onClick={() => choose(f as Flow)}
                    style={{
                      padding: '10px 14px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-input)',
                      background: 'var(--bg-elevated)',
                      color: 'var(--text)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-body)',
                      transition: 'background var(--dur-fast) var(--ease)',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input
                  className="at-input"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') submit(); }}
                  placeholder={current || t.ask}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="at-btn at-btn--primary" onClick={submit} style={{ flex: 1, justifyContent: 'center' }}>
                    {flow === 'general' ? t.ask : t.next}
                  </button>
                  <button className="at-btn at-btn--ghost" onClick={() => choose('menu')}>Menu</button>
                </div>
              </div>
            )}
            {actions}
          </div>
        </section>
      )}
    </div>
  );
}
