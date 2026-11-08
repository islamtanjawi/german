(()=>{'use strict';
const config=window.AcademyLegalConfig||{};
const links=[['privacy.html','سياسة الخصوصية'],['terms.html','شروط الاستخدام'],['cookies.html','ملفات الارتباط'],['data-rights.html','حذف البيانات'],['contact.html','التواصل']];
function safeEmail(value){return typeof value==='string'&&value.length<=254&&/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value)?value.trim():''}
function text(label,value){const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent=label+': ';p.append(strong,document.createTextNode(value));return p}
function init(){
  for(const element of document.querySelectorAll('[data-legal-identity]')){
    element.replaceChildren(text('المسؤول',config.ownerName||'لم تُستكمل بيانات المسؤول بعد'),text('البلد',config.country||'المغرب'),text('العنوان المعلن',config.publicAddress||'لم يُضف بعد'));
  }
  for(const element of document.querySelectorAll('[data-contact-email]')){
    element.replaceChildren();const email=safeEmail(config.contactEmail);
    if(email){const a=document.createElement('a');a.textContent=email;a.href='mailto:'+email;element.append(a)}
    else element.textContent='بريد التواصل لم يضبطه المشرف بعد. يجب إضافته قبل نشر هذه الصفحات للاعتماد القانوني.';
  }
  if(!document.querySelector('.legal-footer')){
    const foot=document.createElement('footer');foot.className='legal-footer';foot.setAttribute('aria-label','روابط الموقع القانونية');
    for(const [href,label] of links){const a=document.createElement('a');a.href=href;a.textContent=label;foot.append(a)}
    const info=document.createElement('p');info.className='legal-copyright';info.textContent='أكاديمية الألمانية · محتوى تعليمي مستقل';foot.append(info);document.body.append(foot);
  }
  const button=document.getElementById('prepareRequest');if(button)button.addEventListener('click',()=>{
    const result=document.getElementById('requestStatus');const email=safeEmail(config.contactEmail);
    if(!email){result.textContent='لا يمكن تجهيز البريد قبل أن يضيف المشرف عنوان تواصل حقيقياً في legal-config.js.';return}
    const username=document.getElementById('deleteUsername')?.value.trim().slice(0,24)||'غير محدد';
    const kind=document.getElementById('requestType')?.value||'طلب بخصوص البيانات';
    const subject='أكاديمية الألمانية: '+kind;
    const body='السلام عليكم،\nأرغب في '+kind+'.\nاسم المستخدم: '+username+'\n\nأرجو توضيح خطوات التحقق من ملكية الحساب والإجراء المتاح.\n(لن أرسل كلمة المرور.)';
    const url='mailto:'+email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    result.textContent='سيُفتح برنامج البريد لإرسال الطلب. هذه الخطوة لا تحذف البيانات تلقائياً.';
    window.location.href=url;
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
