/* iconisus/source.jsx: what becomes the icon: Text (up to three characters), Library (an icon from one of twelve icon sets,
   loaded when picked: lib_grid.jsx) or SVG (paste any SVG; its colours are replaced). */
import { Lib_grid } from './lib_grid.jsx';

const MODES = [['text', 'Text'], ['lib', 'Library'], ['svg', 'SVG']];

export const Source = ({ st, put }) => <section className="grid gap-3" aria-label="Source">
  <h3 className="ico_cap">Source</h3>
