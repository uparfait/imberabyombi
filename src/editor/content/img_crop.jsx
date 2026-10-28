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
