(()=>{'use strict';
const status=document.getElementById('leaderboardStatus'),list=document.getElementById('leaderboardList');
const api=window.AcademyCloudConfig?.apiBase?.replace(/\/+$/,'');
if(!api||!/^https:\/\//.test(api)){status.textContent='الترتيب العام غير متاح: عنوان الخدمة غير مضبوط.';return;}
const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),8000);
fetch(api+'/leaderboard',{headers:{Accept:'application/json'},cache:'no-store',signal:controller.signal}).then(async r=>{if(!r.ok)throw Error('not_ready');return r.json()}).then(data=>{
 if(!data||!Array.isArray(data.leaders))throw Error('invalid');
 const rows=data.leaders.filter(x=>x&&typeof x.username==='string'&&x.username.length<=24&&Number.isFinite(x.percent)&&x.percent>=0&&x.percent<=100&&x.public===true).sort((a,b)=>b.percent-a.percent||a.username.localeCompare(b.username,'ar')).slice(0,50);
 if(!rows.length){status.textContent='لا يوجد متصدرون وافقوا على الظهور بعد.';return;}
 status.textContent='ترتيب المتعلمين المشاركين · من أنجز مراحل أكثر يتقدم';
 rows.forEach((x,i)=>{const li=document.createElement('li');const rank=document.createElement('span');rank.className='leaderboard-rank';rank.textContent=i===0?'👑 1':String(i+1);const name=document.createElement('span');name.className='leaderboard-name';name.textContent=x.username;const pct=document.createElement('span');pct.className='leaderboard-percent';pct.textContent=x.percent.toFixed(1)+'%';li.append(rank,name,pct);list.append(li)});
}).catch(()=>{status.textContent='لوحة المتصدرين جاهزة في الموقع، لكن خدمة الترتيب العام لم تُفعّل بعد على الخادم. لن نعرض ترتيباً وهمياً.'}).finally(()=>clearTimeout(timer));
})();