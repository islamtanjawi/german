/*
 * Loads exactly one manual Google AdSense placement per approved page.
 * No advertising code or remote request is made while enabled:false.
 * enabled:true is NOT proof of the visitor's consent: install/configure an
 * appropriate CMP in Google AdSense Privacy & messaging before activation.
 */
(function(){
  'use strict';
  const config=window.AcademyAdsConfig;
  if(!config || config.enabled !== true) return;
  if(config.publisherId !== 'ca-pub-8238267046509365') return;
  if(!config.slots || config.slots.home !== '3189536938' || config.slots.lessons !== '8137390094') return;

  const placements=Array.from(document.querySelectorAll('[data-academy-ad]'));
  if(!placements.length) return;

  let scriptStarted=false;
  function fitsFixedUnit(placement){
    const style=getComputedStyle(placement);
    const parent=placement.parentElement;
    if(!parent) return false;
    // The ad remains hidden until eligible; measure its visible parent instead.
    const available=parent.getBoundingClientRect().width -
      parseFloat(style.paddingLeft||0) - parseFloat(style.paddingRight||0);
    return window.innerWidth >= 800 && available >= 728;
  }
  function requestEligibleAds(){
    const eligible=[];
    placements.forEach(function(placement){
      const position=placement.getAttribute('data-academy-ad');
      const slot=config.slots[position];
      const ad=placement.querySelector('ins.adsbygoogle');
      if(!slot || !ad || ad.getAttribute('data-ad-client') !== config.publisherId ||
         ad.getAttribute('data-ad-slot') !== slot || ad.dataset.academyRequested === '1') return;
      if(position==='lessons' && !fitsFixedUnit(placement)){
        placement.hidden=true;
        return;
      }
      placement.hidden=false;
      eligible.push(ad);
    });
    if(!eligible.length) return;
    if(!scriptStarted){
      scriptStarted=true;
      if(!document.querySelector('script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')){
        const script=document.createElement('script');
        script.async=true;
        script.crossOrigin='anonymous';
        script.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+encodeURIComponent(config.publisherId);
        document.head.appendChild(script);
      }
    }
    requestAnimationFrame(function(){
      eligible.forEach(function(ad){
        const placement=ad.closest('[data-academy-ad]');
        if(!placement || placement.hidden) return;
        if(placement.getAttribute('data-academy-ad')==='lessons' && !fitsFixedUnit(placement)){
          placement.hidden=true;
          return;
        }
        if(ad.dataset.academyRequested === '1') return;
        ad.dataset.academyRequested='1';
        (window.adsbygoogle=window.adsbygoogle||[]).push({});
      });
    });
  }
  requestEligibleAds();
  // A visitor may rotate a tablet or enlarge the browser after opening lessons.
  // Previously requested units will never be requested twice.
  if(placements.some(p=>p.getAttribute('data-academy-ad')==='lessons')){
    let frame=0;
    window.addEventListener('resize',function(){
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(requestEligibleAds);
    },{passive:true});
  }
})();
