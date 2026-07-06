# AlpenTalent launch operations runbook

This is the non-design checklist for running the public site once it starts receiving real leads.

## Lead flow

Public forms write into Supabase table `receptionist_leads`.

Lead statuses created by the website:

- `NEW_CANDIDATE_LEAD` — candidate questionnaire or candidate contact form.
- `NEW_EMPLOYER_LEAD` — employer contact form or receptionist employer flow.
- `NEW_PARTNER_LEAD` — partner contact form or receptionist partner flow.
- `NEW_LEAD` — general contact.

Recommended next statuses for manual/CRM workflow:

- `CONTACTED` — first human reply sent.
- `QUALIFIED` — role/profile/business need is clear.
- `IN_PROGRESS` — actively matching, sourcing, or arranging next step.
- `WAITING_ON_LEAD` — waiting for candidate, employer, or partner.
- `CLOSED_WON` — placement, client agreement, or relevant conversion.
- `CLOSED_LOST` — not a fit, no response, or withdrawn.

## Webhook destination

Set `PUBLIC_LEAD_WEBHOOK_URL` in production if leads should also go to Make, Zapier, n8n, Google Sheets, Airtable, HubSpot, Pipedrive, Slack, or email.

Webhook payload:

```json
{
  "kind": "candidate",
  "locale": "cz",
  "source": "public_questionnaire",
  "status": "NEW_CANDIDATE_LEAD",
  "payload": {
    "name": "Name",
    "email": "email@example.com",
    "phone": "+43...",
    "source": "public_questionnaire",
    "submitted_at": "2026-07-06T12:00:00.000Z"
  }
}
```

If the webhook is down, the API still accepts the lead after the Supabase insert succeeds.

## Triage rules

Candidate lead:

- Reply in the same language as the submitted locale when possible.
- Confirm preferred contact channel.
- Ask for CV or recent work history if missing.
- Capture desired start date, region, accommodation need, language level, and target role.
- Move to `QUALIFIED` only after contact details and work eligibility are clear.

Employer lead:

- Confirm hiring entity, property type, location, desired roles, start date, salary range, housing, and contract type.
- Ask whether AlpenTalent may send a candidate shortlist.
- Move to `QUALIFIED` only after the hiring need and commercial next step are clear.

Partner lead:

- Clarify partner type, geography, audience, and expected collaboration model.
- Move to `IN_PROGRESS` only after there is a named next step.

General lead:

- Route to candidate, employer, partner, or support workflow after first reply.

## First reply templates

### Candidate — Czech

Předmět: AlpenTalent — díky za profil

Ahoj {{name}},

díky za vyplnění profilu. Projdu tvoje zkušenosti, jazykovou úroveň, dostupnost a regiony, které dávají smysl pro Rakousko.

Pošli mi prosím ještě CV nebo krátký přehled posledních pozic, pokud už nebyl ve formuláři. Ozvu se ti s dalším krokem na {{preferred_contact}}.

Patrik  
AlpenTalent

### Candidate — German

Betreff: AlpenTalent — danke für dein Profil

Hallo {{name}},

danke für dein Profil. Ich prüfe Erfahrung, Sprachlevel, Verfügbarkeit und passende Regionen in Österreich.

Bitte schick mir noch deinen Lebenslauf oder eine kurze Übersicht deiner letzten Stationen, falls das noch nicht im Formular stand. Ich melde mich mit dem nächsten Schritt über {{preferred_contact}}.

Patrik  
AlpenTalent

### Candidate — English

Subject: AlpenTalent — thanks for your profile

Hi {{name}},

thanks for sending your profile. I will review your experience, language level, availability, and suitable Austrian regions.

Please send your CV or a short summary of recent roles if it was not included in the form. I will follow up on {{preferred_contact}} with the next step.

Patrik  
AlpenTalent

### Employer — German

Betreff: AlpenTalent — danke für Ihre Anfrage

Hallo {{name}},

danke für Ihre Anfrage. Damit ich einschätzen kann, ob AlpenTalent passende Kandidaten liefern kann, brauche ich kurz:

- Standort und Betriebstyp
- gesuchte Rollen und Startdatum
- Gehaltsspanne, Unterkunft und Vertragsart
- gewünschter Ablauf für die erste Kandidatenvorstellung

Danach kann ich Ihnen den passenden nächsten Schritt vorschlagen.

Patrik  
AlpenTalent

### Employer — English

Subject: AlpenTalent — thanks for your request

Hi {{name}},

thanks for reaching out. To check whether AlpenTalent can support the hiring need, please send:

- location and property type
- roles needed and target start date
- salary range, housing setup, and contract type
- preferred process for the first candidate shortlist

After that I can suggest the right next step.

Patrik  
AlpenTalent

## Production smoke checklist

Run after each deploy:

- `/de`, `/cz`, `/en` return HTTP 200.
- `/de/fragebogen` candidate form submits and creates `NEW_CANDIDATE_LEAD`.
- `/de/contact` employer/general contact form submits and creates the matching lead status.
- `/candidate/dashboard`, `/employer/dashboard`, and `/partner/dashboard` redirect to `/login`.
- `/sitemap.xml` includes only public pages.
- `/robots.txt` disallows app, login, API, and styleguide paths.
- Supabase auth callback URL matches the production domain.
- `PUBLIC_LEAD_WEBHOOK_URL` is present in production if external notifications are required.
