/* lib/dom.js: TINY UTILITIES for the page: query selectors, the root font size, design-token reads, hex/rgb colour
   conversions and a file download. */
import { pad } from './text.js';

export const qs = (s, r = document) => r.querySelector(s);
export const qsa = (s, r = document) => [...r.querySelectorAll(s)];
