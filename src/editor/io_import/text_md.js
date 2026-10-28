/* editor/io_import/text_md.js: plain text → paragraphs, and Markdown → HTML (headings, code blocks, rules, quotes,
   tables, bullet / numbered / task lists, paragraphs; inline code, images, links, bold, italic, strikethrough). */
import { esc_html } from '../core/index.js';

/* ================= import ================= */
export const text_to_html = t => t.replace(/\r\n?/g, '\n').split('\n').map(l => `<p>${l ? esc_html(l) : '<br>'}</p>`).join('');
export function md_inline(s) {
