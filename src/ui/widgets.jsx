/* ui/widgets.jsx: Generic pieces: the tab bar (bound to ui.tab[key]), a row of metric tiles, the empty state,
   the two-tone logo and the light/dark switch button. */
import { ic, i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { to } from '../router/index.js';
import { help_tip } from './search.jsx';

/* Generic pieces */
export const tabs = (key, items, cur) => (
  <div className="mb-5 flex gap-1 overflow-x-auto border-b border-line" role="tablist">
