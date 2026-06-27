import{NextResponse,type NextRequest}from'next/server';import{createServerClient}from'@supabase/ssr';import{createAdminClient}from'../../../lib/supabase/admin';
const roles=['candidate','employer','partner'] as const;type Role=typeof roles[number];
export async function GET(request:NextRequest){
  const url=new URL(request.url),code=url.searchParams.get('code'),raw=url.searchParams.get('role');
  const requested=(roles as readonly string[]).includes(raw||'')?raw as Role:'candidate';
  // Surface a provider error (e.g. Google/Supabase returned error instead of a code).
  const providerErr=url.searchParams.get('error_description')||url.searchParams.get('error');
  if(providerErr){const u=new URL('/login?error=oauth',url);u.searchParams.set('detail',providerErr);return NextResponse.redirect(u);}
  if(!code)return NextResponse.redirect(new URL('/login?error=missing_code',url));
  // Bind the Supabase client to a response so session cookies are actually written.
  let carrier=NextResponse.next();
  const supabase=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll(){return request.cookies.getAll()},setAll(items){items.forEach(({name,value,options})=>carrier.cookies.set(name,value,options))}}});
  const{data,error}=await supabase.auth.exchangeCodeForSession(code);
  if(error||!data.user){const u=new URL('/login?error=oauth',url);u.searchParams.set('detail',error?.message||'no_user');const vc=request.cookies.getAll().some(c=>c.name.includes('code-verifier'));u.searchParams.set('vc',vc?'1':'0');return NextResponse.redirect(u);}
  const admin=createAdminClient();
  const{data:existing}=await admin.from('users').select('role').eq('id',data.user.id).maybeSingle();
  const role=(existing?.role??requested) as Role;
  if(!existing)await admin.from('users').insert({id:data.user.id,email:data.user.email??'',google_id:data.user.user_metadata?.sub??data.user.id,role});
  const table=role==='candidate'?'candidate_profiles':role==='employer'?'employer_profiles':'partner_profiles';
  const{data:profile}=await admin.from(table).select('user_id').eq('user_id',data.user.id).maybeSingle();
  const dest=new URL(`/${role}/${profile?'dashboard':'onboarding'}`,url);
  const redirect=NextResponse.redirect(dest);
  // Carry the session cookies set during exchange onto the redirect response.
  carrier.cookies.getAll().forEach(({name,value,...options})=>redirect.cookies.set(name,value,options));
  return redirect;
}
