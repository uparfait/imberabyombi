/* editor/content/img_crop.jsx: "Crop image" (crop_dialog): drag across the picture to choose the part to keep (free or
   a fixed ratio: Square, 4:3, 16:9, 3:4); Crop redraws the image to that part (one undo step). */
import { useState, useRef } from 'react';
import { modal } from '../../overlays/index.js';
