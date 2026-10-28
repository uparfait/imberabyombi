/* kit/kit_icons.jsx: the "3D icons" specimen: every icon of the path dictionary as a clay tile, the tones taking turns. */
import { PATHS, i3 } from '../icons/index.js';

const TONES5 = ['brand', 'ink', 'ok', 'info', 'warn'];

export const kit_icons = () => (
  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">{Object.keys(PATHS).map((n, i) => (
    <div key={n} className="group grid justify-items-center gap-2 rounded-2xl p-3 text-center text-xs text-muted hover:bg-fg/5">{i3(n, 'h-12 w-12', TONES5[i % 5])}{n}</div>
  ))}</div>
);
