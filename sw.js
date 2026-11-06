/* Offline shell: cache only known public, static academy assets. Never cache account/API responses. */
const CACHE='de-academy-release-91';
const ASSETS=['./','./index.html','./lessons.html','./conjugation.html','./practice.html','./exam.html','./coach.html','./backup.html','./account.html','./leaderboard.html','./leaderboard.js','./leaderboard.css','./welcome.js','./welcome.css','./account.css','./account.js','./cloud-config.js','./cloud-sync.js','./review.html','./review.js','./exam-review.html','./exam-review.js','./progress.html','./progress.js','./backup.js','./app.js','./ui.js','./learning-path.js','./data.js','./data-m3.js','./lessons.js','./lessons-advanced.js','./practice.js','./conjugation.js','./conjugation-reviewed-v50.js','./conjugation-reviewed-v76.js','./exam.js','./coach.js','./style.css','./lessons.css','./conjugation.css','./manifest.webmanifest','./icon.svg','./nav-highlight.js','./pwa.js'];
const scope=new URL(self.registration.scope);
const publicPaths=new Set(ASSETS.map(asset=>new URL(asset,scope).pathname));
const home=new URL('./index.html',scope).pathname;
// Avoid storing any response that a server marks private or non-cacheable.
const canCache=response=>{
  if(!response.ok||response.type!=='basic')return false;
  const policy=(response.headers.get('Cache-Control')||'').toLowerCase();
  if(/(?:^|,)\s*(?:private|no-store|no-cache)(?:\s|,|=|$)/.test(policy))return false;
  if(response.headers.has('Set-Cookie'))return false;
  return true;
};
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    try{
      // Wait for every in-flight write before cleanup: Promise.all() rejects early,
      // allowing slower writes to repopulate a supposedly deleted partial cache.
      const results=await Promise.allSettled(ASSETS.map(async asset=>{
        const request=new Request(new URL(asset,scope));
        const response=await fetch(request);
        if(!response.ok)throw new Error('Precache asset unavailable: '+asset);
        if(!canCache(response))throw new Error('Precache asset cannot be cached safely: '+asset);
        await cache.put(request,response);
      }));
      const failure=results.find(result=>result.status==='rejected');
      if(failure)throw failure.reason;
      await self.skipWaiting();
    }catch(error){
      await caches.delete(CACHE);
      throw error;
    }
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('de-academy-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||request.headers.has('Authorization'))return;
  const url=new URL(request.url);
  if(url.origin!==scope.origin||!publicPaths.has(url.pathname)||url.search)return;
  event.respondWith(fetch(request).then(response=>{
    if(canCache(response)){
      const copy=response.clone();
      event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{}));
    }else{
      // Do not serve an older cached copy after a resource becomes private.
      event.waitUntil(caches.open(CACHE).then(cache=>cache.delete(request)).catch(()=>{}));
    }
    return response;
  }).catch(async()=>{
    const activeCache=await caches.open(CACHE);
    const cached=await activeCache.match(request);
    if(cached)return cached;
    if(request.mode==='navigate')return (await activeCache.match(home))||Response.error();
    return Response.error();
  }));
});
