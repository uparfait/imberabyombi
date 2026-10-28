/* editor/core/pages.js: page boxes (source "pages"): build a page (header, body, footer, number), lay it out for the
   paper size / margins / zoom / pageless mode, make it editable or read-only, add / remove pages, number them. */
import { DPI } from './constants.js';
import { qs, qsa, el } from './utils.js';
import { state, dims } from './state.js';
import { bodies } from './dom.js';
