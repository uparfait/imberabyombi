/* editor/io_import/pptx.js: PowerPoint → HTML: one section per slide (title as a heading, subtitle, bullet text,
   pictures, tables, speaker notes), slides separated by page breaks. PB = the page break markup every import uses. */
import { esc_html, clamp } from '../core/index.js';
import { unzip } from './unzip.js';
import { parse_xml, by_tag, kids, dir_of, resolve_path, rels_of } from './xml_helpers.js';
import { rows_to_table } from './tables.js';

export const PB = '<div class="page_break" contenteditable="false"></div>';

/* a text paragraph: runs and fields (bold / italic kept), line breaks */
