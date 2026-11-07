/* ===== Video 17: dark space reel — four-point star, glass discs, chrome spheres with flames, glowing words through a ripple portal, lightning, crescent ===== */
const P17_CSS = `.stage{background:#03060C}
.cv{position:absolute;left:0;top:0;width:27rem;height:48rem}
.lb{position:absolute;left:1rem;bottom:1rem;font:600 .8rem/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#8fa6c4;opacity:.9;z-index:9}`;
const P17_JS = `const $=id=>document.getElementById(id);
const cv=$('cv'),g=cv.getContext('2d'),W=270,H=480;cv.width=W;cv.height=H;
const hs=n=>{const x=Math.sin(n*127.1+9.3)*43758.5453;return x-Math.floor(x)};
const ST=[];for(let i=0;i<80;i++)ST.push([hs(i)*W,hs(i+300)*H,.35+hs(i+600)*.8,hs(i+900)*6.28]);
const sky=(t,a=1)=>{const b=g.createLinearGradient(0,0,0,H);b.addColorStop(0,'#02050A');b.addColorStop(.6,'#07111F');b.addColorStop(1,'#0B1A2E');g.globalAlpha=1;g.fillStyle=b;g.fillRect(0,0,W,H);
  ST.forEach(s=>{g.globalAlpha=a*(.25+.35*Math.sin(t*1.8+s[3]));g.fillStyle='#CFE4FF';g.fillRect(s[0],s[1],s[2],s[2])});g.globalAlpha=1};
const glow=(x,y,r,c0,c1,a=1)=>{const q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,c0);q.addColorStop(1,c1);g.globalAlpha=a;g.fillStyle=q;g.fillRect(x-r,y-r,r*2,r*2);g.globalAlpha=1};
const rim=(x,y,r,a0,a1,w,al=1)=>{g.save();g.globalAlpha=al;g.lineCap='round';g.strokeStyle='#EAF4FF';g.shadowColor='rgba(170,210,255,.9)';g.shadowBlur=6;g.lineWidth=w;g.beginPath();g.arc(x,y,r,a0,a1);g.stroke();g.restore()};
const ball=(x,y,r,al=1)=>{g.save();g.globalAlpha=al;const q=g.createRadialGradient(x-r*.35,y-r*.4,r*.1,x,y,r);q.addColorStop(0,'#27405f');q.addColorStop(.55,'#0d1a2d');q.addColorStop(1,'#03070d');g.fillStyle=q;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.restore();rim(x,y,r*.96,-2.6,-.7,Math.max(1,r*.09),al);rim(x,y,r*.97,.4,1.5,Math.max(.6,r*.04),al*.5)};
const star=(x,y,r,col,a)=>{const rx=r*.82,ry=r*1.12,T=[[0,-ry],[rx,0],[0,ry],[-rx,0]];g.save();g.translate(x,y);g.globalAlpha=a;g.shadowColor=col;g.shadowBlur=r*.9;g.fillStyle=col;g.beginPath();g.moveTo(T[0][0],T[0][1]);for(let i=1;i<=4;i++)g.quadraticCurveTo(0,0,T[i%4][0],T[i%4][1]);g.fill();g.restore()};`;

TECHS.push(
{ v:17, id:'starflare', fa:'Four-point star over thin light slices and a glossy curve', en:'Star Flare with Light Slices', cat:'fx',
  when:'Opening a dark piece with one small bright point. A coral four-point star sits above thin horizontal light slices, a glossy curve of light draws itself across a dark swell below, and a second star and a soft flash hand the scene to the next shape.',
  timing:'Star scales 0.4 → 1 with back-ease over 0.5 s, then pulses ±6 % at 1 Hz · three slices slide in 0.1 s apart and breathe ±20 % · curve draws over 0.9 s starting at 0.6 s with a tapered line · second star 1.3 s · white flash 2.3 s (0.4 s) · fade 2.9 s',
  where:'0 to 2.8 s', colors:['#02050A','#0B1A2E','#FF7B4A','#EAF4FF','#9CC8FF'], dur:3.2,
  css:P17_CSS,
  html:`<div class="stage"><canvas class="cv" id="cv"></canvas><div class="lb" id="lb"></div></div>`,
  js:`${P17_JS}
play(3.2,t=>{
  sky(t);
  const out=1-seg(t,2.85,3.2),pop=ease.back(seg(t,0,.5)),p=1+.06*Math.sin(t*6.28);
  g.save();g.globalAlpha=out;
  /* dark swell with a lit edge */
  const sw=g.createLinearGradient(0,250,0,480);sw.addColorStop(0,'#0c1626');sw.addColorStop(1,'#050a13');g.fillStyle=sw;g.beginPath();g.moveTo(0,300);g.quadraticCurveTo(135,225,270,300);g.lineTo(270,480);g.lineTo(0,480);g.fill();
  const le=g.createLinearGradient(0,0,270,0);le.addColorStop(0,'rgba(160,200,255,0)');le.addColorStop(.5,'rgba(190,220,255,.55)');le.addColorStop(1,'rgba(160,200,255,0)');g.strokeStyle=le;g.lineWidth=1;g.beginPath();g.moveTo(0,300);g.quadraticCurveTo(135,225,270,300);g.stroke();
  /* beam under the star */
  glow(135,150,60,'rgba(255,140,90,.28)','rgba(255,140,90,0)',pop);
  /* slices */
  [[26,150,0],[60,200,.1],[94,130,.2]].forEach(([y,w,d],i)=>{const k=ease.out(seg(t,d,d+.5)),ww=w*k*(1+.2*Math.sin(t*3+i*2));g.save();g.shadowColor='#9CC8FF';g.shadowBlur=8;g.fillStyle='rgba(215,238,255,.9)';g.globalAlpha=out*k;g.fillRect(135-ww/2,y,ww,1.4);g.restore()});
  /* star */
  glow(135,112,46*pop,'rgba(255,123,74,.55)','rgba(255,123,74,0)',1);
  star(135,112,24*pop*p,'#FF7B4A',Math.min(1,pop*2));
  star(135,112,8*pop*p,'#FFE2CC',Math.min(1,pop*2));
  /* tapered curve of light */
  const u=ease.out(seg(t,.6,1.5));
  g.save();g.lineCap='round';g.shadowColor='#9CC8FF';g.shadowBlur=7;
  for(let i=0;i<48;i++){const a=i/48,b=(i+1)/48;if(b>u)break;const f=s=>[lerp(150,262,s)+Math.sin(s*3)*-8,lerp(318,452,s*s)];const A=f(a),B=f(b);g.strokeStyle='rgba(234,244,255,'+(.2+.8*Math.sin(Math.PI*a))+')';g.lineWidth=.6+3.4*Math.sin(Math.PI*a);g.beginPath();g.moveTo(A[0],A[1]);g.lineTo(B[0],B[1]);g.stroke()}
  g.restore();
  /* second star */
  const s2=ease.back(seg(t,1.3,1.8));if(s2>0){glow(135,190,40*s2,'rgba(255,200,150,.5)','rgba(255,200,150,0)');star(135,190,12*s2,'#FFB27F',1)}
  g.restore();
  /* flash */
  const fl=Math.sin(Math.PI*seg(t,2.3,2.7));if(fl>0){g.globalAlpha=fl*.85;g.fillStyle='#EAF4FF';g.fillRect(0,0,W,H);g.globalAlpha=1}
  $('lb').textContent=t<1.3?'STAR':t<2.3?'CURVE':'FLASH';
});` },

{ v:17, id:'glassdiscs', fa:'Stack of glossy glass discs spinning around a glowing core', en:'Glass Discs around a Core', cat:'fx',
  when:'A hero object that is only light and glass. Four thin discs tumble around a coral core, each flipping at its own speed so the pile never repeats, then they collapse and the scene turns to falling light streaks over a red glow.',
  timing:'Discs scale 0.2 → 1 with back-ease over 0.7 s · each flips at 1.9 rad/s with 0.9 rad offset · tilt ±0.35 rad · core pulses ±15 % at 1.1 Hz · collapse 2.9 s · rain of 60 streaks at 300 px/s · red ground glow fades in 0.5 s',
  where:'1.3 to 3.3 s', colors:['#02050A','#F3F8FF','#7D96B8','#1B2A45','#FF7B4A','#FF4A2A'], dur:4,
  css:P17_CSS,
  html:`<div class="stage"><canvas class="cv" id="cv"></canvas><div class="lb" id="lb"></div></div>`,
  js:`${P17_JS}
play(4,t=>{
  sky(t);
  const k=ease.back(seg(t,.1,.8)),c=1-ease.inOut(seg(t,2.8,3.4)),s=k*c;
  if(s>.01){
    glow(135,240,120*s,'rgba(255,90,50,.5)','rgba(255,90,50,0)');
    const ds=[0,1,2,3].map(i=>{const a=t*1.9+i*.9;return{i,a,d:Math.cos(a)}}).sort((x,y)=>x.d-y.d);
    ds.forEach(o=>{const i=o.i,cy=240+(i-1.5)*50*s,ry=Math.max(3,60*Math.abs(Math.sin(o.a))*s),rx=66*s,tilt=(i%2?-1:1)*.35;
      g.save();g.translate(135,cy);g.rotate(tilt);
      const q=g.createLinearGradient(-rx,-ry,rx,ry);q.addColorStop(0,'#F3F8FF');q.addColorStop(.45,'#7D96B8');q.addColorStop(1,'#1B2A45');
      g.fillStyle=q;g.beginPath();g.ellipse(0,0,rx,ry,0,0,7);g.fill();
      const w=g.createRadialGradient(0,0,0,0,0,rx*.8);w.addColorStop(0,'rgba(255,110,60,'+(.45*(1-Math.abs(Math.sin(o.a)))+.1)+')');w.addColorStop(1,'rgba(255,110,60,0)');g.fillStyle=w;g.fill();
      g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=1.2;g.stroke();g.restore()});
    const cp=1+.15*Math.sin(t*6.9);glow(135,240,34*cp*s,'rgba(255,240,220,.95)','rgba(255,120,60,0)');
  }
  const r=seg(t,2.9,3.4);
  if(r>0){
    g.save();g.globalAlpha=r*.7;g.strokeStyle='#CFE4FF';g.lineWidth=.7;
    for(let i=0;i<60;i++){const x=hs(i+5)*W,y=(hs(i+80)*H+t*300*(.6+hs(i)*.8))%H;g.beginPath();g.moveTo(x,y);g.lineTo(x,y+10+hs(i+9)*18);g.stroke()}
    g.restore();
    glow(135,500,300,'rgba(255,70,40,.65)','rgba(255,70,40,0)',r);
    const ob=ease.out(seg(t,3.2,3.7));ball(150,400-30*ob,10*ob,r);
  }
  $('lb').textContent=t<2.9?'DISCS':'RAIN';
});` },

{ v:17, id:'chromespheres', fa:'Dark glass spheres with rim light, then a chain of spheres before red flames', en:'Glass Spheres and Flames', cat:'fx',
  when:'A calm, expensive-looking object scene. Three dark glass spheres of different sizes drift over a red ground glow, each lit only by a thin crescent of rim light. The camera then slides along a chain of six spheres that shrinks into the distance while coral flame shapes lick up from the horizon behind them.',
  timing:'Spheres drift ±0.8 rem at 0.35 Hz with different phases · rim crescent 0.09 × radius · scene change cross-fades 2.2 → 2.8 s · chain moves 4 rem left with ease-in-out over 2.6 s · flames 5 spikes, height 4 to 7 rem, wobble ±12 % at 0.8 Hz · ground glow #FF4A2A at 55 %',
  where:'2.5 to 6 s', colors:['#03070D','#0D1A2D','#27405F','#EAF4FF','#FF4A2A','#FF7B4A'], dur:5.2,
  css:P17_CSS,
  html:`<div class="stage"><canvas class="cv" id="cv"></canvas><div class="lb" id="lb"></div></div>`,
  js:`${P17_JS}
play(5.2,t=>{
  sky(t);
  const a1=1-seg(t,2.2,2.8),a2=seg(t,2.2,2.8);
  glow(135,520,320,'rgba(255,70,40,.6)','rgba(255,70,40,0)',.8);
  if(a1>0){
    ball(88+Math.sin(t*2.2)*8,340+Math.cos(t*2.2)*6,26,a1);
    ball(176+Math.sin(t*2.2+2)*6,250+Math.cos(t*2.2+1)*5,10,a1);
    ball(192+Math.sin(t*2.2+4)*8,400+Math.cos(t*2.2+3)*7,23,a1);
    g.save();g.globalAlpha=a1*.5;g.strokeStyle='#BFD6EE';g.lineWidth=.8;g.beginPath();g.moveTo(0,420);g.quadraticCurveTo(110,380,270,430);g.stroke();g.restore();
  }
  if(a2>0){
    const m=ease.inOut(seg(t,2.4,5)),ox=-40*m;
    g.save();g.globalAlpha=a2;
    for(let i=0;i<5;i++){const x=40+i*52+ox*.4,h=(40+30*hs(i+4))*(1+.12*Math.sin(t*5+i*2));const fg=g.createLinearGradient(0,330-h,0,330);fg.addColorStop(0,'#FF7B4A');fg.addColorStop(1,'#B02010');g.fillStyle=fg;g.beginPath();g.moveTo(x-12,330);g.quadraticCurveTo(x-4,330-h*.5,x,330-h);g.quadraticCurveTo(x+6,330-h*.45,x+14,330);g.fill()}
    const pl=g.createLinearGradient(0,330,0,480);pl.addColorStop(0,'#101c30');pl.addColorStop(1,'#03070D');g.fillStyle=pl;g.beginPath();g.moveTo(0,360);g.quadraticCurveTo(135,300,270,350);g.lineTo(270,480);g.lineTo(0,480);g.fill();
    g.restore();
    for(let i=5;i>=0;i--){const s=Math.pow(.8,i),x=214-i*36*(1+.1*i)+ox,y=410-i*20*(1+.05*i);ball(x,y,34*s,a2)}
    g.save();g.globalAlpha=a2*.6;g.strokeStyle='#EAF4FF';g.lineWidth=1;g.beginPath();g.moveTo(-10,372);g.quadraticCurveTo(135,310,280,356);g.stroke();g.restore();
  }
  $('lb').textContent=a2<.5?'DRIFT':'CHAIN';
});` },

{ v:17, id:'portaltext', fa:'Glowing words that pop out of a ripple portal, blue and coral', en:'Glow Words in a Ripple Portal', cat:'type',
  when:'A line of copy told one word at a time. Each word pops in from a blur with a soft glow, blue-white for normal words and coral for the two that carry the meaning. Behind them a dark disc with a black hole sits in rings that ripple outward, so the type feels like it is being spoken from inside a space.',
  timing:'Word 0.35 s in · scale 1.4 → 1 with ease-out · blur 0.7 → 0 rem · words at 0.2 / 0.7 / 1.1 / 1.7 / 2.4 s then 4.2 / 5.0 / 5.5 / 6.0 / 6.4 s · rings expand 0.35 per second, 8 rings, fade as they grow · disc rises 3 → 4.2 s and the hole opens to 1.5 rem · last word glitches with a cyan and magenta fringe 7.7 s',
  where:'5 to 11.5 s', colors:['#02050A','#EAF4FF','#9CC8FF','#FF6A45','#2B4468','#00C8FF','#FF2E9A'], dur:8.6,
  css:P17_CSS+`.wd{position:absolute;left:0;right:0;top:36rem;text-align:center;font:800 4.6rem/1 'Inter Tight',system-ui,sans-serif;letter-spacing:-.02em;will-change:transform,filter}
.wd.b{color:#EAF4FF;text-shadow:0 0 .5rem rgba(160,205,255,.9),0 0 1.8rem rgba(70,130,255,.55)}
.wd.r{color:#FF6A45;text-shadow:0 0 .5rem rgba(255,90,50,.9),0 0 1.8rem rgba(255,50,20,.55)}`,
  html:`<div class="stage"><canvas class="cv" id="cv"></canvas><div class="wd" id="wd"></div><div class="lb" id="lb"></div></div>`,
  js:`${P17_JS}
const WD=[['Feel',.2,'b'],['a',.7,'b'],['Brand',1.1,'b'],['New',1.7,'b'],['Person',2.4,'b'],['SO',4.2,'r'],['How',5,'b'],['Will',5.5,'b'],['I',6,'b'],['Know',6.4,'r']],END=8;
const wd=$('wd');
play(8.6,t=>{
  sky(t);
  const rise=ease.inOut(seg(t,3,4.2)),op=seg(t,2.2,2.8)*(1-seg(t,8.1,8.5)),cy=lerp(300,150,rise),R=lerp(40,72,rise),hole=ease.out(seg(t,3.4,4.2))*15;
  g.save();g.globalAlpha=op;
  for(let k=0;k<8;k++){const u=(t*.35+k/8)%1,rx=30+u*170;g.strokeStyle='rgba(190,222,255,'+(.5*(1-u))+')';g.lineWidth=1;g.beginPath();g.ellipse(135,cy+30+u*60,rx,rx*.22,0,Math.PI,2*Math.PI);g.stroke();
    g.strokeStyle='rgba(255,150,100,'+(.22*(1-u))+')';g.beginPath();g.ellipse(135,cy+31.5+u*60,rx,rx*.22,0,Math.PI,2*Math.PI);g.stroke()}
  const q=g.createRadialGradient(135-R*.3,cy-R*.4,R*.1,135,cy,R);q.addColorStop(0,'#2B4468');q.addColorStop(.7,'#0A1424');q.addColorStop(1,'#03070D');g.fillStyle=q;g.beginPath();g.arc(135,cy,R,0,7);g.fill();
  g.restore();
  if(op>0){rim(135,cy,R,-2.9,-.3,Math.max(1.2,R*.05),op);
    const bd=g.createLinearGradient(135-R,0,135+R,0);bd.addColorStop(0,'rgba(255,120,70,0)');bd.addColorStop(.5,'rgba(255,225,200,.8)');bd.addColorStop(1,'rgba(255,120,70,0)');g.save();g.globalAlpha=op*rise;g.fillStyle=bd;[18,30].forEach((o,i)=>g.fillRect(135-R*.9,cy+o,R*1.8,1.6-i*.5));g.restore();
    g.fillStyle='#000';g.beginPath();g.arc(135,cy,hole,0,7);g.fill()}
  /* words */
  let cur=null;for(let i=0;i<WD.length;i++){const e=i<WD.length-1?WD[i+1][1]:END;if(t>=WD[i][1]&&t<e)cur=[WD[i],e]}
  if(cur){const w=cur[0],e=cur[1],p=seg(t,w[1],w[1]+.35),q2=seg(t,e-.15,e),last=w[0]==='Know',gl=last&&t>7.7?Math.sin(t*90):0;
    wd.textContent=w[0];wd.className='wd '+w[2];wd.style.opacity=ease.out(p)*(1-q2);
    wd.style.filter='blur('+((1-ease.out(p))*.7+(last&&t>7.7?.25:0))+'rem)';
    wd.style.transform='translate('+gl*.3+'rem,0) scale('+lerp(1.4,1,ease.out(p))+')';
    if(last&&t>7.7)wd.style.textShadow=(-.3*gl)+'rem 0 0 #00C8FF,'+(.3*gl)+'rem 0 0 #FF2E9A';else wd.style.textShadow='';
  }else{wd.style.opacity=0}
  $('lb').textContent=cur?cur[0][0].toUpperCase():'';
});` },

{ v:17, id:'energyflare', fa:'Orange lightning crack, white-blue bloom and a crescent over a glass ground', en:'Lightning, Bloom and Crescent', cat:'fx',
  when:'A closing sequence that goes from tension to calm. A crackling orange line cuts across the frame, the frame blooms white-blue and swirls, then clears to a thin glowing crescent over a dark reflective ground with small spheres and curved glints.',
  timing:'Lightning draws over 0.25 s, re-randomised at 18 Hz, three layers (glow 10 px, coral 3 px, white 1 px) · bloom grows 0 → 260 px from 1.3 s, peaks 1.7 s, gone 2.3 s · 6 swirl wisps · crescent fades in 2.2 s with a 14 px coral glow · glints and spheres follow at 2.6 s · fade to black 3.8 s',
  where:'10.8 to 12.7 s', colors:['#02050A','#FF6A45','#FFF2E6','#BFE3FF','#EAF4FF','#0B1A2E'], dur:4.4,
  css:P17_CSS,
  html:`<div class="stage"><canvas class="cv" id="cv"></canvas><div class="lb" id="lb"></div></div>`,
  js:`${P17_JS}
const cc=document.createElement('canvas');cc.width=cc.height=90;const c2=cc.getContext('2d');
c2.fillStyle='#FF8A5C';c2.beginPath();c2.arc(45,45,26,0,7);c2.fill();c2.globalCompositeOperation='destination-out';c2.beginPath();c2.arc(56,40,23,0,7);c2.fill();
play(4.4,t=>{
  sky(t);
  const out=1-seg(t,3.9,4.4);g.save();g.globalAlpha=out;
  /* disc with a hole, for context */
  const dq=g.createRadialGradient(110,120,8,135,150,70);dq.addColorStop(0,'#23395a');dq.addColorStop(1,'#050b14');g.globalAlpha=out*(1-seg(t,1.4,2));g.fillStyle=dq;g.beginPath();g.arc(135,150,70,0,7);g.fill();rim(135,150,70,-2.9,-.3,3,out*(1-seg(t,1.4,2)));g.fillStyle='#000';g.beginPath();g.arc(135,150,14,0,7);g.fill();g.globalAlpha=out;
  /* lightning */
  const lt=seg(t,0,.25),lf=1-seg(t,1.1,1.5);
  if(lt>0&&lf>0){const sd=Math.floor(t*18),P=[];for(let i=0;i<=22;i++){const x=-10+i*13;if(x>-10+290*ease.out(lt))break;P.push([x,300+(hs(sd*31+i)-.5)*30*Math.sin(Math.PI*i/22)*1.4+Math.sin(i*.7+t*9)*5])}
    if(P.length>1){[[10,'rgba(255,106,69,.3)'],[3.2,'#FF6A45'],[1,'#FFF2E6']].forEach(([w,c])=>{g.save();g.globalAlpha=out*lf*(c==='#FFF2E6'?1:.9);g.strokeStyle=c;g.lineWidth=w;g.lineJoin='round';g.shadowColor='#FF6A45';g.shadowBlur=w>5?14:6;g.beginPath();P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();g.restore()});
      glow(135,300,150,'rgba(255,106,69,.25)','rgba(255,106,69,0)',out*lf)}}
  /* bloom + wisps */
  const bk=seg(t,1.3,1.7),bf=1-seg(t,1.7,2.4);
  if(bk>0&&bf>0){const r=lerp(30,260,ease.out(bk));glow(70,240,r,'rgba(255,255,255,.95)','rgba(120,190,255,0)',out*bf);glow(70,240,r*.4,'rgba(255,230,190,1)','rgba(255,200,120,0)',out*bf)}
  const wk=seg(t,1.4,2.4)*(1-seg(t,2.2,2.8));
  if(wk>0){g.save();g.globalAlpha=out*wk*.8;g.lineCap='round';g.shadowColor='#BFE3FF';g.shadowBlur=8;
    for(let i=0;i<6;i++){g.strokeStyle='rgba(220,240,255,'+(.8-i*.08)+')';g.lineWidth=1.6-i*.15;g.beginPath();for(let x=0;x<=270;x+=10){const y=300+i*14+Math.sin(x*.03+t*3+i)*(10+i*3)-x*.1;x?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()}g.restore()}
  /* crescent + ground */
  const ck=ease.out(seg(t,2.2,3));
  if(ck>0){g.save();g.globalAlpha=out*ck;g.shadowColor='#FF6A45';g.shadowBlur=18;g.drawImage(cc,48,28,76,76);g.restore();
    const gr=g.createLinearGradient(0,290,0,480);gr.addColorStop(0,'#0d1a2d');gr.addColorStop(1,'#02050A');g.save();g.globalAlpha=out*ck;g.fillStyle=gr;g.beginPath();g.moveTo(0,320);g.quadraticCurveTo(110,285,270,300);g.lineTo(270,480);g.lineTo(0,480);g.fill();
    g.strokeStyle='rgba(234,244,255,.7)';g.lineWidth=1;g.beginPath();g.moveTo(0,320);g.quadraticCurveTo(110,285,270,300);g.stroke();
    const gk=seg(t,2.6,3.3);g.globalAlpha=out*gk;g.lineCap='round';g.shadowColor='#9CC8FF';g.shadowBlur=5;g.strokeStyle='#EAF4FF';
    [[90,360,22],[150,340,14],[200,372,18],[60,420,26],[210,430,20]].forEach(([x,y,r],i)=>{g.lineWidth=1.4;g.beginPath();g.arc(x,y+Math.sin(t*1.5+i)*2,r,3.4,4.9);g.stroke()});
    g.restore();ball(70,440,24,out*gk);ball(220,325,5,out*gk);ball(180,420,9,out*gk)}
  g.restore();
  $('lb').textContent=t<1.2?'CRACK':t<2.2?'BLOOM':'CRESCENT';
});` }
);

VIDEOS.push({ id:'v17', n:17, title:'Dark space reel: glass, light and glowing words', meta:'12.7 seconds · 720×1280 · a vertical reel with a driving music bed and hit sounds: a four-point star, glass discs, chrome spheres with flames, words in a ripple portal, lightning and a crescent',
  mood:'Cinematic and quiet. Near-black navy space with a few stars, every object made of dark glass that is lit only by a thin rim of white-blue light, and one warm accent that appears at moments of energy (coral stars, flames, lightning, the final crescent). Text is small, soft and glowing, never flat.',
  rules:[
    'Objects have no texture: dark glass spheres and discs, shaped only by a crescent of rim light on one side.',
    'One accent color, coral to red-orange, marks energy: the star, the core, the flames, the key words and the lightning. Everything else stays blue-white on navy.',
    'The camera is always moving: a slow drift, a slide along a chain, a rise out of a portal. Nothing sits still for more than a beat.',
    'Words arrive one at a time with a blur-to-sharp pop and a glow, and the two words that carry the meaning switch to the accent color.',
    'Scene changes are carried by a shape, not a cut: a flash, a falling streak, a ripple ring, a bloom.',
    'Every hit has a sound: a low thud under big shapes, a bright sweep with each reveal, a soft shimmer on the rim light.'
  ],
  palette:[
    { g:'Space', c:[['#02050A','Top of sky'],['#07111F','Middle'],['#0B1A2E','Horizon glow'],['#03070D','Sphere shadow']] },
    { g:'Glass and rim light', c:[['#27405F','Sphere highlight'],['#2B4468','Disc face'],['#9CC8FF','Rim glow'],['#EAF4FF','Rim line and text'],['#F3F8FF','Disc light edge']] },
    { g:'Accent (energy)', c:[['#FF7B4A','Star and core'],['#FF6A45','Key words and lightning'],['#FF4A2A','Flames and ground glow'],['#B02010','Flame base']] },
    { g:'Glitch fringe', c:[['#00C8FF','Cyan offset'],['#FF2E9A','Magenta offset']] }
  ] });

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 17: dark space reel */
  --sp-sky:#02050A; --sp-navy:#0B1A2E; --sp-rim:#9CC8FF; --sp-light:#EAF4FF; --sp-coral:#FF6A45; --sp-flame:#FF4A2A;
}`);
