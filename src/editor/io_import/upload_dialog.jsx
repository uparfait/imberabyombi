/* editor/io_import/upload_dialog.jsx: "Upload files" (the template's modal): drop zone / browse, the chosen files,
   where the content goes (at the cursor, in new tabs, in place of the tab on screen). Add converts them once the dialog has
   closed, with the cursor put back where it was when the dialog opened. */
import { modal } from '../../overlays/index.js';
import { state, qs, toast, last_range, last_host, set_last } from '../core/index.js';
import { after_close } from '../format/index.js';
import { is_tab_empty } from './project.js';
import { process_uploads } from './process_uploads.js';
import { upload_store, Upload_body, Upload_actions } from './upload_body.jsx';

/* File menu: Open and replace document… ('open'), Import into new tab… ('tab'), Insert file at cursor… ('insert') */
export function pick_file(mode) { open_upload_dialog([], mode === 'open' ? 'replace' : mode); }

/* initial: files already chosen (dropped on the page); mode: the preselected place (default: replace an empty document,
   else at the cursor) */
export function open_upload_dialog(initial = [], mode) {
  if (state.mode !== 'edit') { toast('Switch to Editing mode to add files'); return; }
  const up = upload_store(Array.from(initial), mode || (is_doc_empty() ? 'replace' : 'insert'));
  const saved = last_range && last_range.cloneRange(), saved_host = last_host;
  modal({ title: 'Upload files', body: <Upload_body up={up} />, actions: <Upload_actions up={up} />, on_submit: () => {
    const { files, m } = up.get();
    if (!files.length) { toast('Choose at least one file'); return false; }
    const d = qs('#modal'); if (!d || !d.open || d.classList.contains('closing')) return;   /* closed meanwhile: same as Cancel */
    after_close(() => { set_last(saved, saved_host); process_uploads(files, m); });
  } });
}
