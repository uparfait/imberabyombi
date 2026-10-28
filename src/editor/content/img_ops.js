/* editor/content/img_ops.js: image edits as one undo step (img_op): width, border, rotate / flip (bake_image redraws
   the picture on a canvas), reset. All run inside live.preview(fn) as well (core keeps previews out of the history and
   holds their toasts); an image that a preview restore replaced is found again (img_now). */
import { clamp, toast, begin_op, end_op, body_index } from '../core/index.js';
import { can_edit, previewing } from '../format/index.js';
import { img_max, select_image, img_now } from './img_sel.js';

/* fn(img) gets the image as it is in the document now */
export function img_op(img, fn) {
  img = img_now(img); if (!img || !can_edit() || !img.isConnected) return;
  const body = img.closest('.pg_body'); begin_op(); fn(img); end_op(body ? body_index(body) : 0);
  if (img.isConnected) select_image(img);
}
export function set_img_width(img, w) {
  img_op(img, x => {
    x.style.width = clamp(Math.round(typeof w === 'function' ? w(x) : w), 16, img_max(x)) + 'px'; x.style.height = ''; x.removeAttribute('width'); x.removeAttribute('height');
  });
}
export function load_img(src) {
  return new Promise((res, rej) => {
    const im = new Image(); if (!/^(data|blob):/i.test(src)) im.crossOrigin = 'anonymous';
    im.onload = () => res(im); im.onerror = () => rej(new Error('The image could not be loaded')); im.src = src;
  });
}
export const CROSS_MSG = 'This image comes from another website, so it can’t be edited here. Download it, then upload it instead.';

/* draw im with render(canvas, im) and read the result back ('alpha' from render keeps transparency: PNG) */
function draw(img, im, render) {
  const c = document.createElement('canvas'), alpha = render(c, im) === 'alpha', jpg = !alpha && /^data:image\/jpe?g/i.test(img.getAttribute('src'));
