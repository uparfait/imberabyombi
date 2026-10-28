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
