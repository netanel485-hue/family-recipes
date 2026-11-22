(function(){
'use strict';
const R = window.RECIPES;
const CATS = [
  {id:'starter',  e:'🥣', c:'--c-starter',  he:'מנות ראשונות', en:'Starters'},
  {id:'main',     e:'🍗', c:'--c-main',     he:'מנות עיקריות', en:'Main dishes'},
  {id:'side',     e:'🥔', c:'--c-side',     he:'תוספות',       en:'Sides'},
  {id:'bread',    e:'🥖', c:'--c-bread',    he:'חלות ולחמים',  en:'Breads & challah'},
  {id:'breakfast',e:'🧇', c:'--c-breakfast',he:'בוקר ומאפינס', en:'Breakfast & muffins'},
  {id:'cake',     e:'🍰', c:'--c-cake',     he:'עוגות וקינוחים',en:'Cakes & desserts'},
  {id:'cookie',   e:'🍪', c:'--c-cookie',   he:'עוגיות',       en:'Cookies'},
  {id:'sweet',    e:'🍫', c:'--c-sweet',    he:'חטיפים ומתוקים',en:'Sweets & snacks'},
  {id:'sauce',    e:'🫙', c:'--c-sauce',    he:'רטבים וציפויים',en:'Sauces & icings'}
];
const catById = Object.fromEntries(CATS.map(c=>[c.id,c]));
const T = {
 he:{siteName:'מתכוני המשפחה',tagline:'מהמחברת והקלסר – לכל דור',searchPh:'חיפוש מתכון או מרכיב… (עברית או English)',
  surprise:'הפתיעו אותי',favs:'מועדפים',footer:'נבנה באהבה ממתכוני המשפחה · הצילומים הם הכרטיסים המקוריים',
  all:'הכול',recipes:'מתכונים',categories:'קטגוריות',results:'תוצאות',noRes:'לא נמצא כלום',noResHint:'נסו מילה אחרת, או חפשו לפי מרכיב (למשל: שוקולד, chicken, שום).',
  home:'ראשי',ingredients:'מרכיבים',method:'הוראות הכנה',notes:'הערות',photos:'הכרטיס המקורי',tapZoom:'לחצו על התמונה להגדלה ולבדיקה מול הכתב המקורי.',
  incomplete:'בכרטיס המקורי אין הוראות הכנה (או שהן חלקיות) – ראו את הצילום.',
  print:'הדפסה',share:'שיתוף',cook:'מצב בישול',cookOn:'מצב בישול פעיל',fav:'שמירה',faved:'במועדפים',copy:'העתקת מרכיבים',copied:'הועתק!',
  serves:'מנות',credit:'מקור',binderA:'מהמחברת',binderB:'מהקלסר האדום',
  variants:'גרסאות נוספות במשפחה',alsoFamily:'עוד מהמשפחה',
  similar:'מתכונים דומים ברשת',twist:'קשורים – אבל שונים',
  gSearch:'חיפוש בגוגל',yt:'סרטונים ביוטיוב',pin:'תמונות והשראה',
  siteSearchNote:'הקישורים פותחים חיפוש באינטרנט – לא מתכונים שנבדקו על ידינו.',
  favEmpty:'עוד לא שמרתם מועדפים',favEmptyHint:'לחצו על ♡ בתוך מתכון כדי לשמור אותו כאן.',
  favTitle:'המועדפים שלי',back:'חזרה',clear:'נקה חיפוש',of:'מתוך',viewing:'מציג'},
 en:{siteName:'Family Recipes',tagline:'From our notebook & binder – for every generation',searchPh:'Search a recipe or ingredient… (English or עברית)',
  surprise:'Surprise me',favs:'Favorites',footer:'Made with love from our family recipes · photos are the original cards',
  all:'All',recipes:'recipes',categories:'Categories',results:'results',noRes:'Nothing found',noResHint:'Try another word, or search by ingredient (e.g. chocolate, עוף, garlic).',
  home:'Home',ingredients:'Ingredients',method:'Method',notes:'Notes',photos:'Original card',tapZoom:'Tap the photo to enlarge and check against the original handwriting.',
  incomplete:'The original card has no (or only a partial) method – see the photo.',
  print:'Print',share:'Share',cook:'Cooking mode',cookOn:'Cooking mode on',fav:'Save',faved:'Saved',copy:'Copy ingredients',copied:'Copied!',
  serves:'Serves',credit:'Source',binderA:'From the notebook',binderB:'From the red binder',
  variants:'Other family versions',alsoFamily:'More from the family',
  similar:'Similar recipes online',twist:'Related – but different',
  gSearch:'Search Google',yt:'Videos on YouTube',pin:'Photos & inspiration',
  siteSearchNote:'These links open a web search – they are not recipes we have tested.',
  favEmpty:'No favorites yet',favEmptyHint:'Tap ♡ inside a recipe to keep it here.',
  favTitle:'My favorites',back:'Back',clear:'Clear search',of:'of',viewing:'Showing'}
};

/* ---------- state ---------- */
const store = {
  get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
let lang = store.get('lang', (navigator.language||'he').toLowerCase().startsWith('en') ? 'en' : 'he');
let favs = new Set(store.get('favs', []));
let q = '';
const $ = s=>document.querySelector(s);
const app = $('#app');
const t = k => (T[lang][k] ?? T.he[k] ?? k);
const L = o => (o && (o[lang] ?? o.he ?? o.en)) || '';
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- search index ---------- */
const norm = s => String(s||'').toLowerCase().replace(/[֑-ׇ]/g,'').replace(/[׳'’"״]/g,'').replace(/[ךםןףץ]/g,m=>({'ך':'כ','ם':'מ','ן':'נ','ף':'פ','ץ':'צ'}[m]));
R.forEach(r=>{
  r._cat = catById[r.cat];
  r._idx = norm([r.title.he,r.title.en,(r.ing.he||[]).join(' '),(r.ing.en||[]).join(' '),(r.tags||[]).join(' '),r.credit||'',r._cat.he,r._cat.en].join(' | '));
  r._title = norm(r.title.he+' '+r.title.en);
});
function search(query){
  const toks = norm(query).split(/\s+/).filter(Boolean);
  if(!toks.length) return R.slice();
  const out=[];
  for(const r of R){
    let score=0, ok=true;
    for(const tk of toks){
      let hit = r._idx.includes(tk);
      if(!hit && tk.length>3 && /[א-ת]/.test(tk)) hit = r._idx.includes(tk.slice(1)); // Hebrew prefix (ה/ב/ל…)
      if(!hit){ok=false;break}
      score += r._title.includes(tk)?5:1;
    }
    if(ok) out.push([score,r]);
  }
  return out.sort((a,b)=>b[0]-a[0]).map(x=>x[1]);
}

/* ---------- helpers ---------- */
function setLang(l){
  lang=l; store.set('lang',l);
  document.documentElement.lang=l; document.documentElement.dir = l==='he'?'rtl':'ltr';
  $('#langBtn').textContent = l==='he'?'EN':'עב';
  document.querySelectorAll('[data-i18n]').forEach(n=>n.textContent=t(n.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(n=>n.placeholder=t(n.dataset.i18nPh));
  document.querySelectorAll('[data-i18n-title]').forEach(n=>{n.title=t(n.dataset.i18nTitle)});
  document.title = t('siteName')+' · '+(l==='he'?'Family Recipes':'מתכוני המשפחה');
  render();
}
function toast(msg){const d=document.createElement('div');d.className='toast';d.textContent=msg;document.body.appendChild(d);setTimeout(()=>d.remove(),1800)}
function saveFavs(){store.set('favs',[...favs]);}
const count = id => R.filter(r=>r.cat===id).length;
const srcLabel = r => r.src==='A'?t('binderA'):t('binderB');

function card(r){
  const cat=r._cat;
  const thumb = r.dish ? `<img src="${esc(r.dish)}" alt="" loading="lazy">` : cat.e;
  return `<a class="card" href="#/r/${r.id}">
    <div class="thumb" style="background:var(${cat.c})">${thumb}${favs.has(r.id)?'<span class="fav-dot" aria-hidden="true">♥</span>':''}</div>
    <div class="card-body"><h3>${esc(L(r.title))}</h3>
    <div class="meta"><span class="pill">${esc(L(cat))}</span><span class="pill alt">${esc(srcLabel(r))}</span>${r.inc?'':''}</div></div></a>`;
}
function chips(active){
  return `<nav class="chips" aria-label="${esc(t('categories'))}">
   <button class="chip" data-go="#/" ${active==='all'?'aria-current="true"':''}>${t('all')}<span class="count">${R.length}</span></button>
   ${CATS.map(c=>`<button class="chip" data-go="#/c/${c.id}" ${active===c.id?'aria-current="true"':''}>${c.e} ${esc(L(c))}<span class="count">${count(c.id)}</span></button>`).join('')}</nav>`;
}

/* ---------- views ---------- */
function viewHome(){
  if(q.trim()){
    const res=search(q);
    app.innerHTML = chips('all') + `<div class="section-title"><h2>${res.length} ${t('results')}</h2><button class="btn" id="clr">${t('clear')}</button></div>` +
      (res.length?`<div class="grid">${res.map(card).join('')}</div>`:`<div class="empty"><b>${t('noRes')}</b>${t('noResHint')}</div>`);
    return;
  }
  app.innerHTML = chips('all') +
   `<div class="section-title"><h2>${t('categories')}</h2><span>${R.length} ${t('recipes')}</span></div>
    <div class="cats">${CATS.map(c=>`<a class="cat-tile" href="#/c/${c.id}" style="background:var(${c.c})"><span class="e">${c.e}</span><b>${esc(L(c))}</b><small>${count(c.id)} ${t('recipes')}</small></a>`).join('')}</div>
    <div class="section-title"><h2>${t('all')}</h2></div>
    <div class="grid">${R.map(card).join('')}</div>`;
}
function viewCat(id){
  const c=catById[id]; if(!c) return viewHome();
  const list = (q.trim()?search(q):R).filter(r=>r.cat===id);
  app.innerHTML = chips(id) + `<div class="section-title"><h2>${c.e} ${esc(L(c))}</h2><span>${list.length} ${t('recipes')}</span></div>` +
    (list.length?`<div class="grid">${list.map(card).join('')}</div>`:`<div class="empty"><b>${t('noRes')}</b>${t('noResHint')}</div>`);
}
function viewFavs(){
  const list=R.filter(r=>favs.has(r.id));
  app.innerHTML = `<div class="section-title"><h2>♥ ${t('favTitle')}</h2><span>${list.length}</span></div>` +
    (list.length?`<div class="grid">${list.map(card).join('')}</div>`:`<div class="empty"><b>${t('favEmpty')}</b>${t('favEmptyHint')}</div>`);
}

function externalLinks(r){
  const he = lang==='he';
  const name = he ? r.title.he : r.title.en;
  const g = s => 'https://www.google.com/search?q='+encodeURIComponent(s);
  const y = s => 'https://www.youtube.com/results?search_query='+encodeURIComponent(s);
  const base = he ? name+' מתכון' : name+' recipe';
  const items=[
    [t('gSearch'), he?'גוגל':'Google', g(base)],
    [t('yt'), 'YouTube', y(base)],
    [t('pin'), he?'גוגל תמונות':'Google Images', 'https://www.google.com/search?tbm=isch&q='+encodeURIComponent(base)]
  ];
  if(he) items.push(['אתרי מתכונים ישראליים','Mako · Foody · Israel Hayom', g(name+' מתכון site:foody.co.il OR site:mako.co.il OR site:www.bishulim.co.il')]);
  else items.push(['Big recipe sites','Allrecipes · Tasty · NYT Cooking', g(name+' recipe site:allrecipes.com OR site:tasty.co OR site:cooking.nytimes.com')]);
  let html = `<div class="panel links-panel"><h2>🔗 ${t('similar')}</h2><div class="links">${items.map(i=>`<a href="${esc(i[2])}" target="_blank" rel="noopener noreferrer"><span>${esc(i[0])}</span><small>${esc(i[1])} ↗</small></a>`).join('')}</div>`;
  if(r.tw && r.tw.length){
    html += `<h2 style="margin-top:18px">✨ ${t('twist')}</h2><div class="links">${r.tw.map(p=>{
      const label = he?p[0]:p[1]; const query = he? p[0]+' מתכון' : p[1]+' recipe';
      return `<a href="${esc(g(query))}" target="_blank" rel="noopener noreferrer"><span>${esc(label)}</span><small>↗</small></a>`}).join('')}</div>`;
  }
  html += `<p class="hint">${t('siteSearchNote')}</p></div>`;
  return html;
}
function familyRelated(r){
  const variants = r.group ? R.filter(x=>x.group===r.group && x.id!==r.id) : [];
  const vi = new Set(variants.map(v=>v.id));
  const tags=new Set(r.tags||[]);
  const sim = R.filter(x=>x.id!==r.id && !vi.has(x.id))
    .map(x=>[(x.tags||[]).filter(g=>tags.has(g)).length + (x.cat===r.cat?0.5:0), x])
    .filter(p=>p[0]>=1).sort((a,b)=>b[0]-a[0]).slice(0,4).map(p=>p[1]);
  const mini = x=>`<a class="mini" href="#/r/${x.id}" style="background:var(${x._cat.c})"><span class="e">${x._cat.e}</span><b>${esc(L(x.title))}</b></a>`;
  let html='';
  if(variants.length) html+=`<div class="panel"><h2>👨‍👩‍👧 ${t('variants')}</h2><div class="mini-grid">${variants.map(mini).join('')}</div></div>`;
  if(sim.length) html+=`<div class="panel"><h2>🏠 ${t('alsoFamily')}</h2><div class="mini-grid">${sim.map(mini).join('')}</div></div>`;
  return html;
}

let currentPhotos=[], lbIdx=0;
function viewRecipe(id){
  const r=R.find(x=>x.id===id); if(!r) return viewHome();
  const cat=r._cat, ing=r.ing[lang]||r.ing.he, steps=(r.steps&&(r.steps[lang]||r.steps.he))||[];
  const checked = new Set(store.get('chk:'+id,[]));
  const serves = r.serves ? (typeof r.serves==='string'?r.serves:L(r.serves)) : '';
  currentPhotos = r.photos.map(p=>'img/'+p+'.jpg');
  document.title = L(r.title)+' · '+t('siteName');
  app.innerHTML = `
  <div class="crumbs"><a href="#/">${t('home')}</a> › <a href="#/c/${cat.id}">${esc(L(cat))}</a></div>
  <div class="hero" style="background:var(${cat.c})"><span class="e">${cat.e}</span><div><h1>${esc(L(r.title))}</h1>
    <div class="meta"><span class="pill">${esc(L(cat))}</span><span class="pill alt">${esc(srcLabel(r))}</span>${serves?`<span class="pill alt">${t('serves')}: ${esc(serves)}</span>`:''}${r.credit?`<span class="pill alt">${t('credit')}: ${esc(r.credit)}</span>`:''}</div></div></div>
  <div class="actions">
    <button class="btn primary" id="favBtn" aria-pressed="${favs.has(id)}">${favs.has(id)?'♥ '+t('faved'):'♡ '+t('fav')}</button>
    <button class="btn" id="cookBtn" aria-pressed="false">👩‍🍳 ${t('cook')}</button>
    <button class="btn" id="copyBtn">📋 ${t('copy')}</button>
    <button class="btn" id="shareBtn">↗ ${t('share')}</button>
    <button class="btn" id="printBtn">🖨 ${t('print')}</button>
  </div>
  <div class="detail">
   <div class="col-side">
    <div class="panel"><h2>🧺 ${t('ingredients')}</h2><ul class="ing">${ing.map((x,i)=>`<li><input type="checkbox" id="i${i}" data-i="${i}" ${checked.has(i)?'checked':''}><label for="i${i}">${esc(x)}</label></li>`).join('')}</ul></div>
    <div class="panel photos-panel"><h2>📷 ${t('photos')}</h2><div class="photos">${currentPhotos.map((p,i)=>`<button data-photo="${i}" aria-label="${t('photos')} ${i+1}"><img src="${p}" alt="" loading="lazy"></button>`).join('')}</div><p class="hint">${t('tapZoom')}</p></div>
   </div>
   <div class="col-main">
    <div class="panel"><h2>👩‍🍳 ${t('method')}</h2>
      ${steps.length?`<ol class="steps">${steps.map(s=>`<li><span>${esc(s)}</span></li>`).join('')}</ol>`:''}
      ${(!steps.length||r.inc)?`<div class="note warn">⚠️ ${t('incomplete')}</div>`:''}
      ${r.note?`<div class="note">📝 ${esc(L(r.note))}</div>`:''}
    </div>
    ${familyRelated(r)}
    ${externalLinks(r)}
   </div>
  </div>`;
  window.scrollTo(0,0);
  // handlers
  $('#favBtn').onclick=()=>{ favs.has(id)?favs.delete(id):favs.add(id); saveFavs(); viewRecipe(id); syncFavBtn(); };
  $('#printBtn').onclick=()=>window.print();
  $('#copyBtn').onclick=async()=>{try{await navigator.clipboard.writeText(L(r.title)+'\n\n'+ing.map(x=>'• '+x).join('\n'));toast(t('copied'))}catch(e){}};
  $('#shareBtn').onclick=async()=>{const data={title:L(r.title),url:location.href};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(location.href);toast(t('copied'))}}catch(e){}};
  let wl=null;
  $('#cookBtn').onclick=async(e)=>{
    const on=document.body.classList.toggle('cooking'); e.currentTarget.setAttribute('aria-pressed',on);
    try{ if(on && 'wakeLock' in navigator){wl=await navigator.wakeLock.request('screen'); toast(t('cookOn'))} else if(wl){await wl.release();wl=null} }catch(err){}
  };
  app.querySelectorAll('.ing input').forEach(cb=>cb.onchange=()=>{const s=new Set(store.get('chk:'+id,[]));const i=+cb.dataset.i;cb.checked?s.add(i):s.delete(i);store.set('chk:'+id,[...s])});
  app.querySelectorAll('[data-photo]').forEach(b=>b.onclick=()=>openLB(+b.dataset.photo));
}

/* ---------- router ---------- */
function render(){
  document.body.classList.remove('cooking');
  const h = location.hash || '#/';
  const m = h.match(/^#\/(c|r)\/(.+)$/);
  if(h==='#/fav') viewFavs();
  else if(m && m[1]==='r') viewRecipe(decodeURIComponent(m[2]));
  else if(m && m[1]==='c') viewCat(decodeURIComponent(m[2]));
  else viewHome();
  if(!(m&&m[1]==='r')) document.title = t('siteName')+' · '+(lang==='he'?'Family Recipes':'מתכוני המשפחה');
  syncFavBtn();
}
function syncFavBtn(){const b=$('#favToggle'); const on=location.hash==='#/fav'; b.setAttribute('aria-pressed',on); b.textContent = favs.size?'♥':'♡'}

document.addEventListener('click',e=>{
  const g=e.target.closest('[data-go]'); if(g){ e.preventDefault(); location.hash=g.dataset.go; }
  if(e.target.id==='clr'){ q=''; $('#q').value=''; render(); }
});
window.addEventListener('hashchange',render);
$('#langBtn').onclick=()=>setLang(lang==='he'?'en':'he');
$('#favToggle').onclick=()=>{location.hash = location.hash==='#/fav' ? '#/' : '#/fav'};
$('#randomBtn').onclick=()=>{const r=R[Math.floor(Math.random()*R.length)]; location.hash='#/r/'+r.id};
let tm; $('#q').addEventListener('input',e=>{
  clearTimeout(tm); tm=setTimeout(()=>{ q=e.target.value; const h=location.hash;
    if(/^#\/r\//.test(h)||h==='#/fav'){ location.hash='#/'; } else render(); },120);
});

/* ---------- lightbox ---------- */
const lb=$('#lightbox'), lbImg=$('#lbImg');
function openLB(i){lbIdx=i;showLB();lb.hidden=false;document.body.style.overflow='hidden'}
function showLB(){lbImg.src=currentPhotos[lbIdx];lbImg.classList.remove('zoom');$('#lbCount').textContent=(lbIdx+1)+' / '+currentPhotos.length;
  $('#lbPrev').style.visibility=$('#lbNext').style.visibility=currentPhotos.length>1?'visible':'hidden'}
function closeLB(){lb.hidden=true;document.body.style.overflow=''}
$('.lb-close').onclick=closeLB;
$('#lbPrev').onclick=()=>{lbIdx=(lbIdx-1+currentPhotos.length)%currentPhotos.length;showLB()};
$('#lbNext').onclick=()=>{lbIdx=(lbIdx+1)%currentPhotos.length;showLB()};
lbImg.onclick=()=>lbImg.classList.toggle('zoom');
document.addEventListener('keydown',e=>{ if(lb.hidden) return; if(e.key==='Escape')closeLB(); if(e.key==='ArrowLeft')$('#lbNext').click(); if(e.key==='ArrowRight')$('#lbPrev').click(); });

/* ---------- start ---------- */
setLang(lang);

if('serviceWorker' in navigator && location.protocol.startsWith('http')){
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
})();
