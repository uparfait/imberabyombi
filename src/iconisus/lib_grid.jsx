/* iconisus/lib_grid.jsx: an icon set to pick from: the set, a search, and a grid that fills in batches as it is scrolled
   (thousands of icons stay quick). A click picks the icon; the set loads the first time it is chosen (lib_load.js). */
import { useEffect, useRef, useState } from 'react';
import { clean_svg } from '../icon3d/index.js';
import { spinner } from '../feedback/index.js';
import { LIBS, load_set, icon_of } from './lib_load.js';

const BATCH = 105;
const flat = i => `<svg viewBox="${i.left} ${i.top} ${i.width} ${i.height}" class="h-6 w-6" aria-hidden="true">${clean_svg(i.body)}</svg>`;

export function Lib_grid({ st, put }) {
  const [set, set_set] = useState(null), [err, set_err] = useState(false), [q, set_q] = useState(''), [shown, set_shown] = useState(BATCH);
  const end = useRef(null);
  useEffect(() => {
    let live = true; set_set(null); set_err(false);
    load_set(st.lib).then(s => live && set_set(s), () => live && set_err(true));
    return () => { live = false; };
  }, [st.lib]);
  useEffect(() => { set_shown(BATCH); }, [st.lib, q]);
  const names = set ? Object.keys(set.icons).filter(n => !set.icons[n].hidden && n.includes(q.trim().toLowerCase())) : [];
  useEffect(() => {
    const el = end.current; if (!el) return;
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) set_shown(n => n + BATCH); }, { root: el.parentElement });
    io.observe(el); return () => io.disconnect();
  }, [set, shown, q]);

  const note = t => <p className="col-span-full py-8 text-center text-sm text-muted">{t}</p>;
  return <div className="grid gap-2">
    <div className="flex gap-2">
      <div className="field min-w-0 flex-1"><label htmlFor="ico_lib">Icon set</label>
        <select id="ico_lib" value={st.lib} onChange={e => put({ lib: e.target.value, icon: null, icon_name: '' })}>{LIBS.map(([p, n]) => <option key={p} value={p}>{n}</option>)}</select></div>
      <div className="field w-32"><label htmlFor="ico_q">Search</label>
        <input id="ico_q" type="search" placeholder=" " autoComplete="off" value={q} onChange={e => set_q(e.target.value)} /></div></div>
    <p className="text-xs text-muted">{LIBS.find(l => l[0] === st.lib)[2]}{set ? ` · ${names.length} icons` : ''}</p>
    <div className="ico_grid" aria-label="Icons">
      {err ? note('This icon set could not be loaded. Check your connection and pick it again.')
        : !set ? <div className="col-span-full grid place-items-center py-8" role="status">{spinner()}<span className="sr-only">Loading icons</span></div>
          : !names.length ? note('No icons match.')
            : <>{names.slice(0, shown).map(n => <button key={n} type="button" title={n} aria-label={n} aria-pressed={st.icon_name === n}
                className={`ico_pick ${st.icon_name === n ? 'on' : ''}`} onClick={() => put({ icon: icon_of(set, n), icon_name: n })}
                dangerouslySetInnerHTML={{ __html: flat(icon_of(set, n)) }} />)}
