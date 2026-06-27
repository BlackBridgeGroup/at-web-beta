import{questionnaireText}from'./questionnaires';
export const locales=['de','cz','en'] as const;
export type Locale=typeof locales[number];
export function normalizeLocale(input?:string|null):Locale{const v=(input||'').toLowerCase();if(['cs','cz','sk'].includes(v)||v.startsWith('cs')||v.startsWith('sk'))return'cz';if(v==='en'||v.startsWith('en-'))return'en';return'de'}
export function localePath(locale:Locale,path=''){return `/${locale}${path}`}
type Dict=Record<string,any>;
const de={
  meta:{title:'Hotelpersonal & Gastro-Personal finden mit KI | AlpenTalent',description:'AlpenTalent hilft österreichischen Hotels und Restaurants, Mitarbeitende schneller zu finden und einzuarbeiten — KI-gestütztes Matching, vorqualifizierte Kandidaten und faire Konditionen.'},
  nav:{brand:'Alpen Talent',de:'DE',cz:'CZ',en:'EN',cta:'Personal anfragen',login:'Login',whatsapp:'WhatsApp'},
  root:{eyebrow:'AlpenTalent · Österreich',title:'Wähle deine Sprache.',subtitle:'Choose your language. Vyberte si jazyk.',de:'Deutsch · Betriebe',cz:'Čeština · Kandidáti',en:'English'},
  hero:{eyebrow:'KI-gestütztes Recruiting · Österreich',title:'Personal schneller finden — mit KI.',subtitle:'Vorqualifizierte Fachkräfte aus CZ/SK in 5–10 Werktagen. Sie zahlen erst, wenn jemand antritt. Kein Risiko.',primary:'Demo buchen',secondary:'Wie es funktioniert'},
  stats:[['Fix','Preis pro Antritt'],['5–10','Werktage Lieferzeit'],['Null','Vorauszahlung'],['KI','gestütztes Matching']],
  trust:[['Kein Risiko','Fixgebühr bei Antritt — nur bei erfolgreichem Antritt. Keine versteckten Kosten.'],['In 10 Werktagen','Von der Anfrage bis zur Kandidatenpräsentation. Schneller bei Dringlichkeit.'],['Geprüfte Qualität','Jeder Kandidat manuell geprüft. Keine Massen-CVs — nur echte Matches.']],
  services:{eyebrow:'Was wir anbieten',title:'KI-gestützte Personalgewinnung',intro:'Jede Funktion ist speziell für kleine und mittlere Hotels und Restaurants in Österreich entworfen.',items:[['01','Recruiting','Vorqualifizierte Kandidaten aus CZ/SK','Wir finden, prüfen und vermitteln Mitarbeiter aus Tschechien und der Slowakei an österreichische Hotels und Restaurants. Vorqualifiziert. Transparent. Erfolgsbasiert.','Fixgebühr','erfolgsbasiert · keine Vorauszahlung · kein Risiko','Recruiting entdecken'],['02','Hiring Campaigns','Meta-Funnel · Landing Page · WhatsApp','Wir bauen Meta-Kampagnen, Landing Pages und WhatsApp-Automation auf. Ihre Kandidaten kommen direkt zu Ihnen. Sie steuern, wir unterstützen.','Transparent','Setup-Gebühr + monatliches Management · Ads Budget separat','Kampagnen entdecken']]},
  process:{eyebrow:'So arbeiten wir',title:'Von der Anfrage bis zum ersten Tag.',steps:[['01','Entdeckung','Wir verstehen Ihre Herausforderungen. Welche Positionen, welcher Zeitrahmen, welche Anforderungen?'],['02','Setup','Services werden konfiguriert. Kampagnen starten. Terminals werden bestellt und eingerichtet.'],['03','Ausführung','Sie erhalten Kandidaten. Kampagnen laufen. Zahlungen werden reibungslos verarbeitet.'],['04','Skalierung','Funktioniert ein Service? Entdecken wir gemeinsam den nächsten Schritt für Ihren Betrieb.']]},
  contact:{eyebrow:'Nächster Schritt',title:'Lass uns sprechen.',text:'30 Minuten. Keine Verpflichtung. Wir verstehen Ihr Problem — Sie verstehen unsere Lösung.',formTitle:'Direkte Anfrage',name:'Name',company:'Hotel / Restaurant',email:'E-Mail',phone:'Telefon',interest:'Ich interessiere mich für',message:'Nachricht',submit:'Anfrage senden',success:'Danke! Wir melden uns innerhalb von 24 Stunden.'},
  team:{eyebrow:'Werde Teil des Teams',title:'Mit AlpenTalent arbeiten.',text:'Wir wachsen und suchen motivierte Broker und Recruiter, die uns dabei helfen, tschechisches & slowakisches Talent mit österreichischen Hotelbetrieben zu verbinden.',roles:[['Recruiter / Broker','Kandidaten in CZ/SK finden, in österreichischen Hotels und Restaurants platzieren. Provision pro erfolgreicher Vermittlung. Remote, flexibel, eigenverantwortlich.'],['Partner / Empfehlung','Bereits im Hotellerie-Netzwerk? Kunden empfehlen und Provision auf jeden abgeschlossenen Deal erhalten.']],applyTitle:'In 3 Minuten bewerben',applyText:'Füll unseren kurzen Fragebogen aus. Wir prüfen jede Bewerbung persönlich und melden uns innerhalb von 48 Stunden.',applyCta:'Zum Bewerbungsformular'},
  candidate:{heroEyebrow:'Práce v Rakousku · hotely a gastronomie',title:'Práce v Rakousku pro Čechy a Slováky. Bez poplatků.',subtitle:'Pomáháme lidem z Česka a Slovenska najít práci v rakouských hotelech a restauracích. Konkrétní nabídky, ověření zaměstnavatelé, ubytování a strava často součástí podmínek.',cta:'Vyplnit dotazník',how:'Jak to funguje',processTitle:'Jak získat práci v Rakousku',processIntro:'Bez životopisu, bez dlouhého dopisování a bez placení agentuře. Začínáme krátkým dotazníkem.',positionsTitle:'Nejčastější práce v rakouských hotelech',conditionsTitle:'Co od práce v Rakousku čekat',startTitle:'Chcete práci v Rakousku?',startText:'Vyplňte krátký dotazník. Podíváme se na váš profil a ozveme se s dalším krokem. Bez závazku a bez poplatku.'},
  questionnaire:{title:'Kurzer Fragebogen',name:'Name',role:'Gewünschte Position',languages:'Sprachen',region:'Region',availability:'Availability',contact:'Preferred contact',consent:'Ich stimme der Datenverarbeitung für die Vermittlung zu.',continue:'Weiter'},
  auth:{title:'Login',intro:'Wähle Bewerber, Arbeitgeber oder Partner und melde dich mit Google an.',candidate:'Bewerber',employer:'Arbeitgeber',partner:'Partner',google:'Mit Google anmelden',signIn:'Mit Google anmelden',signUp:'Konto erstellen',newHere:'Neu hier? Konto erstellen',chooseRole:'Ich bin:',continue:'Weiter mit Google',back:'Zurück',scopes:'Google-Berechtigungen: openid, email, profile. Die gewählte Rolle wird nur bei der ersten Anmeldung gespeichert.'},
  homepage:{
    hero:{
      eyebrow:'KI-gestütztes Recruiting · Österreich',
      h1:'Personal schneller finden — mit KI.',
      sub:'Vorqualifizierte Fachkräfte aus CZ/SK. In 5–10 Werktagen. Zahlen nur bei Antritt.',
      primary:'Demo buchen',
      primaryHref:'/de/contact',
      secondary:'Wie es funktioniert',
      secondaryHref:'/de/how-it-works',
    },
    why:{
      eyebrow:'Warum AlpenTalent',
      heading:'Gebaut für Hotels — nicht für HR-Software.',
      tiles:[
        {title:'KI-Matching',body:'Wir gleichen Profile automatisch ab — und filtern manuell nach. Keine Masse, nur echte Kandidaten.'},
        {title:'Geprüfte Kandidaten',body:'Jeder Kandidat wird persönlich überprüft. Keine Massen-CVs. Keine Überraschungen.'},
        {title:'5–10 Werktage',body:'Von der Anfrage bis zur Kandidatenpräsentation. Schneller, wenn es dringend ist.'},
        {title:'Kein Risiko',body:'Fixgebühr nur bei erfolgreichem Antritt. Keine Vorauszahlung — kein Risiko.',accent:true},
      ],
    },
    howHiring:{
      eyebrow:'So läuft es ab',
      heading:'Von der Anfrage bis zum ersten Arbeitstag.',
    },
    faq:{
      heading:'Häufige Fragen',
      seeAll:'Alle FAQs →',
      items:[
        ['Was kostet AlpenTalent?','Eine Fixgebühr pro erfolgreicher Vermittlung. Keine Vorauszahlung, kein Risiko — Sie zahlen erst, wenn der Kandidat antritt.'],
        ['Wie schnell liefert ihr?','In der Regel 5–10 Werktage von der Anfrage bis zur ersten Kandidatenpräsentation.'],
        ['Welche Positionen vermittelt ihr?','Alle Positionen in Hotels und Restaurants — Küche, Service, Rezeption, Housekeeping und mehr.'],
        ['Was wenn jemand nicht antritt?','Tritt der Kandidat nicht an, zahlen Sie auch keine Gebühr. Kein Risiko.'],
      ],
    },
    explore:{
      eyebrow:'Entdecken',
      heading:'Alles für Ihren Betrieb.',
      tiles:[
        {title:'Gehaltsguide',body:'Marktkonforme Gehälter für alle Positionen in der österreichischen Hotellerie.',href:'/de/salary-guide',icon:'💶'},
        {title:'Regionen Österreichs',body:'Tirol, Salzburg, Vorarlberg und mehr — finden Sie Betriebe in Ihrer Region.',href:'/de/regions',icon:'🏔️'},
        {title:'Recruiting-Guide',body:'Tipps zur Einstellung von CZ/SK-Fachkräften in Österreich.',href:'/de/resources',icon:'📖'},
        {title:'Erfolgsgeschichten',body:'Hotels, die mit AlpenTalent erfolgreich Fachkräfte gefunden haben.',href:'/de/success-stories',icon:'⭐'},
      ],
    },
    candidateBand:{
      heading:'Selbst auf Jobsuche?',
      sub:'AlpenTalent vermittelt auch an Kandidaten aus CZ/SK, die in Österreich arbeiten wollen.',
      cta:'Zur Kandidatenversion →',
      href:'/cz',
    },
  },
  footer:{tagline:'Hospitality Operating System für österreichische Hotels und Restaurants. Wien, Österreich.',services:'Services',languages:'Sprachen',contact:'Kontakt',career:'Karriere',impressum:'Impressum',privacy:'Datenschutz',copy:'© 2025 AlpenTalent · Hospitality Operating System'},
  ui:{
    nav:{jobs:'Stellenangebote',forEmployers:'Für Arbeitgeber',howItWorks:"So funktioniert's",resources:'Ratgeber',about:'Über uns',login:'Anmelden',findOpportunities:'Demo buchen'},
    theme:{light:'Hell',dark:'Dunkel',auto:'Auto'},
    trust:{partnerHotels:'Partnerhotels',hospitality:'Fachkräfte',coverage:'Österreichweit',satisfaction:'Bewertung',googleCta:'Mit Google anmelden'},
    howItWorks:{eyebrow:"So funktioniert's",heading:'In fünf Schritten zur Stelle in Österreich',steps:[{title:'Profil erstellen',body:'Wenige Fragen, fünf Minuten. Kein Lebenslauf-Chaos.'},{title:'Passende Stellen',body:'Wir zeigen Rollen passend zu Ihren Fähigkeiten, Sprache und Situation.'},{title:'Vorstellung',body:'Hotel kennenlernen. Wir helfen bei der Vorbereitung.'},{title:'Schnuppertag',body:'Team und Betrieb erleben, bevor Sie zusagen.'},{title:'Umzug nach Österreich',body:'Unterkunft und Papierkram — wir begleiten Sie den ganzen Weg.'}]},
    jobs:{searchPlaceholder:'Stellen, Hotels, Orte suchen…',searchBtn:'Suchen',filterLabel:'Filter:',allRegions:'Alle Regionen',sortBestMatch:'Beste Übereinstimmung',sortNewest:'Neueste',sortSalary:'Gehalt',noRolesTitle:'Keine Stellen gefunden',noRolesBody:'Passen Sie die Filter an oder schauen Sie bald wieder vorbei.'},
    jobCard:{housingIncluded:'Unterkunft inkl.',viewJob:'Stelle ansehen →'},
    persona:{reception:'Rezeption',chef:'Küche',housekeeping:'Housekeeping',waiter:'Service',manager:'Leitung'},
    resources:{eyebrow:'ALPENLIFE',heading:'Alles, was du für den Start in Österreich brauchst',sub:'Praktische Guides zu Umzug, Sprache, Verträgen und Wohnen.'},
    footer:{tagline:'Hospitality-Talent-Marktplatz für Österreich.',whatsappLabel:'Fragen? WhatsApp uns',colCandidates:'Kandidaten',colEmployers:'Arbeitgeber',colCompany:'Unternehmen',colLegal:'Rechtliches',linkFindJobs:'Stellen finden',linkHowItWorks:"So funktioniert's",linkSalaryGuide:'Gehaltsguide',linkRegions:'Regionen',linkResources:'Ratgeber',linkForEmployers:'Für Arbeitgeber',linkPostVacancy:'Stelle inserieren',linkSuccessStories:'Erfolgsgeschichten',linkAbout:'Über uns',linkContact:'Kontakt',linkFaq:'FAQ',linkPrivacy:'Datenschutz',linkImprint:'Impressum',copyright:'© 2025 AlpenTalent · Hospitality Operating System',satisfaction:'Bewertung'}
  }
} as const;
const en:Dict={...de,
  meta:{title:'Hospitality Jobs in Austria | Careers in Austrian Hotels | AlpenTalent',description:'Find verified hospitality jobs in Austria. Kitchen, reception, housekeeping — with housing support and visa guidance. Free for candidates.'},
  nav:{...de.nav,cta:'Get Staff'},
  root:{eyebrow:'AlpenTalent · Austria',title:'Choose your language.',subtitle:'Wähle deine Sprache. Vyberte si jazyk.',de:'Deutsch · Employers',cz:'Čeština · Candidates',en:'English'},
  hero:{eyebrow:'Hospitality Careers · Austria',title:'Build your hospitality career in Austria.',subtitle:'Verified hotels. Real salaries. Housing support. Free for candidates.',primary:'Find opportunities',secondary:'How it works'},
  stats:[['Fixed','Rate per placement'],['5–10','Working days'],['Zero','Upfront cost'],['AI','powered matching']],
  trust:[['No Risk','Fixed success fee — only when someone starts. No hidden costs whatsoever.'],['Within 10 Days','From your request to candidate presentation. Faster if urgent.'],['Verified Quality','Every candidate manually screened. No bulk CVs — only real matches.']],
  services:{eyebrow:'What we offer',title:'AI-assisted hiring',intro:'Every capability is designed specifically for small and mid-size hotels and restaurants in Austria.',items:[['01','Recruiting','Pre-qualified candidates from CZ/SK','We find, screen and place staff from Czech Republic and Slovakia in Austrian hotels and restaurants. Pre-qualified. Transparent. Success-based.','Fixed Rate','success-based · no upfront · zero risk','Explore Recruiting'],['02','Hiring Campaigns','Meta Funnel · Landing Page · WhatsApp','We build Meta campaigns, landing pages and WhatsApp automation. Your candidates come directly to you. You control, we support.','Transparent','setup fee + monthly management · ad budget separate','Explore Campaigns']]},
  process:{eyebrow:'How we work',title:'From enquiry to day one.',steps:[['01','Discovery','We understand your challenges. Which positions, what timeline, what requirements?'],['02','Setup','Services are configured. Campaigns launch. Terminals are ordered and set up.'],['03','Execution','You receive candidates. Campaigns run. Payments are processed smoothly.'],['04','Scaling',"One service working? Let's discover the next step for your business together."]]},
  contact:{eyebrow:'Next Step',title:"Let's talk.",text:'30 minutes. No obligation. We understand your problem — you understand our solution.',formTitle:'Direct Enquiry',name:'Name',company:'Hotel / Restaurant',email:'Email',phone:'Phone',interest:"I'm interested in",message:'Message',submit:'Send Enquiry',success:"Thank you! We'll be in touch within 24 hours."},
  team:{eyebrow:'Join the Team',title:'Work with AlpenTalent.',text:"We're growing and looking for motivated brokers and recruiters to help us connect Czech & Slovak talent with Austrian hospitality businesses.",roles:[['Recruiter / Broker','Source candidates in CZ/SK, place them in Austrian hotels and restaurants. Commission per successful placement. Work remotely, set your own pace.'],['Partner / Referral','Already in the hotel or hospitality network? Refer clients and earn a referral commission on every closed deal.']],applyTitle:'Apply in 3 minutes',applyText:'Fill in our short questionnaire — we review every submission personally and respond within 48 hours.',applyCta:'Open Application Form'},
  questionnaire:{title:'Short questionnaire',name:'Name',role:'Desired role',languages:'Languages',region:'Region',availability:'Availability',contact:'Preferred contact',consent:'I consent to data processing for recruitment.',continue:'Continue'},
  auth:{title:'Login',intro:'Choose candidate, employer or partner and sign in with Google.',candidate:'Candidate',employer:'Employer',partner:'Partner',google:'Sign in with Google',signIn:'Sign in with Google',signUp:'Create account',newHere:'New here? Create an account',chooseRole:'I am a:',continue:'Continue with Google',back:'Back',scopes:'Google scopes: openid, email, profile. The selected role is saved only at first sign-in.'},
  homepage:{
    hero:{
      eyebrow:'Hospitality Careers · Austria',
      h1:'Build your hospitality career in Austria.',
      sub:'Verified hotels. Real salaries. Housing support. Free for candidates.',
      primary:'Find opportunities',
      primaryHref:'/en/jobs',
      secondary:'How it works',
      secondaryHref:'/en/how-it-works',
    },
    why:{
      eyebrow:'Why AlpenTalent',
      heading:'Built for hospitality professionals, not HR software.',
      tiles:[
        {title:'Verified employers',body:'Every partner hotel is reviewed by our team. No anonymous listings, no surprises.'},
        {title:'Austria-focused',body:'Tyrol, Salzburg, Vorarlberg and beyond. Real roles in real hotels.'},
        {title:'Housing support',body:'Many roles include staff accommodation. We flag it on every listing.'},
        {title:'A real person when you need one',body:'Human support alongside AI matching. We answer questions personally.',accent:true},
      ],
    },
    visa:{
      eyebrow:'Visa & Relocation',
      heading:'Coming from outside the EU?',
      sub:"We guide you through Austrian work permits, registration, and the first steps — not just the job search.",
      items:[
        ['🛂','Work permits','Guidance on Austrian visa and permit types for your nationality.'],
        ['🏠','Finding housing','Staff housing options, what to expect, and how to register your address.'],
        ['📋','Registration (Anmeldung)','How to register in Austria — required within 3 days of moving in.'],
        ['🗣️','Language basics','German essentials for the workplace, plus resources to get you started.'],
      ],
    },
    showcase:{
      eyebrow:'Platform',
      heading:'AI matching. Human support.',
      sub:'AlpenTalent combines intelligent matching with a team that actually picks up the phone.',
      items:[
        ['Complete your profile','Tell us your skills, experience, preferred region, and availability.'],
        ['Get matched','Our AI finds roles that fit — filtered and reviewed by a real recruiter.'],
        ['Hear back fast','Most candidates receive their first matches within 48 hours.'],
        ['Start your Austrian chapter',"We're with you from first match to day one."],
      ],
    },
    jobs:{heading:'Open roles right now',browseAll:'Browse all →'},
    explore:{
      eyebrow:'Explore',
      heading:'Everything you need to move.',
      tiles:[
        {title:'Salary guide',body:'Real salary ranges for every hospitality role in Austria.',href:'/en/salary-guide',icon:'💶'},
        {title:'Austrian regions',body:'Tyrol, Salzburg, Vorarlberg and more — find your region.',href:'/en/regions',icon:'🏔️'},
        {title:'AlpenLife guide',body:'Housing, contracts, language basics — all in one place.',href:'/en/resources',icon:'📖'},
        {title:'Success stories',body:'Real people who found their role through AlpenTalent.',href:'/en/success-stories',icon:'⭐'},
      ],
    },
    faq:{
      heading:'Common questions',
      seeAll:'See all FAQs →',
      items:[
        ['Is AlpenTalent free for candidates?','Yes. Candidates never pay. Hotels cover the placement fee — not you.'],
        ['Do I need to speak German?','Not always. Many roles are English-friendly; we match by the level each role actually needs.'],
        ['Will you help with housing?','Many partner hotels provide staff housing, and we flag it on every role.'],
        ['How long does it take?','Most candidates receive their first matches within 48 hours of completing their profile.'],
      ],
    },
    employerBand:{
      heading:'Hiring for your hotel?',
      sub:'Meet pre-matched hospitality talent. People who are ready for Austria.',
      cta:'For employers →',
      href:'/de',
    },
  },
  footer:{tagline:'Hospitality Operating System for Austrian hotels and restaurants. Vienna, Austria.',services:'Services',languages:'Language',contact:'Contact',career:'Careers',impressum:'Impressum',privacy:'Privacy Policy',copy:'© 2025 AlpenTalent · Hospitality Operating System'},
  ui:{...de.ui,
    nav:{jobs:'Jobs',forEmployers:'For Employers',howItWorks:'How it works',resources:'Resources',about:'About',login:'Login',findOpportunities:'Find opportunities'},
    theme:{light:'Light',dark:'Dark',auto:'Auto'},
    trust:{partnerHotels:'Partner hotels',hospitality:'Hospitality professionals',coverage:'Austria-wide',satisfaction:'Candidate satisfaction',googleCta:'Sign in with Google'},
    howItWorks:{eyebrow:'How it works',heading:'Five steps to your role in Austria',steps:[{title:'Create your profile',body:'A few questions, five minutes. No CV gymnastics.'},{title:'Get matched',body:'We surface roles that fit your skills, language and life.'},{title:'Interview',body:'Meet the hotel. We help you prepare.'},{title:'Trial shift',body:'See the team and the place before you commit.'},{title:'Move to Austria',body:'Housing and paperwork support the whole way.'}]},
    jobs:{searchPlaceholder:'Search roles, hotels, locations…',searchBtn:'Search',filterLabel:'Filter:',allRegions:'All regions',sortBestMatch:'Best match',sortNewest:'Newest',sortSalary:'Salary',noRolesTitle:'No roles found',noRolesBody:'Try adjusting your filters or check back soon — new roles are added every week.'},
    jobCard:{housingIncluded:'Housing included',viewJob:'View job →'},
    persona:{reception:'Reception',chef:'Chef',housekeeping:'Housekeeping',waiter:'Waiter',manager:'Manager'},
    resources:{eyebrow:'ALPENLIFE',heading:'Everything you need to land in Austria',sub:'Practical guides on moving, language, contracts, and housing.'},
    footer:{tagline:'Hospitality talent marketplace for Austria.',whatsappLabel:'Questions? WhatsApp us',colCandidates:'Candidates',colEmployers:'Employers',colCompany:'Company',colLegal:'Legal',linkFindJobs:'Find jobs',linkHowItWorks:'How it works',linkSalaryGuide:'Salary guide',linkRegions:'Regions',linkResources:'Resources',linkForEmployers:'For employers',linkPostVacancy:'Post a vacancy',linkSuccessStories:'Success stories',linkAbout:'About',linkContact:'Contact',linkFaq:'FAQ',linkPrivacy:'Privacy Policy',linkImprint:'Imprint',copyright:'© 2025 AlpenTalent · Hospitality talent marketplace',satisfaction:'candidate satisfaction'}
  }};
const cz:Dict={...de,
  meta:{title:'Práce v Rakousku 2026 | Hotely a gastronomie | AlpenTalent',description:'Najdi svou roli v Rakousku. Ověřené hotely, ubytování a strava. Gastronomie a hotelnictví v Tyrolsku, Salcbursku a Vorarlbersku. Zdarma pro uchazeče.'},
  nav:{...de.nav,cta:'Vyplnit dotazník'},
  root:{eyebrow:'Alpen Talent · Rakousko',title:'Vyberte si jazyk.',subtitle:'Wähle deine Sprache. Choose your language.',de:'Deutsch · Hotely',cz:'Čeština · Uchazeči',en:'English'},
  hero:{eyebrow:'Práce v Rakousku · hotely a gastronomie',title:'Najdi svou roli v Rakousku.',subtitle:'Ověřené hotely, ubytování a strava v ceně. Bez poplatků pro uchazeče.',primary:'Najít příležitosti',secondary:'Jak to funguje'},
  stats:[['Zdarma','poplatek pro uchazeče'],['2','minuty dotazník'],['48h','typická odpověď'],['AT','hotely a restaurace']],
  trust:[['Ověřené nabídky','Ne anonymní inzeráty. Pracujeme s hotely a restauracemi, kde známe podmínky.'],['Ubytování často zajištěno','U hotelových pozic bývá ubytování a strava běžnou součástí nabídky.'],['Člověk, ne automat','Každý profil čteme ručně. Posíláme vás jen tam, kde to dává smysl.']],
  services:{eyebrow:'Pozice',title:'Nejčastější práce v rakouských hotelech',intro:'Hledáme lidi do gastronomie a hotelnictví. Zkušenosti pomáhají, ale u některých pozic nejsou nutné.',items:[['01','Číšník / Servírka','hotelová restaurace, snídaně, obsluha, bankety','Rakousko','','','Vyplnit dotazník'],['02','Kuchař / Kuchařka','à la carte, hotelová kuchyně, příprava, výdej','Rakousko','','','Vyplnit dotazník'],['03','Pokojská / Housekeeping','úklid pokojů, hotelový provoz, penziony a 3–5* hotely','Rakousko','','','Vyplnit dotazník'],['04','Recepční','check-in, check-out, rezervace, komunikace s hosty','Němčina výhoda','','','Vyplnit dotazník']]},
  process:{eyebrow:'Postup',title:'Jak získat práci v Rakousku',steps:[['01','Vyplníte krátký dotazník','Napíšete zkušenosti, pozici, dostupnost, němčinu a co od práce očekáváte. Zabere to zhruba 2 minuty.'],['02','Vybereme vhodné nabídky','Porovnáme váš profil s aktuální poptávkou hotelů a restaurací v Rakousku.'],['03','Dostanete konkrétní další krok','Ozveme se s pozicí, lokalitou, termínem nástupu a základními podmínkami. Bez mlžení.'],['04','Žádné CV do prázdna','Nesbíráme životopisy jen proto, abychom je někam přeposlali. Nejdřív potřebujeme vědět, co umíte a co hledáte. Pak řešíme konkrétní match.']]},
  contact:{eyebrow:'Start',title:'Chcete práci v Rakousku?',text:'Vyplňte krátký dotazník. Podíváme se na váš profil a ozveme se s dalším krokem. Bez závazku a bez poplatku.',formTitle:'Vyplnit dotazník',name:'Jméno',company:'Preferovaná pozice',email:'E-mail',phone:'Telefon',interest:'Zajímá mě',message:'Zkušenosti',submit:'Vyplnit dotazník',success:'Děkujeme. Ozveme se s dalším krokem.'},
  team:{eyebrow:'Časté otázky',title:'FAQ: práce v Rakousku',text:'Pro uchazeče je služba zdarma.',roles:[['Je služba pro uchazeče opravdu zdarma?','Ano. Uchazeči nám nic neplatí. Neúčtujeme registrační poplatky ani poplatky za zprostředkování. Odměnu řeší zaměstnavatel.'],['Dá se najít práce v Rakousku s ubytováním?','Ano, u hotelových a sezónních pozic je ubytování často součástí nabídky. Vždy ale záleží na konkrétním zaměstnavateli a regionu.']],applyTitle:'Chcete práci v Rakousku?',applyText:'Vyplňte krátký dotazník. Podíváme se na váš profil a ozveme se s dalším krokem.',applyCta:'Vyplnit dotazník'},
  questionnaire:{title:'Krátký dotazník',name:'Jméno',role:'Požadovaná pozice',languages:'Jazyky',region:'Region',availability:'Dostupnost',contact:'Preferovaný kontakt',consent:'Souhlasím se zpracováním údajů pro zprostředkování práce.',continue:'Pokračovat'},
  auth:{title:'Přihlášení',intro:'Vyberte uchazeč, zaměstnavatel nebo partner a přihlaste se přes Google.',candidate:'Uchazeč',employer:'Zaměstnavatel',partner:'Partner',google:'Přihlásit se přes Google',signIn:'Přihlásit se přes Google',signUp:'Vytvořit účet',newHere:'Jste tu poprvé? Vytvořit účet',chooseRole:'Jsem:',continue:'Pokračovat přes Google',back:'Zpět',scopes:'Google oprávnění: openid, email, profile. Zvolená role se uloží jen při prvním přihlášení.'},
  homepage:{
    hero:{
      eyebrow:'Práce v Rakousku · hotely a gastronomie',
      h1:'Najdi svou roli v Rakousku.',
      sub:'Ověřené hotely, ubytování a strava v ceně. Bez poplatků pro uchazeče.',
      primary:'Najít příležitosti',
      primaryHref:'/cz/jobs',
      secondary:'Jak to funguje',
      secondaryHref:'/cz/how-it-works',
    },
    why:{
      eyebrow:'Proč AlpenTalent',
      heading:'Vytvořeno pro lidi v gastronomii, ne pro HR software.',
      tiles:[
        {title:'Ověření zaměstnavatelé',body:'Každý partnerský hotel ručně prověřujeme. Žádné anonymní inzeráty.'},
        {title:'Ubytování a strava',body:'U hotelových pozic bývá ubytování součástí nabídky. Vždy to označíme.'},
        {title:'Zdarma pro uchazeče',body:'Za zprostředkování nic neplatíte. Náklady hradí hotel, ne vy.'},
        {title:'Člověk, ne automat',body:'Každý profil čteme ručně. Posíláme vás jen tam, kde to dává smysl.',accent:true},
      ],
    },
    jobs:{heading:'Aktuálně otevřené role',browseAll:'Zobrazit vše →'},
    explore:{
      eyebrow:'Prozkoumejte',
      heading:'Vše, co potřebujete pro start v Rakousku.',
      tiles:[
        {title:'Průvodce platy',body:'Reálné platy pro každou pozici v Rakousku.',href:'/cz/salary-guide',icon:'💶'},
        {title:'Regiony Rakouska',body:'Tyrolsko, Salcburk, Vorarlberg a další — najdi svůj region.',href:'/cz/regions',icon:'🏔️'},
        {title:'Průvodce AlpenLife',body:'Bydlení, smlouvy, němčina — vše na jednom místě.',href:'/cz/resources',icon:'📖'},
        {title:'Příběhy úspěchu',body:'Skuteční lidé, kteří práci přes AlpenTalent našli.',href:'/cz/success-stories',icon:'⭐'},
      ],
    },
    faq:{
      heading:'Časté dotazy',
      seeAll:'Všechny FAQ →',
      items:[
        ['Je AlpenTalent pro uchazeče zdarma?','Ano. Uchazeči nic neplatí. Náklady na zprostředkování hradí hotel — ne vy.'],
        ['Musím umět německy?','Ne vždy. U mnoha pozic stačí angličtina; párujeme podle skutečného požadavku dané role.'],
        ['Pomůžete mi s ubytováním?','Mnoho partnerských hotelů nabízí ubytování pro zaměstnance — vždy to u nabídek označujeme.'],
        ['Jak rychle dostanu odpověď?','Většina uchazečů dostane první nabídky do 48 hodin od vyplnění profilu.'],
      ],
    },
    employerBand:{
      heading:'Hledáte personál pro váš hotel?',
      sub:'AlpenTalent nachází ověřené kandidáty z Česka a Slovenska pro hotely v Rakousku.',
      cta:'Pro hotely →',
      href:'/de',
    },
  },
  footer:{tagline:'Práce v Rakousku pro Čechy a Slováky. Hotely, restaurace, sezónní pozice a ověřené nabídky.',services:'Pro uchazeče',languages:'Jazyky',contact:'Kontakt',career:'Pro hotely',impressum:'Impressum',privacy:'Ochrana osobních údajů',copy:'© 2026 Alpen Talent · Práce v Rakousku'},
  ui:{...de.ui,
    nav:{jobs:'Otevřené pozice',forEmployers:'Zaměstnavatelé',howItWorks:'Jak to funguje',resources:'Rádce',about:'O nás',login:'Přihlásit',findOpportunities:'Hledat práci'},
    theme:{light:'Světlý',dark:'Tmavý',auto:'Auto'},
    trust:{partnerHotels:'partnerských hotelů',hospitality:'profesionálů',coverage:'Celé Rakousko',satisfaction:'spokojenost',googleCta:'Přihlásit se přes Google'},
    howItWorks:{eyebrow:'Jak to funguje',heading:'Pět kroků k práci v Rakousku',steps:[{title:'Vytvoř profil',body:'Pár otázek, pět minut. Žádný životopis.'},{title:'Najdeme shodu',body:'Ukážeme role, které sedí na vaše dovednosti, jazyk a situaci.'},{title:'Pohovor',body:'Seznamte se s hotelem. Pomůžeme s přípravou.'},{title:'Zkušební směna',body:'Poznejte tým a místo dříve, než se rozhodnete.'},{title:'Přesun do Rakouska',body:'Ubytování a papírování — s vámi po celou cestu.'}]},
    jobs:{searchPlaceholder:'Hledat pozice, hotely, lokality…',searchBtn:'Hledat',filterLabel:'Filtr:',allRegions:'Všechny regiony',sortBestMatch:'Nejlepší shoda',sortNewest:'Nejnovější',sortSalary:'Mzda',noRolesTitle:'Žádné pozice nenalezeny',noRolesBody:'Zkuste upravit filtry nebo se vraťte brzy — nové pozice přidáváme každý týden.'},
    jobCard:{housingIncluded:'Ubytování v ceně',viewJob:'Zobrazit pozici →'},
    persona:{reception:'Recepce',chef:'Kuchyně',housekeeping:'Pokojská',waiter:'Obsluha',manager:'Vedoucí'},
    resources:{eyebrow:'ALPENLIFE',heading:'Vše, co potřebuješ pro start v Rakousku',sub:'Praktické průvodce k přestěhování, jazyce, smlouvách a bydlení.'},
    footer:{tagline:'Práce v Rakousku pro Čechy a Slováky.',whatsappLabel:'Dotazy? Napište nám na WhatsApp',colCandidates:'Pro uchazeče',colEmployers:'Pro hotely',colCompany:'Firma',colLegal:'Právní',linkFindJobs:'Hledat práci',linkHowItWorks:'Jak to funguje',linkSalaryGuide:'Průvodce platy',linkRegions:'Regiony Rakouska',linkResources:'Průvodce AlpenLife',linkForEmployers:'Pro hotely',linkPostVacancy:'Zadat volné místo',linkSuccessStories:'Příběhy úspěchu',linkAbout:'O nás',linkContact:'Kontakt',linkFaq:'FAQ',linkPrivacy:'Ochrana osobních údajů',linkImprint:'Impressum',copyright:'© 2026 AlpenTalent · Práce v Rakousku',satisfaction:'spokojenost uchazečů'}
  }};
const app={
  de:{
    profile:{
      saved:'Saved.',error:'Could not save profile.',
      candidate:{title:'Dein Bewerberprofil',name:'Name',phone:'Telefon',country:'Land',location:'Ort',region:'Region',rolesWanted:'Gewünschte Position',language:'Primäre Sprache',salaryExpectation:'Gehaltsvorstellung',availability:'Verfügbarkeit',housingNeeded:'Personalunterkunft benötigt',preferredContact:'Bevorzugter Kontakt',whatsappNumber:'WhatsApp-Nummer',telegramUsername:'Telegram username',contactValue:'Kontakt (Nummer / Username)',save:'Profil speichern'},
      employer:{title:'Personalbedarf anfragen',companyName:'Unternehmen',contactPerson:'Ansprechperson',phone:'Telefon',city:'Stadt',businessType:'Betriebsart',roleTitle:'Personalbedarf',roleRegion:'Region',salaryOffer:'Gehalt',roleLanguages:'Sprachanforderung',startDate:'Startdatum',housingProvided:'Unterkunft vorhanden',save:'Profil speichern'},
      partner:{title:'Partnerprofil anlegen',intro:'Beschreibe kurz die gewünschte Kooperation. AlpenTalent prüft die Anfrage menschlich.',name:'Name',company:'Unternehmen',website:'Website',proposal:'Kooperationsvorschlag',email:'E-Mail',emailNote:'E-Mail ist über Google hinterlegt',phone:'Telefon',save:'Profil speichern'}
    },
    dash:{candidateTitle:'Mein Bewerberstatus',employerTitle:'Mein Arbeitgeberstatus',partnerTitle:'Partnerstatus',profile:'Profil',checklist:'Vollständigkeit',missing:'Fehlt',complete:'vollständig',status:'Status',next:'Was als Nächstes',submissions:'Matches und Bewerbungen',roles:'Offene Rollen',pipeline:'Pipeline',trial:'Probe',invoice:'Rechnung',updates:'Updates',history:'Historie',partnerProposal:'Kooperationsvorschlag',profileEmpty:'Profil noch nicht ausgefüllt',proposalEmpty:'Noch keine Angaben.',noSubmissions:'Noch keine Matches oder Bewerbungen.',noRoles:'Noch keine offenen Rollen.',noUpdates:'Noch keine Updates.',candidateLabel:'Kandidat',score:'Score',invoicePending:'Rechnung wird intern geprüft.',invoiceNone:'Keine Rechnungsaktion erforderlich.',signOut:'Sign out'},
    status:{NEW_PROFILE:'Neues Profil',PROFILE_IN_REVIEW:'Profil in Prüfung',MISSING_INFO:'Angaben fehlen',READY_FOR_MATCHING:'Bereit fürs Matching',MATCHED:'Match gefunden',SENT_TO_EMPLOYER:'An Arbeitgeber gesendet',TRIAL_REQUESTED:'Probearbeiten angefragt',TRIAL_SCHEDULED:'Probearbeiten geplant',PLACED:'Platziert',REJECTED:'Abgelehnt',PAUSED:'Pausiert',NEW_COMPANY:'Neuer Betrieb',COMPANY_REVIEW:'Betrieb in Prüfung',HIRING_NEED_CREATED:'Personalbedarf erstellt',CANDIDATE_SEARCH:'Kandidatensuche',CANDIDATES_SUBMITTED:'Kandidaten vorgestellt',TRIAL_PHASE:'Probephase',PLACEMENT_SUCCESS:'Vermittlung erfolgreich',INVOICE_PENDING:'Rechnung offen',CLOSED:'Abgeschlossen',NEW_PARTNER:'Neue Partneranfrage',PARTNER_REVIEW:'Partneranfrage in Prüfung',CONTACTED:'Kontaktiert',ACTIVE:'Aktiv',DECLINED:'Abgelehnt',OPEN:'Offen',ON_HOLD:'Pausiert',FILLED:'Besetzt',SENT:'Gesendet',WITHDRAWN:'Zurückgezogen'},
    next:{NEW_PROFILE:'Wir prüfen dein Profil.',PROFILE_IN_REVIEW:'Wir prüfen die Angaben.',MISSING_INFO:'Bitte ergänze fehlende Angaben.',READY_FOR_MATCHING:'Wir suchen passende Rollen.',MATCHED:'Ein Match wird geprüft.',SENT_TO_EMPLOYER:'Dein Profil wurde vorgestellt.',TRIAL_REQUESTED:'Ein Probearbeiten wurde angefragt.',TRIAL_SCHEDULED:'Dein Probearbeiten ist geplant.',PLACED:'Deine Platzierung ist bestätigt.',REJECTED:'Wir besprechen nächste Optionen.',PAUSED:'Dein Profil ist pausiert.',NEW_COMPANY:'Wir prüfen Ihr Unternehmensprofil.',COMPANY_REVIEW:'Wir klären Ihren Bedarf.',HIRING_NEED_CREATED:'Ihre Rolle wird vorbereitet.',CANDIDATE_SEARCH:'Wir suchen passende Kandidat:innen.',CANDIDATES_SUBMITTED:'Kandidatenprofile liegen vor.',TRIAL_PHASE:'Probephase läuft.',PLACEMENT_SUCCESS:'Platzierung erfolgreich.',INVOICE_PENDING:'Rechnung wird menschlich geprüft.',CLOSED:'Vorgang abgeschlossen.',NEW_PARTNER:'Wir prüfen deine Kooperationsanfrage.',PARTNER_REVIEW:'Die Anfrage ist in menschlicher Prüfung.',CONTACTED:'AlpenTalent hat Kontakt aufgenommen.',ACTIVE:'Die Kooperation ist aktiv.',DECLINED:'Die Kooperation wird aktuell nicht weitergeführt.'}
  },
  cz:{
    profile:{
      saved:'Uloženo.',error:'Profil se nepodařilo uložit.',
      candidate:{title:'Váš profil uchazeče',name:'Jméno',phone:'Telefon',country:'Země',location:'Místo',region:'Region',rolesWanted:'Požadovaná pozice',language:'Hlavní jazyk',salaryExpectation:'Očekávaná mzda',availability:'Dostupnost',housingNeeded:'Potřebuji ubytování',preferredContact:'Preferovaný kontakt',whatsappNumber:'WhatsApp číslo',telegramUsername:'Telegram username',contactValue:'Kontakt (číslo / username)',save:'Uložit profil'},
      employer:{title:'Zadat potřebu personálu',companyName:'Firma',contactPerson:'Kontaktní osoba',phone:'Telefon',city:'Město',businessType:'Typ provozu',roleTitle:'Potřeba personálu',roleRegion:'Region',salaryOffer:'Mzda',roleLanguages:'Požadované jazyky',startDate:'Datum nástupu',housingProvided:'Ubytování k dispozici',save:'Uložit profil'},
      partner:{title:'Vytvořit partnerský profil',intro:'Stručně popište požadovanou spolupráci. AlpenTalent žádost zkontroluje člověkem.',name:'Jméno',company:'Firma',website:'Website',proposal:'Návrh spolupráce',email:'E-mail',emailNote:'E-mail je uložen přes Google',phone:'Telefon',save:'Uložit profil'}
    },
    dash:{candidateTitle:'Můj status uchazeče',employerTitle:'Můj status zaměstnavatele',partnerTitle:'Status partnera',profile:'Profil',checklist:'Úplnost',missing:'Chybí',complete:'kompletní',status:'Status',next:'Co bude dál',submissions:'Matche a žádosti',roles:'Otevřené role',pipeline:'Pipeline',trial:'Zkušební den',invoice:'Fakturace',updates:'Aktualizace',history:'Historie',partnerProposal:'Návrh spolupráce',profileEmpty:'Profil ještě není vyplněn',proposalEmpty:'Zatím žádné údaje.',noSubmissions:'Zatím žádné matche ani žádosti.',noRoles:'Zatím žádné otevřené role.',noUpdates:'Zatím žádné aktualizace.',candidateLabel:'Uchazeč',score:'Skóre',invoicePending:'Faktura je v interní kontrole.',invoiceNone:'Není potřeba žádná fakturační akce.',signOut:'Odhlásit se'},
    status:{NEW_PROFILE:'Nový profil',PROFILE_IN_REVIEW:'Profil v kontrole',MISSING_INFO:'Chybí údaje',READY_FOR_MATCHING:'Připraveno k párování',MATCHED:'Nalezen match',SENT_TO_EMPLOYER:'Odesláno zaměstnavateli',TRIAL_REQUESTED:'Zkušební den vyžádán',TRIAL_SCHEDULED:'Zkušební den naplánován',PLACED:'Umístěno',REJECTED:'Odmítnuto',PAUSED:'Pozastaveno',NEW_COMPANY:'Nový provoz',COMPANY_REVIEW:'Provoz v kontrole',HIRING_NEED_CREATED:'Potřeba personálu vytvořena',CANDIDATE_SEARCH:'Hledání uchazečů',CANDIDATES_SUBMITTED:'Uchazeči představeni',TRIAL_PHASE:'Zkušební fáze',PLACEMENT_SUCCESS:'Úspěšné umístění',INVOICE_PENDING:'Faktura čeká',CLOSED:'Uzavřeno',NEW_PARTNER:'Nová partnerská žádost',PARTNER_REVIEW:'Partnerská žádost v kontrole',CONTACTED:'Kontaktováno',ACTIVE:'Aktivní',DECLINED:'Odmítnuto',OPEN:'Otevřeno',ON_HOLD:'Pozastaveno',FILLED:'Obsazeno',SENT:'Odesláno',WITHDRAWN:'Staženo'},
    next:{NEW_PROFILE:'Kontrolujeme váš profil.',PROFILE_IN_REVIEW:'Kontrolujeme údaje.',MISSING_INFO:'Doplňte prosím chybějící údaje.',READY_FOR_MATCHING:'Hledáme vhodné role.',MATCHED:'Match je v kontrole.',SENT_TO_EMPLOYER:'Váš profil byl představen.',TRIAL_REQUESTED:'Byl vyžádán zkušební den.',TRIAL_SCHEDULED:'Zkušební den je naplánován.',PLACED:'Umístění je potvrzeno.',REJECTED:'Probereme další možnosti.',PAUSED:'Váš profil je pozastaven.',NEW_COMPANY:'Kontrolujeme firemní profil.',COMPANY_REVIEW:'Upřesňujeme potřebu.',HIRING_NEED_CREATED:'Role se připravuje.',CANDIDATE_SEARCH:'Hledáme vhodné uchazeče.',CANDIDATES_SUBMITTED:'Profily uchazečů jsou k dispozici.',TRIAL_PHASE:'Probíhá zkušební fáze.',PLACEMENT_SUCCESS:'Umístění bylo úspěšné.',INVOICE_PENDING:'Faktura je v lidské kontrole.',CLOSED:'Proces je uzavřen.',NEW_PARTNER:'Kontrolujeme vaši žádost o spolupráci.',PARTNER_REVIEW:'Žádost je v lidské kontrole.',CONTACTED:'AlpenTalent navázal kontakt.',ACTIVE:'Spolupráce je aktivní.',DECLINED:'Spolupráce se nyní nepokračuje.'}
  },
  en:{
    profile:{
      saved:'Saved.',error:'Could not save profile.',
      candidate:{title:'Your candidate profile',name:'Name',phone:'Phone',country:'Country',location:'Location',region:'Region',rolesWanted:'Desired position',language:'Primary language',salaryExpectation:'Salary expectation',availability:'Availability',housingNeeded:'Staff housing needed',preferredContact:'Preferred contact',whatsappNumber:'WhatsApp number',telegramUsername:'Telegram username',contactValue:'Contact (number / username)',save:'Save profile'},
      employer:{title:'Request staff',companyName:'Company',contactPerson:'Contact person',phone:'Phone',city:'City',businessType:'Type of business',roleTitle:'Hiring need',roleRegion:'Region',salaryOffer:'Salary',roleLanguages:'Language requirement',startDate:'Start date',housingProvided:'Housing provided',save:'Save profile'},
      partner:{title:'Create partner profile',intro:'Briefly describe the cooperation you want. AlpenTalent reviews the request manually.',name:'Name',company:'Company',website:'Website',proposal:'Cooperation proposal',email:'Email',emailNote:'Email is stored through Google',phone:'Phone',save:'Save profile'}
    },
    dash:{candidateTitle:'My candidate status',employerTitle:'My employer status',partnerTitle:'Partner status',profile:'Profile',checklist:'Completeness',missing:'Missing',complete:'complete',status:'Status',next:'What happens next',submissions:'Matches and applications',roles:'Open roles',pipeline:'Pipeline',trial:'Trial',invoice:'Invoice',updates:'Updates',history:'History',partnerProposal:'Cooperation proposal',profileEmpty:'Profile not completed yet',proposalEmpty:'No details yet.',noSubmissions:'No matches or applications yet.',noRoles:'No open roles yet.',noUpdates:'No updates yet.',candidateLabel:'Candidate',score:'Score',invoicePending:'Invoice is under internal review.',invoiceNone:'No invoice action required.',signOut:'Sign out'},
    status:{NEW_PROFILE:'New profile',PROFILE_IN_REVIEW:'Profile in review',MISSING_INFO:'Missing information',READY_FOR_MATCHING:'Ready for matching',MATCHED:'Matched',SENT_TO_EMPLOYER:'Sent to employer',TRIAL_REQUESTED:'Trial requested',TRIAL_SCHEDULED:'Trial scheduled',PLACED:'Placed',REJECTED:'Rejected',PAUSED:'Paused',NEW_COMPANY:'New company',COMPANY_REVIEW:'Company review',HIRING_NEED_CREATED:'Hiring need created',CANDIDATE_SEARCH:'Candidate search',CANDIDATES_SUBMITTED:'Candidates submitted',TRIAL_PHASE:'Trial phase',PLACEMENT_SUCCESS:'Placement success',INVOICE_PENDING:'Invoice pending',CLOSED:'Closed',NEW_PARTNER:'New partner request',PARTNER_REVIEW:'Partner review',CONTACTED:'Contacted',ACTIVE:'Active',DECLINED:'Declined',OPEN:'Open',ON_HOLD:'On hold',FILLED:'Filled',SENT:'Sent',WITHDRAWN:'Withdrawn'},
    next:{NEW_PROFILE:'We are reviewing your profile.',PROFILE_IN_REVIEW:'We are checking the details.',MISSING_INFO:'Please add the missing information.',READY_FOR_MATCHING:'We are looking for suitable roles.',MATCHED:'A match is being reviewed.',SENT_TO_EMPLOYER:'Your profile has been introduced.',TRIAL_REQUESTED:'A trial has been requested.',TRIAL_SCHEDULED:'Your trial is scheduled.',PLACED:'Your placement is confirmed.',REJECTED:'We will discuss next options.',PAUSED:'Your profile is paused.',NEW_COMPANY:'We are reviewing your company profile.',COMPANY_REVIEW:'We are clarifying your need.',HIRING_NEED_CREATED:'Your role is being prepared.',CANDIDATE_SEARCH:'We are looking for suitable candidates.',CANDIDATES_SUBMITTED:'Candidate profiles are available.',TRIAL_PHASE:'Trial phase is running.',PLACEMENT_SUCCESS:'Placement successful.',INVOICE_PENDING:'Invoice is under human review.',CLOSED:'Process closed.',NEW_PARTNER:'We are reviewing your cooperation request.',PARTNER_REVIEW:'The request is under human review.',CONTACTED:'AlpenTalent has made contact.',ACTIVE:'The cooperation is active.',DECLINED:'The cooperation is not being continued at the moment.'}
  }
};
export const dictionaries={de:{...de,app:{...app.de,q:questionnaireText.de}},cz:{...cz,app:{...app.cz,q:questionnaireText.cz}},en:{...en,app:{...app.en,q:questionnaireText.en}}};
export function getDictionary(locale?:string|null):Dict{return dictionaries[normalizeLocale(locale)]}
export function getText(locale:Locale,key:string){const parts=key.split('.');let cur:any=dictionaries[locale];let base:any=dictionaries.de;for(const part of parts){cur=cur?.[part];base=base?.[part]}if(cur===undefined){if(process.env.NODE_ENV!=='production')console.warn(`[i18n] missing ${locale}.${key}`);return base??key}return cur}
export const i18nKeyTree={meta:['title','description'],nav:['brand','de','cz','en','cta','login','whatsapp'],root:['eyebrow','title','subtitle','de','cz','en'],hero:['eyebrow','title','subtitle','primary','secondary'],stats:'[number,label][]',trust:'[title,text][]',services:['eyebrow','title','intro','items'],process:['eyebrow','title','steps'],contact:['eyebrow','title','text','formTitle','name','company','email','phone','interest','message','submit','success'],team:['eyebrow','title','text','roles','applyTitle','applyText','applyCta'],questionnaire:['title','name','role','languages','region','availability','contact','consent','continue'],auth:['title','intro','candidate','employer','partner','google','scopes'],app:['profile.candidate.*','profile.employer.*','profile.partner.*','dash.*','status.*','next.*','q.<role>.<code>.{question,options[]}'],footer:['tagline','services','languages','contact','career','impressum','privacy','copy'],homepage:['hero','why','faq','employerBand|candidateBand','jobs?','explore?','visa?','showcase?']};
