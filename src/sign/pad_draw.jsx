/* sign/pad_draw.jsx: <Pad_draw/>, the drawing pad: smooth strokes that follow a finger, a pen or the mouse, sharp at the
   screen's pixel density, on white paper with a line to sign on. Clear starts again. Its mark is the drawn part, cut out. */
import { useEffect, useRef, useState } from 'react';
import { PAD, INK, trim } from './pad_state.js';

/* draws on canvas c; on_any(true / false) when it gets its first stroke or is cleared */
