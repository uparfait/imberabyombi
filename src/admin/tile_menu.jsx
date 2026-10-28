/* tile_menu.jsx: "Your modules" style menu: a button that drops a grid of 3D-icon tiles (nested navigation, email designs).
   o = { id, title, icon, label, set, tiles: [{ icon, label, on, href } or { icon, label, on, attrs: { 'data-act': …, … } }] } */
import { ic, i3 } from '../icons/index.js';
import { closed_pop } from './live_slot.jsx';

/* a tile's attributes: a props object; a reference-style string ('data-act="mail" data-k="x"') is read into one */
const attrs_of = a => typeof a === 'string' ? Object.fromEntries([...a.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]])) : a || {};
