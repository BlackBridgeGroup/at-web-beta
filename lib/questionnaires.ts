export type Role = 'candidate' | 'employer' | 'partner';
export type Locale = 'de' | 'cz' | 'en';
export type Question = { code:string; field:string; values:string[]; custom?:boolean };

export const questionnaireSchema:Record<Role,Question[]> = {
  candidate:[
    {code:'C1',field:'position',values:['SERVICE','KITCHEN','HOUSEKEEPING'],custom:true},
    {code:'C2',field:'experience',values:['ENTRY','MID','SENIOR']},
    {code:'C3',field:'german_level',values:['NONE_BASIC','B1_B2','C1_PLUS']},
    {code:'C4',field:'work_eligibility',values:['EU','NONEU_PERMIT','NEEDS_INFO']},
    {code:'C5',field:'region',values:['TYROL','SALZBURG_VORARLBERG','ANY'],custom:true},
    {code:'C6',field:'availability',values:['NOW','WITHIN_MONTH','FLEXIBLE']},
    {code:'C7',field:'housing_needed',values:['NEEDED','NOT_NEEDED','PREFERRED']},
    {code:'C8',field:'salary_expectation',values:['UNDER_1800','R1800_2200','OVER_2200'],custom:true}
  ],
  employer:[
    {code:'E1',field:'business_type',values:['HOTEL','RESTAURANT','OTHER'],custom:true},
    {code:'E2',field:'role',values:['SERVICE','KITCHEN','HOUSEKEEPING'],custom:true},
    {code:'E3',field:'headcount',values:['ONE','TWO_THREE','FOUR_PLUS']},
    {code:'E4',field:'region',values:['TYROL','SALZBURG_VORARLBERG','OTHER_AT'],custom:true},
    {code:'E5',field:'housing_provided',values:['YES','NO','CAN_ARRANGE']},
    {code:'E6',field:'german_required',values:['REQUIRED','HELPFUL','NOT_NEEDED']},
    {code:'E7',field:'urgency',values:['ASAP','WITHIN_MONTH','PLANNING']},
    {code:'E8',field:'salary_offered',values:['UNDER_1800','R1800_2200','OVER_2200'],custom:true}
  ],
  partner:[
    {code:'P1',field:'partner_type',values:['RECRUITER_BROKER','REFERRAL','AGENCY_SUPPLIER'],custom:true},
    {code:'P2',field:'network_region',values:['DACH','CZ_SK','OTHER'],custom:true},
    {code:'P3',field:'brings',values:['CANDIDATES','EMPLOYER_LEADS','SERVICES'],custom:true},
    {code:'P4',field:'cooperation_model',values:['COMMISSION','REFERRAL_FEE','OTHER'],custom:true},
    {code:'P5',field:'volume',values:['OCCASIONAL','REGULAR','HIGH']}
  ]
};

export const questionnaireText:Record<Locale,any> = {
  de:{
    common:{progress:'Frage',back:'Zurück',next:'Weiter',custom:'✎ andere',customShort:'✎',customPlaceholder:'Eigene Antwort',contactTitle:'Kontakt',submit:'Absenden',submitting:'Wird gesendet …',privacyNote:'Ihre Daten werden zur Bearbeitung Ihrer Anfrage verarbeitet. Siehe Datenschutz.',consentCandidate:'Ich stimme der Verarbeitung meiner Daten zur Vermittlung zu.',consentPartner:'Ich stimme der Verarbeitung meiner Daten zur Bearbeitung der Kooperation zu.',done:'Danke. Dein Profil wurde gespeichert.',error:'Speichern fehlgeschlagen.'},
    candidate:{C1:{question:'Welche Stelle suchst du?',options:['Service/Kellner','Küche/Koch','Housekeeping']},C2:{question:'Wie viel Erfahrung hast du in dem Bereich?',options:['Wenig / Anfänger','1–3 Jahre','3+ Jahre']},C3:{question:'Wie gut ist dein Deutsch?',options:['Wenig / Grundlagen','Mittel (B1–B2)','Fließend (C1+)']},C4:{question:'Darfst du in Österreich/EU arbeiten?',options:['EU-Bürger','Nicht-EU mit Erlaubnis','Brauche Infos']},C5:{question:'In welcher Region möchtest du arbeiten?',options:['Tirol','Salzburg/Vorarlberg','Egal/überall']},C6:{question:'Ab wann kannst du anfangen?',options:['Sofort','Innerhalb eines Monats','Flexibel/Saison']},C7:{question:'Brauchst du eine Unterkunft?',options:['Ja, bitte','Nein','Wäre ein Plus']},C8:{question:'Welches Netto-Gehalt erwartest du?',options:['bis 1.800 €','1.800–2.200 €','2.200 €+']}},
    employer:{E1:{question:'Was für ein Betrieb sind Sie?',options:['Hotel','Restaurant/Café','anderes']},E2:{question:'Welche Position möchten Sie besetzen?',options:['Service','Küche','Housekeeping']},E3:{question:'Wie viele Personen brauchen Sie?',options:['1','2–3','4+']},E4:{question:'Wo ist Ihr Betrieb?',options:['Tirol','Salzburg/Vorarlberg','andere Region']},E5:{question:'Bieten Sie eine Unterkunft?',options:['Ja','Nein','Können wir organisieren']},E6:{question:'Wie wichtig ist Deutsch?',options:['Erforderlich','Von Vorteil','Nicht nötig']},E7:{question:'Wann brauchen Sie die Person?',options:['So schnell wie möglich','Innerhalb eines Monats','Planung/Saison']},E8:{question:'Welches Netto-Gehalt bieten Sie?',options:['bis 1.800 €','1.800–2.200 €','2.200 €+']}},
    partner:{P1:{question:'Wie möchten Sie kooperieren?',options:['Recruiter/Broker','Empfehlungspartner','Agentur/Lieferant']},P2:{question:'Wo ist Ihr Netzwerk?',options:['DACH','CZ/SK','anderes']},P3:{question:'Was bringen Sie ein?',options:['Kandidaten','Arbeitgeber-Kontakte','Dienstleistungen']},P4:{question:'Welches Modell stellen Sie sich vor?',options:['Provision pro Vermittlung','Empfehlungsgebühr','anderes']},P5:{question:'Wie viel Volumen erwarten Sie?',options:['Gelegentlich','Regelmäßig','Hoch']}}
  },
  cz:{
    common:{progress:'Otázka',back:'Zpět',next:'Další',custom:'✎ jiná',customShort:'✎',customPlaceholder:'Vlastní odpověď',contactTitle:'Kontakt',submit:'Odeslat',submitting:'Ukládá se …',privacyNote:'Vaše údaje zpracujeme pro vyřízení žádosti. Viz ochrana osobních údajů.',consentCandidate:'Souhlasím se zpracováním údajů pro zprostředkování práce.',consentPartner:'Souhlasím se zpracováním údajů pro zpracování spolupráce.',done:'Děkujeme. Profil byl uložen.',error:'Uložení se nepodařilo.'},
    candidate:{C1:{question:'Jakou práci hledáš?',options:['Obsluha/číšník','Kuchyně/kuchař','Úklid/pokojská']},C2:{question:'Kolik máš v oboru praxe?',options:['Málo / začátečník','1–3 roky','3+ roky']},C3:{question:'Jak dobře umíš německy?',options:['Málo / základy','Středně (B1–B2)','Plynně (C1+)']},C4:{question:'Můžeš pracovat v Rakousku/EU?',options:['Občan EU','Mimo EU s povolením','Potřebuji poradit']},C5:{question:'V jakém regionu chceš pracovat?',options:['Tyrolsko','Salcbursko/Vorarlbersko','Kdekoliv']},C6:{question:'Odkdy můžeš nastoupit?',options:['Ihned','Do měsíce','Flexibilně/sezóna']},C7:{question:'Potřebuješ ubytování?',options:['Ano, prosím','Ne','Bylo by plus']},C8:{question:'Jakou čistou mzdu očekáváš?',options:['do 1 800 €','1 800–2 200 €','2 200 €+']}},
    employer:{E1:{question:'Jaký provoz máte?',options:['Hotel','Restaurace/kavárna','jiný']},E2:{question:'Jakou pozici chcete obsadit?',options:['Obsluha','Kuchyně','Úklid']},E3:{question:'Kolik lidí potřebujete?',options:['1','2–3','4+']},E4:{question:'Kde je váš provoz?',options:['Tyrolsko','Salcbursko/Vorarlbersko','jiný region']},E5:{question:'Nabízíte ubytování?',options:['Ano','Ne','Umíme zařídit']},E6:{question:'Jak důležitá je němčina?',options:['Nutná','Výhoda','Není třeba']},E7:{question:'Kdy člověka potřebujete?',options:['Co nejdřív','Do měsíce','Plánování/sezóna']},E8:{question:'Jakou čistou mzdu nabízíte?',options:['do 1 800 €','1 800–2 200 €','2 200 €+']}},
    partner:{P1:{question:'Jak chcete spolupracovat?',options:['Recruiter/broker','Doporučovatel','Agentura/dodavatel']},P2:{question:'Kde máte síť/kontakty?',options:['DACH','ČR/SK','jiné']},P3:{question:'Co přinášíte?',options:['Kandidáty','Kontakty na zaměstnavatele','Služby']},P4:{question:'Jaký model si představujete?',options:['Provize za umístění','Doporučovací odměna','jiný']},P5:{question:'Jaký objem čekáte?',options:['Občas','Pravidelně','Vysoký']}}
  },
  en:{
    common:{progress:'Question',back:'Back',next:'Next',custom:'✎ other',customShort:'✎',customPlaceholder:'Custom answer',contactTitle:'Contact',submit:'Submit',submitting:'Saving …',privacyNote:'Your data is processed to handle your request. See Privacy Policy.',consentCandidate:'I consent to data processing for placement.',consentPartner:'I consent to data processing for cooperation handling.',done:'Thank you. Your profile has been saved.',error:'Could not save.'},
    candidate:{C1:{question:'Which job are you looking for?',options:['Service/Waiter','Kitchen/Cook','Housekeeping']},C2:{question:'How much experience do you have?',options:['Little / beginner','1–3 years','3+ years']},C3:{question:'How good is your German?',options:['Little / basics','Intermediate (B1–B2)','Fluent (C1+)']},C4:{question:'Are you allowed to work in Austria/EU?',options:['EU citizen','Non-EU with permit','Need info']},C5:{question:'Which region do you prefer?',options:['Tyrol','Salzburg/Vorarlberg','Anywhere']},C6:{question:'When can you start?',options:['Immediately','Within a month','Flexible/seasonal']},C7:{question:'Do you need accommodation?',options:['Yes please','No','Would be a plus']},C8:{question:'Expected net salary?',options:['up to €1,800','€1,800–2,200','€2,200+']}},
    employer:{E1:{question:'What kind of business are you?',options:['Hotel','Restaurant/Café','other']},E2:{question:'Which position do you want to fill?',options:['Service','Kitchen','Housekeeping']},E3:{question:'How many people do you need?',options:['1','2–3','4+']},E4:{question:'Where is your business?',options:['Tyrol','Salzburg/Vorarlberg','other region']},E5:{question:'Do you provide accommodation?',options:['Yes','No','Can arrange']},E6:{question:'How important is German?',options:['Required','Helpful','Not needed']},E7:{question:'When do you need the person?',options:['ASAP','Within a month','Planning/seasonal']},E8:{question:'What net salary do you offer?',options:['up to €1,800','€1,800–2,200','€2,200+']}},
    partner:{P1:{question:'How would you like to cooperate?',options:['Recruiter/Broker','Referral partner','Agency/Supplier']},P2:{question:'Where is your network?',options:['DACH','CZ/SK','other']},P3:{question:'What do you bring?',options:['Candidates','Employer leads','Services']},P4:{question:'Which model do you have in mind?',options:['Commission per placement','Referral fee','other']},P5:{question:'What volume do you expect?',options:['Occasional','Regular','High']}}
  }
};
