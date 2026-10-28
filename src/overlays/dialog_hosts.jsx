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
    <footer className="flex flex-wrap justify-end gap-2 px-6 pb-5"><button type="button" className="btn btn_ghost" data-act="confirm_keep">Keep editing</button><button type="button" className="btn btn_danger" data-act="confirm_discard">Discard</button></footer>
  </>
);
const portal = (id, child) => { const at = document.getElementById(id); return at && child ? createPortal(child, at) : null; };

export function Dialog_hosts() {
  useSyncExternalStore(subscribe_dialogs, get_dialog_version);
  const { modal: m, confirm: c, drawer: dr, viewer: v } = DIALOGS;
  return (
    <>
      {portal('modal', m && <Modal_form key={m.key} m={m} />)}
      {portal('confirm', c && <Fragment key={c.key}>{confirm_view()}</Fragment>)}
      {portal('drawer', dr && <Fragment key={dr.key}>{run_view(dr.render)}</Fragment>)}
      {portal('viewer', v && <Fragment key={v.key}>{run_view(v.render)}</Fragment>)}
    </>
  );
}
