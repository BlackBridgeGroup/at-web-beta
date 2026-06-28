import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../../lib/i18n';
import type { Metadata } from 'next';

function GuideIcon({ category, size = 20 }: { category: string; size?: number }) {
  const shared = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (category) {
    case 'Moving':   return <svg {...shared}><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>;
    case 'Language': return <svg {...shared}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case 'Legal':    return <svg {...shared}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    case 'Housing':  return <svg {...shared}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case 'Work':     return <svg {...shared}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    default: return null;
  }
}

type LS = Record<string, string>;
type Section = { heading: LS; body: LS };
type Guide = { slug: string; category: string; catL: LS; title: LS; summary: LS; min: number; sections: Section[] };

const GUIDES: Guide[] = [
  {
    slug: 'moving-to-austria', category: 'Moving',
    catL: { de: 'Umzug', cz: 'Stěhování', en: 'Moving' },
    title: { de: 'Umzug nach Österreich: der Praxisleitfaden', cz: 'Stěhování do Rakouska: praktický průvodce', en: 'Moving to Austria: the practical guide' },
    summary: { de: 'Anmeldung, Bankkonto, SIM-Karte — alles, was du in den ersten zwei Wochen brauchst.', cz: 'Přihlášení, bankovní účet, SIM karta — vše, co potřebuješ v prvních dvou týdnech.', en: 'Registration, Anmeldung, bank account, SIM card — everything you need in the first two weeks.' },
    min: 8,
    sections: [
      {
        heading: { de: 'Bevor du ankommst', cz: 'Než přijedeš', en: 'Before you arrive' },
        body: {
          en: 'Confirm your housing address — you will need this for the Anmeldung (residence registration). Bring your passport, employment contract, and any educational or language certificates. Make copies of everything. Austrian bureaucracy is efficient but thorough.',
          de: 'Bestätige deine Wohnadresse — du brauchst sie für die Anmeldung. Bring deinen Reisepass, deinen Arbeitsvertrag und alle Ausbildungs- oder Sprachzertifikate mit. Mach von allem Kopien. Die österreichische Bürokratie ist effizient, aber gründlich.',
          cz: 'Potvrď si adresu bydlení — budeš ji potřebovat k Anmeldung (přihlášení k pobytu). Vezmi pas, pracovní smlouvu a všechny vzdělávací či jazykové certifikáty. Ze všeho si udělej kopie. Rakouská byrokracie je efektivní, ale důkladná.',
        },
      },
      {
        heading: { de: 'Anmeldung (Meldung des Wohnsitzes)', cz: 'Anmeldung (přihlášení k pobytu)', en: 'Anmeldung (residence registration)' },
        body: {
          en: 'Within three days of moving into your accommodation, you must register at the local Magistrat (city hall) or Bezirksamt (district office). Bring your passport and accommodation confirmation. You will receive a Meldezettel — this document is essential for opening a bank account, registering for health insurance, and almost everything else.',
          de: 'Innerhalb von drei Tagen nach dem Einzug musst du dich beim örtlichen Magistrat oder Bezirksamt anmelden. Bring deinen Reisepass und die Wohnungsbestätigung mit. Du erhältst einen Meldezettel — dieses Dokument ist unerlässlich für die Kontoeröffnung, die Krankenversicherung und fast alles andere.',
          cz: 'Do tří dnů od nastěhování se musíš přihlásit na místním Magistrat (radnice) nebo Bezirksamt (okresní úřad). Vezmi pas a potvrzení o ubytování. Dostaneš Meldezettel — tento dokument je nezbytný k založení účtu, zdravotnímu pojištění a téměř všemu dalšímu.',
        },
      },
      {
        heading: { de: 'Bankkonto', cz: 'Bankovní účet', en: 'Bank account' },
        body: {
          en: 'With your Meldezettel and passport, you can open an account at any Austrian bank. Bank Austria, Erste Bank and Raiffeisen have English-speaking staff in tourist areas. Some candidates use N26 or Wise as a temporary solution before establishing an Austrian account — but an Austrian account is better for payroll and rent payments.',
          de: 'Mit Meldezettel und Reisepass kannst du bei jeder österreichischen Bank ein Konto eröffnen. Bank Austria, Erste Bank und Raiffeisen haben in Tourismusgebieten englischsprachiges Personal. Manche nutzen N26 oder Wise als Übergangslösung — ein österreichisches Konto ist aber besser für Gehalt und Miete.',
          cz: 'S Meldezettel a pasem si můžeš otevřít účet u kterékoli rakouské banky. Bank Austria, Erste Bank a Raiffeisen mají v turistických oblastech anglicky mluvící personál. Někteří zpočátku používají N26 nebo Wise — rakouský účet je ale lepší pro výplatu a placení nájmu.',
        },
      },
      {
        heading: { de: 'Krankenversicherung (Krankenkasse)', cz: 'Zdravotní pojištění (Krankenkasse)', en: 'Health insurance (Krankenkasse)' },
        body: {
          en: 'As an employee, your employer is required by law to register you with the Austrian Social Insurance (ÖGK). Your contributions are deducted automatically from your salary. You will receive a health insurance card (e-card) within a few weeks. Keep the card — you will need it for all doctor visits.',
          de: 'Als Arbeitnehmer ist dein Arbeitgeber gesetzlich verpflichtet, dich bei der ÖGK anzumelden. Deine Beiträge werden automatisch vom Gehalt abgezogen. Innerhalb weniger Wochen erhältst du eine e-card. Bewahre sie gut auf — du brauchst sie bei jedem Arztbesuch.',
          cz: 'Jako zaměstnance tě zaměstnavatel ze zákona musí přihlásit do rakouského sociálního pojištění (ÖGK). Příspěvky se strhávají automaticky z platu. Během pár týdnů dostaneš kartu pojištěnce (e-card). Uschovej si ji — budeš ji potřebovat u každé návštěvy lékaře.',
        },
      },
      {
        heading: { de: 'SIM-Karte und Telefon', cz: 'SIM karta a telefon', en: 'SIM card and phone' },
        body: {
          en: 'A1, Drei, and Magenta are the main networks. You only need your passport to buy a prepaid SIM. Monthly plans start around €15–20 for unlimited data.',
          de: 'A1, Drei und Magenta sind die wichtigsten Netze. Für eine Prepaid-SIM brauchst du nur deinen Reisepass. Monatstarife mit unbegrenzten Daten beginnen bei etwa €15–20.',
          cz: 'A1, Drei a Magenta jsou hlavní sítě. Na předplacenou SIM stačí pas. Měsíční tarify s neomezenými daty začínají kolem €15–20.',
        },
      },
      {
        heading: { de: 'Unterwegs sein', cz: 'Doprava', en: 'Getting around' },
        body: {
          en: 'Austria has excellent public transport. In resort towns, your employer often provides a transport pass or ski pass. ÖBB trains connect all major cities. The KlimaTicket Österreich (around €1,095/year) gives unlimited travel on all public transport nationwide and is worth it if you travel frequently.',
          de: 'Österreich hat hervorragende öffentliche Verkehrsmittel. In Resort-Orten stellt der Arbeitgeber oft eine Fahrkarte oder einen Skipass bereit. ÖBB-Züge verbinden alle größeren Städte. Das KlimaTicket Österreich (rund €1.095/Jahr) bietet unbegrenzte Fahrten im ganzen Land und lohnt sich bei häufigem Reisen.',
          cz: 'Rakousko má vynikající veřejnou dopravu. Ve střediscích zaměstnavatel často poskytne dopravní nebo skipas. Vlaky ÖBB spojují všechna velká města. KlimaTicket Österreich (kolem €1 095/rok) nabízí neomezené cestování po celé zemi a vyplatí se, pokud cestuješ často.',
        },
      },
    ],
  },
  {
    slug: 'german-for-hospitality', category: 'Language',
    catL: { de: 'Sprache', cz: 'Jazyk', en: 'Language' },
    title: { de: 'Deutsch für Hotellerie & Gastronomie', cz: 'Němčina pro pohostinství', en: 'German for hospitality workers' },
    summary: { de: 'Die 100 Sätze, die du täglich im Hotel oder Restaurant brauchst. Ohne Schnickschnack.', cz: '100 frází, které použiješ každý den v hotelu nebo restauraci. Žádná vata, jen to podstatné.', en: "The 100 phrases you'll use every day in a hotel or restaurant. No fluff, just the essentials." },
    min: 6,
    sections: [
      {
        heading: { de: 'Begrüßung und Check-in', cz: 'Pozdravy a check-in', en: 'Greetings and check-in' },
        body: {
          en: 'Guten Morgen (Good morning) · Guten Tag (Good day) · Herzlich willkommen (Welcome) · Wie kann ich Ihnen helfen? (How can I help you?) · Haben Sie eine Reservierung? (Do you have a reservation?) · Hier ist Ihr Schlüssel (Here is your key) · Ihr Zimmer ist Nummer… (Your room is number…)',
          de: 'Guten Morgen · Guten Tag · Guten Abend · Herzlich willkommen · Wie kann ich Ihnen helfen? · Haben Sie eine Reservierung? · Hier ist Ihr Schlüssel · Ihr Zimmer ist Nummer… · Ich wünsche Ihnen einen angenehmen Aufenthalt.',
          cz: 'Guten Morgen (Dobré ráno) · Guten Tag (Dobrý den) · Herzlich willkommen (Vítejte) · Wie kann ich Ihnen helfen? (Jak vám mohu pomoci?) · Haben Sie eine Reservierung? (Máte rezervaci?) · Hier ist Ihr Schlüssel (Tady je váš klíč) · Ihr Zimmer ist Nummer… (Váš pokoj je číslo…)',
        },
      },
      {
        heading: { de: 'Im Restaurant', cz: 'V restauraci', en: 'At the restaurant' },
        body: {
          en: 'Haben Sie einen Tisch reserviert? (Did you reserve a table?) · Für wie viele Personen? (For how many people?) · Bitte folgen Sie mir (Please follow me) · Sind Sie bereit zu bestellen? (Are you ready to order?) · Guten Appetit! · Möchten Sie noch etwas? (Would you like anything else?)',
          de: 'Haben Sie einen Tisch reserviert? · Für wie viele Personen? · Bitte folgen Sie mir · Darf ich Ihnen die Speisekarte bringen? · Sind Sie bereit zu bestellen? · Guten Appetit! · Möchten Sie noch etwas?',
          cz: 'Haben Sie einen Tisch reserviert? (Máte rezervovaný stůl?) · Für wie viele Personen? (Pro kolik osob?) · Bitte folgen Sie mir (Následujte mě prosím) · Sind Sie bereit zu bestellen? (Můžete objednat?) · Guten Appetit! (Dobrou chuť!) · Möchten Sie noch etwas? (Přejete si ještě něco?)',
        },
      },
      {
        heading: { de: 'In der Küche', cz: 'V kuchyni', en: 'In the kitchen' },
        body: {
          en: 'Bestellung! (Order!) · Abgeholt! (Picked up!) · Service! (Table waiting!) · Vorsicht, heiß! (Careful, hot!) · Zwei Minuten (Two minutes) · Sauber (Clean) · Pause (Break)',
          de: 'Bestellung! · Abgeholt! · Service! · Vorsicht, heiß! · Mise en place · Zwei Minuten · Sauber · Nachschub · Schicht · Pause',
          cz: 'Bestellung! (Objednávka!) · Abgeholt! (Vyzvednuto!) · Service! (Stůl čeká!) · Vorsicht, heiß! (Pozor, horké!) · Zwei Minuten (Dvě minuty) · Sauber (Čisté) · Pause (Přestávka)',
        },
      },
      {
        heading: { de: 'Praktische Situationen', cz: 'Praktické situace', en: 'Practical situations' },
        body: {
          en: "Ich spreche etwas Deutsch (I speak a little German) · Können Sie das bitte wiederholen? (Could you please repeat that?) · Ich verstehe das nicht (I don't understand) · Bitte langsamer (Slower please) · Ich brauche Hilfe (I need help)",
          de: 'Können Sie das bitte wiederholen? · Bitte langsamer · Einen Moment bitte · Ich kümmere mich darum · Entschuldigen Sie die Verspätung · Ich brauche Hilfe.',
          cz: 'Ich spreche etwas Deutsch (Mluvím trochu německy) · Können Sie das bitte wiederholen? (Můžete to zopakovat?) · Ich verstehe das nicht (Nerozumím) · Bitte langsamer (Pomaleji prosím) · Ich brauche Hilfe (Potřebuji pomoc)',
        },
      },
    ],
  },
  {
    slug: 'understanding-your-austrian-contract', category: 'Legal',
    catL: { de: 'Recht', cz: 'Právo', en: 'Legal' },
    title: { de: 'Dein österreichischer Arbeitsvertrag verständlich', cz: 'Rozumět rakouské pracovní smlouvě', en: 'Understanding your Austrian work contract' },
    summary: { de: 'Was der Kollektivvertrag bedeutet, worauf du Anspruch hast und was du vor der Unterschrift prüfen solltest.', cz: 'Co znamená Kollektivvertrag, na co máš nárok a co zkontrolovat před podpisem.', en: "What Kollektivvertrag means, what you're entitled to, and what to check before you sign." },
    min: 7,
    sections: [
      {
        heading: { de: 'Kollektivvertrag (KV)', cz: 'Kollektivvertrag (KV)', en: 'Kollektivvertrag (KV) — the collective agreement' },
        body: {
          en: 'Almost all hospitality roles in Austria fall under a Kollektivvertrag — a sector-wide collective agreement negotiated between employer associations and trade unions. The KV sets minimum wages, maximum hours, overtime rules and holiday entitlements. Your contract cannot pay less than the KV minimum. The hospitality KV is updated annually, usually in December.',
          de: 'Fast alle Stellen in der österreichischen Hotellerie und Gastronomie fallen unter einen Kollektivvertrag — eine branchenweite Vereinbarung zwischen Arbeitgeberverbänden und Gewerkschaften. Der KV legt Mindestlöhne, Höchstarbeitszeiten, Überstundenregeln und Urlaubsansprüche fest. Dein Vertrag darf nicht unter dem KV-Mindestlohn liegen. Der KV wird jährlich, meist im Dezember, aktualisiert.',
          cz: 'Téměř všechny pozice v rakouském pohostinství spadají pod Kollektivvertrag — celooborovou kolektivní smlouvu mezi svazy zaměstnavatelů a odbory. KV stanovuje minimální mzdy, maximální hodiny, pravidla přesčasů a nárok na dovolenou. Tvá smlouva nesmí platit méně než minimum dle KV. KV se aktualizuje každoročně, obvykle v prosinci.',
        },
      },
      {
        heading: { de: 'Bruttolohn vs. Nettolohn', cz: 'Hrubá vs. čistá mzda', en: 'Bruttolohn vs. Nettolohn' },
        body: {
          en: 'Your contract will state a Bruttolohn (gross salary). After deductions for income tax (Lohnsteuer), social insurance (around 18% employee contribution), and housing (if deducted), your Nettolohn (net salary) will be roughly 65–75% of gross for most hospitality salaries. Housing deductions are capped and must appear clearly in your contract.',
          de: 'Dein Vertrag nennt einen Bruttolohn. Nach Abzügen für Lohnsteuer, Sozialversicherung (rund 18% Arbeitnehmeranteil) und Unterkunft (falls abgezogen) liegt dein Nettolohn bei den meisten Hospitality-Gehältern bei etwa 65–75% des Bruttobetrags. Unterkunftsabzüge sind gedeckelt und müssen klar im Vertrag stehen.',
          cz: 'Smlouva uvádí Bruttolohn (hrubou mzdu). Po odečtu daně z příjmu (Lohnsteuer), sociálního pojištění (cca 18% za zaměstnance) a bydlení (pokud se strhává) bude tvá Nettolohn (čistá mzda) zhruba 65–75% hrubé u většiny pozic. Srážky za bydlení jsou omezené a musí být jasně ve smlouvě.',
        },
      },
      {
        heading: { de: 'Arbeitszeiten', cz: 'Pracovní doba', en: 'Working hours' },
        body: {
          en: 'The maximum regular working week is 40 hours, with 8 hours per day. Overtime starts at hour 41 (weekly) or hour 9 (daily) and is paid at 150% of your hourly rate. Shift work is common; you are entitled to at least 11 consecutive hours of rest between shifts.',
          de: 'Die reguläre Höchstarbeitszeit beträgt 40 Stunden pro Woche bzw. 8 Stunden pro Tag. Überstunden beginnen ab der 41. Stunde (wöchentlich) oder der 9. Stunde (täglich) und werden mit 150% des Stundenlohns vergütet. Schichtarbeit ist üblich; dir stehen mindestens 11 zusammenhängende Ruhestunden zwischen den Schichten zu.',
          cz: 'Maximální běžná pracovní doba je 40 hodin týdně, 8 hodin denně. Přesčas začíná od 41. hodiny (týdně) nebo 9. hodiny (denně) a platí se 150% hodinové sazby. Směnný provoz je běžný; máš nárok na minimálně 11 nepřetržitých hodin odpočinku mezi směnami.',
        },
      },
      {
        heading: { de: 'Bezahlter Urlaub', cz: 'Placená dovolená', en: 'Paid leave' },
        body: {
          en: "You are entitled to 5 weeks (25 days) of paid annual leave after your first year. In your first year, leave is proportional to months worked. Public holidays are paid separately. Sick leave: notify your employer immediately and provide a doctor's note within three days.",
          de: 'Nach dem ersten Jahr stehen dir 5 Wochen (25 Tage) bezahlter Jahresurlaub zu. Im ersten Jahr ist der Urlaub anteilig zu den gearbeiteten Monaten. Feiertage werden gesondert bezahlt. Krankenstand: Informiere deinen Arbeitgeber sofort und reiche innerhalb von drei Tagen eine Krankmeldung ein.',
          cz: 'Po prvním roce máš nárok na 5 týdnů (25 dní) placené dovolené. V prvním roce je dovolená poměrná k odpracovaným měsícům. Státní svátky se platí zvlášť. Nemoc: zaměstnavatele informuj ihned a do tří dnů dodej potvrzení od lékaře.',
        },
      },
      {
        heading: { de: 'Was vor der Unterschrift prüfen', cz: 'Co zkontrolovat před podpisem', en: 'What to check before you sign' },
        body: {
          en: '1. The Bruttolohn must be at or above the KV minimum for your position. 2. Housing deduction (if any) should specify the exact amount. 3. The contract should state your working location. 4. Trial period (Probezeit) is usually one month. 5. Check both your notice period and the employer\'s notice period (Kündigungsfrist).',
          de: '1. Der Bruttolohn muss mindestens dem KV-Mindestlohn deiner Position entsprechen. 2. Ein Unterkunftsabzug (falls vorhanden) sollte den genauen Betrag nennen. 3. Der Vertrag sollte deinen Arbeitsort angeben. 4. Die Probezeit beträgt meist einen Monat. 5. Prüfe sowohl deine als auch die Kündigungsfrist des Arbeitgebers.',
          cz: '1. Bruttolohn musí být na úrovni minima dle KV pro tvou pozici, nebo vyšší. 2. Srážka za bydlení (pokud je) má uvádět přesnou částku. 3. Smlouva má uvádět místo výkonu práce. 4. Zkušební doba (Probezeit) bývá jeden měsíc. 5. Zkontroluj svou i zaměstnavatelovu výpovědní lhůtu (Kündigungsfrist).',
        },
      },
    ],
  },
  {
    slug: 'staff-housing-in-austria', category: 'Housing',
    catL: { de: 'Wohnen', cz: 'Bydlení', en: 'Housing' },
    title: { de: 'Personalunterkünfte in österreichischen Hotels', cz: 'Ubytování pro personál v rakouských hotelech', en: 'Staff housing in Austrian hotels' },
    summary: { de: 'Was dich erwartet, was üblicherweise inklusive ist und welche Rechte du als Mieter hast.', cz: 'Co očekávat, co bývá v ceně a jaká máš práva nájemníka.', en: "What to expect, what's usually included, and your rights as a tenant." },
    min: 5,
    sections: [
      {
        heading: { de: 'Wie Personalunterkünfte aussehen', cz: 'Jak ubytování obvykle vypadá', en: 'What staff housing typically looks like' },
        body: {
          en: 'Most Austrian resort hotels offer staff housing in nearby apartment buildings or chalets. A typical arrangement is a shared flat with 2–4 rooms, shared kitchen and bathroom. Private rooms are increasingly common in higher-end properties. City hotels are less likely to offer housing.',
          de: 'Die meisten Resort-Hotels bieten Personalunterkünfte in nahegelegenen Wohnhäusern oder Chalets. Üblich ist eine WG mit 2–4 Zimmern, gemeinsamer Küche und Bad. Einzelzimmer werden in gehobenen Häusern immer häufiger. Stadthotels bieten seltener eine Unterkunft an.',
          cz: 'Většina rakouských střediskových hotelů nabízí ubytování pro personál v okolních domech nebo chatách. Typicky jde o sdílený byt se 2–4 pokoji, společnou kuchyní a koupelnou. V lepších hotelech přibývají samostatné pokoje. Městské hotely ubytování nabízejí méně často.',
        },
      },
      {
        heading: { de: 'Was inklusive ist', cz: 'Co bývá v ceně', en: "What's included" },
        body: {
          en: 'Standard: bed, wardrobe, Wi-Fi, shared kitchen and bathroom. Often included: bedding and towels, basic cleaning supplies. Sometimes included: meals during working shifts (Naturalverpflegung) — this has a small tax value and appears on your payslip. Rarely included: private bathroom, parking.',
          de: 'Standard: Bett, Schrank, WLAN, gemeinsame Küche und Bad. Oft inklusive: Bettwäsche und Handtücher, einfache Reinigungsmittel. Manchmal inklusive: Verpflegung während der Schichten (Naturalverpflegung) — sie hat einen kleinen Steuerwert und erscheint auf der Lohnabrechnung. Selten inklusive: eigenes Bad, Parkplatz.',
          cz: 'Standard: postel, skříň, Wi-Fi, společná kuchyně a koupelna. Často v ceně: ložní prádlo a ručníky, základní úklidové prostředky. Někdy v ceně: strava během směn (Naturalverpflegung) — má malou daňovou hodnotu a je na výplatní pásce. Zřídka v ceně: vlastní koupelna, parkování.',
        },
      },
      {
        heading: { de: 'Unterkunftsabzug', cz: 'Srážka za bydlení', en: 'Housing deduction' },
        body: {
          en: 'If your employer deducts housing from your salary, this must appear in your contract. The maximum deductible amount is set by the Kollektivvertrag — check the current rate before signing. Maximum deductions for a single room are approximately €190–230/month depending on amenities.',
          de: 'Wenn der Arbeitgeber die Unterkunft vom Gehalt abzieht, muss dies im Vertrag stehen. Der Höchstabzug wird vom Kollektivvertrag festgelegt — prüfe den aktuellen Satz vor der Unterschrift. Für ein Einzelzimmer liegt der Höchstabzug je nach Ausstattung bei etwa €190–230/Monat.',
          cz: 'Pokud zaměstnavatel strhává bydlení z platu, musí to být ve smlouvě. Maximální srážku stanovuje Kollektivvertrag — zkontroluj aktuální sazbu před podpisem. Maximální srážka za samostatný pokoj je přibližně €190–230/měsíc podle vybavení.',
        },
      },
      {
        heading: { de: 'Deine Rechte', cz: 'Tvá práva', en: 'Your rights' },
        body: {
          en: 'Housing tied to employment (Dienstgeberwohnung) ends when your employment ends — typically with a notice period specified in your contract. You are a tenant during your employment and have basic tenant rights under Austrian law, including the right to notice before a housing inspection and the right to a habitable, heated space.',
          de: 'An die Beschäftigung gebundene Unterkunft (Dienstgeberwohnung) endet mit dem Arbeitsverhältnis — meist mit einer im Vertrag genannten Frist. Während der Beschäftigung bist du Mieter und hast grundlegende Mieterrechte nach österreichischem Recht, etwa das Recht auf Vorankündigung vor einer Begehung und auf einen bewohnbaren, beheizten Raum.',
          cz: 'Bydlení vázané na zaměstnání (Dienstgeberwohnung) končí s ukončením pracovního poměru — obvykle s lhůtou uvedenou ve smlouvě. Během zaměstnání jsi nájemník a máš základní práva nájemníka dle rakouského práva, včetně práva na oznámení před prohlídkou a na obyvatelný, vytápěný prostor.',
        },
      },
    ],
  },
  {
    slug: 'seasonal-vs-permanent-work', category: 'Work',
    catL: { de: 'Arbeit', cz: 'Práce', en: 'Work' },
    title: { de: 'Saison- vs. Ganzjahresstellen in Österreich', cz: 'Sezónní vs. stálé pozice v Rakousku', en: 'Seasonal vs permanent roles in Austria' },
    summary: { de: 'Vor- und Nachteile beider und wie du deinen Karriereweg in der Hotellerie planst.', cz: 'Výhody a nevýhody obojího a jak si naplánovat kariéru v rakouském pohostinství.', en: 'The pros and cons of each, and how to plan a career path through Austrian hospitality.' },
    min: 6,
    sections: [
      {
        heading: { de: 'Saisonstellen', cz: 'Sezónní pozice', en: 'Seasonal roles' },
        body: {
          en: 'Seasonal contracts typically run December–April (winter) or June–September (summer). They usually include housing, provide excellent experience in high-volume environments, and pay well relative to comparable roles in Czech Republic or Slovakia. The tradeoff: contracts end at season close, and you\'ll need to find your next placement in advance.',
          de: 'Saisonverträge laufen meist von Dezember bis April (Winter) oder Juni bis September (Sommer). Sie beinhalten meist eine Unterkunft, bieten wertvolle Erfahrung in Betrieben mit hohem Aufkommen und zahlen im Vergleich zu Tschechien oder der Slowakei gut. Der Nachteil: Verträge enden mit der Saison, und du musst deine nächste Stelle rechtzeitig finden.',
          cz: 'Sezónní smlouvy obvykle trvají od prosince do dubna (zima) nebo od června do září (léto). Většinou zahrnují bydlení, dají skvělou zkušenost v rušném provozu a platí dobře oproti srovnatelným pozicím v Česku či na Slovensku. Nevýhoda: smlouvy končí s koncem sezóny a další místo si musíš najít s předstihem.',
        },
      },
      {
        heading: { de: 'Ganzjahresstellen', cz: 'Stálé pozice', en: 'Permanent roles' },
        body: {
          en: 'Permanent (ganzjährig) roles are more common in city hotels, large resort chains, and restaurant groups. They offer stability, career progression, and continuous income. Housing is less commonly included. After 5 years of continuous employment, you earn enhanced dismissal protections under Austrian law.',
          de: 'Ganzjährige Stellen sind in Stadthotels, großen Resort-Ketten und Restaurantgruppen häufiger. Sie bieten Stabilität, Aufstiegschancen und durchgehendes Einkommen. Eine Unterkunft ist seltener inklusive. Nach 5 Jahren durchgehender Beschäftigung genießt du nach österreichischem Recht erhöhten Kündigungsschutz.',
          cz: 'Stálé (ganzjährig) pozice jsou běžnější v městských hotelech, velkých řetězcích a restauračních skupinách. Nabízejí stabilitu, kariérní postup a stálý příjem. Bydlení bývá v ceně méně často. Po 5 letech nepřetržitého zaměstnání získáš dle rakouského práva zvýšenou ochranu před výpovědí.',
        },
      },
      {
        heading: { de: 'Karriereweg über die Saison', cz: 'Kariéra přes sezónní práci', en: 'Career path through seasonal work' },
        body: {
          en: 'Many successful hospitality professionals in Austria began with seasonal contracts. A typical path: Season 1 (entry-level kitchen assistant or housekeeper) → Season 2 (commis chef or experienced front desk) → Season 3+ (chef de partie, senior receptionist, supervisor). Each season builds local references and Austrian work history.',
          de: 'Viele erfolgreiche Fachkräfte in Österreich begannen mit Saisonverträgen. Ein typischer Weg: Saison 1 (Küchenhilfe oder Zimmermädchen) → Saison 2 (Commis de Cuisine oder erfahrene Rezeption) → ab Saison 3 (Chef de Partie, erfahrene Rezeption, Supervisor). Jede Saison schafft lokale Referenzen und österreichische Arbeitserfahrung.',
          cz: 'Mnoho úspěšných profesionálů v Rakousku začínalo se sezónními smlouvami. Typická cesta: Sezóna 1 (pomocná síla v kuchyni nebo pokojská) → Sezóna 2 (commis chef nebo zkušená recepce) → Sezóna 3+ (chef de partie, zkušená recepce, supervizor). Každá sezóna buduje místní reference a rakouskou pracovní historii.',
        },
      },
      {
        heading: { de: 'Die Zwei-Saisonen-Strategie', cz: 'Strategie dvou sezón', en: 'The two-season strategy' },
        body: {
          en: 'The most effective approach for candidates from Czech Republic and Slovakia: do one winter season and one summer season in the same region. This builds relationships with local employers, gives you two seasons of Austrian experience, and often leads to a permanent offer. AlpenTalent actively helps with this transition.',
          de: 'Der effektivste Ansatz für Kandidaten aus Tschechien und der Slowakei: eine Wintersaison und eine Sommersaison in derselben Region. Das baut Beziehungen zu lokalen Arbeitgebern auf, gibt dir zwei Saisonen österreichischer Erfahrung und führt oft zu einem ganzjährigen Angebot. AlpenTalent unterstützt diesen Übergang aktiv.',
          cz: 'Nejefektivnější přístup pro kandidáty z Česka a Slovenska: jedna zimní a jedna letní sezóna ve stejném regionu. Buduje to vztahy s místními zaměstnavateli, dá ti dvě sezóny rakouské praxe a často vede k nabídce stálého místa. AlpenTalent s tímto přechodem aktivně pomáhá.',
        },
      },
    ],
  },
];

const UI: Record<string, { back: string; ctaT: string; ctaB: string; ctaBtn: string; more: string; min: (m: number) => string }> = {
  de: { back: '← AlpenLife Ratgeber', ctaT: 'Bereit, deine Stelle zu finden?', ctaB: 'Durchstöbere Hospitality-Jobs in ganz Österreich — mit wohnbewusstem Matching.', ctaBtn: 'Offene Stellen ansehen →', more: 'Weitere Ratgeber', min: m => `${m} Min. Lesezeit` },
  cz: { back: '← AlpenLife rádce', ctaT: 'Připraven najít svou roli?', ctaB: 'Procházej pozice v pohostinství po celém Rakousku — s párováním, které řeší i bydlení.', ctaBtn: 'Procházet volné pozice →', more: 'Další články', min: m => `${m} min čtení` },
  en: { back: '← AlpenLife guide', ctaT: 'Ready to find your role?', ctaB: 'Browse hospitality jobs across Austria — housing-aware matching included.', ctaBtn: 'Browse open roles →', more: 'More guides', min: m => `${m} min read` },
};

export function generateStaticParams() {
  return locales.flatMap(locale => GUIDES.map(g => ({ locale, slug: g.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = normalizeLocale(raw) as Locale;
  const guide = GUIDES.find(g => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title[locale] ?? guide.title.en,
    description: guide.summary[locale] ?? guide.summary.en,
    alternates: {
      canonical: `https://alpentalent.com/${locale}/resources/${slug}`,
      languages: { de: `/de/resources/${slug}`, cs: `/cz/resources/${slug}`, en: `/en/resources/${slug}` },
    },
  };
}

export default async function ResourceDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const u = UI[locale] ?? UI.de;

  const guide = GUIDES.find(g => g.slug === slug);
  if (!guide) notFound();
  const related = GUIDES.filter(g => g.slug !== slug).slice(0, 3);
  const pick = (ls: LS) => ls[locale] ?? ls.en;

  return (
    <SiteShell locale={locale}>
      {/* Article header */}
      <div style={{ background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)', paddingBlock: 'clamp(40px, 6vw, 72px)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <Link href={`/${locale}/resources`} style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-3)' }}>{u.back}</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-2)' }}>
            <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'color-mix(in srgb, var(--at-alpine-green) 14%, transparent)', color: 'var(--at-alpine-green)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{pick(guide.catL)}</span>
            <span style={{ color: 'var(--text-subtle)', fontSize: '0.8125rem' }}>{u.min(guide.min)}</span>
          </div>
          <h1 className="at-display" style={{ margin: '0 0 var(--space-2)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{pick(guide.title)}</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>{pick(guide.summary)}</p>
        </div>
      </div>

      {/* Article body */}
      <div className="at-container" style={{ paddingBlock: 'var(--space-6)', maxWidth: 720 }}>
        <article>
          {guide.sections.map((section, i) => (
            <section key={i} style={{ marginBottom: 'var(--space-5)' }}>
              <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)', color: 'var(--text)' }}>{pick(section.heading)}</h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9375rem' }}>{pick(section.body)}</p>
            </section>
          ))}
        </article>

        {/* CTA */}
        <div className="at-card" style={{ padding: 'var(--space-4)', background: 'color-mix(in srgb, var(--at-alpine-green) 8%, var(--bg-elevated))', border: '1px solid color-mix(in srgb, var(--at-alpine-green) 20%, transparent)', marginTop: 'var(--space-6)', textAlign: 'center' }}>
          <p style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--at-alpine-green)' }}>{u.ctaT}</p>
          <p style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>{u.ctaB}</p>
          <Link href={`/${locale}/jobs`} className="at-btn at-btn--primary">{u.ctaBtn}</Link>
        </div>

        {/* Related guides */}
        {related.length > 0 && (
          <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)' }}>
            <h2 className="at-h2" style={{ margin: '0 0 var(--space-3)' }}>{u.more}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {related.map(g => (
                <Link key={g.slug} href={`/${locale}/resources/${g.slug}`} className="at-card at-card--interactive" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2)', textDecoration: 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-chip)', background: 'color-mix(in srgb, var(--at-alpine-green) 14%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--at-alpine-green)' }} aria-hidden="true">
                    <GuideIcon category={g.category} size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="at-h3" style={{ margin: '0 0 2px', fontSize: '0.9375rem' }}>{pick(g.title)}</p>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{u.min(g.min)}</p>
                  </div>
                  <span style={{ color: 'var(--primary)', flexShrink: 0 }} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
