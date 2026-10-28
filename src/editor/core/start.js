/* editor/core/start.js: editor_start(root) (source "start"): fills refs, restores the saved document, installs every
   area's listeners, draws everything, then the source's start steps. Returns stop(): saves and removes every listener. */
import { state, active_tab } from './state.js';
import { fill_refs, clear_refs, pages_el } from './refs.js';
import { bodies, body_index, first_flow } from './dom.js';
import { reflow } from './reflow.js';
import { collect_html } from './collect.js';
import { caret_to_start } from './selection.js';
import { hist_timer, commit } from './history.js';
import { schedule_reflow, cancel_scheduled } from './schedule.js';
import { live } from './live.js';
import { restore_doc, reset_doc, save_doc, save_soon } from './persist.js';
import { toast_cleanup } from './toast.js';
import { install_content, img_sel, position_img_box } from '../content/index.js';
import { install_ui, render_all, update_rulers } from '../ui/index.js';
import * as format from '../format/index.js';
