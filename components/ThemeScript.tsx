/* Inline script — runs before hydration to set data-theme without flash.
   Auto mode: CET/CEST time-based (light 07:00–18:59, dark otherwise). */
export function ThemeScript() {
  const script = `(function(){try{
    var t=localStorage.getItem('at-theme');
    if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}
    else{var h=new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Vienna'})).getHours();document.documentElement.setAttribute('data-theme',(h>=7&&h<19)?'light':'dark');}
  }catch(e){}})()`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
