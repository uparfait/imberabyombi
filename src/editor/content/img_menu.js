/* editor/content/img_menu.js: the "All image options" menu (image_menu_items), shown by the quick bar's ⋮ button and
   the page's context menu. Items with no_preview: true change something outside the page (dialogs, clipboard, file
   picker, download) or load first: the menu's hover preview must skip them. */
import { qs, begin_op, end_op, body_index } from '../core/index.js';
import { palette_el, image_url_dialog } from '../ui/index.js';
import { previewing } from '../format/index.js';
import { img_op, set_img_width, rotate_image, flip_image, set_img_border, set_img_border_color, reset_image, cap } from './img_ops.js';
