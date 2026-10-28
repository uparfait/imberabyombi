/* editor/ui/pages_panel.js: the side panels' frame (source renderPagesPanel / applyPanels): the Pages list (number, a
   snippet, delete), and which panels show (tabs & outline on the left, comments on the right) with the room they take. */
import { state, refs, scroller, bodies, first_flow, caret_to_start, el } from '../core/index.js';
import { delete_page } from '../content/index.js';
import { update_rulers } from './rulers.js';
import { set_text, mi, scaled } from './ui_dom.js';

export function render_pages_panel() {
  const box = refs.page_list; if (!box) return;
