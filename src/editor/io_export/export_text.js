/* editor/io_export/export_text.js: the web page (.html: one file, the document's own styles inside, printable) and the
   plain text (.txt: page breaks become form feeds, images and attachments become [image: …] / [attachment: …] marks). */
import { state, dims, download, el, qsa, esc_html } from '../core/index.js';
import { CONTENT_CSS } from './content_css.js';

export function export_html(root, name) {
  const { win } = dims(), m = state.setup.margins;
  const css = CONTENT_CSS + `body{margin:0;background:#f1f3f4;color-scheme:light}.sheet{background:${state.setup.page_color};max-width:${win}in;`
    + `margin:24px auto;padding:${m.top}in ${m.right}in ${m.bottom}in ${m.left}in;box-sizing:border-box;box-shadow:0 1px 3px rgba(0,0,0,.2)}`
