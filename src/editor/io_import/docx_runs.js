/* editor/io_import/docx_runs.js: the built-in Word reader, inline part: a run (bold, italic, underline, strike,
   super / subscript, colour, size, font, highlight; text, tabs, breaks, images) and a paragraph's runs (with links).
   cx = { z (the unzipped file), rels (document relationships), num_fmt (list formats by numId) }. A page break is \u0001. */
import { esc_html, clamp } from '../core/index.js';
import { by_tag, kids, resolve_path } from './xml_helpers.js';
