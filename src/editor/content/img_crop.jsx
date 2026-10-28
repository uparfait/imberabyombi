/* editor/content/img_crop.jsx: "Crop image" (crop_dialog): drag across the picture to choose the part to keep (free or
   a fixed ratio: Square, 4:3, 16:9, 3:4); Crop redraws the image to that part (one undo step). */
import { useState, useRef } from 'react';
import { modal } from '../../overlays/index.js';
import { clamp, toast } from '../core/index.js';
import { can_edit, previewing } from '../format/index.js';
import { bake_image } from './img_ops.js';
import { img_now } from './img_sel.js';

const RATIOS = [['free', 'Free'], ['1', 'Square'], ['1.3333', '4:3'], ['1.7778', '16:9'], ['0.75', '3:4']];

/* st: what Crop reads ({ rect, pic }) */
function Crop_body({ src, st }) {
  const [rect, set_rect_s] = useState(null), [ratio, set_ratio] = useState(null), pic = useRef(null);
  const set_rect = r => { st.rect = r; set_rect_s(r); };
  const centered = r => {
    const W = pic.current.clientWidth, H = pic.current.clientHeight; let w = W, h = w / r;
    if (h > H) { h = H; w = h * r; } set_rect({ x: (W - w) / 2, y: (H - h) / 2, w, h });
  };
  const pick = v => { const r = v === 'free' ? null : +v; set_ratio(r); if (r) centered(r); else set_rect(null); };
  const down = e => {
    e.preventDefault(); const stage = e.currentTarget, p = pic.current; stage.setPointerCapture(e.pointerId);
    const r0 = stage.getBoundingClientRect(), sx = clamp(e.clientX - r0.left, 0, p.clientWidth), sy = clamp(e.clientY - r0.top, 0, p.clientHeight);
    const move = ev => {
      let x = clamp(ev.clientX - r0.left, 0, p.clientWidth), y = clamp(ev.clientY - r0.top, 0, p.clientHeight), w = Math.abs(x - sx), h = Math.abs(y - sy);
      if (ratio && w && h) { if (w / h > ratio) w = h * ratio; else h = w / ratio; x = x < sx ? sx - w : sx + w; y = y < sy ? sy - h : sy + h; }
      set_rect({ x: Math.min(sx, x), y: Math.min(sy, y), w, h });
    };
    const up = () => { stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerup', up); };
    stage.addEventListener('pointermove', move); stage.addEventListener('pointerup', up);
