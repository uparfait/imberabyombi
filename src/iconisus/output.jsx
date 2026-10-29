/* iconisus/output.jsx: the result at the chosen size: Copy SVG, Download (an .svg file) and the code itself on demand. */
import { useState } from 'react';
import { ic } from '../icons/index.js';
import { copy } from '../overlays/index.js';

function save(svg, name) {
