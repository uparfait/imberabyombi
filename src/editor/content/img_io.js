/* editor/content/img_io.js: images in and out: insert at the caret (insert_image, insert_image_file), copy to the
   clipboard, download, and the "Replace image › Upload from computer" file input (#image_replace). */
import { el, toast, download, read_as_data_url, restore_focus, begin_op, end_op, body_index } from '../core/index.js';
import { can_edit, previewing } from '../format/index.js';
import { data_ur_lto_blob } from '../io_import/index.js';
import { load_img, img_op, CROSS_MSG } from './img_ops.js';
import { img_now, replace_target, set_replace_target } from './img_sel.js';

export async function image_blob(img) {
  const im = await load_img(img.getAttribute('src')); const c = document.createElement('canvas');
  c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext('2d').drawImage(im, 0, 0);
  return new Promise((res, rej) => { try { c.toBlob(b => b ? res(b) : rej(new Error('blob')), 'image/png'); } catch (e) { rej(e); } });
}
export async function copy_image(img) {
  img = img_now(img); if (!img || previewing()) return;
