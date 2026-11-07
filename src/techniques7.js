/* ===== Video 11: a signature written by a glowing pen tip, filmed off a monitor (hand-drawn logo reveal) ===== */
const SIG_CSS = `.stage{background:#000}
.amb{position:absolute;right:-9rem;top:7rem;width:26rem;height:34rem;background:radial-gradient(closest-side,rgba(150,98,52,.62),rgba(80,48,22,.25) 55%,transparent);filter:blur(2.2rem);transform:skewX(-12deg)}
.amb2{position:absolute;left:-6rem;top:30rem;width:18rem;height:14rem;background:radial-gradient(closest-side,rgba(60,28,20,.5),transparent);filter:blur(2rem)}
.mon{position:absolute;left:0;right:0;top:0;height:8rem;background:linear-gradient(180deg,#3a2a1d 0%,#1d140e 45%,transparent);filter:blur(.5rem)}
.mon i{position:absolute;top:2.2rem;width:3rem;height:.35rem;border-radius:1rem;background:rgba(210,190,170,.28)}
.sig{position:absolute;left:2rem;top:15rem;width:23rem;height:auto;overflow:visible}
.sig path{fill:none;stroke-linecap:round;stroke-linejoin:round}
.sig .ink{stroke:#EEF0FA;stroke-width:1.5}
.sig .glow{stroke:#9CC9FF;stroke-width:3;filter:blur(.35rem);opacity:.35}
.cap{position:absolute;left:0;right:0;top:27.6rem;text-align:center;font:600 .78rem/1 'Inter Tight',sans-serif;color:#DCE2F2;text-transform:uppercase;white-space:nowrap}
.lb{position:absolute;left:1rem;bottom:1rem;font:600 .8rem/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#9CC9FF;opacity:.85}`;

const SIG_SVG = `<svg class="sig" viewBox="0 0 270 150"><defs><filter id="gl" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>
<g id="inkg"><path class="glow" id="ga" d="M14 102 C44 98 76 94 104 90 C140 84 130 36 100 36 C66 36 40 70 62 94 C80 114 118 104 136 78 C148 60 154 36 166 44 C176 52 152 84 162 98 C168 106 186 98 194 82 C200 70 208 62 213 74 C218 88 210 100 226 96 C244 92 256 76 264 64"/>
<path class="ink" id="pa" d="M14 102 C44 98 76 94 104 90 C140 84 130 36 100 36 C66 36 40 70 62 94 C80 114 118 104 136 78 C148 60 154 36 166 44 C176 52 152 84 162 98 C168 106 186 98 194 82 C200 70 208 62 213 74 C218 88 210 100 226 96 C244 92 256 76 264 64"/>
<path class="ink" id="pb" d="M66 116 C96 146 176 146 216 120 C232 110 246 104 262 104"/>
<path class="ink" id="pc" d="M70 58 C110 48 160 40 214 38"/></g>
<g id="cm" filter="url(#gl)"></g><g id="cm2"></g></svg>`;

const SIG_SCENE = `<div class="amb"></div><div class="amb2"></div><div class="mon"><i style="left:1.5rem"></i><i style="left:5.5rem;width:2rem"></i><i style="left:9rem;width:4rem"></i></div>`;

/* shared helpers: pure functions of time. ramp() is a smooth speed profile, comet() paints a fading tail behind the pen tip */
const SIGJS = `const $=id=>document.getElementById(id),A=$('pa'),B=$('pb'),C=$('pc'),GA=$('ga');
const LEN=[A,B,C].map(p=>p.getTotalLength()),P=[A,B,C];
P.forEach((p,i)=>p.style.strokeDasharray=LEN[i]+' '+(LEN[i]+6));GA.style.strokeDasharray=LEN[0]+' '+(LEN[0]+6);
const ramp=(t,K)=>{if(t<=K[0][0])return 0;for(let i=1;i<K.length;i++)if(t<=K[i][0]){const u=seg(t,K[i-1][0],K[i][0]);return lerp(K[i-1][1],K[i][1],u*u*(3-2*u)*.65+u*.35)}return 1};
const KC=[[.1,0],[.9,1]],KA=[[.8,0],[1.7,.2],[2.9,.68],[3.6,1]],KB=[[3.3,0],[4.1,1]];
function trim(p,i,v){p.style.strokeDashoffset=LEN[i]*(1-v)}`;

const COMETJS = `const NS='http://www.w3.org/2000/svg',cm=$('cm'),cm2=$('cm2'),N=12,slices=[];
for(let k=0;k<N;k++){const g=document.createElementNS(NS,'path');g.setAttribute('fill','none');g.setAttribute('stroke-linecap','round');(k<3?cm2:cm).appendChild(g);slices.push(g)}
function comet(i,v){                       // v = drawn fraction of path i; the tip sits at length s
  const L=LEN[i],s=L*v,d=P[i].getAttribute('d'),on=v>0&&v<1;
  slices.forEach((g,k)=>{
    g.style.display=on?'':'none';if(!on)return;
    const step=L*.012,a=Math.max(0,s-(k+1)*step);
    g.setAttribute('d',d);g.style.strokeDasharray=step+' '+(L*2);g.style.strokeDashoffset=-a;
    g.setAttribute('stroke',k<2?'#F4FAFF':'#5FA7F2');g.setAttribute('stroke-width',lerp(3.6,1.1,k/N));g.style.opacity=Math.pow(1-k/N,1.6)});
}`;

TECHS.push(
{ v:11, id:'sigdraw', fa:'Signature draw-on (trim path)', en:'Handwritten Signature Draw-on', cat:'type',
  when:'Revealing a name or logo that is a single pen stroke. The line is not faded in: it is drawn, as if a pen were moving. Use it for photographers, designers and personal-brand intros.',
  timing:'Thin entry line 0.8 s · main stroke 2.8 s with a speed ramp (fast on long runs, slow in the loops) · underline 0.8 s · stroke width 1.5 px · everything draws once, then hard reset',
  where:'Whole video (twice: 0 to 5.5 and 5.5 to 11)', colors:['#000000','#EEF0FA','#9CC9FF'], dur:6.4,
  css:SIG_CSS, html:`<div class="stage">${SIG_SCENE}${SIG_SVG}<div class="lb" id="lb"></div></div>`,
  js:`${SIGJS}
const lb=$('lb');
play(6.4,t=>{
  const gone=t>5.9;
  [[KC,2],[KA,0],[KB,1]].forEach(([K,i])=>trim(P[i],i,gone?0:ramp(t,K)));
  trim(GA,0,gone?0:ramp(t,KA));
  lb.textContent='STROKE '+Math.round((gone?0:ramp(t,KA))*100)+'%';
});` },

{ v:11, id:'cometnib', fa:'Comet pen tip with a fading tail', en:'Glowing Comet Pen Tip', cat:'fx',
  when:'Making a drawn line feel alive. A short, bright blue-white segment leads the stroke and cools to white behind it, so the viewer follows the pen rather than the finished shape.',
  timing:'Tail = 12 slices, each 1.2% of the path · opacity (1 − k/12)^1.6 · width 3.6 → 1.1 px · tip color #F4FAFF fading to #5FA7F2 · soft blur 2.2 px under the tail',
  where:'Whole video (the tip is visible at 0 to 0.5, 1.2 to 1.5, 3.4 to 4 and again from 5.5)', colors:['#F4FAFF','#9CC9FF','#5FA7F2','#EEF0FA'], dur:6.4,
  css:SIG_CSS, html:`<div class="stage">${SIG_SCENE}${SIG_SVG}<div class="lb" id="lb">NIB</div></div>`,
  js:`${SIGJS}
${COMETJS}
play(6.4,t=>{
  const gone=t>5.9, vc=gone?0:ramp(t,KC), va=gone?0:ramp(t,KA), vb=gone?0:ramp(t,KB);
  trim(C,2,vc);trim(A,0,va);trim(B,1,vb);trim(GA,0,va);
  comet(va>0&&va<1?0:vb>0&&vb<1?1:2, va>0&&va<1?va:vb>0&&vb<1?vb:vc);   // the tip follows whichever stroke is being drawn
});` },

{ v:11, id:'sigtrack', fa:'Spaced caption fades in under the signature', en:'Tracked Caption Settle', cat:'type',
  when:'The one-word descriptor that makes a signature a logo (PHOTOGRAPHY, STUDIO, FILMS). It arrives only after the stroke is finished, so it never competes with the drawing.',
  timing:'Starts 0.3 s after the last stroke ends · duration 0.7 s · letter-spacing 0.9em → 0.42em · opacity 0 → 0.9 · rises 0.4rem · font 0.78rem / weight 600 / uppercase',
  where:'Whole video (seconds 4 to 4.7 and 9.5 to 10.2)', colors:['#DCE2F2','#EEF0FA','#000000'], dur:6.4,
  css:SIG_CSS, html:`<div class="stage">${SIG_SCENE}${SIG_SVG}<div class="cap" id="cap">Photography</div></div>`,
  js:`${SIGJS}
const cap=$('cap');
play(6.4,t=>{
  const gone=t>5.9;
  trim(C,2,1);trim(A,0,1);trim(B,1,1);trim(GA,0,1);
  const k=gone?0:ease.out(seg(t,.3,1)), out=seg(t,5.6,5.9);
  cap.style.opacity=.9*k*(1-out);cap.style.letterSpacing=lerp(.9,.42,k)+'em';cap.style.transform='translateY('+lerp(.4,0,k)+'rem)';
  P.forEach(p=>p.style.opacity=1-out);GA.style.opacity=.35*(1-out);
});` },

{ v:11, id:'sigreset', fa:'Hard reset loop with a lit-screen backdrop', en:'Hard-cut Loop on a Warm Screen Glow', cat:'layout',
  when:'Looping a logo reveal. There is no fade-out: the finished mark holds for about a second, then vanishes in one frame and the pen tip is already back at the start. The black stage is lit only by a warm amber glow from the side, which sells the "filmed from a screen" look.',
  timing:'Loop 5.5 s · hold 1 s · clear in 1 frame · amber glow rgb(150,98,52) at 62% blurred 2.2rem and skewed −12° · top strip #3A2A1D fading out in 8rem',
  where:'Whole video (the cut happens at seconds 5.5)', colors:['#000000','#3A2A1D','#966234','#1D140E'], dur:6.4,
  css:SIG_CSS+`
.amb{animation:ambd 6.4s ease-in-out infinite alternate}
@keyframes ambd{from{opacity:.75;transform:skewX(-12deg) translateX(0)}to{opacity:1;transform:skewX(-12deg) translateX(-1.2rem)}}`,
  html:`<div class="stage">${SIG_SCENE}${SIG_SVG}<div class="cap" id="cap">Photography</div><div class="lb" id="lb"></div></div>`,
  js:`${SIGJS}
${COMETJS}
const cap=$('cap'),lb=$('lb');
play(6.4,t=>{
  const gone=t>5.9;                      // one frame: everything off, the loop restarts
  const vc=gone?0:ramp(t,KC),va=gone?0:ramp(t,KA),vb=gone?0:ramp(t,KB);
  trim(C,2,vc);trim(A,0,va);trim(B,1,vb);trim(GA,0,va);
  comet(va>0&&va<1?0:vb>0&&vb<1?1:2, va>0&&va<1?va:vb>0&&vb<1?vb:vc);
  const k=gone?0:ease.out(seg(t,4.4,5.1));cap.style.opacity=.9*k;cap.style.letterSpacing=lerp(.9,.42,k)+'em';
  lb.textContent=gone?'CUT':'t = '+t.toFixed(1)+' s';
});` }
);

VIDEOS.push({ id:'v11', n:11, title:'Signature logo: a pen tip that writes it', meta:'11 seconds · 720×1280 · a handwritten photographer\'s signature, filmed off a monitor',
  mood:'Minimal and tactile. Pure black, one thin white line, a single cold-blue spark where the pen is, and a warm amber glow leaking in from the right like light from a real screen. Nothing else is on the frame.',
  rules:[
    'The mark is drawn, never faded in: a dash offset reveals the path while a bright tip leads it.',
    'Speed follows the hand: long straight runs are fast, loops and turns are slow. A linear reveal looks mechanical.',
    'The tip is cold (blue to white) and the line is neutral white, so the eye follows the glow and then rests on the shape.',
    'The descriptor word arrives after the stroke ends, widely spaced, and settles inward while it fades in.',
    'The loop has no outro: hold about one second, cut to black in one frame, and start again.'
  ],
  palette:[
    { g:'Stage', c:[['#000000','Black'],['#1D140E','Dark amber'],['#3A2A1D','Monitor top strip'],['#966234','Amber side glow']] },
    { g:'Pen and line', c:[['#EEF0FA','Signature line'],['#F4FAFF','Pen tip core'],['#9CC9FF','Glow'],['#5FA7F2','Tip tail blue'],['#DCE2F2','Caption']] }
  ] });

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 11: signature logo */
  --sig-black:#000000; --sig-amber:#966234; --sig-line:#EEF0FA; --sig-tip:#F4FAFF; --sig-glow:#9CC9FF; --sig-blue:#5FA7F2;
}`);
