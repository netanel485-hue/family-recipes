/* Ingredient parsing + merging for the Shabbat planner. Works in browser (window.Merge) and node. */
(function(root){
'use strict';
const UFR={'½':.5,'¼':.25,'¾':.75,'⅓':1/3,'⅔':2/3,'⅛':.125,'⅜':.375};
function num(s){
  let m;
  if((m=s.match(/^(\d+)\s*([½¼¾⅓⅔⅛⅜])/))) return [+m[1]+UFR[m[2]], s.slice(m[0].length)];
  if((m=s.match(/^(\d+)\s+(\d+)\/(\d+)/))) return [+m[1]+(+m[2])/(+m[3]), s.slice(m[0].length)];
  if((m=s.match(/^(\d+)\/(\d+)/))) return [(+m[1])/(+m[2]), s.slice(m[0].length)];
  if((m=s.match(/^(\d+(?:\.\d+)?)/))) return [parseFloat(m[1]), s.slice(m[0].length)];
  if((m=s.match(/^([½¼¾⅓⅔⅛⅜])/))) return [UFR[m[1]], s.slice(m[0].length)];
  return null;
}
/* split one ingredient line into segments: strips a leading "LABEL:" and splits on ", <number>" */
function segments(line){
  let s=String(line).trim();
  s=s.replace(/^(?!\d)[^:]{1,45}:\s+/,'').replace(/^\d\)\s+/,'');
  return s.split(/,\s+(?=(?:\d|[½¼¾⅓⅔⅛⅜]|כוס|כף|כפית|חצי|רבע|שליש|שמינית|שלושה|שני |שקית|חבילת|קילו))/).map(x=>x.trim()).filter(Boolean);
}
const UNITS={tsp:['tsp','teaspoon','teaspoons'],tbsp:['tbsp','tablespoon','tablespoons'],cup:['cup','cups'],g:['g','gram','grams'],kg:['kg'],ml:['ml'],l:['l','liter','liters','litre'],
 oz:['oz','ounce','ounces'],lb:['lb','lbs','pound','pounds'],packet:['packet','packets','pack','packs','package','packages'],can:['can','cans'],bag:['bag','bags'],stick:['stick','sticks'],clove:['clove','cloves']};
const UMAP={}; for(const k in UNITS) UNITS[k].forEach(w=>UMAP[w]=k);
const TSP={tsp:1,tbsp:3,cup:48,ml:0.2029,l:202.9};
const GR={g:1,kg:1000,oz:28.35,lb:453.6};
const DROP=/\b(melted|softened|soft|room temperature|temp|chopped|crushed|minced|sliced|grated|finely|peeled|quartered|beaten|large|medium|small|big|fresh|unsalted|kosher|sea|whole|dry|dried|raw|natural|light|plain|boiled|mashed|diced|cut|thin|thick|halved|ground|about|optional|heaping|capful|handful|bit|little|less|than|a|an|of)\b/g;
function singular(w){ if(/ies$/.test(w)) return w.slice(0,-3)+'y'; if(/oes$/.test(w)) return w.slice(0,-2); if(/(ss|us)$/.test(w)) return w; if(/s$/.test(w)) return w.slice(0,-1); return w; }
function normName(n){
  n=n.toLowerCase().replace(/\([^)]*\)/g,' ').replace(/,.*$/,'').replace(/[^a-z0-9֐-׿' -]/g,' ');
  n=n.replace(/\b(vegetable|veg|canola)\s+oil\b/g,'oil').replace(/\b(warm|boiling|cold)\s+water\b/g,'water').replace(/\bsweet chili( sauce)?\b/,'sweet chili sauce');
  n=n.replace(DROP,' ').replace(/\s+/g,' ').trim();
  n=n.split(' ').map(singular).join(' ');
  n=n.replace(/^garlic clove$/,'garlic').replace(/^egg yolk$/,'egg yolk').replace(/^cocoa powder$/,'cocoa').replace(/^baking powder$/,'baking powder').replace(/^icing sugar$/,'icing sugar').replace(/^chocolate chip$/,'chocolate chip').replace(/^margarine$/,'margarine');
  return n;
}
/* parse a segment => {qty, dim, unit, name} ; qty=null if unspecified */
function parseSeg(seg){
  let s=seg.trim(), q=null, unit='';
  let m=s.match(/^(\d+)\s*[×x]\s*(\d+)\s*(oz|g|ml)\b\s*(.*)$/i);
  if(m){ q=(+m[1])*(+m[2]); unit=m[3].toLowerCase(); s=m[4]; }
  else{
    let a=num(s);
    if(a){ q=a[0]; s=a[1];
      let r=s.match(/^\s*\+\s*/); if(r){ const b=num(s.slice(r[0].length)); if(b){q+=b[0]; s=b[1];} }
      r=s.match(/^\s*[–-]\s*/); if(r){ const b=num(s.slice(r[0].length)); if(b){q=Math.max(q,b[0]); s=b[1];} }
      s=s.replace(/^\s*\([^)]*\)\s*/,'');
      const w=s.trim().match(/^([A-Za-z]+)\.?\s*(.*)$/);
      if(w && UMAP[w[1].toLowerCase()]){ unit=UMAP[w[1].toLowerCase()]; s=w[2]; }
      s=s.replace(/^\s*of\s+/,'');
      // compound like "1 cup + 2 tbsp + 2 tsp flour"
      let c; while(unit && (c=s.match(/^\s*\+\s*/))){ const b=num(s.slice(c[0].length)); if(!b) break;
        const w2=b[1].trim().match(/^([A-Za-z]+)\.?\s*(.*)$/); const u2=w2&&UMAP[w2[1].toLowerCase()];
        const T=TSP[unit]&&TSP[u2]?[TSP[unit],TSP[u2]]:GR[unit]&&GR[u2]?[GR[unit],GR[u2]]:null; if(!T) break;
        q+=b[0]*T[1]/T[0]; s=w2[2]; }
    }
  }
  let name=normName(s.replace(/^\s*cans?\s+/i,''));
  if(unit==='' && /\bclove\b/.test(name)){ unit='clove'; name=name.replace(/\bclove\b/,'').trim(); }
  if(!name) name=normName(seg);
  let dim;
  if(q==null) dim='none';
  else if(TSP[unit]) dim='vol';
  else if(GR[unit]) dim='wt';
  else dim='cnt:'+unit;
  return {qty:q, unit, name, dim};
}
function baseQty(p,mult){ if(p.qty==null) return null; const q=p.qty*mult; return TSP[p.unit]?q*TSP[p.unit]: GR[p.unit]?q*GR[p.unit]: q; }
/* items: [{rid, title:{he,en}, mult, en:[...], he:[...]}] -> groups */
function mergeAll(items, scaleFn){
  const groups=new Map();
  for(const it of items){
    it.en.forEach((line,i)=>{
      const se=segments(line), sh=segments(it.he[i]||'');
      const aligned = se.length===sh.length;
      se.forEach((seg,k)=>{
        const p=parseSeg(seg);
        const key=p.name+'|'+p.dim;
        let g=groups.get(key); if(!g){ g={name:p.name,dim:p.dim,unit:p.unit,total:0,hasQty:false,src:[]}; groups.set(key,g); }
        const b=baseQty(p,it.mult); if(b!=null){ g.total+=b; g.hasQty=true; }
        g.src.push({rid:it.rid,title:it.title,mult:it.mult,
          lineEn:scaleFn(seg,it.mult,'en'), lineHe:aligned?scaleFn(sh[k],it.mult,'he'):null});
      });
    });
  }
  return [...groups.values()];
}
root.Merge={num,segments,parseSeg,normName,mergeAll,TSP,GR};
if(typeof module!=='undefined') module.exports=root.Merge;
})(typeof window!=='undefined'?window:globalThis);
