(()=>{'use strict';
// A first-visit invitation, not a forced account gate. Keep the existing account page unchanged.
const key='deutsch-welcome-choice-v1';
try{if(localStorage.getItem(key)||window.AcademyCloud?.session())return;}catch{return;}
const overlay=document.createElement('div');overlay.className='academy-welcome-overlay';
const dialog=document.createElement('section');dialog.className='academy-welcome-dialog';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-labelledby','welcomeTitle');
const h=document.createElement('h2');h.id='welcomeTitle';h.textContent='🇩🇪 أهلاً بك في الأكاديمية الألمانية!';
const intro=document.createElement('p');intro.textContent='أنشئ حساباً أو سجّل الدخول لحفظ تقدمك ومتابعة التعلم من أجهزة مختلفة.';
const caution=document.createElement('p');caution.className='academy-welcome-note';caution.textContent='🔐 احفظ كلمة المرور بعناية في مكان آمن. لا تتوفر حالياً طريقة تلقائية لاستعادتها.';
const actions=document.createElement('div');actions.className='academy-welcome-actions';
const link=document.createElement('a');link.href='account.html';link.textContent='إنشاء حساب أو تسجيل الدخول';link.className='academy-welcome-primary';
const guest=document.createElement('button');guest.type='button';guest.textContent='المتابعة كزائر';
function dismiss(){try{localStorage.setItem(key,'1')}catch{}overlay.remove();}
link.addEventListener('click',()=>{try{localStorage.setItem(key,'1')}catch{}});
guest.addEventListener('click',dismiss);
actions.append(link,guest);dialog.append(h,intro,caution,actions);overlay.append(dialog);document.body.append(overlay);guest.focus();
})();
