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
  try { const b = await image_blob(img); await navigator.clipboard.write([new ClipboardItem({ 'image/png': b })]); toast('Image copied'); }
  catch (e) { toast('Your browser blocked copying this image. Use Download image instead.'); }
}
export async function download_image(img) {
  img = img_now(img); if (!img || previewing()) return;
  try {
    const src = img.getAttribute('src'), m = src.match(/^data:image\/([a-z+]+)[;,]/i);
    const blob = m ? data_ur_lto_blob(src) : await image_blob(img), ext = m ? m[1].toLowerCase().replace('jpeg', 'jpg').replace('svg+xml', 'svg') : 'png';
    download(blob, ((img.getAttribute('alt') || 'image').replace(/[\\/:*?"<>|]+/g, '').slice(0, 60) || 'image') + '.' + ext);
  } catch (e) { toast(CROSS_MSG, 5500); }
}

export async function insert_image(src) {
  if (!can_edit()) return;
  const im = new Image(); im.src = src;
  try { await im.decode(); } catch (e) { toast('That image could not be loaded'); return; }
  const host = restore_focus(); if (!host || !host.classList.contains('pg_body')) { toast('Place the cursor in the document body first'); return; }
  let w = Math.min(im.naturalWidth, host.clientWidth);
  if (im.naturalHeight * w / im.naturalWidth > host.clientHeight * 0.9) w = Math.floor(host.clientHeight * 0.9 * im.naturalWidth / im.naturalHeight);
  begin_op();
  const img = el('img', { src, style: `width:${w}px`, alt: '', draggable: 'false' });
  const s = getSelection(), r = s.getRangeAt(0); r.deleteContents(); r.insertNode(img); r.setStartAfter(img); r.collapse(true); s.removeAllRanges(); s.addRange(r);
  end_op(body_index(host));
}
export async function insert_image_file(f) { if (!f.type.startsWith('image/')) return; insert_image(await read_as_data_url(f)); }

/* #image_replace (the hidden file input the chrome renders): the picked file replaces replace_target */
