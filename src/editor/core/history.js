/* editor/core/history.js: undo / redo per tab (source "history (per tab)"). A snapshot is every page body's html plus
   the caret as a node path. Typing commits after a pause (commit_soon); operations wrap in begin_op / end_op.
   While a live preview runs (live.js) nothing is recorded; every real commit saves the document (debounced). */
import { state, active_tab } from './state.js';
import { pages_el } from './refs.js';
