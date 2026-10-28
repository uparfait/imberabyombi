/* editor/io_import/odf.js: OpenDocument text / presentation → HTML: headings, paragraphs, styled spans (bold, italic,
   underline, colour), links, lists, tables (column spans), frames (text boxes, images), slides (page break + heading).
   cx = { z (the unzipped file), sty (text styles by name) }. */
import { esc_html, clamp } from '../core/index.js';
import { unzip } from './unzip.js';
