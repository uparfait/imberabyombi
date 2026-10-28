/* editor/ui/sections.js: the document as sections for the outline: a heading (Title, Heading 1–4) and everything after
   it up to the next heading of the same or a higher level. A move or delete rewrites the whole document (the pages'
   html joined, so split lists and tables are whole again), then the pages reflow: one undo step. Only headings that sit
   directly in a page (not in a table or quote) carry a section. */
import { pages_el, bodies, qsa, collect_html, begin_op, end_op, caret_to_start } from '../core/index.js';
import { can_edit } from '../format/index.js';
import { clean_text } from './ui_dom.js';

const HEAD = 'h1, h2, h3, h4, p.title';
