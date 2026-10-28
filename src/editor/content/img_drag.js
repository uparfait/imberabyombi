/* editor/content/img_drag.js: drag an image to MOVE it (pointer events: mouse, pen and touch; never a copy). Front /
   behind images follow the pointer (left / top, kept on their page; Shift keeps a straight line). In-flow images show a
   drop caret (.img_drop_caret) and on release the same node moves there. Esc cancels. One undo step per move. */
import { rem } from '../../lib/index.js';
