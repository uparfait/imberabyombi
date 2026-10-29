/* sign/pad_draw.jsx: <Pad_draw/>, the drawing pad: smooth strokes that follow a finger, a pen or the mouse, sharp at the
   screen's pixel density, on white paper with a line to sign on. Clear starts again. Its mark is the drawn part, cut out. */
import { useEffect, useRef, useState } from 'react';
