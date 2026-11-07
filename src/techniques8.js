/* ===== Video 12: AI product explainer. Dark glass UI, blur-in type, line-drawn nodes, a coral burst and a logo morph (all marks here are original/generic) ===== */
const AI_CSS = `.stage{background:#02030B;font-family:'Inter Tight',sans-serif;color:#F4F6FF}
.bg{position:absolute;inset:0;overflow:hidden}
.bl{position:absolute;border-radius:50%;filter:blur(3rem);opacity:.4}
.lb{position:absolute;left:1rem;bottom:1rem;font:600 .8rem/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#8FB3FF;opacity:.85;z-index:9}
.c{position:absolute;left:0;right:0;text-align:center}`;
const AI_BG = `<div class="bg"><i class="bl" style="left:-6rem;top:-4rem;width:22rem;height:22rem;background:#3B4FA8"></i><i class="bl" style="left:12rem;top:22rem;width:20rem;height:24rem;background:#5B2E9E"></i><i class="bl" style="left:-4rem;top:34rem;width:18rem;height:14rem;background:#1E5A9E"></i></div>`;
const AI_JS = `const $=id=>document.getElementById(id),BL=[...document.querySelectorAll('.bl')];
function blobs(t){BL.forEach((b,i)=>{b.style.transform='translate('+Math.sin(t*.6+i*2)*2+'rem,'+Math.cos(t*.5+i*1.7)*2+'rem)'})}
const blurIn=(el,k,r=.6)=>{el.style.opacity=k;el.style.filter='blur('+(1-k)*r+'rem)'};`;
const STAR = `<path d="M0-1C.08-.34.34-.08 1 0 .34.08.08.34 0 1-.08.34-.34.08-1 0-.34-.08-.08-.34 0-1Z"/>`;

TECHS.push(
{ v:12, id:'blurglyph', fa:'Letters resolving out of a glowing blur', en:'Blur-in Glyph Typing', cat:'type',
  when:'An opening line that should feel generated rather than typed. Each letter starts as a blue-lit blur, sharpens into white and lands 0.5 rem lower than its final line, with a small arrow leading it.',
  timing:'Stagger 0.07 s per letter · each letter 0.45 s ease-out · blur 0.7 rem → 0 · glow 1.2 rem → 0 · rise 0.5 rem · exit 0.6 s: blur 0.6 rem + fade',
  where:'0 to 2.3 and 24.5 to 27 (the opening line and the closing tagline)', colors:['#02030B','#F4F6FF','#7FB0FF','#3B4FA8'], dur:5.4,
  css:AI_CSS+`.row{position:absolute;left:0;right:0;top:23rem;text-align:center;font:500 1.5rem/1 'Inter Tight',sans-serif;white-space:nowrap}
.row i{display:inline-block;font-style:normal}.ar{display:inline-block;margin-right:.6rem;color:#C9D6FF}`,
  html:`<div class="stage">${AI_BG}<div class="row"><span class="ar" id="ar">→</span><span id="tx"></span></div><div class="lb" id="lb"></div></div>`,
  js:`${AI_JS}
const tx=$('tx'),ar=$('ar');tx.innerHTML=[...'Need a business app.'].map(c=>'<i>'+(c===' '?'&nbsp;':c)+'</i>').join('');
const G=[...tx.children];
play(5.4,t=>{
  blobs(t);
  G.forEach((g,i)=>{const s=.3+i*.07,k=ease.out(seg(t,s,s+.45));
    g.style.opacity=k;g.style.filter='blur('+(1-k)*.7+'rem)';g.style.transform='translateY('+(1-k)*.5+'rem)';
    g.style.textShadow='0 0 '+(1-k)*1.2+'rem #7FB0FF'});
  const o=seg(t,4.4,5);tx.style.opacity=1-o;tx.style.filter='blur('+o*.6+'rem)';
  ar.style.opacity=ease.out(seg(t,0,.4))*(1-o);ar.style.transform='translateX('+(1-ease.out(seg(t,0,.5)))*-1+'rem)';
  $('lb').textContent='GLYPH '+Math.min(G.length,Math.floor(seg(t,.3,2.1)*G.length))+'/'+G.length;
});` },

{ v:12, id:'promptpill', fa:'Prompt field: chips, typing and a send click', en:'Prompt Pill with Model Chips', cat:'ui',
  when:'Showing someone asking an AI for something. A glass pill with a plus, the prompt text and a round send button; a row of small selector chips sits above it. The group starts zoomed in and settles as the text lands, then a cursor presses send.',
  timing:'Zoom 1.5× → 1× over 2.6 s (ease-out) · typing 0.5 to 2.4 s · cursor travel 2.5 to 3.2 s · press at 3.3 s (button 0.88×, ring 0.5 s) · chip stagger 0.08 s · exit blur 3.9 to 4.6 s',
  where:'5 to 11.5 s (the pill and the cursor press)', colors:['#02030B','#F4F6FF','#7FB0FF','#6A8BFF'], dur:5.4,
  css:AI_CSS+`.grp{position:absolute;left:2rem;top:20rem;width:23rem;transform-origin:50% 60%}
.chips{display:flex;gap:.4rem;justify-content:center;margin-bottom:.8rem}
.chips b{display:flex;align-items:center;gap:.3rem;font:500 .62rem/1 'Inter Tight',sans-serif;padding:.38rem .6rem;border-radius:2rem;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.22)}
.chips b.on{border-color:#6AF0A8;box-shadow:0 0 .8rem rgba(106,240,168,.35)}
.ic{width:.7rem;height:.7rem;border-radius:50%;display:inline-block}
.pill{position:relative;height:3.6rem;border-radius:2rem;border:1px solid rgba(255,255,255,.7);background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.03));backdrop-filter:blur(.4rem);display:flex;align-items:center;padding:0 .8rem 0 1.1rem;gap:.8rem}
.pl{font:300 1.6rem/1 'Inter Tight',sans-serif;color:#E6ECFF}.pt{flex:1;font:500 1.1rem/1 'Inter Tight',sans-serif;white-space:nowrap}
.sd{width:2rem;height:2rem;border-radius:50%;background:#F4F6FF;color:#1B2250;display:grid;place-items:center;font:700 1rem/1 'Inter Tight',sans-serif}
.ring{position:absolute;right:.8rem;top:50%;width:2rem;height:2rem;margin-top:-1rem;border-radius:50%;border:2px solid #9CC0FF;opacity:0}
.cur{position:absolute;width:1.6rem;height:1.6rem;filter:drop-shadow(0 .2rem .4rem rgba(0,0,0,.5))}`,
  html:`<div class="stage">${AI_BG}<div class="grp" id="g"><div class="chips" id="ch"><b><i class="ic" style="background:#E8EDFF"></i>Alpha</b><b class="on"><i class="ic" style="background:#8FB3FF"></i>Nova</b><b><i class="ic" style="background:#F0A38A"></i>Muse</b><b><i class="ic" style="background:#9AA3C0"></i>Other</b></div><div class="pill"><span class="pl">+</span><span class="pt" id="pt"></span><span class="sd" id="sd">↑</span><i class="ring" id="rg"></i></div><svg class="cur" id="cu" viewBox="0 0 20 20"><path d="M2 2L17 8L10 10L8 17Z" fill="#fff"/></svg></div><div class="lb" id="lb"></div></div>`,
  js:`${AI_JS}
const TX='Need a business app.',g=$('g'),pt=$('pt'),sd=$('sd'),rg=$('rg'),cu=$('cu'),ch=[...$('ch').children];
play(5.4,t=>{
  blobs(t);
  const z=lerp(1.5,1,ease.out(seg(t,0,2.6))),o=seg(t,3.9,4.6);
  g.style.transform='scale('+z+')';g.style.opacity=1-o;g.style.filter='blur('+o*.6+'rem)';
  ch.forEach((c,i)=>{const k=ease.out(seg(t,.1+i*.08,.6+i*.08));c.style.opacity=k;c.style.transform='translateY('+(1-k)*.6+'rem)'});
  const n=Math.floor(seg(t,.5,2.4)*TX.length);pt.textContent=TX.slice(0,n)+(n<TX.length&&t<2.4?'▍':'');
  const m=ease.inOut(seg(t,2.5,3.2)),px=lerp(24,20.6,m),py=lerp(10,3.9,m);   // cursor path (rem, inside the group)
  cu.style.left=px+'rem';cu.style.top=py+'rem';cu.style.opacity=seg(t,2.4,2.7);
  const press=seg(t,3.3,3.45)*(1-seg(t,3.45,3.7));sd.style.transform='scale('+(1-.12*press)+')';
  const r=seg(t,3.3,3.8);rg.style.opacity=r>0&&r<1?1-r:0;rg.style.transform='scale('+(1+r*1.1)+')';
  $('lb').textContent=t<2.4?'TYPING':t<3.3?'CURSOR':'SEND';
});` },

{ v:12, id:'markburst', fa:'Radial burst as a scene transition', en:'Rotating Burst Transition', cat:'fx',
  when:'Covering a scene change with a big graphic. A coral twelve-ray mark grows from the lower right, spins and fills the frame, so the next scene can be switched underneath while the viewer is looking at the burst.',
  timing:'Grow 0.05× → 2.7× in 1.2 s (expo) · rotation 130° per second, decelerating · warm copper wash fades in 0.8 s · hold 0.6 s · exit shrink 0.6 s · rays 12, lengths alternate 1 / 0.72',
  where:'7 to 10 s (the first scene change)', colors:['#E0785C','#8A4A33','#2A1A22','#02030B'], dur:5.4,
  css:AI_CSS+`.wash{position:absolute;inset:0;background:radial-gradient(70% 55% at 20% 20%,#9A5A40 0%,#4A2A2A 45%,#120A12 100%);opacity:0}
.mk{position:absolute;left:0;top:0;width:27rem;height:48rem;overflow:visible}
.mk line{stroke:#E0785C;stroke-width:3.4;stroke-linecap:round}`,
  html:`<div class="stage">${AI_BG}<div class="wash" id="ws"></div><svg class="mk" viewBox="0 0 27 48"><g id="mk">${Array.from({length:12},(_,i)=>`<line x1="0" y1="0" x2="${(i%2?7.2:10).toFixed(1)}" y2="0" transform="rotate(${i*30})"/>`).join('')}</g></svg><div class="lb" id="lb"></div></div>`,
  js:`${AI_JS}
const mk=$('mk'),ws=$('ws');
play(5.4,t=>{
  blobs(t);
  const g=ease.expo(seg(t,.2,1.4)),x=1-seg(t,4.2,4.8),s=lerp(.05,2.7,g)*(.55+.45*x),rot=lerp(-60,120,ease.out(seg(t,.2,3.6)))+t*10;
  const cx=lerp(22,15,g),cy=lerp(34,26,g);
  mk.setAttribute('transform','translate('+cx+' '+cy+') rotate('+rot+') scale('+s+')');
  ws.style.opacity=ease.out(seg(t,.4,1.2))*x;
  $('lb').textContent='x'+s.toFixed(2)+' · '+Math.round(rot)+'°';
});` },

{ v:12, id:'codegen', fa:'Code writing itself under a headline', en:'Generating Code Panel', cat:'type',
  when:'Showing that something is being built. A headline with a blinking caret sits over a muted comment line and a block of small monospace-style code that types in at a steady rate, with the newest characters still half-faded.',
  timing:'Headline blur-in 0.4 s · caret blink 0.5 s · typing 38 chars per second from 0.7 s · newest 6 chars at 45% opacity · block auto-scrolls once the panel is full',
  where:'7.5 to 9.5 s', colors:['#F4F6FF','#9AA3C0','#E0785C','#02030B'], dur:5.4,
  css:AI_CSS+`.hd{position:absolute;left:2.4rem;top:11rem;font:600 1.5rem/1 'Inter Tight',sans-serif}
.cm{position:absolute;left:2.4rem;top:13.2rem;font:500 .55rem/1 'Inter Tight',sans-serif;color:#9AA3C0}
.code{position:absolute;left:2.4rem;top:15rem;width:22rem;height:17rem;overflow:hidden;font:500 .66rem/1rem ui-monospace,Menlo,monospace;color:#DDE3F6;white-space:pre}
.code s{text-decoration:none;opacity:.45}
.glow{position:absolute;right:-6rem;bottom:-4rem;width:20rem;height:20rem;border-radius:50%;background:#C86A4E;filter:blur(3.4rem);opacity:.5}`,
  html:`<div class="stage">${AI_BG}<i class="glow"></i><div class="hd" id="hd">Generating code<span id="cr">.|</span></div><div class="cm" id="cm">// Powered by Nova AI</div><div class="code" id="cd"></div><div class="lb" id="lb"></div></div>`,
  js:`${AI_JS}
const SRC=['const app = createApp({','  name: "NextGen SaaS",','  platforms: ["iOS","Android","Web"],','  model: "nova-1.5",','  authentication: true,','  database: "Cloud",','  payments: true,','  notifications: true','});','','generateUI(app);','generateBackend(app);','connectDatabase(app);','integrateModel(app);','runTests(app);','deploy(app);'].join('\\n');
play(5.4,t=>{
  blobs(t);
  blurIn($('hd'),ease.out(seg(t,0,.4)));blurIn($('cm'),ease.out(seg(t,.3,.7)),.3);
  $('cr').textContent=Math.floor(t*2)%2?'.':'.|';
  const n=Math.max(0,Math.min(SRC.length,Math.floor((t-.7)*38))),sh=SRC.slice(0,n),lines=sh.split('\\n').length;
  $('cd').innerHTML=sh.slice(0,-6)+'<s>'+sh.slice(-6)+'</s>';
  $('cd').scrollTop=$('cd').scrollHeight;
  $('lb').textContent=n+' / '+SRC.length+' chars';
});` },

{ v:12, id:'barwipe', fa:'White bars pushing one scene over another', en:'Thick-bar Panel Wipe', cat:'layout',
  when:'Cutting between three scenes without a dissolve. A thick white bar travels with the incoming panel, first vertically and then horizontally, so each scene is "pushed" in by a visible frame line.',
  timing:'Push 1 (up) 0.5 to 1.6 s · push 2 (from the left) 3.0 to 4.0 s · bar thickness 0.9 rem · ease inOut cubic · old panel moves 35% as far (parallax)',
  where:'9.5 to 12 s', colors:['#FFFFFF','#02030B','#0B1636','#1B2A5C'], dur:5.4,
  css:AI_CSS+`.pn{position:absolute;inset:0;overflow:hidden}
.p1{background:#05060F}.p2{background:linear-gradient(160deg,#050A1E,#142A64)}.p3{background:#000}
.bar{position:absolute;background:#fff}
.t{position:absolute;left:0;right:0;font:600 1.7rem/1 'Inter Tight',sans-serif;text-align:center}
.cl{position:absolute;left:2.4rem;top:5rem;font:500 .55rem/.95rem ui-monospace,Menlo,monospace;color:#9AA3C0;white-space:pre}`,
  html:`<div class="stage"><div class="pn p1" id="p1"><div class="cl">connectDatabase(app);\nintegrateModel(app);\nrunTests(app);\ndeploy(app);</div></div><div class="pn p2" id="p2"><div class="t" style="top:15rem">Visual analysis.</div></div><div class="bar" id="b1" style="left:0;right:0;height:.9rem"></div><div class="pn p3" id="p3"><div class="t" style="top:15rem">Organizing Workflow</div></div><div class="bar" id="b2" style="top:0;bottom:0;width:.9rem"></div><div class="lb" id="lb"></div></div>`,
  js:`${AI_JS}
const H=48,W=27;
play(5.4,t=>{
  const a=ease.inOut(seg(t,.5,1.6)),b=ease.inOut(seg(t,3,4));
  $('p2').style.transform='translateY('+(1-a)*H+'rem)';$('b1').style.top=((1-a)*H)+'rem';$('p1').style.transform='translateY('+(-a*H*.35)+'rem)';
  $('p3').style.transform='translateX('+(-(1-b)*W)+'rem)';$('b2').style.left=(-(1-b)*W+W-.9)+'rem';$('b2').style.opacity=b>0&&b<1?1:0;
  $('p2').style.filter='none';$('b1').style.opacity=a>0&&a<1?1:0;
  if(b>0){$('p2').style.transform='translateY(0) translateX('+(b*W*.35)+'rem)'}
  $('lb').textContent=t<2.5?'PUSH ↑':'PUSH →';
});` },

{ v:12, id:'uicards', fa:'Floating UI cards with a title', en:'Staggered UI Card Float-in', cat:'ui',
  when:'Illustrating a feature with tiny pieces of interface. Two icon tiles and one bigger card (label plus three colored bars) pop in with a back-ease and then keep bobbing, while a blue-to-violet spike rises from a corner and the title blurs in above.',
  timing:'Title 0.5 s · tile 1 at 0.4 s, tile 2 at 0.55 s, card at 0.75 s · each 0.7 s ease-back · bob ±0.25 rem at 0.8 Hz, offset per card · spike rises 1.2 s ease-out · bars grow 0.6 s after the card',
  where:'10 to 12 s', colors:['#FFFFFF','#62D394','#6A8BFF','#A06BFF','#3E8BFF'], dur:5.4,
  css:AI_CSS+`.ti{position:absolute;left:0;right:0;top:12rem;text-align:center;font:600 1.7rem/1 'Inter Tight',sans-serif}
.tile{position:absolute;width:3.4rem;height:3.4rem;border-radius:.9rem;background:linear-gradient(160deg,#fff,#DCE4FF);box-shadow:0 .8rem 1.6rem rgba(0,0,0,.4)}
.tile i{position:absolute;left:.7rem;right:.7rem;height:.35rem;border-radius:.2rem}
.card{position:absolute;left:8.2rem;top:25rem;width:10.6rem;height:7rem;border-radius:.9rem;background:linear-gradient(160deg,#fff,#E4EAFF);box-shadow:0 1rem 2rem rgba(0,0,0,.45);padding:.8rem .8rem}
.card b{display:block;font:600 .6rem/1 'Inter Tight',sans-serif;color:#4A5584;margin-bottom:.6rem}
.card i{display:block;height:.7rem;border-radius:.4rem;margin-bottom:.45rem;transform-origin:0 50%}
.spk{position:absolute;right:-1rem;bottom:0;width:15rem;height:20rem}`,
  html:`<div class="stage">${AI_BG}<div class="ti" id="ti">Visual analysis.</div>
<div class="tile" id="t1" style="left:9rem;top:20.2rem"><i style="top:1rem;background:#6A8BFF"></i><i style="top:1.8rem;background:#BCC8F5;right:1.6rem"></i></div>
<div class="tile" id="t2" style="left:13.8rem;top:20.2rem"><i style="top:1rem;background:#62D394;left:1.2rem;right:1.2rem;height:1.2rem;border-radius:50%"></i></div>
<div class="card" id="cd"><b>Total balance</b><i style="background:#62D394;width:100%"></i><i style="background:#6A8BFF;width:84%"></i><i style="background:#A06BFF;width:62%"></i></div>
<svg class="spk" id="sk" viewBox="0 0 150 200"><defs><linearGradient id="gs" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#A06BFF"/><stop offset=".55" stop-color="#3E8BFF"/><stop offset="1" stop-color="#7FD0FF"/></linearGradient></defs><path d="M10 200C70 190 100 150 110 50 114 10 120 0 124 0 130 60 140 150 150 200Z" fill="url(#gs)"/></svg><div class="lb" id="lb"></div></div>`,
  js:`${AI_JS}
const pop=(el,t0,dy,ph)=>{const k=ease.back(seg(t,t0,t0+.7)),o=ease.out(seg(t,t0,t0+.35));
  el.style.opacity=o;el.style.transform='translateY('+((1-k)*1.6+Math.sin(t*5+ph)*.25*seg(t,t0+.7,t0+1.1))+'rem) scale('+lerp(.7,1,k)+')'};
let t=0;
play(5.4,tt=>{
  t=tt;blobs(t);
  blurIn($('ti'),ease.out(seg(t,0,.5)));
  pop($('t1'),.4,0,0);pop($('t2'),.55,0,1.4);pop($('cd'),.75,0,2.6);
  [...$('cd').querySelectorAll('i')].forEach((b,i)=>b.style.transform='scaleX('+ease.out(seg(t,1.3+i*.12,1.9+i*.12))+')');
  const s=ease.out(seg(t,.2,1.4));$('sk').style.transform='translateY('+(1-s)*10+'rem)';$('sk').style.opacity=s;
  const o=seg(t,4.6,5.2);$('ti').style.opacity=1-o;
  $('lb').textContent='CARDS '+(t>.75?3:t>.55?2:t>.4?1:0)+'/3';
});` },

{ v:12, id:'nodespark', fa:'Four-point star with crosshair lines and dots', en:'Spark Star with Line-drawn Dots', cat:'fx',
  when:'A quiet beat that says "workflow is being organized". A small bright four-point star pops in, thin lines shoot out of it horizontally and vertically and each ends in a white dot; the dots then lift off and the star flares before the next scene.',
  timing:'Star pop 0.6 s ease-back, spinning 90° · lines draw 0.7 s starting 0.5 s · end dots 0.9 rem · dots detach 3.0 s · flare 3.6 to 4.2 s (scale 1 → 1.6, glow 0.4 → 1)',
  where:'12 to 14.5 s', colors:['#FFFFFF','#9AA3C0','#7FB0FF','#02030B'], dur:5.4,
  css:AI_CSS+`.ti{position:absolute;left:0;right:0;top:8rem;text-align:center;font:600 1.4rem/1 'Inter Tight',sans-serif}
.sp{position:absolute;left:0;top:0;width:27rem;height:48rem;overflow:visible}`,
  html:`<div class="stage">${AI_BG}<div class="ti" id="ti">Organizing Workflow</div><svg class="sp" viewBox="0 0 27 48"><defs><filter id="gl"><feGaussianBlur stdDeviation=".5"/></filter></defs>
<g stroke="#fff" stroke-width=".07" fill="none" opacity=".8"><path id="l1" d="M13.5 22H4"/><path id="l2" d="M13.5 22H23"/><path id="l3" d="M13.5 22V33"/></g>
<circle id="d2" r=".55" fill="#fff"/><circle id="d3" r=".55" fill="#fff"/><circle id="d1" r=".25" fill="#9AA3C0"/>
<g id="stg" transform="translate(13.5 22)"><g id="gw" filter="url(#gl)" fill="#7FB0FF" transform="scale(2)">${STAR}</g><g id="st" fill="#fff" transform="scale(1.7)">${STAR}</g></g></svg><div class="lb" id="lb"></div></div>`,
  js:`${AI_JS}
const L=['l1','l2','l3'].map($),len=L.map(p=>p.getTotalLength());L.forEach((p,i)=>p.style.strokeDasharray=len[i]+' '+len[i]);
play(5.4,t=>{
  blobs(t);
  blurIn($('ti'),ease.out(seg(t,.1,.6)));
  const pk=ease.back(seg(t,0,.6)),fl=ease.inOut(seg(t,3.6,4.2)),sc=pk*lerp(1,1.6,fl);
  $('stg').setAttribute('transform','translate(13.5 22) rotate('+lerp(-90,0,ease.out(seg(t,0,.8)))+') scale('+sc+')');
  $('gw').setAttribute('opacity',.4+.6*fl);
  const d=ease.out(seg(t,.5,1.3)),lift=ease.inOut(seg(t,3,3.8));
  L.forEach((p,i)=>p.style.strokeDashoffset=len[i]*(1-d)*(1+lift*0));
  const a=(i)=>len[i]*d;
  $('d1').setAttribute('cx',13.5-9.5*d-lift*0);$('d1').setAttribute('cy',22);
  $('d2').setAttribute('cx',13.5+9.5*d);$('d2').setAttribute('cy',22-lift*9);$('d2').setAttribute('opacity',1-seg(t,3.4,3.9));
  $('d3').setAttribute('cx',13.5);$('d3').setAttribute('cy',22+11*d+lift*6);$('d3').setAttribute('opacity',1-seg(t,3.4,3.9));
  L.forEach(p=>p.parentNode.setAttribute('opacity',.8*(1-lift)));
  $('ti').style.opacity=1-seg(t,4.5,5);
  $('lb').textContent=t<.6?'POP':t<3?'DRAW':t<3.6?'LIFT':'FLARE';
});` },

{ v:12, id:'hubnodes', fa:'Central pill with connected app nodes', en:'Hub Pill with Orbiting Nodes', cat:'layout',
  when:'Explaining integrations: one labelled pill in the middle, eight round app badges around it, each joined by a curved line that draws itself. The badges first sit outside the frame behind small bracket arcs and slide in as the lines draw.',
  timing:'Pill pop 0.5 s · lines draw 0.7 s, stagger 0.07 s from 0.8 s · badges slide in over 0.8 s ease-out, 0.07 s apart · tick marks on the pill edge fade 0.4 s · idle float ±0.15 rem',
  where:'14 to 16.5 s', colors:['#FFFFFF','#2A3159','#8FB3FF','#F0A38A','#62D394','#F5D56A'], dur:5.4,
  css:AI_CSS+`.hub{position:absolute;left:0;top:0;width:27rem;height:48rem;overflow:visible}
.pl2{position:absolute;left:8.2rem;top:22.4rem;width:10.6rem;height:3.2rem;border-radius:1.6rem;border:1px solid rgba(255,255,255,.75);background:rgba(8,10,24,.7);display:flex;align-items:center;justify-content:center;gap:.5rem;font:600 1.3rem/1 'Inter Tight',sans-serif}
.pl2 svg{width:1.3rem;height:1.3rem}
.nd{position:absolute;width:2.2rem;height:2.2rem;border-radius:50%;background:#2A3159;border:1px solid rgba(255,255,255,.28);display:grid;place-items:center;font:700 .8rem/1 'Inter Tight',sans-serif}`,
  html:`<div class="stage">${AI_BG}<svg class="hub" viewBox="0 0 27 48"><g id="cn" fill="none" stroke="#8D96B8" stroke-width=".1"></g></svg><div class="pl2" id="pl"><svg viewBox="-1 -1 2 2" fill="#fff">${STAR}</svg>Nova</div><div id="nds"></div><div class="lb" id="lb"></div></div>`,
  js:`${AI_JS}
const NS='http://www.w3.org/2000/svg',cn=$('cn'),nds=$('nds'),cx=13.5,cy=24;
const N=[[7.4,13,'G','#F0A38A'],[19.6,13,'C','#8FB3FF'],[3.4,19.6,'N','#B28CFF'],[3.4,28.4,'Y','#FF7B7B'],[23.6,19.6,'M','#FF7B9C'],[23.6,28.4,'D','#6AA0FF'],[7.4,35,'S','#F5D56A'],[19.6,35,'C','#62D394']];
const P=N.map(([x,y,l,c])=>{
  const ax=x<cx-6?cx-5.3:x>cx+6?cx+5.3:x<cx?cx-2.4:cx+2.4,ay=y<cy-4?cy-1.6:y>cy+4?cy+1.6:cy+(y<cy?-.6:.6);
  const p=document.createElementNS(NS,'path'),my=(ay+y)/2;p.setAttribute('d','M'+ax+' '+ay+' C'+ax+' '+my+' '+x+' '+my+' '+x+' '+y);cn.appendChild(p);
  const n=document.createElement('div');n.className='nd';n.textContent=l;n.style.color=c;n.style.left=(x-1.1)+'rem';n.style.top=(y-1.1)+'rem';nds.appendChild(n);
  const L=p.getTotalLength();p.style.strokeDasharray=L+' '+L;return {p,n,L,x,y}});
play(5.4,t=>{
  blobs(t);
  const pk=ease.back(seg(t,0,.5));$('pl').style.transform='scale('+pk+')';
  P.forEach((o,i)=>{
    const s=.8+i*.07,k=ease.out(seg(t,s,s+.7)),m=ease.out(seg(t,s-.2,s+.8)),dx=(o.x<cx?-1:1)*(1-m)*6,fl=Math.sin(t*2+i)*.15;
    o.p.style.strokeDashoffset=o.L*(1-k);
    o.n.style.opacity=m;o.n.style.transform='translate('+dx+'rem,'+fl+'rem) scale('+lerp(.5,1,m)+')';
  });
  const out=seg(t,4.6,5.2);cn.style.opacity=1-out;nds.style.opacity=1-out;
  $('lb').textContent='NODES '+P.filter((o,i)=>t>.8+i*.07+.3).length+'/8';
});` },

{ v:12, id:'logomorph', fa:'Tagline collapsing into a logo lockup', en:'Tagline to Logo Morph', cat:'fx',
  when:'The closing beat. A one-line tagline blurs in word by word; then it shrinks into a point and a gradient star spins out of it, with the product wordmark wiping out to its right so the pair slides to the center as a lockup.',
  timing:'Words 0.14 s apart, 0.5 s each · tagline holds 1.4 s · collapse 0.5 s (scale 0.1, blur 0.8 rem) · star spin −180° → 0 in 0.8 s ease-back · wordmark clip wipe 0.7 s · lockup recenters 0.5 s · hold 1.7 s',
  where:'16.5 to 24 s and the final hold to 21.7 s of the second half', colors:['#F4F6FF','#4B8BFF','#9B6BFF','#F26CA7','#37D6A8'], dur:6.4,
  css:AI_CSS+`.tg{position:absolute;left:0;right:0;top:23rem;text-align:center;font:500 1.1rem/1 'Inter Tight',sans-serif;white-space:nowrap}
.tg i{display:inline-block;font-style:normal;margin:0 .13rem}.tg i.b{font-weight:700}
.lk{position:absolute;left:0;right:0;top:21.6rem;height:4.6rem;display:flex;align-items:center;justify-content:center;gap:.7rem}
.lk svg{width:4.2rem;height:4.2rem;overflow:visible}.wm{font:600 3.1rem/1 'Inter Tight',sans-serif;letter-spacing:-.02em;overflow:hidden;white-space:nowrap}
.rl{position:absolute;right:-8rem;top:6rem;width:18rem;height:28rem;border-radius:50%;background:#2A4B9A;filter:blur(3.4rem);opacity:0}`,
  html:`<div class="stage">${AI_BG}<i class="rl" id="rl"></i><div class="tg" id="tg"></div><div class="lk" id="lk"><svg viewBox="-1.1 -1.1 2.2 2.2"><defs><linearGradient id="sg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#37D6A8"/><stop offset=".35" stop-color="#4B8BFF"/><stop offset=".7" stop-color="#9B6BFF"/><stop offset="1" stop-color="#F26CA7"/></linearGradient></defs><g id="sg2" fill="url(#sg)">${STAR}</g></svg><span class="wm" id="wm">Nova</span></div><div class="lb" id="lb"></div></div>`,
  js:`${AI_JS}
const W=['From','Idea','to','App.','Powered','by','Nova'],tg=$('tg');tg.innerHTML=W.map((w,i)=>'<i'+(i>=5?' class="b"':'')+'>'+w+'</i>').join(' ');
const WS=[...tg.children],wm=$('wm'),lk=$('lk'),WW=wm.scrollWidth;
play(6.4,t=>{
  blobs(t);
  WS.forEach((w,i)=>{const k=ease.out(seg(t,.2+i*.14,.7+i*.14));w.style.opacity=k;w.style.filter='blur('+(1-k)*.6+'rem)';w.style.transform='translateY('+(1-k)*.4+'rem)'});
  const c=ease.inOut(seg(t,2.2,2.7));
  tg.style.transform='scale('+lerp(1,.1,c)+')';tg.style.opacity=1-c;tg.style.filter='blur('+c*.8+'rem)';
  const s=ease.back(seg(t,2.5,3.3)),w=ease.out(seg(t,3,3.7));
  $('sg2').setAttribute('transform','rotate('+lerp(-180,0,ease.out(seg(t,2.5,3.3)))+') scale('+s+')');
  wm.style.maxWidth=(w*WW)+'px';wm.style.opacity=seg(t,3,3.3);
  lk.style.transform='translateX('+0+'rem)';
  $('rl').style.opacity=.55*ease.out(seg(t,3,4.5));
  $('lb').textContent=t<2.2?'TAGLINE':t<3.7?'MORPH':'LOCKUP';
});` }
);

VIDEOS.push({ id:'v12', n:12, title:'AI product explainer: prompt to logo', meta:'21.7 seconds · 720×1280 · a dark glass-UI explainer: blur-in type, prompt pill, code panel, node hub and a logo morph',
  mood:'Dark, glassy and calm. Near-black with drifting blue and violet light, thin white outlines, soft blur on every entrance, and one loud warm element (a coral burst) used only to cover a scene change. Everything is a pure function of time.',
  rules:[
    'Every text entrance is a blur-in: opacity and blur change together, the type rises a few tenths of a rem. Nothing slides in sharp.',
    'Thin 1 px white outlines and translucent fills carry the interface. Only the active choice (the chosen chip) gets a colored outline and glow.',
    'A scene change is covered by a big graphic or a thick white bar, never a cross-dissolve: the burst grows to fill the frame, the bar pushes the new panel in.',
    'Diagrams draw themselves: connector lines are dash-offset paths, nodes slide in from outside while the line draws.',
    'The ending recycles the opening: the tagline collapses into a point, the logo grows out of that point and the wordmark wipes out beside it.'
  ],
  palette:[
    { g:'Stage and light', c:[['#02030B','Near black'],['#3B4FA8','Blue light'],['#5B2E9E','Violet light'],['#1E5A9E','Deep blue light'],['#2A4B9A','Right-edge glow']] },
    { g:'Text and glass', c:[['#F4F6FF','White text'],['#9AA3C0','Muted comment'],['#8FB3FF','Cold glow'],['#6AF0A8','Active chip outline']] },
    { g:'Accents', c:[['#E0785C','Coral burst'],['#62D394','Green bar'],['#6A8BFF','Blue bar'],['#A06BFF','Violet'],['#F26CA7','Pink (logo)'],['#37D6A8','Mint (logo)']] }
  ] });

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 12: AI explainer */
  --ai-black:#02030B; --ai-white:#F4F6FF; --ai-muted:#9AA3C0; --ai-glow:#8FB3FF; --ai-violet:#5B2E9E; --ai-coral:#E0785C; --ai-green:#62D394; --ai-pink:#F26CA7;
}`);
