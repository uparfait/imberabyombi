/* editor/ui/outline.js: the outline under the active tab (source renderOutline): the document's headings as text rows
   like the admin sidebar links, indented per level, the heading the caret is in marked (.active, brand). A chevron folds a
   heading's sub-headings; folds are kept per tab (tab.folds, saved with the document). Row events: outline_rows.jsx. */
import { active_tab, last_range, el_of, el, qsa, save_soon } from '../core/index.js';
import { heading_els, level_of, is_top_head } from './sections.js';
import { clean_text, mi } from './ui_dom.js';
