/* editor/io_export/html_to_md.js: Markdown (.md): headings, bold / italic / strike marks, links, images, nested and
   check lists, pipe tables, rules, quotes, code blocks; a page break stays as an HTML page-break div. */
import { download, is_list, is_table, is_break } from '../core/index.js';

export function html_to_md(root) {
  const inline = n => {
    let s = '';
    n.childNodes.forEach(c => {
      if (c.nodeType === 3) { s += c.data.replace(/\u200b/g, '').replace(/([*_`\\[\]])/g, '\\$1'); return; }
      if (c.nodeType !== 1) return;
      const t = c.tagName, st = c.style;
      if (t === 'BR') { s += c.nextSibling ? '  \n' : ''; return; }
      if (t === 'IMG') { s += `![${c.getAttribute('alt') || ''}](${c.getAttribute('src')})`; return; }
      if (/^(UL|OL)$/.test(t)) return;
      let inner = inline(c);
