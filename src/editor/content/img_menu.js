/* editor/content/img_menu.js: the "All image options" menu (image_menu_items), shown by the quick bar's ⋮ button and
   the page's context menu. Items with no_preview: true change something outside the page (dialogs, clipboard, file
   picker, download) or load first: the menu's hover preview must skip them. */
import { qs, begin_op, end_op, body_index } from '../core/index.js';
import { palette_el, image_url_dialog } from '../ui/index.js';
import { previewing } from '../format/index.js';
import { img_op, set_img_width, rotate_image, flip_image, set_img_border, set_img_border_color, reset_image, cap } from './img_ops.js';
import { IMG_POSITIONS, img_max, img_align_of, img_now, hide_img_sel, set_replace_target, pos_of } from './img_sel.js';
import { set_img_pos, set_img_align } from './img_pos.js';
import { crop_dialog } from './img_crop.jsx';
import { adjust_dialog } from './img_adjust.jsx';
import { image_size_dialog, alt_text_dialog } from './img_size.jsx';
import { copy_image, download_image } from './img_io.js';

const off = fn => () => { if (!previewing()) fn(); };
function delete_image(img) {
  img = img_now(img); if (!img?.isConnected) return;
  const b = img.closest('.pg_body'); hide_img_sel(); begin_op(); img.remove(); end_op(body_index(b));
}

export function image_menu_items(img) {
  const pos = pos_of(img), pct = p => () => set_img_width(img, x => img_max(x) * p);
  return [
    { label: 'Position', icon: 'picture_in_picture', sub: () => IMG_POSITIONS.map(([v, l, i]) => ({
      label: l, icon: i, checked: pos === v, action: () => set_img_pos(img, v) })) },
    { label: 'Align', icon: 'format_align_center', sub: () => ['left', 'center', 'right'].map(a => ({
      label: cap(a), icon: 'format_align_' + a, checked: img_align_of(img_now(img)) === a, action: () => set_img_align(img, a) })) },
    { label: 'Size', icon: 'photo_size_select_large', sub: () => [
      { label: 'Small (25% of the line)', action: pct(.25) }, { label: 'Medium (50%)', action: pct(.5) }, { label: 'Large (75%)', action: pct(.75) },
      { label: 'Full width', action: pct(1) }, { sep: true },
