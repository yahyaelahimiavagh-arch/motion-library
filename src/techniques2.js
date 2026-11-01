/* ===== Video 2: noir + neon-red music app concept ===== */
const NOIR = ".stage{background:radial-gradient(90% 55% at 50% 62%,#54160F 0%,#2a0b07 38%,#0D0301 78%)}";

TECHS.push(
/* 1 ---------------------------------------------------------------- */
{ v:2, id:'neonlogo', fa:'Neon logo and logo lockup', en:'Neon Logo Draw-on + Lockup', cat:'fx',
  when:'The start or end of a reel. The logo\'s lines draw and glow, then the logo moves left and the tagline opens beside it.',
  timing:'Each line draws in 0.8 s, 0.18 s apart · move 1 s · text opens in 1.3 s',
  where:'Seconds 0 to 2 and 11 to 14', colors:['#FF4F30','#FB4F41','#FFFFFF'], dur:5.4,
  css:`${NOIR}
.mark{position:absolute;left:11.5rem;top:19.5rem;width:4rem;height:4rem}
.tx{position:absolute;left:8.25rem;top:20.1rem;white-space:nowrap;font:600 2rem/1.2 'Inter Tight',sans-serif;letter-spacing:-.01em}
.tx em{font:italic 400 2.15rem 'Instrument Serif',serif;color:#FF4F30}`,
  html:`<div class="stage"><svg class="mark" id="mk" viewBox="0 0 64 64" fill="none" stroke="#FF4F30" stroke-width="3" stroke-linecap="round"><path id="r1" d="M10 36a22 22 0 1 1 44 0"/><path id="r2" d="M16 38a16 16 0 1 1 32 0"/><path id="r3" d="M24 43q8 6 16 0"/></svg><div class="tx" id="tx">Sound, <em>unbroken.</em></div></div>`,
  js:`const P=['r1','r2','r3'].map(i=>document.getElementById(i)), mk=document.getElementById('mk'), tx=document.getElementById('tx');
const Ls=P.map(p=>{const L=p.getTotalLength();p.style.strokeDasharray=L;return L});
play(5.4,t=>{
  const o=1-seg(t,4.7,5.2);
  P.forEach((p,i)=>p.style.strokeDashoffset=Ls[i]*(1-ease.inOut(seg(t,.1+i*.18,.9+i*.18))));
  const pop=ease.back(seg(t,.1,.9)), mv=ease.inOut(seg(t,1.4,2.4));
  mk.style.opacity=seg(t,.05,.3)*o;
  mk.style.transform='translateX('+lerp(0,-8.25,mv)+'rem) scale('+lerp(.6,1,pop)+')';
  mk.style.filter='drop-shadow(0 0 '+(.5+.25*Math.sin(t*3))+'rem rgba(255,79,48,.75))';
  const m=ease.inOut(seg(t,1.7,3))*130-20;                         // feathered wipe
  tx.style.opacity=o;
  tx.style.webkitMaskImage=tx.style.maskImage='linear-gradient(90deg,#000 '+m+'%,transparent '+(m+18)+'%)';
});` },

/* 2 ---------------------------------------------------------------- */
{ v:2, id:'softwipe', fa:'Soft-edge text reveal', en:'Soft-edge Text Wipe', cat:'type',
  when:'A short, calm sentence. Either a fade with blur (first sentence) or a soft wipe from the left (second sentence). For Persian, flip the direction.',
  timing:'Fade and blur 0.7 s · wipe 1.3 s · ease-in-out · 18% soft edge',
  where:'Seconds 9 to 11', colors:['#FFFFFF'], dur:6,
  css:`${NOIR}
.ln{position:absolute;left:1rem;right:1rem;text-align:center;white-space:nowrap;font:500 1.9rem/1.25 'Inter Tight',sans-serif}
#a{top:19rem}
#b{top:22rem;font-weight:400;letter-spacing:.01em}`,
  html:`<div class="stage"><div class="ln" id="a">More than just sound</div><div class="ln" id="b">It's an experience.</div></div>`,
  js:`const a=document.getElementById('a'), b=document.getElementById('b');
function wipe(el,p,deg){const m=p*130-20; el.style.webkitMaskImage=el.style.maskImage='linear-gradient('+deg+'deg,#000 '+m+'%,transparent '+(m+18)+'%)'}
play(6,t=>{
  const ai=ease.out(seg(t,.2,.9)), ao=seg(t,1.9,2.4);
  a.style.opacity=ai*(1-ao);
  a.style.filter='blur('+((1-ai)*.6+ao*.6)+'rem)';
  a.style.transform='translateY('+((1-ai)*.8)+'rem)';
  wipe(b,ease.inOut(seg(t,2.7,4)),90);                              // use 270 for RTL text
  b.style.opacity=1-seg(t,5.2,5.7);
});` },

/* 3 ---------------------------------------------------------------- */
{ v:2, id:'headswap', fa:'Mixed headline and word swap', en:'Headline Word Swap', cat:'type',
  when:'A two-part headline: a fixed white word and an italic red key word. The key word changes between scenes.',
  timing:'Enters 0.6 s · swap 0.7 s (the old word goes up, the new one comes from below)',
  where:'Seconds 3 to 5', colors:['#FFFFFF','#FF4F30'], dur:5,
  css:`${NOIR}
.hd{position:absolute;left:2rem;top:17rem;font:600 3.1rem/1.15 'Inter Tight',sans-serif;letter-spacing:-.02em;white-space:nowrap}
.sw{position:relative;display:inline-block;width:12rem;height:1.25em;vertical-align:bottom;overflow:hidden}
.sw span{position:absolute;left:0;top:0;font:italic 400 3.3rem/1.25 'Instrument Serif',serif;color:#FF4F30;white-space:nowrap}`,
  html:`<div class="stage"><div class="hd" id="hd">Pure <span class="sw"><span id="w1">Sound.</span><span id="w2">Premium.</span></span></div></div>`,
  js:`const hd=document.getElementById('hd'), w1=document.getElementById('w1'), w2=document.getElementById('w2');
play(5,t=>{
  const e=ease.out(seg(t,.2,.8)), s=ease.inOut(seg(t,2,2.7));
  hd.style.opacity=e*(1-seg(t,4.4,4.8));
  hd.style.transform='translateY('+lerp(1.5,0,e)+'rem)';
  w1.style.transform='translateY('+(-s*110)+'%)'; w1.style.opacity=1-s; w1.style.filter='blur('+(s*.5)+'rem)';
  w2.style.transform='translateY('+((1-s)*110)+'%)'; w2.style.opacity=s; w2.style.filter='blur('+((1-s)*.5)+'rem)';
});` },

/* 4 ---------------------------------------------------------------- */
{ v:2, id:'paracta', fa:'Line-by-line paragraph and CTA button', en:'Line Reveal + CTA Pill', cat:'type',
  when:'A short description under a headline. Each line rises separately and a call-to-action button appears at the end.',
  timing:'Each line 0.6 s, 0.14 s apart · button with ease-out-back · soft glow after entering',
  where:'Seconds 4 to 6', colors:['#F1D0CC','#341A19','#FF4F30'], dur:5,
  css:`${NOIR}
.p{position:absolute;left:2rem;right:2rem;top:16rem;font:400 1.1rem/1.7 'Inter Tight',sans-serif;color:#F1D0CC}
.p span{display:block}
.cta{position:absolute;left:2rem;top:24.5rem;display:inline-flex;gap:.55rem;align-items:center;padding:.65rem 1.1rem;border-radius:2rem;background:#341A19;border:1px solid rgba(255,79,48,.35);font:500 .9rem 'Inter Tight',sans-serif;color:#fff}
.cta i{width:.8rem;height:.8rem;border-radius:50%;border:.14rem solid #FF4F30}`,
  html:`<div class="stage"><div class="p" id="p"><span>Ad-free music and videos.</span><span>Offline downloads for songs,</span><span>albums and playlists. Unlimited</span><span>skips and higher audio quality.</span></div><div class="cta" id="cta"><i></i>Go Premium →</div></div>`,
  js:`const L=[...document.querySelectorAll('#p span')], cta=document.getElementById('cta');
play(5,t=>{
  const o=1-seg(t,4.3,4.8);
  L.forEach((l,i)=>{
    const a=.3+i*.14, p=seg(t,a,a+.6), e=ease.out(p);
    l.style.opacity=e*o; l.style.transform='translateY('+lerp(1,0,e)+'rem)'; l.style.filter='blur('+lerp(.4,0,e)+'rem)';
  });
  const c=seg(t,1.4,1.9);
  cta.style.opacity=ease.out(c)*o;
  cta.style.transform='scale('+lerp(.8,1,ease.back(c))+')';
  cta.style.boxShadow='0 0 '+(1.2*seg(t,1.9,2.4))+'rem rgba(255,79,48,'+(.18+.12*Math.sin(t*3))+')';
});` },

/* 5 ---------------------------------------------------------------- */
{ v:2, id:'avatars', fa:'Avatars with a centered feature', en:'Avatar Fan-out Carousel', cat:'ui',
  when:'Introducing people or artists. The first one enters in the middle with a neon ring, then two more pop out from behind it.',
  timing:'Center entrance 0.7 s · spread 0.9 s · group drops 0.9 s',
  where:'Seconds 2 to 4', colors:['#FF4F30','#F5AF5F','#F1D0CC','#846C69'], dur:6,
  css:`${NOIR}
.grp{position:absolute;inset:0}
.it{position:absolute;top:16rem;left:50%;width:8rem;margin-left:-4rem;text-align:center}
.av{width:6.4rem;height:6.4rem;margin:0 auto .8rem;border-radius:50%}
.it b{display:block;font:600 .9rem 'Inter Tight',sans-serif}
.it small{font:400 .65rem 'Inter Tight',sans-serif;color:#846C69}
.l .av{background:radial-gradient(circle at 50% 38%,#F1D0CC 0 7%,#8C4772 8% 36%,#2a1033 72%);box-shadow:0 0 0 .12rem rgba(241,208,204,.7)}
.c .av{background:radial-gradient(circle at 42% 36%,#ffb199,#FF4F30 22%,#4a0f08 62%,#140403);border:.2rem solid #FF4F30}
.r .av{background:linear-gradient(180deg,#F5AF5F,#CD732D 55%,#3a1a0a)}`,
  html:`<div class="stage"><div class="grp" id="grp"><div class="it l"><div class="av"></div><b>Nila</b><small>Singer</small></div><div class="it r"><div class="av"></div><b>Sahar</b><small>Producer</small></div><div class="it c" id="ctr"><div class="av" id="cav"></div><b>Arman</b><small>Featured Artist</small></div></div></div>`,
  js:`const L=document.querySelector('.it.l'), R=document.querySelector('.it.r'), C=document.getElementById('ctr'), cav=document.getElementById('cav'), grp=document.getElementById('grp');
play(6,t=>{
  const c=ease.back(seg(t,.2,.9)), f=ease.inOut(seg(t,1.5,2.4)), d=ease.inOut(seg(t,3.6,4.5)), o=1-seg(t,5.3,5.8);
  grp.style.transform='translateY('+(d*8)+'rem) scale('+lerp(1,.92,d)+')'; grp.style.opacity=o;
  C.style.opacity=seg(t,.2,.5); C.style.transform='scale('+lerp(.6,1,c)+')'; C.style.zIndex=3;
  cav.style.boxShadow='0 0 '+(1.4+.5*Math.sin(t*3))+'rem rgba(255,79,48,.6)';
  [[L,-1],[R,1]].forEach(([e,s])=>{e.style.opacity=f; e.style.transform='translateX('+(s*9*f)+'rem) scale('+lerp(.7,.88,f)+')'});
});` },

/* 6 ---------------------------------------------------------------- */
{ v:2, id:'list3d', fa:'Tilted 3D list with successive ticks', en:'3D Perspective List + Check Fill', cat:'ui',
  when:'Showing a feature (download, select). Instead of a phone mockup, the list tilts and the rows get ticked one by one.',
  timing:'Rows enter 0.1 s apart · each tick 0.5 s, 0.42 s apart · exit scroll 1.2 s',
  where:'Seconds 5.5 to 7', colors:['#180603','#291513','#FF4F30','#846C69'], dur:6.4,
  css:`${NOIR}
.scene{position:absolute;inset:0;perspective:60rem}
.list{position:absolute;left:2.4rem;right:1rem;top:7rem;transform-style:preserve-3d;transform:rotateX(14deg) rotateY(-12deg) rotateZ(-3deg)}
.row{height:4.6rem;margin-bottom:.9rem;border-radius:1rem;background:linear-gradient(135deg,#291513,#180603);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:.9rem;padding:0 1rem;box-shadow:0 1rem 2rem rgba(0,0,0,.5)}
.th{width:2.8rem;height:2.8rem;border-radius:.6rem;flex:none}
.nm b{display:block;font:600 1rem 'Inter Tight',sans-serif}
.nm small{font:400 .7rem 'Inter Tight',sans-serif;color:#846C69}
.ck{margin-left:auto;width:1.7rem;height:1.7rem;border-radius:50%;border:.14rem solid #FF4F30;display:grid;place-items:center;flex:none}
.ck svg{width:80%;opacity:0}`,
  html:`<div class="stage"><div class="scene"><div class="list" id="list">${['Night Drive|Arman|#F5AF5F,#7a3a1a','Slow Tide|Nila|#B07AE8,#3a1a60','Amber|Sahar|#FF4F30,#4a0f08','Glass Hours|Kian|#E9E1DF,#5a4a47','Low Light|Mina|#F5AF5F,#a0522d','Ember|Dara|#FF4F30,#8F2215','Afterglow|Roya|#7BA8FF,#1b2a60'].map(s=>{const a=s.split('|');return '<div class="row"><div class="th" style="background:linear-gradient(135deg,'+a[2]+')"></div><div class="nm"><b>'+a[0]+'</b><small>'+a[1]+'</small></div><div class="ck"><svg viewBox="0 0 16 16"><path d="M4 8.5l2.5 2.5L12 5.5" stroke="#fff" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>'}).join('')}</div></div></div>`,
  js:`const rows=[...document.querySelectorAll('.row')], list=document.getElementById('list');
play(6.4,t=>{
  rows.forEach((r,i)=>{
    const p=ease.out(seg(t,.2+i*.1,.8+i*.1));
    r.style.opacity=p; r.style.transform='translateY('+lerp(3,0,p)+'rem)';
    const s=1.8+i*.42, c=ease.out(seg(t,s,s+.5)), ck=r.querySelector('.ck'), tick=ck.firstElementChild;
    ck.style.background='rgba(255,79,48,'+c+')';
    tick.style.opacity=c; tick.style.transform='scale('+lerp(.4,1,ease.back(seg(t,s,s+.5)))+')';
  });
  const sc=ease.inOut(seg(t,4.6,5.8));
  list.style.transform='rotateX(14deg) rotateY(-12deg) rotateZ(-3deg) translateY('+(-sc*36)+'rem)';
  list.style.opacity=1-seg(t,5.4,6);
});` },

/* 7 ---------------------------------------------------------------- */
{ v:2, id:'chips', fa:'Horizontal chips with red activation', en:'Pill Chips Slide + Activate', cat:'ui',
  when:'A list of benefits or filters. A red dot turns into a chip, the row slides, and the last chip lights up red.',
  timing:'Each chip 0.6 s, 0.8 s apart · row slide 0.7 s · activation 0.6 s',
  where:'Seconds 7 to 8.5', colors:['#392624','#8F2215','#EB3721'], dur:6,
  css:`${NOIR}
.dot{position:absolute;left:50%;top:22rem;width:.9rem;height:.9rem;margin:-.45rem 0 0 -.45rem;border-radius:50%;background:#FF4F30;box-shadow:0 0 1rem rgba(255,79,48,.8)}
.rowc{position:absolute;left:0;top:20.5rem;height:3rem}
.chip{position:absolute;top:0;padding:.85rem 1.3rem;border-radius:2rem;background:#392624;font:500 .9rem/1 'Inter Tight',sans-serif;white-space:nowrap}`,
  html:`<div class="stage"><div class="dot" id="dot"></div><div class="rowc" id="rowc"><div class="chip">All</div><div class="chip">Ad-free</div><div class="chip">Offline</div><div class="chip">Unlimited skips</div></div></div>`,
  js:`const row=document.getElementById('rowc'), dot=document.getElementById('dot'), chips=[...row.children];
const T=[1.1,1.9,2.7,3.5], mix=(a,b,t)=>'rgb('+a.map((v,i)=>Math.round(lerp(v,b[i],t))).join(',')+')';
play(6,t=>{
  const r=parseFloat(getComputedStyle(document.documentElement).fontSize), off=[], w=[]; let x=0;
  chips.forEach(c=>{const cw=c.offsetWidth/r; w.push(cw); off.push(x); x+=cw+.8});
  const ctr=i=>off[i]+w[i]/2; let cx=ctr(0);
  for(let i=1;i<chips.length;i++) cx=lerp(cx,ctr(i),ease.inOut(seg(t,T[i],T[i]+.7)));
  chips.forEach((c,i)=>{const p=seg(t,T[i],T[i]+.6); c.style.left=off[i]+'rem'; c.style.opacity=ease.out(p); c.style.transform='scale('+lerp(.8,1,ease.back(p))+')'});
  row.style.transform='translateX('+(13.5-cx)+'rem)'; row.style.opacity=1-seg(t,5.3,5.8);
  const a=ease.inOut(seg(t,3.5,4.1)), last=chips[3];
  last.style.background=mix([57,38,36],[235,55,33],a); last.style.boxShadow='0 0 '+(a*1.6)+'rem rgba(235,55,33,'+(a*.55)+')';
  dot.style.opacity=seg(t,.3,.6)*(1-seg(t,1,1.3));
  dot.style.transform='scale('+(1+.25*Math.sin(t*9))+')';
});` },

/* 8 ---------------------------------------------------------------- */
{ v:2, id:'glowblob', fa:'Ambient light blob', en:'Ambient Glow Blob', cat:'fx',
  when:'Stands in for any background image. A soft, blurred red light moves, grows and shrinks between scenes to change the mood.',
  timing:'Move 1.4 s each time · ease-in-out · very slight breathing (4%)',
  where:'Whole video (peak at second 9)', colors:['#54160F','#922316','#0D0301'], dur:7,
  css:`.stage{background:#0D0301}
.bl{position:absolute;left:0;top:0;width:30rem;height:30rem;margin:-15rem 0 0 -15rem;border-radius:50%;background:radial-gradient(circle,#922316 0%,rgba(146,35,22,.55) 30%,rgba(84,22,15,.25) 55%,transparent 72%);filter:blur(1.2rem)}
.vg{position:absolute;inset:0;background:radial-gradient(70% 55% at 50% 50%,transparent 40%,rgba(0,0,0,.6))}
.cap{position:absolute;left:0;right:0;top:21rem;text-align:center;font:500 1.6rem 'Inter Tight',sans-serif}`,
  html:`<div class="stage"><div class="bl" id="bl"></div><div class="vg"></div><div class="cap" id="cap">Listen closer</div></div>`,
  js:`const bl=document.getElementById('bl'), cap=document.getElementById('cap');
const S=[[13.5,38,.8,.55],[17,33,1.25,1],[8,40,.9,.5]];            // x, y (rem), scale, opacity
play(7,t=>{
  const a=ease.inOut(seg(t,1.6,3)), b=ease.inOut(seg(t,4.2,5.6));
  const f=i=>lerp(lerp(S[0][i],S[1][i],a),S[2][i],b);
  bl.style.transform='translate('+f(0)+'rem,'+f(1)+'rem) scale('+(f(2)*(1+.04*Math.sin(t*2)))+')';
  bl.style.opacity=f(3);
  cap.style.opacity=ease.out(seg(t,2.6,3.2))*(1-seg(t,4.2,4.8));
});` },

/* 9 ---------------------------------------------------------------- */
{ v:2, id:'scenecut', fa:'Scene transition with blur and fade', en:'Blur-Fade Scene Cut', cat:'fx',
  when:'Switching scenes without a hard cut. Each scene comes in with blur and a rise, and leaves with blur and a slight grow.',
  timing:'Enter 0.6 s · exit 0.5 s · each scene about 2.4 s',
  where:'Whole video', colors:['#FFFFFF','#FF4F30'], dur:7.6,
  css:`${NOIR}
.sn{position:absolute;left:2rem;right:2rem;top:20rem;font:600 2.7rem/1.15 'Inter Tight',sans-serif;letter-spacing:-.02em;opacity:0}
.sn em{font:italic 400 2.9rem 'Instrument Serif',serif;color:#FF4F30}`,
  html:`<div class="stage"><div class="sn">Pure <em>sound.</em></div><div class="sn">Offline <em>anywhere.</em></div><div class="sn">Skip <em>freely.</em></div></div>`,
  js:`const sc=[...document.querySelectorAll('.sn')], T=[.3,2.6,4.9], D=2.4;
play(7.6,t=>sc.forEach((s,i)=>{
  const a=T[i], inn=ease.out(seg(t,a,a+.6)), out=ease.inOut(seg(t,a+D-.5,a+D));
  s.style.opacity=inn*(1-out);
  s.style.filter='blur('+((1-inn)*.9+out*.9)+'rem)';
  s.style.transform='translateY('+((1-inn)*1.2)+'rem) scale('+(1+out*.05)+')';
}));` }
);

VIDEOS.push({
  id:'v2', n:2, title:'Premium music app: red and black', meta:'14 seconds · 720×1280 · a reels concept for a music app',
  mood:'Dark, luxurious and calm. Warm black with one soft red light standing in for any background image. One brand color (neon red), everything else white or pinkish white. Each scene carries one message.',
  rules:[
    'One brand color: neon red on warm black. Text is white or pinkish white, the subtitle a faded brown.',
    'A two-part headline: a fixed white sans-serif word and an italic serif red key word. The key word changes between scenes.',
    'Every scene has one message and one element. Transitions are always blur and fade, never hard cuts.',
    'A soft red light blob replaces the picture background and moves, grows and shrinks between scenes.',
    'Features are shown in a tilted 3D interface (not a phone mockup), for example offline download with successive ticks.',
    'Rhythm: entrances 0.5 to 0.8 s, each scene about 2 s, the whole reel 14 s. It starts and ends with the neon logo.'
  ],
  palette:[
    { g:'Background', c:[['#0D0301','Warm black'],['#100503','Second warm black'],['#2F0F0A','Bottom of scene']] },
    { g:'Ambient light', c:[['#54160F','Soft light'],['#922316','Blob peak']] },
    { g:'Brand red', c:[['#FF4F30','Neon, italic and tick'],['#FB4F41','Small label'],['#EB3721','Active chip'],['#8F2215','Chip activating']] },
    { g:'Surfaces', c:[['#180603','List card'],['#291513','Second list card'],['#392624','Inactive chip'],['#341A19','CTA button']] },
    { g:'Text', c:[['#FFFFFF','Headline'],['#F1D0CC','Paragraph'],['#846C69','Subtitle']] },
    { g:'Avatar images', c:[['#F5AF5F','Sunset (sample)']] }
  ]
});

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 2: noir + neon red */
  --noir-black:#0D0301; --noir-black-2:#100503; --noir-warm:#2F0F0A;
  --ember-glow-1:#54160F; --ember-glow-2:#922316;
  --neon-red:#FF4F30; --neon-red-2:#FB4F41; --chip-active:#EB3721; --chip-warming:#8F2215;
  --surface-1:#180603; --surface-2:#291513; --chip-idle:#392624; --cta-bg:#341A19;
  --white:#FFFFFF; --blush:#F1D0CC; --dim:#846C69; --sunset:#F5AF5F;
}`);
