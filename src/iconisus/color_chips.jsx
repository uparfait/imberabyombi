/* iconisus/color_chips.jsx: the three colours and the size. Primary: the body; secondary: gradient end, second band or tile
   shade; tertiary: glyph, middle colour or glow. A colour left empty is worked out from the primary (its chip is dashed);
   × clears one again. The size is the SVG's width and height when copied or downloaded. */
import { palette } from '../icon3d/index.js';

const NAMES = ['Primary', 'Secondary', 'Tertiary'];

export function Colors({ st, put }) {
  const P = palette(st.cols), auto = [P.p, P.s, P.t];
