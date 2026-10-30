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
      <div key={j} className="card flex items-center gap-3 p-4">
        {i3(i, 'w-11 h-11', t || 'brand')}
        <div className="min-w-0"><p className="truncate text-sm text-muted">{l}</p><p className="font-display text-2xl font-bold tabular-nums">{v}</p></div>
      </div>
    ))}
  </div>
);
/* act: JSX (a button or link) shown under the text */
/* Empty or error state: an icon, the title with a help icon (the explanation shows in its tooltip, never as a paragraph)
   and an action. icon / color: a check in green by default; an error passes 'alert', 'bad'. */
export const empty = (title, text, act = null, icon = 'check', color = 'ok') => (
  <div className="grid justify-items-center gap-3 px-6 py-14 text-center">
    {i3(icon, 'w-16 h-16 float', color)}<div className="flex items-center justify-center gap-1"><h3 className="text-lg">{title}</h3>{text ? help_tip(text, title) : null}</div>{act || null}
  </div>
);
export const logo = light => (
