/* editor/io_import/tables.js: images sized to fit the page, rows → a document table (first row as a header),
   trimming of large sheets, CSV / TSV parsing (delimiter guessed from the first line) and source code as a code block. */
import { state, dims, DPI, esc_html } from '../core/index.js';
import { load_img } from '../content/index.js';
import { HDR_BG } from '../format/index.js';

export function content_width_px() { const { w } = dims(), m = state.setup.margins; return Math.round(w - (m.left + m.right) * DPI); }
/* an image as wide as it is (at most the text width, and 90% of the text height), in its own paragraph unless inline */
export async function fit_img_html(url, alt, inline) {
