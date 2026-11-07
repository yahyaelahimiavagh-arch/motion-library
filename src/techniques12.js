/* ===== Video 16: black-on-white typographic experiments: serif words with ellipse O, magnifier ring, point-cloud brain, orbit arcs, clock invert cut ===== */
const P16_CSS = `.stage{background:#FAFAFA;font-family:'Instrument Serif',Georgia,'Times New Roman',serif;color:#0A0A0A}
.lb{position:absolute;left:1rem;bottom:1rem;font:600 .8rem/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#555;opacity:.9;z-index:9}
.sv{position:absolute;left:0;top:0;width:27rem;height:48rem;overflow:visible}`;
const P16_JS = `const $=id=>document.getElementById(id);const NS='http://www.w3.org/2000/svg';
const arc=(cx,cy,r,a0,a1)=>{const p=a=>[cx+r*Math.cos(a*Math.PI/180),cy+r*Math.sin(a*Math.PI/180)],s=p(a0),e=p(a1);return 'M'+s[0]+' '+s[1]+' A'+r+' '+r+' 0 '+((a1-a0)%360>180?1:0)+' 1 '+e[0]+' '+e[1]};`;

TECHS.push(
{ v:16, id:'ellipseO', fa:'Bold serif word whose O is a rotating ellipse', en:'Serif Word with Ellipse O', cat:'type',
  when:'Making a single word feel designed. The letters are a heavy serif, but the O is a drawn ellipse ring that tilts and rotates into place, so the word has a moving center. A second word stacks the same trick vertically.',
  timing:'Letters slide 0.5 rem and blur-in over 0.4 s, 0.07 s apart · O ring rotates −70° → 0 over 0.7 s with back-ease · ring stroke 0.9 rem · word 1 holds 1.5 s · hard cut · word 2 (vertical) 1.5 s',
  where:'1 to 4 s', colors:['#FAFAFA','#0A0A0A','#D8D8D8'], dur:5.4,
  css:P16_CSS+`.w{position:absolute;left:0;right:0;display:flex;justify-content:center;align-items:center;font:900 5.4rem/1 'Playfair Display',Didot,'Bodoni MT',Georgia,serif}
.w i{display:inline-block;font-style:normal}.v{flex-direction:column;top:11rem;font-size:4.6rem}
.dt{position:absolute;width:1.4rem;height:1.4rem;border-radius:50%;background:#D8D8D8}`,
  html:`<div class="stage"><div class="w" id="w1" style="top:20rem"><i>H</i><svg width="4.4rem" height="3.4rem" viewBox="-2.2 -1.7 4.4 3.4" style="overflow:visible"><ellipse id="o1" rx="1.7" ry="1.1" fill="none" stroke="#0A0A0A" stroke-width=".72"/></svg><i>P</i><i>E</i></div><i class="dt" id="dt" style="left:17rem;top:25rem"></i><div class="w v" id="w2"><i>Y</i><svg width="4.4rem" height="3.6rem" viewBox="-2.2 -1.8 4.4 3.6" style="overflow:visible"><ellipse id="o2" rx="1.7" ry="1.1" fill="none" stroke="#0A0A0A" stroke-width=".72"/></svg><i>U</i></div><div class="lb" id="lb"></div></div>`,
  js:`${P16_JS}
const A=[...$('w1').querySelectorAll('i')],B=[...$('w2').querySelectorAll('i')];
const pop=(el,t,s)=>{const k=ease.out(seg(t,s,s+.4));el.style.opacity=k;el.style.filter='blur('+(1-k)*.5+'rem)';el.style.transform='translateY('+(1-k)*.8+'rem)'};
play(5.4,t=>{
  const one=t<2.4,two=t>=2.6;
  $('w1').style.display=one?'flex':'none';$('dt').style.display=one?'block':'none';$('w2').style.display=two?'flex':'none';
  A.forEach((a,i)=>pop(a,t,.2+i*.12));
  $('o1').setAttribute('transform','rotate('+lerp(-70,0,ease.back(seg(t,.3,1)))+')');$('o1').setAttribute('opacity',ease.out(seg(t,.3,.6)));
  $('dt').style.transform='translate('+Math.sin(t*2)*.4+'rem,'+Math.cos(t*2)*.4+'rem)';
  B.forEach((a,i)=>pop(a,t,2.7+i*.12));
  $('o2').setAttribute('transform','rotate('+lerp(70,20,ease.back(seg(t,2.8,3.5)))+')');$('o2').setAttribute('opacity',ease.out(seg(t,2.8,3.1)));
  $('lb').textContent=one?'WORD 1':'WORD 2';
});` },

{ v:16, id:'lensring', fa:'Magnifier ring with orbiting arcs and a word resolving inside', en:'Magnifier Ring Reveal', cat:'fx',
  when:'Revealing a word as if it were being looked at. A thin ring with a handle appears, two arc segments and a black dot orbit its edge, then the ring grows toward the viewer while the word inside sharpens out of a ghosted blur.',
  timing:'Ring draws 0.6 s · arcs orbit at 40°/s and −70°/s · dot rides the black arc end · ring scales 1 → 1.5 over 1.4 s from 1.4 s · word blur 0.6 rem → 0 and ghost offset 0.8 rem → 0 · handle grows with the ring and leaves the frame',
  where:'2.5 to 4.5 s', colors:['#FAFAFA','#0A0A0A','#D8D8D8','#BDBDBD'], dur:5.4,
  css:P16_CSS+`.wd{position:absolute;left:0;right:0;top:21.2rem;text-align:center;font:900 2.4rem/1 'Playfair Display',Didot,'Bodoni MT',Georgia,serif}.gh{opacity:.35}`,
  html:`<div class="stage"><svg class="sv" viewBox="0 0 27 48"><g id="lz" transform="translate(13.5 22)"><line id="hd" x1="-5.6" y1="5.6" x2="-9.5" y2="9.5" stroke="#0A0A0A" stroke-width=".9" stroke-linecap="round"/><circle id="rg" r="7" fill="none" stroke="#0A0A0A" stroke-width=".1"/><path id="a1" fill="none" stroke="#0A0A0A" stroke-width=".18"/><path id="a2" fill="none" stroke="#D8D8D8" stroke-width=".8"/><circle id="dt" r=".38" fill="#0A0A0A"/></g></svg><div class="wd gh" id="wg">PEACE</div><div class="wd" id="wd">PEACE</div><div class="lb" id="lb"></div></div>`,
  js:`${P16_JS}
const RL=2*Math.PI*7;$('rg').style.strokeDasharray=RL;
play(5.4,t=>{
  const d=ease.out(seg(t,0,.6)),s=lerp(1,1.5,ease.inOut(seg(t,1.4,2.8))),o=1-seg(t,4.6,5.1);
  $('rg').style.strokeDashoffset=RL*(1-d);
  const a=t*40,b=-t*70+140;
  $('a1').setAttribute('d',arc(0,0,8.1,a,a+160));$('a2').setAttribute('d',arc(0,0,8.1,b,b+70));
  const e=(a+160)*Math.PI/180;$('dt').setAttribute('cx',8.1*Math.cos(e));$('dt').setAttribute('cy',8.1*Math.sin(e));
  $('a1').setAttribute('opacity',d);$('a2').setAttribute('opacity',d);
  const h=ease.out(seg(t,.2,.8));$('hd').setAttribute('x2',lerp(-5.6,-9.5,h)-3*seg(t,1.4,2.8));$('hd').setAttribute('y2',lerp(5.6,9.5,h)+3*seg(t,1.4,2.8));
  $('lz').setAttribute('transform','translate(13.5 22) scale('+s+')');$('lz').setAttribute('opacity',o);
  const k=ease.out(seg(t,1.6,2.8));
  $('wd').style.opacity=k*o;$('wd').style.filter='blur('+(1-k)*.6+'rem)';$('wg').style.opacity=.35*(1-k)*o;$('wg').style.transform='translate('+(1-k)*.8+'rem,'+(1-k)*-.4+'rem)';
  $('lb').textContent=t<1.4?'ORBIT':'LENS IN';
});` },

{ v:16, id:'pointcloud', fa:'Rotating dot-cloud shape with a drifting network', en:'Point-cloud with Network Lines', cat:'fx',
  when:'Giving an abstract idea a physical form. About seven hundred black dots make a lumpy brain-sized solid that turns slowly in front of faint concentric rings, while a loose network of nodes and hairlines drifts behind it.',
  timing:'700 points · yaw 52°/s (0.9 rad/s) · tilt 12° · dot size 1 px, depth-shaded · 16 nodes drifting ±1.2 rem at 0.4 Hz · hairline when node distance < 7 rem · rings pulse 1.5 s · cloud fades in 0.7 s',
  where:'5 to 7 s', colors:['#FAFAFA','#0A0A0A','#E4E4E4','#BDBDBD'], dur:5.4,
  css:P16_CSS+`.cv{position:absolute;left:0;top:10.5rem;width:27rem;height:27rem}`,
  html:`<div class="stage"><canvas class="cv" id="cv"></canvas><div class="lb" id="lb"></div></div>`,
  js:`${P16_JS}
const cv=$('cv'),g=cv.getContext('2d'),S=270;cv.width=S;cv.height=S;
const hs=n=>{const x=Math.sin(n*127.1+9.3)*43758.5453;return x-Math.floor(x)};
const P=[];for(let i=0;i<700;i++){const th=Math.acos(1-2*hs(i)),ph=2*Math.PI*hs(i+1000),r=1+.14*Math.sin(5*th)*Math.sin(4*ph);let x=r*Math.sin(th)*Math.cos(ph),y=.72*r*Math.cos(th),z=.85*r*Math.sin(th)*Math.sin(ph);if(Math.abs(x)<.06&&y>0)y-=.12;P.push([x,y,z])}
const N=[];for(let i=0;i<16;i++)N.push([hs(i+50)*S,hs(i+90)*S,hs(i+7)*6.28]);
play(5.4,t=>{
  g.clearRect(0,0,S,S);const k=ease.out(seg(t,0,.7)),pl=1+.05*Math.sin(t*4.2);
  [[112,'#EDEDED'],[80,'#E4E4E4'],[50,'#DCDCDC']].forEach(([r,c],i)=>{g.fillStyle=c;g.globalAlpha=.7*k;g.beginPath();g.arc(135,135,r*pl*(1+.02*i),0,7);g.fill()});g.globalAlpha=1;
  const pos=N.map(n=>[n[0]+Math.sin(t*2.5+n[2])*12,n[1]+Math.cos(t*2.2+n[2])*12]);
  g.strokeStyle='#C8C8C8';g.lineWidth=.6;pos.forEach((a,i)=>pos.forEach((b,j)=>{if(j>i&&Math.hypot(a[0]-b[0],a[1]-b[1])<70){g.globalAlpha=.8*k;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke()}}));
  g.fillStyle='#777';pos.forEach(a=>{g.beginPath();g.arc(a[0],a[1],2,0,7);g.fill()});g.globalAlpha=1;
  const ya=t*.9,cy=Math.cos(ya),sy=Math.sin(ya),tl=.21,ct=Math.cos(tl),st=Math.sin(tl);
  P.forEach(p=>{let x=p[0]*cy+p[2]*sy,z=-p[0]*sy+p[2]*cy,y=p[1]*ct-z*st;z=p[1]*st+z*ct;
    const d=(z+1.2)/2.4;g.globalAlpha=k*(.35+.65*d);g.fillStyle='#0A0A0A';g.beginPath();g.arc(135+x*70,135+y*70,.7+.5*d,0,7);g.fill()});
  g.globalAlpha=1;$('lb').textContent='YAW '+Math.round((ya*57.3)%360)+'°';
});` },

{ v:16, id:'orbitarcs', fa:'Orbit arcs with chromatic fringe and axis labels', en:'Orbit Arcs with Axis Labels', cat:'layout',
  when:'Showing a concept as a diagram rather than a picture. A ring made of one heavy black arc with a dot, two gray arcs and a hairline piece turns slowly; two words sit on perpendicular axes at the center, each with an arrowhead, and a cyan/magenta fringe kicks in on the beat.',
  timing:'Ring spin 0 → 140° with ease-out over 3 s · arcs thickness 0.55 / 0.8 rem · labels type in at 0.9 s · arrows draw 0.4 s · chroma offset ±0.18 rem on beats at 3 s and 4.2 s (0.15 s) · drift 0.5 rem',
  where:'7.5 to 8.5 s', colors:['#FAFAFA','#0A0A0A','#BDBDBD','#00C8D8','#D8206A'], dur:5.4,
  css:P16_CSS+`.tx{position:absolute;font:900 1.1rem/1 'Playfair Display',Didot,Georgia,serif;letter-spacing:.02em}`,
  html:`<div class="stage"><svg class="sv" viewBox="0 0 27 48"><g id="rr"><g id="rc" opacity="0" style="mix-blend-mode:multiply"></g><g id="rm" opacity="0" style="mix-blend-mode:multiply"></g><g id="rk"></g></g><g id="ax" stroke="#0A0A0A" stroke-width=".1" fill="#0A0A0A"><line id="la" x1="13.5" y1="24" x2="13.5" y2="19.4" stroke-dasharray="4.6" /><path id="ah" d="M13.5 18.6 12.9 19.8 14.1 19.8Z"/><line id="lb2" x1="13.5" y1="24" x2="18" y2="24"/><path id="ah2" d="M18.8 24 17.6 23.4 17.6 24.6Z"/></g><text id="tL" x="0" y="0" font-size="1.1" font-weight="900" font-family="Georgia,serif" transform="translate(12.6 23.6) rotate(-90)">LIFE</text><text id="tT" x="0" y="0" font-size="1.1" font-weight="900" font-family="Georgia,serif" transform="translate(13.9 25.3)">TIME</text></svg><div class="lb" id="lb"></div></div>`,
  js:`${P16_JS}
const R=9.4,DEF=[[-90,12,'#0A0A0A',.55],[24,62,'#BDBDBD',.8],[200,255,'#BDBDBD',.8],[130,185,'#0A0A0A',.14]];
const mk=(g,col,xo)=>DEF.map(d=>{const p=document.createElementNS(NS,'path');p.setAttribute('fill','none');p.setAttribute('stroke',col||d[2]);p.setAttribute('stroke-width',d[3]);p.setAttribute('stroke-linecap','round');g.appendChild(p);return p});
const Pk=mk($('rk')),Pc=mk($('rc'),'#00C8D8'),Pm=mk($('rm'),'#D8206A');
const dot=document.createElementNS(NS,'circle');dot.setAttribute('r',.55);dot.setAttribute('fill','#0A0A0A');$('rk').appendChild(dot);
play(5.4,t=>{
  const rot=ease.out(seg(t,0,3))*140,dx=Math.sin(t)*.5;
  const upd=(P,ox)=>P.forEach((p,i)=>{p.setAttribute('d',arc(13.5+ox+dx,24,R,DEF[i][0]+rot*(i%2?-.6:1),DEF[i][1]+rot*(i%2?-.6:1)))});
  upd(Pk,0);upd(Pc,.18);upd(Pm,-.18);
  const e=(DEF[0][1]+rot)*Math.PI/180;dot.setAttribute('cx',13.5+dx+R*Math.cos(e));dot.setAttribute('cy',24+R*Math.sin(e));
  const beat=Math.max(Math.sin(Math.PI*seg(t,3,3.15)),Math.sin(Math.PI*seg(t,4.2,4.35)));$('rc').setAttribute('opacity',beat);$('rm').setAttribute('opacity',beat);
  const a=ease.out(seg(t,.6,1));$('la').setAttribute('stroke-dashoffset',4.6*(1-a));$('ah').setAttribute('opacity',a);$('lb2').setAttribute('opacity',a);$('ah2').setAttribute('opacity',a);
  const x=ease.out(seg(t,.9,1.4));$('tL').setAttribute('opacity',x);$('tT').setAttribute('opacity',ease.out(seg(t,1.1,1.6)));
  const o=1-seg(t,4.8,5.2);$('rr').setAttribute('opacity',o);
  $('lb').textContent=beat>.2?'BEAT':'SPIN '+Math.round(rot)+'°';
});` },

{ v:16, id:'clockinvert', fa:'Clock hand sweep and black/white inversion cut', en:'Clock Sweep with Invert Cut', cat:'fx',
  when:'A hard punctuation mark between two ideas. On black, a hairline circle opens from one dot, a thin hand sweeps and leaves a fading trail; at the beat the whole frame inverts to white in a single frame and the same drawing continues in black ink.',
  timing:'Dot ring 0.3 s · circles open 0.6 s (ease-out) · hand 1 turn per 2.2 s · trail 40° · invert at 2.4 s (1 frame, no fade) · label "LIFE TIME" rotates with the hand · exit 5 s',
  where:'4.5 to 6 s (black ring) then the white version', colors:['#000000','#FFFFFF','#555555','#BDBDBD'], dur:5.4,
  css:P16_CSS+`.stage{background:#000;color:#fff}`,
  html:`<div class="stage" id="st"><svg class="sv" viewBox="0 0 27 48"><g fill="none" stroke="#fff"><circle id="c1" cx="13.5" cy="24" r="4.5" stroke-width=".05" opacity=".45"/><circle id="c2" cx="13.5" cy="24" r="8" stroke-width=".05" opacity=".45"/><circle id="c3" cx="13.5" cy="24" r="12" stroke-width=".08"/><circle id="ct" cx="13.5" cy="24" r=".5" stroke-width=".12"/><path id="tr" stroke-width="2" opacity=".5" stroke-linecap="butt"/><line id="hn" x1="13.5" y1="24" x2="13.5" y2="12" stroke-width=".1"/></g><text id="tx" font-size=".75" fill="#fff" font-family="Georgia,serif" font-weight="900" text-anchor="middle">LIFE TIME</text></svg><div class="lb" id="lb" style="color:#888"></div></div>`,
  js:`${P16_JS}
play(5.4,t=>{
  const o=ease.out(seg(t,.3,.9));$('c1').setAttribute('r',4.5*o);$('c2').setAttribute('r',8*o);$('c3').setAttribute('r',12*o);$('ct').setAttribute('r',.5+.5*(1-o));
  const ang=(t*360/2.2)-90,r=12*o,rad=a=>a*Math.PI/180;
  $('hn').setAttribute('x2',13.5+r*Math.cos(rad(ang)));$('hn').setAttribute('y2',24+r*Math.sin(rad(ang)));
  $('tr').setAttribute('d',arc(13.5,24,r*.5,ang-40,ang));$('tr').setAttribute('stroke-width',r);$('tr').setAttribute('opacity',.35*o);
  const tx=$('tx');tx.setAttribute('transform','translate('+(13.5+r*.62*Math.cos(rad(ang)))+' '+(24+r*.62*Math.sin(rad(ang)))+') rotate('+(ang+90)+')');tx.setAttribute('opacity',seg(t,.9,1.2));
  const inv=t>2.4&&t<4.9;$('st').style.filter='invert('+(inv?1:0)+')';$('st').style.opacity=1-seg(t,5,5.3);
  $('lb').textContent=inv?'INVERTED':'BLACK';
});` }
,
{ v:16, id:'glyphmorph', fa:'A lowercase i turns into a candle, then a hard cut to the word', en:'Glyph Morph: i to Candle', cat:'type',
  when:'Letting one letter carry a metaphor before the word arrives. A heavy serif i pops in, its dot stretches into a flame, its stem widens into a candle body with a base, and a hard cut lands on the word the candle was standing for.',
  timing:'i pops with back-ease over 0.5 s · dot becomes a flame 1 → 1.7 s (width 3.4 → 2.4 rem, height 3.4 → 5.4 rem, egg-shaped) · stem 3.2 → 5.4 rem wide, serifs shrink to a base · flame sways ±0.15 rem at 0.8 Hz · hard cut at 2.2 s · word letters rise 0.12 s apart · O ring rotates −70° → 0 over 0.6 s',
  where:'0 to 1 s', colors:['#FAFAFA','#0A0A0A'], dur:3.4,
  css:P16_CSS+`.fl{position:absolute;background:#0A0A0A;transform-origin:50% 90%}.wk{position:absolute;left:13.42rem;width:.16rem;background:#0A0A0A}
.w{position:absolute;left:0;right:0;top:20rem;display:flex;justify-content:center;align-items:center;font:900 5.4rem/1 'Playfair Display',Didot,'Bodoni MT',Georgia,serif}.w i{display:inline-block;font-style:normal}`,
  html:`<div class="stage"><div id="gl"><svg class="sv" viewBox="0 0 27 48"><path id="bd" fill="#0A0A0A"/></svg><div class="wk" id="wk"></div><div class="fl" id="fl"></div></div><div class="w" id="w1"><i>H</i><svg width="4.4rem" height="3.4rem" viewBox="-2.2 -1.7 4.4 3.4" style="overflow:visible"><ellipse id="o1" rx="1.7" ry="1.1" fill="none" stroke="#0A0A0A" stroke-width=".72"/></svg><i>P</i><i>E</i></div><div class="lb" id="lb"></div></div>`,
  js:`${P16_JS}
const L=[...$('w1').querySelectorAll('i')];
play(3.4,t=>{
  const one=t<2.2;$('gl').style.display=one?'block':'none';$('w1').style.display=one?'none':'flex';
  const pop=ease.back(seg(t,0,.5)),k=ease.inOut(seg(t,1,1.7)),cx=13.5;
  $('gl').style.transform='scale('+(.4+.6*pop)+')';$('gl').style.transformOrigin='13.5rem 24rem';$('gl').style.opacity=Math.min(1,pop*2);
  const hw=lerp(1.6,2.7,k),yt=lerp(19.5,20.8,k),yb=32,sl=lerp(1.5,0,k),sb=lerp(3.6,.7,k);
  const P=[[-hw-sl,yt],[hw,yt],[hw,yb-1.1],[hw+sb,yb-1.1],[hw+sb,yb],[-hw-sb,yb],[-hw-sb,yb-1.1],[-hw,yb-1.1],[-hw,yt+1.1],[-hw-sl,yt+1.1]];
  $('bd').setAttribute('d','M'+P.map(p=>(cx+p[0]).toFixed(2)+' '+p[1].toFixed(2)).join('L')+'Z');
  const fw=lerp(3.4,2.4,k),fh=lerp(3.4,5.4,k),cy=lerp(15,yt-1.6-fh/2,k),r1=lerp(50,70,k),r2=lerp(50,30,k),sw=Math.sin(t*5)*.15*k;
  const f=$('fl');f.style.width=fw+'rem';f.style.height=fh+'rem';f.style.left=(cx-fw/2+sw)+'rem';f.style.top=(cy-fh/2)+'rem';
  f.style.borderRadius='50% 50% 50% 50% / '+r1+'% '+r1+'% '+r2+'% '+r2+'%';f.style.transform='scaleY('+(1+.05*k*Math.sin(t*9))+') rotate('+sw*4+'deg)';
  const w=$('wk');w.style.height=(1.1*k)+'rem';w.style.top=(yt-1.2)+'rem';w.style.opacity=k;
  L.forEach((a,i)=>{const q=ease.out(seg(t,2.3+i*.12,2.7+i*.12));a.style.opacity=q;a.style.transform='translateY('+(1-q)*.8+'rem)'});
  $('o1').setAttribute('transform','rotate('+lerp(-70,0,ease.back(seg(t,2.3,2.9)))+')');$('o1').setAttribute('opacity',ease.out(seg(t,2.3,2.6)));
  $('lb').textContent=one?(k>.5?'CANDLE':'GLYPH'):'WORD';
});` },

{ v:16, id:'ringtext', fa:'Letters orbit a thin ring, then snap into a straight word', en:'Letters on a Ring Snap into a Word', cat:'type',
  when:'Showing a word being assembled out of motion. Five serif letters ride a thin ring, each turned to follow the curve, then they leave the circle together and straighten into a centered word while the ring grows past them and a ghost exclamation mark tilts in behind.',
  timing:'Ring draws 0.6 s · letters orbit at 55°/s, 28° apart · convert 1.5 → 2.5 s with ease-in-out (position and rotation interpolate, size 1.6 → 2.6 rem) · ring scales 1 → 1.35 over 1.4 s from 1.6 s · word tilts −12° at 3 s · ghost "!" fades to 35 % at 2.7 s',
  where:'2 to 3.5 s', colors:['#FAFAFA','#0A0A0A','#BDBDBD'], dur:3.8,
  css:P16_CSS+`.t{position:absolute;left:0;top:0;font-weight:900;font-family:'Playfair Display',Didot,'Bodoni MT',Georgia,serif;color:#0A0A0A;transform-origin:50% 50%;white-space:nowrap}
.gx{position:absolute;left:0;top:0}`,
  html:`<div class="stage"><svg class="sv" viewBox="0 0 27 48"><g id="gh" opacity="0"><rect x="-.9" y="-5" width="1.8" height="6" fill="#BDBDBD" transform="translate(19.5 25) rotate(16)"/><circle cx="21.6" cy="31" r=".95" fill="#BDBDBD"/></g><g id="rz" transform="translate(13.5 22)"><circle id="rg" r="8.6" fill="none" stroke="#0A0A0A" stroke-width=".12"/><line id="hd" x1="-6.1" y1="6.1" x2="-9.6" y2="9.6" stroke="#0A0A0A" stroke-width=".9" stroke-linecap="round"/><path id="a1" fill="none" stroke="#BDBDBD" stroke-width=".4"/></g></svg><div id="lt"></div><div class="lb" id="lb"></div></div>`,
  js:`${P16_JS}
const WORD='PEACE',RL=2*Math.PI*8.6;$('rg').style.strokeDasharray=RL;
const els=[...WORD].map(c=>{const d=document.createElement('div');d.className='t';d.textContent=c;$('lt').appendChild(d);return d});
play(3.8,t=>{
  const d=ease.out(seg(t,0,.6)),k=ease.inOut(seg(t,1.5,2.5)),s=lerp(1,1.35,ease.inOut(seg(t,1.6,3))),tilt=lerp(0,-12,ease.inOut(seg(t,3,3.5)));
  $('rg').style.strokeDashoffset=RL*(1-d);$('rg').setAttribute('opacity',1-seg(t,2.6,3));
  const h=ease.out(seg(t,.2,.8));$('hd').setAttribute('x2',lerp(-6.1,-9.6,h));$('hd').setAttribute('y2',lerp(6.1,9.6,h));
  const a=t*40+200;$('a1').setAttribute('d',arc(0,0,9.6,a,a+90));$('a1').setAttribute('opacity',d*(1-seg(t,2.6,3)));
  $('rz').setAttribute('transform','translate(13.5 22) scale('+s+')');$('rz').setAttribute('opacity',1-seg(t,3.1,3.6));
  const rpx=document.documentElement.clientWidth/27;
  els.forEach((e,i)=>{
    const ang=-150+i*28+t*55,rad=ang*Math.PI/180,rp=[13.5+8.6*s*Math.cos(rad),22+8.6*s*Math.sin(rad)],rr=ang+90;
    const row=[13.5+(i-2)*2.6,22.5],rs=((rr+180)%360+360)%360-180;
    let x=lerp(rp[0],row[0],k),y=lerp(rp[1],row[1],k);const rot=lerp(rs,0,k)+tilt*seg(k,.9,1),fs=lerp(1.6,2.6,k),tt=tilt*seg(k,.9,1)*Math.PI/180,dx=x-13.5,dy=y-22.5;x=13.5+dx*Math.cos(tt)-dy*Math.sin(tt);y=22.5+dx*Math.sin(tt)+dy*Math.cos(tt);
    e.style.fontSize=fs+'rem';e.style.opacity=ease.out(seg(t,.3+i*.08,.6+i*.08));
    e.style.transform='translate('+(x-.7*fs/1.6*0)+'rem,'+(y)+'rem) translate(-50%,-50%) rotate('+rot+'deg)';
  });
  $('gh').setAttribute('opacity',.35*ease.out(seg(t,2.7,3.1)));
  $('lb').textContent=k<.05?'ORBIT':k<.98?'SNAP':'WORD';
});` }
);

VIDEOS.push({ id:'v16', n:16, title:'Typographic experiments in black on white', meta:'8.5 seconds · 720×720 · a square piece with a soft pad and hit sounds: heavy serif words, a magnifier, a point-cloud and orbit diagrams',
  mood:'Editorial and austere. Pure black on near-white (and one inverted black section), a very heavy didone serif, hairline circles and arcs, and just one off-palette moment: a cyan and magenta fringe on a beat. Every scene is one idea with one drawn device.',
  rules:[
    'One idea per scene, about one second each, joined by hard cuts, never fades.',
    'Type is a heavy high-contrast serif; one letter (the O) is replaced by a drawn ellipse that moves, so the word has a moving center.',
    'Diagrams are made from arcs: one heavy black arc with a dot, gray arcs behind it, hairline pieces, all rotating at different speeds.',
    'Abstract nouns get a physical shape: a dot-cloud solid turning in front of faint circles.',
    'Labels sit on perpendicular axes with small arrowheads, like a chart.',
    'A beat is marked by a one-frame color fringe (cyan and magenta offset by 0.2 rem) or a full invert, then back to black ink.'
  ],
  palette:[
    { g:'Ink and paper', c:[['#FAFAFA','Paper'],['#0A0A0A','Ink'],['#000000','Black frame']] },
    { g:'Grays', c:[['#EDEDED','Circle light'],['#D8D8D8','Dot gray'],['#BDBDBD','Arc gray'],['#555555','Label gray']] },
    { g:'Fringe', c:[['#00C8D8','Cyan offset'],['#D8206A','Magenta offset']] }
  ] });

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 16: typographic experiments */
  --tx-paper:#FAFAFA; --tx-ink:#0A0A0A; --tx-gray:#BDBDBD; --tx-ring:#EDEDED; --tx-cyan:#00C8D8; --tx-magenta:#D8206A;
}`);
