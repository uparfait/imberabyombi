/* editor/ui/context_menu.js: the right-click menu on the pages (source "context menu"): on a picture, every image option;
   in the text: cut / copy / paste, comment, link, insert table (and the table's own items inside a table), clear
   formatting. A right-click outside the selection first moves the caret to the clicked point. */
import { state, editable_of, caret_from_point, set_caret, set_last } from '../core/index.js';
