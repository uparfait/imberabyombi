/* editor/content/pointer.js: the pages' pointer: click (attachment chips, select an image (a Behind-text one where no
   text covers it), checklist ticks, Ctrl+click links, comments), pressing an image (select + drag to move), no native
   image drag, a click in a page margin puts the caret in the body, double-click on the top / bottom margin opens the
   header / footer, and paint format after a mouseup. Column resizing is format's (install_format). */
import { qs, qsa, clamp, toast, download, state, DPI, dims, is_abs, editable_of, body_index, last_non_break, caret_from_point, set_caret, caret_to_end,
  begin_op, end_op } from '../core/index.js';
import { paint, apply_paint } from '../format/index.js';
import { apply_panels, apply_setup } from '../ui/index.js';
import { data_ur_lto_blob } from '../io_import/index.js';
import { select_image, hide_img_sel } from './img_sel.js';
import { start_img_drag, take_drag_click } from './img_drag.js';
import { render_comments } from './comment_cards.js';
import { activate_comment } from './comments.js';

/* is there text right under the point? (a click there is for the text, not for an image behind it) */
function on_text(x, y) {
  const p = caret_from_point(x, y); if (!p || p.node.nodeType !== 3) return false;
  const r = document.createRange();
  for (const o of [p.off - 1, p.off]) {
    if (o < 0 || o >= p.node.length) continue; r.setStart(p.node, o); r.setEnd(p.node, o + 1);
    if (Array.from(r.getClientRects()).some(c => x >= c.left - 2 && x <= c.right + 2 && y >= c.top && y <= c.bottom)) return true;
  }
  return false;
}
function behind_at(e) {
  const page = e.target.closest('.page'), x = e.clientX, y = e.clientY; if (!page) return null;
  const im = qsa('.pg_body img[data-pos="behind"]', page).reverse()
    .find(i => { const r = i.getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; });
  return im && !on_text(x, y) ? im : null;
}

export function pages_click(e) {
  if (take_drag_click()) return;
  const chip = e.target.closest('.pg_body .file_chip');
  if (chip) {
    e.preventDefault();
    try { download(data_ur_lto_blob(chip.getAttribute('href')), chip.getAttribute('download') || 'file'); } catch (err) { toast('This attachment could not be opened'); }
    return;
  }
  const img = e.target.closest('.pg_body img');
  if (img) { select_image(img); return; }
  const out = !e.target.closest('.img_sel'), bh = out && state.mode === 'edit' ? behind_at(e) : null;
  if (bh) { select_image(bh); return; }
  if (out) hide_img_sel();
  const li = e.target.closest('ul.checklist > li');
  if (li && e.target === li && e.clientX < li.getBoundingClientRect().left && state.mode === 'edit') {
    begin_op(); li.setAttribute('data-checked', li.getAttribute('data-checked') === 'true' ? 'false' : 'true'); end_op(body_index(editable_of(li))); return;
  }
  const a = e.target.closest('.pg_body a');
  if (a && (e.ctrlKey || e.metaKey || state.mode !== 'edit')) { e.preventDefault(); window.open(a.href, '_blank', 'noopener'); return; }
  const c = e.target.closest('.cmt'); if (c) { if (!state.show_comments) { state.show_comments = true; apply_panels(); render_comments(); } activate_comment(c.dataset.cid); }
}
/* pressing an image selects it (the caret goes next to it, as a click would) and may start a drag (img_drag.js) */
export function pages_pointerdown(e) {
  const img = e.target.closest && e.target.closest('.pg_body img'); if (!img || e.button > 0 || state.mode !== 'edit') return;
  const host = editable_of(img);
  if (is_abs(img)) { if (document.activeElement !== host) host.focus({ preventScroll: true }); }
  else set_caret(img.parentNode, Array.prototype.indexOf.call(img.parentNode.childNodes, img) + 1);
  select_image(img); start_img_drag(e, img);
}
/* images move with img_drag, never with the browser's drag and drop (that would copy them) */
export function pages_dragstart(e) { if (e.target && e.target.tagName === 'IMG' && e.target.closest('.pg_body')) e.preventDefault(); }
export function pages_mouseup() { if (paint) setTimeout(apply_paint, 0); }
export function pages_mousedown(e) {
  if (e.button !== 0) return;
  if (state.mode === 'edit' && e.target.closest('.pg_body img')) { e.preventDefault(); return; }
  const page = e.target.closest('.page'); if (!page || e.target.closest('.pg_body,.pg_header,.pg_footer_text,.img_sel')) return;
  e.preventDefault();
  const b = qs('.pg_body', page), br = b.getBoundingClientRect();
  const pos = caret_from_point(clamp(e.clientX, br.left + 2, br.right - 2), clamp(e.clientY, br.top + 2, br.bottom - 2));
  if (pos && b.contains(pos.node)) set_caret(pos.node, pos.off); else caret_to_end(last_non_break(b));
}
export function pages_dblclick(e) {
  const page = e.target.closest('.page'); if (!page || state.setup.pageless || e.target.closest('.pg_body,.pg_header,.pg_footer')) return;
  const rel_y = (e.clientY - page.getBoundingClientRect().top) / state.zoom, m = state.setup.margins;
  if (rel_y < m.top * DPI) { state.setup.header = true; apply_setup(false); qs('.pg_header', page).focus(); }
  else if (rel_y > dims().h - m.bottom * DPI) { state.setup.footer = true; apply_setup(false); qs('.pg_footer_text', page).focus(); }
}
