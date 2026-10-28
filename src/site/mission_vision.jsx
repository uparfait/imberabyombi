/* site/mission_vision.jsx: the Mission section (3D flag, quote, three points) and the Vision section
   (a dark-themed band with a timeline of years). Both double as the top block of their detail page (full=true). */
import { ic, i3 } from '../icons/index.js';
import { lorem } from '../lib/index.js';
import { sec_head, more, spy_attrs } from './site_bits.jsx';

export function mission_sec(full) {
  return (
