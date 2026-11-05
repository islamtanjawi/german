(function(){'use strict';
const conf=window.AcademyCloudConfig||{},api=typeof conf.apiBase==='string'?conf.apiBase.replace(/\/+$/,''):'';
const enabled=/^https:\/\/[a-z0-9.-]+(?::\d+)?(?:\/[^?#]*)?$/i.test(api)&&!api.includes('REPLACE_');
const SESSION='academy-cloud-session-v1',SNAP='academy-cloud-snapshot-v1',OWNER='academy-cloud-owner-v1',GUEST='@guest',GUEST_PROFILE='academy-cloud-guest-progress-v1';
const isProgress=k=>/^deutsch-[a-z0-9-]{1,80}$/i.test(k)&&k!=='deutsch-ui';
let busy=null,status='';
function session(){try{const s=JSON.parse(localStorage.getItem(SESSION)||'null');return s&&typeof s.token==='string'&&/^[a-f0-9]{64}$/.test(s.token)&&typeof s.username==='string'&&(!Number.isFinite(Number(s.expiresAt))||Number(s.expiresAt)>Date.now())?s:null}catch{return null}}
function snapshot(username){try{const s=JSON.parse(localStorage.getItem(SNAP)||'null');return s&&s.username===username&&s.records&&typeof s.records==='object'&&!Array.isArray(s.records)?s:null}catch{return null}}
function collect(){const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(isProgress(k)){const v=localStorage.getItem(k);if(v!==null)try{JSON.parse(v);o[k]=v}catch{}}}return o}
function safeObj(x){return x&&typeof x==='object'&&!Array.isArray(x)?x:{}}
function mergeValue(a,b){if(a===undefined)return b;if(b===undefined)return a;if(a===b)return a;
 if(typeof a==='boolean'&&typeof b==='boolean')return a||b;
 if(typeof a==='number'&&typeof b==='number')return Number.isFinite(a)&&Number.isFinite(b)?Math.max(a,b):(Number.isFinite(a)?a:b);
 if(Array.isArray(a)&&Array.isArray(b)){
  const by=new Map();for(const x of [...b,...a])by.set(JSON.stringify(x),x);return [...by.values()].slice(-2000);
 }
 if(a&&b&&typeof a==='object'&&typeof b==='object'&&!Array.isArray(a)&&!Array.isArray(b)){
  const out={...b};for(const [k,v] of Object.entries(a)){if(k==='__proto__'||k==='constructor'||k==='prototype')continue;out[k]=mergeValue(v,b[k])}return out
 }
 return a; // keep a device's current value in an unresolvable same-key conflict
}
function choose(k,base,local,remote){if(local===remote)return local;if(local===base)return remote;if(remote===base)return local;
 if(local===undefined)return remote;if(remote===undefined)return local;
 try{const x=JSON.parse(local),y=JSON.parse(remote);return JSON.stringify(mergeValue(x,y))}catch{return local}
}
function merged(base,local,remote){const result={};for(const k of new Set([...Object.keys(base),...Object.keys(local),...Object.keys(remote)])){
 if(!isProgress(k))continue;const value=choose(k,base[k],local[k],remote[k]);if(typeof value==='string')result[k]=value;
 }return result}
function sameRecords(a,b){const ak=Object.keys(a),bk=Object.keys(b);return ak.length===bk.length&&ak.every(k=>a[k]===b[k])}
// Validate the complete incoming profile before any of the active records are touched.
function validRecords(records){
 if(!records||typeof records!=='object'||Array.isArray(records))throw Error('صيغة بيانات التقدم غير صالحة. لم نُغيّر بياناتك المحلية.');
 const entries=Object.entries(records);
 if(entries.length>100)throw Error('عدد سجلات التقدم كبير جداً. لم نُغيّر بياناتك المحلية.');
 for(const [k,v] of entries){
  if(!isProgress(k)||typeof v!=='string'||v.length>300000)throw Error('بعض سجلات التقدم غير صالحة أو كبيرة جداً. لم نُغيّر بياناتك المحلية.');
  try{JSON.parse(v)}catch{throw Error('تعذر قراءة أحد سجلات التقدم. لم نُغيّر بياناتك المحلية.');}
 }
 return records;
}
// Restore previous keys if quota/storage failure interrupts replacement. The profile
// switching caller keeps an additional separately named copy of the old account.
function applyRecords(next){
 validRecords(next);
 const old=collect();
 if(sameRecords(old,next))return false;
 try{
  for(const k of Object.keys(old))if(!Object.prototype.hasOwnProperty.call(next,k))localStorage.removeItem(k);
  for(const [k,v] of Object.entries(next))if(old[k]!==v)localStorage.setItem(k,v);
 }catch(err){
  try{
   for(const k of Object.keys(collect()))localStorage.removeItem(k);
   for(const [k,v] of Object.entries(old))localStorage.setItem(k,v);
  }catch(rollbackError){
   // The caller can still recover the saved per-account profile or a backup.
   throw Error('فشل حفظ التقدم، وتعذّر استرجاعه تلقائياً. لا تغلق الصفحة واحفظ نسخة احتياطية.');
  }
  throw Error('مساحة المتصفح لا تكفي لحفظ التقدم. احتفظنا بالبيانات السابقة دون تغيير.');
 }
 return true;
}

async function request(path,options={}){const s=session();const headers={'Content-Type':'application/json'};if(s)headers.Authorization='Bearer '+s.token;
 let res;try{res=await fetch(api+path,{...options,headers,cache:'no-store'})}catch{throw Error('تعذر الاتصال بالخدمة. تحقق من الإنترنت أو عنوان الخادم.')}
 let data;try{data=await res.json()}catch{throw Error('استجابة غير مفهومة من الخدمة.')}
 if(!res.ok){const messages={username_taken:'اسم المستخدم مستعمل. اختر اسماً آخر.',incorrect_login:'الاسم أو كلمة المرور غير صحيحين.',invalid_credentials_format:'الاسم 3–24 حرفاً، وكلمة المرور 10 أحرف على الأقل.',rate_limited:'محاولات كثيرة. حاول مرة أخرى بعد ربع ساعة.',unauthorized:'انتهت الجلسة. سجل الدخول من جديد.',too_large:'حجم تقدمك كبير جداً للمزامنة.',conflict:'حدث تعديل متزامن، أعد المحاولة.'};const err=Error(messages[data.error]||'حدث خطأ في خدمة الحسابات.');err.code=data.error;throw err}
 return data}
// The learner's progress must never be mixed with another account on a shared browser.
function readProfile(k){try{const v=JSON.parse(localStorage.getItem(k)||'{}');const out={};for(const [name,value] of Object.entries(safeObj(v)))if(isProgress(name)&&typeof value==='string'){try{JSON.parse(value);out[name]=value}catch{}}return out}catch{return {}}}
function saveProfile(k){localStorage.setItem(k,JSON.stringify(collect()))}
function replaceProgress(records){return applyRecords(records)}

function switchProfile(username,importGuest=false){
 const previous=localStorage.getItem(OWNER)||GUEST;
 if(previous===username){localStorage.setItem(OWNER,username);return}
 // Legacy V43 browsers can have no OWNER, but still have existing guest work.
 const saveKey=previous===GUEST?GUEST_PROFILE:'academy-cloud-profile-'+previous;
 saveProfile(saveKey);
 // Only creation of a new account imports guest progress automatically.
 // Login to an existing account must NOT silently mix another person's guest work.
 const destination=readProfile('academy-cloud-profile-'+username);
 const incoming=importGuest&&previous===GUEST?merged({},collect(),destination):destination;
 replaceProgress(incoming);
 localStorage.setItem(OWNER,username);
}
function switchToGuest(){
 const previous=localStorage.getItem(OWNER);
 if(previous&&previous!==GUEST)saveProfile('academy-cloud-profile-'+previous);
 const guest=readProfile(GUEST_PROFILE);
 replaceProgress(guest);
 localStorage.setItem(OWNER,GUEST);
}
function setStatus(s){status=s;document.dispatchEvent(new CustomEvent('academy-cloud-status',{detail:{status:s,username:session()?.username||''}}));const label=document.getElementById('cloudStatusLink');if(label)label.textContent=session()?'☁️ '+session().username:'☁️ حسابي'}
async function login(username,password,create){if(!enabled)throw Error('خدمة الحسابات لم تُربط بالموقع بعد.');
 const data=await request(create?'/register':'/login',{method:'POST',body:JSON.stringify({username,password})});
 switchProfile(data.username,create);localStorage.setItem(SESSION,JSON.stringify({username:data.username,token:data.token,expiresAt:data.expiresAt}));
 localStorage.removeItem(SNAP);setStatus('تم تسجيل الدخول. جارٍ ربط التقدم...');try{const result=await sync(true);data.synced=!!result?.synced}catch(err){if(!session())throw err;data.synced=false;data.syncWarning=err.message}if(!session())throw Error('انتهت جلسة الحساب أثناء التحقق منها، يرجى تسجيل الدخول مرة أخرى.');return data}
async function logout(){
 let synced=false,revoked=false;
 if(session()&&enabled){
  try{const result=await sync(true);synced=!!result?.synced}catch{}
  try{await request('/logout',{method:'POST'});revoked=true}catch{}
 }
 // Keep each account's local progress even when the network is offline.
 switchToGuest();localStorage.removeItem(SESSION);localStorage.removeItem(SNAP);
 setStatus(synced?'تم حفظ تقدمك على الحساب وتسجيل الخروج.':'تم تسجيل الخروج؛ التغييرات الأخيرة محفوظة محلياً فقط حتى تعود للمزامنة.');
 return {synced,revoked};
}
async function sync(manual=false){if(!enabled||!session())return {synced:false,reason:'not_configured_or_signed_out'};
 if(busy)return busy;
 busy=(async()=>{
  try{
   const s=session();await request('/me');if(session()?.token!==s.token)return {synced:false};let changed=false,uploaded=false;
   for(let attempts=0;attempts<4;attempts++){
    const cloud=await request('/progress');if(session()?.token!==s.token)return {synced:false};const local=collect();const prev=snapshot(s.username);const base=prev?prev.records:{};
    const next=merged(base,local,validRecords(cloud.records));
    const applyChanged=applyRecords(next);changed=changed||applyChanged;
    if(sameRecords(next,safeObj(cloud.records))){
     localStorage.setItem(SNAP,JSON.stringify({username:s.username,version:cloud.version,records:next}));setStatus('آخر مزامنة ناجحة');
     if(changed)freshNotice();return {synced:true,changed,uploaded};
    }
    try{
     const result=await request('/progress',{method:'PUT',body:JSON.stringify({version:cloud.version,records:next})});
     uploaded=true;localStorage.setItem(SNAP,JSON.stringify({username:s.username,version:result.version,records:next}));setStatus('تم حفظ التقدم على الحساب');
     if(changed)freshNotice();return {synced:true,changed,uploaded};
    }catch(err){if(err.code!=='conflict'||attempts===3)throw err}
   }
  }catch(err){if(err.code==='unauthorized'){switchToGuest();localStorage.removeItem(SESSION);localStorage.removeItem(SNAP);freshNotice()}setStatus(err.message);if(manual)throw err;return {synced:false,error:err.message}}
 })().finally(()=>{busy=null});return busy
}
function hasGuestProgress(){return Object.keys(readProfile(GUEST_PROFILE)).length>0}
async function importGuestProgress(){
 if(!session()||!enabled)throw Error('سجّل الدخول أولاً لاستخدام الاستيراد.');
 const guest=readProfile(GUEST_PROFILE);if(!Object.keys(guest).length)return {synced:true,imported:false};
 const next=merged({},collect(),guest);
 applyRecords(next);
 const result=await sync(true);
 return {...result,imported:true};
}
function freshNotice(){if(location.pathname.endsWith('account.html'))return;
 // The running page may have loaded older state; show a gentle link instead of disrupting active exercises.
 let el=document.getElementById('cloudFreshNotice');if(!el){el=document.createElement('div');el.id='cloudFreshNotice';el.className='cloud-fresh-notice';document.body.append(el)}
 el.textContent='☁️ وصل تقدم من جهاز آخر. ';const a=document.createElement('a');a.href=location.href;a.textContent='تحديث الصفحة لعرضه';el.append(a);
}
function nav(){if(location.pathname.endsWith('account.html'))return;const n=document.querySelector('#months')||document.querySelector('header nav')||document.querySelector('header');if(!n)return;
 const a=document.createElement('a');a.id='cloudStatusLink';a.className='cloud-account-link';a.href='account.html';a.textContent=session()?'☁️ '+session().username:'☁️ حسابي';n.append(a)}
function boot(){nav();if(!enabled||!session())return;sync(false);setInterval(()=>{if(document.visibilityState==='visible')sync(false)},30000);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')sync(false)});
}
function preflight(){if(session())return;const owner=localStorage.getItem(OWNER);if(owner&&owner!==GUEST){try{switchToGuest()}catch(e){setStatus('تعذّر فصل التقدم المحلي. احفظ نسخة احتياطية من بياناتك.')}}}
preflight();
window.AcademyCloud={configured:enabled,session,login,logout,sync,collect,hasGuestProgress,importGuestProgress,get status(){return status}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
