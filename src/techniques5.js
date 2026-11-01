/* ===== Videos 7-9: neon-lime motion on black, editorial red-circle collage, motion-designer reel ===== */
const DOTS = `background-image:radial-gradient(#2c2c2c 1px,transparent 1.5px);background-size:1.6rem 1.6rem`;

TECHS.push(
/* ================= VIDEO 7: neon lime on black ================= */
{ v:7, id:'neonslam', fa:'کوبیدن کلمه‌ها با نئون لیمویی', en:'Neon Word Slam (Stacked)', cat:'type',
  when:'گفتار پرانرژی. دو کلمه‌ی درشت روی هم؛ بالا سفید، پایین لیمویی نئون (یا صورتی برای تغییر لحن). هر جمله با ضربه‌ی scale و بلور میاد و با برش می‌ره.',
  timing:'هر جمله ۱ ثانیه · scale ۱٫۶ به ۱ در ۰٫۲۵ ثانیه · expo · گلو ۱٫۲rem · ستاره‌ی کوچک روی حرف',
  where:'ثانیه ۰ تا ۸', colors:['#080808','#FFFFFF','#E5ED35','#FE4EE2'], dur:4.4,
  css:`.stage{background:#080808;${DOTS}}
.ph{position:absolute;left:0;right:0;text-align:center;font:800 4.6rem/.95 'Inter Tight',sans-serif;letter-spacing:-.04em;text-transform:uppercase;display:none}
.ph div{display:block}
.ph .l{color:#E5ED35;text-shadow:0 0 1.4rem rgba(229,237,53,.7)}
.ph .p{color:#FE4EE2;text-shadow:0 0 1.4rem rgba(254,78,226,.7)}
.ph .w{color:#fff}
.sm{position:absolute;left:0;right:0;top:30.5rem;text-align:center;font:600 .7rem 'Inter Tight',sans-serif;letter-spacing:.3em;color:#777}`,
  html:`<div class="stage"><div class="ph" id="p0" style="top:18rem"><div class="w">HOLY</div><div class="l">SH*T</div></div><div class="ph" id="p1" style="top:18rem"><div class="w">NOT</div><div class="l">READY</div></div><div class="ph" id="p2" style="top:20.5rem"><div class="w" style="display:inline">AND </div><div class="p" style="display:inline">NO,</div></div><div class="sm" id="sm">PRODUCED FOR LINKEDIN</div></div>`,
  js:`const P=[0,1,2].map(i=>document.getElementById('p'+i)),sm=document.getElementById('sm');
play(4.4,t=>{
  const D=1.4,i=Math.min(2,Math.floor(t/D)),u=t-i*D,a=ease.expo(seg(u,0,.35)),o=1-seg(u,1.2,1.4)*(i<2?1:seg(t,4,4.4));
  P.forEach((p,k)=>p.style.display=k===i?'block':'none');
  const p=P[i];p.style.transform='scale('+lerp(1.6,1,a)+')';p.style.filter='blur('+.6*(1-a)+'rem)';p.style.opacity=seg(u,0,.08)*o;
  const l=p.children[1];if(l&&i<2)l.style.transform='translateX('+lerp(i?3:-3,0,ease.out(seg(u,.1,.5)))+'rem)';
  sm.style.opacity=i===0?seg(u,.4,.8)*o:0;
});` },

{ v:7, id:'hlprompt', fa:'پنجره‌ی پرامپت با هایلایت لیمویی', en:'Prompt Box + Highlighter Tokens', cat:'ui',
  when:'نشون‌دادن یک دستور یا کد. یک کادر حاشیه‌ای روی شبکه‌ی نقطه‌ای، متن تایپ می‌شه و کلمه‌های مهم با نوار لیمویی ماژیک‌خورده می‌شن (متن روی نوار مشکی می‌شه).',
  timing:'تایپ ۲٫۴ ثانیه · هایلایت هر توکن ۰٫۳ ثانیه wipe چپ به راست · کرسر ۱ هرتز · کادر ۰٫۶ ثانیه باز می‌شه',
  where:'ثانیه ۱۳ تا ۲۵', colors:['#080808','#E5ED35','#FFFFFF','#2C2C2C'], dur:5.6,
  css:`.stage{background:#080808;${DOTS};font-family:'Inter Tight',sans-serif}
.hd{position:absolute;left:2.5rem;top:12rem;font:800 1.6rem 'Inter Tight',sans-serif;color:#fff;letter-spacing:-.02em}
.bx{position:absolute;left:2.5rem;right:2.5rem;top:15rem;height:15rem;border:.12rem solid #E5ED35;border-radius:.8rem;box-shadow:0 0 1.2rem rgba(229,237,53,.25);padding:1.3rem;font:500 1.2rem/2 'Inter Tight',sans-serif;color:#fff}
.tk{position:relative;display:inline-block}
.tk i{position:absolute;left:-.15rem;right:-.15rem;top:.25rem;bottom:.25rem;background:#E5ED35;transform-origin:left;z-index:0}
.tk b{position:relative;z-index:1;font-weight:500}
.cr{display:inline-block;width:.1rem;height:1.2rem;background:#fff;vertical-align:-.2rem}`,
  html:`<div class="stage"><div class="hd" id="hd">THE PROMPT:</div><div class="bx" id="bx"><span id="tx"></span><span class="cr" id="cr"></span></div></div>`,
  js:`const parts=[['Create a '],['kinetic','h'],[' title with '],['glowing','h'],[' lime '],['strokes','h'],[' and a fluid camera move.']];
const full=parts.map(p=>p[0]).join(''),tx=document.getElementById('tx'),cr=document.getElementById('cr'),bx=document.getElementById('bx'),hd=document.getElementById('hd');
play(5.6,t=>{
  const n=Math.round(ease.inOut(seg(t,.8,3.4))*full.length),o=1-seg(t,5.1,5.6);let used=0,h='',hi=0;
  parts.forEach(p=>{const len=p[0].length,take=Math.max(0,Math.min(len,n-used));used+=len;const s=p[0].slice(0,take);
    if(p[1]){const k=ease.out(seg(t,1.2+hi*.9+.5,1.6+hi*.9+.5)),done=take===len;h+='<span class="tk"><i style="transform:scaleX('+(done?k:0)+')"></i><b style="color:'+(k>.5?'#080808':'#fff')+'">'+s+'</b></span>';hi++}else h+=s});
  tx.innerHTML=h;cr.style.opacity=(Math.floor(t*2)%2)?0:1;
  const a=ease.out(seg(t,.1,.7));bx.style.opacity=a*o;bx.style.transform='scaleY('+lerp(.7,1,a)+')';hd.style.opacity=seg(t,0,.5)*o;
});` },

{ v:7, id:'colorflood', fa:'پر‌شدن صفحه با رنگ و تیتر کشیده', en:'Color Flood + Stretched Headline', cat:'fx',
  when:'ضربه‌ی احساسی وسط ویدیو. کل صفحه ناگهان لیمویی می‌شه و یک کلمه‌ی مشکی خیلی درشت روی افقی کشیده می‌شه و سر جاش می‌نشینه، حس «کشیدگی» حرکت رو منتقل می‌کنه.',
  timing:'پر‌شدن ۰٫۳ ثانیه (clip دایره‌ای) · کشیدگی scaleX ۱٫۸ به ۱ در ۰٫۶ ثانیه · back-ease · نگه‌داری ۱٫۵ ثانیه',
  where:'ثانیه ۲۶ تا ۲۸', colors:['#E5ED35','#080808'], dur:3.6,
  css:`.stage{background:#080808;${DOTS}}
.fl{position:absolute;inset:0;background:#E5ED35;clip-path:circle(0% at 50% 50%)}
.w{position:absolute;left:0;right:0;top:21rem;text-align:center;font:800 5rem 'Inter Tight',sans-serif;letter-spacing:-.04em;color:#080808;text-transform:uppercase}
.s{position:absolute;left:0;right:0;top:27.5rem;text-align:center;font:600 .7rem 'Inter Tight',sans-serif;letter-spacing:.3em;color:#080808}`,
  html:`<div class="stage"><div class="fl" id="fl"></div><div class="w" id="w">STRETCH.</div><div class="s" id="s">SEAMLESS MOTION</div></div>`,
  js:`const fl=document.getElementById('fl'),w=document.getElementById('w'),s=document.getElementById('s');
play(3.6,t=>{
  const f=ease.expo(seg(t,.2,.6)),a=ease.back(seg(t,.35,1)),o=1-seg(t,3.2,3.6);
  fl.style.clipPath='circle('+(f*80)+'% at 50% 50%)';fl.style.opacity=o;
  w.style.opacity=seg(t,.3,.5)*o;w.style.transform='scaleX('+lerp(1.9,1,a)+') scaleY('+lerp(.7,1,a)+')';w.style.filter='blur('+.5*(1-seg(t,.35,.8))+'rem)';
  s.style.opacity=seg(t,.9,1.3)*o;
});` },

{ v:7, id:'timerrows', fa:'ردیف‌های پشته‌ای با شمارنده‌ی ساعت', en:'Stacking Rows + Hour Counter', cat:'data',
  when:'نشون‌دادن حجم کار یا زمان («۱۶ ساعت کار»). برچسب‌های حاشیه‌ی صورتی یکی‌یکی از پایین می‌ان و همراهشون یه عدد صورتی بزرگ بالا می‌ره: ۲، ۹، ۱۳، ۱۶ ساعت.',
  timing:'هر ردیف ۰٫۵ ثانیه با فاصله‌ی ۰٫۷ · پشته با spring · عدد با تأخیر ۰٫۱ پله‌ای عوض می‌شه · پایان با ریزش ردیف‌ها',
  where:'ثانیه ۳۳ تا ۴۰', colors:['#080808','#FE4EE2','#E5ED35','#FFFFFF'], dur:5.2,
  css:`.stage{background:#080808;${DOTS}}
.hd{position:absolute;left:0;right:0;top:9rem;text-align:center;font:800 1.4rem 'Inter Tight',sans-serif;letter-spacing:.02em;color:#fff}
.hd b{color:#E5ED35;text-shadow:0 0 .8rem rgba(229,237,53,.6)}
.rw{position:absolute;left:2.5rem;width:12rem;height:2.4rem;border:.1rem solid #FE4EE2;border-radius:.5rem;padding:0 .8rem;display:flex;align-items:center;justify-content:space-between;font:700 .85rem 'Inter Tight',sans-serif;letter-spacing:.06em;color:#fff;box-shadow:0 0 .8rem rgba(254,78,226,.35)}
.rw i{width:2rem;height:.9rem;border-radius:.45rem;background:#FE4EE2}
.n{position:absolute;right:2.5rem;top:18rem;font:800 3.8rem 'Inter Tight',sans-serif;letter-spacing:-.04em;color:#FE4EE2;text-shadow:0 0 1.4rem rgba(254,78,226,.7)}`,
  html:`<div class="stage"><div class="hd">YOUR <b>WORKFLOW</b></div><div class="n" id="n">2H</div></div>`,
  js:`const st=document.querySelector('.stage'),L=['AFTER EFFECTS','LAYERS','KEYFRAMES','GRAPH EDITOR','RENDER'],H=[2,5,9,13,16],n=document.getElementById('n');
const rows=L.map(l=>{const d=document.createElement('div');d.className='rw';d.innerHTML=l+'<i></i>';st.appendChild(d);return d});
play(5.2,t=>{
  const o=1-seg(t,4.5,5.1);let cnt=0;rows.forEach((r,i)=>{if(ease.back(seg(t,.4+i*.7,.9+i*.7))>.3)cnt=i+1});
  rows.forEach((r,i)=>{const a=ease.back(seg(t,.4+i*.7,.9+i*.7));
    const pos=cnt-1-i; /* 0 = newest (bottom) */
    r.style.top=(31-Math.max(0,pos)*3.1)+'rem';
    r.style.opacity=seg(t,.4+i*.7,.6+i*.7)*o;r.style.transform='translateY('+lerp(3,0,a)+'rem) scale('+lerp(.9,1,a)+')'});
  n.textContent=(cnt?H[cnt-1]:0)+'H';n.style.opacity=seg(t,.3,.7)*o;n.style.transform='scale('+(1+.08*Math.max(0,1-((t-(.4+(cnt-1)*.7))*4)))+')';
});` },

{ v:7, id:'nodeflow', fa:'زنجیره‌ی نودها با توپ نورانی و قوس', en:'Node Chain + Glowing Ball Arc', cat:'layout',
  when:'توضیح یک پایپ‌لاین (ورودی ← پرامپت ← خروجی). جعبه‌های حاشیه‌لیمویی با خط وصل می‌شن، یک توپ نورانی از میون‌شون رد می‌شه و هر کدوم رو روشن می‌کنه؛ در پایان توپ روی یک قوس خط‌چین به مقصد می‌پره.',
  timing:'هر نود ۰٫۵ ثانیه · توپ ۰٫۸ ثانیه بین نودها · قوس ۱٫۴ ثانیه · نود فعال scale ۱٫۰۶ و گلو',
  where:'ثانیه ۱۰ تا ۱۴ و ۴۲ تا ۴۹', colors:['#080808','#E5ED35','#FFFFFF','#2C2C2C'], dur:6,
  css:`.stage{background:#080808;${DOTS}}
.nd{position:absolute;top:19rem;width:6.6rem;height:2.6rem;border:.1rem solid #E5ED35;border-radius:.4rem;display:flex;align-items:center;justify-content:center;font:700 .75rem 'Inter Tight',sans-serif;letter-spacing:.08em;color:#fff;background:#0b0b0b}
.ba{position:absolute;width:1rem;height:1rem;margin:-.5rem;border-radius:50%;background:#E5ED35;box-shadow:0 0 1rem .3rem rgba(229,237,53,.8)}
svg{position:absolute;left:0;top:0;width:27rem;height:48rem}`,
  html:`<div class="stage"><svg viewBox="0 0 27 48"><line x1="9.5" y1="20.3" x2="11" y2="20.3" stroke="#E5ED35" stroke-width=".12"/><path id="arc" d="M5 36Q13.5 22 22 33" fill="none" stroke="#E5ED35" stroke-width=".1" stroke-dasharray=".5 .4"/></svg><div class="ba" id="ba"></div></div>`,
  js:`const st=document.querySelector('.stage'),X=[1.4,10.2,19],T=['KATANA','PROMPT','GENERATE'],ba=document.getElementById('ba'),arc=document.getElementById('arc'),svg=document.querySelector('svg');
const nd=X.map((x,i)=>{const d=document.createElement('div');d.className='nd';d.style.left=x+'rem';d.textContent=T[i];st.insertBefore(d,ba);return d});
const L=arc.getTotalLength();
// connectors between nodes
const ln=[0,1].map(i=>{const l=document.createElementNS('http://www.w3.org/2000/svg','line');l.setAttribute('x1',X[i]+6.6);l.setAttribute('x2',X[i+1]);l.setAttribute('y1',20.3);l.setAttribute('y2',20.3);l.setAttribute('stroke','#E5ED35');l.setAttribute('stroke-width','.12');svg.appendChild(l);return l});
play(6,t=>{
  const o=1-seg(t,5.5,6);
  nd.forEach((d,i)=>{const a=ease.back(seg(t,.2+i*.35,.7+i*.35)),act=Math.max(0,1-Math.abs(t-(1.5+i*.9))*1.8);d.style.opacity=seg(t,.2+i*.35,.4+i*.35)*o;d.style.transform='scale('+(a*(1+.06*act))+')';d.style.boxShadow='0 0 '+(.4+1.4*act)+'rem rgba(229,237,53,'+(.2+.6*act)+')';d.style.background=act>.5?'#E5ED35':'#0b0b0b';d.style.color=act>.5?'#080808':'#fff'});
  ln.forEach((l,i)=>l.style.opacity=seg(t,.9+i*.3,1.2+i*.3)*o);
  let x,y,bo=seg(t,1,1.3)*(1-seg(t,4.7,5));
  if(t<3.2){const u=clamp((t-1.5)/1.8)*2,i=Math.min(1,Math.floor(u)),k=ease.inOut(u-i);x=lerp(X[i]+3.3,X[i+1]+3.3,k);y=20.3-Math.sin(k*Math.PI)*.4}
  else{const k=ease.inOut(seg(t,3.2,4.6)),p=arc.getPointAtLength(L*k);x=p.x;y=p.y;bo=Math.min(bo,seg(t,3.1,3.3))*1}
  ba.style.left=x+'rem';ba.style.top=y+'rem';ba.style.opacity=bo*o;
  arc.style.opacity=seg(t,3,3.4)*o;
});` },

/* ================= VIDEO 8: editorial collage ================= */
{ v:8, id:'posterred', fa:'پوستر کلاژی با دایره‌ی قرمز', en:'Editorial Poster: Red Circle Collage', cat:'layout',
  when:'شروع پرحس‌وحال. پس‌زمینه‌ی خاکستری روشن، دایره‌ی قرمز بزرگ، سوژه‌ی سیاه‌وسفید، حلقه‌های نازک و متن‌های ریز؛ لایه‌ها با پارالاکس و ورود متفاوت جا می‌افتن.',
  timing:'دایره scale ۰ به ۱ در ۰٫۷ ثانیه (expo) · سوژه ۰٫۹ ثانیه از پایین · نقطه‌ی قرمز می‌چرخه ۸ ثانیه/دور · متن‌های ریز با تأخیر',
  where:'ثانیه ۰ تا ۳', colors:['#D8D8D8','#B8B8B8','#D21212','#7E0606','#080808'], dur:4.8,
  css:`.stage{background:radial-gradient(90% 60% at 50% 40%,#E8E8E8,#B8B8B8 80%);font-family:'Inter Tight',sans-serif;color:#222}
.rc{position:absolute;left:11rem;top:22rem;width:19rem;height:19rem;margin:-9.5rem;border-radius:50%;background:#D21212;box-shadow:inset -1.5rem -2rem 3rem rgba(126,6,6,.5)}
.ring{position:absolute;left:14rem;top:26rem;width:25rem;height:25rem;margin:-12.5rem;border-radius:50%;border:1px dashed #D21212}
.dt{position:absolute;width:1.4rem;height:1.4rem;margin:-.7rem;border-radius:50%;background:#D21212}
.fg{position:absolute;left:5rem;top:23rem;width:11rem;height:17rem}
.fg i{position:absolute;left:3.6rem;top:0;width:5rem;height:5.5rem;border-radius:48%;background:#2c2c2c}
.fg b{position:absolute;left:1rem;top:5rem;width:9rem;height:12rem;border-radius:40% 40% 0 0;background:#1b1b1b}
.mt{position:absolute;font-size:.5rem;line-height:1.5;letter-spacing:.05em;color:#555;text-transform:uppercase}
.big{position:absolute;left:1.5rem;top:12rem;font:700 2.7rem/1 'Inter Tight',sans-serif;letter-spacing:-.04em;color:#fff;text-shadow:0 .1rem .8rem rgba(0,0,0,.6)}
.bc{position:absolute;right:2rem;top:5rem;display:flex;gap:.12rem}
.bc i{display:block;width:.12rem;height:3rem;background:#222}`,
  html:`<div class="stage"><div class="ring" id="ring"></div><div class="rc" id="rc"></div><div class="dt" id="dt"></div><div class="fg" id="fg"><i></i><b></b></div><div class="mt" id="m1" style="left:1.5rem;top:3rem">OHH BABY<br>editorial series</div><div class="mt" id="m2" style="right:2rem;top:3rem">second round</div><div class="bc" id="bc"></div><div class="big" id="big">getting good<br>at editing</div></div>`,
  js:`const rc=document.getElementById('rc'),ring=document.getElementById('ring'),dt=document.getElementById('dt'),fg=document.getElementById('fg'),m1=document.getElementById('m1'),m2=document.getElementById('m2'),bc=document.getElementById('bc'),big=document.getElementById('big');
bc.innerHTML=[...Array(14)].map((_,i)=>'<i style="width:'+(i%3?'.12rem':'.28rem')+'"></i>').join('');
play(4.8,t=>{
  const a=ease.expo(seg(t,.1,.8)),f=ease.out(seg(t,.3,1.2)),o=1-seg(t,4.3,4.8);
  rc.style.transform='scale('+a+')';rc.style.opacity=o;ring.style.opacity=seg(t,.3,.8)*o;ring.style.transform='rotate('+(t*20)+'deg)';
  const an=t*.8;dt.style.left=(14+12.5*Math.cos(an))+'rem';dt.style.top=(26+12.5*Math.sin(an))+'rem';dt.style.opacity=seg(t,.6,1)*o;
  fg.style.transform='translateY('+lerp(8,0,f)+'rem)';fg.style.opacity=f*o;
  [m1,m2,bc].forEach((e,i)=>e.style.opacity=seg(t,.8+i*.2,1.2+i*.2)*o);
  const w=seg(t,1.4,2.2);big.style.opacity=w*o;big.style.filter='blur('+(1-w)*.6+'rem)';big.style.transform='translateY('+(1-w)*1.2+'rem)';
});` },

{ v:8, id:'bleedtext', fa:'متن غول‌پیکر بریده‌شده پشت سوژه', en:'Giant Cropped Type Behind Subject', cat:'type',
  when:'تاکید روی یک کلمه‌ی کلیدی (مثلاً «SKILLS»). کلمه به‌اندازه‌ی چند برابر کادر می‌شه و از لبه‌ی پایین بیرون می‌زنه، آهسته می‌لغزه؛ جلوش یک جمله‌ی سفید با blend می‌شینه.',
  timing:'اسلاید افقی ۲ ثانیه · ease-out · کلمه از پایین ۱ ثانیه بالا می‌آید · جمله‌ی جلو با بلور ۰٫۵ ثانیه',
  where:'ثانیه ۱٫۳ تا ۳', colors:['#D8D8D8','#D21212','#080808','#FFFFFF'], dur:4,
  css:`.stage{background:radial-gradient(90% 60% at 50% 40%,#E8E8E8,#B8B8B8 80%);font-family:'Inter Tight',sans-serif}
.rr{position:absolute;left:6rem;top:10rem;width:14rem;height:20rem;background:#D21212}
.fr{position:absolute;left:5rem;top:9rem;width:16rem;height:22rem;border:1px solid #D21212}
.bg{position:absolute;left:-6rem;top:33rem;font:800 14rem/1 'Inter Tight',sans-serif;letter-spacing:-.06em;color:#080808;white-space:nowrap}
.ob{position:absolute;left:3.5rem;top:19rem;width:13rem;height:9rem;border-radius:50%;background:radial-gradient(circle at 40% 40%,#bdbdbd,#6b6b6b 70%,#2d2d2d)}
.sn{position:absolute;left:0;right:0;top:20rem;text-align:center;color:#fff;font:600 2.2rem/1 'Inter Tight',sans-serif;letter-spacing:-.04em;text-shadow:0 .1rem 1rem rgba(0,0,0,.7)}`,
  html:`<div class="stage"><div class="fr" id="fr"></div><div class="rr" id="rr"></div><div class="ob" id="ob"></div><div class="bg" id="bg">SKILLS SKILLS</div><div class="sn" id="sn">it's not about<br>the skills</div></div>`,
  js:`const rr=document.getElementById('rr'),fr=document.getElementById('fr'),ob=document.getElementById('ob'),bg=document.getElementById('bg'),sn=document.getElementById('sn');
play(4,t=>{
  const a=ease.out(seg(t,0,1)),s=ease.out(seg(t,0,2.4)),o=1-seg(t,3.5,4);
  rr.style.transform='translateX('+lerp(14,0,a)+'rem)';fr.style.transform='translateX('+lerp(18,0,ease.out(seg(t,.1,1.1)))+'rem)';rr.style.opacity=fr.style.opacity=o;
  ob.style.transform='translate('+lerp(10,0,a)+'rem,'+(Math.sin(t*1.5)*.3)+'rem) scale('+lerp(.8,1,a)+')';ob.style.opacity=seg(t,.1,.5)*o;
  bg.style.transform='translate('+lerp(4,-6,s)+'rem,'+lerp(10,0,ease.out(seg(t,.4,1.4)))+'rem)';bg.style.opacity=o;
  const w=ease.out(seg(t,.8,1.5));sn.style.opacity=w*o;sn.style.filter='blur('+(1-w)*.6+'rem)';sn.style.transform='translateX('+lerp(-2,0,w)+'rem)';
});` },

{ v:8, id:'twosize', fa:'کپشن دوسایزه روی سیاه با سیاره', en:'Two-Size Caption + Planet Cut', cat:'type',
  when:'گفتار روایی. کلمه‌ی ربط کوچک و سبک، کلمه‌ی اصلی درشت و فشرده (tracking منفی). بعد از هر عبارت برش مستقیم به صحنه‌ی بعد؛ زمینه‌ی سیاه با کره‌ای کم‌نور.',
  timing:'هر عبارت ۱٫۲ ثانیه · کلمه‌ی کوچک اول ۰٫۲ ثانیه · کلمه‌ی بزرگ با بلور ۰٫۴ ثانیه · برش مستقیم',
  where:'ثانیه ۳ تا ۴٫۳', colors:['#080808','#FFFFFF','#888888'], dur:3.6,
  css:`.stage{background:#000;font-family:'Inter Tight',sans-serif;color:#fff}
.pl{position:absolute;left:-12rem;bottom:-12rem;width:26rem;height:26rem;border-radius:50%;background:radial-gradient(circle at 70% 25%,#9aa3ad 0,#4a5058 22%,#14161a 48%,#000 70%);box-shadow:-.3rem -.3rem 1.2rem rgba(180,200,230,.35)}
.pl2{position:absolute;right:-5rem;top:-6rem;width:12rem;height:12rem;border-radius:50%;border:.15rem solid rgba(255,255,255,.55);border-left-color:transparent;border-bottom-color:transparent;transform:rotate(30deg)}
.ph{position:absolute;left:0;right:0;top:20rem;text-align:center;display:none}
.ph small{display:block;font:400 1.5rem 'Inter Tight',sans-serif;color:#d8d8d8;letter-spacing:-.03em}
.ph b{display:block;font:600 3.2rem/1 'Inter Tight',sans-serif;letter-spacing:-.06em}`,
  html:`<div class="stage"><div class="pl"></div><div class="pl2"></div><div class="ph" id="a"><small>it's about</small><b style="color:#888">you</b></div><div class="ph" id="b"><small>it's about how</small><b>you absorb</b></div></div>`,
  js:`const A=document.getElementById('a'),B=document.getElementById('b');
play(3.6,t=>{
  const i=t<1.5?0:1,u=i?t-1.5:t,p=i?B:A,s=ease.out(seg(u,.15,.5)),bg=ease.out(seg(u,.4,.85)),o=1-seg(t,3.2,3.6);
  A.style.display=i?'none':'block';B.style.display=i?'block':'none';
  p.firstChild.style.opacity=s*o;p.firstChild.style.transform='translateY('+lerp(.8,0,s)+'rem)';
  p.lastChild.style.opacity=bg*o;p.lastChild.style.filter='blur('+(1-bg)*.6+'rem)';p.lastChild.style.transform='translateY('+lerp(1.4,0,bg)+'rem) scale('+lerp(1.12,1,bg)+')';
  p.lastChild.style.color=(i===0&&bg<1)?'#888':'#fff';
});` },

{ v:8, id:'cornerhud', fa:'قاب HUD گوشه‌ای با تگ کوچک', en:'Corner HUD Frame + Micro Tag', cat:'layout',
  when:'صحنه‌ی تاریک با یک شیء بزرگ. خط‌های L شکل در گوشه‌ها کشیده می‌شن، یک تگ کوچک با نوار لیمویی بالای کادر می‌شینه و عنوان دو‌سایزه پایین میاد.',
  timing:'خطوط گوشه ۰٫۷ ثانیه کشیده می‌شن · تگ ۰٫۴ ثانیه · عنوان ۰٫۵ ثانیه با بلور · شیء با شناوری ±۰٫۴rem',
  where:'ثانیه ۸٫۵ تا ۱۰٫۵', colors:['#000000','#FFFFFF','#DAEA32','#888888'], dur:4.2,
  css:`.stage{background:#000;font-family:'Inter Tight',sans-serif;color:#fff}
.cn{position:absolute;width:5rem;height:7rem;border:0 solid #fff}
.tg{position:absolute;left:2.5rem;top:3rem;font:600 .55rem/1.3 'Inter Tight',sans-serif;letter-spacing:.12em;color:#fff;border:1px solid #fff;padding:.3rem .5rem}
.tg i{display:block;height:.35rem;margin-top:.25rem;background:#DAEA32}
.ob{position:absolute;left:5rem;top:27rem;width:18rem;height:7rem;border-radius:.8rem;background:linear-gradient(180deg,#e9e9e9,#8a8a8a 45%,#2d2d2d);transform:rotate(-14deg);box-shadow:0 1.4rem 2rem rgba(0,0,0,.8)}
.ob:after{content:'';position:absolute;right:-1rem;top:1.2rem;width:5rem;height:5rem;border-radius:50%;background:radial-gradient(circle at 40% 35%,#cfcfcf,#444 60%,#111)}
.ph{position:absolute;left:0;right:0;top:15rem;text-align:center}
.ph small{display:block;font:400 1.1rem 'Inter Tight',sans-serif;color:#cfcfcf;letter-spacing:-.02em}
.ph b{display:block;font:600 2.6rem/1 'Inter Tight',sans-serif;letter-spacing:-.05em}`,
  html:`<div class="stage"><div class="cn" id="c1" style="left:2rem;bottom:6rem"></div><div class="cn" id="c2" style="right:2rem;top:3rem"></div><div class="tg" id="tg">DISCOVER<i></i></div><div class="ob" id="ob"></div><div class="ph" id="ph"><small>studying the</small><b>the work</b></div></div>`,
  js:`const c1=document.getElementById('c1'),c2=document.getElementById('c2'),tg=document.getElementById('tg'),ob=document.getElementById('ob'),ph=document.getElementById('ph');
play(4.2,t=>{
  const a=ease.out(seg(t,.1,.8)),o=1-seg(t,3.7,4.2),b=ease.out(seg(t,1,1.7));
  c1.style.borderLeftWidth=c1.style.borderBottomWidth='.12rem';c1.style.width=lerp(0,5,a)+'rem';c1.style.height=lerp(0,7,a)+'rem';
  c2.style.borderRightWidth=c2.style.borderTopWidth='.12rem';c2.style.width=lerp(0,5,a)+'rem';c2.style.height=lerp(0,7,a)+'rem';c1.style.opacity=c2.style.opacity=o;
  tg.style.opacity=ease.out(seg(t,.5,.9))*o;tg.style.transform='translateY('+lerp(-.8,0,ease.out(seg(t,.5,.9)))+'rem)';
  ob.style.transform='translate('+lerp(-10,0,ease.out(seg(t,0,1.2)))+'rem,'+Math.sin(t*1.8)*.4+'rem) rotate(-14deg)';ob.style.opacity=seg(t,0,.3)*o;
  ph.style.opacity=b*o;ph.style.filter='blur('+(1-b)*.5+'rem)';ph.style.transform='translateY('+lerp(1.5,0,b)+'rem)';
});` },

/* ================= VIDEO 9: motion-designer reel on a laptop ================= */
{ v:9, id:'dotline', fa:'نقطه ← خط ← فلاش رنگی ← عنوان', en:'Dot → Line → Color Flash → Title', cat:'fx',
  when:'اوپنر ریل. یک نقطه‌ی کوچک نارنجی وسط شبکه‌ی تیره می‌ایسته، به خط افقی کشیده می‌شه، خط می‌ترکه و کل صفحه نارنجی می‌شه و عنوان از وسط باز می‌شه.',
  timing:'نقطه ۰٫۳ ثانیه · خط ۰٫۶ ثانیه (scaleX expo) · انفجار رنگ ۰٫۴ ثانیه · عنوان با ماسک عمودی ۰٫۶ ثانیه',
  where:'ثانیه ۰ تا ۳', colors:['#0A0F1E','#F65A0E','#D8480C','#080808'], dur:4.2,
  css:`.stage{background:#0A0F1E;background-image:linear-gradient(#18203a 1px,transparent 1px),linear-gradient(90deg,#18203a 1px,transparent 1px);background-size:3rem 3rem;font-family:'Inter Tight',sans-serif}
.dt{position:absolute;left:13.5rem;top:24rem;width:.8rem;height:.8rem;margin:-.4rem;border-radius:50%;background:#F65A0E;box-shadow:0 0 1rem #F65A0E}
.ln{position:absolute;left:0;top:24rem;width:27rem;height:.18rem;margin-top:-.09rem;background:linear-gradient(90deg,transparent,#F65A0E 30%,#fff 50%,#F65A0E 70%,transparent);transform-origin:center}
.fl{position:absolute;inset:0;background:#F65A0E;clip-path:inset(49.6% 0 49.6% 0)}
.tt{position:absolute;left:0;right:0;top:21rem;text-align:center;font:800 4.4rem 'Inter Tight',sans-serif;letter-spacing:-.05em;color:#080808;clip-path:inset(0 0 100% 0)}
.sb{position:absolute;left:0;right:0;top:27rem;text-align:center;font:italic 400 1.5rem 'Instrument Serif',serif;color:#080808}`,
  html:`<div class="stage"><div class="fl" id="fl"></div><div class="dt" id="dt"></div><div class="ln" id="ln"></div><div class="tt" id="tt">STUDIO.</div><div class="sb" id="sb">motion designer</div></div>`,
  js:`const dt=document.getElementById('dt'),ln=document.getElementById('ln'),fl=document.getElementById('fl'),tt=document.getElementById('tt'),sb=document.getElementById('sb');
play(4.2,t=>{
  const o=1-seg(t,3.7,4.2),f=ease.expo(seg(t,1.2,1.7));
  dt.style.opacity=seg(t,.1,.3)*(1-seg(t,.6,.8));dt.style.transform='scale('+lerp(.4,1,ease.back(seg(t,.1,.5)))+')';
  ln.style.opacity=seg(t,.6,.8)*(1-seg(t,1.4,1.6));ln.style.transform='scaleX('+ease.expo(seg(t,.6,1.3))+') scaleY('+lerp(1,3,seg(t,1,1.4))+')';
  fl.style.clipPath='inset('+(49.6*(1-f))+'% 0 '+(49.6*(1-f))+'% 0)';fl.style.opacity=o;
  const a=ease.out(seg(t,1.8,2.5));tt.style.clipPath='inset(0 0 '+(100*(1-a))+'% 0)';tt.style.transform='translateY('+lerp(1.5,0,a)+'rem)';tt.style.opacity=o;
  sb.style.opacity=ease.out(seg(t,2.4,3))*o;
});` },

{ v:9, id:'gridwave', fa:'سطح موجی سه‌بعدی از مربع‌های رنگی', en:'3D Tile Wave Surface', cat:'fx',
  when:'نشون‌دادن حس فیزیک و حجم. شبکه‌ای از مربع‌ها با ارتفاع سینوسی مثل پارچه موج برمی‌داره؛ رنگ از آبی-بنفش به نارنجی می‌ره و یک شیء کوچک روی موج سوار می‌شه.',
  timing:'موج: سینوس شعاعی با سرعت ۲٫۵ rad/s · ۱۴×۱۴ مربع · پرسپکتیو دستی در canvas · رنگ از ارتفاع',
  where:'ثانیه ۳ تا ۵', colors:['#0A0F1E','#4A5FD0','#F65A0E','#FFB07A'], dur:4.4,
  css:`.stage{background:radial-gradient(80% 50% at 50% 50%,#1a2144,#0A0F1E)}${CNV}`,
  html:`<div class="stage"><canvas id="c" width="540" height="960"></canvas></div>`,
  js:`const g=document.getElementById('c').getContext('2d'),N=14;
const P=(x,y,z,rot)=>{const c=Math.cos(rot),s=Math.sin(rot),X=x*c-y*s,Y=x*s+y*c,pr=1/(1+Y*.045);return [270+X*pr*34,520-z*pr*34+Y*pr*14]};
const mix=(a,b,k)=>a.map((v,i)=>Math.round(lerp(v,b[i],k)));
play(4.4,t=>{
  g.clearRect(0,0,540,960);const rot=lerp(-.5,.4,seg(t,0,4.4)),amp=ease.out(seg(t,0,1))*(1-.5*seg(t,3.7,4.4)),o=1-seg(t,3.9,4.4);
  const H=(i,j)=>{const dx=i-N/2,dy=j-N/2,r=Math.hypot(dx,dy);return Math.sin(r*.9-t*2.5)*1.6*Math.exp(-r*.1)*amp*1.15};
  const cells=[];for(let i=-N/2;i<N/2;i++)for(let j=-N/2;j<N/2;j++)cells.push([i,j]);
  cells.sort((a,b)=>(a[0]*Math.sin(rot)+a[1]*Math.cos(rot))*-1-(b[0]*Math.sin(rot)+b[1]*Math.cos(rot))*-1);
  cells.sort((a,b)=>{const ya=a[0]*Math.sin(rot)+a[1]*Math.cos(rot),yb=b[0]*Math.sin(rot)+b[1]*Math.cos(rot);return yb-ya});
  cells.forEach(([i,j])=>{
    const z=H(i+N/2,j+N/2),k=clamp((z+1.8)/3.6),col=k<.5?mix([74,95,208],[170,110,190],k*2):mix([170,110,190],[246,90,14],(k-.5)*2);
    const q=[[i,j],[i+.92,j],[i+.92,j+.92],[i,j+.92]].map(([x,y])=>P(x,y,H(x+N/2,y+N/2),rot));
    g.beginPath();q.forEach((p,n)=>n?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();
    g.fillStyle='rgba('+col+','+.95*o+')';g.fill();g.strokeStyle='rgba(255,255,255,'+.12*o+')';g.lineWidth=1;g.stroke();
  });
  const c=P(0,0,H(N/2,N/2)+1.2,rot);g.fillStyle='rgba(180,220,235,'+o+')';g.beginPath();g.arc(c[0],c[1]-14,16,0,7);g.fill();
  g.fillStyle='rgba(20,30,60,'+o+')';g.beginPath();g.arc(c[0]-5,c[1]-16,2.5,0,7);g.arc(c[0]+5,c[1]-16,2.5,0,7);g.fill();
});` },

{ v:9, id:'echotext', fa:'تکرار اکو و قاب ویوفایندر', en:'Echo-Repeat Text + Viewfinder', cat:'type',
  when:'تاکید روی یک کلمه («منفرد»). همان کلمه ده‌ها بار به صورت خط‌های محو بالا و پایینش تکرار می‌شه و کلمه‌ی اصلی روشن می‌مونه. بعد صحنه آبی می‌شه و گوشه‌های ویوفایندر دور حروف قفل می‌شن.',
  timing:'تکرار ۸ ردیف با تأخیر ۰٫۰۶ ثانیه · کم‌رنگ‌شدن ۱۲٪ هر ردیف · قفل‌شدن قاب ۰٫۴ ثانیه · رنگ زمینه ۰٫۳ ثانیه عوض می‌شه',
  where:'ثانیه ۴٫۵ تا ۶٫۵', colors:['#0A0F1E','#FFFFFF','#0636E2','#F4F8FA'], dur:4.4,
  css:`.stage{background:#E8EEF2;font-family:'Inter Tight',sans-serif}
.bl{position:absolute;inset:0;background:#0636E2;opacity:0}
.dk{position:absolute;inset:0;background:#0A0F1E;opacity:0}
.ec{position:absolute;left:0;right:0;text-align:center;font:800 3.6rem 'Inter Tight',sans-serif;letter-spacing:-.05em;color:#fff;white-space:nowrap;overflow:hidden}
.main{position:absolute;left:0;right:0;top:22rem;text-align:center;font:800 4.4rem 'Inter Tight',sans-serif;letter-spacing:-.05em;color:#111}
.vf{position:absolute;width:1.4rem;height:1.4rem;border:0 solid #fff}`,
  html:`<div class="stage" id="st"><div class="dk" id="dk"></div><div class="bl" id="bl"></div><div id="ecs"></div><div class="main" id="mn">EVERY</div></div>`,
  js:`const st=document.getElementById('st'),dk=document.getElementById('dk'),bl=document.getElementById('bl'),mn=document.getElementById('mn'),ecs=document.getElementById('ecs');
const E=[...Array(9)].map((_,i)=>{const d=document.createElement('div');d.className='ec';d.textContent='SINGLE SINGLE';d.style.top=(15+i*2.9)+'rem';ecs.appendChild(d);return d});
const V=[[0,0,'Left','Top'],[1,0,'Right','Top'],[0,1,'Left','Bottom'],[1,1,'Right','Bottom']].map(([r,b,h,v])=>{const d=document.createElement('div');d.className='vf';d.style['border'+h+'Width']='.14rem';d.style['border'+v+'Width']='.14rem';st.appendChild(d);return {d,r,b}});
play(4.4,t=>{
  const o=1-seg(t,3.9,4.4),ph=t<1.2?0:t<3?1:2;
  dk.style.opacity=ph===1?1:0;bl.style.opacity=ph===2?1:0;
  mn.textContent=ph===0?'EVERY':ph===1?'SINGLE':'FRAME';
  mn.style.color=ph===0?'#111':'#fff';mn.style.opacity=o;mn.style.transform='scale('+lerp(1.12,1,ease.out(seg(t,ph===0?0:ph===1?1.2:3,ph===0?.4:ph===1?1.6:3.4)))+')';
  E.forEach((e,i)=>{const d=Math.abs(i-4),a=ph===1?ease.out(seg(t,1.3+d*.06,1.7+d*.06))*Math.max(0,1-d*.12)*.5:0;e.style.opacity=a*o;e.style.transform='translateX('+(i%2?-1:1)*(1-a*2)*2+'rem)'});
  const k=ease.out(seg(t,3.2,3.6));V.forEach(({d,r,b})=>{d.style.opacity=ph===2?o:0;d.style.left=(r?19:5.5)+(r?1:-1)*(1-k)*4+'rem';d.style.top=(b?27:17.5)+(b?1:-1)*(1-k)*3+'rem'});
});` },

{ v:9, id:'statboard', fa:'داشبورد آمار با میله‌ی نارنجی', en:'Stat Board: Big % + Ring + Bars', cat:'data',
  when:'نتیجه‌ی عددی. درصد خیلی بزرگ بالا می‌شمره، یک حلقه‌ی کوچک پر می‌شه و نمودار میله‌ای از چپ رشد می‌کنه؛ آخرین میله با رنگ تاکیدی نارنجی بالا می‌ره.',
  timing:'شمارش ۱٫۵ ثانیه · میله‌ها با فاصله‌ی ۰٫۰۸ ثانیه · میله‌ی آخر ۰٫۴ ثانیه بعد · حلقه ۱٫۲ ثانیه',
  where:'ثانیه ۶٫۵ تا ۸', colors:['#F4F8FA','#111111','#F65A0E','#D8480C'], dur:4.4,
  css:`.stage{background:#F4F6F7;font-family:'Inter Tight',sans-serif;color:#111}
.big{position:absolute;left:2.5rem;top:15rem;font:800 4.4rem 'Inter Tight',sans-serif;letter-spacing:-.04em}
.rg{position:absolute;left:2.5rem;top:22rem;width:6rem;height:6rem}
.rg b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 1.1rem 'Inter Tight',sans-serif}
.bars{position:absolute;left:11rem;right:2rem;top:20rem;height:12rem;display:flex;align-items:flex-end;gap:.35rem}
.bars i{flex:1;background:#111;border-radius:.1rem}.bars i.a{background:#F65A0E}`,
  html:`<div class="stage"><div class="big" id="big">+0%</div><div class="rg"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="#E2E2E2" stroke-width="10"/><circle id="pr" cx="50" cy="50" r="42" fill="none" stroke="#F65A0E" stroke-width="10" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg><b id="pn">0%</b></div><div class="bars" id="bars"></div></div>`,
  js:`const big=document.getElementById('big'),pr=document.getElementById('pr'),pn=document.getElementById('pn'),bars=document.getElementById('bars'),L=2*Math.PI*42;pr.style.strokeDasharray=L;
const H=[.1,.14,.18,.2,.28,.26,.34,.42,.4,.52,.6,.72,1];bars.innerHTML=H.map((h,i)=>'<i'+(i===H.length-1?' class="a"':'')+'></i>').join('');const B=[...bars.children];
play(4.4,t=>{
  const c=ease.out(seg(t,.2,1.7)),o=1-seg(t,3.9,4.4);
  big.textContent='+'+Math.round(312*c)+'%';big.style.opacity=seg(t,0,.3)*o;
  const r=ease.out(seg(t,.3,1.5));pr.style.strokeDashoffset=L*(1-.77*r);pn.textContent=Math.round(77*r)+'%';pn.parentNode.style.opacity=o;
  B.forEach((b,i)=>{const k=ease.out(seg(t,.5+i*.08+(i===H.length-1?.4:0),.9+i*.08+(i===H.length-1?.4:0)));b.style.height=(H[i]*100*k)+'%';b.style.opacity=o});
});` },

{ v:9, id:'ringparticles', fa:'ذرات رگه‌ای که به حلقه تبدیل می‌شن', en:'Streak Particles → Ring → Burst', cat:'fx',
  when:'نمایش پیچیدگی یا انرژی. صدها خط سفید تصادفی روی صفحه‌ی تیره می‌چرخن، در یک حلقه جمع می‌شن، و بعد پرتوهای شعاعی از مرکز بیرون می‌زنن و صفحه آبی می‌شه.',
  timing:'پراکندگی ۱ ثانیه · جمع‌شدن به حلقه ۱٫۵ ثانیه · ease-in-out · انفجار شعاعی ۰٫۸ ثانیه · ۳۰۰ خط (canvas)',
  where:'ثانیه ۸ تا ۱۰٫۵', colors:['#0A0F1E','#FFFFFF','#0636E2','#1246EA'], dur:5,
  css:`.stage{background:#0A0F1E}${CNV}`,
  html:`<div class="stage"><canvas id="c" width="540" height="960"></canvas></div>`,
  js:`const g=document.getElementById('c').getContext('2d'),N=300,rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
const S=[...Array(N)].map((_,i)=>({x:rnd(i)*540,y:rnd(i+300)*960,a:rnd(i+600)*6.283,l:20+rnd(i+900)*50,ta:i/N*6.283,r:90+rnd(i+1200)*20}));
play(5,t=>{
  g.fillStyle='#0A0F1E';g.fillRect(0,0,540,960);
  const c=ease.inOut(seg(t,1,2.5)),b=ease.expo(seg(t,3.2,4)),bl=ease.inOut(seg(t,3.3,4.2));
  g.fillStyle='rgba(6,54,226,'+bl+')';g.fillRect(0,0,540,960);
  g.lineCap='round';
  S.forEach((s,i)=>{
    const wob=Math.sin(t*3+i)*30*(1-c),px=s.x+Math.cos(s.a+t)*wob,py=s.y+Math.sin(s.a+t)*wob;
    const rx=270+Math.cos(s.ta+t*.4)*s.r*1.2,ry=480+Math.sin(s.ta+t*.4)*s.r*1.2;
    let x=lerp(px,rx,c),y=lerp(py,ry,c),ang=lerp(s.a,s.ta+t*.4+1.57,c),len=lerp(s.l,10,c);
    if(b>0){const rad=Math.atan2(y-480,x-270),d=Math.hypot(x-270,y-480);x=270+Math.cos(rad)*(d+b*500*(.4+rnd(i+5)));y=480+Math.sin(rad)*(d+b*500*(.4+rnd(i+5)));ang=rad;len=10+b*140}
    g.strokeStyle='rgba(255,255,255,'+(.4+.5*rnd(i+9))*(1-seg(t,4.4,5))+')';g.lineWidth=1.3;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(ang)*len,y+Math.sin(ang)*len);g.stroke();
  });
  const k=seg(t,3.4,3.9)*(1-seg(t,4.4,5)),gr=g.createRadialGradient(270,480,0,270,480,60);gr.addColorStop(0,'rgba(18,70,234,'+k+')');gr.addColorStop(1,'rgba(18,70,234,0)');g.fillStyle=gr;g.fillRect(0,0,540,960);
});` },

{ v:9, id:'blobmorph', fa:'نقطه‌های سیاه که به لکه‌ی خاردار تبدیل می‌شن', en:'Dot Cluster → Spiky Blob → Single Dot', cat:'fx',
  when:'گذار سازمانی یا خروجی. چند نقطه‌ی سیاه داخل دایره روی زمینه‌ی نارنجی می‌لرزن، دایره موجی و خاردار می‌شه، همه به یک نقطه می‌پیوندن و با یک حلقه‌ی بزرگ منفجر می‌شن.',
  timing:'لرزش ۱ ثانیه · خاردار‌شدن ۱ ثانیه (شعاع نویز) · ادغام ۰٫۸ ثانیه · حلقه‌ی نهایی ۰٫۸ ثانیه · SVG path هر فریم',
  where:'ثانیه ۱۱ تا ۱۳٫۵', colors:['#F65A0E','#D8480C','#080808','#FFB07A'], dur:4.6,
  css:`.stage{background:#F65A0E}svg{position:absolute;left:0;top:0;width:27rem;height:48rem}`,
  html:`<div class="stage"><svg viewBox="0 0 27 48"><path id="bl" fill="none" stroke="#080808" stroke-width=".08"/><g id="ds" fill="#080808"></g><circle id="rg" cx="13.5" cy="24" r="1" fill="none" stroke="#080808" stroke-width=".25"/></svg></div>`,
  js:`const bl=document.getElementById('bl'),ds=document.getElementById('ds'),rg=document.getElementById('rg');
const D=[[-3.5,-3,.9],[2,-4,.6],[4,.5,1.1],[-1,1.5,.8],[-4,3.5,.6],[1.5,4.5,.9],[0,-.5,.5]];
ds.innerHTML=D.map(()=>'<circle r="1"/>').join('');const C=[...ds.children];
play(4.6,t=>{
  const sp=ease.inOut(seg(t,1,2)),mg=ease.inOut(seg(t,2,2.9)),o=1-seg(t,4.1,4.6),pop=ease.out(seg(t,3,3.9));
  C.forEach((c,i)=>{const [x,y,r]=D[i],sh=Math.sin(t*14+i*2)*.12*(1-mg);c.setAttribute('cx',13.5+lerp(x,0,mg)+sh);c.setAttribute('cy',24+lerp(y,0,mg)+sh);c.setAttribute('r',lerp(r,i===6?1.3:0,mg)*(1+.2*Math.sin(t*10+i)*(1-mg)));c.style.opacity=o});
  let d='';const R=lerp(7,3.5,mg);for(let k=0;k<=120;k++){const a=k/120*6.283,n=Math.sin(a*9+t*8)*1.1*sp*(1-mg)+Math.sin(a*5-t*5)*.5*sp*(1-mg);const r=R+n,x=13.5+Math.cos(a)*r,y=24+Math.sin(a)*r;d+=(k?'L':'M')+x.toFixed(2)+' '+y.toFixed(2)}
  bl.setAttribute('d',d+'Z');bl.style.opacity=seg(t,.2,.6)*(1-seg(t,2.4,2.9))*o;
  rg.setAttribute('r',lerp(1,18,pop));rg.style.opacity=(1-pop)*seg(t,3,3.1)*o;rg.setAttribute('stroke-width',lerp(.5,.1,pop));
});` }
);

/* ---- VIDEOS entries 7-9 ---- */
VIDEOS.push(
{ id:'v7', n:7, title:'موشن نئونی: لیمویی روی سیاه', meta:'۶۷ ثانیه · ۷۲۰×۱۲۸۰ · ریل آموزشی با گرافیک متحرک نمایش داده‌شده روی لپ‌تاپ',
  mood:'پرانرژی و فناورانه. سیاه خالص با شبکه‌ی نقطه‌ای کم‌نور، لیمویی نئون (#E5ED35) برای تاکید و صورتی نئون برای تغییر لحن. تایپوگرافی سنگین و فشرده، کادرهای باریک، حرکت‌ها ضربه‌ای.',
  rules:[
    'دو رنگ نئون: لیمویی برای اصل پیام و صورتی فقط برای مفهوم‌های «مشکل» یا شمارنده‌ی زمان.',
    'تایپ سنگین uppercase با tracking منفی و گلو؛ کلمه‌های جمله با scale و بلور می‌کوبن.',
    'هر مفهوم یک المان UI ساده دارد: کادر پرامپت، ردیف برچسب، نود و خط، توپ نورانی.',
    'گذار با پر‌شدن کامل صفحه از رنگ لیمویی و برش.',
    'پایان: عبارت دعوت‌به‌اقدام درشت لیمویی روی شخص و پس‌زمینه‌ی تار.'
  ],
  palette:[
    { g:'زمینه', c:[['#080808','سیاه'],['#2C2C2C','نقطه‌های شبکه'],['#0B0B0B','جعبه']] },
    { g:'نئون', c:[['#E5ED35','لیمویی اصلی'],['#E2E62E','لیمویی روشن'],['#FE4EE2','صورتی نئون'],['#CA368D','صورتی تیره']] },
    { g:'متن', c:[['#FFFFFF','سفید'],['#777777','خاکستری']] }
  ] },
{ id:'v8', n:8, title:'کلاژ ادیتوریال: دایره‌ی قرمز', meta:'۱۵ ثانیه · ۷۲۰×۱۲۸۰ · روایت با تصاویر ترکیبی و کپشن دوسایزه',
  mood:'گرافیک چاپی و سینمایی. خاکستری روشن یا سیاه خالص، یک دایره‌ی قرمز تنها رنگ، سوژه‌ها سیاه‌وسفید. کپشن‌ها دوسایزه و فشرده، متن‌های ریز تزئینی در گوشه‌ها.',
  rules:[
    'فقط یک رنگ: قرمز #D21212. بقیه خاکستری، سفید و سیاه.',
    'هر صحنه یک کلاژ است: سوژه + دایره/مستطیل رنگی + حلقه‌ی نازک + متن ریز.',
    'کپشن دوسایزه: کلمه‌ی ربط کوچک، کلمه‌ی اصلی درشت با tracking منفی.',
    'گذار با برش مستقیم بین صحنه‌ی روشن و سیاه.',
    'نکته: عکس‌های سوژه در ویدیوی مرجع بازتولید نشدن؛ دموها سوژه‌ی انتزاعی دارن.'
  ],
  palette:[
    { g:'زمینه', c:[['#E8E8E8','خاکستری روشن'],['#B8B8B8','خاکستری'],['#080808','سیاه'],['#000000','سیاه خالص']] },
    { g:'قرمز', c:[['#D21212','دایره'],['#7E0606','سایه‌ی دایره'],['#C80B0D','قرمز میانی']] },
    { g:'تاکید ریز', c:[['#DAEA32','نوار لیمویی تگ'],['#FFFFFF','متن'],['#888888','متن کم‌رنگ']] }
  ] },
{ id:'v9', n:9, title:'ریل موشن‌دیزاینر: نارنجی و آبی', meta:'۱۴ ثانیه · ۷۲۰×۱۲۸۰ · نمایش قابلیت‌های موشن روی لپ‌تاپ با انعکاس',
  mood:'تمیز و مفهومی. زمینه‌ی سرمه‌ای تیره، سه رنگ جدا برای صحنه‌ها: نارنجی #F65A0E، آبی #0636E2 و سفید. هر صحنه یک قابلیت (۳D، ذره، آمار، مورف) را نشان می‌دهد و با فلاش رنگی عوض می‌شود.',
  rules:[
    'شروع همیشه با نقطه → خط → انفجار رنگ.',
    'هر صحنه رنگ زمینه‌ی خودش را دارد؛ گذار با پر‌شدن صفحه از رنگ بعدی.',
    'مفهوم‌های تجریدی (موج، ذره، لکه) با بوم و ریاضی ساخته می‌شن نه با قالب آماده.',
    'آمار و اینفوگرافیک: درصد بزرگ + حلقه + میله‌ی آخر نارنجی.',
    'پایان ساده: لوگوی سفید روی تیره با زیرعنوان سریف.'
  ],
  palette:[
    { g:'زمینه', c:[['#0A0F1E','سرمه‌ای تیره'],['#E8EEF2','خاکستری-سفید'],['#F4F6F7','سفید داشبورد']] },
    { g:'نارنجی', c:[['#F65A0E','نارنجی اصلی'],['#D8480C','نارنجی تیره'],['#FFB07A','هاله']] },
    { g:'آبی', c:[['#0636E2','آبی تند'],['#1246EA','آبی روشن'],['#0A2E9A','آبی تیره'],['#4A5FD0','موج آبی']] }
  ] }
);

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 7: neon lime on black */
  --nl-void:#080808; --nl-lime:#E5ED35; --nl-pink:#FE4EE2; --nl-grid:#2C2C2C;
  /* video 8: editorial red circle */
  --ed-paper:#E8E8E8; --ed-grey:#B8B8B8; --ed-red:#D21212; --ed-red-dark:#7E0606;
  /* video 9: motion reel */
  --mr-night:#0A0F1E; --mr-orange:#F65A0E; --mr-orange-dark:#D8480C; --mr-blue:#0636E2; --mr-blue-2:#1246EA;
}`);
