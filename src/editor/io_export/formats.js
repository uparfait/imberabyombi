/* editor/io_export/formats.js: the download formats (badge colour, icon key for ic(), whether the format can hold one
   tab or all), the document's figures for the download summary, and do_export, which writes the chosen format. */
import { state, qsa, bodies, file_base, toast } from '../core/index.js';
import { save_project, export_root } from './project_file.js';
import { export_html, export_txt } from './export_text.js';
import { export_md } from './html_to_md.js';
import { export_pdf } from './export_pdf.js';
import { export_rtf } from './export_rtf.js';
import { export_epub } from './export_epub.js';
import { top_tables, export_csv } from './export_data.js';
import { export_xlsx } from './export_xlsx.js';
import { export_docx } from './export_docx.js';

export const FORMATS = [
  { key: 'docx', ext: 'docx', name: 'Word document', desc: 'Edit in Word, LibreOffice or any word processor', color: '#2b579a', icon: 'description', tabs: true },
  { key: 'pdf', ext: 'pdf', name: 'PDF', desc: 'Looks the same everywhere; best for sharing and printing', color: '#d93025', icon: 'picture_as_pdf', tabs: true },
  { key: 'html', ext: 'html', name: 'Web page', desc: 'One file that opens in any browser', color: '#e8710a', icon: 'html', tabs: true },
  { key: 'md', ext: 'md', name: 'Markdown', desc: 'Plain text with simple formatting marks', color: '#3c4043', icon: 'markdown', tabs: true },
  { key: 'txt', ext: 'txt', name: 'Plain text', desc: 'Just the words, no formatting', color: '#80868b', icon: 'text_snippet', tabs: true },
  { key: 'rtf', ext: 'rtf', name: 'Rich Text', desc: 'Basic formatting for WordPad and older editors', color: '#8430ce', icon: 'article', tabs: true },
  { key: 'epub', ext: 'epub', name: 'EPUB e-book', desc: 'For e-readers and book apps; each tab is a chapter', color: '#188038', icon: 'menu_book', tabs: true },
  { key: 'xlsx', ext: 'xlsx', name: 'Excel tables', desc: 'Each table becomes its own worksheet', color: '#107c41', icon: 'table_view', tabs: true },
  { key: 'csv', ext: 'csv', name: 'CSV', desc: 'Table data as comma-separated values', color: '#12a4af', icon: 'csv', tabs: true },
  { key: 'json', ext: 'json', name: 'Project file', desc: 'Reopen here later with every tab and comment', color: '#5f6368', icon: 'data_object', tabs: false }
];
/* { words, tables, images, pages } of what scope exports; pages is null for all tabs or a pageless document */
export function doc_stats(scope) {
  const root = export_root(scope), tables = top_tables(root).length, images = qsa('img', root).length;
  qsa('p,h1,h2,h3,h4,h5,h6,li,td,th,br', root).forEach(x => x.after(' '));
  const words = (root.textContent.replace(/\u200b/g, ' ').match(/[\p{L}\p{N}][\p{L}\p{N}'’\-]*/gu) || []).length;
  return { words, tables, images, pages: scope === 'all' && state.tabs.length > 1 || state.setup.pageless ? null : bodies().length };
}
export async function do_export(fmt, scope, name, quality) {
  state.last_format = fmt;
  name = (name || '').replace(/[\\/:*?"<>|]+/g, '').trim() || file_base();
