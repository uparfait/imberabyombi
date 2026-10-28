/* editor/core/persist.js: the document kept in the template's db under 'editor_doc': title, page setup, active tab,
   comments, and every tab with ALL its fields (html with images as data URLs, folded headings, …) except the
   undo / redo stacks, in tab order. Saved ~600 ms after each history commit / tab change, and when the editor stops. */
import { db } from '../../store/index.js';
import { uid } from './utils.js';
import { state, default_setup, new_tab, set_on_change } from './state.js';
import { pages_el } from './refs.js';
