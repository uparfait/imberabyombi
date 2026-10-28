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
