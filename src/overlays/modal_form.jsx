/* overlays/modal_form.jsx: <Modal_form/>, the form modal() shows in #modal (drawn by <Dialog_hosts/>): header (title,
   help tip, x), body (message slot + grid) or, for a dialog without content, the help as its text in a compact layout
   without dividers, and the footer (Cancel + submit, or custom actions). */
import { useLayoutEffect, useRef } from 'react';
import { ic } from '../icons/index.js';
import { help_tip } from '../ui/index.js';
import { form_obj } from '../fields/index.js';
import { validate, request } from '../feedback/index.js';
import { run_view } from './dialog_store.js';
import { close_dialog, snap } from './dialogs.js';

const blank = v => v == null || v === false || v === '' || (Array.isArray(v) && !v.length);

/* m: modal()'s options. A new modal() call is a new key, so a new form (its fields start from their defaults) */
export function Modal_form({ m }) {
  const ref = useRef(null);
  useLayoutEffect(() => {   /* the dirty check starts from the values the form opens with; the first field gets focus */
    const f = ref.current; f._init = snap(f);
    setTimeout(() => f.querySelector('input:not([type=hidden]),select,textarea')?.focus(), 50);
  }, []);
  const body = run_view(m.body), actions = run_view(m.actions), plain = blank(body), { title, help, submit, danger } = m;
  const on_submit = async e => {
    e.preventDefault(); const f = e.currentTarget; if (!m.on_submit) return; if (!validate(f)) return;   /* a view (no submit) never closes on Enter */
    const ok = await request(() => m.on_submit?.(form_obj(f), f), { btn: f.querySelector('footer button:not([type=button])') });
    if (ok !== false) close_dialog(document.getElementById('modal'));
  };
  return (
