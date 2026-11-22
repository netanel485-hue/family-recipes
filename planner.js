/* Shabbat meal planner: pick dishes, scale to guests, merged shopping list, prep timeline */
(function(){
'use strict';
let A=null;
const BASE=6; // assumption: one recipe feeds about 6 people (the cards do not state servings)
const PT={
 he:{title:'תכנון ארוחת שבת',chip:'🕯️ ארוחת שבת',bannerT:'מתכננים ארוחת שבת?',bannerS:'בוחרים מנות, מקבלים רשימת קניות מאוחדת ולוח זמנים להכנה.',
  guests:'מספר סועדים',guestsNote:'בכרטיסים לא כתוב לכמה מנות המתכון – מניחים שמתכון אחד מספיק בערך ל-6 סועדים. אפשר לשנות כמות לכל מנה.',
  applyAll:'עדכנו את כל הכמויות לפי הסועדים',tabMenu:'תפריט',tabList:'רשימת קניות',tabTime:'לוח זמנים',
  add:'הוסיפו מנה',close:'סגירה',search:'חיפוש בתוך הקטגוריה…',surprise:'הציעו לי תפריט',clear:'ניקוי התפריט',confirmClear:'לנקות את כל התפריט?',
  emptyMenu:'עוד לא בחרתם מנות',emptyMenuHint:'לחצו על "הוסיפו מנה" בכל קטגוריה, או על "הציעו לי תפריט" לרעיון מהיר.',
  amount:'כמות',when:'מתי מכינים',remove:'הסרה',open:'פתיחה',
  merged:'מרכיבים משותפים (כמויות מאוחדות)',perDish:'שאר המרכיבים – לפי מנה',fromDishes:'מתוך',toTaste:'לפי הטעם',
  copy:'העתקה',copied:'הועתק!',share:'שיתוף',print:'הדפסה',uncheck:'איפוס סימונים',
  listNote:'האיחוד אוטומטי ויעיל לרוב המרכיבים (ביצים, קמח, סוכר, שמן…) אבל כדאי להציץ בכרטיס. מרכיבים ללא כמות (מלח, פלפל) מופיעים כ"לפי הטעם".',
  timeNote:'השיבוץ לימים הוא הצעה שלנו (אפשר לשנות בלשונית "תפריט"). הערות הזמנים לקוחות מהכרטיסים.',
  noDishes:'בחרו קודם מנות בלשונית "תפריט".',nDishes:'מנות',
  w_early:'מראש (יומיים לפני ויותר)',w_thu:'יום חמישי',w_fri_am:'יום שישי בבוקר',w_fri_pm:'שישי אחר הצהריים – ממש לפני שבת',
  total:'סה"כ',guestsShort:'סועדים',menuFor:'תפריט ל-'},
 en:{title:'Shabbat meal planner',chip:'🕯️ Shabbat meal',bannerT:'Planning a Shabbat meal?',bannerS:'Pick dishes, get one merged shopping list and a prep timeline.',
  guests:'Guests',guestsNote:'The cards do not say how many a recipe serves – we assume one recipe feeds about 6. You can change the amount per dish.',
  applyAll:'Update all amounts for this many guests',tabMenu:'Menu',tabList:'Shopping list',tabTime:'Timeline',
  add:'Add a dish',close:'Close',search:'Search in this category…',surprise:'Suggest a menu',clear:'Clear menu',confirmClear:'Clear the whole menu?',
  emptyMenu:'No dishes chosen yet',emptyMenuHint:'Tap "Add a dish" in any section, or "Suggest a menu" for a quick idea.',
  amount:'Amount',when:'Prep day',remove:'Remove',open:'Open',
  merged:'Shared ingredients (amounts combined)',perDish:'Other ingredients – by dish',fromDishes:'from',toTaste:'to taste',
  copy:'Copy',copied:'Copied!',share:'Share',print:'Print',uncheck:'Reset checks',
  listNote:'Merging is automatic and works well for most staples (eggs, flour, sugar, oil…) but glance at the card. Items without an amount (salt, pepper) show as "to taste".',
  timeNote:'The day for each dish is our suggestion (change it in the "Menu" tab). Timing notes come from the cards.',
  noDishes:'Pick some dishes first in the "Menu" tab.',nDishes:'dishes',
  w_early:'Ahead (2+ days before)',w_thu:'Thursday',w_fri_am:'Friday morning',w_fri_pm:'Friday afternoon – right before Shabbat',
  total:'Total',guestsShort:'guests',menuFor:'Menu for '}
};
const SECTIONS=[
 {id:'starter',cats:['starter'],e:'🥣',he:'מנות ראשונות',en:'Starters'},
 {id:'main',cats:['main'],e:'🍗',he:'מנות עיקריות',en:'Main dishes'},
 {id:'side',cats:['side'],e:'🥔',he:'תוספות',en:'Sides'},
 {id:'bread',cats:['bread'],e:'🥖',he:'חלות ולחמים',en:'Challah & breads'},
 {id:'dessert',cats:['cake','cookie','sweet'],e:'🍰',he:'קינוחים',en:'Desserts'},
 {id:'extra',cats:['sauce','breakfast'],e:'🫙',he:'רטבים, מאפינס ועוד',en:'Sauces, muffins & more'}
];
const WHENS=['early','thu','fri-am','fri-pm'];
const WHEN_OVERRIDE={hummus:'early',matbucha:'early','pulled-brisket':'thu','matzah-balls-manischewitz':'thu','matzah-balls-mom':'thu','mushroom-barley-soup':'thu',
  yapchik:'fri-am','veg-kishke':'fri-am','fish-lemon-parsley':'fri-pm','red-fish':'fri-pm','slow-cooker-chicken':'fri-am'};
const WHEN_CAT={starter:'thu',main:'fri-am',side:'fri-am',bread:'fri-am',breakfast:'thu',cake:'thu',cookie:'thu',sweet:'thu',sauce:'thu'};
/* timing facts copied from the cards */
const HINT={
 hummus:{he:'להשרות חומוס 12 שעות מראש; בישול כשעה וחצי',en:'Soak the chickpeas 12 h ahead; ~1.5 h cooking'},
 matbucha:{he:'בישול כ-2.5 שעות בסך הכול',en:'~2.5 h of cooking in total'},
 'pulled-brisket':{he:'6 שעות בסיר איטי על גבוה',en:'6 h in the slow cooker on HIGH'},
 yapchik:{he:'אפייה ארוכה: שעה וחצי ב-220° ואז עד 6 שעות נוספות',en:'Long bake: 1.5 h at high heat, then up to 6 more hours'},
 'slow-cooker-chicken':{he:'8 שעות על נמוך או 4 על גבוה',en:'8 h on LOW or 4 h on HIGH'},
 'challah-sweet':{he:'התפחה 2–3 שעות + שעה, אפייה 25–30 דקות',en:'Rise 2–3 h + 1 h, bake 25–30 min'},
 'cinnamon-buns':{he:'התפחה כשעה + 20 דקות; אפייה 15–17 דקות. הבצק יכול לחכות במקרר עד 3 ימים',en:'~1 h rise + 20 min; bake 15–17 min. Dough keeps in the fridge up to 3 days'},
 'red-chicken':{he:'בישול כשעה',en:'~1 h cooking'},
 pargiyot:{he:'להשהות בנוזל במקרר, ואז 15 דקות חם + חצי שעה מכוסה',en:'Rest in the sauce in the fridge, then 15 min hot + 30 min covered'},
 'matzah-balls-manischewitz':{he:'קירור 20 דקות + בישול 30–40 דקות',en:'Chill 20 min + simmer 30–40 min'},
 'sweet-potato-kugel':{he:'אפייה כשעה וחצי',en:'Bakes ~1.5 h'},
 'green-beans-tomato':{he:'חצי שעה עד שעה של בישול',en:'30–60 min of cooking'},
 'mini-oreo-cheesecakes':{he:'אפייה 22 דקות + קירור 3 שעות',en:'Bake 22 min + chill 3 h'},
 'petit-beurre-squares':{he:'קירור שעה לפני החיתוך',en:'Chill 1 h before cutting'},
 'apple-crisp':{he:'אפייה 50–60 דקות',en:'Bakes 50–60 min'},
 'choc-krispies-bars':{he:'להמתין חצי שעה לפני החיתוך',en:'Wait 30 min before cutting'}
};
const HE={egg:['ביצה','ביצים'],salt:'מלח',flour:'קמח',oil:'שמן',sugar:'סוכר',vanilla:'וניל','baking powder':'אבקת אפייה','brown sugar':'סוכר חום',water:'מים','baking soda':'סודה לשתייה',
 garlic:'שום',onion:['בצל','בצלים'],paprika:'פפריקה',pepper:'פלפל',honey:'דבש',butter:'חמאה',milk:'חלב',chocolate:'שוקולד',ketchup:'קטשופ',cinnamon:'קינמון',cocoa:'קקאו',
 'icing sugar':'אבקת סוכר','chocolate chip':'שוקולד צ\'יפס',tomato:['עגבנייה','עגבניות'],'lemon juice':'מיץ לימון',potato:['תפוח אדמה','תפוחי אדמה'],'soy sauce':'רוטב סויה',
 'olive oil':'שמן זית','salt and pepper':'מלח ופלפל',parsley:'פטרוזיליה',meat:'בשר',beef:'בשר בקר טחון',yeast:'שמרים','whipping cream':'שמנת מתוקה',oat:'שיבולת שועל',
 'white chocolate':'שוקולד לבן','rice krispy':'פריכיות אורז',margarine:'מרגרינה','tomato paste':'רסק עגבניות','cream cheese':'גבינת שמנת','sour cream':'שמנת חמוצה','peanut butter':'חמאת בוטנים',
 raisin:'צימוקים',lemon:['לימון','לימונים'],carrot:['גזר','גזרים'],'poppy seed':'פרג','orange juice':'מיץ תפוזים','sesame seed':'שומשום','bread crumb':'פירורי לחם',breadcrumb:'פירורי לחם',
 cumin:'כמון','garlic powder':'אבקת שום','chicken broth':'ציר עוף'};
const UE={cup:['cup','cups'],tbsp:['tbsp','tbsp'],tsp:['tsp','tsp'],g:['g','g'],kg:['kg','kg'],clove:['clove','cloves'],packet:['packet','packets'],can:['can','cans'],bag:['bag','bags'],stick:['stick','sticks'],oz:['oz','oz'],lb:['lb','lb']};
const UH={cup:['כוס','כוסות'],tbsp:['כף','כפות'],tsp:['כפית','כפיות'],g:['גרם','גרם'],kg:['ק"ג','ק"ג'],clove:['שן שום','שיני שום'],packet:['שקית','שקיות'],can:['קופסה','קופסאות'],bag:['שקית','שקיות'],stick:['מקל','מקלות'],oz:['אונקיה','אונקיות'],lb:['פאונד','פאונד']};

let st=null; // state
const defaultState=()=>({guests:8,items:[],done:[],tab:'menu',open:null,q:''});
function load(){ st=Object.assign(defaultState(),A.store.get('plan',{})); st.open=null; st.q=''; }
const save=()=>A.store.set('plan',{guests:st.guests,items:st.items,done:st.done,tab:st.tab});
const lang=()=>A.getLang();
const pt=k=>(PT[lang()]||PT.he)[k] ?? PT.he[k] ?? k;
const R=()=>A.R, byId=id=>A.R.find(r=>r.id===id);
const esc=s=>A.esc(s);
function sugg(guests){ const x=guests/BASE; return A.MULTS.map(m=>m[0]).reduce((b,c)=>Math.abs(c-x)<Math.abs(b-x)?c:b); }
const defWhen=r=>WHEN_OVERRIDE[r.id]||WHEN_CAT[r.cat]||'thu';
const whenLabel=w=>pt('w_'+w.replace('-','_'));
const multLabel=m=>(A.MULTS.find(x=>x[0]===m)||[0,'×'+m])[1];
const sectionOf=r=>SECTIONS.find(s=>s.cats.includes(r.cat));
const planItem=id=>st.items.find(i=>i.id===id);
function addDish(id){ if(planItem(id)) return; const r=byId(id); st.items.push({id,m:sugg(st.guests),auto:true,when:defWhen(r)}); save(); }
function removeDish(id){ st.items=st.items.filter(i=>i.id!==id); save(); }

/* ----- merged list formatting ----- */
function plural(n){ return /o$/.test(n)?n+'es':/y$/.test(n)?n.slice(0,-1)+'ies':n+'s'; }
const FS=[[0,''],[.125,'⅛'],[.25,'¼'],[1/3,'⅓'],[.375,'⅜'],[.5,'½'],[.625,'⅝'],[2/3,'⅔'],[.75,'¾'],[.875,'⅞']];
function frac(q,step){ q=Math.round(q/step)*step; let w=Math.floor(q+1e-9), f=q-w, b=FS[0]; for(const p of FS) if(Math.abs(f-p[0])<Math.abs(f-b[0])) b=p; return ((w||!b[1])?w:'')+b[1]||'0'; }
function groupText(g,lg){
  const nm=g.name, h=HE[nm];
  if(!g.hasQty){ const nameTxt=lg==='he'?(Array.isArray(h)?h[1]:h||nm):nm; return nameTxt+' ('+pt('toTaste')+')'; }
  let q,unit=g.unit,t=g.total;
  let qs0=null;
  if(g.dim==='vol'){
    const cf=Math.round(t/48*8)/8;
    if(t>=12 && Math.abs(cf*48-t)/t<0.06){q=cf;unit='cup';qs0=frac(cf,.125)}
    else if(t>=3){q=t/3;unit='tbsp';qs0=frac(q,.5)}
    else {q=t;unit='tsp';qs0=frac(q,.25)} }
  else if(g.dim==='wt'){ if(t>=1000){q=Math.round(t/100)/10;unit='kg'} else {q=Math.round(t/5)*5||5;unit='g'} }
  else q=t;
  const qs=qs0!=null?qs0:(g.dim==='wt'?String(q):A.fmtQty(q)), many=q>1.001;
  if(lg==='he'){
    const nameTxt=Array.isArray(h)?(many?h[1]:h[0]):(h||nm);
    if(unit==='clove'&&nm==='garlic') return qs+' '+UH.clove[many?1:0];
    const u=unit?(UH[unit]?UH[unit][many?1:0]:unit):'';
    return [qs,u,nameTxt].filter(Boolean).join(' ');
  }
  if(unit==='clove'&&nm==='garlic') return qs+' '+(many?'cloves':'clove')+' garlic';
  const u=unit?(UE[unit]?UE[unit][many?1:0]:unit):'';
  const nameTxt=(!unit&&many)?plural(nm):nm;
  return [qs,u,nameTxt].filter(Boolean).join(' ');
}
function computeList(){
  const items=st.items.map(i=>{const r=byId(i.id); return r?{rid:r.id,title:r.title,mult:i.m,en:r.ing.en,he:r.ing.he}:null}).filter(Boolean);
  return window.Merge.mergeAll(items,A.scaleIng);
}
function listText(){
  const lg=lang(), gs=computeList(), L=o=>o[lg]||o.he;
  const merged=gs.filter(g=>g.src.length>1), single=gs.filter(g=>g.src.length===1);
  let out=pt('menuFor')+st.guests+' '+pt('guestsShort')+'\n';
  if(merged.length) out+='\n'+pt('merged')+':\n'+merged.map(g=>'• '+groupText(g,lg)).join('\n')+'\n';
  const per={}; single.forEach(g=>{const s=g.src[0];(per[s.rid]=per[s.rid]||{t:s.title,l:[]}).l.push((lg==='he'&&s.lineHe)?s.lineHe:s.lineEn)});
  out+='\n'+pt('perDish')+':\n'+Object.values(per).map(p=>L(p.t)+'\n'+p.l.map(x=>'  • '+x).join('\n')).join('\n');
  return out;
}

/* ----- views ----- */
function view(){
  if(!st) load();
  document.title=pt('title')+' · '+(lang()==='he'?'מתכוני המשפחה':'Family Recipes');
  const app=A.app;
  const tabs=[['menu',pt('tabMenu')],['list',pt('tabList')],['time',pt('tabTime')]];
  app.innerHTML=`
   <div class="section-title"><h2>🕯️ ${pt('title')}</h2><span>${st.items.length} ${pt('nDishes')}</span></div>
   <div class="panel plan-head">
     <div class="guests"><label for="gN">${pt('guests')}</label>
       <div class="stepper"><button id="gMinus" aria-label="−">−</button><input id="gN" type="number" inputmode="numeric" min="1" max="60" value="${st.guests}"><button id="gPlus" aria-label="+">+</button></div>
       <button class="btn" id="applyAll">${pt('applyAll')}</button></div>
     <p class="hint">${pt('guestsNote')}</p></div>
   <div class="tabs" role="tablist">${tabs.map(t=>`<button role="tab" data-tab="${t[0]}" aria-selected="${st.tab===t[0]}">${t[1]}</button>`).join('')}</div>
   <div id="planBody"></div>`;
  const setG=n=>{ st.guests=Math.max(1,Math.min(60,n||1)); save(); view(); };
  $('#gMinus').onclick=()=>setG(st.guests-1); $('#gPlus').onclick=()=>setG(st.guests+1);
  $('#gN').onchange=e=>setG(+e.target.value);
  $('#applyAll').onclick=()=>{ st.items.forEach(i=>{i.m=sugg(st.guests);i.auto=true}); save(); view(); A.toast(pt('applyAll')+' ✓'); };
  app.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{st.tab=b.dataset.tab;save();view()});
  ({menu:viewMenu,list:viewList,time:viewTime}[st.tab]||viewMenu)();
}
const $=s=>A.app.querySelector(s)||document.querySelector(s);

function viewMenu(){
  const lg=lang(), L=o=>o[lg]||o.he, body=$('#planBody');
  let html='';
  if(!st.items.length) html+=`<div class="empty"><b>${pt('emptyMenu')}</b>${pt('emptyMenuHint')}</div>`;
  html+=`<div class="actions"><button class="btn primary" id="rnd">🎲 ${pt('surprise')}</button>${st.items.length?`<button class="btn" id="clr">${pt('clear')}</button>`:''}</div>`;
  for(const sec of SECTIONS){
    const chosen=st.items.filter(i=>{const r=byId(i.id);return r&&sectionOf(r)===sec});
    html+=`<div class="panel plan-sec"><div class="sec-head"><h2>${sec.e} ${esc(L(sec))}</h2><button class="btn" data-open="${sec.id}">${st.open===sec.id?'✕ '+pt('close'):'＋ '+pt('add')}</button></div>`;
    html+=chosen.map(i=>{const r=byId(i.id);
      return `<div class="plan-row"><a class="plan-name" href="#/r/${r.id}">${esc(L(r.title))}</a>
        <label class="sel"><span>${pt('amount')}</span><select data-m="${r.id}">${A.MULTS.map(m=>`<option value="${m[0]}" ${m[0]===i.m?'selected':''}>${m[1]}</option>`).join('')}</select></label>
        <label class="sel"><span>${pt('when')}</span><select data-w="${r.id}">${WHENS.map(w=>`<option value="${w}" ${w===i.when?'selected':''}>${whenLabel(w)}</option>`).join('')}</select></label>
        <button class="btn x" data-rm="${r.id}" aria-label="${pt('remove')}">✕</button></div>`}).join('');
    if(st.open===sec.id){
      const q=st.q.trim().toLowerCase();
      const list=R().filter(r=>sec.cats.includes(r.cat)&&(!q||(r.title.he+' '+r.title.en).toLowerCase().includes(q)));
      html+=`<div class="picker"><input type="search" id="pq" placeholder="${esc(pt('search'))}" value="${esc(st.q)}">
        <div class="pick-list">${list.map(r=>`<button class="pick ${planItem(r.id)?'on':''}" data-pick="${r.id}"><span>${planItem(r.id)?'✓':'＋'}</span> ${esc(L(r.title))}</button>`).join('')||'<p class="hint">—</p>'}</div></div>`;
    }
    html+='</div>';
  }
  body.innerHTML=html;
  const redraw=()=>{ const sc=window.scrollY; save(); view(); window.scrollTo(0,sc); };
  body.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{st.open=st.open===b.dataset.open?null:b.dataset.open;st.q='';view()});
  body.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{const id=b.dataset.pick; planItem(id)?removeDish(id):addDish(id); redraw()});
  body.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{removeDish(b.dataset.rm);redraw()});
  body.querySelectorAll('[data-m]').forEach(s=>s.onchange=()=>{const i=planItem(s.dataset.m);i.m=+s.value;i.auto=false;save()});
  body.querySelectorAll('[data-w]').forEach(s=>s.onchange=()=>{planItem(s.dataset.w).when=s.value;save()});
  const pq=$('#pq'); if(pq){ pq.oninput=()=>{st.q=pq.value; const p=pq.selectionStart; viewMenu(); const n=$('#pq'); n.focus(); n.setSelectionRange(p,p);} }
  $('#rnd').onclick=()=>{
    const pick=(f)=>{const l=R().filter(f); return l[Math.floor(Math.random()*l.length)]};
    st.items=[]; const want=[r=>r.cat==='starter',r=>r.cat==='main',r=>r.cat==='side',r=>r.cat==='side',r=>r.cat==='bread'&&(r.tags||[]).includes('challah'),r=>r.cat==='cake'];
    want.forEach(f=>{const r=pick(x=>f(x)&&!planItem(x.id)); if(r) addDish(r.id)}); redraw();
  };
  const c=$('#clr'); if(c) c.onclick=()=>{ if(confirm(pt('confirmClear'))){st.items=[];st.done=[];save();view()} };
}

function viewList(){
  const lg=lang(), L=o=>o[lg]||o.he, body=$('#planBody');
  if(!st.items.length){ body.innerHTML=`<div class="empty"><b>${pt('noDishes')}</b></div>`; return; }
  const gs=computeList();
  const merged=gs.filter(g=>g.src.length>1).sort((a,b)=>groupText(a,lg).localeCompare(groupText(b,lg)));
  const single=gs.filter(g=>g.src.length===1);
  const per={}; single.forEach(g=>{const s=g.src[0];(per[s.rid]=per[s.rid]||{t:s.title,l:[]}).l.push({key:s.rid+'|'+s.lineEn,txt:(lg==='he'&&s.lineHe)?s.lineHe:s.lineEn})});
  const ck=k=>st.done.includes(k)?'checked':'';
  let html=`<div class="actions"><button class="btn primary" id="cp">📋 ${pt('copy')}</button><button class="btn" id="sh">↗ ${pt('share')}</button><button class="btn" id="pr">🖨 ${pt('print')}</button><button class="btn" id="un">${pt('uncheck')}</button></div>`;
  if(merged.length) html+=`<div class="panel"><h2>🧺 ${pt('merged')}</h2><ul class="ing">${merged.map((g,i)=>{const key='m|'+g.name+'|'+g.dim;
    return `<li><input type="checkbox" id="mg${i}" data-k="${esc(key)}" ${ck(key)}><label for="mg${i}">${esc(groupText(g,lg))}<small class="src">${pt('fromDishes')}: ${esc(g.src.map(s=>L(s.title)).filter((v,i,a)=>a.indexOf(v)===i).join(' · '))}</small></label></li>`}).join('')}</ul></div>`;
  html+=`<div class="panel"><h2>🍽 ${pt('perDish')}</h2>${Object.values(per).map((p,pi)=>`<h3 class="dish-h">${esc(L(p.t))}</h3><ul class="ing">${p.l.map((x,i)=>`<li><input type="checkbox" id="p${pi}_${i}" data-k="${esc(x.key)}" ${ck(x.key)}><label for="p${pi}_${i}">${esc(x.txt)}</label></li>`).join('')}</ul>`).join('')}</div>`;
  html+=`<p class="hint">${pt('listNote')}</p>`;
  body.innerHTML=html;
  body.querySelectorAll('input[data-k]').forEach(cb=>cb.onchange=()=>{const k=cb.dataset.k; st.done=st.done.filter(x=>x!==k); if(cb.checked) st.done.push(k); save()});
  $('#cp').onclick=async()=>{try{await navigator.clipboard.writeText(listText());A.toast(pt('copied'))}catch(e){}};
  $('#sh').onclick=async()=>{try{if(navigator.share)await navigator.share({title:pt('title'),text:listText()});else{await navigator.clipboard.writeText(listText());A.toast(pt('copied'))}}catch(e){}};
  $('#pr').onclick=()=>window.print();
  $('#un').onclick=()=>{st.done=[];save();viewList()};
}

function viewTime(){
  const lg=lang(), L=o=>o[lg]||o.he, body=$('#planBody');
  if(!st.items.length){ body.innerHTML=`<div class="empty"><b>${pt('noDishes')}</b></div>`; return; }
  let html=`<div class="actions"><button class="btn primary" id="cp">📋 ${pt('copy')}</button><button class="btn" id="pr">🖨 ${pt('print')}</button></div>`, txt=pt('menuFor')+st.guests+' '+pt('guestsShort')+'\n';
  for(const w of WHENS){
    const its=st.items.filter(i=>i.when===w); if(!its.length) continue;
    html+=`<div class="panel"><h2>${w==='early'?'🧊':w==='thu'?'📅':w==='fri-am'?'🌅':'🕯️'} ${whenLabel(w)}</h2>`;
    txt+='\n'+whenLabel(w)+':\n';
    html+=its.map(i=>{const r=byId(i.id), h=HINT[r.id]; txt+='• '+L(r.title)+' ('+multLabel(i.m)+')'+(h?' – '+L(h):'')+'\n';
      return `<div class="t-row"><a href="#/r/${r.id}">${esc(L(r.title))}</a> <span class="pill alt">${multLabel(i.m)}</span>${h?`<div class="hint">⏱ ${esc(L(h))}</div>`:''}</div>`}).join('');
    html+='</div>';
  }
  html+=`<p class="hint">${pt('timeNote')}</p>`;
  body.innerHTML=html;
  $('#cp').onclick=async()=>{try{await navigator.clipboard.writeText(txt);A.toast(pt('copied'))}catch(e){}};
  $('#pr').onclick=()=>window.print();
}

window.Planner={
  init(api){ A=api; load(); },
  view,
  chipLabel:()=>pt('chip'),
  banner:()=>`<a class="plan-banner" href="#/plan"><span class="e">🕯️</span><span><b>${esc(pt('bannerT'))}</b><small>${esc(pt('bannerS'))}</small></span><span class="go">›</span></a>`
};
})();
