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
  if (f.color) s += `\\cf${rtf_ci(rx, f.color)}`; else if (f.link) s += `\\cf${rtf_ci(rx, '1155CC')}`; if (f.hl) s += `\\highlight${rtf_ci(rx, f.hl)}`;
  return s;
};
const HEX = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
const rtf_pict = (rx, img) => {
  const mm = (img.getAttribute('src') || '').match(/^data:image\/(png|jpe?g);base64,(.*)$/i); if (!mm) return '';
  const b = b64bytes(mm[2]), parts = [];
  for (let i = 0; i < b.length; i += 64) { let line = ''; for (let k = i; k < Math.min(i + 64, b.length); k++) line += HEX[b[k]]; parts.push(line); }
  const nw = +img.dataset.nw || 300, nh = +img.dataset.nh || 200;
  const w = Math.min(parseFloat(img.style.width) || nw, rx.content_tw / 15), h = parseFloat(img.style.height) || w * nh / nw;
  return `{\\pict${/png/i.test(mm[1]) ? '\\pngblip' : '\\jpegblip'}\\picw${nw}\\pich${nh}\\picwgoal${Math.round(w * 15)}\\pichgoal${Math.round(h * 15)}`
    + `\n${parts.join('\n')}}`;
};
export function rtf_inline(rx, node, f) {
  let o = '';
  node.childNodes.forEach(n => {
    if (n.nodeType === 3) { const t = n.data.replace(/\u200b/g, ''); if (t) o += `{${rtf_codes(rx, f)} ${rtf_esc(t)}}`; return; }
    if (n.nodeType !== 1) return;
    const t = n.tagName;
    if (t === 'BR') { o += '\\line '; return; } if (t === 'IMG') { o += rtf_pict(rx, n); return; } if (is_list(n) || is_table(n)) return;
    const g = fmt_of(n, f), href = n.getAttribute('href');
    if (t === 'A' && href && !/^data:/i.test(href)) {
      o += `{\\field{\\*\\fldinst HYPERLINK "${href.replace(/["\\{}]/g, '')}"}{\\fldrslt ${rtf_inline(rx, n, Object.assign({}, g, { link: true }))}}}`; return;
    }
    o += rtf_inline(rx, n, g);
  });
  return o;
}
const HS = { H1: [20, ''], H2: [16, ''], H3: [14, '434343'], H4: [12, '666666'], H5: [11, '666666'], H6: [11, '666666'] };
export function rtf_para(rx, e) {
  const st = e.style || {}; let pre = RTF_P, f = {};
  if (HS[e.tagName]) { f = { size: HS[e.tagName][0], color: HS[e.tagName][1] || null }; pre += '\\sb240\\sa80\\keepn'; }
  else if (e.classList.contains('title')) { f = { size: 26 }; pre += '\\sa60'; }
  else if (e.classList.contains('subtitle')) { f = { size: 15, color: '666666' }; pre += '\\sa320'; }
  else if (e.tagName === 'PRE') f = { font: 'Courier New', size: 10 };
  const al = { center: '\\qc', right: '\\qr', end: '\\qr', justify: '\\qj' }[st.textAlign]; if (al) pre += al;
  const ml = parseFloat(st.marginLeft); if (ml) pre += `\\li${Math.round(ml * 15)}`; if (e.tagName === 'BLOCKQUOTE') pre += '\\li720';
