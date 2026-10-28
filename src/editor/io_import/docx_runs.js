/* editor/io_import/docx_runs.js: the built-in Word reader, inline part: a run (bold, italic, underline, strike,
   super / subscript, colour, size, font, highlight; text, tabs, breaks, images) and a paragraph's runs (with links).
   cx = { z (the unzipped file), rels (document relationships), num_fmt (list formats by numId) }. A page break is \u0001. */
import { esc_html, clamp } from '../core/index.js';
import { by_tag, kids, resolve_path } from './xml_helpers.js';

export const docx_val = n => n ? n.getAttribute('w:val') : null;
const on = n => !!n && !/^(false|0|none)$/.test(docx_val(n) || '');
/* Word's highlight names (data) → colours */
const HL = { yellow: '#ffff00', green: '#00ff00', cyan: '#00ffff', magenta: '#ff00ff', blue: '#0000ff', red: '#ff0000', darkBlue: '#000080',
  darkCyan: '#008080', darkGreen: '#008000', darkMagenta: '#800080', darkRed: '#800000', darkYellow: '#808000', darkGray: '#808080', lightGray: '#c0c0c0' };
const val = docx_val, HEX6 = /^[0-9a-f]{6}$/i;

export async function docx_run(cx, r) {
  const pr = kids(r, 'rPr')[0], css = []; let open = '', close = '';
  const wrap = t => { open += `<${t}>`; close = `</${t}>` + close; };
  if (pr) {
    if (on(kids(pr, 'b')[0])) wrap('b'); if (on(kids(pr, 'i')[0])) wrap('i'); if (on(kids(pr, 'u')[0])) wrap('u');
    if (on(kids(pr, 'strike')[0]) || on(kids(pr, 'dstrike')[0])) wrap('s');
    const va = val(kids(pr, 'vertAlign')[0]); if (va === 'superscript') wrap('sup'); else if (va === 'subscript') wrap('sub');
    const col = val(kids(pr, 'color')[0]); if (col && HEX6.test(col) && col !== '000000') css.push('color:#' + col);
    const sz = val(kids(pr, 'sz')[0]); if (sz) css.push(`font-size:${+sz / 2}pt`);
    const fn = kids(pr, 'rFonts')[0], fa = fn && (fn.getAttribute('w:ascii') || fn.getAttribute('w:hAnsi')); if (fa) css.push(`font-family:'${fa.replace(/['"]/g, '')}'`);
    const hl = val(kids(pr, 'highlight')[0]), shd = kids(pr, 'shd')[0], fill = shd && shd.getAttribute('w:fill');
    if (hl && HL[hl]) css.push('background-color:' + HL[hl]); else if (fill && HEX6.test(fill) && fill.toUpperCase() !== 'FFFFFF') css.push('background-color:#' + fill);
  }
  let inner = '';
  for (const c of Array.from(r.children)) {
    const ln = c.localName;
