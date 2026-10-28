/* editor/ui/outline.js: the outline under the active tab (source renderOutline): the document's headings as text rows
   like the admin sidebar links, indented per level, the heading the caret is in marked (.active, brand). A chevron folds a
   heading's sub-headings; folds are kept per tab (tab.folds, saved with the document). Row events: outline_rows.jsx. */
import { active_tab, last_range, el_of, el, qsa, save_soon } from '../core/index.js';
import { heading_els, level_of, is_top_head } from './sections.js';
import { clean_text, mi } from './ui_dom.js';
import { wire_outline_row } from './outline_rows.jsx';

/* a heading's fold key: level + text (+ #n for the n-th heading with the same text) */
function fold_key(h, seen) { const k = level_of(h) + ':' + clean_text(h), n = (seen[k] = (seen[k] || 0) + 1); return n > 1 ? k + '#' + n : k; }
