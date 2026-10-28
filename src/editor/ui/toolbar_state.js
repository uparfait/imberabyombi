/* editor/ui/toolbar_state.js: the toolbar follows the caret (source "toolbar state"): bold / italic / underline and the
   list buttons ([data-state] → .active + aria-pressed), the font, size, paragraph style and alignment; the outline marks
   the heading the caret is in. on_selection() remembers every selection made inside the pages. */
import { refs, pages_el, last_range, set_last, el_of, editable_of, qsa, STYLES } from '../core/index.js';
import { update_link_bubble } from '../content/index.js';
import { set_text, set_icon } from './ui_dom.js';
import { mark_outline } from './outline.js';

const q = c => { try { return document.queryCommandState(c); } catch { return false; } };
const ALIGN = { center: 'format_align_center', right: 'format_align_right', end: 'format_align_right', justify: 'format_align_justify' };

export function refresh_toolbar() {
  const r = last_range; if (!r || !r.startContainer.isConnected) return;
  const n = el_of(r.startContainer), tb = refs.toolbar; if (!n || !tb) return;
  const cs = getComputedStyle(n);
  qsa('[data-state]', tb).forEach(b => {
    const k = b.dataset.state; let on = false;
    if (k === 'bold' || k === 'italic' || k === 'underline') on = q(k);
    else {
