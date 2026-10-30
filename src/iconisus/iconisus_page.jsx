/* iconisus/iconisus_page.jsx: Iconisus (/admin/icons), the 3D icon maker. A letter, number or symbol, an icon from a
   library or a pasted SVG becomes a 3D icon in one of six styles (classic, balloon, ribbon, glossy, clay, glass), in up to
   three colours, at any size; copy or download the SVG. The template's own 3D icons come from this engine, glossy. */
import { useState } from 'react';
import './iconisus_styles.css';
import { render, iconify_svg } from '../icon3d/index.js';
import { Stage } from './stage.jsx';
import { Source } from './source.jsx';
import { Styles } from './style_grid.jsx';
import { Colors } from './color_chips.jsx';
import { Output } from './output.jsx';
import { page_title } from '../ui/index.js';

/* the state: the source (mode: text, lib or svg, and its value), the style, the colours ('' = worked out), the size */
const FIRST = { mode: 'text', text: '#', svg: '', icon: null, icon_name: '', lib: 'lucide', style: 'glossy', cols: ['#E0661B', '', ''], size: 128 };

export function Iconisus_page() {
  const [st, set] = useState(FIRST), put = o => set(s => ({ ...s, ...o }));
  const input = st.mode === 'svg' && st.svg.trim() ? st.svg : st.mode === 'lib' && st.icon ? iconify_svg(st.icon) : st.text;
