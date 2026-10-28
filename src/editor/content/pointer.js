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
