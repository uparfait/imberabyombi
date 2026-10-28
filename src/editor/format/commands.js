/* editor/format/commands.js: the formatting commands: the editing-mode guard, the execCommand wrapper, inline styles on
   the selection (wrap_selection), font size / font / text colour / highlight. All callable inside live.preview(fn)
   (core keeps previews out of history and holds their toasts back). */
import { state, refs, el, qsa, uid, clamp, editable_of, restore_focus, set_caret, body_index, schedule_reflow, toast, begin_op, commit_soon } from '../core/index.js';
import { refresh_toolbar } from '../ui/index.js';

/* ================= formatting commands ================= */
export function can_edit() { if (state.mode !== 'edit') { toast('Switch to Editing mode to make changes'); return false; } return true; }
export function exec(cmd, val) {
  if (!can_edit()) return;
  const host = restore_focus(); begin_op();
  document.execCommand('styleWithCSS', false, true);
  document.execCommand(cmd, false, val);
  if (host && host.classList.contains('pg_body')) schedule_reflow(body_index(host));
  commit_soon(); refresh_toolbar();
}
/* wrap the selected text in spans (class cls, attributes attrs) and select them; returns the spans */
/* the font each selected piece of text has now (the marker in wrap_selection would erase it) */
function fonts_in(host, r) {
  const m = new Map(), w = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) { if (!r.intersectsNode(n)) continue; let e = n.parentElement;
    while (e && e !== host && !e.style?.fontFamily && !e.getAttribute?.('face')) e = e.parentElement;
    if (e && e !== host) m.set(n, e.style.fontFamily || e.getAttribute('face')); }
  return m;
}
const font_of = (x, fonts) => { const w = document.createTreeWalker(x, NodeFilter.SHOW_TEXT); for (let n = w.nextNode(); n; n = w.nextNode()) if (fonts.get(n)) return fonts.get(n); return ''; };
export function wrap_selection(cls, attrs = {}) {
  const s = getSelection(); if (!s.rangeCount || s.isCollapsed) return [];
  const host = editable_of(s.anchorNode); if (!host) return [];
  const marker = 'wrapmark' + uid(), fonts = fonts_in(host, s.getRangeAt(0));
  document.execCommand('styleWithCSS', false, false);
  document.execCommand('fontName', false, marker);
  document.execCommand('styleWithCSS', false, true);
  const out = [];
  qsa('font', host).filter(f => f.getAttribute('face') === marker).forEach(f => {
    const sp = document.createElement('span'), ff = font_of(f, fonts); if (cls) sp.className = cls; if (ff) sp.style.fontFamily = ff;   /* the browser drops it */
    for (const k in attrs) sp.setAttribute(k, attrs[k]);
    while (f.firstChild) sp.appendChild(f.firstChild); f.replaceWith(sp); out.push(sp);
  });
  qsa('[style]', host).filter(x => x.style.fontFamily && x.style.fontFamily.includes(marker)).forEach(x => {
    x.style.fontFamily = font_of(x, fonts); if (!x.getAttribute('style')) x.removeAttribute('style');   /* keeps its own font */
    if (cls) x.classList.add(cls); for (const k in attrs) x.setAttribute(k, attrs[k]); out.push(x);
  });
  if (out.length) { const r = document.createRange(); r.setStartBefore(out[0]); r.setEndAfter(out[out.length - 1]); s.removeAllRanges(); s.addRange(r); }
  return out;
}
export function apply_inline_style(prop, value) {
  if (!can_edit()) return;
  const host = restore_focus(); begin_op();
  const s = getSelection(); if (!s.rangeCount) return;
  if (s.isCollapsed) {
    const sp = el('span'); sp.style[prop] = value; sp.textContent = '\u200b';
    const r = s.getRangeAt(0); r.insertNode(sp); set_caret(sp.firstChild, 1);
  } else {
    wrap_selection('', {}).forEach(sp => { qsa('[style]', sp).forEach(x => { x.style[prop] = ''; if (!x.getAttribute('style')) x.removeAttribute('style'); }); sp.style[prop] = value; });
  }
  if (host && host.classList.contains('pg_body')) schedule_reflow(body_index(host));
  commit_soon(); refresh_toolbar();
}
const size_input = () => refs.size_input;
export function set_font_size(pt) { pt = clamp(Math.round(pt * 2) / 2, 1, 400); const i = size_input(); if (i) i.value = pt; apply_inline_style('fontSize', pt + 'pt'); }
export function bump_size(d) { const cur = parseFloat(size_input()?.value) || 11; set_font_size(cur + d); }
export function set_font(f) { exec('fontName', f); const l = refs.font_label; if (l) l.textContent = f; }
/* the last colours picked (kept as in the source; core's live restores #color_bar when a preview is cancelled) */
export let last_text_color = '#000000', last_hilite = '#ffff00';
export function set_text_color(c) { if (c) last_text_color = c; const b = refs.color_bar; if (b) b.style.background = c || '#000000'; exec('foreColor', c || '#000000'); }
