/* ui/widgets.jsx: Generic pieces: the tab bar (bound to ui.tab[key]), a row of metric tiles, the empty state,
   the two-tone logo and the light/dark switch button. */
import { ic, i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { to } from '../router/index.js';
import { help_tip } from './search.jsx';

/* Generic pieces */
export const tabs = (key, items, cur) => (
  <div className="mb-5 flex gap-1 overflow-x-auto border-b border-line" role="tablist">
    {items.map(([v, l, n]) => (
      <button key={v} role="tab" aria-selected={v === cur} className={v === cur ? 'tab active' : 'tab'} data-act="tab" data-key={key} data-v={v}>
        {l}{n ? <>{' '}<span className="chip ml-1 bg-surface-2 text-muted">{n}</span></> : null}
      </button>
    ))}
  </div>
);
export const stat_row = items => (
  <div className={`mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 ${items.length > 4 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
    {items.map(([l, v, i, t], j) => (
