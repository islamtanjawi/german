/* V104 — optional placement, no lesson completion or exam results are forged. */
(()=>{'use strict';
const KEY='deutsch-placement-v1',levels=['A1','A2'];
// Diagnostic bank: 20 questions per level, five competencies, one correct option each.
// A1 tests A1 exit readiness; A2 tests A2 exit readiness before entering B1.
const PASS_MARK=16;
const BANK={
 A1:[
  ['قواعد','Ich ___ jeden Morgen um sieben Uhr auf.',['stehe','steht','stehen'],'stehe'],
  ['قواعد','Meine Schwester ___ in einer Bäckerei.',['arbeitet','arbeiten','arbeite'],'arbeitet'],
  ['قواعد','Wir gehen morgen ___ Arzt.',['zum','im','am'],'zum'],
  ['قواعد','Ich möchte ___ Apfel essen.',['einen','ein','einem'],'einen'],
  ['مفردات','Was bedeutet „pünktlich“?',['في الوقت المحدد','باهظ الثمن','متعب'],'في الوقت المحدد'],
  ['مفردات','Du möchtest Brot kaufen. Wohin gehst du?',['In die Bäckerei','In die Apotheke','In die Bibliothek'],'In die Bäckerei'],
  ['مفردات','Was ist das Gegenteil von „teuer“?',['billig','langsam','sauber'],'billig'],
  ['مفردات','Es ist 14:30 Uhr. Welche Zeitangabe passt?',['halb drei','halb zwei','Viertel nach drei'],'halb drei'],
  ['ترتيب الجمل','Wähle den richtigen Satz.',['Heute lerne ich Deutsch.','Heute ich lerne Deutsch.','Heute Deutsch ich lerne.'],'Heute lerne ich Deutsch.'],
  ['ترتيب الجمل','Wähle die richtige Frage.',['Wann beginnt der Kurs?','Wann der Kurs beginnt?','Wann beginnt Kurs der?'],'Wann beginnt der Kurs?'],
  ['ترتيب الجمل','Wähle den richtigen Satz mit „können“.',['Ich kann heute nicht kommen.','Ich kann kommen heute nicht.','Ich heute nicht kann kommen.'],'Ich kann heute nicht kommen.'],
  ['ترتيب الجمل','Wähle den richtigen Satz im Perfekt.',['Wir haben gestern Fußball gespielt.','Wir haben gespielt gestern Fußball.','Wir gestern haben Fußball gespielt.'],'Wir haben gestern Fußball gespielt.'],
  ['مواقف يومية','Im Geschäft: „Kann ich Ihnen helfen?“ — Was antwortest du?',['Ja, ich suche eine Jacke.','Ja, ich bin 21 Jahre alt.','Nein, ich wohne in Berlin.'],'Ja, ich suche eine Jacke.'],
  ['مواقف يومية','Du kommst zu spät. Was sagst du höflich?',['Entschuldigung, ich habe den Bus verpasst.','Guten Appetit!','Gute Besserung!'],'Entschuldigung, ich habe den Bus verpasst.'],
  ['مواقف يومية','Am Telefon: Du willst mit Frau Weber sprechen.',['Kann ich bitte Frau Weber sprechen?','Wie viel kostet Frau Weber?','Woher kommt das Telefon?'],'Kann ich bitte Frau Weber sprechen?'],
  ['مواقف يومية','Ein Freund sagt: „Mir tut der Kopf weh.“ Was passt?',['Gute Besserung!','Herzlichen Glückwunsch!','Guten Flug!'],'Gute Besserung!'],
  ['فهم المقروء','Wann hat das Geschäft geöffnet?',['Samstag um 10 Uhr','Sonntag um 10 Uhr','Montag um 7 Uhr'],'Samstag um 10 Uhr','Öffnungszeiten: Mo–Fr 9–18 Uhr, Sa 9–13 Uhr, So geschlossen.'],
  ['فهم المقروء','Wann ist das Geschäft geschlossen?',['Am Sonntag','Am Samstag','Am Freitag'],'Am Sonntag','Öffnungszeiten: Mo–Fr 9–18 Uhr, Sa 9–13 Uhr, So geschlossen.'],
  ['فهم المقروء','Warum kann Lina nicht ins Kino kommen?',['Sie muss arbeiten.','Sie ist im Kino.','Sie besucht ihre Mutter.'],'Sie muss arbeiten.','Nachricht: „Hallo Tom, ich kann heute nicht ins Kino kommen. Ich muss bis 20 Uhr arbeiten. Vielleicht am Samstag? Liebe Grüße, Lina.“'],
  ['فهم المقروء','Wann schlägt Lina ein Treffen vor?',['Am Samstag','Heute um 20 Uhr','Am Montag'],'Am Samstag','Nachricht: „Hallo Tom, ich kann heute nicht ins Kino kommen. Ich muss bis 20 Uhr arbeiten. Vielleicht am Samstag? Liebe Grüße, Lina.“']
 ],
 A2:[
  ['قواعد','Obwohl es regnet, ___ wir spazieren.',['gehen','gingen','gegangen'],'gehen'],
  ['قواعد','Ich interessiere mich ___ Politik.',['für','auf','an'],'für'],
  ['قواعد','Wenn ich mehr Zeit hätte, ___ ich öfter lesen.',['würde','werde','habe'],'würde'],
  ['قواعد','Das ist der Kollege, ___ ich gestern geholfen habe.',['dem','den','der'],'dem'],
  ['مفردات','Was bedeutet „sich bewerben“ im beruflichen Kontext?',['التقدم بطلب عمل','الاستقالة من العمل','التأخر عن العمل'],'التقدم بطلب عمل'],
  ['مفردات','Welches Wort passt? „Bitte ___ Sie das Formular vollständig aus.“',['füllen','legen','bringen'],'füllen'],
  ['مفردات','Was bedeutet „die Verspätung“?',['التأخير','الحجز','المغادرة'],'التأخير'],
  ['مفردات','Welcher Ausdruck ist ähnlich wie „trotzdem“?',['dennoch','deshalb','weil'],'dennoch'],
  ['ترتيب الجمل','Wähle den richtigen Nebensatz.',['Ich bleibe zu Hause, weil ich krank bin.','Ich bleibe zu Hause, weil bin ich krank.','Ich bleibe zu Hause, weil ich bin krank.'],'Ich bleibe zu Hause, weil ich krank bin.'],
  ['ترتيب الجمل','Wähle den richtigen Infinitivsatz.',['Ich lerne Deutsch, um in Deutschland zu arbeiten.','Ich lerne Deutsch, um zu arbeiten in Deutschland.','Ich lerne Deutsch, um ich arbeite in Deutschland.'],'Ich lerne Deutsch, um in Deutschland zu arbeiten.'],
  ['ترتيب الجمل','Wähle den richtigen Satz.',['Nachdem ich gegessen habe, gehe ich spazieren.','Nachdem ich habe gegessen, gehe ich spazieren.','Nachdem gegessen ich habe, gehe spazieren ich.'],'Nachdem ich gegessen habe, gehe ich spazieren.'],
  ['ترتيب الجمل','Wähle die indirekte Frage.',['Können Sie mir sagen, wann der Zug abfährt?','Können Sie mir sagen, wann fährt der Zug ab?','Können Sie mir sagen, wann abfährt der Zug?'],'Können Sie mir sagen, wann der Zug abfährt?'],
  ['مواقف يومية','Du möchtest einen Termin verschieben. Was ist passend?',['Könnten wir den Termin auf Freitag verschieben?','Ich verschiebe dich am Freitag.','Der Termin hat Freitag gespielt.'],'Könnten wir den Termin auf Freitag verschieben?'],
  ['مواقف يومية','Du reklamierst ein defektes Gerät höflich.',['Leider funktioniert das Gerät nicht. Können Sie es umtauschen?','Das Gerät ist Ihnen sehr gesund.','Ich habe gern ein kaputtes Gerät.'],'Leider funktioniert das Gerät nicht. Können Sie es umtauschen?'],
  ['مواقف يومية','Ein Freund fragt nach einem Rat zum Deutschlernen.',['An deiner Stelle würde ich jeden Tag üben.','An deine Stelle ich üben jeden Tag.','Ich stelle dich jeden Tag.'],'An deiner Stelle würde ich jeden Tag üben.'],
  ['مواقف يومية','In einer E-Mail an eine Firma: Welche Anrede passt?',['Sehr geehrte Damen und Herren,','Hallo Leute!','Liebe Kumpels,'],'Sehr geehrte Damen und Herren,'],
  ['فهم المقروء','Warum fällt der Termin aus?',['Die Ärztin ist krank.','Die Praxis ist umgezogen.','Der Patient ist im Urlaub.'],'Die Ärztin ist krank.','Praxis-Info: Ihr Termin am Dienstag um 15 Uhr muss leider ausfallen, da unsere Ärztin erkrankt ist. Bitte vereinbaren Sie telefonisch einen neuen Termin.'],
  ['فهم المقروء','Was sollen die Patienten tun?',['Einen neuen Termin telefonisch vereinbaren.','Am Dienstag um 15 Uhr kommen.','Eine E-Mail an die Polizei schreiben.'],'Einen neuen Termin telefonisch vereinbaren.','Praxis-Info: Ihr Termin am Dienstag um 15 Uhr muss leider ausfallen, da unsere Ärztin erkrankt ist. Bitte vereinbaren Sie telefonisch einen neuen Termin.'],
  ['فهم المقروء','Wann ist die Bewerbung spätestens einzureichen?',['Am 15. Mai','Am 20. Mai','Am 1. Juni'],'Am 15. Mai','Stellenanzeige: Wir suchen ab 1. Juni eine Teilzeitkraft (20 Stunden pro Woche). Bewerbungen bis zum 15. Mai per E-Mail. Vorstellungsgespräche finden ab dem 20. Mai statt.'],
  ['فهم المقروء','Wie viele Stunden umfasst die Stelle pro Woche?',['20 Stunden','15 Stunden','40 Stunden'],'20 Stunden','Stellenanzeige: Wir suchen ab 1. Juni eine Teilzeitkraft (20 Stunden pro Woche). Bewerbungen bis zum 15. Mai per E-Mail. Vorstellungsgespräche finden ab dem 20. Mai statt.']
 ]
};
// Questions retain four distinct reading tasks and a balanced mix of competencies.
for(const level of levels){
 if(BANK[level].length!==20)throw new Error('Invalid placement question count: '+level);
 for(const row of BANK[level])if(row[2].length!==3||new Set(row[2]).size!==3||!row[2].includes(row[3]))throw new Error('Invalid placement options: '+level);
}
const root=document.getElementById('placementRoot');if(!root)return;
function read(){try{const v=JSON.parse(localStorage.getItem(KEY)||'{}');return v&&typeof v==='object'&&!Array.isArray(v)?v:{}}catch{return {}}}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function shuffle(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r}
let stage=null,items=[],answers={},submitted=false,score=0,saveError=false,syncMessage="",attemptId=0;
const passed=l=>read().passed?.[l]===true;
function home(){attemptId++;stage=null;const a=passed('A1'),b=passed('A2');root.innerHTML=`<h1>🧭 اختبار تحديد المستوى</h1><p>اختبار اختياري لمن درس الألمانية سابقاً. لا يفتح جميع الدروس ولا يلغي الأقفال، بل يسمح ببدء المستوى المناسب ثم التقدم داخله درساً بعد درس.</p><p><strong>النتيجة المطلوبة:</strong> 16 إجابة صحيحة من 20 في كل اختبار (80%). تشمل الأسئلة القواعد والمفردات وترتيب الجمل والمواقف اليومية وفهم المقروء؛ هذا تقدير أولي وليس بديلاً عن اختبار Goethe الرسمي.</p><div class="placement-grid"><section><h2>A1 → A2</h2><p>اجتز اختبار A1 لبدء مستوى A2.</p><button data-start="A1">${a?'إعادة اختبار A1':'ابدأ اختبار A1'}</button><p>${a?'✅ تم اجتياز هذا المستوى':'🔒 مستوى A2 مغلق حتى النجاح'}</p></section><section><h2>A2 → B1</h2><p>بعد اجتياز A1 يمكنك اختبار A2 لبدء B1.</p><button data-start="A2" ${a?'':'disabled'}>ابدأ اختبار A2</button><p>${b?'✅ تم اجتياز هذا المستوى':a?'جاهز للاختبار':'🔒 اجتز A1 أولاً'}</p></section></div><p>من لا يجتاز الاختبار يواصل من المرحلة المتاحة له بشكل طبيعي، دون أن يفقد أي تقدم سابق.</p><a href="lessons.html">العودة إلى خريطة الدروس</a>`;}
function start(l){if(!levels.includes(l)||(l==='A2'&&!passed('A1')))return;attemptId++;stage=l;items=shuffle(BANK[l]).map(([category,q,o,a,context])=>({category,q,o:shuffle(o),a,context}));answers={};submitted=false;score=0;saveError=false;syncMessage="";render()}
function skillFeedback(){
 const categories=[...new Set(items.map(q=>q.category))];
 const rows=categories.map(category=>{
  const indices=items.map((q,i)=>q.category===category?i:-1).filter(i=>i>=0);
  const correct=indices.filter(i=>answers[i]===items[i].a).length;
  return {category,correct,total:indices.length};
 });
 const weak=rows.filter(r=>r.correct<Math.ceil(r.total*.75));
 return `<div class="placement-breakdown"><h3>نتيجتك حسب المهارة</h3><ul>${rows.map(r=>`<li>${esc(r.category)}: <strong>${r.correct}/${r.total}</strong></li>`).join('')}</ul><p>${weak.length?'راجع قبل المحاولة التالية: '+weak.map(r=>esc(r.category)).join('، ')+'.':'أداء جيد في جميع أقسام الاختبار.'}</p></div>`;
}
function render(){let count=Object.keys(answers).length;root.innerHTML=`<h1>تحديد المستوى ${stage}</h1><p>اختر إجابة واحدة لكل سؤال. <span data-placement-progress>${count} من ${items.length} إجابة.</span></p>${items.map((q,i)=>`<section class="placement-question"><p class="placement-category">${esc(q.category)}</p>${q.context?`<blockquote class="placement-reading" lang="de" dir="ltr">${esc(q.context)}</blockquote>`:""}<h2>${i+1}. <span dir="ltr" lang="de">${esc(q.q)}</span></h2><div class="placement-options" role="group" aria-label="السؤال ${i+1}">${q.o.map(o=>`<button type="button" data-answer="${i}" data-value="${esc(o)}" ${submitted?'disabled':''} class="${answers[i]===o?'selected':''}" aria-pressed="${answers[i]===o?'true':'false'}">${esc(o)}</button>`).join('')}</div>${submitted?`<p class="${answers[i]===q.a?'placement-good':'placement-bad'}">${answers[i]===q.a?'صحيح':'الصحيح: '+esc(q.a)}</p>`:''}</section>`).join('')}${submitted?`<section class="placement-result"><h2>النتيجة: ${score}/${items.length} — النجاح من ${PASS_MARK}</h2>${skillFeedback()}<p>${saveError?'لم نتمكن من حفظ النجاح، ولذلك بقي المستوى مقفلاً. تأكد من مساحة التخزين وحاول مجدداً.':score>=PASS_MARK?'نجحت! فُتح أول درس في المستوى التالي، وتبقى بقية الدروس مقفلة حتى إكمال ما قبلها.':'لم تحقق الدرجة المطلوبة. يمكنك مراجعة الدروس وإعادة الاختبار.'}</p>${score>=PASS_MARK&&!saveError?'<p role="status" class="placement-sync-status">'+esc(syncMessage)+'</p>':''}<button data-home>العودة إلى تحديد المستوى</button> <a href="lessons.html">الدروس</a></section>`:`<button class="placement-submit" data-submit ${count!==items.length?'disabled':''}>تصحيح الاختبار</button> <button data-home>العودة</button>`}`}
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
 }if(e.target.closest('[data-submit]')&&!submitted&&Object.keys(answers).length===items.length){score=items.reduce((n,q,i)=>n+(answers[i]===q.a?1:0),0);submitted=true;if(score>=PASS_MARK){const old=read(),next={...old,passed:{...(old.passed||{}),[stage]:true},updated:new Date().toISOString()};try{localStorage.setItem(KEY,JSON.stringify(next))}catch{saveError=true}}render();if(score>=PASS_MARK&&!saveError)void syncPlacement(attemptId)}});
home();
})();
