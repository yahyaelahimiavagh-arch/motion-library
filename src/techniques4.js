/* ===== Videos 4-6: liquid glass UI, white+green explainer, cinematic light type ===== */
const CNV = `canvas{position:absolute;left:0;top:0;width:27rem;height:48rem}`;
const PERSON = `<svg width="0" height="0" style="position:absolute"><symbol id="p" viewBox="0 0 24 28"><circle cx="12" cy="7" r="5.5"/><path d="M2 27c0-8 4-11 10-11s10 3 10 11z"/></symbol></svg>`;

TECHS.push(
/* ================= VIDEO 4: liquid glass ================= */
{ v:4, id:'liquidmorph', fa:'Glass morph: pill to panel', en:'Liquid Glass Morph (Pill → Panel)', cat:'ui',
  when:'Opening a menu or panel. A small glass pill stretches like liquid into a big panel. Then the rows come in one by one and a glowing indicator travels over them.',
  timing:'Morph 1 s · ease-in-out + a little squash mid-move · rows 0.15 s apart · hover of each row 0.7 s',
  where:'Seconds 0.5 to 6', colors:['#182848','#364A6E','#BCC8E8','#FFFFFF'], dur:6.4,
  css:`.stage{background:radial-gradient(90% 60% at 40% 30%,#364A6E 0%,#182848 55%,#081828 100%)}
.b{position:absolute;border-radius:50%;filter:blur(.6rem)}
.gl{position:absolute;overflow:hidden;color:#fff;background:linear-gradient(160deg,rgba(255,255,255,.26),rgba(255,255,255,.07));-webkit-backdrop-filter:blur(1.2rem) saturate(1.5);backdrop-filter:blur(1.2rem) saturate(1.5);border:1px solid rgba(255,255,255,.35);box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -1px 0 rgba(255,255,255,.12),0 1.5rem 3rem rgba(0,0,0,.4)}
.pill{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:600 1rem 'Inter Tight',sans-serif;white-space:nowrap}
.ttl{position:absolute;top:1.3rem;left:1.6rem;font:700 1.6rem 'Inter Tight',sans-serif}
.row{position:absolute;left:4rem;width:19rem;height:3.8rem;border-radius:1.1rem;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;padding:0 1.1rem;gap:.9rem;font:500 1.1rem 'Inter Tight',sans-serif;color:#fff}
.row i{width:1.9rem;height:1.9rem;border-radius:50%;background:#fff;opacity:.92}
.cu{position:absolute;width:1.2rem;height:1.2rem;margin:-.6rem;border-radius:50%;background:#BCC8E8;box-shadow:0 0 1rem .4rem rgba(188,200,232,.8),0 0 2.6rem 1rem rgba(120,140,230,.45)}`,
  html:`<div class="stage"><div class="b" id="b1" style="width:12rem;height:12rem;background:#425A96"></div><div class="b" id="b2" style="width:10rem;height:10rem;background:#2A4272"></div><div class="gl" id="gl"><div class="pill" id="pill">Most used apps</div><div class="ttl" id="ttl">Apps</div></div><div class="cu" id="cu"></div></div>`,
  js:`const st=document.querySelector('.stage'),gl=document.getElementById('gl'),pill=document.getElementById('pill'),ttl=document.getElementById('ttl'),cu=document.getElementById('cu'),b1=document.getElementById('b1'),b2=document.getElementById('b2');
const names=['Browser','Music','Editor','Social'],rows=names.map((n,i)=>{const r=document.createElement('div');r.className='row';r.innerHTML='<i></i>'+n;r.style.top=(16.9+i*4.6)+'rem';st.insertBefore(r,cu);return r});
const ks=[[2.7,0],[3.4,1],[4.1,2],[4.8,3],[5.4,1]];
function idxAt(t){if(t<=ks[0][0])return ks[0][1];for(let i=1;i<ks.length;i++){if(t<=ks[i][0]){const a=ks[i-1],b=ks[i];return lerp(a[1],b[1],ease.inOut(seg(t,a[0],b[0])))}}return ks[ks.length-1][1]}
play(6.4,t=>{
  const m=ease.inOut(seg(t,.8,1.9)),sq=Math.sin(m*Math.PI)*.07,o=1-seg(t,5.9,6.4);
  const w=lerp(11,21,m)*(1+sq),h=lerp(3.2,23,m)*(1-sq*.6);
  gl.style.width=w+'rem';gl.style.height=h+'rem';gl.style.left=(13.5-w/2)+'rem';gl.style.top=(24-h/2)+'rem';gl.style.borderRadius=lerp(1.6,2.2,m)+'rem';gl.style.opacity=seg(t,.1,.5)*o;
  pill.style.opacity=1-seg(t,.9,1.3);ttl.style.opacity=seg(t,1.5,2.1);
  const idx=idxAt(t),cy=16.9+1.9+idx*4.6;
  rows.forEach((r,i)=>{const a=ease.out(seg(t,2+i*.15,2.7+i*.15)),hov=t>2.6?clamp(1-Math.abs(idx-i)*1.3):0;
    r.style.opacity=a*o;r.style.transform='translateY('+lerp(1.2,0,a)+'rem) scale('+(1+.035*hov)+')';r.style.background='rgba(255,255,255,'+(.12+.22*hov)+')'});
  cu.style.opacity=seg(t,2.2,2.6)*o;cu.style.left=(17+Math.sin(t*2)*.4)+'rem';cu.style.top=cy+'rem';
  b1.style.left=(2+Math.sin(t*.6)*2)+'rem';b1.style.top=(8+Math.cos(t*.5)*2)+'rem';b2.style.left=(14+Math.cos(t*.5)*2)+'rem';b2.style.top=(30+Math.sin(t*.7)*2)+'rem';
});` },

{ v:4, id:'iconpop', fa:'Icon pop-out and background swap', en:'Icon Detach + Wallpaper Swap', cat:'ui',
  when:'Choosing an item from a list. The icon separates from the row, grows and takes its brand color while the background changes, giving the feel of entering the next scene.',
  timing:'Icon rises 1.4 s · ease-in-out · color change 0.6 s · background crossfade 1 s · glass ring 0.7 s',
  where:'Seconds 7 to 9.5', colors:['#182848','#2A4E8A','#12C24A','#FFFFFF'], dur:5.2,
  css:`.stage{background:radial-gradient(100% 70% at 30% 20%,#2A4272,#182848 60%,#081828)}
.wp2{position:absolute;inset:0;background:linear-gradient(180deg,#425A96 0%,#2A4E8A 45%,#1E3672 70%,#0B2A44 100%)}
.wp2:after{content:'';position:absolute;left:-20%;right:-20%;bottom:0;height:40%;background:radial-gradient(60% 100% at 30% 100%,#1E3672,transparent),radial-gradient(50% 80% at 80% 100%,#081828,transparent)}
.row{position:absolute;left:2.5rem;right:2.5rem;top:30rem;height:4.2rem;border-radius:1.2rem;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);color:#fff;font:600 1.15rem 'Inter Tight',sans-serif;padding:0 5rem;display:flex;align-items:center}
.ic{position:absolute;left:0;top:0;width:2.4rem;height:2.4rem;margin:-1.2rem;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center}
.ic svg{width:42%;height:42%;fill:#fff}
.rg{position:absolute;left:13.5rem;top:19rem;border-radius:50%;border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.1);-webkit-backdrop-filter:blur(.8rem);backdrop-filter:blur(.8rem);box-shadow:inset 0 1px 0 rgba(255,255,255,.5)}
.lb{position:absolute;left:0;right:0;top:27.5rem;text-align:center;color:#fff;font:700 2rem 'Inter Tight',sans-serif}`,
  html:`<div class="stage"><div class="wp2" id="wp2"></div><div class="rg" id="rg"></div><div class="row" id="row">Music</div><div class="ic" id="ic"><svg viewBox="0 0 10 10"><path d="M2 1l7 4-7 4z"/></svg></div><div class="lb" id="lb">Favorites</div></div>`,
  js:`const wp2=document.getElementById('wp2'),rg=document.getElementById('rg'),row=document.getElementById('row'),ic=document.getElementById('ic'),lb=document.getElementById('lb');
play(5.2,t=>{
  const up=ease.inOut(seg(t,1,2.4)),col=seg(t,1.6,2.2),o=1-seg(t,4.7,5.2);
  const x=lerp(5.5,13.5,up),y=lerp(32.1,19,up)-Math.sin(up*Math.PI)*2.5,s=lerp(1,4.6,up);
  ic.style.left=x+'rem';ic.style.top=y+'rem';ic.style.transform='scale('+s+')';
  const c=[Math.round(lerp(255,18,col)),Math.round(lerp(255,194,col)),Math.round(lerp(255,74,col))];
  ic.style.background='rgb('+c+')';ic.style.boxShadow='0 0 '+(2.5*col)+'rem rgba(18,194,74,'+.6*col+')';
  row.style.opacity=seg(t,.1,.6)*(1-seg(t,1.2,1.8))*o;row.style.transform='translateY('+lerp(1,0,ease.out(seg(t,.1,.7)))+'rem)';
  wp2.style.opacity=ease.inOut(seg(t,1.6,2.6));
  const r=ease.out(seg(t,2.3,3))*13+Math.sin(t*2)*.15;
  rg.style.width=r+'rem';rg.style.height=r+'rem';rg.style.margin=(-r/2)+'rem';rg.style.opacity=seg(t,2.3,2.7)*o;
  lb.style.opacity=ease.out(seg(t,3.1,3.8))*o;lb.style.transform='translateY('+lerp(.8,0,ease.out(seg(t,3.1,3.8)))+'rem)';
  ic.style.opacity=seg(t,0,.4)*o;
});` },

{ v:4, id:'streakreveal', fa:'Typography reveal with a motion streak', en:'Motion-Streak Text Reveal', cat:'type',
  when:'A closing headline or product name. The text arrives with a one-direction blur (horizontal or vertical) and gradually sharpens. Horizontal for cards, vertical for the final logotype.',
  timing:'Blur from 40 to 0 in 0.9 s · ease-out · with 3rem of travel · fade to black 0.6 s',
  where:'Seconds 9.5 to 14', colors:['#FFFFFF','#182848','#081828','#080808'], dur:6.4,
  css:`.stage{background:radial-gradient(90% 60% at 50% 40%,#2A4272,#182848 60%,#081828)}
.dk{position:absolute;inset:0;background:#080808;opacity:0}
.cd{position:absolute;left:3rem;right:3rem;top:15rem;height:16rem;border-radius:1.6rem;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);box-shadow:inset 0 1px 0 rgba(255,255,255,.5)}
.t1{position:absolute;left:0;right:0;top:19rem;text-align:center;color:#fff;font:700 3rem 'Inter Tight',sans-serif;letter-spacing:-.02em}
.t1 small{display:block;font:500 1.1rem 'Inter Tight',sans-serif;opacity:.75;margin-top:.5rem;letter-spacing:0}
.t2{position:absolute;left:0;right:0;top:22rem;text-align:center;color:#F8F8F8;font:italic 400 3.4rem 'Instrument Serif',serif;text-shadow:0 0 1.5rem rgba(255,255,255,.35)}
.ln{position:absolute;left:0;top:23rem;width:14rem;height:.3rem;background:linear-gradient(90deg,transparent,#fff,transparent);filter:blur(.15rem)}`,
  html:`<div class="stage"><svg width="0" height="0" style="position:absolute"><filter id="f1" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur id="g1" stdDeviation="0 0"/></filter><filter id="f2" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur id="g2" stdDeviation="0 0"/></filter></svg><div class="cd" id="cd"></div><div class="t1" id="t1" style="filter:url(#f1)">Favorites<small>128 items</small></div><div class="ln" id="ln"></div><div class="dk" id="dk"></div><div class="t2" id="t2" style="filter:url(#f2)">studio</div></div>`,
  js:`const g1=document.getElementById('g1'),g2=document.getElementById('g2'),t1=document.getElementById('t1'),t2=document.getElementById('t2'),cd=document.getElementById('cd'),dk=document.getElementById('dk'),ln=document.getElementById('ln');
play(6.4,t=>{
  const a=ease.out(seg(t,.4,1.5)),out=seg(t,2.9,3.4),b=ease.out(seg(t,3.8,5)),c=1-seg(t,5.9,6.4);
  g1.setAttribute('stdDeviation',(40*(1-a))+' 0');t1.style.opacity=seg(t,.4,.8)*(1-out);t1.style.transform='translateX('+lerp(-3,0,a)+'rem)';
  cd.style.opacity=seg(t,.2,.8)*(1-out);
  ln.style.opacity=Math.sin(Math.PI*seg(t,.3,1.4))*(1-out);ln.style.left=lerp(-14,27,ease.inOut(seg(t,.3,1.4)))+'rem';
  dk.style.opacity=ease.inOut(seg(t,2.8,3.6));
  g2.setAttribute('stdDeviation','0 '+(30*(1-b)));t2.style.opacity=seg(t,3.8,4.2)*c;t2.style.transform='translateY('+lerp(2.5,0,b)+'rem)';
});` },

/* ================= VIDEO 5: white + green explainer ================= */
{ v:5, id:'serifswap', fa:'Green word and swap to italic serif', en:'Green Word Type-on + Serif Swap', cat:'type',
  when:'The first sentence of each scene. A green key word is typed letter by letter (with a soft green halo), then the sentence changes and the emphasis word arrives in an italic serif.',
  timing:'Each letter 0.07 s with 0.3rem blur · sentence swap 0.5 s · the serif word opens with a mask from the right',
  where:'Seconds 0 to 3', colors:['#FDFDFD','#0EBE02','#E8F8E8','#111111'], dur:5.2,
  css:`.stage{background:#FDFDFD;color:#111;font-family:'Inter Tight',sans-serif}
.halo{position:absolute;left:50%;top:24rem;width:22rem;height:14rem;margin:-7rem 0 0 -11rem;background:radial-gradient(closest-side,#E8F8E8,transparent);border-radius:50%}
.l{position:absolute;left:0;right:0;top:22.5rem;text-align:center;font-size:2.3rem;font-weight:600;letter-spacing:-.025em;white-space:nowrap}
.l .g{color:#0EBE02}.l .ch{display:inline-block}
.l em{font:italic 400 3.2rem 'Instrument Serif',serif;color:#0EBE02;display:inline-block;letter-spacing:0}
.dl{position:absolute;color:#0EBE02;font-size:1.1rem;font-weight:600}`,
  html:`<div class="stage"><div class="halo" id="halo"></div><div class="l" id="l1">Attention is <span class="g" id="w"></span></div><div class="l" id="l2">Because <em id="em">every second</em></div><div class="dl" id="d1">$</div><div class="dl" id="d2">$</div></div>`,
  js:`const W='expensive',w=document.getElementById('w'),l1=document.getElementById('l1'),l2=document.getElementById('l2'),em=document.getElementById('em'),halo=document.getElementById('halo'),d1=document.getElementById('d1'),d2=document.getElementById('d2');
w.innerHTML=[...W].map(c=>'<span class="ch">'+c+'</span>').join('');const chs=[...w.children];
play(5.2,t=>{
  const sw=ease.inOut(seg(t,2.6,3.1)),o=1-seg(t,4.7,5.2);
  chs.forEach((c,i)=>{const a=ease.out(seg(t,.5+i*.07,.8+i*.07));c.style.opacity=a;c.style.filter='blur('+.3*(1-a)+'rem)';c.style.transform='translateY('+lerp(.6,0,a)+'rem)'});
  l1.style.opacity=seg(t,.1,.4)*(1-sw);l1.style.transform='translateY('+lerp(0,-1.2,sw)+'rem)';l1.style.filter='blur('+.5*sw+'rem)';
  l2.style.opacity=sw*o;l2.style.transform='translateY('+lerp(1.2,0,sw)+'rem)';
  em.style.clipPath='inset(-20% '+lerp(100,0,ease.out(seg(t,3,4)))+'% -20% 0)';
  halo.style.opacity=(.7+.3*Math.sin(t*2.5))*seg(t,.3,.8)*o;halo.style.transform='scale('+lerp(.8,1.1,seg(t,0,3))+')';
  const f=(u)=>seg(t,u,u+.9);
  d1.style.left='15.5rem';d1.style.top=(19+f(1.3)*4)+'rem';d1.style.opacity=Math.sin(Math.PI*f(1.3))*(1-sw);
  d2.style.left='17rem';d2.style.top=(26-f(1.8)*3)+'rem';d2.style.opacity=Math.sin(Math.PI*f(1.8))*(1-sw);
});` },

{ v:5, id:'clockdial', fa:'Clock face with a spinning hand', en:'Watch Dial + Sweeping Hand', cat:'data',
  when:'The idea of time or urgency (“every second counts”). A huge, half off-frame clock face; the hand spins fast and stops on a number while a green arc shows the path traveled.',
  timing:'Spin 2.2 s · ease-out with a small overshoot · green arc follows the hand · text below after 1 s',
  where:'Seconds 1 to 3.5', colors:['#FDFDFD','#0EA202','#111111','#BBBBBB'], dur:5,
  css:`.stage{background:#FDFDFD}
svg.d{position:absolute;left:0;top:0;width:27rem;height:48rem}
.tx{position:absolute;left:0;right:0;top:35rem;text-align:center;font:600 1.7rem 'Inter Tight',sans-serif;color:#111}
.tx em{font:italic 400 2.4rem 'Instrument Serif',serif;color:#0EA202}`,
  html:`<div class="stage"><svg class="d" id="d" viewBox="0 0 27 48"><g id="tk"></g><path id="arc" fill="none" stroke="#0EA202" stroke-width=".28" stroke-linecap="round"/><g id="hand"><path d="M-.5 0L0 -1.2L.5 0L.35 22L0 23.5L-.35 22Z" fill="#111"/><circle r="1" fill="#0EA202"/><circle r=".45" fill="#111"/></g></svg><div class="tx" id="tx">Because <em>every second</em></div></div>`,
  js:`const C=[-2,26],R=26,tk=document.getElementById('tk'),arc=document.getElementById('arc'),hand=document.getElementById('hand'),tx=document.getElementById('tx');
const P=(a,r)=>[C[0]+r*Math.cos(a*Math.PI/180),C[1]+r*Math.sin(a*Math.PI/180)];
let s='';for(let a=-88;a<=8;a+=2){const M=((a+88)%10===0),p=P(a,R),q=P(a,R-(M?1.4:.8));s+='<line x1="'+p[0]+'" y1="'+p[1]+'" x2="'+q[0]+'" y2="'+q[1]+'" stroke="'+(M?'#999':'#CCC')+'" stroke-width="'+(M?.12:.07)+'"/>'}
tk.innerHTML=s;
play(5,t=>{
  const a=lerp(-84,-30,ease.out(seg(t,.4,2.6)))+Math.sin(seg(t,.4,2.6)*Math.PI*2)*-2*(1-seg(t,2.6,2.7)),o=1-seg(t,4.5,5);
  const p=P(-88,R-.2),q=P(a,R-.2);
  arc.setAttribute('d','M'+p[0]+' '+p[1]+'A'+(R-.2)+' '+(R-.2)+' 0 0 1 '+q[0]+' '+q[1]);
  hand.setAttribute('transform','translate('+C[0]+' '+C[1]+') rotate('+(a-90)+')');
  hand.style.filter='blur('+.25*(1-ease.out(seg(t,.4,1.8)))+'rem)';
  document.getElementById('d').style.opacity=seg(t,0,.4)*o;
  tx.style.opacity=seg(t,1,1.6)*o;tx.style.transform='translateY('+lerp(1,0,ease.out(seg(t,1,1.7)))+'rem)';
});` },

{ v:5, id:'reticle', fa:'Targeting reticle on an icon', en:'Corner-Bracket Reticle Focus', cat:'layout',
  when:'Highlighting one item among similar ones (for example the target audience). A four-corner frame shrinks from the whole screen onto a black icon while the other icons stay green.',
  timing:'Icons enter 0.12 s apart (back-ease) · frame closes in 1.3 s · ease-in-out · the chosen icon pulses',
  where:'Seconds 2.5 to 4.5', colors:['#FDFDFD','#0EBE02','#111111'], dur:4.6,
  css:`.stage{background:#FDFDFD;font-family:'Inter Tight',sans-serif}
.p{position:absolute;top:19rem;width:3.6rem;height:4.2rem;margin-left:-1.8rem;fill:#0EBE02}
.p.k{fill:#111}
.br{position:absolute;width:1.6rem;height:1.6rem;border:0 solid #1c6b17}
.h{position:absolute;left:0;right:0;top:13rem;text-align:center;font-size:1.7rem;font-weight:600;color:#111}
.s{position:absolute;left:5rem;right:5rem;top:27rem;text-align:center;font-size:.9rem;color:#777;line-height:1.4}`,
  html:`<div class="stage">${PERSON}<div class="h" id="h">Your audience</div><div class="s" id="s">Spends seconds deciding if you're worth their attention.</div></div>`,
  js:`const st=document.querySelector('.stage'),xs=[3.5,8.5,13.5,18.5,23.5],ps=xs.map((x,i)=>{const e=document.createElementNS('http://www.w3.org/2000/svg','svg');e.setAttribute('class','p'+(i===2?' k':''));e.style.left=x+'rem';e.innerHTML='<use href="#p"/>';e.setAttribute('viewBox','0 0 24 28');st.appendChild(e);return e});
const bs=[[1,1],[0,1],[1,0],[0,0]].map(([r,b])=>{const d=document.createElement('div');d.className='br';d.style.borderTopWidth=b?0:'.16rem';d.style.borderBottomWidth=b?'.16rem':0;d.style.borderLeftWidth=r?0:'.16rem';d.style.borderRightWidth=r?'.16rem':0;st.appendChild(d);return {d,r,b}});
const h=document.getElementById('h'),s=document.getElementById('s');
play(4.6,t=>{
  const c=ease.inOut(seg(t,1.2,2.5)),o=1-seg(t,4.1,4.6),W=lerp(24,6,c),H=lerp(34,6.4,c),cx=13.5,cy=lerp(24,21.1,c);
  ps.forEach((p,i)=>{const a=ease.back(seg(t,.1+i*.12,.6+i*.12)),k=i===2?1+.08*Math.sin(t*5)*seg(t,2.5,2.6):1;p.style.opacity=seg(t,.1+i*.12,.3+i*.12)*o;p.style.transform='scale('+(a*k*(i===2?1.15:.9))+')'});
  bs.forEach(({d,r,b})=>{d.style.left=(cx+(r?W/2-1.6:-W/2))+'rem';d.style.top=(cy+(b?H/2-1.6:-H/2))+'rem';d.style.opacity=seg(t,.6,1)*o});
  h.style.opacity=seg(t,.3,.8)*(1-seg(t,1.6,2.1))*o;s.style.opacity=seg(t,2.3,2.9)*o;
});` },

{ v:5, id:'floatcards', fa:'Floating review cards', en:'Floating Review Cards', cat:'ui',
  when:'Social proof or information overload. Thin white cards with shadows arrive from different directions, float a little, and rise with blur. Three green loading rings spin behind them.',
  timing:'Each card enters 0.7 s, 0.7 s apart · blur 6 to 0 · sinusoidal float ±0.3rem · rings delayed 0.2',
  where:'Seconds 4 to 6.5', colors:['#FDFDFD','#0EBE02','#787878','#E8F8E8'], dur:5.4,
  css:`.stage{background:#FDFDFD;font-family:'Inter Tight',sans-serif}
.tt{position:absolute;left:0;right:0;top:23rem;text-align:center;font-size:1.7rem;font-weight:600;color:#787878}
.rs{position:absolute;left:0;right:0;top:17rem;display:flex;justify-content:center;gap:.8rem}
.rs i{width:3rem;height:3rem;border-radius:50%;border:.18rem solid #BFE9BB}
.cd{position:absolute;width:10.5rem;padding:.9rem;border-radius:.9rem;background:#fff;box-shadow:0 .5rem 1.6rem rgba(0,0,0,.12);border:1px solid #eee}
.cd .a{display:flex;gap:.5rem;align-items:center;margin-bottom:.6rem}
.cd .a b{width:1.7rem;height:1.7rem;border-radius:50%;background:#C9B7A8}
.cd .a u{display:block;height:.35rem;width:3.4rem;background:#bbb;border-radius:.2rem;text-decoration:none}
.cd p{height:.3rem;background:#ddd;border-radius:.2rem;margin-bottom:.35rem}
.cd .st{color:#0EBE02;font-size:.8rem;letter-spacing:.05rem;margin-top:.5rem}`,
  html:`<div class="stage"><div class="rs" id="rs"><i></i><i></i><i></i></div><div class="tt" id="tt">Trying to understand</div></div>`,
  js:`const st=document.querySelector('.stage'),spec=[[1.2,5,0,-3,6],[15.5,10,1,3,-5],[2.5,30,2,-3,5],[14.5,35,3,3,6]];
const cards=spec.map(([x,y])=>{const d=document.createElement('div');d.className='cd';d.style.left=x+'rem';d.style.top=y+'rem';d.innerHTML='<div class="a"><b></b><u></u></div><p style="width:100%"></p><p style="width:92%"></p><p style="width:80%"></p><div class="st">★★★★★</div>';st.appendChild(d);return d});
const rs=[...document.querySelectorAll('.rs i')],tt=document.getElementById('tt');
play(5.4,t=>{
  const o=1-seg(t,4.7,5.3);
  cards.forEach((c,i)=>{const a=ease.out(seg(t,.5+i*.7,1.2+i*.7)),[,,,dx,dy]=spec[i];c.style.opacity=a*o;c.style.filter='blur('+6*(1-a)+'px)';c.style.transform='translate('+lerp(dx*2,0,a)+'rem,'+(lerp(dy*1.6,0,a)+Math.sin(t*1.6+i*1.7)*.3-seg(t,4.7,5.3)*3)+'rem) scale('+lerp(.9,1,a)+')'});
  rs.forEach((r,i)=>{const p=.5+.5*Math.sin(t*3-i*.9);r.style.opacity=seg(t,.2,.6)*o*(.35+.65*p);r.style.transform='scale('+(.85+.2*p)+')';r.style.borderColor=p>.6?'#0EBE02':'#BFE9BB'});
  tt.style.opacity=seg(t,.2,.7)*o;
});` },

{ v:5, id:'ringcount', fa:'Ring counter with green glow', en:'Ring Progress Counter', cat:'data',
  when:'A key number (seconds, percent, score). A gray ring fills with a green arc, the number counts inside, and a label is typed letter by letter below it.',
  timing:'Count 2.2 s · ease-out · the ring fills at the same time · label 0.06 s per letter',
  where:'Seconds 5.5 to 7.5', colors:['#FDFDFD','#0EBE02','#D8D8D8','#111111'], dur:5.2,
  css:`.stage{background:#FDFDFD;font-family:'Inter Tight',sans-serif}
svg{position:absolute;left:5.5rem;top:12rem;width:16rem;height:16rem}
.n{position:absolute;left:0;right:0;top:17.2rem;text-align:center;font-size:5rem;font-weight:400;color:#111;letter-spacing:-.03em}
.lb{position:absolute;left:0;right:0;top:30rem;text-align:center;font-size:1.6rem;font-weight:500;color:#111}
.lb span{display:inline-block;white-space:pre}`,
  html:`<div class="stage"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#D8D8D8" stroke-width="6"/><circle id="pr" cx="50" cy="50" r="40" fill="none" stroke="#0EBE02" stroke-width="6" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg><div class="n" id="n">0</div><div class="lb" id="lb"></div></div>`,
  js:`const pr=document.getElementById('pr'),n=document.getElementById('n'),lb=document.getElementById('lb'),svg=document.querySelector('svg'),L=2*Math.PI*40,T='Is a second';
pr.style.strokeDasharray=L;lb.innerHTML=[...T].map(c=>'<span>'+c+'</span>').join('');const sp=[...lb.children];
play(5.2,t=>{
  const a=ease.out(seg(t,.4,2.6)),o=1-seg(t,4.7,5.2);
  pr.style.strokeDashoffset=L*(1-a*.97);n.textContent=Math.round(14*a);
  svg.style.opacity=seg(t,0,.4)*o;n.style.opacity=seg(t,0,.4)*o;
  svg.style.filter='drop-shadow(0 0 '+(.2+1.1*a)+'rem rgba(14,190,2,'+.55*a+'))';
  sp.forEach((s,i)=>{const k=ease.out(seg(t,2.8+i*.06,3.1+i*.06));s.style.opacity=k*o;s.style.filter='blur('+.3*(1-k)+'rem)'});
});` },

{ v:5, id:'hexnodes', fa:'Green hexagons with leader lines', en:'Hex Badges + Leader Lines', cat:'layout',
  when:'A list of three problems or benefits. Each item is a green hexagon with a white line icon that pops in, then a broken leader line reaches a small label.',
  timing:'Each node 0.9 s · back-ease pop · line draws in 0.5 s · nodes 1 s apart',
  where:'Seconds 7 to 11', colors:['#FDFDFD','#0EA202','#111111','#FFFFFF'], dur:5.4,
  css:`.stage{background:#FDFDFD;font-family:'Inter Tight',sans-serif}
.hx{position:absolute;width:6rem;height:6.6rem;margin:-3.3rem 0 0 -3rem}
.hx i{position:absolute;inset:0;background:#0EA202;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)}
.hx svg{position:absolute;left:1.5rem;top:1.8rem;width:3rem;height:3rem;fill:none;stroke:#fff;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.hx b{position:absolute;bottom:.55rem;width:1rem;height:.7rem;border:0 solid #111}
.lbl{position:absolute;font-size:.95rem;font-weight:500;color:#111;white-space:nowrap}
svg.ln{position:absolute;left:0;top:0;width:27rem;height:48rem}`,
  html:`<div class="stage"><svg class="ln" viewBox="0 0 27 48"><polyline id="l0" fill="none" stroke="#111" stroke-width=".07"/><polyline id="l1" fill="none" stroke="#111" stroke-width=".07"/><polyline id="l2" fill="none" stroke="#111" stroke-width=".07"/></svg></div>`,
  js:`const st=document.querySelector('.stage'),N=[{x:7,y:20,t:'Losing prospects',pts:[[0,-3.3],[0,-5],[-2.2,-7.2]],lx:1.5,ly:12.2},{x:20,y:20,t:'Losing momentum',pts:[[0,-3.3],[0,-5],[-2.2,-7.2]],lx:15.5,ly:12.2},{x:13.5,y:29,t:'Losing opportunities',pts:[[0,3.3],[0,5],[2.2,7.2]],lx:12,ly:36.7}];
const icon=['<circle cx="12" cy="9" r="3.5"/><path d="M5 20c1-5 4-6.5 7-6.5s6 1.5 7 6.5"/><path d="M3 3h4M3 3v4M21 3h-4M21 3v4"/>','<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>','<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'];
const els=N.map((n,i)=>{const h=document.createElement('div');h.className='hx';h.style.left=n.x+'rem';h.style.top=n.y+'rem';h.innerHTML='<i></i><svg viewBox="0 0 24 24">'+icon[i]+'</svg><b style="left:-.2rem;border-width:0 0 .14rem .14rem"></b><b style="right:-.2rem;border-width:0 .14rem .14rem 0"></b>';st.appendChild(h);
 const l=document.createElement('div');l.className='lbl';l.textContent=n.t;l.style.left=n.lx+'rem';l.style.top=n.ly+'rem';st.appendChild(l);
 const pl=document.getElementById('l'+i);pl.setAttribute('points',n.pts.map(p=>(n.x+p[0])+','+(n.y+p[1])).join(' '));const len=pl.getTotalLength?7:7;pl.style.strokeDasharray=9;
 return {h,l,pl}});
play(5.4,t=>{
  const o=1-seg(t,4.8,5.3);
  els.forEach((e,i)=>{const a=ease.back(seg(t,.3+i*1,.9+i*1)),ln=ease.out(seg(t,.9+i*1,1.5+i*1)),lt=seg(t,1.3+i*1,1.8+i*1);
    e.h.style.opacity=seg(t,.3+i,.5+i)*o;e.h.style.transform='scale('+a+')';e.pl.style.strokeDashoffset=9*(1-ln);e.pl.style.opacity=o;e.l.style.opacity=lt*o;e.l.style.transform='translateY('+lerp(.5,0,lt)+'rem)'});
});` },

{ v:5, id:'pillcascade', fa:'Cascading text pills', en:'Pill Tag Cascade', cat:'ui',
  when:'A list of short benefits. Pills (solid green and outlined) slide in from the right with blur and the rows move up to make room for the next. Faded green rings rotate behind.',
  timing:'Each pill 0.6 s, 0.6 s apart · blur 50% · the rows rise 4.8rem in total · rings turn once per 12 s',
  where:'Seconds 14 to 21', colors:['#FDFDFD','#12BE02','#111111','#E6F6E6'], dur:6.2,
  css:`.stage{background:#FDFDFD;font-family:'Inter Tight',sans-serif}
.rg{position:absolute;border-radius:50%;border:2.6rem solid #E6F6E6;filter:blur(.5rem)}
.rw{position:absolute;left:0;right:0;display:flex;justify-content:center;gap:.7rem}
.pl{display:inline-block;height:2.4rem;line-height:2.4rem;padding:0 1.1rem;border-radius:1.3rem;font-size:1rem;font-weight:500;white-space:nowrap}
.pl.f{background:#12BE02;color:#fff}.pl.o{background:#fff;color:#111;border:1px solid #111;line-height:2.2rem}`,
  html:`<div class="stage"><div class="rg" id="r1" style="width:20rem;height:20rem"></div><div class="rg" id="r2" style="width:16rem;height:16rem"></div><div id="box"></div></div>`,
  js:`const rows=[[['f',"They're clear."],['o','Sharper']],[['o','More intentional'],['f','They remove friction']],[['f','They accelerate understanding']],[['o','They make decisions feel effortless']]];
const box=document.getElementById('box'),pills=[];
rows.forEach((r,i)=>{const d=document.createElement('div');d.className='rw';d.style.top=(21+i*3.2)+'rem';r.forEach(([k,x])=>{const p=document.createElement('span');p.className='pl '+k;p.textContent=x;d.appendChild(p);pills.push(p)});box.appendChild(d)});
const r1=document.getElementById('r1'),r2=document.getElementById('r2');
play(6.2,t=>{
  const o=1-seg(t,5.6,6.1);
  pills.forEach((p,i)=>{const a=ease.out(seg(t,.3+i*.6,.9+i*.6));p.style.opacity=a*o;p.style.filter='blur('+(1-a)*5+'px)';p.style.transform='translateX('+lerp(10,0,a)+'rem)'});
  box.style.transform='translateY('+(-4.8*ease.inOut(seg(t,1.6,3.6)))+'rem)';
  r1.style.left=(14+Math.sin(t*.5)*1.5)+'rem';r1.style.top=(-6+Math.cos(t*.5)*1.5)+'rem';r2.style.left=(-6+Math.cos(t*.4)*1.5)+'rem';r2.style.top=(38+Math.sin(t*.5)*1.5)+'rem';
});` },

{ v:5, id:'ovalmark', fa:'Hand-drawn oval around a key word', en:'Hand-drawn Oval Emphasis', cat:'type',
  when:'A conclusion sentence. The previous sentence is typed, turns gray and shrinks, then the main word comes in bold and a green oval is drawn around it.',
  timing:'Typing 1.8 s · graying 0.6 s · oval draws in 0.9 s · soft green halo',
  where:'Seconds 21 to 25', colors:['#FDFDFD','#12BE02','#111111','#A0A0A0'], dur:6,
  css:`.stage{background:#FDFDFD;font-family:'Inter Tight',sans-serif;color:#111}
.row{position:absolute;left:0;top:20.5rem;width:27rem;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1.4rem;white-space:nowrap}
.a{font-size:1.3rem;font-weight:500}
.b{position:relative;font-size:2.1rem;font-weight:700;letter-spacing:-.02em;padding:.4rem .9rem}
.b svg{position:absolute;left:-6%;top:-35%;width:112%;height:170%;overflow:visible}
.b svg path{fill:none;stroke:#12BE02;stroke-width:2.2;stroke-linecap:round}
.gl{position:absolute;left:0;right:0;top:19rem;height:8rem;background:radial-gradient(closest-side,rgba(18,190,2,.18),transparent)}`,
  html:`<div class="stage"><div class="gl" id="gl"></div><div class="row" id="row"><span class="a" id="a">Because clarity isn't an advantage</span><span class="b" id="b">It's leverage.<svg viewBox="0 0 100 40" preserveAspectRatio="none"><path id="ov" d="M52 3C20 1 2 10 3 21C4 33 28 38 55 37C84 36 98 28 97 17C96 6 78 2 50 4"/></svg></span></div></div>`,
  js:`const a=document.getElementById('a'),b=document.getElementById('b'),ov=document.getElementById('ov'),row=document.getElementById('row'),gl=document.getElementById('gl'),T=a.textContent,L=ov.getTotalLength();
ov.style.strokeDasharray=L;
play(6,t=>{
  const ty=seg(t,.3,2.1),sw=ease.inOut(seg(t,2.5,3.2)),o=1-seg(t,5.5,6),bi=ease.out(seg(t,3,3.7));
  a.textContent=T.slice(0,Math.round(ty*T.length));a.style.color='rgb('+Math.round(lerp(17,160,sw))+','+Math.round(lerp(17,160,sw))+','+Math.round(lerp(17,160,sw))+')';
  a.style.fontSize=lerp(1.3,1.1,sw)+'rem';
  b.style.opacity=bi*o;b.style.transform='scale('+lerp(.85,1,bi)+')';a.style.opacity=o;
    ov.style.strokeDashoffset=L*(1-ease.inOut(seg(t,3.6,4.5)));
  gl.style.opacity=seg(t,3.6,4.4)*o;
});` },

/* ================= VIDEO 6: cinematic light typography ================= */
{ v:6, id:'wavelight', fa:'Wavy energy line with a light orb', en:'Energy Wave Line + Orb Text', cat:'fx',
  when:'A cinematic opening. A thin wavy line of light with a glowing orb in the middle trembles on black and “carries” a sentence that arrives word by word. The last word turns gold and italic.',
  timing:'Line: sine waves with amplitude falling from the center · each word 0.6 s with blur · orb pulses at 2 Hz · whole sentence 4.5 s',
  where:'Seconds 0 to 7', colors:['#080808','#FBE6C9','#F6C776','#D25E32','#8E3622'], dur:6.4,
  css:`.stage{background:radial-gradient(70% 40% at 50% 50%,#2a0f08 0%,#120805 55%,#050404 100%);font-family:'Instrument Serif',Georgia,serif;color:#FBE6C9}
${CNV}
.ln{position:absolute;left:1.5rem;right:1.5rem;font-size:2.5rem;line-height:1.1;text-align:left;text-shadow:0 0 1rem rgba(255,200,150,.3)}
.ln span{display:inline-block;margin-right:.5rem}
.ln .gd{font-style:italic;color:#F6C776;text-shadow:0 0 1.2rem rgba(246,199,118,.7)}`,
  html:`<div class="stage"><canvas id="c" width="540" height="960"></canvas><div class="ln" style="top:17rem" id="a"></div><div class="ln" style="top:20.5rem" id="b"></div></div>`,
  js:`const cv=document.getElementById('c'),g=cv.getContext('2d'),A=document.getElementById('a'),B=document.getElementById('b');
const wa=['Every','legend','begins'],wb=['with','a','single','spark.'],sp=[];
const mk=(p,w,i,gd)=>{const s=document.createElement('span');s.textContent=w;if(gd)s.className='gd';p.appendChild(s);sp.push({s,i})};
wa.forEach((w,i)=>mk(A,w,i));wb.forEach((w,i)=>mk(B,w,3+i,i===3));
const T=[.5,1.1,1.9,2.5,2.9,3.3,4.1];
play(6.4,t=>{
  const o=1-seg(t,5.6,6.2),boost=ease.inOut(seg(t,5.3,6.3));
  g.clearRect(0,0,540,960);g.globalCompositeOperation='lighter';
  const cy=500,cx=270,pulse=1+.12*Math.sin(t*12.5);
  // wave line
  g.lineCap='round';
  [[5,'rgba(210,94,50,.25)'],[2.2,'rgba(251,230,201,.9)']].forEach(([lw,col],k)=>{
    g.beginPath();g.lineWidth=lw;g.strokeStyle=col;
    for(let x=0;x<=540;x+=4){const d=(x-cx)/200,env=Math.exp(-d*d)*(1+boost*.5),y=cy+Math.sin(x*.045-t*5+k)*14*env+Math.sin(x*.11+t*3)*4*env;x?g.lineTo(x,y):g.moveTo(x,y)}
    g.globalAlpha=(.35+.65*seg(t,0,.5))*o;g.stroke()});
  g.globalAlpha=1;
  // orb
  const R=(26+60*boost)*pulse*seg(t,0,.4),gr=g.createRadialGradient(cx,cy,0,cx,cy,R*3);
  gr.addColorStop(0,'rgba(255,248,235,'+o+')');gr.addColorStop(.18,'rgba(246,199,118,'+.9*o+')');gr.addColorStop(.5,'rgba(210,94,50,'+.35*o+')');gr.addColorStop(1,'rgba(210,94,50,0)');
  g.fillStyle=gr;g.fillRect(0,0,540,960);
  const fl=g.createLinearGradient(0,0,540,0);fl.addColorStop(0,'rgba(255,170,110,0)');fl.addColorStop(.5,'rgba(255,200,150,'+.35*o+')');fl.addColorStop(1,'rgba(255,170,110,0)');
  g.fillStyle=fl;g.fillRect(0,cy-3,540,6);
  sp.forEach(({s,i})=>{const a=ease.out(seg(t,T[i],T[i]+.5));s.style.opacity=a*(1-boost);s.style.filter='blur('+.5*(1-a)+'rem)';s.style.transform='translateY('+lerp(1.1,0,a)+'rem)'});
});` },

{ v:6, id:'lightbloom', fa:'Light bloom and rays to a title reveal', en:'Orb Bloom → Rays → Title Reveal', cat:'fx',
  when:'The moment of revealing a product name. The light orb bursts, rays rotate, a short flash hits and particles gather into the title. The version number separates in gold.',
  timing:'Orb grows 1.4 s · expo · rays peak 1.3 s and fade 1.5 s · white flash 30% · title 1 s · gold number +0.8 s',
  where:'Seconds 7.5 to 10', colors:['#080808','#8E3622','#FBE6C9','#F6C776','#D25E32'], dur:5.4,
  css:`.stage{background:radial-gradient(80% 50% at 50% 48%,#8E3622 0%,#3a140c 45%,#0b0605 100%)}
.rays{position:absolute;left:50%;top:24rem;width:60rem;height:60rem;margin:-30rem 0 0 -30rem;background:repeating-conic-gradient(from 0deg,rgba(255,225,180,.75) 0 2.5deg,transparent 2.5deg 11deg);-webkit-mask-image:radial-gradient(circle,#000 0,transparent 62%);mask-image:radial-gradient(circle,#000 0,transparent 62%)}
.orb{position:absolute;left:50%;top:24rem;border-radius:50%;background:radial-gradient(circle,#fff 0,#FBE6C9 20%,#F6C776 40%,#D25E32 65%,transparent 72%)}
.fl{position:absolute;inset:0;background:#fff;opacity:0}
.sm{position:absolute;left:0;right:0;top:20.2rem;text-align:center;font:600 .75rem 'Inter Tight',sans-serif;letter-spacing:.4em;color:#FBE6C9;opacity:.8}
.tt{position:absolute;left:0;right:0;top:21.5rem;text-align:center;font:italic 400 4.2rem 'Instrument Serif',serif;color:#FBE6C9;text-shadow:0 0 1.6rem rgba(255,200,150,.55);white-space:nowrap}
.tt b{font-weight:400;background:linear-gradient(180deg,#F6C776,#c98a3c);-webkit-background-clip:text;background-clip:text;color:transparent;margin-left:.5rem}
.dt{position:absolute;width:.25rem;height:.25rem;border-radius:50%;background:#FBE6C9}`,
  html:`<div class="stage"><div class="rays" id="rays"></div><div class="orb" id="orb"></div><div class="fl" id="fl"></div><div class="sm" id="sm">NORTHSTAR</div><div class="tt" id="tt">Legend<b id="v">2.0</b></div></div>`,
  js:`const st=document.querySelector('.stage'),rays=document.getElementById('rays'),orb=document.getElementById('orb'),fl=document.getElementById('fl'),sm=document.getElementById('sm'),tt=document.getElementById('tt'),v=document.getElementById('v');
const rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
const dots=[...Array(40)].map((_,i)=>{const d=document.createElement('div');d.className='dt';st.appendChild(d);return {d,a:rnd(i)*6.283,r:6+rnd(i+50)*9,ty:21.2+rnd(i+90)*4,tx:6+rnd(i+30)*15}});
play(5.4,t=>{
  const g=ease.expo(seg(t,.2,1.6)),ra=Math.sin(Math.PI*seg(t,.5,2.6))*(1-seg(t,2.4,2.8)*.2),o=1-seg(t,4.9,5.4);
  const s=lerp(2,16,g)*(1-.55*seg(t,1.6,2.6));orb.style.width=s+'rem';orb.style.height=s+'rem';orb.style.margin=(-s/2)+'rem';orb.style.opacity=seg(t,0,.2)*(1-seg(t,1.8,2.7))*o;
  rays.style.opacity=ra*o;rays.style.transform='rotate('+(t*14)+'deg) scale('+lerp(.5,1.1,seg(t,.3,2.4))+')';
  fl.style.opacity=.3*Math.max(0,1-Math.abs(t-1.5)/.22);
  dots.forEach(({d,a,r,tx,ty})=>{const k=ease.inOut(seg(t,1.2,2.6));d.style.left=(13.5+Math.cos(a)*r*(1-k)+(tx-13.5)*k)+'rem';d.style.top=(24+Math.sin(a)*r*(1-k)+(ty-24)*k)+'rem';d.style.opacity=seg(t,1.2,1.6)*(1-seg(t,2.4,2.9))*o});
  const a=ease.out(seg(t,1.9,3.1));tt.style.opacity=a*o;tt.style.filter='blur('+(1-a)*.9+'rem)';tt.style.transform='scale('+lerp(1.12,1,a)+')';
  sm.style.opacity=.8*seg(t,2.3,3)*o;v.style.opacity=ease.out(seg(t,2.9,3.6));v.style.display='inline-block';v.style.transform='translateY('+lerp(.8,0,ease.out(seg(t,2.9,3.6)))+'rem)';
});` },

{ v:6, id:'wordcuts', fa:'Fast word cuts with different backgrounds', en:'Rapid Word Cuts (Style per Word)', cat:'type',
  when:'A quick tour of several features. Each big word stays for a second and has its own background, color and decor (dot grid, code lines, cubes, circuit). Hard cuts between them with a short flash.',
  timing:'Each word 1.1 s · enters scale 1.15 to 1 with blur · hard cut · decor delayed 0.15 s',
  where:'Seconds 10.5 to 12.5', colors:['#080808','#F4F4F6','#F0845A','#D25E32','#EE7744'], dur:4.6,
  css:`.stage{background:#080808}
.sc{position:absolute;inset:0;display:none;overflow:hidden}
.w{position:absolute;left:0;right:0;top:21.5rem;text-align:center;font:800 4.4rem 'Inter Tight',sans-serif;letter-spacing:-.04em}
.fl{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}
svg.dc{position:absolute;inset:0;width:27rem;height:48rem}`,
  html:`<div class="stage" id="st"><div class="sc" id="s0" style="background:#0a0a0a;color:#fff"><svg class="dc" viewBox="0 0 27 48"><polyline id="n0" fill="none" stroke="#fff" stroke-width=".07" opacity=".7" points="3,10 9,16 15,11 22,18 24,28 16,34 8,30 3,38"/></svg><div class="w" style="text-shadow:0 0 1.2rem rgba(255,255,255,.6)">THINK</div></div><div class="sc" id="s1" style="background:#F4F4F6;color:#222"><svg class="dc" viewBox="0 0 27 48" id="ds"></svg><div class="w">WRITE</div></div><div class="sc" id="s2" style="background:radial-gradient(70% 50% at 50% 45%,#F0845A,#D25E32);color:#1a1a1a"><svg class="dc" viewBox="0 0 27 48" id="cb"></svg><div class="w">BUILD</div></div><div class="sc" id="s3" style="background:#0a0a0a;color:#fff"><svg class="dc" viewBox="0 0 27 48"><ellipse id="e1" cx="13.5" cy="24" rx="12" ry="5" fill="none" stroke="#fff" stroke-width=".07" opacity=".5"/><ellipse id="e2" cx="13.5" cy="24" rx="12" ry="5" fill="none" stroke="#fff" stroke-width=".07" opacity=".5"/></svg><div class="w" style="text-shadow:0 0 1.2rem rgba(255,255,255,.6)">IMAGINE</div></div><div class="fl" id="fl"></div></div>`,
  js:`const S=[0,1,2,3].map(i=>document.getElementById('s'+i)),ds=document.getElementById('ds'),cb=document.getElementById('cb'),fl=document.getElementById('fl'),n0=document.getElementById('n0'),e1=document.getElementById('e1'),e2=document.getElementById('e2');
ds.innerHTML=[...Array(7)].map((_,i)=>'<rect class="d" y="'+(12+i*3.4)+'" height=".5" rx=".25" fill="#EE7744"/>').join('');const ds_=[...ds.children];
cb.innerHTML=[[13.5,13],[10.5,15],[16.5,15],[7.5,17],[19.5,17],[13.5,17]].map(([x,y])=>'<g transform="translate('+x+' '+(y+14)+') scale(1.4)"><g class="cu"><polygon points="0,0 3,1.5 0,3 -3,1.5" fill="#fff"/><polygon points="-3,1.5 0,3 0,6.5 -3,5" fill="#E9E1DC"/><polygon points="3,1.5 0,3 0,6.5 3,5" fill="#bfb3ac"/></g></g>').join('');const cu=[...cb.querySelectorAll('.cu')];
const L=n0.getTotalLength?200:200;n0.style.strokeDasharray=60;
play(4.6,t=>{
  const D=1.15,i=Math.min(3,Math.floor(t/D)),u=t-i*D,a=ease.out(seg(u,0,.35));
  S.forEach((s,k)=>s.style.display=k===i?'block':'none');
  const w=S[i].querySelector('.w');w.style.transform='scale('+lerp(1.15,1,a)+')';w.style.filter='blur('+.6*(1-a)+'rem)';w.style.opacity=seg(u,0,.12);
  fl.style.opacity=.35*Math.max(0,1-u/.12)*(t>.05?1:0);
  if(i===0)n0.style.strokeDashoffset=60*(1-ease.out(seg(u,.15,.9)));
  if(i===1)ds_.forEach((r,k)=>{const x=(k*7.3)%20+(1-ease.out(seg(u,.1,.9)))*(k%2?30:-30);r.setAttribute('x',x);r.setAttribute('width',3+(k%3)*3)});
  if(i===2)cu.forEach((c,k)=>{const p=ease.back(seg(u,.1+k*.07,.5+k*.07));c.style.opacity=p>0?1:0;c.style.transform='translateY('+(1-p)*-4+'px)'});
  if(i===3){e1.setAttribute('transform','rotate('+(25+u*30)+' 13.5 24)');e2.setAttribute('transform','rotate('+(-30-u*25)+' 13.5 24)')}
});` },

{ v:6, id:'dustdissolve', fa:'Text dissolves to light dust and gathers into an orb', en:'Text → Dust → Orb Condense', cat:'fx',
  when:'A transition from a sentence to the next scene. The letters break into tiny particles, spread like a wave, then gather into a glowing orb that bursts.',
  timing:'Hold 1 s · scatter 1.8 s with spatial delay · gather 1.5 s · ~1,800 particles (canvas)',
  where:'Seconds 6 to 8.5', colors:['#080808','#FBE6C9','#F6C776','#D25E32'], dur:5.6,
  css:`.stage{background:radial-gradient(70% 40% at 50% 50%,#1b0b07,#050404)}${CNV}`,
  html:`<div class="stage"><canvas id="c" width="540" height="960"></canvas></div>`,
  js:`const cv=document.getElementById('c'),g=cv.getContext('2d'),off=document.createElement('canvas');off.width=540;off.height=960;const o=off.getContext('2d');
o.fillStyle='#fff';o.font="50px 'Instrument Serif',Georgia,serif";o.textAlign='center';o.fillText('Every legend begins',270,470);o.fillText('with a single spark.',270,535);
const d=o.getImageData(0,0,540,960).data,P=[];const rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
for(let y=0;y<960;y+=3)for(let x=0;x<540;x+=3)if(d[(y*540+x)*4+3]>128){const i=P.length;P.push({x,y,a:rnd(i)*6.283,r:40+rnd(i+7)*180,dl:x/540*.6+rnd(i+3)*.3})}
play(5.6,t=>{
  g.globalCompositeOperation='source-over';g.clearRect(0,0,540,960);g.globalCompositeOperation='lighter';
  const con=ease.inOut(seg(t,3.2,4.5)),burst=seg(t,4.3,5.3);
  P.forEach((p,i)=>{
    const s=ease.out(seg(t,1+p.dl,2.8+p.dl)),x0=p.x+Math.cos(p.a)*p.r*s,y0=p.y+Math.sin(p.a)*p.r*s-s*40;
    const sw=Math.sin(t*3+p.a)*5*s,x=lerp(x0+sw,270,con),y=lerp(y0,500,con);
    const al=(1-.55*s)*(1-burst);if(al<=.01)return;
    g.fillStyle=(i%5?'rgba(251,230,201,':'rgba(246,199,118,')+al+')';g.fillRect(x,y,2.2,2.2);
  });
  const R=(8+70*con+260*burst)*seg(t,2.8,3.6),gr=g.createRadialGradient(270,500,0,270,500,R+1);
  gr.addColorStop(0,'rgba(255,248,235,'+(1-burst*.6)+')');gr.addColorStop(.3,'rgba(246,199,118,.7)');gr.addColorStop(1,'rgba(210,94,50,0)');
  g.fillStyle=gr;g.fillRect(0,0,540,960);
});` },

{ v:6, id:'chroma', fa:'Title with chromatic aberration and a light sweep', en:'Chromatic Aberration Title + Sweep', cat:'type',
  when:'The final brand-name display. Three red/turquoise/cream layers start slightly apart and merge, a thin ring spins around, and a band of light sweeps over the title.',
  timing:'Layer split 0.5rem to 0.05rem in 1 s · light sweep 1 s · ring 8 s per turn · mix-blend: screen',
  where:'Seconds 9 to 10.5 and 14.5 to 15', colors:['#080808','#FBE6C9','#F6C776','#8E3622'], dur:4.4,
  css:`.stage{background:radial-gradient(70% 45% at 50% 50%,#8E3622 0%,#2a0f08 55%,#070505 100%)}
.ti{position:absolute;left:0;right:0;top:20.5rem;text-align:center;font:italic 400 4.6rem 'Instrument Serif',serif;white-space:nowrap}
.ti b{font-weight:400;margin-left:.6rem}
.r{color:#ff3b2f;mix-blend-mode:screen}.c{color:#2fe6ff;mix-blend-mode:screen}.k{color:#FBE6C9;text-shadow:0 0 1.4rem rgba(255,200,150,.45)}
.k b{background:linear-gradient(180deg,#F6C776,#c98a3c);-webkit-background-clip:text;background-clip:text;color:transparent}
.sw{position:absolute;left:0;right:0;top:20.5rem;height:7rem;background:linear-gradient(100deg,transparent 40%,rgba(255,255,255,.55) 50%,transparent 60%);mix-blend-mode:overlay}
svg{position:absolute;left:1.5rem;top:10rem;width:24rem;height:24rem}
.sm{position:absolute;left:0;right:0;top:19rem;text-align:center;font:600 .75rem 'Inter Tight',sans-serif;letter-spacing:.4em;color:#FBE6C9;opacity:.8}`,
  html:`<div class="stage"><svg viewBox="0 0 100 100" id="rg"><circle cx="50" cy="50" r="48" fill="none" stroke="#D25E32" stroke-width=".35" stroke-dasharray="90 220"/></svg><div class="sm">NORTHSTAR</div><div class="ti r" id="r">Legend<b>2.0</b></div><div class="ti c" id="c">Legend<b>2.0</b></div><div class="ti k" id="k">Legend<b>2.0</b></div><div class="sw" id="sw"></div></div>`,
  js:`const r=document.getElementById('r'),c=document.getElementById('c'),k=document.getElementById('k'),sw=document.getElementById('sw'),rg=document.getElementById('rg');
play(4.4,t=>{
  const a=ease.out(seg(t,0,1)),dx=lerp(.5,.05,a)+.03*Math.sin(t*6),o=1-seg(t,3.9,4.4);
  [r,c,k].forEach(e=>{e.style.opacity=seg(t,0,.3)*o});
  r.style.transform='translateX('+(-dx)+'rem)';c.style.transform='translateX('+dx+'rem)';
  k.style.filter='blur('+lerp(.5,0,a)+'rem)';
  sw.style.transform='translateX('+lerp(-27,27,ease.inOut(seg(t,1.4,2.6)))+'rem)';sw.style.opacity=o;
  rg.style.transform='rotate('+(t*45)+'deg)';rg.style.opacity=.8*seg(t,.2,.8)*o;
});` }
);

/* ---- VIDEOS entries 4-6 ---- */
VIDEOS.push(
{ id:'v4', n:4, title:'Liquid glass: Apple-like interface', meta:'14 seconds · 720×1280 · a Liquid Glass animation for an app menu',
  mood:'Calm, soft and premium. A dark navy-blue background, frosted white glass, a lavender glowing indicator, one green accent for selection. All motion is liquid: one element\'s shape flows into another\'s.',
  rules:[
    'There are no cuts: the glass pill becomes the panel, the panel becomes the rows, and the selected row becomes the big icon (morph).',
    'A glass surface always has four things: 1.2rem blur, a 30% white border, an inner highlight on top and a soft shadow below.',
    'The indicator is a lavender glowing orb that highlights the row beneath it (bigger and brighter).',
    'Selection is shown by changing the world: the icon takes the brand color and the background changes.',
    'The ending is a vertical blur streak over a serif logotype on pure black.'
  ],
  palette:[
    { g:'Background', c:[['#081828','Dark navy'],['#182848','Dark blue'],['#364A6E','Mid blue'],['#2A4272','Halo'],['#425A96','Light halo'],['#080808','Closing black']] },
    { g:'Glass and indicator', c:[['#FFFFFF','Glass (12 to 26%)'],['#BCC8E8','Glowing indicator'],['#CAD2F2','Glow edge']] },
    { g:'Accent', c:[['#12C24A','Icon green'],['#1E3672','Beach blue'],['#2A4E8A','Mid blue']] }
  ] },
{ id:'v5', n:5, title:'Minimal explainer: white and green', meta:'26 seconds · 720×1280 · typography and infographic motion for a marketing message',
  mood:'Clean and playful. A near-white ground, one vivid unchanged green, black text. A sharp sans-serif mixed with an italic serif for important words. Motion is fast and full of motion blur.',
  rules:[
    'Only three colors: white #FDFDFD, green #0EBE02 and black. Other grays are only for secondary text.',
    'Each sentence enters with letter-by-letter typing or blur, and its key word turns green or an italic serif.',
    'Infographics are built from simple elements: a clock, a person icon, a card, a number ring, a hexagon.',
    'A very pale green halo (#E8F8E8) behind the text, or big blurred rings in the background.',
    'Each scene is 3 to 5 seconds and moves to the next with a blur fade. It ends with a simple black logo.'
  ],
  palette:[
    { g:'Ground', c:[['#FDFDFD','White'],['#E8F8E8','Green halo'],['#E6F6E6','Background ring'],['#D8D8D8','Crack gray']] },
    { g:'Main green', c:[['#0EBE02','Main green'],['#0EA202','Dark green'],['#12BE02','Solid pill'],['#47C43B','Light green']] },
    { g:'Text', c:[['#111111','Black'],['#787878','Text gray'],['#A0A0A0','Inactive text']] }
  ] },
{ id:'v6', n:6, title:'Cinematic light typography', meta:'15 seconds · 1276×720 (landscape) · a product intro with light and particles',
  mood:'Cinematic, warm and grand. Black with an orange-brown halo, a cream light orb, a fine serif with an italic gold word. In the middle of the video several big sans-serif words cut quickly on different backgrounds.',
  rules:[
    'Everything starts from one point of light and returns to it; the wavy line, the rays and the particles all come from the orb.',
    'Serif text enters with blur and a rise; the gold word is always at the end of the sentence.',
    'Blend mode lighter (screen) for the light, and a red/turquoise split on the title.',
    'The middle section is fast cuts of big words: each word has its own background color and decor.',
    'Note: this video is landscape; the demos were adapted to a 9:16 scene, and the landscape version is built with the same code on a larger canvas.'
  ],
  palette:[
    { g:'Ground', c:[['#080808','Black'],['#180808','Warm black'],['#281818','Dark brown'],['#8E3622','Red-orange halo'],['#BB5735','Orange']] },
    { g:'Light', c:[['#FBE6C9','Cream (text and core)'],['#F6C776','Gold'],['#D25E32','Orb edge'],['#FE8E4E','Ray']] },
    { g:'Word cuts', c:[['#F4F4F6','White'],['#F0845A','Peach'],['#EE7744','Script lines']] }
  ] }
);

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 4: liquid glass */
  --lg-bg:#081828; --lg-blue:#182848; --lg-blue-2:#364A6E; --lg-cursor:#BCC8E8; --lg-green:#12C24A;
  /* video 5: white + green explainer */
  --ex-bg:#FDFDFD; --ex-green:#0EBE02; --ex-green-dark:#0EA202; --ex-halo:#E8F8E8; --ex-ink:#111111; --ex-grey:#787878;
  /* video 6: cinematic light type */
  --cin-void:#080808; --cin-glow:#8E3622; --cin-orange:#D25E32; --cin-cream:#FBE6C9; --cin-gold:#F6C776;
}`);
