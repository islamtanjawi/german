/* مسار التعلم: إكمال الدروس ثم اختبار المستوى ثم Goethe التدريبي. توجد حسابات اختيارية تتطلب خادماً منفصلاً. */
(function(){'use strict';
const levels=['A1','A2','B1'];
function read(k){try{const v=JSON.parse(localStorage.getItem(k)||'{}');return v&&typeof v==='object'&&!Array.isArray(v)?v:{}}catch(e){return {}}}
function lessonProgress(){const x=read('deutsch-coach-v2').lessonProgress;return x&&typeof x==='object'&&!Array.isArray(x)?x:{}}
function coursePassed(l){const x=read('deutsch-coach-v2').examResults;const r=x&&typeof x==='object'?x[l]:null;return !!r&&Number.isFinite(Number(r.best))&&Number(r.best)>=7}
function goethePassed(l){return Object.values(read('deutsch-exams-v2')).some(r=>{if(!r||r.level!==l||r.finished!==true)return false;const total=Number(r.questionCount)||(Array.isArray(r.questions)?r.questions.length:0);const score=Number(r.auto);return Number.isInteger(total)&&total>=6&&total<=200&&Number.isFinite(score)&&score>=Math.ceil(total*.75)&&score<=total})}
function placed(l){const x=read('deutsch-placement-v1').passed;return !!x&&x[l]===true}
function levelOpen(l){const i=levels.indexOf(l);if(i<0)return false;return i===0||placed(levels[i-1])||(coursePassed(levels[i-1])&&goethePassed(levels[i-1])&&levelOpen(levels[i-1]))}
function lessonOpen(l,ordered){const i=ordered.findIndex(x=>x.id===l.id);return i>=0&&(!!lessonProgress()[l.id]||(levelOpen(l.level)&&(i===0||ordered[i-1]?.level!==l.level||!!lessonProgress()[ordered[i-1].id])))}
function courseExamOpen(l,ordered){return coursePassed(l)||(levelOpen(l)&&ordered.filter(x=>x.level===l).length>0&&ordered.filter(x=>x.level===l).every(x=>!!lessonProgress()[x.id]))}
function goetheOpen(l){return levelOpen(l)&&coursePassed(l)}
function reason(l){const i=levels.indexOf(l);if(i<1)return 'ابدأ بإنهاء الدروس واجتياز اختبار المستوى.';const previous=levels[i-1];return `للدخول إلى ${l}: اجتز اختبار دروس ${previous} بدرجة 7/10 ومحاكاة Goethe ${previous} بنسبة 75% في أسئلة القراءة والاستماع، أو اجتز اختبار تحديد المستوى الاختياري لبدء دروس ${l}.`}
window.LearningPath=Object.freeze({levels,read,lessonProgress,coursePassed,goethePassed,placed,levelOpen,lessonOpen,courseExamOpen,goetheOpen,reason});
})();
