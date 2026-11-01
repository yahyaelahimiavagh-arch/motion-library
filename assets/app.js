/* Motion library app. Data (VIDEOS, TECHS, CATS, KIT_JS, KIT_CSS, RENDER_JS, TOKENS_CSS, FONTS) comes from data.js. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fa = (n, d = 0) => Number(n).toLocaleString('en-US', { maximumFractionDigits: d });
const toEn = s => String(s);
const norm = s => String(s).toLowerCase();
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = { get(k) { try { return localStorage.getItem(k) } catch (e) { return null } }, set(k, v) { try { localStorage.setItem(k, v) } catch (e) {} } };

/* ---------- data prep ---------- */
const ACC = { 1: '#3E7BE0', 2: '#EB3721', 3: '#1E9E94', 4: '#6B7CE8', 5: '#16A312', 6: '#E0642F', 7: '#D6DF1A', 8: '#D21212', 9: '#F65A0E', 10: '#C99A72' };
const CATC = { type: 'var(--c-type)', ui: 'var(--c-ui)', data: 'var(--c-data)', fx: 'var(--c-fx)', layout: 'var(--c-layout)' };
const inkOn = hex => { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? '#10141A' : '#FFFFFF' };
const shortTitle = v => v.title.split(':')[0].trim();

VIDEOS.forEach(v => {
  v.dur = +((toEn(v.meta).match(/(\d+(?:\.\d+)?)\s*seconds?/i) || [0, 20])[1]);
  v.ac = ACC[v.n] || '#888888';
  v.techs = TECHS.filter(t => (t.v || 1) === v.n);
});
function parseSegs(where, dur) {
  const out = [];
  for (const m of toEn(where).matchAll(/(\d+(?:\.\d+)?)\s*to\s*(\d+(?:\.\d+)?)/g)) {
    const a = +m[1], b = +m[2];
    if (b > a && a < dur) out.push([a, Math.min(b, dur)]);
  }
  return out;
}
TECHS.forEach(t => { t.vid = VIDEOS.find(v => v.n === (t.v || 1)); t.segs = parseSegs(t.where, t.vid.dur); });
const ORDER = VIDEOS.flatMap(v => v.techs);
const byId = Object.fromEntries(TECHS.map(t => [t.id, t]));
const mmss = s => fa(Math.floor(s / 60)) + ':' + fa(Math.round(s % 60)).padStart(2, '0');

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
  toast(ok ? 'Copied ' + (label ? '<code>' + esc(label) + '</code>' : '') : 'Could not copy. Select the text and press Ctrl+C.');
}
function docFor(t) {
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + FONTS +
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

/* ---------- lead ---------- */
const allHex = new Set(); VIDEOS.forEach(v => v.palette.forEach(g => g.c.forEach(c => allHex.add(c[0].toUpperCase()))));
$('#lead').innerHTML = '<b>' + fa(TECHS.length) + ' live techniques</b> from ' + fa(VIDEOS.length) + ' reference videos, with ' + fa(allHex.size) + ' exact colors, estimated timing and ready-to-use code. Every video that gets analyzed is added to this reel.';

/* ---------- reel + monitor ---------- */
const clipsEl = $('#reel-clips'), ph = $('#playhead'), mon = $('#mon');
const TOTAL = VIDEOS.reduce((s, v) => s + v.dur, 0);
const SLOT = 3.4;           /* seconds each technique is shown */
let pos = 0, playing = !reduced, scrubbing = false, shown = -1, heroVisible = true, monT;

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
let monDoc = -1;
function loadMon(i) { if (monDoc === i || !ORDER[i]) return; monDoc = i; mon.srcdoc = docFor(ORDER[i]) }
function showTech(i) {
  if (i === shown) return; shown = i;
  const t = ORDER[i];
  /* While dragging across the timeline, update labels at once but load the demo only when the finger settles. */
  clearTimeout(monT);
  if (scrubbing) monT = setTimeout(() => loadMon(i), 160);
  else loadMon(i);
  $('#mon-name').textContent = t.fa;
  $('#mon-src').textContent = 'Video ' + fa(t.vid.n) + ' · ' + shortTitle(t.vid);
  clipEls.forEach((c, k) => c.classList.toggle('on', VIDEOS[k] === t.vid));
  clipsEl.setAttribute('aria-valuenow', i + 1);
  clipsEl.setAttribute('aria-valuetext', t.fa + ', video ' + fa(t.vid.n));
}
function placePlayhead() {
  const w = clipsEl.clientWidth, time = posToTime(pos);
  ph.style.transform = 'translateX(' + (time / TOTAL * w) + 'px)';
}
let last = performance.now();
function tick(now) {
  const dt = Math.max(0, Math.min(.1, (now - last) / 1000)); last = now;
  if (playing && !scrubbing && heroVisible && !document.hidden) { pos = (pos + dt / SLOT) % ORDER.length; }
  showTech(Math.floor(pos)); placePlayhead();
  requestAnimationFrame(tick);
}
function seekFromEvent(e) {
  const r = clipsEl.getBoundingClientRect(), f = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  pos = timeToPos(f * TOTAL);
  showTech(Math.min(ORDER.length - 1, Math.floor(pos))); placePlayhead();
}
clipsEl.addEventListener('pointerdown', e => { scrubbing = true; clipsEl.setPointerCapture(e.pointerId); seekFromEvent(e) });
clipsEl.addEventListener('pointermove', e => { if (scrubbing) seekFromEvent(e) });
const endScrub = () => { scrubbing = false; clearTimeout(monT); loadMon(shown) };
clipsEl.addEventListener('pointerup', endScrub); clipsEl.addEventListener('pointercancel', endScrub);
clipsEl.addEventListener('keydown', e => {
  const step = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
  if (step) { e.preventDefault(); pos = (Math.floor(pos) + step + ORDER.length) % ORDER.length + .01; playing = false; syncPlayBtn() }
});
function syncPlayBtn() {
  $('#mon-ico').setAttribute('d', playing ? 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z' : 'M7 4.5v15l12-7.5z');
  $('#mon-play').setAttribute('aria-label', playing ? 'Pause' : 'Play');
}
$('#mon-play').addEventListener('click', () => { playing = !playing; syncPlayBtn() });
$('#mon-open').addEventListener('click', () => openTech(ORDER[Math.max(0, shown)].id));
new IntersectionObserver(es => { heroVisible = es[0].isIntersecting }).observe($('.hero'));
syncPlayBtn(); showTech(0); placePlayhead(); requestAnimationFrame(tick);
addEventListener('resize', placePlayhead);

/* ---------- rail ---------- */
const rail = $('#rail-in');
rail.innerHTML = '<a href="#reels" data-sec="reels"><i></i><span>Category reels</span></a><span class="gap"></span>' + VIDEOS.map(v => '<a href="#v' + v.n + '" data-sec="v' + v.n + '" style="--ac:' + v.ac + '"><i></i><b>' + fa(v.n) + '</b><span>' + esc(shortTitle(v)) + '</span></a>').join('') +
  '<span class="gap"></span><a href="#colors" data-sec="colors"><i></i><span>Colors</span></a><a href="#kit" data-sec="kit"><i></i><span>Motion kit</span></a>';

/* ---------- chapters ---------- */
const frames = [];
/* Demos load a little before they scroll into view and are only unloaded when far away.
   This keeps scrolling smooth on phones (few live iframes) and avoids black tiles. */
const live = new Set(), near = new Set(), MAX_LIVE = 8;
function turnOn(f) {
  if (f.dataset.on) return;
  if (live.size >= MAX_LIVE) { for (const o of live) { if (!near.has(o)) { turnOff(o); break } } }
  f.dataset.on = '1'; live.add(f);
  f.onload = () => { f.onload = null; if (f.dataset.on) f.parentElement.classList.add('ready') };
  f.srcdoc = f._doc;
}
function turnOff(f) { if (!f.dataset.on) return; f.onload = null; f.srcdoc = ''; delete f.dataset.on; live.delete(f); f.parentElement.classList.remove('ready') }
const ioNear = new IntersectionObserver(es => es.forEach(e => {
  const f = e.target;
  if (e.isIntersecting) { near.add(f); f.parentElement.classList.add('in'); turnOn(f) } else { near.delete(f); f.parentElement.classList.remove('in') }
}), { rootMargin: '700px 0px' });
const ioFar = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) turnOff(e.target) }), { rootMargin: '1800px 0px' });
const io = { observe(f) { ioNear.observe(f); ioFar.observe(f) } };

/* Poster shown under every demo until it has loaded: a category icon on a soft, colorful, slowly moving glow. */
const ICONS = {
  type: '<path d="M10 14V10h28v4M24 10v28M18 38h12"/><path d="M33 26h9M37.5 26v12" opacity=".6"/>',
  ui: '<rect x="9" y="12" width="30" height="24" rx="6"/><path d="M9 20h30"/><circle cx="15" cy="16" r="1" fill="currentColor"/><path d="M16 29h10M16 33h6" opacity=".65"/>',
  data: '<path d="M10 38V22M20 38V14M30 38V26M40 38V10"/><path d="M8 38h34" opacity=".6"/>',
  fx: '<path d="M24 6c1.4 9 4 11.6 13 13-9 1.4-11.6 4-13 13-1.4-9-4-11.6-13-13 9-1.4 11.6-4 13-13z"/><path d="M37 30c.6 3.6 1.6 4.6 5 5.2-3.4.6-4.4 1.6-5 5.2-.6-3.6-1.6-4.6-5-5.2 3.4-.6 4.4-1.6 5-5.2z" opacity=".7"/>',
  layout: '<path d="M8 17V9h8M32 9h8v8M40 31v8h-8M16 39H8v-8"/><rect x="18" y="18" width="12" height="12" rx="3" opacity=".7"/>'
};
function posterHTML(t) {
  return '<div class="ph" style="--cc:' + CATC[t.cat] + '" aria-hidden="true"><i class="b1"></i><i class="b2"></i><i class="b3"></i><div class="ph-icon"><svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + ICONS[t.cat] + '</svg></div></div>';
}

function ribbonHTML(v) {
  return '<div class="ribbon" role="group" aria-label="Colors of ' + esc(shortTitle(v)) + '">' + v.palette.map(g =>
    '<div class="g" style="--n:' + g.c.length + '">' + g.c.map(c => '<button type="button" style="--c:' + c[0] + '" data-hex="' + c[0] + '" data-role="' + esc(c[1]) + '" aria-label="Copy ' + c[0] + ' (' + esc(c[1]) + ')"></button>').join('') + '</div>').join('') +
    '</div><div class="ribbon-cap" aria-hidden="true">Hover or tap a color, then click to copy its HEX</div>';
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
  return '<div class="tl" role="group" aria-label="Timeline of ' + esc(shortTitle(v)) + '"><div class="tl-ruler">' + ticks + '</div><div class="tl-lanes" style="height:' + (lanes.length * 28) + 'px">' + seg + '</div></div>' +
    (items.some(i => i.full) ? '<p class="tl-note">Hatched bars mean the technique is used across the whole video or in scattered places.</p>' : '');
}
function tileHTML(t) {
  return '<div class="tile-demo">' + posterHTML(t) + '<iframe title="' + esc(t.fa) + '" sandbox="allow-scripts" tabindex="-1"></iframe><button class="tile-open" type="button" aria-label="Open: ' + esc(t.fa) + '"></button></div>' +
    '<h3>' + esc(t.fa) + '</h3><span class="cat">' + catDot(t.cat) + catLabel(t) + '</span>' +
    '<button class="btn tile-btn" type="button" data-details>Details <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
}
const chapters = $('#chapters');
VIDEOS.forEach(v => {
  const sec = document.createElement('article');
  sec.className = 'chap'; sec.id = 'v' + v.n; sec.dataset.spy = ''; sec.style.setProperty('--ac', v.ac);
  sec.innerHTML = '<header class="chap-h"><span class="chap-n" aria-hidden="true">' + fa(v.n).padStart(2, '0') + '</span><div><h2>' + esc(v.title) + '</h2><p class="chap-meta">' + esc(v.meta) + '</p></div></header>' +
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
  const open = e.target.closest('.tile-open, [data-details]'); if (open) return openTech(open.closest('.tile').dataset.id);
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
fl.innerHTML = '<button class="chip" type="button" data-cat="all" aria-pressed="true">All <small>' + fa(TECHS.length) + '</small></button>' +
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
let spyCur = null;
const spy = new IntersectionObserver(es => {
  es.forEach(e => spyMap.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
  let best = null, bv = 0; spyMap.forEach((r, id) => { if (r > bv) { bv = r; best = id } });
  if (!best || best === spyCur) return;
  spyCur = best;
  $$('.rail a').forEach(a => {
    const on = a.dataset.sec === best; a.setAttribute('aria-current', on);
    /* Center the active chip by scrolling only the chip bar sideways. scrollIntoView would also move the page and fight the user's scroll. */
    if (on && matchMedia('(max-width:1099px)').matches) {
      const bar = a.parentElement, x = a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2;
      bar.scrollTo({ left: Math.max(0, x), behavior: 'auto' });
    }
  });
}, { rootMargin: '-110px 0px -45% 0px', threshold: [0, .02, .1, .3] });
$$('.chap, #reels, #colors, #kit').forEach(s => spy.observe(s));

/* ---------- category reels ---------- */
const REELS = {
  type: ['kinetic', 'softwipe', 'wordcuts', 'chroma', 'neonslam', 'ovalmark', 'bleedtext'],
  ui: ['glass', 'stack', 'list3d', 'chips', 'slabbtn', 'liquidmorph', 'floatcards'],
  data: ['counter', 'slider', 'chart', 'clockdial', 'ringcount', 'timerrows', 'statboard'],
  fx: ['focus', 'particles', 'scenecut', 'lightbloom', 'dustdissolve', 'gridwave', 'layerparallax'],
  layout: ['frame', 'reticle', 'hexnodes', 'nodeflow', 'posterred', 'cornerhud', 'archframe']
};
const RSLOT = 4.2;
let rcat = 'type', ri = 0, rt = 0, rplaying = !reduced, rvisible = false, rready = false, rfront = null, rtok = 0, rlast = performance.now();
const rA = $('#rl-a'), rB = $('#rl-b'), rItems = () => REELS[rcat].map(id => byId[id]);
$('#rl-tabs').innerHTML = Object.entries(CATS).map(([k, l]) => '<button role="tab" type="button" data-k="' + k + '" aria-selected="' + (k === rcat) + '">' + l + '</button>').join('');
function rBuild() {
  const items = rItems(), sec = $('#reels');
  sec.style.setProperty('--ac', CATC[rcat]);
  $('#rl-bar').innerHTML = items.map(() => '<i></i>').join('');
  $('#rl-list').innerHTML = items.map((t, i) => '<li><button type="button" data-i="' + i + '"><b>' + (i + 1) + '</b><span>' + esc(t.fa) + '</span><small>' + mmss(i * RSLOT) + '</small></button></li>').join('');
  $('#rl-all').textContent = 'See all ' + TECHS.filter(t => t.cat === rcat).length + ' in ' + CATS[rcat];
  $$('#rl-tabs [role=tab]').forEach(b => b.setAttribute('aria-selected', b.dataset.k === rcat));
}
function rUI() {
  const t = rItems()[ri], n = REELS[rcat].length;
  $('#rl-meta').innerHTML = 'Technique ' + (ri + 1) + ' of ' + n + ' · Video ' + fa(t.vid.n) + ': ' + esc(shortTitle(t.vid));
  $('#rl-title').textContent = t.fa; $('#rl-when').textContent = t.when;
  $$('#rl-list button').forEach((b, i) => b.classList.toggle('on', i === ri));
  $$('#rl-bar i').forEach((s, i) => { s.style.setProperty('--p', i < ri ? 1 : 0); s.classList.toggle('on', i === ri) });
  $('#rl-time').textContent = mmss(ri * RSLOT + rt) + ' / ' + mmss(n * RSLOT);
}
function rLoad(i) {
  ri = (i + REELS[rcat].length) % REELS[rcat].length; rt = 0; rready = false; rUI();
  const back = rfront === rA ? rB : rA, old = rfront, tok = ++rtok;
  back.onload = () => {
    if (tok !== rtok) return;
    back.onload = null; back.classList.add('on'); rfront = back; rready = true;
    if (old) { old.classList.remove('on'); setTimeout(() => { if (rfront !== old) { old.onload = null; old.srcdoc = '' } }, 400) }
  };
  back.srcdoc = docFor(rItems()[ri]);
}
function rStop() { rtok++; rready = false; [rA, rB].forEach(f => { f.onload = null; f.srcdoc = ''; f.classList.remove('on') }); rfront = null }
function rSyncPlay() {
  $('#rl-ico').setAttribute('d', rplaying ? 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z' : 'M7 4.5v15l12-7.5z');
  $('#rl-play').setAttribute('aria-label', rplaying ? 'Pause' : 'Play');
}
function rTick(now) {
  const dt = Math.max(0, Math.min(.1, (now - rlast) / 1000)); rlast = now;
  if (rvisible && rready && rplaying && !document.hidden) {
    rt += dt;
    if (rt >= RSLOT) rLoad(ri + 1);
    else {
      const bar = $$('#rl-bar i')[ri]; if (bar) bar.style.setProperty('--p', (rt / RSLOT).toFixed(3));
      $('#rl-time').textContent = mmss(ri * RSLOT + rt) + ' / ' + mmss(REELS[rcat].length * RSLOT);
    }
  }
  requestAnimationFrame(rTick);
}
new IntersectionObserver(es => {
  const v = es[0].isIntersecting;
  if (v === rvisible) return; rvisible = v;
  if (v) rLoad(ri); else rStop();
}, { rootMargin: '150px 0px' }).observe($('#reels'));
$('#rl-tabs').addEventListener('click', e => { const b = e.target.closest('[role=tab]'); if (!b || b.dataset.k === rcat) return; rcat = b.dataset.k; ri = 0; rBuild(); if (rvisible) rLoad(0) });
$('#rl-list').addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) rLoad(+b.dataset.i) });
$('#rl-bar').addEventListener('click', () => {});
$('#rl-prev').addEventListener('click', () => rLoad(ri - 1));
$('#rl-next').addEventListener('click', () => rLoad(ri + 1));
$('#rl-play').addEventListener('click', () => { rplaying = !rplaying; rSyncPlay() });
$('#rl-open').addEventListener('click', () => openTech(rItems()[ri].id));
$('#rl-all').addEventListener('click', () => { const b = $('#filters .chip[data-cat="' + rcat + '"]'); if (b) b.click(); $('#library').scrollIntoView() });
rBuild(); rSyncPlay(); rUI(); requestAnimationFrame(rTick);


/* ---------- site menu drawer ---------- */
const drawer = $('#drawer'), menuBtn = $('#menu-btn'), htmlEl = document.documentElement;
function openDrawer() {
  if (drawer.open) return;
  if (dlg.open) dlg.close(); if (cmd.open) cmd.close();
  drawer.classList.remove('closing'); drawer.showModal(); htmlEl.classList.add('menu-open'); menuBtn.setAttribute('aria-expanded', 'true');
  $('#drawer-close').focus({ preventScroll: true });
}
function closeDrawer() {
  if (!drawer.open || drawer.classList.contains('closing')) return;
  const done = () => { drawer.classList.remove('closing'); drawer.close(); htmlEl.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded', 'false') };
  if (reduced) done(); else { drawer.classList.add('closing'); setTimeout(done, 250) }
}
menuBtn.addEventListener('click', openDrawer);
$('#drawer-close').addEventListener('click', closeDrawer);
drawer.addEventListener('click', e => { if (e.target === drawer || e.target.closest('a')) closeDrawer() });
drawer.addEventListener('cancel', e => { e.preventDefault(); closeDrawer() });
try {
  const ifmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', hour12: false });
  const itick = () => { $('#drawer-clock').textContent = 'Istanbul · ' + ifmt.format(new Date()) + ' local time' };
  itick(); setInterval(itick, 10000);
} catch (e) {}

/* ---------- colors section ---------- */
const colList = $('#col-list');
colList.innerHTML = VIDEOS.map(v => '<div class="cv" style="--ac:' + v.ac + '" data-v="' + v.n + '"><h3><i></i>Video ' + fa(v.n) + ': ' + esc(shortTitle(v)) + '</h3>' +
  v.palette.map(g => '<div class="cg"><h4>' + esc(g.g) + '</h4><div class="sws">' + g.c.map(c => '<button type="button" class="sw" data-hex="' + c[0] + '" data-q="' + esc(norm(c[0] + ' ' + c[1] + ' ' + g.g)) + '" aria-label="Copy ' + c[0] + ' ' + esc(c[1]) + '"><i style="background:' + c[0] + '"></i><code>' + c[0] + '</code><span>' + esc(c[1]) + '</span></button>').join('') + '</div></div>').join('') + '</div>').join('');
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
  js: [KIT_JS, 'Helper functions and play(dur, draw). Put this at the top of every example.'],
  css: [KIT_CSS, 'A 9:16 stage in rem units, so everything scales with the page width.'],
  render: [RENDER_JS, 'Render to video with Playwright and ffmpeg, frame by frame with no dropped frames.']
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
  if (tabK === 'snip') { setCode($('#d-pre'), snippetFor(t)); $('#d-note').textContent = 'Only the technique\'s CSS, HTML and JS. Copy the Motion Kit separately.' }
  else { setCode($('#d-pre'), docFor(t)); $('#d-note').textContent = 'A complete, standalone HTML file. Open it in a browser and it runs.' }
}
function openTech(id, fromHash) {
  const t = byId[id]; if (!t) return; cur = t;
  $('#d-frame').srcdoc = docFor(t);
  $('#d-cat').innerHTML = catDot(t.cat) + catLabel(t);
  $('#d-vid').textContent = 'Video ' + fa(t.vid.n) + ': ' + shortTitle(t.vid);
  $('#d-title').textContent = t.fa;
  $('#d-when').textContent = t.when; $('#d-timing').textContent = t.timing; $('#d-where').textContent = t.where;
  $('#d-colors').innerHTML = t.colors.map(c => '<button type="button" data-hex="' + c + '" aria-label="Copy ' + c + '"><i style="background:' + c + '"></i>' + c + '</button>').join('');
  tabK = 'snip'; $$('#d-tabs [role=tab]').forEach(x => x.setAttribute('aria-selected', x.dataset.k === 'snip')); renderCode();
  $('.d-info', dlg).scrollTop = 0;
  if (cmd.open) cmd.close();
  if (!dlg.open) { dlg.showModal(); $('#d-close').focus({ preventScroll: true }); }
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
  if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1);
});

/* ---------- search ---------- */
const cmd = $('#cmd'), q = $('#cmd-q'), list = $('#cmd-list'); let results = [], sel = 0;
const INDEX = TECHS.map(t => ({ t, s: norm([t.fa, t.when, catLabel(t), t.vid.title, t.colors.join(' ')].join(' ')) }));
const COLORS = []; VIDEOS.forEach(v => v.palette.forEach(g => g.c.forEach(c => COLORS.push({ v, hex: c[0], role: c[1], s: norm(c[0] + ' ' + c[1] + ' ' + g.g) }))));
function runSearch() {
  const query = norm(q.value.trim()), words = query.split(/\s+/).filter(Boolean);
  results = [];
  if (!words.length) { results = ORDER.slice(0, 8).map(t => ({ kind: 't', t })) }
  else {
    INDEX.forEach(({ t, s }) => { if (words.every(w => s.includes(w))) results.push({ kind: 't', t, rank: norm(t.fa).includes(words[0]) ? 0 : 1 }) });
    results.sort((a, b) => a.rank - b.rank);
    results = results.slice(0, 12);
    COLORS.forEach(c => { if (results.length < 18 && words.every(w => c.s.includes(w)) && (words[0].startsWith('#') || words[0].length > 2)) results.push({ kind: 'c', c }) });
  }
  sel = 0; renderResults();
}
function renderResults() {
  list.innerHTML = results.length ? results.map((r, i) => r.kind === 't'
    ? '<li role="option" data-i="' + i + '" aria-selected="' + (i === sel) + '">' + catDot(r.t.cat) + '<span>' + esc(r.t.fa) + '</span><span class="sub">Video ' + fa(r.t.vid.n) + '</span></li>'
    : '<li role="option" data-i="' + i + '" aria-selected="' + (i === sel) + '"><span class="sq" style="background:' + r.c.hex + '"></span><span><code>' + r.c.hex + '</code> ' + esc(r.c.role) + '</span><span class="sub">Copy color · video ' + fa(r.c.v.n) + '</span></li>').join('')
    : '<li aria-disabled="true" style="cursor:default;color:var(--mute)">Nothing found. Try a technique name, a category or a HEX value.</li>';
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

/* ---------- glow, ripple ---------- */
if (matchMedia('(pointer: fine)').matches) {
  addEventListener('mousemove', e => {
    document.documentElement.style.setProperty('--mouse-x', (e.clientX / innerWidth * 100) + '%');
    document.documentElement.style.setProperty('--mouse-y', (e.clientY / innerHeight * 100) + '%');
  }, { passive: true });
}
document.addEventListener('pointerdown', e => {
  const b = e.target.closest('.btn'); if (!b || reduced) return;
  const r = b.getBoundingClientRect(), z = Math.max(r.width, r.height) * 2.4, d = document.createElement('span');
  d.className = 'ripple';
  d.style.cssText = 'width:' + z + 'px;height:' + z + 'px;left:' + (e.clientX - r.left - z / 2) + 'px;top:' + (e.clientY - r.top - z / 2) + 'px';
  b.appendChild(d); setTimeout(() => d.remove(), 750);
});
})();
