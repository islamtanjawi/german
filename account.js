(()=>{'use strict';const $=id=>document.getElementById(id),cloud=window.AcademyCloud;
let create=true;
function show(){const s=cloud.session();$('cloudUnconfigured').hidden=cloud.configured;$('accountSignedOut').hidden=!cloud.configured||!!s;$('accountSignedIn').hidden=!cloud.configured||!s;if(s)$('accountName').textContent=s.username;$('importGuest').hidden=!s||!cloud.hasGuestProgress()}
function mode(reg){create=reg;$('registerTab').classList.toggle('active',reg);$('loginTab').classList.toggle('active',!reg);$('accountFormTitle').textContent=reg?'إنشاء حساب جديد':'تسجيل الدخول';$('submitAccount').textContent=reg?'إنشاء حساب وحفظ التقدم':'دخول ومزامنة التقدم';$('password').setAttribute('autocomplete',reg?'new-password':'current-password')}
function message(s){$('accountMessage').textContent=s}
$('registerTab').addEventListener('click',()=>mode(true));$('loginTab').addEventListener('click',()=>mode(false));
$('accountForm').addEventListener('submit',async e=>{e.preventDefault();const b=$('submitAccount');if(b.disabled)return;b.disabled=true;message('جارٍ التحقق من الحساب...');try{
 const result=await cloud.login($('username').value.trim(),$('password').value,create);$('password').value='';show();message(result.synced?'تم ربط الحساب ومزامنة التقدم. يمكنك المتابعة من أي جهاز بعد تسجيل الدخول إليه.':'تم تسجيل الدخول وحفظ التقدم محلياً، لكن المزامنة السحابية لم تكتمل. استخدم زر المزامنة عند عودة الاتصال.')
 }catch(err){show();message(err.message)}finally{b.disabled=false}});
$('importGuest').addEventListener('click',async()=>{if(!confirm('هل هذا تقدمك الشخصي في وضع الزائر؟ سيتم دمجه مع تقدم حسابك الحالي ولن يُحذف سجل الزائر.'))return;const b=$('importGuest');b.disabled=true;message('جارٍ نقل تقدم الزائر...');try{const r=await cloud.importGuestProgress();message(r?.synced?'تم دمج تقدم الزائر وحفظه في حسابك.':'تم الدمج محلياً فقط؛ فشلت المزامنة، جرّب مجدداً عند توفر الإنترنت.')}catch(err){message(err.message)}finally{b.disabled=false;show()}});
$('syncNow').addEventListener('click',async()=>{const b=$('syncNow');b.disabled=true;message('جارٍ مزامنة البيانات...');try{const r=await cloud.sync(true);message(r?.synced?'تمت مزامنة التقدم بنجاح.':'لم تتم المزامنة.')}catch(err){message(err.message)}finally{b.disabled=false}});
$('logout').addEventListener('click',async()=>{const r=await cloud.logout();show();message(r.synced?'تمت المزامنة وتسجيل الخروج. يمكنك استرجاع التقدم عند الدخول مجدداً.':'تم تسجيل الخروج وحفظ تقدم الحساب على هذا الجهاز فقط. قد توجد تغييرات لم تصل للسحابة؛ سجّل الدخول لنفس الحساب لاحقاً واضغط مزامنة.')});
document.addEventListener('academy-cloud-status',e=>{if(cloud.session()&&e.detail.status)message(e.detail.status)});
show();if(cloud.configured&&cloud.session()){cloud.sync(false).then(()=>show())}
})();
