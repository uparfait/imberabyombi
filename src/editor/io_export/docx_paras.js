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
