/* ===== Video 3: cinematic 3D app sign-up flow (CSS-3D approximations) ===== */
TECHS.push(
/* 1 ---------------------------------------------------------------- */
{ v:3, id:'extrude', fa:'Layered 3D logo with camera move', en:'Layered 3D Extrusion + Camera Fly', cat:'fx',
  when:'The start of a video. The logo is built from several stacked layers (it has volume); the camera starts very close and pulls back.',
  timing:'Camera move 3 s · ease-in-out · initial rotation 62 to 18 degrees · 18 layers 0.22rem apart',
  where:'Seconds 0 to 4', colors:['#2A2A8A','#1E7EA2','#2ABAAE','#7ED2AE','#000000'], dur:5.5,
  css:`.stage{background:#000;perspective:55rem;perspective-origin:50% 44%}
.cam{position:absolute;left:50%;top:22rem;width:0;height:0;transform-style:preserve-3d}
.ly{position:absolute;left:-9rem;top:-9rem;width:18rem;height:18rem}
.ly svg{width:100%;height:100%;overflow:visible;fill:none;stroke:currentColor;stroke-width:8;stroke-linecap:round;stroke-linejoin:round}`,
  html:`<div class="stage" id="st"><div class="cam" id="cam"></div></div>`,
  js:`const cam=document.getElementById('cam'), st=document.getElementById('st'), N=18;
const C=[[42,42,138],[30,126,162],[42,186,174],[126,210,174],[232,255,246]];
const colAt=u=>{const s=u*(C.length-1), i=Math.min(C.length-2,Math.floor(s)), k=s-i;return 'rgb('+C[i].map((v,j)=>Math.round(lerp(v,C[i+1][j],k))).join(',')+')'};
for(let i=0;i<N;i++){
  const d=document.createElement('div'); d.className='ly';
  d.style.transform='translateZ('+((i-N/2)*.22)+'rem)'; d.style.color=colAt(i/(N-1));
  d.innerHTML='<svg viewBox="0 0 180 180"><path d="M28 90a62 62 0 1 0 124 0a62 62 0 1 0-124 0"/><path d="M58 92L82 118L126 66"/></svg>';
  cam.appendChild(d);
}
play(5.5,t=>{
  const a=ease.inOut(seg(t,0,3)), o=1-seg(t,4.9,5.4);
  cam.style.opacity=o;
  cam.style.transform='translateZ('+lerp(34,-4,a)+'rem) rotateX('+lerp(14,6,a)+'deg) rotateY('+(lerp(-62,-18,a)+Math.sin(t*.9)*4)+'deg)';
  st.style.filter='drop-shadow(0 0 '+(.8+.4*Math.sin(t*3))+'rem rgba(85,255,255,.45))';
});` },

/* 2 ---------------------------------------------------------------- */
{ v:3, id:'lightburst', fa:'Light burst from a phone screen', en:'Screen Light Burst (God Rays)', cat:'fx',
  when:'Introducing a device or app. The screen jumps from black to white, rays rotate, then the light calms and the content shows.',
  timing:'Light jump 0.25 s · rays fade over 1.5 s · very short white flash (30%)',
  where:'Seconds 4 to 7.5', colors:['#FFFFFF','#000000'], dur:5,
  css:`.stage{background:#000}
.rays{position:absolute;left:50%;top:22rem;width:60rem;height:60rem;margin:-30rem 0 0 -30rem;background:repeating-conic-gradient(from 0deg,rgba(255,255,255,.6) 0 3deg,transparent 3deg 15deg);-webkit-mask-image:radial-gradient(circle,#000 0,transparent 60%);mask-image:radial-gradient(circle,#000 0,transparent 60%);filter:blur(.4rem);opacity:0}
.ph{position:absolute;left:50%;top:22rem;width:10rem;height:20rem;margin:-10rem 0 0 -5rem;border-radius:1.8rem;background:#000;border:.22rem solid #161616}
.scr{position:absolute;inset:.25rem;border-radius:1.5rem;background:#080808;overflow:hidden;color:#fff}
.mk{position:absolute;left:50%;top:7rem;width:3.4rem;margin-left:-1.7rem;fill:none;stroke:currentColor;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
.ui{position:absolute;left:1rem;right:1rem;top:3rem;opacity:0}
.ui i{display:block;height:1.3rem;border-radius:.4rem;background:#EBEAF4;margin-bottom:.7rem}
.fl{position:absolute;inset:0;background:#fff;opacity:0}`,
  html:`<div class="stage"><div class="rays" id="rays"></div><div class="ph" id="ph"><div class="scr" id="scr"><svg class="mk" id="mk" viewBox="0 0 180 180"><path d="M28 90a62 62 0 1 0 124 0a62 62 0 1 0-124 0"/><path d="M58 92L82 118L126 66"/></svg><div class="ui" id="ui"><i></i><i></i><i style="width:70%"></i><i></i></div></div></div><div class="fl" id="fl"></div></div>`,
  js:`const rays=document.getElementById('rays'), ph=document.getElementById('ph'), scr=document.getElementById('scr'), mk=document.getElementById('mk'), ui=document.getElementById('ui'), fl=document.getElementById('fl');
play(5,t=>{
  const on=ease.out(seg(t,1.1,1.35)), fade=ease.inOut(seg(t,2.2,3.6)), o=1-seg(t,4.5,5);
  const lum=Math.round(lerp(8,255,on)); scr.style.background='rgb('+lum+','+lum+','+lum+')';
  mk.style.color=on>.5?'#111':'#fff'; mk.style.opacity=seg(t,.2,.7)*(1-seg(t,3,3.4));
  const glow=on*(1-fade*.8);
  rays.style.opacity=on*(1-fade)*o;
  rays.style.transform='rotate('+(t*10)+'deg) scale('+lerp(.6,1.1,seg(t,1.1,3))+')';
  ph.style.boxShadow='0 0 '+(7*glow)+'rem rgba(255,255,255,'+(.85*glow)+')';
  ph.style.transform='scale('+lerp(1,.8,ease.inOut(seg(t,2.4,3.8)))+')'; ph.style.opacity=o;
  ui.style.opacity=seg(t,2.8,3.5);
  fl.style.opacity=.3*Math.max(0,1-Math.abs(t-1.2)/.25);
});` },

/* 3 ---------------------------------------------------------------- */
{ v:3, id:'slabmenu', fa:'Dive into a phone and slab menu', en:'Phone Dive-in + Slab Menu Lift', cat:'ui',
  when:'Going from a wide view of the device into the interface. The menu looks like thick tilted slabs and one row rises like glass.',
  timing:'Dive 2.3 s · ease-in-out · row rises 0.8 s and returns 0.8 s',
  where:'Seconds 7.5 to 13', colors:['#202D38','#1B2733','#36AE8A','#1E725A','#365A8A'], dur:6.8,
  css:`.stage{background:#000;perspective:60rem}
.world{position:absolute;left:50%;top:24rem;width:0;height:0;transform-style:preserve-3d}
.phone{position:absolute;left:-6rem;top:-11rem;width:12rem;height:22rem;border-radius:1.6rem;background:#0a1014;border:.15rem solid #28323a;padding:1.4rem .7rem;transform-style:preserve-3d;overflow:visible}
.blob{position:absolute;border-radius:50%;filter:blur(1rem)}
.rows{position:relative;transform-style:preserve-3d}
.mr{height:2rem;margin-bottom:.55rem;border-radius:.4rem;background:linear-gradient(90deg,#202D38,#1B2733);display:flex;align-items:center;gap:.5rem;padding:0 .6rem;font:500 .7rem 'Inter Tight',sans-serif;color:#fff;border:1px solid rgba(255,255,255,.05)}
.mr i{width:.8rem;height:.8rem;border-radius:50%;border:.1rem solid #fff;flex:none}`,
  html:`<div class="stage"><div class="world" id="world"><div class="phone"><div class="blob" style="left:3rem;top:3rem;width:5rem;height:4rem;background:#1E725A"></div><div class="blob" style="left:6rem;top:12rem;width:5rem;height:5rem;background:#365A8A"></div><div class="rows">${['Home','Search','Cart','Profile','Alerts','About','Help','Language'].map(n=>'<div class="mr"><i></i>'+n+'</div>').join('')}</div></div></div></div>`,
  js:`const world=document.getElementById('world'), rows=[...document.querySelectorAll('.mr')];
const mixc=(a,b,t)=>a.map((v,i)=>Math.round(lerp(v,b[i],t)));
play(6.8,t=>{
  const d=ease.inOut(seg(t,.7,3)), o=1-seg(t,6.2,6.7);
  world.style.opacity=ease.out(seg(t,0,.5))*o;
  world.style.transform='translateZ('+lerp(-26,34,d)+'rem) rotateX('+lerp(0,54,d)+'deg) rotateY('+lerp(0,-12,d)+'deg) rotateZ('+(lerp(0,-20,d)-seg(t,3,6.5)*3)+'deg)';
  const lift=ease.inOut(seg(t,3.4,4.2))*(1-ease.inOut(seg(t,5,5.8))), r=rows[3], c=mixc([32,45,56],[110,230,190],lift);
  r.style.transform='translateZ('+(lift*3)+'rem) rotateX('+(-lift*9)+'deg) translateY('+(-lift*.5)+'rem)';
  r.style.background='rgba('+c.join(',')+','+lerp(1,.5,lift)+')';
  r.style.boxShadow='0 '+(lift*1.4)+'rem '+(lift*2)+'rem rgba(0,0,0,.6)';
});` },

/* 4 ---------------------------------------------------------------- */
{ v:3, id:'bokeh', fa:'Blurred bubbles (depth of field)', en:'Bokeh Depth-of-Field Orbs', cat:'fx',
  when:'Adding depth to an interface. Big, blurred bubbles pass in front of the camera; the bigger, the blurrier and faster.',
  timing:'Pass 6 s (two passes for small bubbles) · blur proportional to size · 6 bubbles',
  where:'Seconds 9 to 13', colors:['#36AE8A','#1E725A','#365A8A','#2A425A','#7ED2AE'], dur:6,
  css:`.stage{background:radial-gradient(#10151a,#000)}
.cd{position:absolute;left:3rem;right:3rem;top:14rem;height:18rem;border-radius:1rem;background:#EBEAF4;padding:1.4rem}
.cd i{display:block;height:1.3rem;border-radius:.4rem;background:#C0C8D6;margin-bottom:.8rem}
.cd b{display:block;height:2.6rem;border-radius:.6rem;background:#1B2733;margin-top:1.2rem}
.bk{position:absolute;left:0;top:0;border-radius:50%}`,
  html:`<div class="stage"><div class="cd"><i style="width:60%"></i><i></i><i></i><b></b></div><div id="bks"></div></div>`,
  js:`const cfg=[ // size, y, color (rgb), loops, phase
  [10,6,[54,174,138],1,.0],[7,31,[54,90,138],1,.4],[14,18,[30,114,90],1,.7],
  [4,12,[126,210,174],2,.2],[5,26,[42,66,90],2,.6],[3,36,[54,174,138],2,.9]];
const box=document.getElementById('bks');
const els=cfg.map(c=>{const e=document.createElement('div');e.className='bk';e.style.width=e.style.height=c[0]+'rem';
  e.style.filter='blur('+(c[0]*.09)+'rem)';
  e.style.background='radial-gradient(circle,rgba('+c[2]+',.85),rgba('+c[2]+',.45) 55%,transparent 72%)';
  box.appendChild(e);return e});
play(6,t=>cfg.forEach((c,i)=>{
  const p=((t/6)*c[3]+c[4])%1, x=lerp(-c[0]-2,29,p);
  els[i].style.transform='translate('+x+'rem,'+c[1]+'rem)';
  els[i].style.opacity=Math.min(1,Math.min(p,1-p)*6);
}));` },

/* 5 ---------------------------------------------------------------- */
{ v:3, id:'ripple', fa:'Touch ripple on a button', en:'Touch Ripple', cat:'ui',
  when:'Showing a touch or a selection. White rings with a shadow spread from the touch point like ripples on water.',
  timing:'Each ring 1.5 s · 0.14 s apart · 4 rings · ease-out · the link compresses slightly',
  where:'Seconds 13 to 15', colors:['#FDFCFF','#EBEAF4','#1B2733'], dur:4.4,
  css:`.stage{background:#FDFCFF}
.h{position:absolute;left:3rem;top:12rem;font:700 1.9rem 'Inter Tight',sans-serif;color:#1B2733}
.in{position:absolute;left:3rem;right:3rem;height:3.2rem;border-radius:.8rem;background:#EBEAF4}
.lg{position:absolute;left:3rem;right:3rem;top:24rem;height:3.4rem;border-radius:.8rem;background:#1B2733;color:#fff;display:grid;place-items:center;font:600 1rem 'Inter Tight',sans-serif}
.sg{position:absolute;left:0;right:0;top:29rem;text-align:center;font:500 .95rem 'Inter Tight',sans-serif;color:#7b8794}
.sg b{color:#1B2733;display:inline-block}
.rg{position:absolute;left:17.6rem;top:29.8rem;border-radius:50%;border:.16rem solid rgba(255,255,255,.95);box-shadow:0 0 .6rem rgba(20,30,40,.55),inset 0 0 .7rem rgba(20,30,40,.35);opacity:0;width:0;height:0}`,
  html:`<div class="stage"><div class="h">Welcome back</div><div class="in" style="top:16rem"></div><div class="in" style="top:20rem"></div><div class="lg">Login</div><div class="sg">Don't have an account? <b id="lk">Signup</b></div><div class="rg"></div><div class="rg"></div><div class="rg"></div><div class="rg"></div></div>`,
  js:`const R=[...document.querySelectorAll('.rg')], lk=document.getElementById('lk');
play(4.4,t=>{
  const t0=1, o=1-seg(t,3.9,4.3);
  R.forEach((r,i)=>{
    const p=seg(t,t0+i*.14,t0+1.5+i*.14), s=lerp(.2,15,ease.out(p));
    r.style.width=r.style.height=s+'rem'; r.style.marginLeft=r.style.marginTop=(-s/2)+'rem';
    r.style.opacity=p>0?(1-p)*.9*o:0;
  });
  lk.style.transform='scale('+(1-.06*Math.sin(Math.PI*seg(t,t0,t0+.3)))+')';
});` },

/* 6 ---------------------------------------------------------------- */
{ v:3, id:'formfill', fa:'Form fill with a pastel sweep', en:'Form Fill + Iridescent Focus Sweep', cat:'ui',
  when:'Sign-up steps. A tilted form in perspective, the camera slides from top to bottom, and each field is typed with a blue-purple-pink sweep.',
  timing:'Each field 1.0 s · 1.1 s apart · typed letter by letter · camera 7 s',
  where:'Seconds 15 to 20', colors:['#B3BCC9','#BAC3D0','#C0C8D6','#333C49','#C1CBD9'], dur:8,
  css:`.stage{background:linear-gradient(160deg,#C0C8D6,#B3BCC9);perspective:50rem}
.board{position:absolute;left:50%;top:50%;width:19rem;margin:-12rem 0 0 -9.5rem;transform-style:preserve-3d}
.hd{font:600 1.3rem 'Inter Tight',sans-serif;color:#333C49;margin-bottom:1rem}
.fd{position:relative;height:3.3rem;margin-bottom:.9rem;border-radius:.7rem;background:#BAC3D0;border:1px solid rgba(255,255,255,.55);box-shadow:0 .5rem 1rem rgba(40,50,70,.18);display:flex;align-items:center;padding:0 1rem;font:500 .95rem 'Inter Tight',sans-serif;color:#333C49;overflow:hidden}
.fd .sw{position:absolute;inset:0;background:linear-gradient(100deg,transparent 0 28%,rgba(150,200,255,.8) 44%,rgba(215,190,255,.65) 54%,rgba(255,200,230,.5) 64%,transparent 80%);transform:translateX(-120%);opacity:0}
.fd span{position:relative;white-space:nowrap}
.cr{opacity:0}
.tm{display:flex;gap:.6rem;align-items:center;font:500 .85rem 'Inter Tight',sans-serif;color:#333C49}
.cb{width:1.2rem;height:1.2rem;border-radius:.3rem;border:.12rem solid #333C49;display:grid;place-items:center}
.cb svg{width:80%;opacity:0}`,
  html:`<div class="stage"><div class="board" id="board"><div class="hd">Create account</div><div class="fd"><div class="sw"></div><span class="tx"></span><span class="cr">|</span></div><div class="fd"><div class="sw"></div><span class="tx"></span><span class="cr">|</span></div><div class="fd"><div class="sw"></div><span class="tx"></span><span class="cr">|</span></div><div class="fd"><div class="sw"></div><span class="tx"></span><span class="cr">|</span></div><div class="fd"><div class="sw"></div><span class="tx"></span><span class="cr">|</span></div><div class="tm"><div class="cb"><svg viewBox="0 0 16 16" id="tk"><path d="M3.5 8.5l3 3L12.5 5" stroke="#333C49" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>I accept the terms</div></div></div>`,
  js:`const board=document.getElementById('board'), fds=[...document.querySelectorAll('.fd')], tk=document.getElementById('tk');
const PH=['Email','Full name','Phone','Password','Confirm'], VAL=['sam@mail.com','Sam Rivera','+1 555 0142','********','********'];
play(8,t=>{
  const g=ease.inOut(seg(t,.2,7)), o=1-seg(t,7.5,7.9);
  board.style.opacity=ease.out(seg(t,0,.5))*o;
  board.style.transform='rotateX(52deg) rotateZ(-14deg) translateY('+lerp(7,-3,g)+'rem) translateZ('+lerp(-2,3,g)+'rem)';
  fds.forEach((f,i)=>{
    const a=1+i*1.1, w=seg(t,a,a+1), n=Math.floor(seg(t,a+.15,a+.95)*VAL[i].length);
    const tx=f.querySelector('.tx'), sw=f.querySelector('.sw'), cr=f.querySelector('.cr');
    tx.textContent=n>0?VAL[i].slice(0,n):PH[i]; tx.style.opacity=n>0?1:.55;
    sw.style.transform='translateX('+lerp(-120,120,ease.inOut(w))+'%)'; sw.style.opacity=(w>0&&w<1)?1:0;
    cr.style.opacity=(w>0&&t<a+1.3&&Math.floor(t*3)%2===0)?1:0;
  });
  tk.style.opacity=ease.out(seg(t,6.6,7));
});` },

/* 7 ---------------------------------------------------------------- */
{ v:3, id:'slabbtn', fa:'3D thick button and neon success', en:'Extruded Button Press + Neon Success', cat:'ui',
  when:'The end of a process. A thick black button presses in, then a turquoise glow bursts around it so success is felt.',
  timing:'Press 0.25 s · return 0.5 s · glow 0.7 s up and 1 s down',
  where:'Seconds 19 to 21', colors:['#000000','#55FFFF','#9BEBFF','#B3BCC9'], dur:5,
  css:`.stage{background:#B3BCC9;perspective:50rem}
.halo{position:absolute;left:50%;top:24rem;width:36rem;height:22rem;margin:-11rem 0 0 -18rem;border-radius:50%;background:radial-gradient(circle,rgba(85,255,255,.9),rgba(85,255,255,.3) 45%,transparent 70%);opacity:0;filter:blur(.8rem)}
.btn3d{position:absolute;left:50%;top:24rem;width:17rem;height:4.4rem;margin:-2.2rem 0 0 -8.5rem;transform-style:preserve-3d;transform:rotateX(58deg) rotateZ(-14deg)}
.sl{position:absolute;inset:0;border-radius:.6rem;background:#0b0b0b;border:1px solid #3a3a3a}
.sl.top{background:#000;border-color:#777;display:grid;place-items:center;font:600 1.1rem 'Inter Tight',sans-serif;color:#fff}`,
  html:`<div class="stage"><div class="halo" id="halo"></div><div class="btn3d" id="btn"></div></div>`,
  js:`const btn=document.getElementById('btn'), halo=document.getElementById('halo'), N=10, L=[];
for(let i=0;i<N;i++){const d=document.createElement('div');d.className='sl'+(i===N-1?' top':'');if(i===N-1)d.textContent='Sign up';btn.appendChild(d);L.push(d)}
play(5,t=>{
  const press=ease.out(seg(t,1.4,1.65))*(1-ease.out(seg(t,1.7,2.2)));
  const g=ease.out(seg(t,1.6,2.3))*(1-ease.inOut(seg(t,3.5,4.5))), o=1-seg(t,4.6,5);
  btn.style.opacity=ease.out(seg(t,0,.5))*o;
  L.forEach((d,i)=>d.style.transform='translateZ('+(i*.14*(1-.55*press))+'rem)');
  const top=L[N-1];
  top.style.borderColor=g>.05?'rgb('+Math.round(lerp(119,85,g))+','+Math.round(lerp(119,255,g))+',255)':'#777';
  top.style.boxShadow='0 0 '+(g*1.6)+'rem rgba(85,255,255,'+g+')';
  halo.style.opacity=g*.85;
  halo.style.transform='scale('+lerp(.7,1.15,ease.out(seg(t,1.6,2.6)))+')';
});` },

/* 8 ---------------------------------------------------------------- */
{ v:3, id:'trackin', fa:'Tracking-in text and closing logo', en:'Tracking Contract + Bloom Logo End', cat:'type',
  when:'A success message and the end. Very thin text appears widely spaced and tightens, then a white line logo with a soft glow.',
  timing:'Letters tighten in 1.4 s · ease-out · hold 1.8 s · turns into the logo in 0.8 s',
  where:'Seconds 20.5 to 27', colors:['#FFFFFF','#000000'], dur:6.4,
  css:`.stage{background:#000}
.t{position:absolute;left:0;right:0;top:22rem;text-align:center;font:300 1.05rem/1 'Inter Tight',sans-serif;color:#fff;text-transform:uppercase;white-space:nowrap;text-shadow:0 0 .8rem rgba(255,255,255,.6)}
.lg{position:absolute;left:50%;top:21rem;width:5rem;margin-left:-2.5rem;fill:none;stroke:#fff;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;opacity:0}`,
  html:`<div class="stage"><div class="t" id="t">You have successfully joined</div><svg class="lg" id="lg" viewBox="0 0 180 180"><path d="M28 90a62 62 0 1 0 124 0a62 62 0 1 0-124 0"/><path d="M58 92L82 118L126 66"/></svg></div>`,
  js:`const t_=document.getElementById('t'), lg=document.getElementById('lg');
play(6.4,t=>{
  const a=ease.out(seg(t,.4,1.8)), out=ease.inOut(seg(t,3.3,4.1)), logo=ease.out(seg(t,3.6,4.4));
  t_.style.letterSpacing=lerp(.55,.04,a)+'em';
  t_.style.opacity=seg(t,.4,.9)*(1-out);
  t_.style.filter='blur('+lerp(.5,0,a)+'rem)';
  lg.style.opacity=logo*(1-seg(t,5.9,6.3));
  lg.style.transform='scale('+lerp(.9,1,logo)+')';
  lg.style.filter='drop-shadow(0 0 '+(.5+.3*Math.sin(t*3))+'rem rgba(255,255,255,.8))';
});` }
);

VIDEOS.push({
  id:'v3', n:3, title:'App sign-up: 3D motion', meta:'27 seconds · 720×900 (4:5) · 3D motion for app sign-up steps',
  mood:'Cinematic and 3D. Turquoise and mint neon on pure black for the logo and the ending, a light gray-blue interface with a tilted camera for the form. The camera is never still and every element has volume.',
  rules:[
    'The camera is always moving: it starts close on the logo, pulls back, dives into the phone and slides over the form.',
    'Every interface has volume: the menu and button are like thick slabs, the fields like frosted glass. The tilt angle stays fixed.',
    'Pure black background for the logo and the ending, a light gray-blue for the form. Between the two, a white flash or a black cut.',
    'Field filling: a blue-purple-pink pastel sweep with letter-by-letter typing and a cursor.',
    'Touch and success are felt: a ripple on the button, the thick button pressing, and a neon turquoise glow.',
    'Depth of field: blurred green and blue bubbles pass in front of the camera.',
    'A very simple ending: one thin sentence with tightening letter spacing, then a white line logo.'
  ],
  palette:[
    { g:'Background', c:[['#000000','Pure black']] },
    { g:'Neon logo (layers)', c:[['#2A2A8A','Indigo edge'],['#1E7EA2','Blue'],['#2ABAAE','Turquoise'],['#66D2D2','Light'],['#7ED2AE','Mint']] },
    { g:'Success neon', c:[['#55FFFF','Peak glow'],['#9BEBFF','Halo']] },
    { g:'Dark menu', c:[['#202D38','Slab'],['#1B2733','Second slab'],['#1E725A','Green bubble'],['#36AE8A','Green glass'],['#365A8A','Blue bubble'],['#2A425A','Dark blue']] },
    { g:'Light form', c:[['#B3BCC9','Background'],['#BAC3D0','Field'],['#C0C8D6','Field edge'],['#333C49','Text'],['#C1CBD9','Pastel sweep']] },
    { g:'Enter', c:[['#FDFCFF','Page'],['#EBEAF4','Field']] }
  ]
});

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 3: cinematic 3D sign-up */
  --void:#000000; --edge-indigo:#2A2A8A; --neon-blue:#1E7EA2; --neon-teal:#2ABAAE; --neon-aqua:#66D2D2; --neon-mint:#7ED2AE;
  --success-cyan:#55FFFF; --success-halo:#9BEBFF;
  --slab:#202D38; --slab-2:#1B2733; --blob-green:#1E725A; --glass-green:#36AE8A; --blob-blue:#365A8A; --blob-blue-dark:#2A425A;
  --form-bg:#B3BCC9; --field:#BAC3D0; --field-edge:#C0C8D6; --ink:#333C49; --sweep:#C1CBD9;
  --login-bg:#FDFCFF; --login-field:#EBEAF4;
}`);
