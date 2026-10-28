/* editor/content/img_adjust.jsx: "Image adjustments" (adjust_dialog): brightness, contrast, saturation and transparency
   sliders with a live preview of the picture, Black and white, Reset sliders; Apply redraws the image (one undo step). */
import { useState } from 'react';
import { modal } from '../../overlays/index.js';
import { can_edit, previewing } from '../format/index.js';
import { bake_image } from './img_ops.js';
import { img_now } from './img_sel.js';

const ROWS = [['brightness', 'Brightness', -100, 100], ['contrast', 'Contrast', -100, 100], ['saturation', 'Saturation', 0, 200], ['transparency', 'Transparency', 0, 100]];
const START = { brightness: 0, contrast: 0, saturation: 100, transparency: 0 };

/* v: the values Apply reads (kept in step with the sliders) */
function Adjust_body({ src, v }) {
  const [s, set_s] = useState({ ...v });
  const put = next => { Object.assign(v, next); set_s({ ...v }); };
  const filter = `brightness(${1 + s.brightness / 100}) contrast(${1 + s.contrast / 100}) saturate(${s.saturation / 100})`;
  return (
    <div className="grid gap-2 sm:col-span-2">
      <div className="img_preview"><img alt="" src={src} style={{ filter, opacity: 1 - s.transparency / 100 }} /></div>
      {ROWS.map(([k, l, a, b]) => (
        <div className="slider_row" key={k}>
          <label htmlFor={'adj_' + k}>{l}</label>
          <input type="range" id={'adj_' + k} name={k} min={a} max={b} value={s[k]} onChange={e => put({ [k]: +e.target.value })} />
          <span id={'adjv_' + k} className="text-right text-muted">{s[k] + (k === 'saturation' || k === 'transparency' ? '%' : '')}</span>
        </div>
      ))}
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" className="btn btn_outline btn_sm" id="adj_gray" onClick={() => put({ saturation: 0 })}>Black and white</button>
        <button type="button" className="btn btn_outline btn_sm" id="adj_reset" onClick={() => put(START)}>Reset sliders</button>
      </div>
    </div>
  );
}

export function adjust_dialog(img) {
  img = img_now(img); if (!img || previewing() || !can_edit()) return;
  const v = { ...START };
  modal({ title: 'Image adjustments', submit: 'Apply', body: <Adjust_body src={img.getAttribute('src')} v={v} />, on_submit: () => {
    if (!v.brightness && !v.contrast && v.saturation === 100 && !v.transparency) return;
    const B = 1 + v.brightness / 100, C = 1 + v.contrast / 100, S = v.saturation / 100, A = 1 - v.transparency / 100;
    return bake_image(img, (c, im) => {
      c.width = im.naturalWidth; c.height = im.naturalHeight; const x = c.getContext('2d'); x.drawImage(im, 0, 0);
