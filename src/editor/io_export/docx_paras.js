/* editor/io_export/docx_paras.js: Word paragraphs: paragraph properties (style, spacing, indent, alignment), plain
   paragraphs, and lists (numbered and bulleted through numbering.xml, checklists as ☑ / ☐ marks). */
import { is_list } from '../core/index.js';
import { inline_xml, parse_pt } from './docx_runs.js';

export const JC = { left: 'left', start: 'left', center: 'center', right: 'right', end: 'right', justify: 'both' };
export function p_pr_xml(e, extra = '') {
  const st = e.style || {}; let style = '';
  if (/^H[1-6]$/.test(e.tagName)) style = 'Heading' + Math.min(+e.tagName[1], 4);
  else if (e.classList && e.classList.contains('title')) style = 'Title';
  else if (e.classList && e.classList.contains('subtitle')) style = 'Subtitle';
  let x = style ? `<w:pStyle w:val="${style}"/>` : '';
  x += extra;
  const lh = parseFloat(st.lineHeight), pt = parse_pt(st.paddingTop), pb = parse_pt(st.paddingBottom);
  if (lh || pt || pb) {
    x += `<w:spacing${pt ? ` w:before="${Math.round(pt * 20)}"` : ''}${pb ? ` w:after="${Math.round(pb * 20)}"` : ''}`
      + `${lh && !/px|pt/.test(st.lineHeight) ? ` w:line="${Math.round(lh * 240)}" w:lineRule="auto"` : ''}/>`;
  }
  const ml = parseFloat(st.marginLeft); if (ml && !extra.includes('numPr')) x += `<w:ind w:left="${Math.round(ml * 15)}"/>`;
  if (e.tagName === 'BLOCKQUOTE') x += '<w:ind w:left="720"/>';
  let alv = st.textAlign || (e.getAttribute && e.getAttribute('align'));
  if (!alv && e.querySelector) {
    const im = e.querySelector(':scope > img[data-pos="break"]'); if (im && !e.textContent.replace(/\u200b/g, '').trim()) alv = im.getAttribute('data-align') || '';
  }
  const al = JC[alv]; if (al) x += `<w:jc w:val="${al}"/>`;
  return x ? `<w:pPr>${x}</w:pPr>` : '';
