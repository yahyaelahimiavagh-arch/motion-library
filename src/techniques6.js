/* ===== Video 10: talking-head interview — head-anchored camera moves (digital punch-ins) + layered text ===== */
const FIG = `<svg class="fg" viewBox="0 0 27 48"><g stroke="#050a12" stroke-width=".38" fill="none" stroke-linecap="round"><path d="M10 33.2L8 46.5M17.2 33.2L19.2 46.5M13.6 33.6L13.6 45.5M8.6 41.3h10.5"/></g><rect x="9" y="32.2" width="9" height="1.3" rx=".65" fill="#06372F"/><path d="M19.6 30.4L23.6 30.4L24 41L20.4 41.3Z" fill="#4F6A7C"/><path d="M11 31L14.8 31L14.6 41.6L11.2 41.4Z" fill="#46627A"/><path d="M9.6 29.4L23.2 29.4Q24 29.6 24 31L24 32L9.6 32Z" fill="#4F6A7C"/><ellipse cx="22.3" cy="41.9" rx="2.1" ry=".9" fill="#C9C3BB"/><ellipse cx="12.9" cy="42.3" rx="2" ry=".9" fill="#B8B2AA"/><path d="M9.2 19.8Q13.5 17.6 17.8 19.8L18.8 30.2L8.2 30.2Z" fill="#0B1D4A"/><rect x="12.4" y="17.2" width="2.2" height="2.2" fill="#A9664A"/><g id="aL"><path d="M9.5 20.8L7.6 25.6L10.6 27.2" stroke="#16307A" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.9" cy="27.2" r=".85" fill="#A9664A"/></g><g id="aR"><path d="M17.5 20.8L19.4 25.6L16.4 27.2" stroke="#16307A" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16.1" cy="27.2" r=".85" fill="#A9664A"/></g><ellipse cx="13.5" cy="15.8" rx="2.1" ry="2.6" fill="#A9664A"/><ellipse cx="13.5" cy="13.7" rx="2.8" ry="1.7" fill="#1b1210"/><circle cx="11.3" cy="14.4" r="1" fill="#1b1210"/><circle cx="15.7" cy="14.4" r="1" fill="#1b1210"/><circle cx="12.4" cy="12.6" r="1" fill="#1b1210"/><circle cx="14.8" cy="12.6" r="1" fill="#1b1210"/></svg>`;

const SCENE_CSS = `.stage{background:#00162A}
.bgl{position:absolute;left:-8rem;top:-8rem;width:43rem;height:64rem;background:radial-gradient(70% 30% at 50% 88%,#04415B 0%,transparent 70%),radial-gradient(60% 40% at 30% 30%,#002E46 0%,transparent 70%),radial-gradient(50% 35% at 75% 55%,#00263E 0%,transparent 70%),#002039}
.bk{position:absolute;border-radius:50%;filter:blur(.7rem);background:rgba(20,90,130,.28)}
.sub{position:absolute;left:0;top:0;width:27rem;height:48rem}
.fg{position:absolute;left:0;top:0;width:27rem;height:48rem;overflow:visible}
.lb{position:absolute;left:1rem;top:1rem;font:600 .8rem/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#DBBFAA;opacity:.85;z-index:9}
.fl{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:8}`;

const SCENE_HTML = `<div class="bgl" id="bg"><i class="bk" style="left:6rem;top:10rem;width:7rem;height:7rem"></i><i class="bk" style="left:30rem;top:22rem;width:9rem;height:9rem"></i><i class="bk" style="left:12rem;top:38rem;width:6rem;height:6rem"></i></div><div class="sub" id="sub">${FIG}</div>`;

const CAMJS = `const HD=[13.5,15.8],aL=document.getElementById('aL'),aR=document.getElementById('aR'),sub=document.getElementById('sub'),bg=document.getElementById('bg');
function cam(s,T){sub.style.transformOrigin=HD[0]+'rem '+HD[1]+'rem';sub.style.transform='translate('+(T[0]-HD[0])+'rem,'+(T[1]-HD[1])+'rem) scale('+s+')'}
function camBg(s,T,k){bg.style.transformOrigin=HD[0]+'rem '+HD[1]+'rem';bg.style.transform='translate('+((T[0]-HD[0])*k)+'rem,'+((T[1]-HD[1])*k)+'rem) scale('+(1+(s-1)*k)+')'}
function gest(t){aL.setAttribute('transform','rotate('+(Math.sin(t*3.1)*9)+' 9.5 20.8)');aR.setAttribute('transform','rotate('+(Math.sin(t*2.6+1)*-9)+' 17.5 20.8)')}`;

TECHS.push(
{ v:10, id:'punchcut', fa:'Punch-in: cut between wide and close shots', en:'Digital Punch-in Jump Cuts', cat:'fx',
  when:'Giving an interview video rhythm with a static camera. Every 3 to 5 seconds there is a hard cut between the full shot (1×) and a close shot (2.2 to 2.5×). No transition animation; just the cut and a very faint flash.',
  timing:'Wide shot 1.6 to 3.2 s · close shot 1.8 to 4 s · close zoom factor 2.2 to 2.5 · hard cut with no tunneling · 8% flash for 0.1 s',
  where:'Whole video (seconds 1.8, 3.7, 7, 12, 15.5 and 21)', colors:['#002039','#002E46','#04415B','#DBBFAA'], dur:7.2,
  css:SCENE_CSS,
  html:`<div class="stage">${SCENE_HTML}<div class="lb" id="lb"></div><div class="fl" id="fl"></div></div>`,
  js:`${CAMJS}
const lb=document.getElementById('lb'),fl=document.getElementById('fl');
const S=[[0,1.8,1.08,1.0,[14.2,17.6],[14.2,17.9]],[1.8,3.6,2.4,2.0,[10.8,11.8],[11.6,13.6]],[3.6,5.2,1.0,1.12,[14.4,17.9],[14.2,16.8]],[5.2,7.2,2.2,1.9,[11.2,12.4],[11.8,14.2]]];
play(7.2,t=>{
  const k=S.find(x=>t>=x[0]&&t<x[1])||S[3],u=ease.out(seg(t,k[0],k[1])),s=lerp(k[2],k[3],u),T=[lerp(k[4][0],k[5][0],u),lerp(k[4][1],k[5][1],u)];
  cam(s,T);camBg(s,T,.35);gest(t);
  lb.textContent='x'+s.toFixed(2)+(k[2]>1.5?'  PUNCH-IN':'  WIDE');
  fl.style.opacity=.08*Math.max(0,1-(t-k[0])/.1);
});` },

{ v:10, id:'headdrift', fa:'Slow camera drift locked on the head', en:'Head-locked Slow Push (Ken Burns)', cat:'fx',
  when:'Inside each shot. The zoom origin is always the speaker\'s head, not the center of the frame, so the head stays on the thirds lines and the body and hands slide relative to it. A close shot eases back slowly, a wide shot eases forward.',
  timing:'Close: from 2.4× to 1.9× in 3 s (ease-out) · wide: from 1.0× to 1.12× in 3 s · the head slides down 1 to 2.5rem · scale origin = head',
  where:'Every shot in the video', colors:['#002039','#DBBFAA','#F0EBEF'], dur:6.4,
  css:`${SCENE_CSS}
.gd{position:absolute;inset:0;pointer-events:none;z-index:7}
.gd i{position:absolute;background:rgba(240,235,239,.28)}
.hx{position:absolute;width:1.6rem;height:1.6rem;margin:-.8rem;border:.12rem solid #DBBFAA;border-radius:50%;z-index:7;box-shadow:0 0 .8rem rgba(219,191,170,.6)}`,
  html:`<div class="stage">${SCENE_HTML}<div class="gd"><i style="left:9rem;top:0;bottom:0;width:1px"></i><i style="left:18rem;top:0;bottom:0;width:1px"></i><i style="top:16rem;left:0;right:0;height:1px"></i><i style="top:32rem;left:0;right:0;height:1px"></i></div><div class="hx" id="hx"></div><div class="lb" id="lb"></div></div>`,
  js:`${CAMJS}
const hx=document.getElementById('hx'),lb=document.getElementById('lb');
play(6.4,t=>{
  let s,T;if(t<3.2){const u=ease.out(seg(t,0,3.2));s=lerp(2.4,1.9,u);T=[lerp(10.6,11.6,u),lerp(11,13.6,u)]}else{const u=ease.out(seg(t-3.2,0,3.2));s=lerp(1,1.12,u);T=[lerp(14.4,14.2,u),lerp(17.9,16.6,u)]}
  cam(s,T);camBg(s,T,.35);gest(t);hx.style.left=T[0]+'rem';hx.style.top=T[1]+'rem';
  lb.textContent=(t<3.2?'PUSH-OUT  ':'PUSH-IN  ')+'x'+s.toFixed(2);
});` },

{ v:10, id:'layerparallax', fa:'Layered parallax: subject separated from the background', en:'Subject / Background Parallax Scale', cat:'fx',
  when:'Giving depth to flat footage. The subject is split into a layer separate from the background, and during a zoom the subject grows 4 to 5% per second while the background grows only about 1%; the feel of a real dolly.',
  timing:'Subject 4.5%/s · background 1%/s (a 0.35 factor of the subject zoom) · comparison 3 s flat and 3 s parallax · blurred background to hide edges',
  where:'Close shot seconds 2 to 3.5 and wide shot seconds 12 to 15', colors:['#002039','#04415B','#00263E'], dur:6.4,
  css:`${SCENE_CSS}
.bgl{background-image:radial-gradient(#1c5a7a 1.5px,transparent 2px),radial-gradient(70% 30% at 50% 88%,#04415B 0%,transparent 70%),radial-gradient(60% 40% at 30% 30%,#002E46 0%,transparent 70%),radial-gradient(#fff0 0,#fff0 0);background-size:2.2rem 2.2rem,auto,auto,auto;background-color:#002039}
.lb{font-size:.85rem;line-height:1.5}`,
  html:`<div class="stage">${SCENE_HTML}<div class="lb" id="lb"></div></div>`,
  js:`${CAMJS}
const lb=document.getElementById('lb');
play(6.4,t=>{
  const par=t>=3.2,u=ease.inOut(seg(t%3.2,.2,2.9)),s=lerp(1.3,2.1,u),T=[lerp(13,11.4,u),lerp(17,13,u)],k=par?.3:1;
  cam(s,T);camBg(s,T,k);gest(t);
  lb.innerHTML=(par?'PARALLAX':'FLAT')+'<br>subject  x'+s.toFixed(2)+'<br>background  x'+(1+(s-1)*k).toFixed(2);
});` },

{ v:10, id:'headroomtext', fa:'Headline in the headroom and pills beside the head', en:'Head-anchored Text Placement', cat:'layout',
  when:'Placing text over an interview video. In a wide shot the big title sits exactly above the head (headroom) and moves with it. In a close shot text pills slide in from the right edge, level with the face, beside the head.',
  timing:'Title 0.7 s · blur 6 to 0 · fixed 9rem gap above the head · pills 0.5 s, 1.2 s apart, stretching to the left · each pill stays 1.8 s',
  where:'Seconds 4 to 7 and 7 to 11', colors:['#DBBFAA','#F0EBEF','#002039'], dur:7.2,
  css:`${SCENE_CSS}
.tt{position:absolute;left:0;right:0;text-align:center;direction:ltr;font:800 3.4rem/1.1 'Inter Tight',sans-serif;color:#DBBFAA;text-shadow:0 .2rem 1.2rem rgba(0,0,0,.4);z-index:5}
.tt small{display:block;font:500 1.2rem 'Inter Tight',sans-serif;color:#E8D8C4;opacity:.85;margin-top:.2rem}
.pl{position:absolute;height:3rem;min-width:7rem;padding:0 1.4rem;border-radius:1.5rem;border:.1rem solid rgba(240,235,239,.75);background:rgba(255,255,255,.06);-webkit-backdrop-filter:blur(.6rem);backdrop-filter:blur(.6rem);color:#fff;display:flex;align-items:center;justify-content:center;direction:ltr;font:700 1.35rem 'Inter Tight',sans-serif;z-index:5}`,
  html:`<div class="stage">${SCENE_HTML}<div class="tt" id="tt">The real problem<small>isn't always the content</small></div><div class="pl" id="p1">Imagine</div><div class="pl" id="p2">Publish</div></div>`,
  js:`${CAMJS}
const tt=document.getElementById('tt'),p1=document.getElementById('p1'),p2=document.getElementById('p2');
play(7.2,t=>{
  const wide=t<3.4;let s,T;
  if(wide){const u=ease.out(seg(t,0,3.4));s=lerp(1,1.1,u);T=[lerp(14.4,14.2,u),lerp(17.9,16.8,u)]}else{const u=ease.out(seg(t-3.4,0,3.8));s=lerp(2.3,2.0,u);T=[lerp(10.6,11.4,u),lerp(11.8,13.4,u)]}
  cam(s,T);camBg(s,T,.35);gest(t);
  const hy=HD[1]+(T[1]-HD[1]),a=ease.out(seg(t,.4,1.1));
  tt.style.top=(T[1]-9.4-(wide?0:99))+'rem';tt.style.opacity=wide?a*(1-seg(t,3.1,3.35)):0;tt.style.filter='blur('+(1-a)*6+'px)';tt.style.transform='translateY('+lerp(1,0,a)+'rem)';
  [[p1,4.2],[p2,5.9]].forEach(([p,t0],i)=>{const e=ease.back(seg(t,t0,t0+.5)),x=seg(t,t0+1.5,t0+1.8);p.style.top=(T[1]-5.2+i*0)+'rem';p.style.left=(T[0]+4.2+(1-e)*14+(i?1.2:0))+'rem';p.style.opacity=(wide?0:seg(t,t0,t0+.2)*(1-x));p.style.transform='scaleX('+lerp(1.5,1,e)+')'});
  p2.style.top=(T[1]-1.2)+'rem';
});` },

{ v:10, id:'rackfocus', fa:'Rack focus: blurred subject, sharp text', en:'Rack Focus to Text', cat:'fx',
  when:'When the text matters. The subject and background go out of focus with a soft blur while the text stays sharp; then the focus returns to the subject. It sends the eye to the text without cutting the video.',
  timing:'Subject blur 0 to 0.6rem in 0.6 s · hold 2 s · return 0.5 s · background blur fixed at 0.7rem · text letters delayed 0.06 s',
  where:'Seconds 4 to 7', colors:['#DBBFAA','#002039','#F0EBEF'], dur:5.2,
  css:`${SCENE_CSS}
.tt{position:absolute;left:0;right:0;top:6rem;text-align:center;direction:ltr;font:800 3.6rem/1.15 'Inter Tight',sans-serif;color:#DBBFAA;z-index:5}
.tt span{display:inline-block}
.sb{position:absolute;left:3rem;right:3rem;top:15rem;text-align:center;direction:ltr;font:500 1.2rem/1.6 'Inter Tight',sans-serif;color:#E8D8C4;z-index:5}`,
  html:`<div class="stage">${SCENE_HTML}<div class="tt" id="tt"></div><div class="sb" id="sb">Good content without strategy is just a cost.</div></div>`,
  js:`${CAMJS}
const tt=document.getElementById('tt'),sb=document.getElementById('sb'),W='Key problem';
tt.innerHTML='<span>Key</span> <span>problem</span>';const sp=[...tt.children];
play(5.2,t=>{
  const s=lerp(1,1.08,ease.out(seg(t,0,5.2))),T=[14.3,17.4];cam(s,T);camBg(s,T,.35);gest(t);
  const f=ease.inOut(seg(t,.6,1.2))*(1-ease.inOut(seg(t,3.6,4.2)));
  sub.style.filter='blur('+(.6*f)+'rem)';bg.style.filter='blur(.7rem)';
  sp.forEach((e,i)=>{const a=ease.out(seg(t,1+i*.25,1.7+i*.25))*(1-seg(t,3.5,4.1));e.style.opacity=a;e.style.transform='translateY('+lerp(1.2,0,a)+'rem)';e.style.filter='blur('+(1-a)*.5+'rem)'});
  sb.style.opacity=ease.out(seg(t,1.8,2.5))*(1-seg(t,3.5,4.1));
});` },

{ v:10, id:'archframe', fa:'Thin arch frame behind the subject', en:'Arch Outline Frame Behind Subject', cat:'layout',
  when:'A wide shot when you want the text and the subject to become one unit. A thin white line shaped like an arch (a tall capsule) is drawn around the subject, the text sits inside the arch above the head and the subject stands in front of it.',
  timing:'Line draws in 1.2 s from bottom to top (both sides together) · ease-in-out · 1 px thick · 55% opacity · text 0.5 s after the line arrives',
  where:'Seconds 4 to 7', colors:['#F0EBEF','#DBBFAA','#002039'], dur:5.6,
  css:`${SCENE_CSS}
svg.ar{position:absolute;left:0;top:0;width:27rem;height:48rem;z-index:2;overflow:visible}
.tt{position:absolute;left:0;right:0;top:8rem;text-align:center;direction:ltr;font:800 3rem/1.2 'Inter Tight',sans-serif;color:#DBBFAA;z-index:1}
.tt small{display:block;font:500 1.05rem/1.6 'Inter Tight',sans-serif;color:#E8D8C4;opacity:.85;margin-top:.5rem}`,
  html:`<div class="stage">${SCENE_HTML}<svg class="ar" viewBox="0 0 27 48"><path id="a1" d="M3.5 36 V10.5 A5.5 5.5 0 0 1 14.5 10.5" fill="none" stroke="#F0EBEF" stroke-opacity=".55" stroke-width=".08"/><path id="a2" d="M24.5 36 V10.5 A5.5 5.5 0 0 0 14.5 10.5" fill="none" stroke="#F0EBEF" stroke-opacity=".55" stroke-width=".08"/><path d="M3.5 36A10.5 4 0 0 0 24.5 36" fill="none" stroke="#F0EBEF" stroke-opacity=".55" stroke-width=".08" id="a3"/></svg><div class="tt" id="tt">The real problem<small>Content needs a strategy behind it.</small></div></div>`,
  js:`${CAMJS}
const a1=document.getElementById('a1'),a2=document.getElementById('a2'),a3=document.getElementById('a3'),tt=document.getElementById('tt');
const L1=a1.getTotalLength(),L3=a3.getTotalLength();[a1,a2].forEach(p=>p.style.strokeDasharray=L1);a3.style.strokeDasharray=L3;
play(5.6,t=>{
  const s=lerp(1.02,1.1,ease.out(seg(t,0,5.6))),T=[13.8,17.4];cam(s,T);camBg(s,T,.35);gest(t);
  const u=ease.inOut(seg(t,.3,1.5)),o=1-seg(t,5,5.6);
  [a1,a2].forEach(p=>{p.style.strokeDashoffset=L1*(1-u);p.style.opacity=o});a3.style.strokeDashoffset=L3*(1-ease.out(seg(t,.2,.8)));a3.style.opacity=o;
  const a=ease.out(seg(t,1.4,2.1));tt.style.opacity=a*o;tt.style.filter='blur('+(1-a)*5+'px)';tt.style.transform='translateY('+lerp(1,0,a)+'rem)';
});` },

{ v:10, id:'lowercard', fa:'Glass lower card and floating stars', en:'Glass Lower-Third + Sparkle Stars', cat:'ui',
  when:'Introducing the speaker or brand in the first 2 seconds. A frosted glass card with an icon, a name and a short description settles calmly from the lower corner, tilted, with two four-point stars that spin and leave.',
  timing:'Card 0.8 s · back-ease with a 6 to 0 degree rotation · stars spin 90 degrees over 1.5 s · the card stays 3 s and goes down',
  where:'Seconds 0.2 to 3', colors:['#9DB4CE','#365A8A','#F0EBEF','#DBBFAA'], dur:4.6,
  css:`${SCENE_CSS}
.cd{position:absolute;left:1.2rem;right:1.2rem;bottom:2.6rem;height:7.5rem;border-radius:1.2rem;background:linear-gradient(135deg,rgba(255,255,255,.2),rgba(255,255,255,.07));-webkit-backdrop-filter:blur(1rem) saturate(1.3);backdrop-filter:blur(1rem) saturate(1.3);border:1px solid rgba(255,255,255,.3);box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 1rem 2rem rgba(0,0,0,.35);padding:1rem 1.2rem;color:#F0EBEF;z-index:6;direction:ltr}
.cd .h{display:flex;align-items:center;gap:.8rem;font:700 1.15rem 'Inter Tight',sans-serif}
.cd .h i{width:2.2rem;height:2.2rem;border-radius:50%;background:#DBBFAA;opacity:.9;display:flex;align-items:center;justify-content:center;color:#002039;font-style:normal}
.cd p{margin-top:.6rem;font:400 .85rem/1.4 'Inter Tight',sans-serif;opacity:.85}
.sp{position:absolute;width:3.6rem;height:3.6rem;z-index:6;fill:#9DB4CE;filter:drop-shadow(0 .2rem .6rem rgba(0,0,0,.35))}`,
  html:`<div class="stage">${SCENE_HTML}<div class="cd" id="cd"><div class="h"><i>★</i>Studio Name</div><p>A marketing agency specializing in integrated content and strategy.</p></div><svg class="sp" id="s1" viewBox="0 0 40 40"><path d="M20 0C21 12 28 19 40 20C28 21 21 28 20 40C19 28 12 21 0 20C12 19 19 12 20 0Z"/></svg><svg class="sp" id="s2" viewBox="0 0 40 40" style="fill:#365A8A"><path d="M20 0C21 12 28 19 40 20C28 21 21 28 20 40C19 28 12 21 0 20C12 19 19 12 20 0Z"/></svg></div>`,
  js:`${CAMJS}
const cd=document.getElementById('cd'),s1=document.getElementById('s1'),s2=document.getElementById('s2');
play(4.6,t=>{
  const s=lerp(1.08,1,ease.out(seg(t,0,4.6))),T=[14.2,17.9];cam(s,T);camBg(s,T,.35);gest(t);
  const a=ease.back(seg(t,.3,1.1)),o=1-ease.inOut(seg(t,3.7,4.3));
  cd.style.opacity=seg(t,.3,.6)*o;cd.style.transform='translateY('+(lerp(9,0,a)+(1-o)*9)+'rem) rotate('+lerp(-6,0,a)+'deg)';
  [[s1,19,5],[s2,3.5,16]].forEach(([e,x,y],i)=>{const u=seg(t,.5+i*.3,2.2+i*.3);e.style.left=(x+Math.sin(u*3)*1.5)+'rem';e.style.top=(37-u*y-(i?4:0))+'rem';e.style.opacity=Math.sin(Math.PI*u)*o;e.style.transform='rotate('+(u*90)+'deg) scale('+(.6+.6*u)+')'});
});` },

{ v:10, id:'splitreveal', fa:'Vertical line over the frame and fading icon list', en:'Vertical Line Split + Ghost Icon List', cat:'layout',
  when:'Explaining a concept beside the subject. A thin vertical line crosses the frame from the left, and a big line icon and fading labels appear behind it; the speaker\'s video continues unchanged.',
  timing:'Line 1 s left to right, then slides another 0.5rem slowly · icon blur 8 to 0 · labels 0.3 s apart and 50% opacity',
  where:'Seconds 12 to 15', colors:['#F0EBEF','#DBBFAA','#365A8A'], dur:5.2,
  css:`${SCENE_CSS}
.ln{position:absolute;top:0;bottom:0;width:1px;background:linear-gradient(180deg,transparent,rgba(240,235,239,.75) 25%,rgba(240,235,239,.75) 75%,transparent);z-index:4}
.gh{position:absolute;left:0;top:0;bottom:0;width:10rem;overflow:hidden;z-index:3}
.gh svg{position:absolute;left:1.2rem;top:6rem;width:6rem;height:6rem;fill:none;stroke:#F0EBEF;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}
.gh b{position:absolute;left:1.4rem;direction:ltr;font:600 1.4rem 'Inter Tight',sans-serif;color:#9DB4CE}
.tt{position:absolute;right:1.5rem;top:5rem;text-align:left;font:800 1.9rem/1.1 'Inter Tight',sans-serif;color:#F0EBEF;z-index:4}
.tt small{display:block;font:300 1.35rem 'Inter Tight',sans-serif;color:#DBBFAA}`,
  html:`<div class="stage">${SCENE_HTML}<div class="gh" id="gh"><svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="3"/><path d="M3 21c0-5 3-7 6-7s6 2 6 7"/><path d="M15 14l6-2v6l-6-2z"/></svg><b style="top:14rem">Name</b><b style="top:17rem">Idea</b><b style="top:20rem">Publish</b></div><div class="ln" id="ln"></div><div class="tt" id="tt">Marketing<small>content plan</small></div></div>`,
  js:`${CAMJS}
const gh=document.getElementById('gh'),ln=document.getElementById('ln'),tt=document.getElementById('tt'),bs=[...gh.querySelectorAll('b')],ic=gh.querySelector('svg');
play(5.2,t=>{
  const u=ease.out(seg(t,0,5.2)),s=lerp(1,1.12,u),T=[lerp(15.6,15.2,u),lerp(18,17.2,u)];cam(s,T);camBg(s,T,.35);gest(t);
  const x=lerp(0,10,ease.inOut(seg(t,.2,1.2)))+seg(t,1.2,5)*.6,o=1-seg(t,4.7,5.2);
  ln.style.left=x+'rem';ln.style.opacity=seg(t,.1,.3)*o;gh.style.width=x+'rem';gh.style.opacity=o;
  const a=ease.out(seg(t,.9,1.7));ic.style.filter='blur('+(1-a)*8+'px)';ic.style.opacity=a;
  bs.forEach((b,i)=>{const k=ease.out(seg(t,1.6+i*.3,2.2+i*.3));b.style.opacity=k*.55;b.style.transform='translateY('+(1-k)*1+'rem)'});
  const m=ease.out(seg(t,.6,1.4));tt.style.opacity=m*o;tt.style.transform='translateX('+(1-m)*3+'rem)';
});` },

{ v:10, id:'kashida', fa:'Kashida stretch and tightening letter-spacing', en:'Kashida Stretch + Tracking Collapse', cat:'type',
  when:'A Persian or Arabic headline. Connected letters stretch with a kashida (ـ) and tighten naturally, without breaking the letters. The Latin name below starts with wide letter-spacing and returns to normal.',
  timing:'Kashida count 8 to 0 in 0.9 s (ease-out) · blur 0.6rem · Latin letter-spacing 0.6em to 0.02em · each line delayed 0.3 s · blur on exit',
  where:'Seconds 3.6 to 5.5 and 21 to 24', colors:['#DBBFAA','#E8D8C4','#F0EBEF','#002039'], dur:5.4,
  css:`${SCENE_CSS}
.k1{position:absolute;left:0;right:0;top:11rem;text-align:center;direction:rtl;font:800 3.6rem/1.2 'Vazirmatn','Inter Tight',sans-serif;color:#DBBFAA;white-space:nowrap}
.k2{position:absolute;left:0;right:0;top:15.4rem;text-align:center;direction:rtl;font:500 1.5rem/1.4 'Vazirmatn',sans-serif;color:#E8D8C4;white-space:nowrap}
.k3{position:absolute;left:0;right:0;top:7rem;text-align:center;font:700 2rem 'Inter Tight',sans-serif;color:#E8D8C4;white-space:nowrap}
.k3 span{font-weight:300;color:#9DB4CE}`,
  html:`<div class="stage"><div class="bgl" style="opacity:.9"></div><div class="k3" id="k3">Studio <span>Agency</span></div><div class="k1" id="k1"></div><div class="k2" id="k2"></div></div>`,
  js:`const k1=document.getElementById('k1'),k2=document.getElementById('k2'),k3=document.getElementById('k3');
const T='\\u0640';
function stretch(w,n){const J=['ب','پ','ت','ث','ج','چ','ح','خ','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ک','گ','ل','م','ن','ه','ی','ئ'],cs=[...w];let o='';cs.forEach((c,i)=>{o+=c;if(i<cs.length-1&&J.includes(c))o+=T.repeat(n)});return o}
play(5.4,t=>{
  const a=ease.out(seg(t,.3,1.2)),b=ease.out(seg(t,.7,1.5)),c=ease.out(seg(t,.2,1.4)),o=1-seg(t,4.7,5.3);
  k1.textContent=stretch('مشکل',Math.round(8*(1-a)));k1.style.opacity=seg(t,.3,.5)*o;k1.style.filter='blur('+(1-a)*.6+'rem)';
  k2.textContent=stretch('همیشه محتوا نیست',Math.round(3*(1-b)));k2.style.opacity=seg(t,.7,.9)*o;k2.style.filter='blur('+(1-b)*.5+'rem)';
  k3.style.letterSpacing=lerp(.6,.02,c)+'em';k3.style.opacity=seg(t,.2,.5)*o;k3.style.filter='blur('+(1-c)*.5+'rem)';
});` }
);

VIDEOS.push({ id:'v10', n:10, title:'Solo interview: camera locked on the head', meta:'24 seconds · 720×1280 · a spoken reel with successive punch-ins and Arabic/Latin text',
  mood:'Professional and calm. A navy-blue studio with darkened corners and a turquoise floor glow, the subject on a stool, soft cream text. All the dynamism comes from the camera (punch-ins and slow drift), not from graphics; the graphics are simple and glassy.',
  rules:[
    'The real camera is static; all movement is a digital zoom on one 4K frame: wide shot 1× and close shot 2.2 to 2.5×.',
    'The center of every zoom is the speaker\'s head. The head always stays on a horizontal/vertical thirds line and the body slides relative to it. In the wide shot the head sits at ~34% of the height, in the close shot at ~25%.',
    'Every 3 to 5 seconds a hard cut between wide and close (no transition). Inside each shot there is very slow movement: close drifts back slowly (−4 to −5%/s), wide drifts forward (+2%/s).',
    'The subject zooms separately from the background: the subject 4 to 5%/s and the background about 1% (layered parallax).',
    'Text is always laid out relative to the head: a headline above the head in wide shots, pills beside the head in close shots, an intro card at the bottom of the frame.',
    'Sometimes focus goes to the text: the subject is blurred and the text sharp, with a thin arch line around the subject.'
  ],
  palette:[
    { g:'Studio', c:[['#00162A','Corner vignette'],['#002039','Dark background'],['#002E46','Mid background'],['#00263E','Light spot'],['#04415B','Turquoise floor light']] },
    { g:'Subject', c:[['#0B1D4A','Navy shirt'],['#4F6A7C','Jeans'],['#06372F','Green stool'],['#A9664A','Skin']] },
    { g:'Text and graphics', c:[['#DBBFAA','Cream (headline)'],['#E8D8C4','Light cream (subtitle)'],['#F0EBEF','White (line and pills)'],['#9DB4CE','Star blue'],['#365A8A','Dark star blue']] }
  ] });

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 10: talking-head studio */
  --st-deep:#00162A; --st-dark:#002039; --st-mid:#002E46; --st-floor:#04415B; --st-cream:#DBBFAA; --st-cream-2:#E8D8C4; --st-white:#F0EBEF; --st-star:#9DB4CE;
}`);
