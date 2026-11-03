(function(){
const M=DATA.months,KEY='deutsch-progress-v1',PER=15;
let prog={};try{prog=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(prog))}catch(e){}};
const st={m:0,d:1,tab:'words',hide:false};
const $=s=>document.querySelector(s);
const nDays=m=>Math.min(Math.floor(M[m].verbs.length/PER),Math.floor(M[m].nouns.length/PER));
const k=(m,d,t,i)=>m+'-'+d+'-'+t+'-'+i;
const dayDone=(m,d)=>['v','n'].every(t=>{for(let i=0;i<PER;i++)if(!prog[k(m,d,t,i)])return false;return true});
function speak(t){try{const u=new SpeechSynthesisUtterance(t);u.lang='de-DE';u.rate=.85;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function stats(){let a=0,c=0;M.forEach((x,m)=>{for(let d=1;d<=nDays(m);d++){a++;if(dayDone(m,d))c++}});
 $('#stat').textContent='أكملت '+c+' من '+a+' يوماً متاحاً — التقدم محفوظ في متصفحك';}
function months(){$('#months').innerHTML=M.map((x,i)=>'<button data-m="'+i+'" class="'+(i===st.m?'on':'')+'"><b>'+x.level+'</b>الشهر '+(i+1)+'</button>').join('')}
function head(){const x=M[st.m];$('#head').innerHTML='<h2>الشهر '+(st.m+1)+' — مستوى '+x.level+'</h2><p>'+x.title+'</p>'}
function days(){
 const av=nDays(st.m);let h='';
 if(st.tab==='words'){for(let d=1;d<=30;d++)h+='<button data-d="'+d+'" class="'+(d===st.d?'on ':'')+(d<=av&&dayDone(st.m,d)?'done':'')+'"'+(d>av?' disabled title="سيُضاف قريباً"':'')+'>'+d+'</button>'}
 $('#days').innerHTML=h;$('#days').style.display=st.tab==='words'?'grid':'none'}
function block(t,title,arr,d){
 let h='<div class="'+t+'"><div class="sec"><h3>'+title+' ('+PER+')</h3></div><div class="list'+(st.hide?' hide':'')+'">';
 for(let i=0;i<PER;i++){const w=arr[(d-1)*PER+i],id=k(st.m,d,t,i),on=prog[id];
  h+='<div class="w'+(on?' ok':'')+'"><span class="num">'+(i+1)+'</span><div><div class="de">'+w[0]+'</div><div class="ar" tabindex="0">'+w[1]+'</div></div>'+
  '<button class="ic" data-say="'+w[0]+'" aria-label="نطق">🔊</button><button class="ic'+(on?' on':'')+'" data-ok="'+id+'" aria-label="تعلمتها">✓</button></div>'}
 return h+'</div></div>'}
function view(){
 const x=M[st.m],v=$('#view');
 if(st.tab==='words'){
  if(!nDays(st.m)){v.innerHTML='<div class="note">محتوى هذا الشهر لم يُضف بعد. أضفه في ملف data.js.</div>';return}
  const d=st.d;
  v.innerHTML='<div class="sec"><h3>اليوم '+d+' — 30 كلمة</h3><button class="tool" data-hide>'+(st.hide?'إظهار الترجمة':'إخفاء الترجمة للاختبار')+'</button></div>'+
   block('v','15 فعلاً',x.verbs,d)+block('n','15 اسماً',x.nouns,d)+
   '<div class="sec"><button class="tool" data-all>تعليم اليوم كله كمُتعلَّم</button></div>';
 }else{
  if(!x.sentences.length){v.innerHTML='<div class="note">جمل هذا الشهر لم تُضف بعد.</div>';return}
  v.innerHTML='<div class="n"><div class="sec"><h3>'+x.sentences.length+' جملة شائعة</h3><button class="tool" data-hide>'+(st.hide?'إظهار الترجمة':'إخفاء الترجمة للاختبار')+'</button></div><div class="list'+(st.hide?' hide':'')+'">'+
   x.sentences.map((s,i)=>'<div class="w"><span class="num">'+(i+1)+'</span><div><div class="de">'+s[0]+'</div><div class="ar" tabindex="0">'+s[1]+'</div></div><button class="ic" data-say="'+s[0].replace(/"/g,'')+'" aria-label="نطق">🔊</button><span></span></div>').join('')+'</div></div>'}}
function all(){stats();months();head();days();view()}
document.addEventListener('click',e=>{
 const t=e.target.closest('button');if(!t)return;
 if(t.dataset.m!==undefined){st.m=+t.dataset.m;st.d=1}
 else if(t.dataset.d){st.d=+t.dataset.d}
 else if(t.dataset.tab){st.tab=t.dataset.tab;document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b===t))}
 else if(t.dataset.say){speak(t.dataset.say);return}
 else if(t.dataset.ok){const id=t.dataset.ok;prog[id]?delete prog[id]:prog[id]=1;save()}
 else if('hide' in t.dataset){st.hide=!st.hide}
 else if('all' in t.dataset){['v','n'].forEach(ty=>{for(let i=0;i<PER;i++)prog[k(st.m,st.d,ty,i)]=1});save()}
 else return;
 all()});
all();
})();
