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
