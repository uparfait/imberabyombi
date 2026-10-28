/* editor/ui/outline_rows.jsx: what an outline row does: click → go to the heading; chevron → fold / unfold; ⋮ (or
   Shift+F10) → the section menu (Move section up / down, Delete section); drag → move the whole section (drop line,
   auto-scroll, reflow, one undo step). Keys: ↑ ↓ Home End move between rows, → unfold / first sub-heading, ← fold /
   parent, Enter / Space go to the heading, Alt+Shift+↑ / ↓ move the section. */
import { refs, caret_to_start } from '../core/index.js';
import { toggle_menu, open_menu } from './menu_engine.js';
