/* ===== Video 13: portfolio intro. Halftone sunset reveal, selection-handle prompt box, kinetic words with glyph confetti, grid-framed card collage, arc glow outro ===== */
const P13_CSS = `.stage{background:#FDF1D9;font-family:'Inter Tight',sans-serif;color:#1A1410}
.lb{position:absolute;left:1rem;bottom:1rem;font:600 .8rem/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#B8661A;opacity:.9;z-index:9}
.sky{position:absolute;inset:0;background:radial-gradient(40% 12% at 20% 12%,#fff 0%,transparent 70%),radial-gradient(34% 10% at 78% 22%,#fff 0%,transparent 70%),linear-gradient(180deg,#409AEF 0%,#9CCBF5 36%,#C6DDA0 50%,#86AE4C 66%,#5C6D5C 100%)}`;
const P13_JS = `const $=id=>document.getElementById(id);`;
const P13_SKY = `<div class="sky" id="sky"></div>`;

TECHS.push(
{ v:13, id:'dotreveal', fa:'Halftone sunset reveal', en:'Halftone Dot Reveal', cat:'fx',
  when:'The very first beat of an intro. A small orange blob made of dots grows until the dots cover the frame, then the dots shrink from the center outward and reveal the first scene underneath.',
  timing:'Blob 0 to 0.9 s (radius 2.2 → 3.2 rem) · grows to full frame 0.9 to 1.9 s · dots shrink outward 1.7 to 3.2 s · dot pitch 1 rem · orange #F28F4B at the center → pink #E27BA0 at the edges',
  where:'0 to 3 s', colors:['#000000','#F28F4B','#E27BA0','#409AEF'], dur:5.4,
  css:P13_CSS+`.stage{background:#000}.sky{opacity:0}.cv{position:absolute;inset:0;width:100%;height:100%}`,
  html:`<div class="stage">${P13_SKY}<canvas class="cv" id="cv"></canvas><div class="lb" id="lb"></div></div>`,
  js:`${P13_JS}
const cv=$('cv'),g=cv.getContext('2d'),W=270,H=480,C=10;cv.width=W;cv.height=H;
play(5.4,t=>{
  g.clearRect(0,0,W,H);
  const blob=lerp(22,32,seg(t,0,.9)),cover=lerp(blob,430,ease.inOut(seg(t,.9,1.9))),rev=seg(t,1.7,3.2);
  $('sky').style.opacity=seg(t,1.6,1.9)*(1-seg(t,4.6,5.2));
  for(let y=0;y<H/C;y++)for(let x=0;x<W/C;x++){
    const px=x*C+C/2,py=y*C+C/2,d=Math.hypot(px-135,py-230);
    if(d>cover)continue;
    let r=C*.56*clamp((cover-d)/16+.15,0,1)*(1-clamp((rev*560-d)/170,0,1));
    if(t<.9)r*=.9+.1*Math.sin(t*7+d*.06);
    if(r<.3)continue;
    const m=clamp(d/300);g.fillStyle='rgb('+Math.round(lerp(242,226,m))+','+Math.round(lerp(143,123,m))+','+Math.round(lerp(75,160,m))+')';
    g.beginPath();g.arc(px,py,r,0,7);g.fill();
  }
  $('lb').textContent=t<.9?'BLOB':t<1.9?'COVER':'REVEAL';
});` },

{ v:13, id:'handlebox', fa:'Prompt box with selection handles', en:'Selection-handle Prompt Box', cat:'ui',
  when:'Introducing a person by letting the intro "type itself". A white rounded box sits on the photo with four black square handles, like a selected layer in a design tool; the text types in, the last phrase is orange, and a cursor presses the send button.',
  timing:'Box pop 0.4 s · typing 0.5 to 3 s (30 chars per second) · camera push 1× → 1.15× during typing, back to 1× 3.1 to 3.8 s · cursor in 3.0 to 3.6 s · press at 3.7 s (button goes lilac #8A74B0) · exit 4.6 s',
  where:'2.8 to 7 s', colors:['#FDFDFD','#E8861C','#8A74B0','#111111','#409AEF'], dur:5.4,
  css:P13_CSS+`.grp{position:absolute;left:2.2rem;top:19rem;width:22.6rem;transform-origin:50% 50%}
.hb{position:relative;min-height:3.2rem;background:#fff;border-radius:.8rem;padding:1rem 3.4rem 1rem 1rem;box-shadow:0 .6rem 2rem rgba(0,0,0,.18);font:500 .85rem/1.25 'Inter Tight',sans-serif}
.hb u{text-decoration:none;color:#E8861C}
.hd{position:absolute;width:.55rem;height:.55rem;background:#111}
.sn{position:absolute;right:.7rem;bottom:.7rem;width:1.7rem;height:1.7rem;border-radius:.5rem;background:#111;color:#fff;display:grid;place-items:center;font:700 .9rem/1 'Inter Tight',sans-serif}
.cu{position:absolute;width:1.5rem;height:1.5rem;filter:drop-shadow(0 .2rem .3rem rgba(0,0,0,.4))}`,
  html:`<div class="stage">${P13_SKY}<div class="grp" id="g"><div class="hb" id="hb"><i class="hd" style="left:-.28rem;top:-.28rem"></i><i class="hd" style="right:-.28rem;top:-.28rem"></i><i class="hd" style="left:-.28rem;bottom:-.28rem"></i><i class="hd" style="right:-.28rem;bottom:-.28rem"></i><span id="tx"></span><b class="sn" id="sn">↑</b></div><svg class="cu" id="cu" viewBox="0 0 20 20"><path d="M2 2L17 8L10 10L8 17Z" fill="#111" stroke="#fff" stroke-width="1.2"/></svg></div><div class="lb" id="lb"></div></div>`,
  js:`${P13_JS}
const A="Hi, I'm Alex Rowan, a Motion Designer with ",B='6 years of experience bringing ideas to life.',ALL=A+B;
play(5.4,t=>{
  const pop=ease.back(seg(t,0,.5)),z=lerp(1,1.15,ease.out(seg(t,.4,2.8)))*lerp(1,1/1.15,ease.inOut(seg(t,3.1,3.8)));
  const g=$('g');g.style.transform='scale('+(z*lerp(.7,1,pop))+')';g.style.opacity=pop*(1-seg(t,4.6,5.1));
  const n=Math.floor(seg(t,.5,3)*ALL.length),s=ALL.slice(0,n),i=Math.min(n,A.length+8);
  const a=s.slice(0,Math.min(s.length,A.length+8)),b=s.slice(A.length+8);
  $('tx').innerHTML=a+(b?'<u>'+b+'</u>':'')+(n<ALL.length?'<u>|</u>':'');
  const m=ease.inOut(seg(t,3,3.6));$('cu').style.left=lerp(24,19.6,m)+'rem';$('cu').style.top=lerp(8,4.6,m)+'rem';$('cu').style.opacity=seg(t,3,3.2);
  const pr=seg(t,3.7,3.85);$('sn').style.transform='scale('+(1-.15*pr)+')';$('sn').style.background=t>3.7?'#8A74B0':'#111';
  $('lb').textContent=t<3?'TYPING':t<3.7?'CURSOR':'SEND';
});` },

{ v:13, id:'kineticwords', fa:'Words with orange emphasis and glyph confetti', en:'Kinetic Words with Glyph Burst', cat:'type',
  when:'A one-line pitch that changes meaning word by word. Each phrase is one line of calm dark type on cream with a single orange word; while it holds, small slashes, arrows and asterisks fly outward around it.',
  timing:'4 phrases of 1.2 s · word blur-in 0.35 s · orange word color-wipes 0.3 s later · 16 glyphs per phrase flying 0.9 s, opacity 0 → 1 → 0 · exit blur 0.25 s',
  where:'7 to 10.7 s', colors:['#FDF1D9','#1A1410','#E8861C','#B8661A'], dur:5.4,
  css:P13_CSS+`.ph{position:absolute;left:0;right:0;top:22.4rem;text-align:center;font:500 1.8rem/1 'Inter Tight',sans-serif;white-space:nowrap}
.ph u{text-decoration:none;color:#E8861C}
.gl{position:absolute;font:600 1.1rem/1 'Inter Tight',sans-serif;color:#1A1410}.gl.o{color:#E8861C}`,
  html:`<div class="stage"><div id="gs"></div><div class="ph" id="ph"></div><div class="lb" id="lb"></div></div>`,
  js:`${P13_JS}
const PH=[['I turn ','ideas'],['into ','visuals'],['And visuals ','into'],['','Motion']],GL=['/','<','>','*','/','*'],gs=$('gs'),ph=$('ph');
const hs=n=>{const x=Math.sin(n*127.1)*43758.5453;return x-Math.floor(x)};
const gl=[];for(let p=0;p<PH.length;p++)for(let i=0;i<16;i++){const e=document.createElement('i');e.className='gl'+(i%3==0?' o':'');e.textContent=GL[Math.floor(hs(p*40+i)*GL.length)];e.style.opacity=0;gs.appendChild(e);gl.push([e,p,hs(p*9+i+1)*6.28,2+hs(p*5+i+3)*10,hs(i+p)*90])}
play(5.4,t=>{
  const p=Math.min(3,Math.floor(t/1.2)),u=t-p*1.2;
  ph.innerHTML=PH[p][0]+'<u style="opacity:'+ease.out(seg(u,.3,.6))+'">'+PH[p][1]+'</u>';
  const k=ease.out(seg(u,0,.35))*(1-seg(u,1.0,1.2));ph.style.opacity=k;ph.style.filter='blur('+(1-k)*.5+'rem)';
  gl.forEach(([e,q,a,r,rot])=>{const v=q===p?seg(u,.1,1):0,o=Math.sin(v*Math.PI);
    e.style.opacity=o;e.style.left=(13.5+Math.cos(a)*(3+r*v*1.3))+'rem';e.style.top=(23.6+Math.sin(a)*(3+r*v*.9))+'rem';e.style.transform='rotate('+(rot*v)+'deg)'});
  $('lb').textContent='PHRASE '+(p+1)+'/4';
});` },

{ v:13, id:'gridcards', fa:'Grid-framed image and fanning card collage', en:'Grid Frame to Card Collage', cat:'layout',
  when:'Showing a body of work. Thin grid lines draw across the page, one image sits inside a grid cell, then a pile of cards fans out from it so the page looks like a pin-board of projects.',
  timing:'Grid lines draw 0.8 s · hero card scales 0.6 → 1 in 0.7 s · collage cards pop 0.07 s apart from 1.8 s with back-ease · each card drifts ±0.3 rem · exit 4.6 s',
  where:'8 to 11 s and 10.5 to 11.8 s', colors:['#FFFFFF','#FFD21F','#2A1F6B','#7B5CFF','#111111','#F6C9A8'], dur:5.4,
  css:P13_CSS+`.stage{background:linear-gradient(180deg,#fff 0%,#FFF6EC 70%,#FBD9BE 100%)}
.gr{position:absolute;inset:0;width:27rem;height:48rem}
.gr line{stroke:#9A8F86;stroke-width:.06}
.cd{position:absolute;border-radius:.4rem;box-shadow:0 .5rem 1.2rem rgba(0,0,0,.2);overflow:hidden;font:700 1rem/1 'Inter Tight',sans-serif;display:grid;place-items:center}`,
  html:`<div class="stage"><svg class="gr" viewBox="0 0 27 48"><g id="gl"><line x1="9" y1="0" x2="9" y2="48"/><line x1="18" y1="0" x2="18" y2="48"/><line x1="0" y1="16" x2="27" y2="16"/><line x1="0" y1="32" x2="27" y2="32"/></g></svg><div id="cs"></div><div class="lb" id="lb"></div></div>`,
  js:`${P13_JS}
const L=[...$('gl').children];L.forEach(l=>{const n=l.getAttribute('x1')===l.getAttribute('x2')?48:27;l.style.strokeDasharray=n;l.style.strokeDashoffset=n});
const D=[['linear-gradient(160deg,#6CA8E8,#E8C8A0)','',9,18.4,9,12,0],['#FFD21F','',3,20,6,6,-6],['linear-gradient(135deg,#2A1F6B,#7B5CFF)','Fund your',4,30,8,5.4,4],['#fff','Hello',12,24.5,7,5,-3],['#111','',15,31,8,6.4,3],['#F6C9A8','',2,12,6,7,5],['linear-gradient(135deg,#1E8F7A,#9BE3C8)','',17,13.4,7,7,-4]];
const cs=$('cs');const E=D.map(d=>{const e=document.createElement('div');e.className='cd';e.style.background=d[0];e.style.color=d[0]==='#fff'||d[0]==='#FFD21F'?'#111':'#fff';e.textContent=d[1];e.style.left=d[2]+'rem';e.style.top=d[3]+'rem';e.style.width=d[4]+'rem';e.style.height=d[5]+'rem';cs.appendChild(e);return e});
play(5.4,t=>{
  L.forEach((l,i)=>{const n=i<2?48:27;l.style.strokeDashoffset=n*(1-ease.out(seg(t,i*.1,.8+i*.1)))});
  E.forEach((e,i)=>{const s=i===0?.2:1.8+(i-1)*.07,k=i===0?ease.out(seg(t,s,s+.7)):ease.back(seg(t,s,s+.6)),o=1-seg(t,4.6,5.1);
    e.style.opacity=Math.min(1,k*3)*o;e.style.transform='translate('+Math.sin(t*1.3+i)*.3+'rem,'+Math.cos(t*1.1+i)*.3+'rem) rotate('+(D[i][6]*k)+'deg) scale('+(i===0?lerp(.6,1,k):lerp(.3,1,k))+')'});
  $('lb').textContent=t<1.8?'GRID + HERO':'COLLAGE';
});` },

{ v:13, id:'arcglow', fa:'Warm arc glow rising under a word swap', en:'Rising Arc Glow Outro', cat:'fx',
  when:'The closing line. A black frame with a curved peach-to-plum glow rising from the bottom edge like a horizon, and one centered word at a time swapping with a short blur.',
  timing:'Glow rises 19 rem over 3 s (ease-out) · words 1 s each · word blur 0.25 s in and out · four words: Let\'s / Let\'s Make / Things / Move · plum ring #2A1650 above the glow',
  where:'11 to 12.6 s', colors:['#000000','#DEA885','#9B655A','#683E45','#2A1650'], dur:5.4,
  css:P13_CSS+`.stage{background:#000;color:#F6EDE3}
.arc{position:absolute;left:-22rem;width:71rem;height:34rem;border-radius:50%;background:radial-gradient(closest-side,#DEA885 0%,#9B655A 34%,#683E45 58%,#1A0F1A 80%,transparent 100%)}
.ring{position:absolute;left:-18rem;width:63rem;height:34rem;border-radius:50%;border:1.5rem solid #2A1650;filter:blur(1.4rem);opacity:.5}
.w{position:absolute;left:0;right:0;top:22rem;text-align:center;font:500 1.6rem/1 'Inter Tight',sans-serif}`,
  html:`<div class="stage"><i class="ring" id="rg"></i><i class="arc" id="ac"></i><div class="w" id="w"></div><div class="lb" id="lb"></div></div>`,
  js:`${P13_JS}
const W=["Let's","Let's Make",'Things','Move'];
play(5.4,t=>{
  const r=ease.out(seg(t,0,3));$('ac').style.top=lerp(54,35,r)+'rem';$('rg').style.top=lerp(47,27,r)+'rem';
  const i=Math.min(3,Math.floor(t/1)),u=t-i;
  $('w').textContent=W[i];const k=ease.out(seg(u,0,.25))*(1-seg(u,.78,1.0)*(i<3?1:0));$('w').style.opacity=k;$('w').style.filter='blur('+(1-k)*.5+'rem)';
  $('lb').textContent='GLOW '+Math.round(r*100)+'%';
});` }
);

VIDEOS.push({ id:'v13', n:13, title:'Designer portfolio intro: halftone to cream', meta:'12.6 seconds · 1080×608 · a landscape self-introduction: dot reveal, prompt box, kinetic words, card collage, glow outro',
  mood:'Warm and friendly. A sunny photo and a cream paper page with calm dark type and one orange word at a time, closed by a black frame with a peach horizon glow. It feels like a personal note, not an ad.',
  rules:[
    'The first frame is only an orange blob made of dots; the dots become the transition. The next scene is revealed by shrinking them, not by a fade.',
    'The intro is "written" in a prompt box: selection handles on the corners make it look like a layer you are editing.',
    'Only one word per phrase gets the accent color, and it is the word the sentence is about.',
    'Little glyphs (slash, angle bracket, asterisk) fly around a phrase while it holds. They add energy without adding content.',
    'Work is shown as a pile of cards on a hairline grid, not as a slideshow.',
    'The outro is a single word at a time over a rising glow.'
  ],
  palette:[
    { g:'Scenes', c:[['#FDF1D9','Cream page'],['#FCE9BE','Warm cream'],['#409AEF','Sky blue'],['#5C6D5C','Grass'],['#000000','Black']] },
    { g:'Accent and glow', c:[['#E8861C','Orange word'],['#F28F4B','Dot orange'],['#E27BA0','Dot pink'],['#DEA885','Glow peach'],['#9B655A','Glow clay'],['#683E45','Glow plum'],['#8A74B0','Button pressed']] }
  ] });

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 13: portfolio intro */
  --pf-cream:#FDF1D9; --pf-ink:#1A1410; --pf-orange:#E8861C; --pf-dot:#F28F4B; --pf-glow:#DEA885; --pf-plum:#683E45; --pf-sky:#409AEF;
}`);
