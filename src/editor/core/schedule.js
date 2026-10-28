/* editor/core/schedule.js: scheduled work (source "scheduled work"): one reflow per animation frame from the lowest
   page that changed, and the side panels (outline, pages, comment states, find highlights) refreshed after a pause. */
import { pages_el } from './refs.js';
import { reflow } from './reflow.js';
import { render_outline, render_pages_panel, find_state, run_find } from '../ui/index.js';
import { refresh_comment_states } from '../content/index.js';

export let reflow_raf = 0;
