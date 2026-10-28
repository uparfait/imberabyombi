/* editor/content/img_size.jsx: "Image size" (image_size_dialog: width / height in px, Keep proportions) and "Alt text"
   (alt_text_dialog). Both save as one undo step. */
import { qs, clamp } from '../core/index.js';
import { modal } from '../../overlays/index.js';
import { previewing } from '../format/index.js';
import { img_op } from './img_ops.js';
import { img_max, img_now } from './img_sel.js';

export function image_size_dialog(img) {
  img = img_now(img); if (!img || previewing()) return;
