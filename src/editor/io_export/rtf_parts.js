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
