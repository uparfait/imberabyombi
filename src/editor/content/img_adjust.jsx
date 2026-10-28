/* editor/content/img_adjust.jsx: "Image adjustments" (adjust_dialog): brightness, contrast, saturation and transparency
   sliders with a live preview of the picture, Black and white, Reset sliders; Apply redraws the image (one undo step). */
import { useState } from 'react';
import { modal } from '../../overlays/index.js';
import { can_edit, previewing } from '../format/index.js';
import { bake_image } from './img_ops.js';
