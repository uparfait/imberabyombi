/* editor/io_export/export_text.js: the web page (.html: one file, the document's own styles inside, printable) and the
   plain text (.txt: page breaks become form feeds, images and attachments become [image: …] / [attachment: …] marks). */
import { state, dims, download, el, qsa, esc_html } from '../core/index.js';
import { CONTENT_CSS } from './content_css.js';

export function export_html(root, name) {
