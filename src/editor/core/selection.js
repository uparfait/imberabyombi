/* editor/core/selection.js: the selection (source "selection"): the last range / host inside the document, save and
   restore across reflows, caret placement, caret geometry and scrolling, caret from a point, focus restore.
   last_range / last_host are live exports; other areas change them with set_last(range, host) (or the two setters). */
import { pages_el, scroller } from './refs.js';
import { bodies, body_index, editable_of, node_len, text_nodes, is_break, is_empty_block, last_non_break } from './dom.js';
import { sel_remap } from './flow.js';

export let last_range = null, last_host = null;
