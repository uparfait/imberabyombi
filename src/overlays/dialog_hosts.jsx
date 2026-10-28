/* overlays/dialog_hosts.jsx: <Dialog_hosts/>, mounted once by app.jsx. It draws, through React portals, the content of
   the four shared dialogs of index.html: #modal (modal()), #confirm (confirm_discard()), #drawer and #viewer
   (show_in_dialog()). It redraws with the app (so rerender() refreshes an open view) and when a dialog's content changes. */
import { Fragment, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { DIALOGS, subscribe_dialogs, get_dialog_version, run_view } from './dialog_store.js';
import { Modal_form } from './modal_form.jsx';

/* "Discard changes?": the unsaved-changes check of request_close() */
const confirm_view = () => (
  <>
    <div className="p-6 pb-4"><h2 id="confirm_title" className="text-xl">Discard changes?</h2><p className="mt-2 text-muted">You changed this form. If you close it now, your changes are lost.</p></div>
