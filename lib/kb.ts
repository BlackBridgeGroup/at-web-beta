import{readFileSync}from'fs';import{join}from'path';
export type Locale='de'|'cz'|'en';
export function normalizeLocale(input?:string|null):Locale{if(input==='cs'||input==='cz')return'cz';if(input==='en')return'en';return'de'}
export function readKb(locale?:string|null){const lang=normalizeLocale(locale);return readFileSync(join(process.cwd(),'content','kb',`${lang}.md`),'utf8')}
export function searchKb(query:string,locale?:string|null){const kb=readKb(locale);const terms=query.toLowerCase().split(/\W+/).filter(Boolean);const chunks=kb.split(/\n## /).map((x,i)=>i?'## '+x:x).filter(Boolean);const scored=chunks.map(chunk=>({chunk,score:terms.reduce((n,t)=>n+(chunk.toLowerCase().includes(t)?1:0),0)})).sort((a,b)=>b.score-a.score);return scored.filter(x=>x.score>0).slice(0,3).map(x=>x.chunk).join('\n\n')||chunks.slice(0,2).join('\n\n')}
