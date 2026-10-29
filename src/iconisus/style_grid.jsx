/* iconisus/style_grid.jsx: the six styles, each previewed with the current icon and colours; the chosen one is outlined. */
import { render, STYLES } from '../icon3d/index.js';

const NAMES = { classic: 'Classic', balloon: 'Balloon', ribbon: 'Ribbon', glossy: 'Glossy', clay: 'Clay', glass: 'Glass' };

export const Styles = ({ st, put, input }) => <section aria-label="Style"><h3 className="ico_cap">Style</h3>
