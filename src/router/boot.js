/* router/boot.js: Boot. Saved design tokens, old saved tasks brought up to date, the top layer, the text-selection switch, the
   <ds-callout> web component, the delegated listeners, the per-draw cleanups, then the router draws the page of the address. */
import { db, before_render } from '../store/index.js';
import { raise_top } from '../feedback/index.js';
import { apply_tokens } from '../actions/index.js';
