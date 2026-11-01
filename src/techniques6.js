/* ===== Video 10: talking-head interview — head-anchored camera moves (digital punch-ins) + layered text ===== */
const FIG = `<svg class="fg" viewBox="0 0 27 48"><g stroke="#050a12" stroke-width=".38" fill="none" stroke-linecap="round"><path d="M10 33.2L8 46.5M17.2 33.2L19.2 46.5M13.6 33.6L13.6 45.5M8.6 41.3h10.5"/></g><rect x="9" y="32.2" width="9" height="1.3" rx=".65" fill="#06372F"/><path d="M19.6 30.4L23.6 30.4L24 41L20.4 41.3Z" fill="#4F6A7C"/><path d="M11 31L14.8 31L14.6 41.6L11.2 41.4Z" fill="#46627A"/><path d="M9.6 29.4L23.2 29.4Q24 29.6 24 31L24 32L9.6 32Z" fill="#4F6A7C"/><ellipse cx="22.3" cy="41.9" rx="2.1" ry=".9" fill="#C9C3BB"/><ellipse cx="12.9" cy="42.3" rx="2" ry=".9" fill="#B8B2AA"/><path d="M9.2 19.8Q13.5 17.6 17.8 19.8L18.8 30.2L8.2 30.2Z" fill="#0B1D4A"/><rect x="12.4" y="17.2" width="2.2" height="2.2" fill="#A9664A"/><g id="aL"><path d="M9.5 20.8L7.6 25.6L10.6 27.2" stroke="#16307A" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.9" cy="27.2" r=".85" fill="#A9664A"/></g><g id="aR"><path d="M17.5 20.8L19.4 25.6L16.4 27.2" stroke="#16307A" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16.1" cy="27.2" r=".85" fill="#A9664A"/></g><ellipse cx="13.5" cy="15.8" rx="2.1" ry="2.6" fill="#A9664A"/><ellipse cx="13.5" cy="13.7" rx="2.8" ry="1.7" fill="#1b1210"/><circle cx="11.3" cy="14.4" r="1" fill="#1b1210"/><circle cx="15.7" cy="14.4" r="1" fill="#1b1210"/><circle cx="12.4" cy="12.6" r="1" fill="#1b1210"/><circle cx="14.8" cy="12.6" r="1" fill="#1b1210"/></svg>`;

const SCENE_CSS = `.stage{background:#00162A}
.bgl{position:absolute;left:-8rem;top:-8rem;width:43rem;height:64rem;background:radial-gradient(70% 30% at 50% 88%,#04415B 0%,transparent 70%),radial-gradient(60% 40% at 30% 30%,#002E46 0%,transparent 70%),radial-gradient(50% 35% at 75% 55%,#00263E 0%,transparent 70%),#002039}
.bk{position:absolute;border-radius:50%;filter:blur(.7rem);background:rgba(20,90,130,.28)}
.sub{position:absolute;left:0;top:0;width:27rem;height:48rem}
.fg{position:absolute;left:0;top:0;width:27rem;height:48rem;overflow:visible}
.lb{position:absolute;left:1rem;top:1rem;font:600 .8rem/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#DBBFAA;opacity:.85;z-index:9}
.fl{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:8}`;

const SCENE_HTML = `<div class="bgl" id="bg"><i class="bk" style="left:6rem;top:10rem;width:7rem;height:7rem"></i><i class="bk" style="left:30rem;top:22rem;width:9rem;height:9rem"></i><i class="bk" style="left:12rem;top:38rem;width:6rem;height:6rem"></i></div><div class="sub" id="sub">${FIG}</div>`;

const CAMJS = `const HD=[13.5,15.8],aL=document.getElementById('aL'),aR=document.getElementById('aR'),sub=document.getElementById('sub'),bg=document.getElementById('bg');
function cam(s,T){sub.style.transformOrigin=HD[0]+'rem '+HD[1]+'rem';sub.style.transform='translate('+(T[0]-HD[0])+'rem,'+(T[1]-HD[1])+'rem) scale('+s+')'}
function camBg(s,T,k){bg.style.transformOrigin=HD[0]+'rem '+HD[1]+'rem';bg.style.transform='translate('+((T[0]-HD[0])*k)+'rem,'+((T[1]-HD[1])*k)+'rem) scale('+(1+(s-1)*k)+')'}
function gest(t){aL.setAttribute('transform','rotate('+(Math.sin(t*3.1)*9)+' 9.5 20.8)');aR.setAttribute('transform','rotate('+(Math.sin(t*2.6+1)*-9)+' 17.5 20.8)')}`;

TECHS.push(
{ v:10, id:'punchcut', fa:'پانچ‌این: برش بین نمای دور و نمای نزدیک', en:'Digital Punch-in Jump Cuts', cat:'fx',
  when:'ریتم دادن به ویدیوی مصاحبه با یک دوربین ثابت. هر ۳ تا ۵ ثانیه برش مستقیم بین نمای کامل (۱×) و نمای نزدیک (۲٫۲ تا ۲٫۵×) انجام می‌شه. بدون انیمیشن گذار؛ فقط برش و یک فلاش خیلی کم‌رنگ.',
  timing:'نمای دور ۱٫۶ تا ۳٫۲ ثانیه · نمای نزدیک ۱٫۸ تا ۴ ثانیه · ضریب بزرگ‌نمایی نزدیک ۲٫۲ تا ۲٫۵ · برش مستقیم بدون تونل‌زدن · فلاش ۸٪ برای ۰٫۱ ثانیه',
  where:'کل ویدیو (ثانیه‌های ۱٫۸ و ۳٫۷ و ۷ و ۱۲ و ۱۵٫۵ و ۲۱)', colors:['#002039','#002E46','#04415B','#DBBFAA'], dur:7.2,
  css:SCENE_CSS,
  html:`<div class="stage">${SCENE_HTML}<div class="lb" id="lb"></div><div class="fl" id="fl"></div></div>`,
  js:`${CAMJS}
const lb=document.getElementById('lb'),fl=document.getElementById('fl');
const S=[[0,1.8,1.08,1.0,[14.2,17.6],[14.2,17.9]],[1.8,3.6,2.4,2.0,[10.8,11.8],[11.6,13.6]],[3.6,5.2,1.0,1.12,[14.4,17.9],[14.2,16.8]],[5.2,7.2,2.2,1.9,[11.2,12.4],[11.8,14.2]]];
play(7.2,t=>{
  const k=S.find(x=>t>=x[0]&&t<x[1])||S[3],u=ease.out(seg(t,k[0],k[1])),s=lerp(k[2],k[3],u),T=[lerp(k[4][0],k[5][0],u),lerp(k[4][1],k[5][1],u)];
  cam(s,T);camBg(s,T,.35);gest(t);
  lb.textContent='x'+s.toFixed(2)+(k[2]>1.5?'  PUNCH-IN':'  WIDE');
  fl.style.opacity=.08*Math.max(0,1-(t-k[0])/.1);
});` },

{ v:10, id:'headdrift', fa:'حرکت آرام دوربین با قفل روی سر', en:'Head-locked Slow Push (Ken Burns)', cat:'fx',
  when:'داخل هر نما. مرکز زوم همیشه روی سر گوینده است نه وسط کادر، پس سر روی خط‌های یک‌سوم می‌مونه و بدن و دست‌ها نسبت به اون می‌لغزن. نمای نزدیک آروم به عقب می‌ره و نمای دور آروم جلو میاد.',
  timing:'نزدیک: از ۲٫۴× به ۱٫۹× در ۳ ثانیه (ease-out) · دور: از ۱٫۰× به ۱٫۱۲× در ۳ ثانیه · سر ۱ تا ۲٫۵rem به پایین می‌لغزه · مرکز تغییر مقیاس = سر',
  where:'تمام نماهای ویدیو', colors:['#002039','#DBBFAA','#F0EBEF'], dur:6.4,
  css:`${SCENE_CSS}
.gd{position:absolute;inset:0;pointer-events:none;z-index:7}
.gd i{position:absolute;background:rgba(240,235,239,.28)}
.hx{position:absolute;width:1.6rem;height:1.6rem;margin:-.8rem;border:.12rem solid #DBBFAA;border-radius:50%;z-index:7;box-shadow:0 0 .8rem rgba(219,191,170,.6)}`,
  html:`<div class="stage">${SCENE_HTML}<div class="gd"><i style="left:9rem;top:0;bottom:0;width:1px"></i><i style="left:18rem;top:0;bottom:0;width:1px"></i><i style="top:16rem;left:0;right:0;height:1px"></i><i style="top:32rem;left:0;right:0;height:1px"></i></div><div class="hx" id="hx"></div><div class="lb" id="lb"></div></div>`,
  js:`${CAMJS}
const hx=document.getElementById('hx'),lb=document.getElementById('lb');
play(6.4,t=>{
  let s,T;if(t<3.2){const u=ease.out(seg(t,0,3.2));s=lerp(2.4,1.9,u);T=[lerp(10.6,11.6,u),lerp(11,13.6,u)]}else{const u=ease.out(seg(t-3.2,0,3.2));s=lerp(1,1.12,u);T=[lerp(14.4,14.2,u),lerp(17.9,16.6,u)]}
  cam(s,T);camBg(s,T,.35);gest(t);hx.style.left=T[0]+'rem';hx.style.top=T[1]+'rem';
  lb.textContent=(t<3.2?'PUSH-OUT  ':'PUSH-IN  ')+'x'+s.toFixed(2);
});` },

{ v:10, id:'layerparallax', fa:'پارالاکس لایه‌ای: سوژه جدا از پس‌زمینه', en:'Subject / Background Parallax Scale', cat:'fx',
  when:'عمق دادن به فیلم تخت. سوژه به‌صورت یک لایه جدا از پس‌زمینه جدا می‌شه و در زوم، سوژه ۴ تا ۵٪ در ثانیه بزرگ می‌شه ولی پس‌زمینه فقط حدود ۱٪؛ حس دوربین واقعی (dolly) میاد.',
  timing:'سوژه ۴٫۵٪/ثانیه · پس‌زمینه ۱٪/ثانیه (ضریب ۰٫۳۵ از زوم سوژه) · مقایسه ۳ ثانیه تخت و ۳ ثانیه پارالاکس · پس‌زمینه‌ی تار برای پنهان‌شدن لبه‌ها',
  where:'نمای نزدیک ثانیه ۲ تا ۳٫۵ و نمای دور ثانیه ۱۲ تا ۱۵', colors:['#002039','#04415B','#00263E'], dur:6.4,
  css:`${SCENE_CSS}
.bgl{background-image:radial-gradient(#1c5a7a 1.5px,transparent 2px),radial-gradient(70% 30% at 50% 88%,#04415B 0%,transparent 70%),radial-gradient(60% 40% at 30% 30%,#002E46 0%,transparent 70%),radial-gradient(#fff0 0,#fff0 0);background-size:2.2rem 2.2rem,auto,auto,auto;background-color:#002039}
.lb{font-size:.85rem;line-height:1.5}`,
  html:`<div class="stage">${SCENE_HTML}<div class="lb" id="lb"></div></div>`,
  js:`${CAMJS}
const lb=document.getElementById('lb');
play(6.4,t=>{
  const par=t>=3.2,u=ease.inOut(seg(t%3.2,.2,2.9)),s=lerp(1.3,2.1,u),T=[lerp(13,11.4,u),lerp(17,13,u)],k=par?.3:1;
  cam(s,T);camBg(s,T,k);gest(t);
  lb.innerHTML=(par?'PARALLAX':'FLAT')+'<br>subject  x'+s.toFixed(2)+'<br>background  x'+(1+(s-1)*k).toFixed(2);
});` },

{ v:10, id:'headroomtext', fa:'تیتر در فضای بالای سر و قرارگیری کنار سر', en:'Head-anchored Text Placement', cat:'layout',
  when:'گذاشتن متن روی ویدیوی مصاحبه. در نمای دور تیتر درشت دقیقا بالای سر (headroom) می‌شینه و با سر جابه‌جا می‌شه. در نمای نزدیک قرص‌های متنی کنار سر، هم‌ارتفاع صورت، از لبه‌ی راست می‌لغزن.',
  timing:'تیتر ۰٫۷ ثانیه · بلور ۶ تا ۰ · فاصله‌ی ثابت ۹rem بالای سر · قرص‌ها ۰٫۵ ثانیه با فاصله‌ی ۱٫۲ ثانیه و کشیدگی به چپ · هر قرص ۱٫۸ ثانیه می‌مونه',
  where:'ثانیه ۴ تا ۷ و ۷ تا ۱۱', colors:['#DBBFAA','#F0EBEF','#002039'], dur:7.2,
  css:`${SCENE_CSS}
.tt{position:absolute;left:0;right:0;text-align:center;direction:rtl;font:800 3.4rem/1.1 'Vazirmatn','Inter Tight',sans-serif;color:#DBBFAA;text-shadow:0 .2rem 1.2rem rgba(0,0,0,.4);z-index:5}
.tt small{display:block;font:500 1.2rem 'Vazirmatn',sans-serif;color:#E8D8C4;opacity:.85;margin-top:.2rem}
.pl{position:absolute;height:3rem;min-width:7rem;padding:0 1.4rem;border-radius:1.5rem;border:.1rem solid rgba(240,235,239,.75);background:rgba(255,255,255,.06);-webkit-backdrop-filter:blur(.6rem);backdrop-filter:blur(.6rem);color:#fff;display:flex;align-items:center;justify-content:center;direction:rtl;font:700 1.35rem 'Vazirmatn',sans-serif;z-index:5}`,
  html:`<div class="stage">${SCENE_HTML}<div class="tt" id="tt">مشکل اصلی<small>همیشه محتوا نیست</small></div><div class="pl" id="p1">تصور کن</div><div class="pl" id="p2">منتشر کن</div></div>`,
  js:`${CAMJS}
const tt=document.getElementById('tt'),p1=document.getElementById('p1'),p2=document.getElementById('p2');
play(7.2,t=>{
  const wide=t<3.4;let s,T;
  if(wide){const u=ease.out(seg(t,0,3.4));s=lerp(1,1.1,u);T=[lerp(14.4,14.2,u),lerp(17.9,16.8,u)]}else{const u=ease.out(seg(t-3.4,0,3.8));s=lerp(2.3,2.0,u);T=[lerp(10.6,11.4,u),lerp(11.8,13.4,u)]}
  cam(s,T);camBg(s,T,.35);gest(t);
  const hy=HD[1]+(T[1]-HD[1]),a=ease.out(seg(t,.4,1.1));
  tt.style.top=(T[1]-9.4-(wide?0:99))+'rem';tt.style.opacity=wide?a*(1-seg(t,3.1,3.35)):0;tt.style.filter='blur('+(1-a)*6+'px)';tt.style.transform='translateY('+lerp(1,0,a)+'rem)';
  [[p1,4.2],[p2,5.9]].forEach(([p,t0],i)=>{const e=ease.back(seg(t,t0,t0+.5)),x=seg(t,t0+1.5,t0+1.8);p.style.top=(T[1]-5.2+i*0)+'rem';p.style.left=(T[0]+4.2+(1-e)*14+(i?1.2:0))+'rem';p.style.opacity=(wide?0:seg(t,t0,t0+.2)*(1-x));p.style.transform='scaleX('+lerp(1.5,1,e)+')'});
  p2.style.top=(T[1]-1.2)+'rem';
});` },

{ v:10, id:'rackfocus', fa:'تغییر فوکوس: سوژه تار، متن واضح', en:'Rack Focus to Text', cat:'fx',
  when:'وقتی متن مهمه. سوژه و پس‌زمینه با بلور ملایم از فوکوس خارج می‌شن و متن تیز و واضح می‌مونه؛ بعد فوکوس دوباره روی سوژه برمی‌گرده. باعث می‌شه چشم به متن بره بدون اینکه ویدیو قطع بشه.',
  timing:'بلور سوژه ۰ تا ۰٫۶rem در ۰٫۶ ثانیه · نگه‌داری ۲ ثانیه · برگشت ۰٫۵ ثانیه · بلور پس‌زمینه ثابت ۰٫۷rem · حروف متن با تأخیر ۰٫۰۶ ثانیه',
  where:'ثانیه ۴ تا ۷', colors:['#DBBFAA','#002039','#F0EBEF'], dur:5.2,
  css:`${SCENE_CSS}
.tt{position:absolute;left:0;right:0;top:6rem;text-align:center;direction:rtl;font:800 3.6rem/1.15 'Vazirmatn','Inter Tight',sans-serif;color:#DBBFAA;z-index:5}
.tt span{display:inline-block}
.sb{position:absolute;left:3rem;right:3rem;top:15rem;text-align:center;direction:rtl;font:500 1.2rem/1.6 'Vazirmatn',sans-serif;color:#E8D8C4;z-index:5}`,
  html:`<div class="stage">${SCENE_HTML}<div class="tt" id="tt"></div><div class="sb" id="sb">محتوای خوب بدون استراتژی فقط هزینه است.</div></div>`,
  js:`${CAMJS}
const tt=document.getElementById('tt'),sb=document.getElementById('sb'),W='مشکل مهم';
tt.innerHTML='<span>مشکل</span> <span>مهم</span>';const sp=[...tt.children];
play(5.2,t=>{
  const s=lerp(1,1.08,ease.out(seg(t,0,5.2))),T=[14.3,17.4];cam(s,T);camBg(s,T,.35);gest(t);
  const f=ease.inOut(seg(t,.6,1.2))*(1-ease.inOut(seg(t,3.6,4.2)));
  sub.style.filter='blur('+(.6*f)+'rem)';bg.style.filter='blur(.7rem)';
  sp.forEach((e,i)=>{const a=ease.out(seg(t,1+i*.25,1.7+i*.25))*(1-seg(t,3.5,4.1));e.style.opacity=a;e.style.transform='translateY('+lerp(1.2,0,a)+'rem)';e.style.filter='blur('+(1-a)*.5+'rem)'});
  sb.style.opacity=ease.out(seg(t,1.8,2.5))*(1-seg(t,3.5,4.1));
});` },

{ v:10, id:'archframe', fa:'قاب طاق‌دار نازک پشت سوژه', en:'Arch Outline Frame Behind Subject', cat:'layout',
  when:'نمای دور وقتی می‌خوای متن و سوژه یک واحد بشن. یک خط نازک سفید به شکل طاق (کپسول بلند) دور سوژه کشیده می‌شه، متن داخل طاق بالای سر می‌شینه و سوژه جلوش می‌ایسته.',
  timing:'کشیده‌شدن خط ۱٫۲ ثانیه از پایین به بالا (دو طرف هم‌زمان) · ease-in-out · ضخامت ۱ پیکسل · شفافیت ۵۵٪ · متن ۰٫۵ ثانیه بعد از رسیدن خط',
  where:'ثانیه ۴ تا ۷', colors:['#F0EBEF','#DBBFAA','#002039'], dur:5.6,
  css:`${SCENE_CSS}
svg.ar{position:absolute;left:0;top:0;width:27rem;height:48rem;z-index:2;overflow:visible}
.tt{position:absolute;left:0;right:0;top:8rem;text-align:center;direction:rtl;font:800 3rem/1.2 'Vazirmatn','Inter Tight',sans-serif;color:#DBBFAA;z-index:1}
.tt small{display:block;font:500 1.05rem/1.6 'Vazirmatn',sans-serif;color:#E8D8C4;opacity:.85;margin-top:.5rem}`,
  html:`<div class="stage">${SCENE_HTML}<svg class="ar" viewBox="0 0 27 48"><path id="a1" d="M3.5 36 V10.5 A5.5 5.5 0 0 1 14.5 10.5" fill="none" stroke="#F0EBEF" stroke-opacity=".55" stroke-width=".08"/><path id="a2" d="M24.5 36 V10.5 A5.5 5.5 0 0 0 14.5 10.5" fill="none" stroke="#F0EBEF" stroke-opacity=".55" stroke-width=".08"/><path d="M3.5 36A10.5 4 0 0 0 24.5 36" fill="none" stroke="#F0EBEF" stroke-opacity=".55" stroke-width=".08" id="a3"/></svg><div class="tt" id="tt">مشکل اصلی<small>محتوا پشتش استراتژی می‌خواهد.</small></div></div>`,
  js:`${CAMJS}
const a1=document.getElementById('a1'),a2=document.getElementById('a2'),a3=document.getElementById('a3'),tt=document.getElementById('tt');
const L1=a1.getTotalLength(),L3=a3.getTotalLength();[a1,a2].forEach(p=>p.style.strokeDasharray=L1);a3.style.strokeDasharray=L3;
play(5.6,t=>{
  const s=lerp(1.02,1.1,ease.out(seg(t,0,5.6))),T=[13.8,17.4];cam(s,T);camBg(s,T,.35);gest(t);
  const u=ease.inOut(seg(t,.3,1.5)),o=1-seg(t,5,5.6);
  [a1,a2].forEach(p=>{p.style.strokeDashoffset=L1*(1-u);p.style.opacity=o});a3.style.strokeDashoffset=L3*(1-ease.out(seg(t,.2,.8)));a3.style.opacity=o;
  const a=ease.out(seg(t,1.4,2.1));tt.style.opacity=a*o;tt.style.filter='blur('+(1-a)*5+'px)';tt.style.transform='translateY('+lerp(1,0,a)+'rem)';
});` },

{ v:10, id:'lowercard', fa:'کارت شیشه‌ای پایین و ستاره‌های شناور', en:'Glass Lower-Third + Sparkle Stars', cat:'ui',
  when:'معرفی گوینده یا برند در ۲ ثانیه‌ی اول. یک کارت شیشه‌ای مات با آیکن، نام و توضیح کوتاه از گوشه‌ی پایین کج و آرام جا می‌افتد، همراه با دو ستاره‌ی چهارپر که می‌چرخن و می‌رن.',
  timing:'کارت ۰٫۸ ثانیه · back-ease با چرخش ۶ تا ۰ درجه · ستاره‌ها ۱٫۵ ثانیه چرخش ۹۰ درجه · کارت ۳ ثانیه می‌مونه و پایین می‌ره',
  where:'ثانیه ۰٫۲ تا ۳', colors:['#9DB4CE','#365A8A','#F0EBEF','#DBBFAA'], dur:4.6,
  css:`${SCENE_CSS}
.cd{position:absolute;left:1.2rem;right:1.2rem;bottom:2.6rem;height:7.5rem;border-radius:1.2rem;background:linear-gradient(135deg,rgba(255,255,255,.2),rgba(255,255,255,.07));-webkit-backdrop-filter:blur(1rem) saturate(1.3);backdrop-filter:blur(1rem) saturate(1.3);border:1px solid rgba(255,255,255,.3);box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 1rem 2rem rgba(0,0,0,.35);padding:1rem 1.2rem;color:#F0EBEF;z-index:6;direction:ltr}
.cd .h{display:flex;align-items:center;gap:.8rem;font:700 1.15rem 'Inter Tight',sans-serif}
.cd .h i{width:2.2rem;height:2.2rem;border-radius:50%;background:#DBBFAA;opacity:.9;display:flex;align-items:center;justify-content:center;color:#002039;font-style:normal}
.cd p{margin-top:.6rem;font:400 .85rem/1.4 'Inter Tight',sans-serif;opacity:.85}
.sp{position:absolute;width:3.6rem;height:3.6rem;z-index:6;fill:#9DB4CE;filter:drop-shadow(0 .2rem .6rem rgba(0,0,0,.35))}`,
  html:`<div class="stage">${SCENE_HTML}<div class="cd" id="cd"><div class="h"><i>★</i>Studio Name</div><p>A marketing agency specializing in integrated content and strategy.</p></div><svg class="sp" id="s1" viewBox="0 0 40 40"><path d="M20 0C21 12 28 19 40 20C28 21 21 28 20 40C19 28 12 21 0 20C12 19 19 12 20 0Z"/></svg><svg class="sp" id="s2" viewBox="0 0 40 40" style="fill:#365A8A"><path d="M20 0C21 12 28 19 40 20C28 21 21 28 20 40C19 28 12 21 0 20C12 19 19 12 20 0Z"/></svg></div>`,
  js:`${CAMJS}
const cd=document.getElementById('cd'),s1=document.getElementById('s1'),s2=document.getElementById('s2');
play(4.6,t=>{
  const s=lerp(1.08,1,ease.out(seg(t,0,4.6))),T=[14.2,17.9];cam(s,T);camBg(s,T,.35);gest(t);
  const a=ease.back(seg(t,.3,1.1)),o=1-ease.inOut(seg(t,3.7,4.3));
  cd.style.opacity=seg(t,.3,.6)*o;cd.style.transform='translateY('+(lerp(9,0,a)+(1-o)*9)+'rem) rotate('+lerp(-6,0,a)+'deg)';
  [[s1,19,5],[s2,3.5,16]].forEach(([e,x,y],i)=>{const u=seg(t,.5+i*.3,2.2+i*.3);e.style.left=(x+Math.sin(u*3)*1.5)+'rem';e.style.top=(37-u*y-(i?4:0))+'rem';e.style.opacity=Math.sin(Math.PI*u)*o;e.style.transform='rotate('+(u*90)+'deg) scale('+(.6+.6*u)+')'});
});` },

{ v:10, id:'splitreveal', fa:'خط عمودی روی کادر و لیست آیکن محو', en:'Vertical Line Split + Ghost Icon List', cat:'layout',
  when:'توضیح مفهوم کنار سوژه. یک خط عمودی نازک از چپ کادر رد می‌شه، پشتش آیکن خطی بزرگ و برچسب‌های محو‌شونده نمایان می‌شن؛ ویدیوی گوینده بدون تغییر ادامه پیدا می‌کنه.',
  timing:'خط ۱ ثانیه از چپ به راست و بعد آروم ۰٫۵rem دیگه می‌لغزه · آیکن با بلور ۸ تا ۰ · برچسب‌ها با فاصله‌ی ۰٫۳ ثانیه و شفافیت ۵۰٪',
  where:'ثانیه ۱۲ تا ۱۵', colors:['#F0EBEF','#DBBFAA','#365A8A'], dur:5.2,
  css:`${SCENE_CSS}
.ln{position:absolute;top:0;bottom:0;width:1px;background:linear-gradient(180deg,transparent,rgba(240,235,239,.75) 25%,rgba(240,235,239,.75) 75%,transparent);z-index:4}
.gh{position:absolute;left:0;top:0;bottom:0;width:10rem;overflow:hidden;z-index:3}
.gh svg{position:absolute;left:1.2rem;top:6rem;width:6rem;height:6rem;fill:none;stroke:#F0EBEF;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}
.gh b{position:absolute;left:1.4rem;direction:rtl;font:600 1.4rem 'Vazirmatn',sans-serif;color:#9DB4CE}
.tt{position:absolute;right:1.5rem;top:5rem;text-align:left;font:800 1.9rem/1.1 'Inter Tight',sans-serif;color:#F0EBEF;z-index:4}
.tt small{display:block;font:300 1.35rem 'Inter Tight',sans-serif;color:#DBBFAA}`,
  html:`<div class="stage">${SCENE_HTML}<div class="gh" id="gh"><svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="3"/><path d="M3 21c0-5 3-7 6-7s6 2 6 7"/><path d="M15 14l6-2v6l-6-2z"/></svg><b style="top:14rem">نام</b><b style="top:17rem">ایده</b><b style="top:20rem">انتشار</b></div><div class="ln" id="ln"></div><div class="tt" id="tt">Marketing<small>content plan</small></div></div>`,
  js:`${CAMJS}
const gh=document.getElementById('gh'),ln=document.getElementById('ln'),tt=document.getElementById('tt'),bs=[...gh.querySelectorAll('b')],ic=gh.querySelector('svg');
play(5.2,t=>{
  const u=ease.out(seg(t,0,5.2)),s=lerp(1,1.12,u),T=[lerp(15.6,15.2,u),lerp(18,17.2,u)];cam(s,T);camBg(s,T,.35);gest(t);
  const x=lerp(0,10,ease.inOut(seg(t,.2,1.2)))+seg(t,1.2,5)*.6,o=1-seg(t,4.7,5.2);
  ln.style.left=x+'rem';ln.style.opacity=seg(t,.1,.3)*o;gh.style.width=x+'rem';gh.style.opacity=o;
  const a=ease.out(seg(t,.9,1.7));ic.style.filter='blur('+(1-a)*8+'px)';ic.style.opacity=a;
  bs.forEach((b,i)=>{const k=ease.out(seg(t,1.6+i*.3,2.2+i*.3));b.style.opacity=k*.55;b.style.transform='translateY('+(1-k)*1+'rem)'});
  const m=ease.out(seg(t,.6,1.4));tt.style.opacity=m*o;tt.style.transform='translateX('+(1-m)*3+'rem)';
});` },

{ v:10, id:'kashida', fa:'کشیدگی حروف (کشیده) و فاصله‌ی حروف جمع‌شونده', en:'Kashida Stretch + Tracking Collapse', cat:'type',
  when:'تیتر فارسی یا عربی. حروف اتصالی با کشیده (ـ) کش میان و به شکل طبیعی جمع می‌شن، بدون اینکه حروف شکسته بشن. اسم لاتین زیرش با فاصله‌ی حروف زیاد شروع می‌شه و به حالت عادی برمی‌گرده.',
  timing:'تعداد کشیده ۸ تا ۰ در ۰٫۹ ثانیه (ease-out) · بلور ۰٫۶rem · فاصله‌ی حروف لاتین ۰٫۶em تا ۰٫۰۲em · ورود هر خط با تأخیر ۰٫۳ ثانیه · خروج با بلور',
  where:'ثانیه ۳٫۶ تا ۵٫۵ و ۲۱ تا ۲۴', colors:['#DBBFAA','#E8D8C4','#F0EBEF','#002039'], dur:5.4,
  css:`${SCENE_CSS}
.k1{position:absolute;left:0;right:0;top:11rem;text-align:center;direction:rtl;font:800 3.6rem/1.2 'Vazirmatn','Inter Tight',sans-serif;color:#DBBFAA;white-space:nowrap}
.k2{position:absolute;left:0;right:0;top:15.4rem;text-align:center;direction:rtl;font:500 1.5rem/1.4 'Vazirmatn',sans-serif;color:#E8D8C4;white-space:nowrap}
.k3{position:absolute;left:0;right:0;top:7rem;text-align:center;font:700 2rem 'Inter Tight',sans-serif;color:#E8D8C4;white-space:nowrap}
.k3 span{font-weight:300;color:#9DB4CE}`,
  html:`<div class="stage"><div class="bgl" style="opacity:.9"></div><div class="k3" id="k3">Studio <span>Agency</span></div><div class="k1" id="k1"></div><div class="k2" id="k2"></div></div>`,
  js:`const k1=document.getElementById('k1'),k2=document.getElementById('k2'),k3=document.getElementById('k3');
const T='\\u0640';
function stretch(w,n){const J=['ب','پ','ت','ث','ج','چ','ح','خ','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ک','گ','ل','م','ن','ه','ی','ئ'],cs=[...w];let o='';cs.forEach((c,i)=>{o+=c;if(i<cs.length-1&&J.includes(c))o+=T.repeat(n)});return o}
play(5.4,t=>{
  const a=ease.out(seg(t,.3,1.2)),b=ease.out(seg(t,.7,1.5)),c=ease.out(seg(t,.2,1.4)),o=1-seg(t,4.7,5.3);
  k1.textContent=stretch('مشکل',Math.round(8*(1-a)));k1.style.opacity=seg(t,.3,.5)*o;k1.style.filter='blur('+(1-a)*.6+'rem)';
  k2.textContent=stretch('همیشه محتوا نیست',Math.round(3*(1-b)));k2.style.opacity=seg(t,.7,.9)*o;k2.style.filter='blur('+(1-b)*.5+'rem)';
  k3.style.letterSpacing=lerp(.6,.02,c)+'em';k3.style.opacity=seg(t,.2,.5)*o;k3.style.filter='blur('+(1-c)*.5+'rem)';
});` }
);

VIDEOS.push({ id:'v10', n:10, title:'مصاحبه‌ی تک‌نفره: دوربین قفل‌شده روی سر', meta:'۲۴ ثانیه · ۷۲۰×۱۲۸۰ · ریل گفتاری با پانچ‌این‌های پی‌درپی و متن عربی/لاتین',
  mood:'حرفه‌ای و آرام. استودیوی آبی-سرمه‌ای با تیرگی گوشه‌ها و نور فیروزه‌ای کف، سوژه روی چهارپایه، متن کرم‌رنگ نرم. تمام پویایی از دوربین می‌آید (پانچ‌این و حرکت آرام)، نه از گرافیک؛ گرافیک ساده و شیشه‌ای است.',
  rules:[
    'دوربین واقعی ثابت است؛ همه‌ی حرکت‌ها زوم دیجیتال روی یک نمای ۴K هستند: نمای دور ۱× و نمای نزدیک ۲٫۲ تا ۲٫۵×.',
    'مرکز هر زوم سر گوینده است. سر همیشه روی خط یک‌سوم افقی/عمودی می‌ماند و بدن نسبت به آن می‌لغزد. نمای دور سر در ~۳۴٪ ارتفاع، نمای نزدیک در ~۲۵٪.',
    'هر ۳ تا ۵ ثانیه برش مستقیم بین دور و نزدیک (بدون گذار). داخل هر نما حرکت خیلی آرام: نزدیک آرام عقب می‌رود (−۴ تا −۵٪/ثانیه)، دور آرام جلو می‌آید (+۲٪/ثانیه).',
    'سوژه جدا از پس‌زمینه زوم می‌شود: سوژه ۴ تا ۵٪/ثانیه و پس‌زمینه حدود ۱٪ (پارالاکس لایه‌ای).',
    'متن همیشه نسبت به سر چیده می‌شود: عنوان بالای سر در نمای دور، قرص‌ها کنار سر در نمای نزدیک، کارت معرفی پایین کادر.',
    'گاهی فوکوس به متن می‌رود: سوژه تار و متن واضح، با خط طاق‌دار نازک دور سوژه.'
  ],
  palette:[
    { g:'استودیو', c:[['#00162A','تیرگی گوشه'],['#002039','پس‌زمینه‌ی تیره'],['#002E46','پس‌زمینه‌ی میانی'],['#00263E','لکه‌ی نور'],['#04415B','نور فیروزه‌ای کف']] },
    { g:'سوژه', c:[['#0B1D4A','پیراهن سرمه‌ای'],['#4F6A7C','جین'],['#06372F','صندلی سبز'],['#A9664A','پوست']] },
    { g:'متن و گرافیک', c:[['#DBBFAA','کرم (تیتر)'],['#E8D8C4','کرم روشن (زیرنویس)'],['#F0EBEF','سفید (خط و قرص)'],['#9DB4CE','آبی ستاره'],['#365A8A','آبی ستاره‌ی تیره']] }
  ] });

TOKENS_CSS = TOKENS_CSS.replace(/\n\}$/, `
  /* video 10: talking-head studio */
  --st-deep:#00162A; --st-dark:#002039; --st-mid:#002E46; --st-floor:#04415B; --st-cream:#DBBFAA; --st-cream-2:#E8D8C4; --st-white:#F0EBEF; --st-star:#9DB4CE;
}`);
