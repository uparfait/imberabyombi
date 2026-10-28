/* site/hero_about.jsx: Home sections (each doubles as the top block of its detail page when full=true):
   the hero (title, typed words, portrait in an arch) and About (three points, photos, a counter). */
import { ic, i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { hero_shell, sec_head, more, spy_attrs } from './site_bits.jsx';

const GO_CLS = 'grid h-8 w-8 place-items-center rounded-full bg-white text-brand transition group-hover:translate-x-1';

export function hero_sec() {
  return (
    <section id="s_hero" className="wrap pt-3 sm:pt-6" aria-label="Introduction">{hero_shell(
