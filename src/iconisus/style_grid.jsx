/* iconisus/style_grid.jsx: the six styles, each previewed with the current icon and colours; the chosen one is outlined. */
import { render, STYLES } from '../icon3d/index.js';

const NAMES = { classic: 'Classic', balloon: 'Balloon', ribbon: 'Ribbon', glossy: 'Glossy', clay: 'Clay', glass: 'Glass' };

export const Styles = ({ st, put, input }) => <section aria-label="Style"><h3 className="ico_cap">Style</h3>
  <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Style">{STYLES.map(s =>
    <button key={s} type="button" role="radio" aria-checked={st.style === s} className={`ico_style ${st.style === s ? 'on' : ''}`} onClick={() => put({ style: s })}>
      <span className="ico_pv" dangerouslySetInnerHTML={{ __html: render(input, { style: s, colors: st.cols, size: 52 }) }} />{NAMES[s]}</button>)}</div>
</section>;
