/* Motion library app. Data (VIDEOS, TECHS, CATS, KIT_JS, KIT_CSS, RENDER_JS, TOKENS_CSS, FONTS) comes from data.js. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fa = (n, d = 0) => Number(n).toLocaleString('fa-IR', { maximumFractionDigits: d });
const toEn = s => String(s).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/٫/g, '.');
const norm = s => toEn(s).toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/‌/g, ' ');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = { get(k) { try { return localStorage.getItem(k) } catch (e) { return null } }, set(k, v) { try { localStorage.setItem(k, v) } catch (e) {} } };

/* ---------- data prep ---------- */
const ACC = { 1: '#3E7BE0', 2: '#EB3721', 3: '#1E9E94', 4: '#6B7CE8', 5: '#16A312', 6: '#E0642F', 7: '#D6DF1A', 8: '#D21212', 9: '#F65A0E', 10: '#C99A72' };
const CATC = { type: 'var(--c-type)', ui: 'var(--c-ui)', data: 'var(--c-data)', fx: 'var(--c-fx)', layout: 'var(--c-layout)' };
const inkOn = hex => { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? '#10141A' : '#FFFFFF' };
const shortTitle = v => v.title.split(':')[0].trim();

VIDEOS.forEach(v => {
  v.dur = +((toEn(v.meta).match(/(\d+(?:\.\d+)?)\s*ثانیه/) || [0, 20])[1]);
  v.ac = ACC[v.n] || '#888888';
  v.techs = TECHS.filter(t => (t.v || 1) === v.n);
});
function parseSegs(where, dur) {
  const out = [];
  for (const m of toEn(where).matchAll(/(\d+(?:\.\d+)?)\s*تا\s*(\d+(?:\.\d+)?)/g)) {
    const a = +m[1], b = +m[2];
    if (b > a && a < dur) out.push([a, Math.min(b, dur)]);
  }
  return out;
}
TECHS.forEach(t => { t.vid = VIDEOS.find(v => v.n === (t.v || 1)); t.segs = parseSegs(t.where, t.vid.dur); });
const ORDER = VIDEOS.flatMap(v => v.techs);
const byId = Object.fromEntries(TECHS.map(t => [t.id, t]));
const mmss = s => fa(Math.floor(s / 60)) + ':' + fa(Math.round(s % 60)).padStart(2, '۰');

/* ---------- helpers ---------- */
let toastT;
function toast(html) {
  const el = $('#toast'); el.innerHTML = '<span>' + html + '</span>';
  clearTimeout(toastT); toastT = setTimeout(() => { el.innerHTML = '' }, 1900);
}
async function copy(text, label) {
  let ok = false;
  try { await navigator.clipboard.writeText(text); ok = true } catch (e) {
    try { const ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); ok = document.execCommand('copy'); ta.remove() } catch (_) {}
  }
  toast(ok ? 'کپی شد ' + (label ? '<code>' + esc(label) + '</code>' : '') : 'کپی نشد. متن را انتخاب کن و Ctrl+C بزن.');
}
function docFor(t) {
  return '<!doctype html><html lang="fa"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + FONTS +
    '<style>' + KIT_CSS + '\n' + t.css + '</style></head><body>' + t.html + '<scr' + 'ipt>' + KIT_JS + '\n' + t.js + '</scr' + 'ipt></body></html>';
}
function snippetFor(t) {
  return '/* CSS */\n' + t.css + '\n\n<!-- HTML -->\n' + t.html.replace(/></g, '>\n<') + '\n\n/* JS (needs the Motion Kit) */\n' + t.js;
}
const catLabel = t => CATS[t.cat];
const catDot = k => '<i style="--dc:' + CATC[k] + '"></i>';

/* tiny syntax highlighter */
const TOK = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|<!--[\s\S]*?-->)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|(#[0-9a-fA-F]{3,8}\b)|(\b\d+(?:\.\d+)?(?:rem|px|s|deg|%|em)?)|(\b(?:const|let|var|function|return|if|else|for|while|new|true|false|null|await|async)\b|=>)/g;
function hl(src) {
  let out = '', last = 0, m;
  TOK.lastIndex = 0;
  while ((m = TOK.exec(src))) {
    out += esc(src.slice(last, m.index));
    const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'h' : m[4] ? 'n' : 'k';
    out += '<span class="' + cls + '">' + esc(m[0]) + '</span>';
    last = TOK.lastIndex;
  }
  return out + esc(src.slice(last));
}
function setCode(pre, text) { pre.innerHTML = text.length > 90000 ? esc(text) : hl(text); pre.scrollTop = 0; }

/* ---------- theme ---------- */
$('#theme').addEventListener('click', () => {
  const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next; store.set('theme', next);
});

/* ---------- lead ---------- */
const allHex = new Set(); VIDEOS.forEach(v => v.palette.forEach(g => g.c.forEach(c => allHex.add(c[0].toUpperCase()))));
$('#lead').innerHTML = '<b>' + fa(TECHS.length) + ' تکنیک زنده</b> از ' + fa(VIDEOS.length) + ' ویدیوی مرجع، با ' + fa(allHex.size) + ' رنگ دقیق، زمان‌بندی تقریبی و کد آماده. هر ویدیو که تحلیل می‌شود، به همین نوار اضافه می‌شود.';

/* ---------- reel + monitor ---------- */
const clipsEl = $('#reel-clips'), ph = $('#playhead'), mon = $('#mon');
const TOTAL = VIDEOS.reduce((s, v) => s + v.dur, 0);
const SLOT = 3.4;           /* seconds each technique is shown */
let pos = 0, playing = !reduced, scrubbing = false, shown = -1, heroVisible = true;

clipsEl.style.gridTemplateColumns = VIDEOS.map(v => 'minmax(30px,' + v.dur + 'fr)').join(' ');
clipsEl.innerHTML = VIDEOS.map((v, i) => '<div class="clip" style="--ac:' + v.ac + ';--ac-ink:' + inkOn(v.ac) + ';--i:' + i + '"><span class="rn">' + fa(v.n) + '</span><span class="rt">' + esc(shortTitle(v)) + '</span></div>').join('');
const clipEls = $$('.clip', clipsEl);
(() => {
  const r = $('#reel-ruler'); let h = '';
  const step = TOTAL > 200 ? 30 : 15;
  for (let s = 0; s <= TOTAL; s += step) h += '<i style="left:' + (s / TOTAL * 100) + '%"><b>' + mmss(s) + '</b></i>';
  r.innerHTML = h;
})();
clipsEl.setAttribute('aria-valuemax', ORDER.length);

const clipStart = []; (() => { let a = 0; VIDEOS.forEach(v => { clipStart.push(a); a += v.dur }) })();
const firstIdx = []; (() => { let a = 0; VIDEOS.forEach(v => { firstIdx.push(a); a += v.techs.length }) })();

function posToTime(p) {
  const i = Math.min(ORDER.length - 1, Math.floor(p)), t = ORDER[i], vi = VIDEOS.indexOf(t.vid), n = t.vid.techs.length, k = i - firstIdx[vi];
  return clipStart[vi] + ((k + (p - i)) / n) * t.vid.dur;
}
function timeToPos(time) {
  let vi = VIDEOS.length - 1; for (let i = 0; i < VIDEOS.length; i++) if (time < clipStart[i] + VIDEOS[i].dur) { vi = i; break }
  const v = VIDEOS[vi], u = Math.min(.999, Math.max(0, (time - clipStart[vi]) / v.dur));
  return firstIdx[vi] + u * v.techs.length;
}
function showTech(i) {
  if (i === shown) return; shown = i;
  const t = ORDER[i];
  mon.srcdoc = docFor(t);
  $('#mon-name').textContent = t.fa;
  $('#mon-src').textContent = 'ویدیو ' + fa(t.vid.n) + ' · ' + shortTitle(t.vid);
  clipEls.forEach((c, k) => c.classList.toggle('on', VIDEOS[k] === t.vid));
  clipsEl.setAttribute('aria-valuenow', i + 1);
  clipsEl.setAttribute('aria-valuetext', t.fa + '، ویدیو ' + fa(t.vid.n));
}
function placePlayhead() {
  const w = clipsEl.clientWidth, time = posToTime(pos);
  ph.style.transform = 'translateX(' + (time / TOTAL * w) + 'px)';
}
let last = performance.now();
function tick(now) {
  const dt = Math.min(.1, (now - last) / 1000); last = now;
  if (playing && !scrubbing && heroVisible && !document.hidden) { pos = (pos + dt / SLOT) % ORDER.length; }
  showTech(Math.floor(pos)); placePlayhead();
  requestAnimationFrame(tick);
}
function seekFromEvent(e) {
  const r = clipsEl.getBoundingClientRect(), f = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  pos = timeToPos(f * TOTAL);
}
clipsEl.addEventListener('pointerdown', e => { scrubbing = true; clipsEl.setPointerCapture(e.pointerId); seekFromEvent(e) });
clipsEl.addEventListener('pointermove', e => { if (scrubbing) seekFromEvent(e) });
const endScrub = () => { scrubbing = false };
clipsEl.addEventListener('pointerup', endScrub); clipsEl.addEventListener('pointercancel', endScrub);
clipsEl.addEventListener('keydown', e => {
  const step = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
  if (step) { e.preventDefault(); pos = (Math.floor(pos) + step + ORDER.length) % ORDER.length + .01; playing = false; syncPlayBtn() }
});
function syncPlayBtn() {
  $('#mon-ico').setAttribute('d', playing ? 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z' : 'M7 4.5v15l12-7.5z');
  $('#mon-play').setAttribute('aria-label', playing ? 'مکث' : 'پخش');
}
$('#mon-play').addEventListener('click', () => { playing = !playing; syncPlayBtn() });
$('#mon-open').addEventListener('click', () => openTech(ORDER[Math.max(0, shown)].id));
new IntersectionObserver(es => { heroVisible = es[0].isIntersecting }).observe($('.hero'));
syncPlayBtn(); showTech(0); placePlayhead(); requestAnimationFrame(tick);
addEventListener('resize', placePlayhead);

/* ---------- rail ---------- */
const rail = $('#rail-in');
rail.innerHTML = VIDEOS.map(v => '<a href="#v' + v.n + '" data-sec="v' + v.n + '" style="--ac:' + v.ac + '"><i></i><b>' + fa(v.n) + '</b><span>' + esc(shortTitle(v)) + '</span></a>').join('') +
  '<span class="gap"></span><a href="#colors" data-sec="colors"><i></i><span>رنگ‌ها</span></a><a href="#kit" data-sec="kit"><i></i><span>کیت حرکت</span></a>';

/* ---------- chapters ---------- */
const frames = [];
const io = new IntersectionObserver(es => es.forEach(e => {
  const f = e.target;
  if (e.isIntersecting) { if (!f.dataset.on) { f.srcdoc = f._doc; f.dataset.on = '1' } }
  else if (f.dataset.on) { f.srcdoc = ''; delete f.dataset.on }
}), { rootMargin: '120px' });

function ribbonHTML(v) {
  return '<div class="ribbon" role="group" aria-label="رنگ‌های ' + esc(shortTitle(v)) + '">' + v.palette.map(g =>
    '<div class="g" style="--n:' + g.c.length + '">' + g.c.map(c => '<button type="button" style="--c:' + c[0] + '" data-hex="' + c[0] + '" data-role="' + esc(c[1]) + '" aria-label="کپی ' + c[0] + ' (' + esc(c[1]) + ')"></button>').join('') + '</div>').join('') +
    '</div><div class="ribbon-cap" aria-hidden="true">روی رنگ‌ها بروید یا بزنید تا HEX کپی شود</div>';
}
function timelineHTML(v) {
  const lanes = [], items = [];
  v.techs.forEach(t => {
    const segs = t.segs.length ? t.segs : [[0, v.dur]], full = !t.segs.length;
    segs.forEach(([a, b]) => items.push({ t, a, b, full }));
  });
  items.sort((x, y) => x.a - y.a || y.b - x.b);
  items.forEach(it => {
    let k = lanes.findIndex(end => end <= it.a + .05);
    if (k < 0) { k = lanes.length; lanes.push(0) }
    lanes[k] = it.b; it.lane = k;
  });
  const step = v.dur > 40 ? 10 : v.dur > 18 ? 5 : 2;
  let ticks = ''; for (let s = 0; s <= v.dur; s += step) ticks += '<i style="left:' + (s / v.dur * 100) + '%"><b>' + mmss(s) + '</b></i>';
  const seg = items.map(it => '<button type="button" class="seg' + (it.full ? ' full' : '') + '" data-id="' + it.t.id + '" style="--c:' + CATC[it.t.cat] + ';left:' + (it.a / v.dur * 100) + '%;width:' + ((it.b - it.a) / v.dur * 100) + '%;top:' + (it.lane * 28) + 'px" title="' + esc(it.t.fa) + '">' + esc(it.t.fa) + '</button>').join('');
  return '<div class="tl" role="group" aria-label="نوار زمانی ' + esc(shortTitle(v)) + '"><div class="tl-ruler">' + ticks + '</div><div class="tl-lanes" style="height:' + (lanes.length * 28) + 'px">' + seg + '</div></div>' +
    (items.some(i => i.full) ? '<p class="tl-note">خط‌خطی‌ها یعنی تکنیک در کل ویدیو یا چند جای پراکنده استفاده شده.</p>' : '');
}
function tileHTML(t) {
  return '<div class="tile-demo"><iframe title="' + esc(t.fa) + '" sandbox="allow-scripts" tabindex="-1" loading="lazy"></iframe><button class="tile-open" type="button" aria-label="باز کردن: ' + esc(t.fa) + '"></button></div>' +
    '<h3>' + esc(t.fa) + '</h3><p class="en">' + esc(t.en) + '</p><span class="cat">' + catDot(t.cat) + catLabel(t) + '</span>';
}
const chapters = $('#chapters');
VIDEOS.forEach(v => {
  const sec = document.createElement('article');
  sec.className = 'chap'; sec.id = 'v' + v.n; sec.dataset.spy = ''; sec.style.setProperty('--ac', v.ac);
  sec.innerHTML = '<header class="chap-h"><span class="chap-n" aria-hidden="true">' + fa(v.n).padStart(2, '۰') + '</span><div><h2>' + esc(v.title) + '</h2><p class="chap-meta">' + esc(v.meta) + '</p></div></header>' +
    '<div class="chap-body"><p class="mood">' + esc(v.mood) + '</p><ul class="rules">' + v.rules.map(r => '<li>' + esc(r) + '</li>').join('') + '</ul></div>' +
    ribbonHTML(v) + timelineHTML(v) + '<div class="tiles"></div>';
  const grid = $('.tiles', sec);
  v.techs.forEach(t => {
    const el = document.createElement('article');
    el.className = 'tile'; el.dataset.id = t.id; el.dataset.cat = t.cat; el.style.setProperty('--ac', v.ac);
    el.innerHTML = tileHTML(t);
    const f = $('iframe', el); f._doc = docFor(t); io.observe(f);
    grid.appendChild(el);
  });
  chapters.appendChild(sec);
});
chapters.addEventListener('click', e => {
  const open = e.target.closest('.tile-open'); if (open) return openTech(open.closest('.tile').dataset.id);
  const seg = e.target.closest('.seg'); if (seg) return openTech(seg.dataset.id);
  const sw = e.target.closest('[data-hex]'); if (sw) copy(sw.dataset.hex, sw.dataset.hex);
});
chapters.addEventListener('pointerover', e => {
  const b = e.target.closest('.ribbon button'); if (!b) return;
  const cap = b.closest('.chap').querySelector('.ribbon-cap');
  cap.innerHTML = '<i class="dotc" style="background:' + b.dataset.hex + '"></i><code>' + b.dataset.hex + '</code><span>' + b.dataset.role + '</span>';
});
chapters.addEventListener('focusin', e => { if (e.target.matches('.ribbon button')) e.target.dispatchEvent(new PointerEvent('pointerover', { bubbles: true })) });

/* ---------- filters ---------- */
let cat = 'all';
const fl = $('#filters');
fl.innerHTML = '<button class="chip" type="button" data-cat="all" aria-pressed="true">همه <small>' + fa(TECHS.length) + '</small></button>' +
  Object.entries(CATS).map(([k, l]) => '<button class="chip" type="button" data-cat="' + k + '" aria-pressed="false" style="--dc:' + CATC[k] + '"><i></i>' + l + ' <small>' + fa(TECHS.filter(t => t.cat === k).length) + '</small></button>').join('');
function applyFilter() {
  let any = false;
  $$('.chap').forEach(sec => {
    let n = 0;
    $$('.tile', sec).forEach(el => { const on = cat === 'all' || el.dataset.cat === cat; el.hidden = !on; if (on) n++ });
    $$('.seg', sec).forEach(s => s.classList.toggle('dim', cat !== 'all' && byId[s.dataset.id].cat !== cat));
    sec.hidden = n === 0; if (n) any = true;
    const a = $('.rail a[data-sec="' + sec.id + '"]'); if (a) a.hidden = n === 0;
  });
  $('#empty').hidden = any;
}
fl.addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  cat = b.dataset.cat; $$('.chip', fl).forEach(x => x.setAttribute('aria-pressed', x === b)); applyFilter();
});

/* ---------- scroll spy ---------- */
const spyMap = new Map();
const spy = new IntersectionObserver(es => {
  es.forEach(e => spyMap.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
  let best = null, bv = 0; spyMap.forEach((r, id) => { if (r > bv) { bv = r; best = id } });
  if (best) $$('.rail a').forEach(a => { const on = a.dataset.sec === best; a.setAttribute('aria-current', on); if (on && matchMedia('(max-width:1099px)').matches) a.scrollIntoView({ inline: 'center', block: 'nearest' }) });
}, { rootMargin: '-110px 0px -45% 0px', threshold: [0, .02, .1, .3] });
$$('.chap, #colors, #kit').forEach(s => spy.observe(s));

/* ---------- colors section ---------- */
const colList = $('#col-list');
colList.innerHTML = VIDEOS.map(v => '<div class="cv" style="--ac:' + v.ac + '" data-v="' + v.n + '"><h3><i></i>ویدیو ' + fa(v.n) + ': ' + esc(shortTitle(v)) + '</h3>' +
  v.palette.map(g => '<div class="cg"><h4>' + esc(g.g) + '</h4><div class="sws">' + g.c.map(c => '<button type="button" class="sw" data-hex="' + c[0] + '" data-q="' + esc(norm(c[0] + ' ' + c[1] + ' ' + g.g)) + '" aria-label="کپی ' + c[0] + ' ' + esc(c[1]) + '"><i style="background:' + c[0] + '"></i><code>' + c[0] + '</code><span>' + esc(c[1]) + '</span></button>').join('') + '</div></div>').join('') + '</div>').join('');
colList.addEventListener('click', e => { const b = e.target.closest('[data-hex]'); if (b) copy(b.dataset.hex, b.dataset.hex) });
$('#col-q').addEventListener('input', e => {
  const q = norm(e.target.value.trim());
  $$('.sw', colList).forEach(b => { b.hidden = q && !b.dataset.q.includes(q) });
  $$('.cg', colList).forEach(g => { g.hidden = !$$('.sw', g).some(b => !b.hidden) });
  $$('.cv', colList).forEach(c => { c.hidden = !$$('.cg', c).some(g => !g.hidden) });
});
setCode($('#tokens-pre'), TOKENS_CSS);
$('[data-copy="tokens"]').addEventListener('click', () => copy(TOKENS_CSS, 'tokens'));

/* ---------- kit ---------- */
const KIT = {
  js: [KIT_JS, 'تابع‌های کمکی و play(dur, draw)؛ این را اول هر نمونه بگذار.'],
  css: [KIT_CSS, 'صحنه‌ی ۹:۱۶ با واحد rem؛ هر چیزی با اندازه‌ی صفحه جابه‌جا می‌شود.'],
  render: [RENDER_JS, 'خروجی ویدیو با Playwright و ffmpeg؛ فریم‌به‌فریم، بدون پرش.']
};
let kitK = 'js';
function showKit() { setCode($('#kit-pre'), KIT[kitK][0]); $('#kit-note').textContent = KIT[kitK][1] }
$('#kit-tabs').addEventListener('click', e => {
  const b = e.target.closest('[role=tab]'); if (!b) return; kitK = b.dataset.k;
  $$('#kit-tabs [role=tab]').forEach(x => x.setAttribute('aria-selected', x === b)); showKit();
});
$('#kit-copy').addEventListener('click', () => copy(KIT[kitK][0], ''));
showKit();

/* ---------- detail dialog ---------- */
const dlg = $('#dlg'); let cur = null, tabK = 'snip';
function renderCode() {
  const t = cur; if (!t) return;
  if (tabK === 'snip') { setCode($('#d-pre'), snippetFor(t)); $('#d-note').textContent = 'فقط CSS و HTML و JS تکنیک؛ کیت حرکت جدا کپی می‌شود.' }
  else { setCode($('#d-pre'), docFor(t)); $('#d-note').textContent = 'فایل HTML کامل و مستقل؛ در مرورگر باز کن و اجرا می‌شود.' }
}
function openTech(id, fromHash) {
  const t = byId[id]; if (!t) return; cur = t;
  $('#d-frame').srcdoc = docFor(t);
  $('#d-cat').innerHTML = catDot(t.cat) + catLabel(t);
  $('#d-vid').textContent = 'ویدیو ' + fa(t.vid.n) + ': ' + shortTitle(t.vid);
  $('#d-title').textContent = t.fa; $('#d-en').textContent = t.en;
  $('#d-when').textContent = t.when; $('#d-timing').textContent = t.timing; $('#d-where').textContent = t.where;
  $('#d-colors').innerHTML = t.colors.map(c => '<button type="button" data-hex="' + c + '" aria-label="کپی ' + c + '"><i style="background:' + c + '"></i>' + c + '</button>').join('');
  tabK = 'snip'; $$('#d-tabs [role=tab]').forEach(x => x.setAttribute('aria-selected', x.dataset.k === 'snip')); renderCode();
  $('.d-info', dlg).scrollTop = 0;
  if (cmd.open) cmd.close();
  if (!dlg.open) dlg.showModal();
  if (!fromHash) history.replaceState(null, '', '#/t/' + id);
}
const step = d => { const i = ORDER.indexOf(cur); openTech(ORDER[(i + d + ORDER.length) % ORDER.length].id) };
$('#d-next').addEventListener('click', () => step(1)); $('#d-prev').addEventListener('click', () => step(-1));
$('#d-replay').addEventListener('click', () => { $('#d-frame').srcdoc = docFor(cur) + '<!--' + Date.now() + '-->' });
$('#d-close').addEventListener('click', () => dlg.close());
$('#d-copy').addEventListener('click', () => copy(tabK === 'snip' ? snippetFor(cur) : docFor(cur), ''));
$('#d-colors').addEventListener('click', e => { const b = e.target.closest('[data-hex]'); if (b) copy(b.dataset.hex, b.dataset.hex) });
$('#d-tabs').addEventListener('click', e => {
  const b = e.target.closest('[role=tab]'); if (!b) return; tabK = b.dataset.k;
  $$('#d-tabs [role=tab]').forEach(x => x.setAttribute('aria-selected', x === b)); renderCode();
});
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close() });
dlg.addEventListener('close', () => {
  $('#d-frame').srcdoc = '';
  if (location.hash.startsWith('#/t/')) history.replaceState(null, '', location.pathname + location.search);
});
dlg.addEventListener('keydown', e => {
  if (e.target.matches('input,textarea')) return;
  if (e.key === 'ArrowLeft') step(1); if (e.key === 'ArrowRight') step(-1);
});

/* ---------- search ---------- */
const cmd = $('#cmd'), q = $('#cmd-q'), list = $('#cmd-list'); let results = [], sel = 0;
const INDEX = TECHS.map(t => ({ t, s: norm([t.fa, t.en, t.when, catLabel(t), t.vid.title, t.colors.join(' ')].join(' ')) }));
const COLORS = []; VIDEOS.forEach(v => v.palette.forEach(g => g.c.forEach(c => COLORS.push({ v, hex: c[0], role: c[1], s: norm(c[0] + ' ' + c[1] + ' ' + g.g) }))));
function runSearch() {
  const query = norm(q.value.trim()), words = query.split(/\s+/).filter(Boolean);
  results = [];
  if (!words.length) { results = ORDER.slice(0, 8).map(t => ({ kind: 't', t })) }
  else {
    INDEX.forEach(({ t, s }) => { if (words.every(w => s.includes(w))) results.push({ kind: 't', t, rank: norm(t.fa + ' ' + t.en).includes(words[0]) ? 0 : 1 }) });
    results.sort((a, b) => a.rank - b.rank);
    results = results.slice(0, 12);
    COLORS.forEach(c => { if (results.length < 18 && words.every(w => c.s.includes(w)) && (words[0].startsWith('#') || words[0].length > 2)) results.push({ kind: 'c', c }) });
  }
  sel = 0; renderResults();
}
function renderResults() {
  list.innerHTML = results.length ? results.map((r, i) => r.kind === 't'
    ? '<li role="option" data-i="' + i + '" aria-selected="' + (i === sel) + '">' + catDot(r.t.cat) + '<span>' + esc(r.t.fa) + '</span><span class="sub">ویدیو ' + fa(r.t.vid.n) + '</span></li>'
    : '<li role="option" data-i="' + i + '" aria-selected="' + (i === sel) + '"><span class="sq" style="background:' + r.c.hex + '"></span><span><code>' + r.c.hex + '</code> ' + esc(r.c.role) + '</span><span class="sub">کپی رنگ، ویدیو ' + fa(r.c.v.n) + '</span></li>').join('')
    : '<li aria-disabled="true" style="cursor:default;color:var(--mute)">چیزی پیدا نشد. اسم تکنیک، دسته یا یک HEX را امتحان کن.</li>';
}
function choose(i) {
  const r = results[i]; if (!r) return;
  if (r.kind === 't') openTech(r.t.id); else { copy(r.c.hex, r.c.hex); cmd.close() }
}
function openSearch() { if (dlg.open) dlg.close(); q.value = ''; runSearch(); cmd.showModal(); q.focus() }
$('#open-search').addEventListener('click', openSearch);
q.addEventListener('input', runSearch);
q.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(results.length - 1, sel + 1); renderResults(); $('[aria-selected=true]', list)?.scrollIntoView({ block: 'nearest' }) }
  if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); renderResults(); $('[aria-selected=true]', list)?.scrollIntoView({ block: 'nearest' }) }
  if (e.key === 'Enter') { e.preventDefault(); choose(sel) }
});
list.addEventListener('click', e => { const li = e.target.closest('[data-i]'); if (li) choose(+li.dataset.i) });
cmd.addEventListener('click', e => { if (e.target === cmd) cmd.close() });
addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch() }
  else if (e.key === '/' && !e.target.matches('input,textarea') && !dlg.open && !cmd.open) { e.preventDefault(); openSearch() }
});

/* ---------- deep links ---------- */
function route() {
  const m = location.hash.match(/^#\/t\/([\w-]+)/);
  if (m && byId[m[1]]) openTech(m[1], true);
  else if (dlg.open && !location.hash.startsWith('#/t/')) dlg.close();
}
addEventListener('hashchange', route);
route();
})();
