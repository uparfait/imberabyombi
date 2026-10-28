/* editor/io_import/json_attach.js: JSON → a table (a list of records, a list of rows, or key / value pairs) or a code
   block; a project file is recognised and returned as { project }. And any file as a downloadable attachment chip. */
import { esc_html, read_as_data_url } from '../core/index.js';
import { PROJECT_APP } from '../io_export/index.js';
import { fmt_size } from './file_helpers.js';
import { rows_to_table, trim_rows, code_to_html } from './tables.js';

export function json_to_html(text, name) {
  let data; try { data = JSON.parse(text.replace(/^\ufeff/, '')); }
  catch { return { html: code_to_html(text, name), note: `${name} has JSON errors, so it was added as plain text.` }; }
  if (data && data.app === PROJECT_APP && Array.isArray(data.tabs)) return { project: data };
  const fv = v => v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
  const is_obj = x => x && typeof x === 'object' && !Array.isArray(x);
  let arr = Array.isArray(data) ? data : null;
