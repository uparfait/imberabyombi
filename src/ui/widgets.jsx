/* ui/widgets.jsx: Generic pieces: the tab bar (bound to ui.tab[key]), a row of metric tiles, the empty state,
   the two-tone logo and the light/dark switch button. */
import { ic, i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { to } from '../router/index.js';

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
export const empty = (title, text, act = null) => (
  <div className="grid justify-items-center gap-3 px-6 py-14 text-center">
    {i3('check', 'w-16 h-16 float', 'ok')}<h3 className="text-lg">{title}</h3>{text ? <p className="max-w-sm text-sm text-muted">{text}</p> : null}{act || null}
  </div>
);
export const logo = light => (
  <a href={to('/')} className="font-display text-xl font-extrabold tracking-wide sm:text-2xl" aria-label={`${cfg.name}, home`}>
    <span className="text-brand">{cfg.logo[0]}</span><span className={light ? 'text-white' : 'text-fg'}>{cfg.logo[1]}</span>
  </a>
);
export const theme_btn = (c = '') => (
  <button className={c ? `icon_btn ${c}` : 'icon_btn'} data-act="theme" aria-label="Switch light or dark mode">
    <span className="dark:hidden">{ic('moon')}</span><span className="hidden dark:inline">{ic('sun')}</span>
  </button>
);
