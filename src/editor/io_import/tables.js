/* editor/io_import/tables.js: images sized to fit the page, rows → a document table (first row as a header),
   trimming of large sheets, CSV / TSV parsing (delimiter guessed from the first line) and source code as a code block. */
import { state, dims, DPI, esc_html } from '../core/index.js';
import { load_img } from '../content/index.js';
import { HDR_BG } from '../format/index.js';

export function content_width_px() { const { w } = dims(), m = state.setup.margins; return Math.round(w - (m.left + m.right) * DPI); }
/* an image as wide as it is (at most the text width, and 90% of the text height), in its own paragraph unless inline */
export async function fit_img_html(url, alt, inline) {
  let w = 320;
  try {
    const im = await load_img(url), { h } = dims(), m = state.setup.margins, max_h = (h - (m.top + m.bottom) * DPI) * 0.9;
    if (im.naturalWidth) {
      w = Math.min(im.naturalWidth, content_width_px());
      if (im.naturalHeight * w / im.naturalWidth > max_h) w = Math.floor(max_h * im.naturalWidth / im.naturalHeight);
    }
  } catch { /* keep 320 px */ }
  const tag = `<img src="${url}" alt="${esc_html(alt || '')}" style="width:${Math.max(16, w)}px">`;
  return inline ? tag : `<p>${tag}</p>`;
}
export function rows_to_table(rows, header) {
  const width = Math.max(1, ...rows.map(r => r.length));
  let h = `<table class="doc_table"${header ? ' data-header=""' : ''} style="--bw:1px;--bc:#9aa0a6">`;
  rows.forEach((r, i) => {
    h += '<tr>';
    for (let c = 0; c < width; c++) {
      const v = r[c] == null ? '' : String(r[c]), hd = header && i === 0;
      h += `<td${hd ? ` data-hdr="" data-autobg="" style="background-color:${HDR_BG}"` : ''}><p>${v ? esc_html(v).replace(/\n/g, '<br>') : '<br>'}</p></td>`;
    }
    h += '</tr>';
  });
  return h + '</table>';
}
/* empty trailing rows / columns dropped, then at most max_r rows and max_c columns (cut = something was left out) */
