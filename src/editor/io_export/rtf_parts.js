/* editor/io_export/rtf_parts.js: the Rich Text writer's pieces: colour and font tables, escaping, run codes, pictures,
   inline runs and paragraphs. rx = { colors, fonts, content_tw } holds one export's tables (see export_rtf.js). */
import { is_list, is_table } from '../core/index.js';
import { b64bytes } from '../io_import/index.js';
import { fmt_of } from './docx_runs.js';

export const RTF_P = '\\pard\\plain\\f0\\fs22';
export const rtf_ci = (rx, hex) => {
  hex = (hex || '000000').toUpperCase(); let i = rx.colors.indexOf(hex); if (i < 0) { rx.colors.push(hex); i = rx.colors.length - 1; } return i + 1;
};
const rtf_fi = (rx, f) => { let i = rx.fonts.indexOf(f); if (i < 0) { rx.fonts.push(f); i = rx.fonts.length - 1; } return i; };
export const rtf_esc = s => {
  let o = '';
  for (const ch of String(s).replace(/\u200b/g, '')) {
    const c = ch.codePointAt(0);
    if (ch === '\\' || ch === '{' || ch === '}') o += '\\' + ch; else if (ch === '\t') o += '\\tab '; else if (ch === '\n') o += '\\line ';
    else if (c < 128) o += ch; else if (c < 0x10000) o += `\\u${c > 32767 ? c - 65536 : c}?`;
    else { const hi = Math.floor((c - 0x10000) / 0x400) + 0xD800, lo = (c - 0x10000) % 0x400 + 0xDC00; o += `\\u${hi - 65536}?\\u${lo - 65536}?`; }
  }
  return o;
};
const rtf_codes = (rx, f) => {
  let s = `\\f${rtf_fi(rx, f.font || 'Arial')}\\fs${Math.round((f.size || 11) * 2)}`;
  if (f.b) s += '\\b'; if (f.i) s += '\\i'; if (f.u || f.link) s += '\\ul'; if (f.s) s += '\\strike'; if (f.sup) s += '\\super'; if (f.sub) s += '\\sub';
