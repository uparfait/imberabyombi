/* editor/io_export/html_to_md.js: Markdown (.md): headings, bold / italic / strike marks, links, images, nested and
   check lists, pipe tables, rules, quotes, code blocks; a page break stays as an HTML page-break div. */
import { download, is_list, is_table, is_break } from '../core/index.js';

export function html_to_md(root) {
  const inline = n => {
