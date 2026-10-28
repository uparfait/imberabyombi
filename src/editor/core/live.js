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
