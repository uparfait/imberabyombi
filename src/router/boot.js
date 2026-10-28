/* router/boot.js: Boot. Saved design tokens, old saved tasks brought up to date, the top layer, the text-selection switch, the
   <ds-callout> web component, the delegated listeners, the per-draw cleanups, then the hash router draws the first page. */
import { qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { db, render, render_flags, before_render } from '../store/index.js';
import { request, staff_page, reduced, raise_top } from '../feedback/index.js';
import { apply_tokens } from '../actions/index.js';
