/* editor/content/img_size.jsx: "Image size" (image_size_dialog: width / height in px, Keep proportions) and "Alt text"
   (alt_text_dialog). Both save as one undo step. */
import { qs, clamp, toast } from '../core/index.js';
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
      <input type="number" id="sz_h" name="h" min="16" defaultValue={h0} placeholder=" " onInput={linked('#sz_h', '#sz_w', h => h * ratio)} /></div>
    <label className="flex items-center gap-2 sm:col-span-2"><input type="checkbox" id="sz_lock" name="lock" defaultChecked /> Keep proportions</label>
    <p className="text-xs text-muted sm:col-span-2">The widest this image can be here is {max}px. Original size: {img.naturalWidth} × {img.naturalHeight}px.</p>
  </>, on_submit: () => {
    const lock = qs('#sz_lock').checked, w = clamp(parseInt(qs('#sz_w').value) || w0, 16, max), h = Math.max(16, parseInt(qs('#sz_h').value) || h0);
    img_op(img, x => { x.style.width = w + 'px'; x.style.height = lock ? '' : h + 'px'; x.removeAttribute('width'); x.removeAttribute('height'); });
  } });
}

export function alt_text_dialog(img) {
  img = img_now(img); if (!img || previewing()) return;
  modal({ title: 'Alt text', submit: 'Save', body: (
    <div className="field sm:col-span-2"><label htmlFor="alt_t">Describe the image for people who can’t see it</label>
      <input type="text" id="alt_t" name="alt" defaultValue={img.getAttribute('alt') || ''} placeholder=" " /></div>
  ), on_submit: () => { const v = qs('#alt_t').value.trim(); img_op(img, x => x.setAttribute('alt', v)); } });
}
