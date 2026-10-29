/* iconisus/color_chips.jsx: the three colours and the size. Primary: the body; secondary: gradient end, second band or tile
   shade; tertiary: glyph, middle colour or glow. A colour left empty is worked out from the primary (its chip is dashed);
   × clears one again. The size is the SVG's width and height when copied or downloaded. */
import { palette } from '../icon3d/index.js';

const NAMES = ['Primary', 'Secondary', 'Tertiary'];

export function Colors({ st, put }) {
  const P = palette(st.cols), auto = [P.p, P.s, P.t];
  const set_k = (k, v) => { const c = [...st.cols]; c[k] = v; put({ cols: c }); };
  return <section className="grid gap-3" aria-label="Colours and size"><h3 className="ico_cap">Colours and size</h3>
    <div className="flex items-center gap-4">
      <div className="flex gap-3">{NAMES.map((n, k) => { const v = st.cols[k] || auto[k];
        return <div key={n} className="relative">
          <label className={`ico_chip ${st.cols[k] ? '' : 'auto'}`} style={{ background: v }} title={st.cols[k] ? n : `${n} (worked out)`}>
            <input type="color" value={v} aria-label={`${n} colour`} onChange={e => set_k(k, e.target.value)} /></label>
          {k && st.cols[k] ? <button type="button" className="ico_clear" aria-label={`Reset the ${n.toLowerCase()} colour`} onClick={() => set_k(k, '')}>×</button> : null}
        </div>; })}</div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between text-xs text-muted"><label htmlFor="ico_size">Size</label><output htmlFor="ico_size">{st.size} px</output></div>
