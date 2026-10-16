/* Shared header/footer. Everything directory-specific comes from window.SITE (directories/<slug>/config.js). */
(function(){
  var S=window.SITE,C=S.community,page=document.body.getAttribute('data-page'),res=(S.resources||[]).length>0;
  var esc=function(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var links=[["members.html","Local Businesses","members"],res?["new-resident.html","New Resident Guide","guide"]:null,["offers.html","Deals","offers"],["community.html","Community","community"]].filter(Boolean);
  var nav=links.map(function(l){return '<a href="'+l[0]+'"'+(l[2]===page?' aria-current="page"':'')+'>'+l[1]+'</a>';}).join('');
  var logo=S.brand&&S.brand.logo?'<img src="'+S.brand.logo+'" alt="" width="36" height="36">':'<span class="mono" aria-hidden="true">'+esc((S.brand&&S.brand.monogram)||C.charAt(0))+'</span>';
  var L=S.links||{};
  document.getElementById('hdr').outerHTML=
   '<a class="skip" href="#main">Skip to content</a>'+
   '<header class="hdr"><div class="wrap hdr-in"><a class="brand" href="index.html">'+logo+esc(S.name)+'</a>'+
   '<button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>'+
   '<nav class="nav" id="nav" aria-label="Main">'+nav+'<a class="btn btn-gold" href="join.html">Get Listed</a></nav></div></header>';
  var li=function(h,t){return '<li><a href="'+h+'"'+(/^https?:/.test(h)?' rel="noopener"':'')+'>'+t+'</a></li>'};
  var em=S.emergency||[];
  document.getElementById('ftr').outerHTML=
   '<footer class="ftr"><div class="wrap"><div class="cols"><div><p class="brand" style="margin:0">'+esc(S.name)+'</p><p>'+esc(S.tagline||('Built for '+C+'. Not the whole internet.'))+'</p>'+(S.area?'<p>'+esc(S.area)+'</p>':'')+'<p class="note" style="color:#c9c3b6">Prototype for review. Items marked Example or Placeholder are not real yet.</p></div>'+
   '<div><b>Residents</b><ul>'+(res?li('new-resident.html','New Resident Guide'):'')+li('offers.html','Deals')+li('community.html','Community')+(res?li('help.html','Help'):'')+li('events.html','Events')+li('announcements.html','Announcements')+li('recommend.html','Recommend a business')+li('my-harvest.html','My '+esc(C))+'</ul></div>'+
   '<div><b>Businesses</b><ul>'+li('members.html','Local Businesses')+li('featured.html','Business of the Month')+li('join.html','Get Listed, $'+S.join.price+'/mo')+(L.signIn?li(L.signIn,'Sign In'):'')+(L.dashboard?li(L.dashboard,'Member Dashboard'):'')+'</ul></div>'+
   '<div><b>Emergency</b><ul>'+li('tel:911','Call 911')+em.map(function(e){return li('tel:'+e[1].replace(/\D/g,''),esc(e[0])+' '+esc(e[1]))}).join('')+'</ul></div></div>'+
   '<p class="fine">&copy; 2026 '+esc(S.name)+'. Powered by <a href="https://doorsteplocal.com" rel="noopener" style="color:inherit">Doorstep Local</a> &middot; <a href="privacy.html" style="color:inherit">Privacy Policy</a> &middot; <a href="terms.html" style="color:inherit">Terms of Service</a></p></div></footer>';
  var b=document.querySelector('.menu-btn'),n=document.getElementById('nav');
  b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Close':'Menu';if(o){var f=n.querySelector('a');if(f)f.focus()}});
  // focus trap while the menu is open: last link -> button, button -> first link
  document.addEventListener('keydown',function(e){if(e.key!=='Tab'||!n.classList.contains('open'))return;var L=[].slice.call(n.querySelectorAll('a')),first=L[0],last=L[L.length-1];if(!e.shiftKey&&document.activeElement===last){e.preventDefault();b.focus()}else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();first.focus()}else if(e.shiftKey&&document.activeElement===first){e.preventDefault();b.focus()}else if(e.shiftKey&&document.activeElement===b){e.preventDefault();last.focus()}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.textContent='Menu';b.focus();}});
})();
