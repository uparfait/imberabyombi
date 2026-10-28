/* site/strategies_staff.jsx: the Strategies section (six 3D-icon cards), the staff card (portrait, contact links on
   hover; data-team feeds the team filter of the Staff page) and the home Staff section (four cards). */
import { ic, i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { sec_head, more, spy_attrs } from './site_bits.jsx';

export function strategies_sec(full) {
  return (
    <section {...spy_attrs('strategies', full)} className="wrap section"><div className="flex flex-wrap items-end justify-between gap-6">
