/* editor/io_import/rtf.js: RTF → HTML: paragraphs and line breaks, bold / italic / underline, page breaks, tables,
   Windows-1252 and Unicode characters, typographic quotes and dashes; header, footer, fonts, pictures… are skipped. */
import { esc_html } from '../core/index.js';
import { PB } from './pptx.js';

const CP = '€\u0081‚ƒ„…†‡ˆ‰Š‹Œ\u008dŽ\u008f\u0090‘’“”•–—˜™š›œ\u009džŸ', cp = n => n >= 0x80 && n <= 0x9f ? CP[n - 0x80] : String.fromCharCode(n);
const DEST = new Set(('fonttbl colortbl stylesheet info pict header footer headerl headerr headerf footerl footerr footerf listtable listoverridetable ' +
  'rsidtbl generator xmlnstbl themedata colorschememapping latentstyles datastore fldinst object shppict nonshppict filetbl revtbl footnote annotation ' +
  'bkmkstart bkmkend').split(' '));

export function rtf_to_html(rtf) {
  const out = []; let para = '', st = { b: 0, i: 0, u: 0, skip: 0 }, uc = 1, skip_n = 0, in_tbl = false, cells = [], rows = [];
  const stack = [];
  const emit = s => { if (st.skip || !s) return; let h = esc_html(s); if (st.u) h = `<u>${h}</u>`; if (st.i) h = `<i>${h}</i>`; if (st.b) h = `<b>${h}</b>`; para += h; };
  const flush_table = () => {
    if (!rows.length) return;
    out.push(`<table class="doc_table"><tbody>${rows.map(r => `<tr>${r.map(c => `<td><p>${c || '<br>'}</p></td>`).join('')}</tr>`).join('')}</tbody></table>`); rows = [];
  };
  const end_para = () => { if (in_tbl) { para += '<br>'; return; } flush_table(); out.push(`<p>${para || '<br>'}</p>`); para = ''; };
  let i = 0; const L = rtf.length;
  while (i < L) {
    const ch = rtf[i];
    if (ch === '{') { stack.push({ ...st }); i++; continue; }
    if (ch === '}') { st = stack.pop() || st; i++; continue; }
    if (ch === '\\') {
      const nx = rtf[i + 1];
      if (nx === '\\' || nx === '{' || nx === '}') { if (skip_n > 0) skip_n--; else emit(nx); i += 2; continue; }
      if (nx === "'") { const code = parseInt(rtf.substr(i + 2, 2), 16); i += 4; if (skip_n > 0) { skip_n--; continue; } if (!isNaN(code)) emit(cp(code)); continue; }
      if (nx === '*') { st.skip = 1; i += 2; continue; }
      if (nx === '~') { emit('\u00a0'); i += 2; continue; }
