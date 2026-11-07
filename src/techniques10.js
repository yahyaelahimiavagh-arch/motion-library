/* ===== Video 14: AI chat interface intro, shown above a sound-design timeline. Light-line logo, dark prompt box with model picker, hand click into spinner, code window ===== */
const P14_CSS = `.stage{background:#050505;font-family:'Inter Tight',sans-serif;color:#F2F2F2}
.lb{position:absolute;left:1rem;bottom:1rem;font:600 .8rem/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#7FD3B4;opacity:.9;z-index:9}
.hl{position:absolute;left:0;right:0;top:0;text-align:center;font:600 .78rem/1 'Inter Tight',sans-serif;padding-top:1rem;color:#fff}
.vig{position:absolute;inset:0;background:radial-gradient(60% 40% at 50% 46%,transparent 0%,rgba(0,0,0,.55) 100%);pointer-events:none}`;
const P14_JS = `const $=id=>document.getElementById(id);const blurIn=(el,k,r=.5)=>{el.style.opacity=k;el.style.filter='blur('+(1-k)*r+'rem)'};`;
const P14_PET = `<g fill="none" stroke="#fff" stroke-width=".11" stroke-linecap="round">${Array.from({length:6},(_,i)=>`<path transform="rotate(${i*60})" d="M0 -.12C.55 -.1 .62 -.7 0 -.98C-.62 -.7 -.55 -.1 0 -.12Z"/>`).join('')}</g>`;

TECHS.push(
{ v:14, id:'linelogo', fa:'Light line growing into a logo and wordmark', en:'Light-line Logo Reveal', cat:'type',
  when:'Opening a product intro on black. A thin vertical streak of light appears, a soft dark halo opens around it, a small ring logo takes its place, slides left, and the product name types out beside it with a version number that rolls to the new one.',
  timing:'Streak 0.5 s (height 0 → 6 rem) · halo 0.5 s · logo pop 0.45 s · logo slides 4.3 rem left at 1.4 s · name letters 0.07 s apart from 1.4 s · version digit rolls 0.35 s at 3.2 s · exit 4.6 s',
  where:'0.4 to 4.2 s', colors:['#050505','#FFFFFF','#8A8A8A','#111111'], dur:5.4,
  css:P14_CSS+`.st{position:absolute;left:13.35rem;top:19rem;width:.3rem;height:6rem;background:linear-gradient(180deg,transparent,#fff,transparent);filter:blur(.08rem);transform-origin:50% 50%}
.hal{position:absolute;left:3.5rem;top:12.5rem;width:20rem;height:20rem;border-radius:50%;background:radial-gradient(closest-side,rgba(60,60,60,.55),transparent)}
.lg{position:absolute;left:11.3rem;top:20.2rem;width:4.4rem;height:4.4rem}
.nm{position:absolute;left:12.2rem;top:21.4rem;font:600 1.5rem/1 'Inter Tight',sans-serif;white-space:nowrap}
.nm i{display:inline-block;font-style:normal}
.vr{position:relative;display:inline-block;height:1.5rem;width:2.1rem;overflow:hidden;vertical-align:top;margin-left:.5rem;color:#9A9A9A}
.vr b{position:absolute;left:0;font-weight:600}`,
  html:`<div class="stage"><div class="hl">Motion Design</div><i class="hal" id="hal"></i><i class="st" id="st"></i><svg class="lg" id="lg" viewBox="-1.1 -1.1 2.2 2.2">${P14_PET}</svg><div class="nm" id="nm"></div><div class="lb" id="lb"></div></div>`,
  js:`${P14_JS}
const NM='Nexa',nm=$('nm');nm.innerHTML=[...NM].map(c=>'<i>'+c+'</i>').join('')+'<span class="vr"><b id="v1" style="top:0">5.1</b><b id="v2" style="top:1.5rem">5.4</b></span>';
const G=[...nm.querySelectorAll('i')];
play(5.4,t=>{
  const s=ease.out(seg(t,.2,.7))*(1-seg(t,.7,.95)),h=ease.out(seg(t,.3,.8));
  $('st').style.transform='scaleY('+ease.out(seg(t,.2,.7))+')';$('st').style.opacity=s;$('hal').style.opacity=h*(1-seg(t,4.4,5));
  const p=ease.back(seg(t,.7,1.15)),sl=ease.inOut(seg(t,1.4,2));
  $('lg').style.opacity=seg(t,.7,.9)*(1-seg(t,4.4,5));$('lg').style.transform='translateX('+(-4.3*sl)+'rem) scale('+lerp(.5,1,p)+') rotate('+lerp(-60,0,p)+'deg)';
  G.forEach((g,i)=>blurIn(g,ease.out(seg(t,1.5+i*.07,1.9+i*.07)),.4));
  nm.querySelector('.vr').style.opacity=seg(t,1.9,2.3);const rl=ease.inOut(seg(t,3.2,3.55));$('v1').style.transform='translateY('+(-1.5*rl)+'rem)';$('v2').style.transform='translateY('+(-1.5*rl)+'rem)';
  nm.style.opacity=1-seg(t,4.4,5);
  $('lb').textContent=t<.7?'STREAK':t<1.4?'LOGO':t<3.2?'NAME':'VERSION';
});` },

{ v:14, id:'modelpicker', fa:'Dark prompt box with a model dropdown', en:'Dark Prompt Box with Model Picker', cat:'ui',
  when:'Showing how someone talks to an AI and switches model on the way. A dark glass field types a request, a small chip on the right opens a three-item list, the highlight steps down to the newest model and the chip label changes.',
  timing:'Box 0.4 s · typing 0.6 to 2 s · list opens 2.3 s (0.25 s) · highlight steps 0.3 s each, selects at 3.3 s (blue #2F6BFF) · chip label swaps at 3.4 s · camera 1.2× → 1× over 4 s · exit 4.6 s',
  where:'4.2 to 8 s', colors:['#101012','#1E1E22','#2F6BFF','#8A8A8A','#F2F2F2'], dur:5.4,
  css:P14_CSS+`.grp{position:absolute;left:2rem;top:19rem;width:23rem;transform-origin:50% 40%}
.bx{position:relative;height:6rem;border-radius:1rem;background:#161618;border:1px solid #2A2A2E;box-shadow:0 0 3rem rgba(80,110,200,.12)}
.ty{position:absolute;left:1rem;top:1rem;font:500 .85rem/1 'Inter Tight',sans-serif;color:#E8E8EA;white-space:nowrap}
.tl{position:absolute;left:1rem;bottom:.8rem;font:500 .6rem/1 'Inter Tight',sans-serif;color:#8A8A8A}
.ch{position:absolute;right:4rem;bottom:.6rem;font:600 .65rem/1 'Inter Tight',sans-serif;padding:.35rem .5rem;border-radius:.4rem;background:#232327;color:#D8D8DC}
.ar{position:absolute;right:.7rem;bottom:.55rem;width:1.5rem;height:1.5rem;border-radius:50%;background:#2A2A2E;display:grid;place-items:center;font-size:.8rem}
.dd{position:absolute;right:3.2rem;top:6.3rem;width:7rem;border-radius:.6rem;background:#1B1B1F;border:1px solid #2F2F34;padding:.3rem;opacity:0;transform-origin:100% 0}
.dd div{font:500 .62rem/1 'Inter Tight',sans-serif;padding:.45rem .5rem;border-radius:.35rem;color:#CFCFD4}`,
  html:`<div class="stage"><div class="grp" id="g"><div class="bx" id="bx"><div class="ty" id="ty"></div><div class="tl">⌘ Tools</div><div class="ch" id="ch">5.1 ⌄</div><div class="ar">→</div></div><div class="dd" id="dd"><div>Model 4</div><div>Model 5</div><div>Model 5.4</div></div></div><div class="lb" id="lb"></div></div>`,
  js:`${P14_JS}
const T='Help me write a code....',R=[...$('dd').children];
play(5.4,t=>{
  const k=ease.out(seg(t,0,.4)),z=lerp(1.2,1,ease.out(seg(t,0,4))),o=seg(t,4.6,5.1);
  const g=$('g');g.style.opacity=k*(1-o);g.style.transform='scale('+z+')';g.style.filter='blur('+o*.5+'rem)';
  const n=Math.floor(seg(t,.6,2)*T.length);$('ty').innerHTML=n?T.slice(0,n)+(t<2.1?'<span style="color:#7FA8FF">|</span>':''):'<span style="color:#6A6A70">Ask anything</span><span style="color:#7FA8FF">|</span>';
  const d=ease.out(seg(t,2.3,2.55));$('dd').style.opacity=d;$('dd').style.transform='scale('+lerp(.9,1,d)+')';
  const hi=t<2.7?0:t<3.0?1:2;R.forEach((r,i)=>{r.style.background=(t>=2.4&&i===hi)?(t>3.3?'#2F6BFF':'#2B2B30'):'transparent';r.style.color=(t>3.3&&i===2)?'#fff':'#CFCFD4'});
  $('ch').textContent=t>3.4?'5.4 ⌄':'5.1 ⌄';
  if(t>3.7)$('dd').style.opacity=1-seg(t,3.7,3.95);
  $('lb').textContent=t<2.3?'TYPING':t<3.3?'PICKING':'MODEL 5.4';
});` },

{ v:14, id:'handspinner', fa:'Hand press that turns into a loading spinner', en:'Hand Press to Spinner', cat:'fx',
  when:'The moment of "send". A small round arrow button sits alone, a pointing hand presses it (the button swells and glows), then the button dissolves into eight tick marks that spin as a loader.',
  timing:'Hand rises 0.6 s · press 1.2 to 1.5 s (button 1× → 1.35×, ring 0.5 s) · button → ticks 2.1 to 2.5 s · 8 ticks, opacity chase at 1.1 revolutions per second · bottom-right light #2A2A30',
  where:'8 to 10.5 s', colors:['#050505','#FFFFFF','#2A2A30','#9A9A9A'], dur:5.4,
  css:P14_CSS+`.bt{position:absolute;left:12.3rem;top:22.3rem;width:2.4rem;height:2.4rem;border-radius:50%;background:#18181A;border:1px solid #3A3A40;display:grid;place-items:center;font:600 1.1rem/1 'Inter Tight',sans-serif}
.rg{position:absolute;left:12.3rem;top:22.3rem;width:2.4rem;height:2.4rem;border-radius:50%;border:2px solid rgba(255,255,255,.7);opacity:0}
.hd{position:absolute;width:2.2rem;height:2.6rem;filter:drop-shadow(0 .3rem .5rem rgba(0,0,0,.6))}
.sp{position:absolute;left:12.3rem;top:22.3rem;width:2.4rem;height:2.4rem}
.glow{position:absolute;right:-5rem;bottom:-5rem;width:16rem;height:16rem;border-radius:50%;background:#2A2A30;filter:blur(3rem)}`,
  html:`<div class="stage"><i class="glow"></i><div class="bt" id="bt">↑</div><i class="rg" id="rg"></i><svg class="sp" id="sp" viewBox="-12 -12 24 24"></svg><svg class="hd" id="hd" viewBox="0 0 22 26"><path d="M7 3.2C7 2 9.2 2 9.2 3.2V11C9.8 10 12 10 12 11.4 12.6 10.6 14.6 10.8 14.8 12 15.6 11.4 17.6 11.8 17.6 13.2V18C17.6 21.5 15.4 24 12 24 8.8 24 7.2 22.4 5.8 20L2.6 14.6C2 13.4 3.6 12.4 4.6 13.4L7 15.6Z" fill="#fff" stroke="#111" stroke-width=".7"/></svg><div class="lb" id="lb"></div></div>`,
  js:`${P14_JS}
const sp=$('sp'),NS='http://www.w3.org/2000/svg',TK=[];for(let i=0;i<8;i++){const l=document.createElementNS(NS,'line');l.setAttribute('x1',0);l.setAttribute('x2',0);l.setAttribute('y1',-8);l.setAttribute('y2',-4.5);l.setAttribute('stroke','#fff');l.setAttribute('stroke-width',1.4);l.setAttribute('stroke-linecap','round');l.setAttribute('transform','rotate('+i*45+')');sp.appendChild(l);TK.push(l)}
play(5.4,t=>{
  const h=ease.out(seg(t,0,.6)),pr=Math.sin(Math.PI*seg(t,1.2,1.6))*.5+.5*seg(t,1.4,2.1)*(1-seg(t,2.1,2.5));
  $('hd').style.left=lerp(17,13.4,h)+'rem';$('hd').style.top=lerp(36,24.1,h)+'rem';$('hd').style.opacity=h*(1-seg(t,2,2.4));$('hd').style.transform='scale('+(1-.12*Math.sin(Math.PI*seg(t,1.2,1.6)))+')';
  const m=1-ease.out(seg(t,2.1,2.5));const sc=(1+.35*Math.sin(Math.PI*seg(t,1.2,1.7)));
  $('bt').style.transform='scale('+sc*m+')';$('bt').style.opacity=m;$('bt').style.boxShadow='0 0 '+(Math.sin(Math.PI*seg(t,1.2,1.7))*2)+'rem rgba(255,255,255,.5)';
  const r=seg(t,1.2,1.8);$('rg').style.opacity=r>0&&r<1?1-r:0;$('rg').style.transform='scale('+(1+r*1.2)+')';
  const s=ease.out(seg(t,2.2,2.6));sp.style.opacity=s*(1-seg(t,5,5.4));
  TK.forEach((l,i)=>l.setAttribute('opacity',.15+.85*(((i/8-t*1.1)%1+1)%1)));
  $('lb').textContent=t<1.2?'APPROACH':t<2.2?'PRESS':'LOADING';
});` },

{ v:14, id:'codewindow', fa:'Glowing code window rising and collapsing', en:'Glowing Code Window', cat:'ui',
  when:'Showing the result of a "write code" prompt. A narrow window appears in the dark with a colored glow behind it; colored lines of code write themselves, the window grows and then folds back into the logo.',
  timing:'Window rises 0.7 s (scale 0.6 → 1, back-ease) · 12 code lines 0.12 s apart from 0.6 s · glow pulses at 1.4 Hz · scale 1 → 1.35 over 3 s · collapse 0.5 s at 4.3 s into a dot',
  where:'10.5 to 12 s', colors:['#0B0B0D','#E6D84F','#B58CFF','#F4F4F4','#FF7AA8','#333338'], dur:5.4,
  css:P14_CSS+`.wn{position:absolute;left:9.6rem;top:14rem;width:7.8rem;height:14rem;border-radius:.5rem;background:#0B0B0D;border:1px solid #333338;padding:1.1rem .6rem .5rem;overflow:hidden}
.wn::before{content:'Result';position:absolute;left:0;right:0;top:.25rem;text-align:center;font:600 .45rem/1 'Inter Tight',sans-serif;color:#9A9A9A}
.cl{height:.28rem;border-radius:.15rem;margin-bottom:.42rem;transform-origin:0 50%}
.gw{position:absolute;left:8.4rem;top:14.4rem;width:10.2rem;height:13rem;border-radius:50%;background:linear-gradient(135deg,#B58CFF,#E6D84F);filter:blur(2.2rem);opacity:.35}`,
  html:`<div class="stage"><i class="gw" id="gw"></i><div class="wn" id="wn"></div><div class="lb" id="lb"></div></div>`,
  js:`${P14_JS}
const COL=['#E6D84F','#B58CFF','#F4F4F4','#FF7AA8'],W=[.9,.55,.7,.4,.8,.62,.5,.88,.36,.74,.58,.46],wn=$('wn');
W.forEach((w,i)=>{const d=document.createElement('div');d.className='cl';d.style.width=(w*100)+'%';d.style.background=COL[i%4];d.style.marginLeft=((i%3)*6)+'%';wn.appendChild(d)});
const L=[...wn.children];
play(5.4,t=>{
  const p=ease.back(seg(t,0,.7)),sc=lerp(1,1.35,ease.inOut(seg(t,.7,3.7)))*lerp(.6,1,p),c=1-ease.inOut(seg(t,4.3,4.8));
  const w=$('wn'),gw=$('gw');w.style.opacity=Math.min(1,p*2)*c;w.style.transform='scale('+sc*c+')';
  gw.style.opacity=(.3+.12*Math.sin(t*8.8))*Math.min(1,p*2)*c;gw.style.transform='scale('+sc*c+')';
  L.forEach((l,i)=>{l.style.transform='scaleX('+ease.out(seg(t,.6+i*.12,.95+i*.12))+')'});
  $('lb').textContent=t<2?'WRITING':t<4.3?'GROWING':'FOLD';
});` },

{ v:14, id:'dualpane', fa:'Preview above, audio timeline below', en:'Motion over Sound Timeline Split', cat:'layout',
  when:'Showing that a piece is designed and scored. The frame is split: the visual sits on top under a "Motion Design" label and a green audio timeline sits below a "Sound Design" label, with a playhead sweeping across both so the viewer sees how picture and sound are cut together.',
  timing:'Labels fade 0.4 s · preview box 0.5 s · timeline blocks pop 0.03 s apart from 0.8 s · playhead sweeps the full width in 5 s (linear) · block under the playhead lights up (#6CF0B8)',
  where:'The whole video (the lower half stays on screen throughout)', colors:['#050505','#1FA97A','#6CF0B8','#8C7CF0','#2E2E33'], dur:5.4,
  css:P14_CSS+`.pv{position:absolute;left:1.5rem;top:4rem;width:24rem;height:13.5rem;border-radius:.3rem;background:#000;border:1px solid #26262A;display:grid;place-items:center}
.ls{position:absolute;left:0;right:0;font:600 .78rem/1 'Inter Tight',sans-serif;text-align:center}
.tm{position:absolute;left:1.5rem;top:26.6rem;width:24rem;height:13rem;background:#101012;border:1px solid #26262A;overflow:hidden}
.tm::before{content:'';position:absolute;left:0;right:0;top:0;height:1rem;background:#8C7CF0;opacity:.75}
.bk{position:absolute;height:.62rem;border-radius:.12rem;background:#1FA97A}
.ph{position:absolute;top:0;bottom:0;width:.1rem;background:#fff;box-shadow:0 0 .5rem #fff}
.pt{width:3rem;height:3rem;border-radius:50%;border:2px solid #fff}`,
  html:`<div class="stage"><div class="ls" style="top:2rem" id="l1">Motion Design</div><div class="pv" id="pv"><div class="pt" id="pt"></div></div><div class="ls" style="top:24.6rem" id="l2">Sound Design</div><div class="tm" id="tm"></div><div class="lb" id="lb"></div></div>`,
  js:`${P14_JS}
const tm=$('tm'),hs=n=>{const x=Math.sin(n*91.7)*43758.5;return x-Math.floor(x)},B=[];
for(let r=0;r<12;r++){let x=hs(r)*3;while(x<24){const w=.6+hs(r*17+x)*3.2;const b=document.createElement('i');b.className='bk';b.style.left=x+'rem';b.style.top=(1.5+r*.92)+'rem';b.style.width=w+'rem';tm.appendChild(b);B.push([b,x,w]);x+=w+.15+hs(x+r)*1.2}}
const ph=document.createElement('i');ph.className='ph';tm.appendChild(ph);
play(5.4,t=>{
  blurIn($('l1'),ease.out(seg(t,0,.4)),.3);blurIn($('l2'),ease.out(seg(t,.3,.7)),.3);
  $('pv').style.opacity=ease.out(seg(t,.2,.6));$('tm').style.opacity=ease.out(seg(t,.5,.9));
  const x=t/5.4*24;ph.style.left=x+'rem';
  B.forEach(([b,bx,w],i)=>{const on=x>=bx&&x<=bx+w;b.style.background=on?'#6CF0B8':'#1FA97A';b.style.transform='scaleX('+ease.out(seg(t,.8+i*.003,1.1+i*.003))+')';b.style.transformOrigin='0 50%'});
  const pt=$('pt');pt.style.transform='scale('+(1+.25*Math.sin(t*3))+')';pt.style.opacity=.5+.5*Math.sin(t*3)**2;
  $('lb').textContent=(t).toFixed(1)+' s';
});` }
);

VIDEOS.push({ id:'v14', n:14, title:'AI chat intro on a picture-and-sound split', meta:'12.5 seconds · 720×1280 · a landscape product intro shown over a sound-design timeline',
  mood:'Quiet and technical. A black screen, thin white strokes, small dark glass panels with soft blue-violet glow, and a green audio timeline under the picture. The UI animation is small and exact, like a product teaser.',
  rules:[
    'A single thin streak of light starts the video; the logo and name come out of it.',
    'The name is typed with blur-in letters and the version number rolls like a slot to show an upgrade.',
    'The prompt box is dark glass with a faint outline; the only color in the whole interface is the selected list row (blue).',
    'A choice is shown in three beats: open list, step the highlight, change the label of the chip.',
    'Clicks are drawn: hand moves in, the button swells with a ring, then the button turns into the loader so the same spot keeps the viewer\'s eye.',
    'The picture and the sound are shown together: the preview above, the audio timeline below with a playhead through both.'
  ],
  palette:[
    { g:'Interface', c:[['#050505','Black'],['#101012','Panel'],['#161618','Prompt box'],['#2A2A2E','Outline'],['#2F6BFF','Selected row']] },
    { g:'Timeline', c:[['#1FA97A','Block green'],['#6CF0B8','Active block'],['#8C7CF0','Ruler violet'],['#2E2E33','Track line']] },
    { g:'Code glow', c:[['#E6D84F','Yellow line'],['#B58CFF','Violet line'],['#FF7AA8','Pink line'],['#F4F4F4','White line']] }
  ] });

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 14: AI chat intro */
  --ct-black:#050505; --ct-panel:#161618; --ct-line:#2A2A2E; --ct-select:#2F6BFF; --ct-green:#1FA97A; --ct-mint:#6CF0B8; --ct-violet:#8C7CF0;
}`);
