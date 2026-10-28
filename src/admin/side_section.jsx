/* side_section.jsx: collapsible sidebar section (mini calendar + nav groups): header button with a rotating chevron, body
   that eases its height open and closed. Open/closed state is remembered in this browser (key "sideClosed"). */
import { ic } from '../icons/index.js';
import { ui } from '../store/index.js';

/* ACT.group folds it in place (aria-expanded, data-closed, inert) and saves ui.closed, so later draws agree */
