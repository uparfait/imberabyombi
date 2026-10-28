/* overlays/dialogs.js: E. Closing the shared dialogs (animated), the unsaved-changes check (snap, request_close,
   confirm_discard) and show_in_dialog() for #drawer and #viewer. Opening is show_dialog() (feedback/top_layer.js). */
import { qs } from '../lib/index.js';
import { reduced, show_dialog } from '../feedback/index.js';
import { before_render } from '../store/index.js';
import { DIALOGS, set_dialog } from './dialog_store.js';
import { pick } from './pick.js';
import { tip } from './tip.js';

/* E. One dialog for every form, confirm and detail view (animated open + close).
      Closing lives in the header x. The footer only appears for actions: Cancel + submit on forms/confirms, or custom actions. */
export function close_dialog(d) {
  if (!d?.open || d.classList.contains('closing')) return;
  pick.close(); tip.hide();
  d.classList.add('closing'); setTimeout(() => { d.classList.remove('closing'); d.close(); drop(d); }, reduced() ? 0 : 200);
}
/* a closed dialog's content goes at once (the 'close' event in dialog_store.js covers closes that bypass close_dialog) */
const drop = d => { if (!d.open && DIALOGS[d.id]) set_dialog(d.id, null); };
/* Overlays close only from their own Close / x button (or Esc). A form with unsaved edits asks first. */
export const snap = f => JSON.stringify([...new FormData(f)].map(([k, v]) => [k, v instanceof File ? `${v.name}:${v.size}` : v]));
export function request_close(d) {
  const f = d?.id === 'modal' && d.querySelector('form');
  if (f && f._init != null && snap(f) !== f._init) return confirm_discard(() => close_dialog(d));
  close_dialog(d);
}
/* "Discard changes?" in #confirm (drawn by <Dialog_hosts/>). yes runs on Discard: ACT.confirm_discard reads #confirm._yes */
export function confirm_discard(yes) {
  const c = qs('#confirm'); pick.close(); tip.hide(); c._yes = yes;
  set_dialog('confirm', {});
  show_dialog(c); c.querySelector('[data-act=confirm_keep]')?.focus();
}
/* #drawer and #viewer: render() returns the dialog's JSX and is called on every draw (rerender() refreshes it).
   Each call is a fresh dialog content (like the reference's innerHTML); it opens the dialog if it is closed. */
export function show_in_dialog(id, render) {
