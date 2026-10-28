/* actions/theme.js: light / dark switch, the design tokens a manager can change in Settings (brand colour, radius,
   spacing, font) and the filled part of range inputs. */
import { qs, qsa, css_var, hex2rgb, rgb2hex } from '../lib/index.js';
import { db } from '../store/index.js';
import { redraw_charts } from '../charts/index.js';

/* Theme switches are instant: no cross-fade and no colour transitions for that frame (easier on the eyes) */
