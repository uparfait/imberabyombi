/* editor/core/state.js: the document state (source "state"): page setup, tabs (each with its own html and undo / redo
   stacks), view flags; the active tab, the file base name, page size in px, and tab helpers (move, duplicate). */
import { DPI, PAPER } from './constants.js';
import { uid } from './utils.js';
