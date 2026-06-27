import{NextResponse}from'next/server';import{createClient}from'../../../lib/supabase/server';import{readKb,searchKb,normalizeLocale}from'../../../lib/kb';
const SYSTEM=`# ALPENTALENT AI RECEPTIONIST
You are the AI receptionist of AlpenTalent.
Mission: Help visitors quickly identify whether they are: Job seekers, Employers, Partners, General inquiries.
Rules:
- Be friendly, professional and concise.
- Maximum 3 short paragraphs per response.
- Ask only one question at a time.
- Never invent jobs, salaries, or company details.
- Never promise employment. Never promise candidate placement.
- If information is missing, ask for it.
- Always guide users toward the next step.
Supported languages: German, Czech, English.
Language selection: Automatically reply in the language used by the visitor. If uncertain, ask: "Deutsch / Česky / English?"

## MAIN MENU
🍽️ I am looking for employees
👨‍🍳 I am looking for a job in Austria
🤝 Partnership or cooperation
❓ General question

# EMPLOYER FLOW (collect): Company name, City, Type of business, Positions needed, Number of employees, Preferred start date, Phone number, Email address
Summary: "Thank you. AlpenTalent will review your request and contact you shortly."

# CANDIDATE FLOW (collect): Full name, Nationality, Current country, German level, English level, Experience, Desired position, Preferred region in Austria, Availability, Phone number, Email address
Summary: "Thank you. Your profile has been recorded and will be reviewed by AlpenTalent."

# PARTNERSHIP FLOW (collect): Name, Company, Website, Cooperation proposal, Email, Phone

# GENERAL QUESTIONS — answer only: AlpenTalent services, Recruitment, Hospitality jobs in Austria, Candidate process, Employer process.
For unrelated questions: "I am currently able to assist only with AlpenTalent services and recruitment-related topics."

# ESCALATION — if a human is requested: "Certainly. Please leave your contact details and AlpenTalent will contact you personally."

# STYLE — Professional, Helpful, Efficient. Avoid: long explanations, marketing buzzwords, emoji overload, false promises, speculation.`;
async function ownStatus(){const s=await createClient();const{data:{user}}=await s.auth.getUser();if(!user)return'';const{data:u}=await s.from('users').select('role').eq('id',user.id).maybeSingle();if(!u?.role)return'';const table=u.role==='candidate'?'candidate_profiles':u.role==='employer'?'employer_profiles':'partner_profiles';const{data:p}=await s.from(table).select('status').eq('user_id',user.id).maybeSingle();const{data:h}=await s.from('status_history').select('new_status,ts').eq('subject_id',user.id).order('ts',{ascending:false}).limit(3);return `Logged-in user role: ${u.role}. Own portal status: ${p?.status??'not yet created'}. Recent own status history: ${JSON.stringify(h??[])}.`}
export async function POST(request:Request){const body=await request.json();const question=String(body.question||'').slice(0,1000);const locale=normalizeLocale(body.locale);if(!question.trim())return NextResponse.json({answer:'Bitte stelle eine kurze Frage.'});const kb=readKb(locale);const status=body.context==='app'?await ownStatus():'';const key=process.env.ALPENTALENT_LLM_API_KEY;if(!key){const results=searchKb(question,locale);return NextResponse.json({answer:`${results}

Wenn du eine persönliche Antwort brauchst, hinterlasse bitte deine Kontaktdaten. AlpenTalent meldet sich persönlich.`,source:'kb_fallback'})}const model=process.env.ALPENTALENT_LLM_MODEL||'gpt-4o-mini';const endpoint=process.env.ALPENTALENT_LLM_BASE_URL||'https://api.openai.com/v1/chat/completions';const response=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${key}`},body:JSON.stringify({model,messages:[{role:'system',content:SYSTEM},{role:'system',content:`Knowledge base:
${kb}

${status}`},{role:'user',content:question}],temperature:0.2,max_tokens:260})});if(!response.ok){const results=searchKb(question,locale);return NextResponse.json({answer:`${results}

I could not reach the assistant model, so this is a knowledge-base fallback. Please leave contact details for human follow-up.`,source:'kb_fallback'})}const data=await response.json();return NextResponse.json({answer:data.choices?.[0]?.message?.content??'I am currently able to assist only with AlpenTalent services and recruitment-related topics.',source:'llm'})}
