/* editor/core/reflow.js: pagination engine, part 3: reflow from a page (paged or pageless) and the work after a layout
   change. Absolute images (front / behind text) never move: a page removed by the reflow hands them to the previous page. */
import { el } from './utils.js';
import { state } from './state.js';
import { pages_el } from './refs.js';
