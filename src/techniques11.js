/* ===== Video 15: logo reveal filmed off a laptop screen: shape carving, gloss sweep, emblem assembly, palette bars, chevron stack ===== */
const P15_CSS = `.stage{background:#0F5A4C;font-family:'Inter Tight',sans-serif;color:#fff;overflow:hidden}
.lb{position:absolute;left:1rem;bottom:2.4rem;font:600 .8rem/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#9FE3D0;opacity:.9;z-index:9}
.sb{position:absolute;left:3rem;right:3rem;bottom:1rem;height:.12rem;background:rgba(255,255,255,.28);z-index:8}.sb i{position:absolute;left:0;top:0;bottom:0;background:#fff}.sb b{position:absolute;top:-.22rem;width:.55rem;height:.55rem;border-radius:50%;background:#fff;margin-left:-.27rem}
.sv{position:absolute;left:0;top:0;width:27rem;height:48rem;overflow:visible}`;
const P15_SB = `<div class="sb"><i id="sbi"></i><b id="sbk"></b></div>`;
const P15_JS = `const $=id=>document.getElementById(id);const NS='http://www.w3.org/2000/svg';
function scrub(t,d){const p=Math.min(1,t/d)*100;$('sbi').style.width=p+'%';$('sbk').style.left=p+'%'}`;

TECHS.push(
{ v:15, id:'shapecarve', fa:'Square carved into a corner shape with guide lines', en:'Square-to-corner Carve with Guides', cat:'fx',
  when:'Starting a logo from its geometry. A plain light-blue square sits on dashed guide lines; a rectangle slices out of it until only a bold corner remains, a cyan handle marks the anchor, and the corner grows and swings toward the lower left.',
  timing:'Guides draw 0.6 s · corner cut 0.8 to 1.4 s (ease inOut) · handle pulses at 2 Hz · corner scales 1 → 2.1 and moves 5 rem toward the lower left 2.4 to 4 s · exit blur 4.6 s',
  where:'0 to 4 s', colors:['#0F5A4C','#9CC9E8','#3FD0D8','#FFFFFF'], dur:5.4,
  css:P15_CSS,
  html:`<div class="stage"><svg class="sv" viewBox="0 0 27 48"><g id="gd" stroke="#8FD6C6" stroke-width=".06" stroke-dasharray=".35 .3" fill="none"><line x1="0" y1="17" x2="27" y2="17"/><line x1="0" y1="26" x2="27" y2="26"/><line x1="9" y1="0" x2="9" y2="48"/><line x1="18" y1="0" x2="18" y2="48"/></g><defs><mask id="mk"><rect width="27" height="48" fill="#fff"/><rect id="c1" x="13" y="21" width="0" height="5" fill="#000"/><rect id="c2" x="9" y="17" width="5" height="0" fill="#000"/></mask></defs><g id="sh"><rect x="9" y="17" width="9" height="9" fill="#9CC9E8" mask="url(#mk)"/><path id="hn" d="M18 17 l-.7 .1 .2 .9z" fill="#3FD0D8" transform="translate(-.2 .1) scale(1.6)"/></g>${P15_SB}<div class="lb" id="lb"></div></div>`,
  js:`${P15_JS}
const gd=[...$('gd').children];gd.forEach(l=>{l.dataset.n=48});
play(5.4,t=>{
  gd.forEach((l,i)=>l.setAttribute('opacity',ease.out(seg(t,i*.08,.6+i*.08))*(1-seg(t,4.4,4.9))));
  const a=ease.inOut(seg(t,.8,1.4));
  $('c1').setAttribute('width',5*a);$('c1').setAttribute('x',18-5*a);$('c2').setAttribute('height',0);
  $('c1').setAttribute('y',21);$('c1').setAttribute('height',5);
  const m=ease.inOut(seg(t,2.4,4)),s=lerp(1,2.1,m),tx=lerp(0,-5,m),ty=lerp(0,4,m),o=1-seg(t,4.6,5.2);
  $('sh').setAttribute('transform','translate('+(13.5+tx)+' '+(21.5+ty)+') scale('+s+') translate(-13.5 -21.5)');$('sh').setAttribute('opacity',o);
  $('hn').setAttribute('opacity',.6+.4*Math.sin(t*12.5));
  scrub(t,5.4);$('lb').textContent=t<.8?'GUIDES':t<1.8?'CARVE':'GROW';
});` },

{ v:15, id:'glosssweep', fa:'Diagonal gloss sweep over a solid shape', en:'Diagonal Gloss Sweep', cat:'fx',
  when:'Giving a flat shape a physical, glassy feel just before it resolves. A soft white band travels diagonally across the shape and a hairline of light follows it across the frame.',
  timing:'Shape fades up 0.4 s · band moves 1.0 s (ease inOut) from the top-left to the bottom-right at −35° · band width 6 rem, peak opacity 0.9 · hairline 0.5 s behind · hold 1 s · exit 0.4 s',
  where:'4 to 5.5 s', colors:['#0B3F36','#F4F4F4','#FFFFFF','#9CC9E8'], dur:5.4,
  css:P15_CSS+`.stage{background:#0B3F36}`,
  html:`<div class="stage"><svg class="sv" viewBox="0 0 27 48"><defs><linearGradient id="gb" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><clipPath id="cp"><path d="M7 17H20V22H12V31H7Z"/></clipPath></defs><path id="sp" d="M7 17H20V22H12V31H7Z" fill="#E9EEF0"/><g clip-path="url(#cp)"><rect id="bd" x="-8" y="-6" width="6" height="60" fill="url(#gb)" transform="rotate(35 13.5 24)"/></g><line id="hl" x1="0" y1="0" x2="40" y2="0" stroke="#fff" stroke-width=".08" opacity="0" transform="rotate(35 13.5 24)"/>${P15_SB}</svg><div class="lb" id="lb"></div></div>`,
  js:`${P15_JS}
play(5.4,t=>{
  const a=ease.out(seg(t,0,.4)),o=1-seg(t,4.9,5.3);$('sp').setAttribute('opacity',a*o);
  const k=ease.inOut(seg(t,1,2));$('bd').setAttribute('x',lerp(-8,34,k));
  $('hl').setAttribute('opacity',.8*Math.sin(Math.PI*seg(t,1.2,2.4)));$('hl').setAttribute('y1',lerp(-14,30,seg(t,1.2,2.4)));$('hl').setAttribute('y2',lerp(-14,30,seg(t,1.2,2.4)));
  $('bd').parentNode.setAttribute('opacity',o);
  $('lb').textContent=t<1?'SHAPE':t<2?'SWEEP':'HOLD';
});` },

{ v:15, id:'emblemassemble', fa:'Four brackets assembling into a ring emblem', en:'Bracket-to-ring Emblem Assembly', cat:'layout',
  when:'Revealing a symbol made of four identical pieces. Four angle brackets slide in from the corners, click together inside a ring that draws itself, one of them in the accent color, and the whole emblem spins once and settles.',
  timing:'Ring draws 0.9 s · brackets fly in 0.7 s each, 0.1 s apart, ease-back · accent bracket (#E8431F) last · emblem spin 360° in 1.1 s (ease inOut) · settle scale 1.08 → 1 · exit 4.7 s',
  where:'5.5 to 8 s', colors:['#0E7F72','#E8431F','#F4F4F4','#0B3F36'], dur:5.4,
  css:P15_CSS+`.stage{background:#0B3F36}`,
  html:`<div class="stage"><svg class="sv" viewBox="0 0 27 48"><g id="em" transform="translate(13.5 23)"><circle id="rg" r="6.2" fill="none" stroke="#0E7F72" stroke-width=".9"/>${[[-1,-1,'#0E7F72'],[1,-1,'#0E7F72'],[-1,1,'#0E7F72'],[1,1,'#E8431F']].map((q,i)=>`<path class="br" data-i="${i}" data-x="${q[0]}" data-y="${q[1]}" d="M0 0H3.2V1.5H1.5V3.2H0Z" fill="${q[2]}" transform="scale(${q[0]} ${q[1]})"/>`).join('')}</g>${P15_SB}</svg><div class="lb" id="lb"></div></div>`,
  js:`${P15_JS}
const rg=$('rg'),RL=2*Math.PI*6.2;rg.style.strokeDasharray=RL;
const B=[...document.querySelectorAll('.br')];
play(5.4,t=>{
  rg.style.strokeDashoffset=RL*(1-ease.out(seg(t,0,.9)));
  B.forEach((b,i)=>{const x=+b.dataset.x,y=+b.dataset.y,k=ease.back(seg(t,.7+i*.1,1.4+i*.1)),d=(1-k)*12;
    b.setAttribute('transform','translate('+(x*(.9+d))+' '+(y*(.9+d))+') scale('+x+' '+y+')');b.setAttribute('opacity',Math.min(1,k*4))});
  const sp=ease.inOut(seg(t,2.2,3.3)),sc=lerp(1.08,1,ease.out(seg(t,3.3,3.9)))*(1-.2*seg(t,4.7,5.3));
  $('em').setAttribute('transform','translate(13.5 23) rotate('+(360*sp)+') scale('+sc+')');$('em').setAttribute('opacity',1-seg(t,4.7,5.3));
  scrub(t,5.4);$('lb').textContent=t<2.2?'ASSEMBLE':t<3.3?'SPIN':'SETTLE';
});` },

{ v:15, id:'palettebars', fa:'Four color bars that name the brand palette', en:'Palette Bars with Hex Labels', cat:'layout',
  when:'Presenting a brand palette inside the reveal. Four tall vertical bars rise one after another, each labelled with its hex code, hold together as a flag, and then slide away to make room for the mark.',
  timing:'Bars rise 0.7 s each, 0.12 s apart (ease-out) · hex labels fade 0.3 s after each bar · hold 1.4 s · bars collapse top to bottom 0.5 s, 0.08 s apart · bar width 3.4 rem, height 19 rem',
  where:'9 to 11 s', colors:['#004C3D','#FFA069','#FFFFFF','#000000','#EAF0FF'], dur:5.4,
  css:P15_CSS+`.stage{background:#EAF0FF}.lb{color:#2A4A6A}.sb{background:rgba(0,0,0,.2)}.sb i,.sb b{background:#2A4A6A}
.bar{position:absolute;top:14.5rem;width:3.4rem;height:19rem;transform-origin:50% 100%;display:grid;place-items:center;font:600 .55rem/1 'Inter Tight',sans-serif;letter-spacing:.04em;border:1px solid rgba(0,0,0,.1)}`,
  html:`<div class="stage">${[['#004C3D','004C3D','#fff'],['#FFA069','FFA069','#4A2A14'],['#FFFFFF','FFFFFF','#555'],['#000000','000000','#fff']].map((c,i)=>`<div class="bar" id="b${i}" style="left:${6.1+i*3.5}rem;background:${c[0]};color:${c[2]}"><span id="t${i}">${c[1]}</span></div>`).join('')}${P15_SB}<div class="lb" id="lb"></div></div>`,
  js:`${P15_JS}
play(5.4,t=>{
  for(let i=0;i<4;i++){
    const k=ease.out(seg(t,.2+i*.12,.9+i*.12)),c=ease.inOut(seg(t,3.6+i*.08,4.1+i*.08)),b=$('b'+i);
    b.style.transform='scaleY('+k*(1-c)+')';b.style.transformOrigin=c>0?'50% 0%':'50% 100%';$('t'+i).style.opacity=seg(t,.5+i*.12,.8+i*.12)*(1-c);
  }
  scrub(t,5.4);$('lb').textContent=t<1.2?'RISE':t<3.6?'HOLD':'COLLAPSE';
});` },

{ v:15, id:'chevronstack', fa:'Three stacked chevrons popping in with a mini menu', en:'Chevron Stack with Action Menu', cat:'ui',
  when:'Ending a logo story with an interface hint. Three chevrons in three colors pop up one on top of another with a back-ease, a small cyan dot like a cursor lands beside them, and a tiny menu card of actions slides up with the last item highlighted.',
  timing:'Chevrons pop 0.5 s each, 0.2 s apart from the bottom up · cursor dot flies in 0.6 s at 1.4 s · menu card rises 0.5 s at 2.4 s · rows fade 0.08 s apart · last row highlight #3FD0D8 at 3.3 s · exit 4.6 s',
  where:'12 to 14 s', colors:['#F2F2F2','#E8431F','#8ED0E6','#3FD0D8','#101820'], dur:5.4,
  css:P15_CSS+`.stage{background:#10181E}
.mn{position:absolute;left:8.5rem;top:30rem;width:10rem;border-radius:.5rem;background:rgba(40,56,66,.9);border:1px solid rgba(255,255,255,.14);padding:.5rem}
.mn div{font:600 .55rem/1 'Inter Tight',sans-serif;letter-spacing:.06em;padding:.38rem .4rem;border-radius:.25rem;color:#D8E4EA}
.mn div:last-child{color:#10181E}`,
  html:`<div class="stage"><svg class="sv" viewBox="0 0 27 48"><g id="cv"><path id="c2" d="M7 6L13.5 0L20 6V9L13.5 3L7 9Z" fill="#8ED0E6" transform="translate(0 20)"/><path id="c1" d="M7 6L13.5 0L20 6V9L13.5 3L7 9Z" fill="#E8431F" transform="translate(0 15.5)"/><path id="c0" d="M7 6L13.5 0L20 6V9L13.5 3L7 9Z" fill="#F2F2F2" transform="translate(0 11)"/></g><circle id="dt" r=".45" fill="#3FD0D8"/></svg><div class="mn" id="mn"><div>OPEN</div><div>SAVE</div><div>SHARE</div><div id="ap">APPLY</div></div>${P15_SB}<div class="lb" id="lb"></div></div>`,
  js:`${P15_JS}
const R=[...$('mn').children];
play(5.4,t=>{
  [2,1,0].forEach((c,i)=>{const k=ease.back(seg(t,.2+i*.2,.7+i*.2)),e=$('c'+c),y=[11,15.5,20][c];e.setAttribute('transform','translate(13.5 '+(y+3)+') scale('+k+') translate(-13.5 -3)');e.setAttribute('opacity',Math.min(1,k*3)*(1-seg(t,4.6,5.1)))});
  const d=ease.out(seg(t,1.4,2));$('dt').setAttribute('cx',lerp(26,19.4,d));$('dt').setAttribute('cy',lerp(40,24,d));$('dt').setAttribute('opacity',seg(t,1.4,1.6)*(1-seg(t,4.6,5.1)));
  const m=ease.out(seg(t,2.4,2.9)),mn=$('mn');mn.style.opacity=m*(1-seg(t,4.6,5.1));mn.style.transform='translateY('+(1-m)*1.5+'rem)';
  R.forEach((r,i)=>r.style.opacity=ease.out(seg(t,2.5+i*.08,2.8+i*.08)));
  $('ap').style.background=t>3.3?'#3FD0D8':'transparent';
  scrub(t,5.4);$('lb').textContent=t<1.4?'POP':t<2.4?'CURSOR':'MENU';
});` }
);

VIDEOS.push({ id:'v15', n:15, title:'Logo reveal filmed off a laptop screen', meta:'19.6 seconds · 720×1280 · a brand-identity reveal shot as a phone video of a monitor',
  mood:'Craft-forward and tactile. Deep teal, one warm peach and one hot orange-red, pure white and black; thin dashed guide lines and hex labels show how the mark was built, and the footage keeps the real monitor edge, player bar and dock.',
  rules:[
    'The logo is explained as geometry first: a plain square on dashed guides is carved into the mark by two moving rectangles.',
    'A diagonal gloss band crosses the finished shape once, so it reads as a solid object.',
    'A symbol made of four parts is assembled from the corners and spins once; only one part carries the accent color.',
    'The palette is shown as four tall bars with their hex codes written on them, then the bars collapse.',
    'The footage is deliberately left as a recording of a screen: the player scrub bar and the dock stay visible.',
    'Backgrounds switch hard between teal, black, red and white; the mark carries continuity, not the background.'
  ],
  palette:[
    { g:'Brand', c:[['#004C3D','Deep teal'],['#FFA069','Peach'],['#FFFFFF','White'],['#000000','Black']] },
    { g:'Construction', c:[['#9CC9E8','Light-blue square'],['#3FD0D8','Cyan handle'],['#8FD6C6','Guide line'],['#0E7F72','Ring teal']] },
    { g:'Accent', c:[['#E8431F','Orange-red bracket'],['#8ED0E6','Chevron blue'],['#EAF0FF','Palette page']] }
  ] });

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 15: logo reveal */
  --lr-teal:#004C3D; --lr-peach:#FFA069; --lr-red:#E8431F; --lr-cyan:#3FD0D8; --lr-sq:#9CC9E8; --lr-page:#EAF0FF;
}`);
