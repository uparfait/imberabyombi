/* feedback/top_layer.js: the top layer. An open dialog covers everything else, so #toasts and #loader are manual
   popovers (also in the top layer). A dialog opened later lands above them, so every dialog opens through
   show_dialog(), which lifts them back on top (toasts already on screen keep their place and their timer bar). */
import { qsa } from '../lib/index.js';
