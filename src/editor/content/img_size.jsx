/* editor/content/img_size.jsx: "Image size" (image_size_dialog: width / height in px, Keep proportions) and "Alt text"
   (alt_text_dialog). Both save as one undo step. */
import { qs, clamp } from '../core/index.js';
import { modal } from '../../overlays/index.js';
import { previewing } from '../format/index.js';
import { img_op } from './img_ops.js';
import { img_max, img_now } from './img_sel.js';

export function image_size_dialog(img) {
  img = img_now(img); if (!img || previewing()) return;
  const w0 = img.offsetWidth, h0 = img.offsetHeight, ratio = w0 / (h0 || 1), max = img_max(img);
  const linked = (from, to, f) => () => { if (qs('#sz_lock').checked) qs(to).value = Math.round(f(+qs(from).value)); };
  modal({ title: 'Image size', submit: 'Apply', body: <>
    <div className="field"><label htmlFor="sz_w">Width (px)</label>
      <input type="number" id="sz_w" name="w" min="16" max={max} defaultValue={w0} placeholder=" " onInput={linked('#sz_w', '#sz_h', w => w / ratio)} /></div>
    <div className="field"><label htmlFor="sz_h">Height (px)</label>
