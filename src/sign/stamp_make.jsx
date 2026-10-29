/* sign/stamp_make.jsx: <Stamp_make name/>, making a stamp: organisation (your name to start with), centre text, ink and
   shape, with a live preview; today's date is written on it. Its mark is the stamp, cut to its edges. */
import { useEffect, useRef, useState } from 'react';
import { PAD, trim } from './pad_state.js';
import { draw_stamp, INKS } from './stamp_draw.js';

const SHAPES = [['round', 'Round'], ['square', 'Square']];
