/* iconisus/iconisus_page.jsx: Iconisus (/admin/icons), the 3D icon maker. A letter, number or symbol, an icon from a
   library or a pasted SVG becomes a 3D icon in one of six styles (classic, balloon, ribbon, glossy, clay, glass), in up to
   three colours, at any size; copy or download the SVG. The template's own 3D icons come from this engine, glossy. */
import { useState } from 'react';
import './iconisus_styles.css';
import { render, iconify_svg } from '../icon3d/index.js';
import { Stage } from './stage.jsx';
