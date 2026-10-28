/* editor/io_export/export_text.js: the web page (.html: one file, the document's own styles inside, printable) and the
   plain text (.txt: page breaks become form feeds, images and attachments become [image: …] / [attachment: …] marks). */
import { state, dims, download, el, qsa, esc_html } from '../core/index.js';
import { CONTENT_CSS } from './content_css.js';

export function export_html(root, name) {
  const { win } = dims(), m = state.setup.margins;
  const css = CONTENT_CSS + `body{margin:0;background:#f1f3f4;color-scheme:light}.sheet{background:${state.setup.page_color};max-width:${win}in;`
    + `margin:24px auto;padding:${m.top}in ${m.right}in ${m.bottom}in ${m.left}in;box-sizing:border-box;box-shadow:0 1px 3px rgba(0,0,0,.2)}`
    + '.doc_content .page_break{break-after:page;border-top:1px dashed #dadce0;margin:24px 0}'
    + '@media print{body{background:none}.sheet{box-shadow:none;margin:0;padding:0;max-width:none}.doc_content .page_break{border:0;margin:0}}';
  const doc = '<!DOCTYPE html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
    + `<title>${esc_html(state.title)}</title><style>${css}</style></head><body><div class="sheet doc_content">${root.innerHTML}</div></body></html>`;
  download(new Blob([doc], { type: 'text/html' }), name + '.html');
}

/* innerText needs the copy on the page (off screen); white-space:pre-wrap as in the document's styles keeps spaces */
export function export_txt(root, name) {
  const host = el('div', { class: 'doc_content', style: 'position:absolute;left:-99999px;top:0;width:800px;white-space:pre-wrap' });
  host.innerHTML = root.innerHTML;
  qsa('.page_break', host).forEach(p => p.replaceWith(document.createTextNode('\n\f\n')));
