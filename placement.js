/* V104 — optional placement, no lesson completion or exam results are forged. */
(()=>{'use strict';
const KEY='deutsch-placement-v1',levels=['A1','A2'];
const BANK={
A1:[
['___ Mann kommt aus Berlin.',['Der','Die','Das'],'Der'],
['Ich ___ Deutsch.',['lerne','lernt','lernen'],'lerne'],
['Woher ___ du?',['kommst','kommt','kommen'],'kommst'],
['Sie ___ eine Schwester.',['habe','hat','haben'],'hat'],
['Das ist ___ Buch.',['ein','eine','einen'],'ein'],
['Ich sehe ___ Hund.',['der','den','dem'],'den'],
['Wir ___ heute ins Kino.',['gehen','geht','gehst'],'gehen'],
['Um acht Uhr ___ ich auf.',['stehe','steht','stehen'],'stehe'],
['Kannst du mir ___?',['helfen','hilfst','hilf'],'helfen'],
['Er ___ gestern krank.',['war','ist','hat'],'war'],
['Ich habe ein Brot ___.',['gekauft','gekaufen','kaufen'],'gekauft'],
['___ du morgen Zeit?',['Hast','Hat','Haben'],'Hast']
],
A2:[
['Ich bleibe zu Hause, ___ ich krank bin.',['weil','denn','aber'],'weil'],
['Wenn ich Zeit habe, ___ ich dich an.',['rufe','rufst','rufen'],'rufe'],
['Ich interessiere mich ___ Musik.',['für','an','mit'],'für'],
['Er hat mir ein Buch ___.',['gegeben','gegebt','geben'],'gegeben'],
['Wir fahren ___ dem Zug.',['mit','für','durch'],'mit'],
['Das ist der Mann, ___ hier arbeitet.',['der','den','dem'],'der'],
['Ich warte ___ den Bus.',['auf','an','bei'],'auf'],
['Gestern ___ wir früh aufgestanden.',['sind','haben','werden'],'sind'],
['Sie lernt Deutsch, ___ in Deutschland zu arbeiten.',['um','weil','damit'],'um'],
['Wenn ich mehr Geld hätte, ___ ich reisen.',['würde','werde','war'],'würde'],
['Kannst du ___ bitte helfen?',['mir','mich','ich'],'mir'],
['Ich habe keine Zeit, ___ ich muss arbeiten.',['denn','weil','obwohl'],'denn']
]};
const root=document.getElementById('placementRoot');if(!root)return;
function read(){try{const v=JSON.parse(localStorage.getItem(KEY)||'{}');return v&&typeof v==='object'&&!Array.isArray(v)?v:{}}catch{return {}}}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function shuffle(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r}
let stage=null,items=[],answers={},submitted=false,score=0,saveError=false,syncMessage="",attemptId=0;
const passed=l=>read().passed?.[l]===true;
function home(){attemptId++;stage=null;const a=passed('A1'),b=passed('A2');root.innerHTML=`<h1>🧭 اختبار تحديد المستوى</h1><p>اختبار اختياري لمن درس الألمانية سابقاً. لا يفتح جميع الدروس ولا يلغي الأقفال، بل يسمح ببدء المستوى المناسب ثم التقدم داخله درساً بعد درس.</p><p><strong>النتيجة المطلوبة:</strong> 10 إجابات صحيحة من 12 في كل اختبار (83.3%). أسئلة الاختبار اختيار من متعدد في القواعد؛ هذا تقدير أولي وليس بديلاً عن اختبار Goethe الرسمي.</p><div class="placement-grid"><section><h2>A1 → A2</h2><p>اجتز اختبار A1 لبدء مستوى A2.</p><button data-start="A1">${a?'إعادة اختبار A1':'ابدأ اختبار A1'}</button><p>${a?'✅ تم اجتياز هذا المستوى':'🔒 مستوى A2 مغلق حتى النجاح'}</p></section><section><h2>A2 → B1</h2><p>بعد اجتياز A1 يمكنك اختبار A2 لبدء B1.</p><button data-start="A2" ${a?'':'disabled'}>ابدأ اختبار A2</button><p>${b?'✅ تم اجتياز هذا المستوى':a?'جاهز للاختبار':'🔒 اجتز A1 أولاً'}</p></section></div><p>من لا يجتاز الاختبار يواصل من المرحلة المتاحة له بشكل طبيعي، دون أن يفقد أي تقدم سابق.</p><a href="lessons.html">العودة إلى خريطة الدروس</a>`;}
function start(l){if(!levels.includes(l)||(l==='A2'&&!passed('A1')))return;attemptId++;stage=l;items=shuffle(BANK[l]).map(([q,o,a])=>({q,o:shuffle(o),a}));answers={};submitted=false;score=0;saveError=false;syncMessage="";render()}
function render(){let count=Object.keys(answers).length;root.innerHTML=`<h1>تحديد المستوى ${stage}</h1><p>اختر إجابة واحدة لكل سؤال. <span data-placement-progress>${count} من ${items.length} إجابة.</span></p>${items.map((q,i)=>`<section class="placement-question"><h2>${i+1}. <span dir="ltr">${esc(q.q)}</span></h2><div class="placement-options" role="group" aria-label="السؤال ${i+1}">${q.o.map(o=>`<button type="button" data-answer="${i}" data-value="${esc(o)}" ${submitted?'disabled':''} class="${answers[i]===o?'selected':''}" aria-pressed="${answers[i]===o?'true':'false'}">${esc(o)}</button>`).join('')}</div>${submitted?`<p class="${answers[i]===q.a?'placement-good':'placement-bad'}">${answers[i]===q.a?'صحيح':'الصحيح: '+esc(q.a)}</p>`:''}</section>`).join('')}${submitted?`<section class="placement-result"><h2>النتيجة: ${score}/${items.length}</h2><p>${saveError?'لم نتمكن من حفظ النجاح، ولذلك بقي المستوى مقفلاً. تأكد من مساحة التخزين وحاول مجدداً.':score>=10?'نجحت! فُتح أول درس في المستوى التالي، وتبقى بقية الدروس مقفلة حتى إكمال ما قبلها.':'لم تحقق الدرجة المطلوبة. يمكنك مراجعة الدروس وإعادة الاختبار.'}</p>${score>=10&&!saveError?'<p role="status" class="placement-sync-status">'+esc(syncMessage)+'</p>':''}<button data-home>العودة إلى تحديد المستوى</button> <a href="lessons.html">الدروس</a></section>`:`<button class="placement-submit" data-submit ${count!==items.length?'disabled':''}>تصحيح الاختبار</button> <button data-home>العودة</button>`}`}
// An asynchronous sync response must never redraw a finished quiz or overwrite a new attempt.
function showSyncStatus(message,attempt){
 if(attempt!==attemptId||!submitted||!stage)return;
 syncMessage=message;
 const status=root.querySelector('.placement-sync-status');
 if(status)status.textContent=message;
}
async function syncPlacement(attempt){
 const cloud=window.AcademyCloud;
 if(!cloud?.configured||!cloud.session?.()){
  showSyncStatus('تم حفظ النجاح على هذا الجهاز. سجّل الدخول لتتمكن من مزامنته بين أجهزتك.',attempt);
  return;
 }
 showSyncStatus('تم حفظ النجاح محلياً؛ جارٍ مزامنته مع الحساب...',attempt);
 try{
  const result=await cloud.sync(true);
  showSyncStatus(result?.synced?'تم حفظ النجاح ومزامنته مع حسابك.':'النجاح محفوظ على هذا الجهاز، لكن لم تكتمل المزامنة. افتح صفحة حسابي وأعد المحاولة.',attempt);
 }catch(e){
  showSyncStatus('النجاح محفوظ على هذا الجهاز، لكن تعذرت المزامنة. أعد المحاولة من صفحة حسابي عندما يعود الاتصال.',attempt);
 }
}
root.addEventListener('click',e=>{const begin=e.target.closest('[data-start]');if(begin){start(begin.dataset.start);return}if(e.target.closest('[data-home]')){home();return}const option=e.target.closest('[data-answer]');if(option&&!submitted){
 const index=Number(option.dataset.answer);
 if(!Number.isInteger(index)||index<0||index>=items.length)return;
 answers[index]=option.dataset.value;
 // Keep the question and clicked button mounted so keyboard focus and scroll are preserved.
 const group=option.closest('.placement-options');
 if(group)group.querySelectorAll('[data-answer]').forEach(btn=>{
  const selected=btn.dataset.value===answers[index];
  btn.classList.toggle('selected',selected);
  btn.setAttribute('aria-pressed',String(selected));
 });
 const count=Object.keys(answers).length;
 const progress=root.querySelector('[data-placement-progress]');
 if(progress)progress.textContent=count+' من '+items.length+' إجابة.';
 const submit=root.querySelector('[data-submit]');
 if(submit)submit.disabled=count!==items.length;
 return;
 }if(e.target.closest('[data-submit]')&&!submitted&&Object.keys(answers).length===items.length){score=items.reduce((n,q,i)=>n+(answers[i]===q.a?1:0),0);submitted=true;if(score>=10){const old=read(),next={...old,passed:{...(old.passed||{}),[stage]:true},updated:new Date().toISOString()};try{localStorage.setItem(KEY,JSON.stringify(next))}catch{saveError=true}}render();if(score>=10&&!saveError)void syncPlacement(attemptId)}});
home();
})();
