/* editor/content/pages.js: page management: a blank page after page i (add_blank_page) and deleting page i with
   everything on it (delete_page, after a confirm). Not in Pageless mode. */
import { el, toast, state, bodies, is_break, first_flow, last_flow, remove_page, caret_to_start, begin_op, end_op } from '../core/index.js';
import { can_edit, previewing } from '../format/index.js';
import { ask } from '../../overlays/index.js';

export function add_blank_page(i) {
  if (previewing() || !can_edit()) return;
  if (state.setup.pageless) { toast('Turn off Pageless in Page setup to manage pages'); return; }
  begin_op(); const bs = bodies(), b = bs[i], has_next = !!bs[i + 1];
  const nf = has_next && first_flow(bs[i + 1]); if (nf && nf.hasAttribute('data-cont')) nf.removeAttribute('data-cont');
  const p = el('p', {}, '<br>');
  if (!is_break(last_flow(b))) b.appendChild(el('div', { class: 'page_break', contenteditable: 'false' }));
  b.appendChild(p); if (has_next) b.appendChild(el('div', { class: 'page_break', contenteditable: 'false' }));
  end_op(i, true); if (p.isConnected) { caret_to_start(p); p.closest('.page_wrap').scrollIntoView({ block: 'start', behavior: 'smooth' }); }
}
export function delete_page(i) {
  if (previewing() || !can_edit()) return;
  const bs = bodies(), b = bs[i];
  ask(`Delete page ${i + 1} and everything on it?`, () => {
    begin_op();
