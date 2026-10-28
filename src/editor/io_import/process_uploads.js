/* editor/io_import/process_uploads.js: convert the chosen files one by one (progress message), then put the result
   at the cursor, in new tabs, or in place of the document; failures are listed in a dialog, notes shown as a message.
   And file attachments (File attachment…): pick_any + attach_files. install_import: this area's page listeners (none). */
import { state, new_tab, el, toast, hide_toast, hist_timer, commit, begin_op, end_op, restore_focus, body_index, last_range, set_last_range } from '../core/index.js';
import { sanitize_html, render_comments } from '../content/index.js';
import { can_edit } from '../format/index.js';
import { save_tab, render_tab, render_sidebar, render_all, confirm_dialog } from '../ui/index.js';
import { base_of } from './file_helpers.js';
import { attachment_html } from './json_attach.js';
import { file_to_html } from './file_to_html.js';
import { load_project, is_doc_empty, project_tabs } from './project.js';
import { show_failed } from './upload_body.jsx';

/* done: the converted files ({ html, inline?, project?, file }); a problem met while placing them is added to failed */
function place_uploads(done, mode, failed) {
  const projects = done.filter(r => r.project), content = done.filter(r => !r.project);
  if (mode === 'insert') {
    if (content.length) {
      const html = content.length === 1 && content[0].inline ? content[0].inline : content.map(r => r.html).join('');
      const host = restore_focus();
      if (host && host.classList.contains('pg_body')) { begin_op(); document.execCommand('insertHTML', false, sanitize_html(html)); end_op(body_index(host), true); }
      else failed.push('Click in the main text of the document first, then try again.');
    }
    if (projects.length) { save_tab(); projects.forEach(r => state.tabs.push(...project_tabs(r.project))); render_sidebar(); }
    return;
  }
  const tabs = [];
  done.forEach(r => { if (r.project) tabs.push(...project_tabs(r.project)); else tabs.push(new_tab(base_of(r.file.name), sanitize_html(r.html) || '<p><br></p>')); });
  if (mode === 'replace') {
    if (done.length === 1 && done[0].project) { try { load_project(done[0].project); } catch { failed.push(done[0].file.name + ': it isn’t a valid project file.'); } }
    else {
      const f = done[0]; state.title = f.project ? (f.project.title || base_of(f.file.name)) : base_of(f.file.name);
      state.comments = []; state.tabs = tabs; state.active = tabs[0].id; render_all();
    }
  } else { save_tab(); state.tabs.push(...tabs); state.active = tabs[0].id; render_tab(); render_sidebar(); render_comments(); }
}

/* mode: 'insert' (at the cursor), 'tab' (new tabs) or 'replace' (asks first unless the document is empty) */
export async function process_uploads(files, mode) {
  if (!can_edit()) return;
  if (mode === 'replace' && !is_doc_empty() && !(await confirm_dialog('Replace everything in this document with the uploaded files?', 'Replace'))) return;
  if (hist_timer) commit();
  const done = [], failed = [], notes = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    toast(`Converting ${f.name}${files.length > 1 ? ` (${i + 1} of ${files.length})` : ''}…`, 0);
