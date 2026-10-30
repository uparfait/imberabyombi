/* overlays/modal_form.jsx: <Modal_form/>, the form modal() shows in #modal (drawn by <Dialog_hosts/>): header (title,
   help tip, x), body (message slot + grid) or, for a dialog without content, the help as its text in a compact layout
   without dividers, and the footer (Cancel + submit, or custom actions). */
import { useLayoutEffect, useRef } from 'react';
import { ic } from '../icons/index.js';
import { help_tip } from '../ui/index.js';
import { form_obj, fill_rows } from '../fields/index.js';
import { validate, request } from '../feedback/index.js';
import { run_view } from './dialog_store.js';
import { close_dialog, snap } from './dialogs.js';

const blank = v => v == null || v === false || v === '' || (Array.isArray(v) && !v.length);

/* m: modal()'s options. A new modal() call is a new key, so a new form (its fields start from their defaults) */
export function Modal_form({ m }) {
  const ref = useRef(null);
  useLayoutEffect(() => {   /* the dirty check starts from the values the form opens with; the first field gets focus (not a
    date row's block: it would show its typing text instead of its value in words) */
    const f = ref.current; f._init = snap(f);
    setTimeout(() => [...f.querySelectorAll('input:not([type=hidden]),select,textarea')].find(i => !i.closest('.when_row'))?.focus(), 50);
  }, []);
  useLayoutEffect(() => ref.current.querySelectorAll('[data-fill-rows]').forEach(fill_rows));   /* a field alone on its row fills it */
  const body = run_view(m.body), actions = run_view(m.actions), plain = blank(body), { title, help, submit, danger } = m;
  const on_submit = async e => {
    e.preventDefault(); const f = e.currentTarget; if (!m.on_submit) return; if (!validate(f)) return;   /* a view (no submit) never closes on Enter */
    const ok = await request(() => m.on_submit?.(form_obj(f), f), { btn: f.querySelector('footer button:not([type=button])') });
    if (ok !== false) close_dialog(document.getElementById('modal'));
  };
  return (
    <form ref={ref} className="flex flex-col" noValidate onSubmit={on_submit}>
      <header className={`flex items-center justify-between gap-4 ${plain ? '' : 'border-b border-line'} px-5 py-4 sm:px-6`}>
        <div className="flex min-w-0 items-center gap-1"><h2 id="modal_title" className="min-w-0 text-xl [overflow-wrap:anywhere]">{title}</h2>{help && !plain ? help_tip(help, 'this') : null}</div>
        <button type="button" className="icon_btn" data-act="close_modal" aria-label="Close">{ic('x')}</button>
      </header>
      {plain
        ? <div className="grid gap-3 px-5 sm:px-6"><div data-msg-slot="" className="empty:hidden"></div>{help ? <p className="text-muted">{help}</p> : null}</div>
        : <div className="grid min-h-0 flex-1 content-start gap-5 overflow-y-auto p-5 sm:grid-cols-2 sm:p-6" data-fill-rows=""><div data-msg-slot="" className="empty:hidden sm:col-span-2"></div>{body}</div>}
      {submit || !blank(actions)
        ? <footer className={`flex flex-wrap justify-end gap-2 ${plain ? '' : 'border-t border-line'} px-5 py-4 sm:px-6`}>
            {submit ? <button type="button" className="btn btn_ghost" data-act="close_modal">{m.dismiss || 'Cancel'}</button> : null}
            {actions}
            {submit ? <button className={`btn ${danger ? 'btn_danger' : 'btn_primary'}`}>{submit}</button> : null}
          </footer>
        : null}
    </form>
  );
}
