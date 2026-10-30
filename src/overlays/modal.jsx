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
   refreshes an open view) · on_submit(values, form): values = form_obj(form); return false to keep the dialog open ·
   dismiss: the closing button's label when "Cancel" would be unclear (a "Cancel event" dialog: "Keep it"). */
  /* The description (help): a dialog with content shows it behind the help icon by the title; a dialog with nothing
     else to show (a confirm) shows it as its text, in a compact layout without dividers. */
  const d = qs('#modal'); pick.close(); tip.hide(); d.classList.toggle('modal_wide', wide);
  set_dialog('modal', { title, help, body, submit, on_submit, danger, actions });
  if (!d.open) show_dialog(d);
}

/* the text of a JSX message (the confirm's text is plain: tags are dropped, as for a string message) */
const text_of = n => n == null || typeof n === 'boolean' ? '' : Array.isArray(n) ? n.map(text_of).join('') : typeof n === 'object' ? text_of(n.props?.children) : String(n);
/* "Delete this record? You cannot undo this." → [the question, the rest as text]. A JSX message keeps its markup
   (<strong>…</strong>) in the question: <>Check out <strong>{plate}</strong> from slot {n}? {more}</> */
function split_q(msg, cta) {
  if (msg == null || typeof msg !== 'object') {
    const [, q, more] = String(msg).match(/^([^?]*\?)\s*([\s\S]*)$/) || [, `${cta}?`, String(msg)];
    return [q, more.replace(/<[^>]+>/g, '').trim()];
  }
  const kids = Children.toArray(Array.isArray(msg) ? msg : msg.type === Fragment ? msg.props.children : [msg]), q = [];
  for (const [i, k] of kids.entries()) {
    const at = typeof k === 'object' ? -1 : String(k).indexOf('?');
    if (at < 0) { q.push(k); continue; }
    q.push(String(k).slice(0, at + 1));
    return [q, (String(k).slice(at + 1) + text_of(kids.slice(i + 1))).trim()];
  }
  return [`${cta}?`, text_of(msg).trim()];
}
/* Confirm: the question is the title; anything after it ("You cannot undo this.") is the dialog's text */
export const ask = (msg, fn, cta = 'Delete', danger = cta === 'Delete') => { const [q, more] = split_q(msg, cta);
  modal({ title: q, help: more, submit: cta, danger, on_submit: fn }); };
