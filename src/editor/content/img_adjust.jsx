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
