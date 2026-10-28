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
