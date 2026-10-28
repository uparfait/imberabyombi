/* behaviors/input_events.js: the input listener (date masks, table column search, picker filtering, 6-box codes, password
   rules, range fills, live outputs, list filters, design tokens, calc forms, clearing fixed errors) and code pasting. */
import { qs, qsa } from '../lib/index.js';
import { ui } from '../store/index.js';
import { clear_err } from '../feedback/index.js';
import { DTF, masked, ghost } from '../fields/index.js';
import { pick } from '../overlays/index.js';
import { refresh } from '../table/index.js';
import { pw_check } from '../account/index.js';
import { fill_range, set_token } from '../actions/index.js';

function on_input(e) {
