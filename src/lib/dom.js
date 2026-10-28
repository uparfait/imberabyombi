/* lib/dom.js: TINY UTILITIES for the page: query selectors, the root font size, design-token reads, hex/rgb colour
   conversions and a file download. */
import { pad } from './text.js';

export const qs = (s, r = document) => r.querySelector(s);
export const qsa = (s, r = document) => [...r.querySelectorAll(s)];
export const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
/* CSS variables are snake_case (--brand_2, --surface_2): a name written the old way (--brand-2) is translated */
const var_name = v => String(v).startsWith('--') ? '--' + String(v).slice(2).replace(/-/g, '_') : v;
export const css_var = v => getComputedStyle(document.documentElement).getPropertyValue(var_name(v)).trim();
