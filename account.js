(()=>{'use strict';const $=id=>document.getElementById(id),cloud=window.AcademyCloud;
let create=true;
function show(){const s=cloud.session();$('cloudUnconfigured').hidden=cloud.configured;$('accountSignedOut').hidden=!cloud.configured||!!s;$('accountSignedIn').hidden=!cloud.configured||!s;if(s)$('accountName').textContent=s.username;$('importGuest').hidden=!s||!cloud.hasGuestProgress()}
// Consent is separate from local storage: the server decides who is public.
let consentRequest=0;
async function readConsent(){
 const requestNo=++consentRequest;
 const el=$('leaderboardConsent'),label=$('leaderboardConsentStatus');
 if(!cloud.session()){el.checked=false;label.textContent='';return}
 label.textContent='جارٍ جلب إعداد المتصدرين...';
 try{
  const data=await cloud.leaderboardConsent();
  if(requestNo!==consentRequest||!cloud.session())return;
  el.checked=!!data.public;
  label.textContent=data.public?`اسمك ظاهر في المتصدرين · ${data.percent}% من المراحل`:'اسمك غير ظاهر في لوحة المتصدرين.';
 }catch(err){if(requestNo===consentRequest)label.textContent=err.message+' — لم يتغير إعداد الظهور.'}
}
function mode(reg){create=reg;$('registerTab').classList.toggle('active',reg);$('loginTab').classList.toggle('active',!reg);$('accountFormTitle').textContent=reg?'إنشاء حساب جديد':'تسجيل الدخول';$('submitAccount').textContent=reg?'إنشاء حساب وحفظ التقدم':'دخول ومزامنة التقدم';$('password').setAttribute('autocomplete',reg?'new-password':'current-password');const box=$('accountLegalConfirm'),check=$('accountLegalAccept');if(box&&check){box.hidden=!reg;check.required=reg;if(!reg)check.checked=false}}
function message(s){$('accountMessage').textContent=s}
$('registerTab').addEventListener('click',()=>mode(true));$('loginTab').addEventListener('click',()=>mode(false));
$('accountForm').addEventListener('submit',async e=>{e.preventDefault();const b=$('submitAccount');if(b.disabled)return;b.disabled=true;message('جارٍ التحقق من الحساب...');try{
 const result=await cloud.login($('username').value.trim(),$('password').value,create);$('password').value='';show();readConsent();message(result.synced?'تم ربط الحساب ومزامنة التقدم. يمكنك المتابعة من أي جهاز بعد تسجيل الدخول إليه.':'تم تسجيل الدخول وحفظ التقدم محلياً، لكن المزامنة السحابية لم تكتمل. استخدم زر المزامنة عند عودة الاتصال.')
 }catch(err){show();message(err.message)}finally{b.disabled=false}});
$('importGuest').addEventListener('click',async()=>{if(!confirm('هل هذا تقدمك الشخصي في وضع الزائر؟ سيتم دمجه مع تقدم حسابك الحالي ولن يُحذف سجل الزائر.'))return;const b=$('importGuest');b.disabled=true;message('جارٍ نقل تقدم الزائر...');try{const r=await cloud.importGuestProgress();message(r?.synced?'تم دمج تقدم الزائر وحفظه في حسابك.':'تم الدمج محلياً فقط؛ فشلت المزامنة، جرّب مجدداً عند توفر الإنترنت.')}catch(err){message(err.message)}finally{b.disabled=false;show()}});
$('syncNow').addEventListener('click',async()=>{const b=$('syncNow');b.disabled=true;message('جارٍ مزامنة البيانات...');try{const r=await cloud.sync(true);message(r?.synced?'تمت مزامنة التقدم بنجاح.':'لم تتم المزامنة.');if(r?.synced)await readConsent()}catch(err){message(err.message)}finally{b.disabled=false}});
$('logout').addEventListener('click',async()=>{const r=await cloud.logout();show();readConsent();message(r.synced?'تمت المزامنة وتسجيل الخروج. يمكنك استرجاع التقدم عند الدخول مجدداً.':'تم تسجيل الخروج وحفظ تقدم الحساب على هذا الجهاز فقط. قد توجد تغييرات لم تصل للسحابة؛ سجّل الدخول لنفس الحساب لاحقاً واضغط مزامنة.')});
$('saveLeaderboardConsent').addEventListener('click',async()=>{
 const btn=$('saveLeaderboardConsent'),checked=$('leaderboardConsent').checked;
 btn.disabled=true;$('leaderboardConsentStatus').textContent='جارٍ حفظ الإعداد...';
 try{if(checked){const progressSync=await cloud.sync(true);if(!progressSync?.synced)throw Error('تعذرت مزامنة التقدم قبل الظهور في الترتيب. حاول مجدداً.')}await cloud.setLeaderboardConsent(checked);await readConsent()}catch(err){$('leaderboardConsentStatus').textContent=err.message+' — لم نغيّر إعدادك السحابي.';await readConsent()}finally{btn.disabled=false}
});
document.addEventListener('academy-cloud-status',e=>{if(cloud.session()&&e.detail.status)message(e.detail.status)});
show();if(cloud.configured&&cloud.session()){cloud.sync(false).then(()=>{show();readConsent()})}
})();
