/* editor/io_export/project_file.js: the project file (.json with every tab, the page setup and the comments) and the
   helpers every export shares: the export file name, the content without comment marks, and the root an export reads. */
import { state, active_tab, file_base, download, toast, el, qsa, collect_html, hist_timer, commit } from '../core/index.js';
import { save_tab } from '../ui/index.js';
import { PB } from '../io_import/index.js';
import { flatten_abs_images } from '../content/index.js';
import { PROJECT_APP } from './content_css.js';

/* ================= export ================= */
export function save_project(name = file_base()) {
  if (hist_timer) commit(); save_tab();
  const data = { app: PROJECT_APP, version: 1, title: state.title, setup: state.setup, active: state.active,
    tabs: state.tabs.map(t => ({ id: t.id, name: t.name, html: t.html })), comments: state.comments.filter(c => !c.draft) };
  download(new Blob([JSON.stringify(data)], { type: 'application/json' }), name + '.json'); toast('Project file saved with all tabs');
}
export function export_name() { return state.tabs.length > 1 ? `${file_base()} - ${active_tab().name}` : file_base(); }
export function clean_content() { const d = el('div'); d.innerHTML = collect_html(); qsa('.cmt', d).forEach(s => s.replaceWith(...s.childNodes)); return d; }
export function unwrap_comments(d) {
  qsa('.cmt', d).forEach(s => s.replaceWith(...s.childNodes)); qsa('img[data-orig]', d).forEach(i => i.removeAttribute('data-orig')); return d;
}
/* scope 'all' (several tabs): every tab, joined by page breaks; otherwise the open tab */
