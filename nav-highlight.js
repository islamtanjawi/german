/* Navigation: highlight only links to the current local page. */
(()=>{
  const current=new URL(location.href);
  const page=current.pathname.replace(/\/$/,'/index.html');
  document.querySelectorAll('.topbar nav a, .topbar > a:not(.brand)').forEach(link=>{
    try{
      const url=new URL(link.getAttribute('href'),location.href);
      if(url.origin!==current.origin)return;
      const target=url.pathname.replace(/\/$/,'/index.html');
      if(target===page){
        link.setAttribute('aria-current','page');
      }else if(link.getAttribute('aria-current')==='page'){
        link.removeAttribute('aria-current');
      }
    }catch(_){/* Ignore malformed links. */}
  });
})();
