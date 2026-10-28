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
export function trim_rows(rows, max_r = 2000, max_c = 40) {
  rows = rows.map(r => Array.from(r || [], v => v == null ? '' : String(v)));
  while (rows.length && rows[rows.length - 1].every(v => !v.trim())) rows.pop();
  let width = 0; rows.forEach(r => { for (let c = r.length - 1; c >= 0; c--) if (r[c].trim()) { width = Math.max(width, c + 1); break; } });
  return { rows: rows.slice(0, max_r).map(r => r.slice(0, Math.min(width, max_c))), cut: rows.length > max_r || width > max_c };
}
export function csv_parse(text, delim) {
  text = text.replace(/^\ufeff/, '');
  if (!delim) {
    const first = text.split(/\r?\n/, 1)[0] || '';
    const best = [',', ';', '\t', '|'].map(d => [d, first.split(d).length]).sort((a, b) => b[1] - a[1])[0]; delim = best[1] > 1 ? best[0] : ',';
  }
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += ch; continue; }
    if (ch === '"' && f === '') q = true;
    else if (ch === delim) { row.push(f); f = ''; }
    else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(f); rows.push(row); row = []; f = ''; }
    else f += ch;
  }
  if (f !== '' || row.length) { row.push(f); rows.push(row); }
  return rows;
