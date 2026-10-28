/* editor/io_import/text_md.js: plain text → paragraphs, and Markdown → HTML (headings, code blocks, rules, quotes,
   tables, bullet / numbered / task lists, paragraphs; inline code, images, links, bold, italic, strikethrough). */
import { esc_html } from '../core/index.js';

/* ================= import ================= */
export const text_to_html = t => t.replace(/\r\n?/g, '\n').split('\n').map(l => `<p>${l ? esc_html(l) : '<br>'}</p>`).join('');
export function md_inline(s) {
  s = esc_html(s);
  return s.replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/__([^_]+)__/g, '<b>$1</b>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<i>$2</i>').replace(/(^|\W)_([^_\s][^_]*)_/g, '$1<i>$2</i>')
    .replace(/~~([^~]+)~~/g, '<s>$1</s>');
}
const LIST_RE = /^\s*([-*+]|\d+[.)])\s+/, ROW_RE = /^\s*\|.*\|\s*$/;
/* a Markdown table: the first row is bold, the --- separator row is dropped */
function md_table(rows) {
  const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  const body = rows.filter(r => !/^\s*\|?\s*:?-{2,}/.test(r));
  const cell = (c, k) => k === 0 ? `<td style="font-weight:700">${md_inline(c)}</td>` : `<td>${md_inline(c)}</td>`;
  return `<table class="doc_table"><tbody>${body.map((r, k) => `<tr>${cells(r).map(c => cell(c, k)).join('')}</tr>`).join('')}</tbody></table>`;
}
export function md_to_html(md) {
