/* editor/core/start.js: editor_start(root) (source "start"): fills refs, restores the saved document, installs every
   area's listeners, draws everything, then the source's start steps. Returns stop(): saves and removes every listener. */
import { state, active_tab } from './state.js';
import { fill_refs, clear_refs, pages_el } from './refs.js';
import { bodies, body_index, first_flow } from './dom.js';
import { reflow } from './reflow.js';
import { collect_html } from './collect.js';
import { caret_to_start } from './selection.js';
import { hist_timer, commit } from './history.js';
