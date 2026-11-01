/* ===== Video 2: noir + neon-red music app concept ===== */
const NOIR = ".stage{background:radial-gradient(90% 55% at 50% 62%,#54160F 0%,#2a0b07 38%,#0D0301 78%)}";

TECHS.push(
/* 1 ---------------------------------------------------------------- */
{ v:2, id:'neonlogo', fa:'لوگوی نئونی و قفل لوگو', en:'Neon Logo Draw-on + Lockup', cat:'fx',
  when:'شروع یا پایان ریلز. خطوط لوگو کشیده می‌شن و می‌درخشن، بعد لوگو به چپ می‌ره و تگ‌لاین کنارش باز می‌شه.',
  timing:'کشیده‌شدن هر خط ۰٫۸ ثانیه با فاصله‌ی ۰٫۱۸ · جابه‌جایی ۱ ثانیه · باز‌شدن متن ۱٫۳ ثانیه',
  where:'ثانیه ۰ تا ۲ و ۱۱ تا ۱۴', colors:['#FF4F30','#FB4F41','#FFFFFF'], dur:5.4,
  css:`${NOIR}
.mark{position:absolute;left:11.5rem;top:19.5rem;width:4rem;height:4rem}
.tx{position:absolute;left:8.25rem;top:20.1rem;white-space:nowrap;font:600 2rem/1.2 'Inter Tight',sans-serif;letter-spacing:-.01em}
.tx em{font:italic 400 2.15rem 'Instrument Serif',serif;color:#FF4F30}`,
  html:`<div class="stage"><svg class="mark" id="mk" viewBox="0 0 64 64" fill="none" stroke="#FF4F30" stroke-width="3" stroke-linecap="round"><path id="r1" d="M10 36a22 22 0 1 1 44 0"/><path id="r2" d="M16 38a16 16 0 1 1 32 0"/><path id="r3" d="M24 43q8 6 16 0"/></svg><div class="tx" id="tx">Sound, <em>unbroken.</em></div></div>`,
  js:`const P=['r1','r2','r3'].map(i=>document.getElementById(i)), mk=document.getElementById('mk'), tx=document.getElementById('tx');
const Ls=P.map(p=>{const L=p.getTotalLength();p.style.strokeDasharray=L;return L});
play(5.4,t=>{
  const o=1-seg(t,4.7,5.2);
  P.forEach((p,i)=>p.style.strokeDashoffset=Ls[i]*(1-ease.inOut(seg(t,.1+i*.18,.9+i*.18))));
  const pop=ease.back(seg(t,.1,.9)), mv=ease.inOut(seg(t,1.4,2.4));
  mk.style.opacity=seg(t,.05,.3)*o;
  mk.style.transform='translateX('+lerp(0,-8.25,mv)+'rem) scale('+lerp(.6,1,pop)+')';
  mk.style.filter='drop-shadow(0 0 '+(.5+.25*Math.sin(t*3))+'rem rgba(255,79,48,.75))';
  const m=ease.inOut(seg(t,1.7,3))*130-20;                         // feathered wipe
  tx.style.opacity=o;
  tx.style.webkitMaskImage=tx.style.maskImage='linear-gradient(90deg,#000 '+m+'%,transparent '+(m+18)+'%)';
});` },

/* 2 ---------------------------------------------------------------- */
{ v:2, id:'softwipe', fa:'افشای متن با لبه‌ی نرم', en:'Soft-edge Text Wipe', cat:'type',
  when:'جمله‌ی کوتاه و آرام. یا محو با بلور (جمله‌ی اول) یا پاک‌کننده‌ی نرم از چپ (جمله‌ی دوم). برای فارسی جهت رو برعکس کن.',
  timing:'محو و بلور ۰٫۷ ثانیه · پاک‌کننده ۱٫۳ ثانیه · ease-in-out · لبه‌ی ۱۸٪',
  where:'ثانیه ۹ تا ۱۱', colors:['#FFFFFF'], dur:6,
  css:`${NOIR}
.ln{position:absolute;left:1rem;right:1rem;text-align:center;white-space:nowrap;font:500 1.9rem/1.25 'Inter Tight',sans-serif}
#a{top:19rem}
#b{top:22rem;font-weight:400;letter-spacing:.01em}`,
  html:`<div class="stage"><div class="ln" id="a">More than just sound</div><div class="ln" id="b">It's an experience.</div></div>`,
  js:`const a=document.getElementById('a'), b=document.getElementById('b');
function wipe(el,p,deg){const m=p*130-20; el.style.webkitMaskImage=el.style.maskImage='linear-gradient('+deg+'deg,#000 '+m+'%,transparent '+(m+18)+'%)'}
play(6,t=>{
  const ai=ease.out(seg(t,.2,.9)), ao=seg(t,1.9,2.4);
  a.style.opacity=ai*(1-ao);
  a.style.filter='blur('+((1-ai)*.6+ao*.6)+'rem)';
  a.style.transform='translateY('+((1-ai)*.8)+'rem)';
  wipe(b,ease.inOut(seg(t,2.7,4)),90);                              // use 270 for RTL text
  b.style.opacity=1-seg(t,5.2,5.7);
});` },

/* 3 ---------------------------------------------------------------- */
{ v:2, id:'headswap', fa:'تیتر ترکیبی و تعویض کلمه', en:'Headline Word Swap', cat:'type',
  when:'تیتر دو‌بخشی: کلمه‌ی ثابت سفید، کلمه‌ی کلیدی ایتالیک قرمز. کلمه‌ی کلیدی بین صحنه‌ها عوض می‌شه.',
  timing:'ورود ۰٫۶ ثانیه · تعویض ۰٫۷ ثانیه (کلمه‌ی قدیم بالا می‌ره، جدید از پایین میاد)',
  where:'ثانیه ۳ تا ۵', colors:['#FFFFFF','#FF4F30'], dur:5,
  css:`${NOIR}
.hd{position:absolute;left:2rem;top:17rem;font:600 3.1rem/1.15 'Inter Tight',sans-serif;letter-spacing:-.02em;white-space:nowrap}
.sw{position:relative;display:inline-block;width:12rem;height:1.25em;vertical-align:bottom;overflow:hidden}
.sw span{position:absolute;left:0;top:0;font:italic 400 3.3rem/1.25 'Instrument Serif',serif;color:#FF4F30;white-space:nowrap}`,
  html:`<div class="stage"><div class="hd" id="hd">Pure <span class="sw"><span id="w1">Sound.</span><span id="w2">Premium.</span></span></div></div>`,
  js:`const hd=document.getElementById('hd'), w1=document.getElementById('w1'), w2=document.getElementById('w2');
play(5,t=>{
  const e=ease.out(seg(t,.2,.8)), s=ease.inOut(seg(t,2,2.7));
  hd.style.opacity=e*(1-seg(t,4.4,4.8));
  hd.style.transform='translateY('+lerp(1.5,0,e)+'rem)';
  w1.style.transform='translateY('+(-s*110)+'%)'; w1.style.opacity=1-s; w1.style.filter='blur('+(s*.5)+'rem)';
  w2.style.transform='translateY('+((1-s)*110)+'%)'; w2.style.opacity=s; w2.style.filter='blur('+((1-s)*.5)+'rem)';
});` },

/* 4 ---------------------------------------------------------------- */
{ v:2, id:'paracta', fa:'پاراگراف خط‌به‌خط و دکمه‌ی CTA', en:'Line Reveal + CTA Pill', cat:'type',
  when:'توضیح کوتاه زیر تیتر. هر خط جدا بالا میاد و در آخر دکمه‌ی دعوت به اقدام ظاهر می‌شه.',
  timing:'هر خط ۰٫۶ ثانیه با فاصله‌ی ۰٫۱۴ · دکمه با ease-out-back · درخشش ملایم بعد از ورود',
  where:'ثانیه ۴ تا ۶', colors:['#F1D0CC','#341A19','#FF4F30'], dur:5,
  css:`${NOIR}
.p{position:absolute;left:2rem;right:2rem;top:16rem;font:400 1.1rem/1.7 'Inter Tight',sans-serif;color:#F1D0CC}
.p span{display:block}
.cta{position:absolute;left:2rem;top:24.5rem;display:inline-flex;gap:.55rem;align-items:center;padding:.65rem 1.1rem;border-radius:2rem;background:#341A19;border:1px solid rgba(255,79,48,.35);font:500 .9rem 'Inter Tight',sans-serif;color:#fff}
.cta i{width:.8rem;height:.8rem;border-radius:50%;border:.14rem solid #FF4F30}`,
  html:`<div class="stage"><div class="p" id="p"><span>Ad-free music and videos.</span><span>Offline downloads for songs,</span><span>albums and playlists. Unlimited</span><span>skips and higher audio quality.</span></div><div class="cta" id="cta"><i></i>Go Premium →</div></div>`,
  js:`const L=[...document.querySelectorAll('#p span')], cta=document.getElementById('cta');
play(5,t=>{
  const o=1-seg(t,4.3,4.8);
  L.forEach((l,i)=>{
    const a=.3+i*.14, p=seg(t,a,a+.6), e=ease.out(p);
    l.style.opacity=e*o; l.style.transform='translateY('+lerp(1,0,e)+'rem)'; l.style.filter='blur('+lerp(.4,0,e)+'rem)';
  });
  const c=seg(t,1.4,1.9);
  cta.style.opacity=ease.out(c)*o;
  cta.style.transform='scale('+lerp(.8,1,ease.back(c))+')';
  cta.style.boxShadow='0 0 '+(1.2*seg(t,1.9,2.4))+'rem rgba(255,79,48,'+(.18+.12*Math.sin(t*3))+')';
});` },

/* 5 ---------------------------------------------------------------- */
{ v:2, id:'avatars', fa:'آواتارها با فیچرد مرکزی', en:'Avatar Fan-out Carousel', cat:'ui',
  when:'معرفی آدم‌ها یا هنرمندها. اولی وسط با حلقه‌ی نئونی میاد، بعد دو نفر دیگه از پشتش بیرون می‌زنن.',
  timing:'ورود مرکزی ۰٫۷ ثانیه · باز‌شدن ۰٫۹ ثانیه · پایین‌رفتن گروه ۰٫۹ ثانیه',
  where:'ثانیه ۲ تا ۴', colors:['#FF4F30','#F5AF5F','#F1D0CC','#846C69'], dur:6,
  css:`${NOIR}
.grp{position:absolute;inset:0}
.it{position:absolute;top:16rem;left:50%;width:8rem;margin-left:-4rem;text-align:center}
.av{width:6.4rem;height:6.4rem;margin:0 auto .8rem;border-radius:50%}
.it b{display:block;font:600 .9rem 'Inter Tight',sans-serif}
.it small{font:400 .65rem 'Inter Tight',sans-serif;color:#846C69}
.l .av{background:radial-gradient(circle at 50% 38%,#F1D0CC 0 7%,#8C4772 8% 36%,#2a1033 72%);box-shadow:0 0 0 .12rem rgba(241,208,204,.7)}
.c .av{background:radial-gradient(circle at 42% 36%,#ffb199,#FF4F30 22%,#4a0f08 62%,#140403);border:.2rem solid #FF4F30}
.r .av{background:linear-gradient(180deg,#F5AF5F,#CD732D 55%,#3a1a0a)}`,
  html:`<div class="stage"><div class="grp" id="grp"><div class="it l"><div class="av"></div><b>Nila</b><small>Singer</small></div><div class="it r"><div class="av"></div><b>Sahar</b><small>Producer</small></div><div class="it c" id="ctr"><div class="av" id="cav"></div><b>Arman</b><small>Featured Artist</small></div></div></div>`,
  js:`const L=document.querySelector('.it.l'), R=document.querySelector('.it.r'), C=document.getElementById('ctr'), cav=document.getElementById('cav'), grp=document.getElementById('grp');
play(6,t=>{
  const c=ease.back(seg(t,.2,.9)), f=ease.inOut(seg(t,1.5,2.4)), d=ease.inOut(seg(t,3.6,4.5)), o=1-seg(t,5.3,5.8);
  grp.style.transform='translateY('+(d*8)+'rem) scale('+lerp(1,.92,d)+')'; grp.style.opacity=o;
  C.style.opacity=seg(t,.2,.5); C.style.transform='scale('+lerp(.6,1,c)+')'; C.style.zIndex=3;
  cav.style.boxShadow='0 0 '+(1.4+.5*Math.sin(t*3))+'rem rgba(255,79,48,.6)';
  [[L,-1],[R,1]].forEach(([e,s])=>{e.style.opacity=f; e.style.transform='translateX('+(s*9*f)+'rem) scale('+lerp(.7,.88,f)+')'});
});` },

/* 6 ---------------------------------------------------------------- */
{ v:2, id:'list3d', fa:'لیست سه‌بعدی کج با تیک‌های پی‌درپی', en:'3D Perspective List + Check Fill', cat:'ui',
  when:'نشان‌دادن یک قابلیت (دانلود، انتخاب). به‌جای موکاپ گوشی، لیست کج می‌شه و ردیف‌ها یکی‌یکی تیک می‌خورن.',
  timing:'ورود ردیف‌ها با فاصله‌ی ۰٫۱ ثانیه · تیک هر ردیف ۰٫۵ ثانیه با فاصله‌ی ۰٫۴۲ · اسکرول خروجی ۱٫۲ ثانیه',
  where:'ثانیه ۵٫۵ تا ۷', colors:['#180603','#291513','#FF4F30','#846C69'], dur:6.4,
  css:`${NOIR}
.scene{position:absolute;inset:0;perspective:60rem}
.list{position:absolute;left:2.4rem;right:1rem;top:7rem;transform-style:preserve-3d;transform:rotateX(14deg) rotateY(-12deg) rotateZ(-3deg)}
.row{height:4.6rem;margin-bottom:.9rem;border-radius:1rem;background:linear-gradient(135deg,#291513,#180603);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:.9rem;padding:0 1rem;box-shadow:0 1rem 2rem rgba(0,0,0,.5)}
.th{width:2.8rem;height:2.8rem;border-radius:.6rem;flex:none}
.nm b{display:block;font:600 1rem 'Inter Tight',sans-serif}
.nm small{font:400 .7rem 'Inter Tight',sans-serif;color:#846C69}
.ck{margin-left:auto;width:1.7rem;height:1.7rem;border-radius:50%;border:.14rem solid #FF4F30;display:grid;place-items:center;flex:none}
.ck svg{width:80%;opacity:0}`,
  html:`<div class="stage"><div class="scene"><div class="list" id="list">${['Night Drive|Arman|#F5AF5F,#7a3a1a','Slow Tide|Nila|#B07AE8,#3a1a60','Amber|Sahar|#FF4F30,#4a0f08','Glass Hours|Kian|#E9E1DF,#5a4a47','Low Light|Mina|#F5AF5F,#a0522d','Ember|Dara|#FF4F30,#8F2215','Afterglow|Roya|#7BA8FF,#1b2a60'].map(s=>{const a=s.split('|');return '<div class="row"><div class="th" style="background:linear-gradient(135deg,'+a[2]+')"></div><div class="nm"><b>'+a[0]+'</b><small>'+a[1]+'</small></div><div class="ck"><svg viewBox="0 0 16 16"><path d="M4 8.5l2.5 2.5L12 5.5" stroke="#fff" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>'}).join('')}</div></div></div>`,
  js:`const rows=[...document.querySelectorAll('.row')], list=document.getElementById('list');
play(6.4,t=>{
  rows.forEach((r,i)=>{
    const p=ease.out(seg(t,.2+i*.1,.8+i*.1));
    r.style.opacity=p; r.style.transform='translateY('+lerp(3,0,p)+'rem)';
    const s=1.8+i*.42, c=ease.out(seg(t,s,s+.5)), ck=r.querySelector('.ck'), tick=ck.firstElementChild;
    ck.style.background='rgba(255,79,48,'+c+')';
    tick.style.opacity=c; tick.style.transform='scale('+lerp(.4,1,ease.back(seg(t,s,s+.5)))+')';
  });
  const sc=ease.inOut(seg(t,4.6,5.8));
  list.style.transform='rotateX(14deg) rotateY(-12deg) rotateZ(-3deg) translateY('+(-sc*36)+'rem)';
  list.style.opacity=1-seg(t,5.4,6);
});` },

/* 7 ---------------------------------------------------------------- */
{ v:2, id:'chips', fa:'چیپ‌های افقی با فعال‌شدن قرمز', en:'Pill Chips Slide + Activate', cat:'ui',
  when:'فهرست مزیت‌ها یا فیلترها. نقطه‌ی قرمز به چیپ تبدیل می‌شه، ردیف می‌لغزه و آخرین چیپ قرمز روشن می‌شه.',
  timing:'هر چیپ ۰٫۶ ثانیه با فاصله‌ی ۰٫۸ · لغزش ردیف ۰٫۷ ثانیه · فعال‌شدن ۰٫۶ ثانیه',
  where:'ثانیه ۷ تا ۸٫۵', colors:['#392624','#8F2215','#EB3721'], dur:6,
  css:`${NOIR}
.dot{position:absolute;left:50%;top:22rem;width:.9rem;height:.9rem;margin:-.45rem 0 0 -.45rem;border-radius:50%;background:#FF4F30;box-shadow:0 0 1rem rgba(255,79,48,.8)}
.rowc{position:absolute;left:0;top:20.5rem;height:3rem}
.chip{position:absolute;top:0;padding:.85rem 1.3rem;border-radius:2rem;background:#392624;font:500 .9rem/1 'Inter Tight',sans-serif;white-space:nowrap}`,
  html:`<div class="stage"><div class="dot" id="dot"></div><div class="rowc" id="rowc"><div class="chip">All</div><div class="chip">Ad-free</div><div class="chip">Offline</div><div class="chip">Unlimited skips</div></div></div>`,
  js:`const row=document.getElementById('rowc'), dot=document.getElementById('dot'), chips=[...row.children];
const T=[1.1,1.9,2.7,3.5], mix=(a,b,t)=>'rgb('+a.map((v,i)=>Math.round(lerp(v,b[i],t))).join(',')+')';
play(6,t=>{
  const r=parseFloat(getComputedStyle(document.documentElement).fontSize), off=[], w=[]; let x=0;
  chips.forEach(c=>{const cw=c.offsetWidth/r; w.push(cw); off.push(x); x+=cw+.8});
  const ctr=i=>off[i]+w[i]/2; let cx=ctr(0);
  for(let i=1;i<chips.length;i++) cx=lerp(cx,ctr(i),ease.inOut(seg(t,T[i],T[i]+.7)));
  chips.forEach((c,i)=>{const p=seg(t,T[i],T[i]+.6); c.style.left=off[i]+'rem'; c.style.opacity=ease.out(p); c.style.transform='scale('+lerp(.8,1,ease.back(p))+')'});
  row.style.transform='translateX('+(13.5-cx)+'rem)'; row.style.opacity=1-seg(t,5.3,5.8);
  const a=ease.inOut(seg(t,3.5,4.1)), last=chips[3];
  last.style.background=mix([57,38,36],[235,55,33],a); last.style.boxShadow='0 0 '+(a*1.6)+'rem rgba(235,55,33,'+(a*.55)+')';
  dot.style.opacity=seg(t,.3,.6)*(1-seg(t,1,1.3));
  dot.style.transform='scale('+(1+.25*Math.sin(t*9))+')';
});` },

/* 8 ---------------------------------------------------------------- */
{ v:2, id:'glowblob', fa:'بلوب نور محیطی', en:'Ambient Glow Blob', cat:'fx',
  when:'جای هر تصویر پس‌زمینه. یک نور قرمز نرم و تار بین صحنه‌ها جابه‌جا و بزرگ و کوچک می‌شه تا حال‌وهوا عوض شه.',
  timing:'جابه‌جایی ۱٫۴ ثانیه هر بار · ease-in-out · تنفس خیلی کم (۴٪)',
  where:'کل ویدیو (اوج در ثانیه ۹)', colors:['#54160F','#922316','#0D0301'], dur:7,
  css:`.stage{background:#0D0301}
.bl{position:absolute;left:0;top:0;width:30rem;height:30rem;margin:-15rem 0 0 -15rem;border-radius:50%;background:radial-gradient(circle,#922316 0%,rgba(146,35,22,.55) 30%,rgba(84,22,15,.25) 55%,transparent 72%);filter:blur(1.2rem)}
.vg{position:absolute;inset:0;background:radial-gradient(70% 55% at 50% 50%,transparent 40%,rgba(0,0,0,.6))}
.cap{position:absolute;left:0;right:0;top:21rem;text-align:center;font:500 1.6rem 'Inter Tight',sans-serif}`,
  html:`<div class="stage"><div class="bl" id="bl"></div><div class="vg"></div><div class="cap" id="cap">Listen closer</div></div>`,
  js:`const bl=document.getElementById('bl'), cap=document.getElementById('cap');
const S=[[13.5,38,.8,.55],[17,33,1.25,1],[8,40,.9,.5]];            // x, y (rem), scale, opacity
play(7,t=>{
  const a=ease.inOut(seg(t,1.6,3)), b=ease.inOut(seg(t,4.2,5.6));
  const f=i=>lerp(lerp(S[0][i],S[1][i],a),S[2][i],b);
  bl.style.transform='translate('+f(0)+'rem,'+f(1)+'rem) scale('+(f(2)*(1+.04*Math.sin(t*2)))+')';
  bl.style.opacity=f(3);
  cap.style.opacity=ease.out(seg(t,2.6,3.2))*(1-seg(t,4.2,4.8));
});` },

/* 9 ---------------------------------------------------------------- */
{ v:2, id:'scenecut', fa:'انتقال صحنه با بلور و محو', en:'Blur-Fade Scene Cut', cat:'fx',
  when:'تعویض صحنه‌ها بدون برش تند. هر صحنه با بلور و بالا‌آمدن می‌آید و با بلور و کمی بزرگ‌شدن می‌رود.',
  timing:'ورود ۰٫۶ ثانیه · خروج ۰٫۵ ثانیه · هر صحنه حدود ۲٫۴ ثانیه',
  where:'کل ویدیو', colors:['#FFFFFF','#FF4F30'], dur:7.6,
  css:`${NOIR}
.sn{position:absolute;left:2rem;right:2rem;top:20rem;font:600 2.7rem/1.15 'Inter Tight',sans-serif;letter-spacing:-.02em;opacity:0}
.sn em{font:italic 400 2.9rem 'Instrument Serif',serif;color:#FF4F30}`,
  html:`<div class="stage"><div class="sn">Pure <em>sound.</em></div><div class="sn">Offline <em>anywhere.</em></div><div class="sn">Skip <em>freely.</em></div></div>`,
  js:`const sc=[...document.querySelectorAll('.sn')], T=[.3,2.6,4.9], D=2.4;
play(7.6,t=>sc.forEach((s,i)=>{
  const a=T[i], inn=ease.out(seg(t,a,a+.6)), out=ease.inOut(seg(t,a+D-.5,a+D));
  s.style.opacity=inn*(1-out);
  s.style.filter='blur('+((1-inn)*.9+out*.9)+'rem)';
  s.style.transform='translateY('+((1-inn)*1.2)+'rem) scale('+(1+out*.05)+')';
}));` }
);

VIDEOS.push({
  id:'v2', n:2, title:'اپ موسیقی پرمیوم: قرمز و مشکی', meta:'۱۴ ثانیه · ۷۲۰×۱۲۸۰ · کانسپت ریلز برای یک اپ موسیقی',
  mood:'تیره، لوکس و آرام. سیاه گرم با یک نور قرمز نرم که جای هر تصویر پس‌زمینه رو می‌گیره. فقط یک رنگ برند (قرمز نئونی) و همه‌چیز دیگه سفید یا صورتی‌سفید. هر صحنه فقط یک پیام داره.',
  rules:[
    'یک رنگ برند: قرمز نئونی روی سیاه گرم. متن‌ها سفید یا صورتی‌سفید، زیرعنوان قهوه‌ای کم‌رنگ.',
    'تیتر دوبخشی: کلمه‌ی ثابت سفید سن‌سریف، کلمه‌ی کلیدی ایتالیک سریف قرمز. کلمه‌ی کلیدی بین صحنه‌ها عوض می‌شه.',
    'هر صحنه یک پیام و یک المان دارد. انتقال‌ها همیشه با بلور و محو هستن، بدون برش تند.',
    'بلوب نور قرمز نرم جای پس‌زمینه‌ی تصویری می‌نشیند و بین صحنه‌ها جابه‌جا و بزرگ و کوچک می‌شه.',
    'قابلیت‌ها در رابط کج سه‌بعدی نشان داده می‌شن (نه موکاپ گوشی)؛ مثلاً دانلود آفلاین با تیک‌های پی‌درپی.',
    'ریتم: ورود ۰٫۵ تا ۰٫۸ ثانیه، هر صحنه حدود ۲ ثانیه، کل ریلز ۱۴ ثانیه. شروع و پایان با لوگوی نئونی.'
  ],
  palette:[
    { g:'پس‌زمینه', c:[['#0D0301','سیاه گرم'],['#100503','سیاه گرم دوم'],['#2F0F0A','پایین صحنه']] },
    { g:'نور محیطی', c:[['#54160F','نور ملایم'],['#922316','اوج بلوب']] },
    { g:'قرمز برند', c:[['#FF4F30','نئون و ایتالیک و تیک'],['#FB4F41','برچسب کوچک'],['#EB3721','چیپ فعال'],['#8F2215','چیپ در حال فعال‌شدن']] },
    { g:'سطح‌ها', c:[['#180603','کارت لیست'],['#291513','کارت لیست دوم'],['#392624','چیپ غیرفعال'],['#341A19','دکمه‌ی CTA']] },
    { g:'متن', c:[['#FFFFFF','تیتر'],['#F1D0CC','پاراگراف'],['#846C69','زیرعنوان']] },
    { g:'تصاویر آواتار', c:[['#F5AF5F','غروب (نمونه)']] }
  ]
});

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 2: noir + neon red */
  --noir-black:#0D0301; --noir-black-2:#100503; --noir-warm:#2F0F0A;
  --ember-glow-1:#54160F; --ember-glow-2:#922316;
  --neon-red:#FF4F30; --neon-red-2:#FB4F41; --chip-active:#EB3721; --chip-warming:#8F2215;
  --surface-1:#180603; --surface-2:#291513; --chip-idle:#392624; --cta-bg:#341A19;
  --white:#FFFFFF; --blush:#F1D0CC; --dim:#846C69; --sunset:#F5AF5F;
}`);
