/* editor/core/persist.js: the document kept in the template's db under 'editor_doc': title, page setup, active tab,
   comments, and every tab with ALL its fields (html with images as data URLs, folded headings, …) except the
   undo / redo stacks, in tab order. Saved ~600 ms after each history commit / tab change, and when the editor stops. */
import { db } from '../../store/index.js';
import { uid } from './utils.js';
import { state, default_setup, new_tab, set_on_change } from './state.js';
import { pages_el } from './refs.js';
import { bodies } from './dom.js';
import { collect_html } from './collect.js';
import { live_busy } from './live.js';

export const DOC_KEY = 'editor_doc';
let save_timer = null, too_big = 0;

/* the saved shape; the active tab's html comes from the pages (split parts re-joined) */
export function doc_data() {
