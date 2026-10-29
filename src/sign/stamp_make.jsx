/* sign/stamp_make.jsx: <Stamp_make name/>, making a stamp: organisation (your name to start with), centre text, ink and
   shape, with a live preview; today's date is written on it. Its mark is the stamp, cut to its edges. */
import { useEffect, useRef, useState } from 'react';
import { PAD, trim } from './pad_state.js';
import { draw_stamp, INKS } from './stamp_draw.js';

const SHAPES = [['round', 'Round'], ['square', 'Square']];

export function Stamp_make({ name }) {
  const cv = useRef(null), [st, set] = useState({ org: name || '', mid: 'Approved', color: INKS[0], shape: 'round' });
  const put = (k, v) => set(s => ({ ...s, [k]: v }));
  useEffect(() => { const c = cv.current; draw_stamp(c, st); document.fonts?.ready.then(() => draw_stamp(c, st)); }, [st]);
  PAD.get = async () => st.org.trim() ? trim(cv.current, 6) : null;
  return <div className="grid items-start gap-5 sm:grid-cols-[11rem_minmax(0,1fr)]">
    <canvas ref={cv} width="400" height="400" className="sign_stamp_cv" aria-label="Stamp preview" />
    <div className="grid gap-3">
      <div className="field"><label htmlFor="st_org">Organisation</label>
        <input id="st_org" value={st.org} maxLength={34} placeholder=" " onChange={e => put('org', e.target.value)} /></div>
      <div className="field"><label htmlFor="st_mid">Centre text</label>
        <input id="st_mid" value={st.mid} maxLength={14} placeholder=" " onChange={e => put('mid', e.target.value)} /></div>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <div><p className="mb-1.5 text-sm font-medium">Ink</p><div className="flex gap-2">{INKS.map((c, i) =>
          <button key={c} type="button" className={`sign_ink ${st.color === c ? 'on' : ''}`} style={{ background: c }} aria-label={`Ink ${i + 1}`}
            aria-pressed={st.color === c} onClick={() => put('color', c)} />)}</div></div>
        <div><p className="mb-1.5 text-sm font-medium">Shape</p><div className="seg">{SHAPES.map(([k, l]) =>
