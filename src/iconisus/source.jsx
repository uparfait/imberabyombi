/* iconisus/source.jsx: what becomes the icon: Text (up to three characters), Library (an icon from one of twelve icon sets,
   loaded when picked: lib_grid.jsx) or SVG (paste any SVG; its colours are replaced). */
import { Lib_grid } from './lib_grid.jsx';

const MODES = [['text', 'Text'], ['lib', 'Library'], ['svg', 'SVG']];

export const Source = ({ st, put }) => <section className="grid gap-3" aria-label="Source">
  <h3 className="ico_cap">Source</h3>
  <div className="seg justify-self-start" role="radiogroup" aria-label="Source">{MODES.map(([k, l]) =>
    <label key={k}><input type="radio" className="sr-only" name="ico_mode" checked={st.mode === k} onChange={() => put({ mode: k })} /><span>{l}</span></label>)}</div>
  {st.mode === 'text'
    ? <div className="field"><label htmlFor="ico_text">Letter, number or symbol</label>
        <input id="ico_text" value={st.text} maxLength={3} placeholder=" " autoComplete="off" onChange={e => put({ text: e.target.value })} /></div>
    : st.mode === 'svg'
      ? <div className="field"><label htmlFor="ico_svg">SVG code</label>
          <textarea id="ico_svg" rows={5} placeholder=" " spellCheck={false} value={st.svg} onChange={e => put({ svg: e.target.value })} className="font-mono text-xs" /></div>
