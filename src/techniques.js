/* ===== Motion Kit + techniques for video 1 (Reel edit) ===== */
const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;800&family=Inter+Tight:wght@200;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap">';

const KIT_CSS = `*{box-sizing:border-box;margin:0}
html{font-size:calc(100vw/27)}
body{position:relative;width:27rem;height:48rem;overflow:hidden;background:#070B13;color:#F6FBFF;font-family:'Vazirmatn','Inter Tight',system-ui,sans-serif}
.stage{position:absolute;inset:0;overflow:hidden;background:radial-gradient(120% 80% at 50% 30%,#1b2a4a 0%,#090E19 70%)}
.foot{position:absolute;inset:0;background:linear-gradient(180deg,#6b6b66,#44443f)}
.foot i{position:absolute;left:60%;top:24%;width:7rem;height:8.5rem;margin-left:-3.5rem;border-radius:50% 50% 46% 46%;background:#c89a7e}
.foot b{position:absolute;left:60%;top:48%;width:21rem;height:24rem;margin-left:-10.5rem;border-radius:46% 46% 0 0;background:#e9e9e6}
.serif{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400}
.glass{background:rgba(255,255,255,.12);-webkit-backdrop-filter:blur(1.2rem) saturate(1.4);backdrop-filter:blur(1.2rem) saturate(1.4);border:1px solid rgba(255,255,255,.26);border-radius:1.1rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 1.2rem 2.4rem rgba(0,0,0,.45)}`;

const KIT_JS = `const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),
lerp=(a,b,t)=>a+(b-a)*t,
seg=(t,a,b)=>clamp((t-a)/(b-a)),          // progress 0..1 between second a and b
ease={
  out:x=>1-Math.pow(1-x,3),
  inOut:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,
  expo:x=>x>=1?1:1-Math.pow(2,-10*x),
  back:x=>{const c=1.70158;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)}
};
// every animation is a pure function of time: draw(t)
function play(dur,draw){
  window.__redraw=()=>draw(window.__T);
  if(window.__T!==undefined){draw(window.__T);return}              // render mode (Playwright sets __T)
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){draw(dur*.45);return}
  const t0=performance.now();
  (function f(){draw(((performance.now()-t0)/1000)%dur);requestAnimationFrame(f)})();
}`;

const FOOT = '<div class="foot"><i></i><b></b></div>';

const TECHS = [
/* 1 ---------------------------------------------------------------- */
{ id:'kinetic', fa:'زیرنویس کلمه‌به‌کلمه', en:'Kinetic Typography', cat:'type',
  when:'گفتار اصلی ویدیو. کلمه‌های کلیدی (عدد، پول، سن) با رنگ یا فونت متفاوت برجسته می‌شن.',
  timing:'هر کلمه ۰٫۴ ثانیه، فاصله‌ی ۰٫۲۶ ثانیه · بالا‌آمدن + بلور به واضح',
  where:'کل ویدیو', colors:['#F6FBFF','#EAC68A'], dur:4.6,
  css:`.sub{position:absolute;left:1.5rem;right:1.5rem;bottom:9rem;text-align:center;direction:rtl;font-size:1.7rem;font-weight:800;line-height:1.6;text-shadow:0 .1rem .8rem rgba(0,0,0,.6)}
.sub span{display:inline-block;margin:0 .25rem}
.sub .hl{color:#EAC68A}
.sub .num{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;font-size:2.3rem;color:#EAC68A}`,
  html:`<div class="stage">${FOOT}<div class="sub" id="sub"></div></div>`,
  js:`const words=[['بعدش',''],['$1,500','num'],['در',''],['ماه',''],['تو',''],['۱۴','hl'],['سالگی','']];
const sub=document.getElementById('sub');
const els=words.map(([w,c])=>{const s=document.createElement('span');s.textContent=w;s.className=c;sub.appendChild(s);return s});
play(4.6,t=>{
  els.forEach((s,i)=>{
    const a=.3+i*.26, p=seg(t,a,a+.4), out=seg(t,3.9,4.3);
    s.style.opacity=ease.out(p)*(1-out);
    s.style.transform='translateY('+lerp(1,0,ease.back(p))+'rem) scale('+lerp(.85,1,ease.back(p))+')';
    s.style.filter='blur('+lerp(.5,0,p)+'rem)';
  });
});` },

/* 2 ---------------------------------------------------------------- */
{ id:'glass', fa:'کارت شیشه‌ای', en:'Glassmorphism UI Card', cat:'ui',
  when:'نمایش یک عدد یا اطلاعات کوتاه کنار صورت بدون پوشاندن فوتیج.',
  timing:'ورود ۰٫۷ ثانیه · ease-out · scale از ۰٫۹۲ به ۱ + بلور به واضح',
  where:'ثانیه ۱۲ تا ۲۳', colors:['#EAC68A','#C6A266'], dur:4,
  css:`.card{position:absolute;left:2rem;top:9rem;width:10.5rem;padding:1.1rem 1.2rem}
.card small{display:block;font:600 .75rem 'Inter Tight',sans-serif;letter-spacing:.12em;opacity:.7}
.card .v{font:italic 2.8rem/1.15 'Instrument Serif',serif}
.track{height:.35rem;border-radius:1rem;background:rgba(255,255,255,.25);margin-top:.7rem}
.fill{height:100%;width:0;border-radius:1rem;background:linear-gradient(90deg,#C6A266,#EAC68A)}`,
  html:`<div class="stage">${FOOT}<div class="card glass" id="card"><small>RATE</small><div class="v">$1,200</div><div class="track"><div class="fill" id="fill"></div></div></div></div>`,
  js:`const c=document.getElementById('card'), fill=document.getElementById('fill');
play(4,t=>{
  const p=ease.out(seg(t,.2,.9)), o=seg(t,3.3,3.8);
  c.style.opacity=p*(1-o);
  c.style.transform='translateY('+lerp(1.6,0,p)+'rem) scale('+lerp(.92,1,p)+')';
  c.style.filter='blur('+lerp(.9,0,p)+'rem)';
  fill.style.width=lerp(0,72,ease.inOut(seg(t,.6,2)))+'%';
});` },

/* 3 ---------------------------------------------------------------- */
{ id:'focus', fa:'فوکوس بلور و کارت چت', en:'Focus Pull (Background Blur)', cat:'fx',
  when:'وقتی گرافیک مهمی میاد. فوتیج تار و تیره می‌شه تا چشم روی گرافیک بمونه، بعد برمی‌گرده.',
  timing:'بلور و تیره‌شدن ۰٫۷ ثانیه · خروج ۰٫۷ ثانیه · فوتیج کمی زوم می‌شه',
  where:'ثانیه ۶ تا ۱۰ و ۲۵ تا ۳۱', colors:['#FFFFFF'], dur:5.2,
  css:`.foot{will-change:filter,transform}
.chat{position:absolute;left:2.2rem;right:2.2rem;top:12rem;padding:1.2rem;direction:rtl}
.who{display:flex;gap:.7rem;align-items:center;font-weight:800;font-size:1rem}
.av{width:2.4rem;height:2.4rem;border-radius:50%;background:#F61E36;display:grid;place-items:center;font-weight:800}
.msg{margin-top:.9rem;padding:.9rem 1rem;border-radius:.9rem;background:rgba(255,255,255,.14);font-weight:600;font-size:1.15rem;line-height:1.5}
.re{position:absolute;left:2.2rem;top:25rem;padding:.5rem 1.1rem;border-radius:2rem;background:#fff;color:#111;font-weight:800;font-size:1rem;direction:rtl}`,
  html:`<div class="stage">${FOOT.replace('class="foot"','class="foot" id="foot"')}<div class="chat glass" id="chat"><div class="who"><span class="av">ک</span>صاحب کانال</div><div class="msg">خب، ماهی چقدر می‌خوای؟</div></div><div class="re" id="re">زیاده؟</div></div>`,
  js:`const foot=document.getElementById('foot'), chat=document.getElementById('chat'), re=document.getElementById('re');
play(5.2,t=>{
  const p=ease.inOut(seg(t,.3,1)), q=ease.inOut(seg(t,4,4.7)), k=p*(1-q);
  foot.style.filter='blur('+(k*1.3)+'rem) brightness('+lerp(1,.42,k)+')';
  foot.style.transform='scale('+lerp(1,1.06,k)+')';
  const a=ease.out(seg(t,.9,1.5));
  chat.style.opacity=a*(1-q);
  chat.style.transform='translateY('+lerp(1.5,0,a)+'rem)';
  re.style.opacity=seg(t,2.2,2.4)*(1-q);
  re.style.transform='scale('+lerp(.6,1,ease.back(seg(t,2.2,2.7)))+')';
});` },

/* 4 ---------------------------------------------------------------- */
{ id:'counter', fa:'شمارنده‌ی عدد', en:'Number Counter', cat:'data',
  when:'عدد بزرگ و ادعایی (بازدید، درآمد). شمارش با شتاب کندشونده تا عدد نهایی.',
  timing:'۲٫۴ ثانیه · ease-out-expo · در ویدیو از ۶۵۰٬۰۲۹٬۰۱۱ به ۷۰۰٬۰۰۰٬۰۰۰ می‌رسه',
  where:'ثانیه ۰ و ۳۶ تا ۳۸', colors:['#F6FBFF','#F61E36'], dur:4.5,
  css:`.pill{position:absolute;left:50%;top:17rem;transform:translateX(-50%);padding:.35rem .85rem;border-radius:2rem;font:600 .8rem 'Inter Tight',sans-serif;display:flex;gap:.45rem;align-items:center;white-space:nowrap}
.dot{width:.65rem;height:.45rem;border-radius:.15rem;background:#F61E36}
.num{position:absolute;left:0;right:0;top:19.5rem;text-align:center;font:800 3rem/1 'Inter Tight',sans-serif;letter-spacing:-.02em;font-variant-numeric:tabular-nums}`,
  html:`<div class="stage"><div class="pill glass" id="pl"><i class="dot"></i>YouTube · Total views</div><div class="num" id="n">650,029,011</div></div>`,
  js:`const n=document.getElementById('n'), pl=document.getElementById('pl');
play(4.5,t=>{
  const p=ease.expo(seg(t,.2,2.6)), o=1-seg(t,3.9,4.4);
  n.textContent=Math.round(lerp(650029011,700000000,p)).toLocaleString('en-US');
  n.style.opacity=o; pl.style.opacity=o;
  n.style.transform='scale('+lerp(.96,1,ease.out(seg(t,0,.6)))+')';
});` },

/* 5 ---------------------------------------------------------------- */
{ id:'slider', fa:'اسلایدر قیمت', en:'Value Slider', cat:'data',
  when:'مقایسه‌ی مبلغ یا مقدار. عدد و دستگیره همزمان حرکت می‌کنن و یک حباب واکنش می‌گیره.',
  timing:'۱٫۷ ثانیه · ease-in-out · حباب با ease-out-back',
  where:'ثانیه ۸ تا ۱۳', colors:['#EAC68A','#C6A266','#F6FBFF'], dur:4.6,
  css:`.rate{position:absolute;left:2rem;right:2rem;top:15rem;padding:1.3rem}
.rate small{font:600 .7rem 'Inter Tight',sans-serif;letter-spacing:.14em;opacity:.65}
.rate .v{font:italic 3.4rem/1.1 'Instrument Serif',serif}
.rate .v s{font:600 .9rem 'Inter Tight',sans-serif;text-decoration:none;opacity:.6;margin-left:.3rem}
.trk{position:relative;height:.4rem;margin:1.3rem 0 .6rem;border-radius:1rem;background:rgba(255,255,255,.22)}
.fl{position:absolute;left:0;top:0;bottom:0;border-radius:1rem;background:linear-gradient(90deg,#C6A266,#EAC68A)}
.th{position:absolute;top:50%;width:1.5rem;height:1.5rem;margin:-.75rem 0 0 -.75rem;border-radius:50%;background:#fff;box-shadow:0 .2rem .8rem rgba(0,0,0,.45)}
.ticks{display:flex;justify-content:space-between;font:500 .6rem 'Inter Tight',sans-serif;opacity:.55}
.bub{position:absolute;right:2.4rem;top:12.6rem;padding:.4rem .9rem;border-radius:2rem;background:#fff;color:#111;font:800 .9rem 'Vazirmatn',sans-serif;direction:rtl}`,
  html:`<div class="stage"><div class="bub" id="bub">زیاده؟</div><div class="rate glass" id="rate"><small>MONTHLY RATE</small><div class="v"><span id="v">$900</span><s>/mo</s></div><div class="trk"><div class="fl" id="fl"></div><div class="th" id="th"></div></div><div class="ticks"><span>$0</span><span>$500</span><span>$1,000</span><span>$1,500</span></div></div></div>`,
  js:`const v=document.getElementById('v'), fl=document.getElementById('fl'), th=document.getElementById('th'), bub=document.getElementById('bub'), rate=document.getElementById('rate');
play(4.6,t=>{
  const p=ease.inOut(seg(t,.5,2.2)), x=Math.round(lerp(900,1000,p)), o=1-seg(t,4,4.4);
  v.textContent='$'+x.toLocaleString('en-US');
  const pc=(x/1500*100)+'%'; th.style.left=pc; fl.style.width=pc;
  rate.style.opacity=ease.out(seg(t,0,.5))*o;
  bub.style.opacity=seg(t,2.3,2.5)*o;
  bub.style.transform='scale('+lerp(.6,1,ease.back(seg(t,2.3,2.8)))+')';
});` },

/* 6 ---------------------------------------------------------------- */
{ id:'chart', fa:'نمودار خطی انیمیشنی', en:'Animated Line Chart', cat:'data',
  when:'رشد در زمان (سابسکرایبر، فروش). خط کشیده می‌شه، سطح زیرش پر می‌شه و در پایان یک بج رشد میاد.',
  timing:'رسم خط ۲٫۲ ثانیه · ease-in-out · بج بعد از رسیدن خط',
  where:'ثانیه ۲۶ تا ۳۱', colors:['#4EA2EA','#1EAE4E','#F61E36'], dur:5,
  css:`.st{position:absolute;left:1.6rem;right:1.6rem;top:12rem;padding:1.1rem 1.2rem}
.hd{display:flex;justify-content:space-between;align-items:center;font:600 .8rem 'Inter Tight',sans-serif}
.hd span{display:flex;gap:.45rem;align-items:center}
.yt{width:.9rem;height:.65rem;border-radius:.2rem;background:#F61E36}
.hd em{font-style:normal;opacity:.55;font-size:.65rem}
.big{margin-top:.8rem;font:700 2.4rem/1 'Inter Tight',sans-serif;font-variant-numeric:tabular-nums}
.bdg{position:absolute;right:1.2rem;top:-1.1rem;padding:.3rem .7rem;border-radius:2rem;background:#1EAE4E;font:700 .85rem 'Inter Tight',sans-serif}`,
  html:`<div class="stage"><div class="st glass" id="st"><div class="bdg" id="bdg">▲ +4.0M</div><div class="hd"><span><i class="yt"></i>Studio</span><em>Last 6 months</em></div><div class="big" id="val">5.6M</div><svg viewBox="0 0 240 110" style="width:100%;display:block;margin-top:.6rem;overflow:visible"><defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4EA2EA" stop-opacity=".55"/><stop offset="1" stop-color="#4EA2EA" stop-opacity="0"/></linearGradient><clipPath id="cp"><rect id="cr" x="0" y="-10" width="0" height="130"/></clipPath></defs><path clip-path="url(#cp)" d="M0 100 C50 98 80 88 120 76 S190 48 240 14 L240 110 L0 110Z" fill="url(#ag)"/><path id="line" d="M0 100 C50 98 80 88 120 76 S190 48 240 14" fill="none" stroke="#4EA2EA" stroke-width="2.6" stroke-linecap="round"/><circle id="dot" r="4.5" fill="#fff"/></svg></div></div>`,
  js:`const line=document.getElementById('line'), dot=document.getElementById('dot'), cr=document.getElementById('cr'), val=document.getElementById('val'), bdg=document.getElementById('bdg'), st=document.getElementById('st');
const L=line.getTotalLength(); line.style.strokeDasharray=L;
play(5,t=>{
  const p=ease.inOut(seg(t,.5,2.7)), o=1-seg(t,4.4,4.8);
  line.style.strokeDashoffset=L*(1-p);
  const pt=line.getPointAtLength(L*p);
  dot.setAttribute('cx',pt.x); dot.setAttribute('cy',pt.y); cr.setAttribute('width',pt.x);
  val.textContent=lerp(5.6,6.0,p).toFixed(1)+'M';
  st.style.opacity=ease.out(seg(t,0,.5))*o;
  bdg.style.opacity=seg(t,2.7,2.9);
  bdg.style.transform='scale('+lerp(.5,1,ease.back(seg(t,2.7,3.2)))+')';
});` },

/* 7 ---------------------------------------------------------------- */
{ id:'particles', fa:'ذرات طلایی (Bokeh)', en:'Particle Burst', cat:'fx',
  when:'لحظه‌ی «وای» یا عدد بزرگ؛ حس جشن و مقیاس. ذرات دور عدد پخش می‌شن و چشمک می‌زنن.',
  timing:'پخش ۱٫۶ ثانیه · چشمک ۰٫۶ تا ۱ ثانیه · ۱۷۰ ذره با seed ثابت',
  where:'ثانیه ۰ و ۳۶ تا ۳۸', colors:['#EAC68A','#D2AE72','#FFFFFF'], dur:5,
  css:`canvas{position:absolute;inset:0;width:100%;height:100%}
.num{position:absolute;left:0;right:0;top:19.6rem;text-align:center;font:800 3rem/1 'Inter Tight',sans-serif;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.cap{position:absolute;left:0;right:0;top:25rem;text-align:center;direction:rtl;font-weight:800;font-size:1.4rem}`,
  html:`<div class="stage"><canvas id="cv" width="540" height="960"></canvas><div class="num" id="n">700,000,000</div><div class="cap" id="cap">حدوداً نزدیک</div></div>`,
  js:`const cv=document.getElementById('cv'), g=cv.getContext('2d'), n=document.getElementById('n'), cap=document.getElementById('cap');
function rnd(s){return function(){s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const R=rnd(7), P=[];
for(let i=0;i<170;i++){const q=R();P.push({a:R()*6.283,r:Math.sqrt(R()),s:.6+R()*2.2,ph:R()*6.283,c:q<.25?'255,255,255':(q<.6?'234,198,138':'210,174,114')})}
play(5,t=>{
  g.clearRect(0,0,540,960);
  const burst=ease.out(seg(t,0,1.6)), fade=1-seg(t,4.3,4.8);
  P.forEach(p=>{
    const rad=(50+p.r*165)*lerp(.5,1,burst)+Math.sin(t*.8+p.ph)*6;
    const x=270+Math.cos(p.a)*rad*1.1, y=410+Math.sin(p.a)*rad*.8;
    const tw=.3+.7*Math.abs(Math.sin(t*1.7+p.ph));
    g.shadowColor='rgba('+p.c+',.9)'; g.shadowBlur=10;
    g.fillStyle='rgba('+p.c+','+(tw*.9*fade)+')';
    g.beginPath(); g.arc(x,y,p.s*3,0,6.283); g.fill();
  });
  n.style.opacity=fade*ease.out(seg(t,0,.5)); cap.style.opacity=fade*seg(t,.8,1.3);
});` },

/* 8 ---------------------------------------------------------------- */
{ id:'stack', fa:'کارت‌های روی‌هم', en:'Stacked Cards', cat:'ui',
  when:'چند مورد هم‌نوع پشت سر هم (ویدیوها، ماه‌ها، اعضا). هر کارت با فاصله وارد می‌شه و روی قبلی می‌شینه.',
  timing:'هر کارت ۰٫۶ ثانیه · فاصله‌ی ۰٫۳۵ ثانیه · ease-out-back + چرخش کم',
  where:'ثانیه ۲۰ تا ۲۳ و ۳۳ تا ۳۴', colors:['#F61E36','#F6FBFF'], dur:5,
  css:`.sc{position:absolute;left:2.2rem;top:12rem;width:11rem;padding:.9rem 1rem;border-radius:1rem;background:linear-gradient(160deg,#2a2d33,#14161a);border:1px solid rgba(255,255,255,.12);box-shadow:0 1rem 2rem rgba(0,0,0,.5);font-family:'Inter Tight',sans-serif}
.sc b{display:flex;gap:.5rem;align-items:center;font-size:.85rem}
.ic{width:1rem;height:1rem;border-radius:.3rem;background:#F61E36}
.sc strong{display:block;margin-top:.5rem;font:700 1.9rem 'Inter Tight',sans-serif}
.sc span{font-size:.7rem;opacity:.6}`,
  html:`<div class="stage">${FOOT}<div class="sc" style="z-index:1"><b><i class="ic"></i>Shorts</b><strong>50M</strong><span>views</span></div><div class="sc" style="z-index:2"><b><i class="ic"></i>Shorts</b><strong>40M</strong><span>views</span></div><div class="sc" style="z-index:3"><b><i class="ic"></i>Shorts</b><strong>70M</strong><span>views</span></div></div>`,
  js:`const cs=[...document.querySelectorAll('.sc')];
play(5,t=>cs.forEach((c,i)=>{
  const a=.3+i*.35, p=ease.back(seg(t,a,a+.6)), o=seg(t,4.1,4.6);
  c.style.opacity=seg(t,a,a+.2)*(1-o);
  c.style.transform='translate('+lerp(-14,i*1.2,p)+'rem,'+(i*4.3)+'rem) rotate('+lerp(-8,(i-1)*1.6,p)+'deg)';
}));` },

/* 9 ---------------------------------------------------------------- */
{ id:'cursor', fa:'کرسر و برچسب نقش', en:'Cursor + Tag Pointer', cat:'ui',
  when:'معرفی آدم‌ها یا نقش‌ها؛ حس یک رابط واقعی. کرسر روی منحنی می‌ره، برچسب همراهشه و کلیک حلقه می‌سازه.',
  timing:'حرکت ۱٫۵ ثانیه روی منحنی · ease-in-out · کلیک ۰٫۶ ثانیه',
  where:'ثانیه ۳۹ تا ۴۴', colors:['#72D2AE','#4EA2EA'], dur:4.6,
  css:`.list{position:absolute;left:2rem;top:10rem;width:15.5rem;padding:1rem}
.row{display:flex;gap:.7rem;align-items:center;padding:.55rem .6rem;border-radius:.7rem;font:600 .95rem 'Vazirmatn',sans-serif;direction:rtl;justify-content:flex-end}
.row small{margin-right:auto;opacity:.55;font:500 .7rem 'Inter Tight',sans-serif}
.pa{width:1.7rem;height:1.7rem;border-radius:50%;display:grid;place-items:center;color:#10131a;font:800 .75rem 'Inter Tight',sans-serif}
.cur{position:absolute;left:0;top:0;width:1.7rem;z-index:5}
.tag{position:absolute;left:0;top:0;padding:.22rem .6rem;border-radius:.5rem;background:#72D2AE;color:#052418;font:700 .8rem 'Inter Tight',sans-serif;z-index:5}
.rip{position:absolute;left:0;top:0;width:2.6rem;height:2.6rem;margin:-1.3rem 0 0 -1.3rem;border:2px solid #4EA2EA;border-radius:50%;opacity:0}`,
  html:`<div class="stage">${FOOT}<div class="list glass"><div class="row"><span>رایان</span><span class="pa" style="background:#D2AE72">R</span></div><div class="row" id="target"><span>سارا</span><span class="pa" style="background:#72D2AE">S</span></div><div class="row"><span>امید</span><span class="pa" style="background:#4EA2EA">O</span></div><div class="row"><span>نیکا</span><span class="pa" style="background:#E8EEF9">N</span></div></div><div class="rip" id="rip"></div><svg class="cur" id="cur" viewBox="0 0 24 24"><path d="M4 2l15 9-6.5 1.6L9 19z" fill="#fff" stroke="#10131a" stroke-width="1.4" stroke-linejoin="round"/></svg><div class="tag" id="tag">Editor</div></div>`,
  js:`const cur=document.getElementById('cur'), tag=document.getElementById('tag'), rip=document.getElementById('rip'), target=document.getElementById('target');
const rem=parseFloat(getComputedStyle(document.documentElement).fontSize);
const bez=(a,b,c,t)=>[(1-t)*(1-t)*a[0]+2*(1-t)*t*b[0]+t*t*c[0],(1-t)*(1-t)*a[1]+2*(1-t)*t*b[1]+t*t*c[1]];
const A=[22,36], B=[10,29], C=[5.6,14.6];            // start, control, end (in rem)
play(4.6,t=>{
  const p=ease.inOut(seg(t,.5,2)), q=seg(t,2.1,2.7), o=1-seg(t,4,4.4);
  const xy=bez(A,B,C,p);
  cur.style.transform='translate('+xy[0]+'rem,'+xy[1]+'rem) scale('+(1-.15*Math.sin(q*3.14))+')';
  tag.style.transform='translate('+(xy[0]+1.3)+'rem,'+(xy[1]+1.6)+'rem)';
  tag.style.opacity=seg(t,.5,.8)*o; cur.style.opacity=seg(t,.3,.6)*o;
  rip.style.left=C[0]+'rem'; rip.style.top=C[1]+'rem';
  rip.style.opacity=q>0?(1-q)*.9:0; rip.style.transform='scale('+lerp(.3,2.2,ease.out(q))+')';
  target.style.background='rgba(255,255,255,'+(.16*seg(t,2.1,2.3)*o)+')';
});` },

/* 10 --------------------------------------------------------------- */
{ id:'toggle', fa:'سوییچ دوحالته', en:'Segmented Toggle', cat:'ui',
  when:'مقایسه‌ی دو حالت (قبل/بعد، موبایل/تیم). پیل طلایی می‌لغزه و جمله‌ی بالا عوض می‌شه.',
  timing:'لغزش ۰٫۶ ثانیه · ease-in-out · تغییر متن هم‌زمان با لغزش',
  where:'ثانیه ۳۹ تا ۴۳', colors:['#EAC68A','#C6A266','#F6FBFF'], dur:4.6,
  css:`.q{position:absolute;left:1.5rem;right:1.5rem;top:12rem;height:6rem;direction:rtl;text-align:center;font-weight:800;font-size:1.7rem;line-height:1.6}
.q span{position:absolute;left:0;right:0;top:0}
.seg{position:absolute;left:4.5rem;right:4.5rem;top:20rem;height:3.2rem;display:grid;grid-template-columns:1fr 1fr;border-radius:2rem;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);font:600 .9rem 'Inter Tight',sans-serif}
.pl{position:absolute;left:.28rem;top:.28rem;bottom:.28rem;width:calc(50% - .28rem);border-radius:2rem;background:linear-gradient(#EAC68A,#C6A266)}
.seg i{position:relative;z-index:1;display:grid;place-items:center;font-style:normal}`,
  html:`<div class="stage"><div class="q"><span id="q1">هنوز با <b style="color:#EAC68A">موبایل</b> ادیت می‌زنی؟</span><span id="q2">تیم داریم، <b style="color:#EAC68A">دفتر</b> داریم</span></div><div class="seg" id="seg"><div class="pl" id="pl"></div><i id="l1">Mobile</i><i id="l2">Team</i></div></div>`,
  js:`const q1=document.getElementById('q1'), q2=document.getElementById('q2'), pl=document.getElementById('pl'), l1=document.getElementById('l1'), l2=document.getElementById('l2'), seg_=document.getElementById('seg');
play(4.6,t=>{
  const p=ease.inOut(seg(t,1.6,2.2)), o=1-seg(t,4,4.4), i=ease.out(seg(t,0,.5));
  pl.style.transform='translateX('+(p*100)+'%)';
  l1.style.color=p<.5?'#1a1305':'#F6FBFF'; l2.style.color=p<.5?'#F6FBFF':'#1a1305';
  q1.style.opacity=(1-p)*o*i; q2.style.opacity=p*o;
  q1.style.transform='translateY('+(-p*1)+'rem)'; q2.style.transform='translateY('+((1-p)*1)+'rem)';
  seg_.style.opacity=o*i;
});` },

/* 11 --------------------------------------------------------------- */
{ id:'reveal', fa:'افشای متن و رول رقم', en:'Mask Reveal + Digit Roll', cat:'type',
  when:'عنوان بزرگ یا عدد نتیجه (EDIT و ۰۴). متن با ماسک از چپ پاک‌کننده می‌شه و رقم مثل کنتور می‌چرخه.',
  timing:'ماسک ۰٫۹ ثانیه · ease-out · رول رقم ۱٫۲ ثانیه · ease-in-out',
  where:'ثانیه ۳۹ تا ۴۴', colors:['#F6FBFF'], dur:4.6,
  css:`.panel{position:absolute;left:1.4rem;right:1.4rem;top:11.5rem;height:11rem}
.meta{position:absolute;left:2.6rem;top:12.5rem;font:600 .65rem 'Inter Tight',sans-serif;letter-spacing:.18em;opacity:.65}
.meta.r{left:auto;right:2.6rem}
.big{position:absolute;left:2.6rem;top:15rem;font:200 5rem/5rem 'Inter Tight',sans-serif;letter-spacing:.02em;clip-path:inset(0 100% 0 0)}
.win{position:absolute;right:2.6rem;top:15rem;display:flex;font:800 5rem/5rem 'Inter Tight',sans-serif;height:5rem}
.clip{height:5rem;overflow:hidden}
.clip div,.win>div{height:5rem}`,
  html:`<div class="stage">${FOOT}<div class="panel glass" id="pn"></div><div class="meta" id="m1">TODAY · 2026</div><div class="meta r" id="m2">TEAM</div><div class="big" id="big">EDIT</div><div class="win" id="win"><div>0</div><div class="clip"><div id="col"><div>0</div><div>1</div><div>2</div><div>3</div><div>4</div></div></div></div></div>`,
  js:`const big=document.getElementById('big'), col=document.getElementById('col'), win=document.getElementById('win'), pn=document.getElementById('pn'), m1=document.getElementById('m1'), m2=document.getElementById('m2');
play(4.6,t=>{
  const w=ease.out(seg(t,.4,1.3)), r=ease.inOut(seg(t,1.6,2.8)), o=1-seg(t,4,4.4);
  pn.style.opacity=ease.out(seg(t,0,.4))*o; m1.style.opacity=m2.style.opacity=seg(t,.3,.7)*o*.65;
  big.style.clipPath='inset(0 '+((1-w)*100)+'% 0 0)'; big.style.opacity=o;
  win.style.opacity=seg(t,1.4,1.7)*o;
  col.style.transform='translateY(-'+(r*20)+'rem)';
});` },

/* 12 --------------------------------------------------------------- */
{ id:'frame', fa:'قاب گوشی با درخشش', en:'Device Frame + Glow', cat:'layout',
  when:'نمونه‌کار قبل/بعد. نسخه‌ی خام کمرنگ و کج، نسخه‌ی نهایی بزرگ‌تر با نور آبی که نفس می‌کشه.',
  timing:'ورود ۰٫۸ ثانیه · ease-out-back · ضربان نور حدود ۲ ثانیه',
  where:'کل ویدیو', colors:['#294C87','#9AB5ED','#152139','#2F4A7F','#A0C4FF','#6AA0F3'], dur:5,
  css:`.stage{background:radial-gradient(90% 60% at 60% 45%,#1d3460 0%,#0E162E 45%,#070B13 85%)}
.lbl{position:absolute;left:0;right:0;top:5rem;text-align:center;font:600 .7rem 'Inter Tight',sans-serif;letter-spacing:.3em;color:#929EBB}
h1{position:absolute;left:0;right:0;top:6.4rem;text-align:center;font:800 3.2rem/1 'Inter Tight',sans-serif;letter-spacing:-.03em;background:linear-gradient(#A0C4FF,#6AA0F3);-webkit-background-clip:text;background-clip:text;color:transparent}
h1 em{font:italic 400 3.4rem 'Instrument Serif',serif;background:linear-gradient(#EBF4FF,#9AB5ED);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:0}
.ph{position:absolute;border-radius:1.5rem;overflow:hidden}
.raw{left:1.6rem;top:13.5rem;width:10rem;height:17rem;background:linear-gradient(#6b6b66,#44443f);border:1px solid rgba(255,255,255,.15)}
.fin{right:1.6rem;top:11rem;width:12.5rem;height:21rem;background:linear-gradient(#7d7d77,#4a4a45);border:1px solid #294C87}
.tg{position:absolute;top:.6rem;left:50%;transform:translateX(-50%);padding:.3rem .8rem;border-radius:2rem;background:#152139;border:1px solid rgba(255,255,255,.1);font:700 .6rem 'Inter Tight',sans-serif;letter-spacing:.16em;white-space:nowrap}`,
  html:`<div class="stage"><div class="lbl">BEFORE · AFTER</div><h1>Reel <em>edit</em></h1><div class="ph raw" id="raw"><span class="tg">RAW</span></div><div class="ph fin" id="fin"><span class="tg">FINAL EDIT</span></div></div>`,
  js:`const raw=document.getElementById('raw'), fin=document.getElementById('fin');
play(5,t=>{
  const a=ease.back(seg(t,.2,1)), b=ease.back(seg(t,.5,1.3)), o=1-seg(t,4.4,4.9);
  raw.style.opacity=seg(t,.2,.5)*.85*o;
  raw.style.transform='translateX('+lerp(-8,0,a)+'rem) rotate('+lerp(-12,-4,a)+'deg)';
  fin.style.opacity=seg(t,.5,.8)*o;
  fin.style.transform='scale('+lerp(.82,1,b)+')';
  const g=1.6+.6*Math.sin(t*3.1);
  fin.style.boxShadow='0 0 '+g+'rem rgba(79,140,255,.55),0 0 '+(g*2.4)+'rem rgba(47,74,127,.55)';
});` },

/* 13 --------------------------------------------------------------- */
{ id:'pushin', fa:'زوم آهسته و پرش کادر', en:'Push-in + Reframe Punch', cat:'fx',
  when:'ریتم دادن به مصاحبه‌ی ثابت. زوم کند، بعد پرش کوتاه به کادر نزدیک‌تر با فلاش خیلی ملایم.',
  timing:'زوم آهسته ۲٫۴ ثانیه · پرش ۰٫۲ ثانیه · ease-out',
  where:'کل ویدیو (حدود ثانیه ۲ تا ۶)', colors:[], dur:5,
  css:`.foot{transform-origin:50% 36%;will-change:transform}
.vg{position:absolute;inset:0;background:radial-gradient(70% 55% at 50% 45%,transparent 40%,rgba(0,0,0,.55))}
.fl{position:absolute;inset:0;background:#fff;opacity:0}`,
  html:`<div class="stage">${FOOT.replace('class="foot"','class="foot" id="foot"')}<div class="vg"></div><div class="fl" id="fl"></div></div>`,
  js:`const foot=document.getElementById('foot'), fl=document.getElementById('fl');
play(5,t=>{
  const base=lerp(1,1.1,ease.inOut(seg(t,0,2.4)));
  const punch=ease.out(seg(t,2.4,2.6))*.22;
  const drift=seg(t,2.6,4.8)*.08;
  foot.style.transform='scale('+(base+punch+drift)+')';
  fl.style.opacity=.16*Math.max(0,1-Math.abs(t-2.45)/.12);
});` },

/* 14 --------------------------------------------------------------- */
{ id:'wire', fa:'مدل سیمی دستگاه', en:'Wireframe Mockup Draw-on', cat:'ui',
  when:'نشان‌دادن دستگاه یا محصول به شکل ساده بدون عکس. خط‌ها کشیده می‌شن و میله‌های رنگی رشد می‌کنن.',
  timing:'رسم خط ۱٫۲ ثانیه · میله‌ها ۰٫۶ ثانیه با فاصله · برچسب با ease-out-back',
  where:'ثانیه ۶', colors:['#F6FBFF','#72D2AE','#D2AE72','#4EA2EA'], dur:4.6,
  css:`.stage{background:radial-gradient(rgba(255,255,255,.14) 1px,transparent 1.2px) 0 0/1.3rem 1.3rem,radial-gradient(120% 80% at 50% 30%,#1b2a4a 0%,#090E19 70%)}
svg{position:absolute;left:50%;top:10rem;width:13rem;margin-left:-6.5rem;overflow:visible}
.tg{position:absolute;left:50%;top:7.8rem;transform:translateX(-50%);padding:.3rem .8rem;border-radius:.4rem;background:#1b3a6e;border:1px solid #4EA2EA;font:600 .75rem 'Inter Tight',sans-serif;white-space:nowrap}`,
  html:`<div class="stage"><div class="tg" id="tg">Poco X3 · 2020</div><svg viewBox="0 0 200 340"><rect id="body" x="6" y="6" width="188" height="328" rx="28" fill="none" stroke="#F6FBFF" stroke-width="2.4"/><circle id="notch" cx="100" cy="24" r="5" fill="none" stroke="#F6FBFF" stroke-width="2"/><rect class="bar" x="26" y="200" width="148" height="9" rx="4.5" fill="#72D2AE"/><rect class="bar" x="26" y="222" width="110" height="9" rx="4.5" fill="#D2AE72"/><rect class="bar" x="26" y="244" width="130" height="9" rx="4.5" fill="#4EA2EA"/></svg></div>`,
  js:`const body=document.getElementById('body'), notch=document.getElementById('notch'), tg=document.getElementById('tg'), bars=[...document.querySelectorAll('.bar')];
const L=body.getTotalLength(); body.style.strokeDasharray=L;
const W=[148,110,130];
play(4.6,t=>{
  const d=ease.inOut(seg(t,.3,1.5)), o=1-seg(t,4,4.4);
  body.style.strokeDashoffset=L*(1-d); body.style.opacity=o;
  notch.style.opacity=seg(t,1.3,1.6)*o;
  bars.forEach((b,i)=>{b.setAttribute('width',W[i]*ease.out(seg(t,1.6+i*.2,2.2+i*.2)));b.style.opacity=o});
  tg.style.opacity=seg(t,.3,.5)*o;
  tg.style.transform='translateX(-50%) scale('+lerp(.6,1,ease.back(seg(t,.3,.9)))+')';
});` }
];

const CATS = { type:'تایپوگرافی', ui:'کارت و UI', data:'عدد و داده', fx:'افکت و دوربین', layout:'قاب و چیدمان' };

const VIDEOS = [{
  id:'v1', n:1, title:'ریل ادیت: قبل و بعد', meta:'۴۵ ثانیه · ۷۲۰×۱۲۸۰ · ادیت پادکست فارسی',
  mood:'تیره و سینمایی. پس‌زمینه‌ی سرمه‌ای تقریباً سیاه، نور آبی الکتریکی دور قاب، طلایی فقط برای پول و عدد. رابط‌های ساختگی جای فیلم آرشیوی رو می‌گیرن.',
  rules:[
    'هر ادعا یک مدرک بصری داره: حرف از پول، کارت پول. حرف از رشد، نمودار.',
    'وقتی گرافیک میاد، فوتیج تار و تیره می‌شه و بعد برمی‌گرده. صورت و گرافیک همزمان رقابت نمی‌کنن.',
    'رنگ‌ها نقش ثابت دارن: طلایی برای پول و عدد، آبی برای UI و برند، سبز برای مثبت، قرمز فقط برای یوتیوب.',
    'گرافیک کنار صورت کوچک می‌مونه. فقط وقتی فوتیج رها می‌شه، تمام‌صفحه می‌شه.',
    'ورود حدود ۰٫۴ تا ۰٫۸ ثانیه با ease-out یا back، خروج سریع‌تر.',
    'تایپ: گروتسک بولد فشرده برای تیتر و عددهای بزرگ، ایتالیک سریف برای مبلغ و تأکید، زیرنویس فارسی سفید با کلمه‌ی کلیدی رنگی.'
  ],
  palette:[
    { g:'پس‌زمینه', c:[['#090E19','بالای صفحه'],['#070B13','پایین صفحه'],['#0E162E','کناره‌ی نور'],['#152139','پیل برچسب‌ها']] },
    { g:'نور و قاب', c:[['#2F4A7F','نور کنار قاب'],['#1F3664','نور دورتر'],['#294C87','حاشیه‌ی قاب'],['#9AB5ED','لبه‌ی روشن قاب']] },
    { g:'آبی برند و UI', c:[['#A0C4FF','بالای تیتر'],['#6AA0F3','پایین تیتر'],['#88BAFD','دکمه'],['#4EA2EA','خط نمودار']] },
    { g:'طلایی (پول و عدد)', c:[['#EAC68A','روشن'],['#D2AE72','اصلی'],['#C6A266','تیره']] },
    { g:'وضعیت', c:[['#72D2AE','عدد مثبت'],['#1EAE4E','بج رشد'],['#F61E36','یوتیوب']] },
    { g:'متن', c:[['#F6FBFF','تیتر'],['#EBF4FF','ایتالیک'],['#929EBB','برچسب'],['#8F97B0','زیرنویس'],['#6E778C','فوتر']] }
  ]
}];

let TOKENS_CSS = `:root{
  /* video 1: Reel edit */
  --bg-top:#090E19; --bg-bottom:#070B13; --glow-1:#2F4A7F; --glow-2:#1F3664; --glow-3:#0E162E;
  --pill-bg:#152139; --frame-border:#294C87; --frame-edge:#9AB5ED;
  --blue-hi:#A0C4FF; --blue-lo:#6AA0F3; --blue-btn:#88BAFD; --blue-ui:#4EA2EA;
  --gold-1:#EAC68A; --gold-2:#D2AE72; --gold-3:#C6A266;
  --green-text:#72D2AE; --green-badge:#1EAE4E; --red-yt:#F61E36;
  --text:#F6FBFF; --text-2:#EBF4FF; --muted-1:#929EBB; --muted-2:#8F97B0; --muted-3:#6E778C;
}`;

const RENDER_JS = `// render.js  ->  node render.js demo.html out.mp4 4.6
// demo.html = the full standalone file of one technique ("copy full file" button)
const {chromium}=require('playwright'), {execSync}=require('child_process'), fs=require('fs');
(async()=>{
  const [,, file, out, dur='4.6'] = process.argv, FPS=30, W=540, H=960;
  const b=await chromium.launch(), p=await b.newPage({viewport:{width:W,height:H}});
  await p.addInitScript(()=>{window.__T=0});            // switches the kit to render mode
  await p.goto('file://'+require('path').resolve(file));
  fs.mkdirSync('frames',{recursive:true});
  for(let i=0;i<Math.round(dur*FPS);i++){
    await p.evaluate(t=>{window.__T=t;window.__redraw()}, i/FPS);
    await p.screenshot({path:'frames/f'+String(i).padStart(4,'0')+'.png'});
  }
  await b.close();
  execSync('ffmpeg -y -framerate '+FPS+' -i frames/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18 '+out);
})();`;
