/* editor/core/live.js: live preview (owner's requirement). Hovering a formatting choice applies it at once; leaving
   restores the exact previous state; a click keeps it as ONE undo step. UI parts call, per choice:
     pointerenter → live.preview(fn[, restore])   pointerleave → live.cancel()   click → live.keep(fn)
   preview: the first call snapshots the active tab (page html, selection, selected image, scroll, setup, zoom, toolbar
   state); later calls restore that snapshot first. fn runs with history off and its toasts held back. `restore` (optional)
   undoes side effects outside the document (e.g. a remembered colour) on cancel. Previews never enter the undo stack. */
import { qsa } from './utils.js';
import { state } from './state.js';
import { refs, pages_el, scroller } from './refs.js';
import { bodies, page_wraps, editable_of } from './dom.js';
import { create_page } from './pages.js';
import { layout_after } from './reflow.js';
import { last_range, set_last, mk_range } from './selection.js';
import { hist_timer, commit, path_to, node_at } from './history.js';
import { quiet, toast } from './toast.js';
import { refresh_toolbar, apply_setup, set_zoom } from '../ui/index.js';
import { img_sel, select_image, hide_img_sel } from '../content/index.js';

let cur = null, zombies = 0, keeps = 0;   // cur: the running preview; zombies: cancelled previews whose async action still runs
export function live_busy() { return !!cur || zombies > 0; }

function where(n) { const bs = bodies(), h = editable_of(n), i = bs.indexOf(h), p = i < 0 ? null : path_to(h, n); return p ? { i, p } : null; }
function find(w) { const b = w && bodies()[w.i]; return b ? node_at(b, w.p) : null; }
function doc_range() {
  const s = getSelection();
  if (s.rangeCount) { const r = s.getRangeAt(0); if (where(r.startContainer)) return r; }
  return last_range && last_range.startContainer.isConnected ? last_range : null;
}
function take() {
  const r = doc_range(), a = r && where(r.startContainer), b = r && where(r.endContainer), bar = refs.toolbar;
  return { tab: state.active, html: bodies().map(x => x.innerHTML), sel: a && b ? { a, so: r.startOffset, b, eo: r.endOffset } : null,
    img: img_sel && img_sel.isConnected ? where(img_sel) : null, top: scroller ? scroller.scrollTop : 0, setup: JSON.stringify(state.setup),
    zoom: state.zoom, on: bar ? qsa('.active', bar) : [], color: refs.color_bar?.style.background ?? null, size: refs.size_input?.value ?? null };
}
function put(sn) {
  if (!pages_el || sn.tab !== state.active) return;
  hide_img_sel();
  if (JSON.stringify(state.setup) !== sn.setup) { state.setup = JSON.parse(sn.setup); apply_setup(false); }
  if (state.zoom !== sn.zoom) set_zoom(sn.zoom);
  let ws = page_wraps();
  while (ws.length < sn.html.length) { pages_el.appendChild(create_page()); ws = page_wraps(); }
  while (ws.length > sn.html.length) ws.pop().remove();
  bodies().forEach((b, i) => { if (b.innerHTML !== sn.html[i]) b.innerHTML = sn.html[i]; });
  layout_after();
  const s = sn.sel, sc = s && find(s.a), ec = s && find(s.b), r = sc && ec ? mk_range(sc, s.so, ec, s.eo) : null;
  if (r) {
    const h = editable_of(sc), ae = document.activeElement;
    if (!ae || ae === document.body || pages_el.contains(ae)) { if (ae !== h) h.focus({ preventScroll: true }); const g = getSelection(); g.removeAllRanges(); g.addRange(r); }
    set_last(r.cloneRange(), h);
  }
  const im = find(sn.img); if (im) select_image(im);
  const bar = refs.toolbar;
  if (bar) { qsa('.active', bar).forEach(e => { if (!sn.on.includes(e)) e.classList.remove('active'); }); sn.on.forEach(e => e.classList.add('active')); }
  if (refs.color_bar && sn.color != null) refs.color_bar.style.background = sn.color;
  if (refs.size_input && sn.size != null) refs.size_input.value = sn.size;
  refresh_toolbar();
  if (scroller) scroller.scrollTop = sn.top;
}
function extras(s) { const r = s.restores.splice(0); r.reverse().forEach(f => { try { f(); } catch (e) { console.error(e); } }); }
function run(s) {
  const g = ++s.gen; let r; s.msgs = [];
  try { r = quiet(s.fn, s.msgs); } catch (e) { console.error(e); }
  if (r && typeof r.then === 'function') { s.pending++; Promise.resolve(r).catch(e => console.error(e)).then(() => settle(s, g)); }
}
function finish(s) { commit(); refresh_toolbar(); s.msgs.forEach(m => toast(...m)); }
/* an async action (image bake, …) finished: keep the result only if it belongs to what is on screen */
function settle(s, g) {
  s.pending--;
  if (g !== s.gen) s.dirty = true;
  if (s.pending) return;
  if (s.cancelled) { zombies--; if (cur) { put(cur.snap); run(cur); } else if (s.epoch === keeps) put(s.snap); else commit(); return; }
  if (s.kept) { finish(s); return; }
  if (cur === s && s.dirty) { s.dirty = false; put(s.snap); run(s); }
}

const mark = on => refs.root?.classList.toggle('ed_previewing', on);   /* hides the selection highlight (04_pages.css) */
export const live = {
  get active() { return !!cur; },
  busy: live_busy,
  preview(fn, restore) {
    if (typeof fn !== 'function' || state.mode !== 'edit' || !pages_el) return;
    if (!cur) { if (hist_timer) commit(); cur = { snap: take(), fn, gen: 0, pending: 0, msgs: [], restores: [], dirty: false }; }
    else { put(cur.snap); extras(cur); cur.fn = fn; }
    if (typeof restore === 'function') cur.restores.push(restore);
    run(cur); mark(true);
  },
  cancel() {
    const s = cur; if (!s) return; mark(false);
    cur = null; s.cancelled = true; s.epoch = keeps; put(s.snap); extras(s);
    if (s.pending) zombies++;
  },
  /* keep the preview as one history step; with a different fn (or no preview) run fn normally */
  keep(fn) {
    const s = cur;
    if (s && (!fn || fn === s.fn)) { mark(false); keeps++; cur = null; s.kept = true; s.restores = []; if (!s.pending) finish(s); return; }
    if (s) live.cancel();
    keeps++;
    return typeof fn === 'function' ? fn() : undefined;
  }
};
