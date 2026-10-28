/* editor/io_export/export_epub.js: EPUB e-book (.epub): each tab (or just the open one) is a chapter with the document's
   own styles; images become files in the book (others are dropped); a contents page lists the chapters. */
import { state, active_tab, el, qsa, uid, download, hist_timer, commit } from '../core/index.js';
