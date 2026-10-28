/* kit/kit_icons.jsx: the "3D icons" specimen: every icon of the path dictionary as a clay tile, the tones taking turns. */
import { PATHS, i3 } from '../icons/index.js';

const TONES5 = ['brand', 'ink', 'ok', 'info', 'warn'];

export const kit_icons = () => (
  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">{Object.keys(PATHS).map((n, i) => (
