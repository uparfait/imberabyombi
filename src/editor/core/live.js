/* editor/core/live.js: live preview (owner's requirement). Hovering a formatting choice applies it at once; leaving
   restores the exact previous state; a click keeps it as ONE undo step. UI parts call, per choice:
     pointerenter → live.preview(fn[, restore])   pointerleave → live.cancel()   click → live.keep(fn)
   preview: the first call snapshots the active tab (page html, selection, selected image, scroll, setup, zoom, toolbar
   state); later calls restore that snapshot first. fn runs with history off and its toasts held back. `restore` (optional)
   undoes side effects outside the document (e.g. a remembered colour) on cancel. Previews never enter the undo stack. */
import { qsa } from './utils.js';
import { state } from './state.js';
