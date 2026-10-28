/* editor/io_import/process_uploads.js: convert the chosen files one by one (progress message), then put the result
   at the cursor, in new tabs, or in place of the tab on screen (the other tabs are never touched); failures are listed in a dialog, notes shown as a message.
   And file attachments (File attachment…): pick_any + attach_files. install_import: this area's page listeners (none). */
import { state, new_tab, el, toast, hide_toast, hist_timer, commit, begin_op, end_op, restore_focus, body_index, last_range, set_last_range,
  active_tab } from '../core/index.js';
import { sanitize_html, render_comments } from '../content/index.js';
import { can_edit } from '../format/index.js';
import { save_tab, render_tab, render_sidebar, confirm_dialog } from '../ui/index.js';
import { base_of } from './file_helpers.js';
import { attachment_html } from './json_attach.js';
import { file_to_html } from './file_to_html.js';
import { load_project, is_doc_empty, is_tab_empty, project_tabs, replace_tab } from './project.js';
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
  if (mode === 'replace') {   /* a project file fills an empty document whole (its setup and comments too) */
    const f = done[0], title = f.project ? (f.project.title || base_of(f.file.name)) : base_of(f.file.name);
    if (done.length === 1 && f.project && is_doc_empty()) { try { load_project(f.project); } catch { failed.push(f.file.name + ': it isn’t a valid project file.'); } }
    else if (tabs.length) replace_tab(tabs, title);
  } else { save_tab(); state.tabs.push(...tabs); state.active = tabs[0].id; render_tab(); render_sidebar(); render_comments(); }
}

/* mode: 'insert' (at the cursor), 'tab' (new tabs) or 'replace' (the tab on screen; asks first unless it is empty) */
export async function process_uploads(files, mode) {
  if (!can_edit()) return;
  if (mode === 'replace' && !is_doc_empty() && !(await confirm_dialog('Replace everything in this document with the uploaded files?', 'Replace'))) return;
  if (hist_timer) commit();
  const done = [], failed = [], notes = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    toast(`Converting ${f.name}${files.length > 1 ? ` (${i + 1} of ${files.length})` : ''}…`, 0);
    try { const r = await file_to_html(f); r.file = f; if (r.note) notes.push(r.note); done.push(r); }
    catch (err) {
      console.error(err);
      const why = /load failed/.test(err.message || '') ? 'the converter couldn’t be downloaded. Check your internet connection.'
        : (err.message || 'it couldn’t be read') + '.';
      failed.push(`${f.name}: ${why}`);
    }
  }
  hide_toast();
  if (done.length) place_uploads(done, mode, failed);
  if (failed.length) show_failed(failed, done.length);
  else if (notes.length) toast(notes.join(' '), 7000);
  else if (done.length) toast(done.length === 1 ? `Added ${done[0].file.name}` : `Added ${done.length} files`);
}

/* the system file dialog (any file, several at once); cb gets the chosen files */
export function pick_any(cb) {
  const i = el('input', { type: 'file', multiple: '' }); i.style.display = 'none'; document.body.appendChild(i);
  i.addEventListener('change', () => { cb(Array.from(i.files)); i.remove(); }); i.click();
}
/* each file as a downloadable chip at the cursor (one undo step) */
export async function attach_files(files) {
  if (!files.length || !can_edit()) return;
  const saved = last_range; let html = '';
  for (const f of files) { try { html += await attachment_html(f) + ' '; } catch (e) { toast(`${f.name}: ${e.message}`, 5000); } }
  if (!html) return; set_last_range(saved);
  const host = restore_focus(); if (!host || !host.classList.contains('pg_body')) return;
  begin_op(); document.execCommand('insertHTML', false, sanitize_html(html)); end_op(body_index(host));
}

/* dropping files on the page is content's drop_handler (it opens the upload dialog): no listener of its own here */
export function install_import() { return () => {}; }
