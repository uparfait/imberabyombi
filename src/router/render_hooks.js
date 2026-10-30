/* router/render_hooks.js: the work around each draw of #app. before_page() runs before every draw (closes
   the picker and tooltips, forgets the charts, closes dialogs on a new page); run_after_render() runs once the page is on screen
   (scroll, page animation, queued AFTER work, enhancers, the message for the next page, the help icon's introduction, a
   flashed row, a pending form). */
import { qs, qsa } from '../lib/index.js';
import { ui, render_flags, AFTER } from '../store/index.js';
import { schemas } from '../schemas/index.js';
