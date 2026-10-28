/* overlays/modal.jsx: modal(), the one dialog for every form, confirm and detail view, and ask(), a confirm whose
   question is the title. The form itself is <Modal_form/> (modal_form.jsx), drawn into #modal by <Dialog_hosts/>. */
import { Children, Fragment } from 'react';
import { qs } from '../lib/index.js';
import { show_dialog } from '../feedback/index.js';
import { set_dialog } from './dialog_store.js';
import { pick } from './pick.js';
import { tip } from './tip.js';

/* actions: extra footer buttons (e.g. Edit / Delete on the details view); wide: at least 70% of a large screen (the task view).
   Reuses the dialog if it is already open.
   title: text or JSX · help: text · body, actions: JSX or a function returning JSX (called on every draw, so rerender()
   refreshes an open view) · on_submit(values, form): values = form_obj(form); return false to keep the dialog open. */
export function modal({ title, help = '', body = '', submit, on_submit, danger, actions = '', wide = false }) {
  /* The description (help): a dialog with content shows it behind the help icon by the title; a dialog with nothing
     else to show (a confirm) shows it as its text, in a compact layout without dividers. */
  const d = qs('#modal'); pick.close(); tip.hide(); d.classList.toggle('modal_wide', wide);
  set_dialog('modal', { title, help, body, submit, on_submit, danger, actions });
  if (!d.open) show_dialog(d);
}

/* the text of a JSX message (the confirm's text is plain: the reference stripped its tags) */
