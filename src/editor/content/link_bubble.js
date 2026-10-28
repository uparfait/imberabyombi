/* editor/content/link_bubble.js: the bubble under a link at the caret (#link_bubble, rendered by the chrome: the
   address #lb_url, Copy #lb_copy, Edit #lb_edit, Remove #lb_remove). The engine fills and places it. */
import { rem } from '../../lib/index.js';
import { qs, clamp, toast, last_range } from '../core/index.js';
import { link_at_caret, open_link_dialog, remove_link } from './links.jsx';

export let bubble_link = null;
export const link_bubble = () => qs('#link_bubble');

export function update_link_bubble() {
  const a = last_range && last_range.collapsed ? link_at_caret() : null, lb = link_bubble();
  if (!a || !lb) { hide_link_bubble(); return; }
  bubble_link = a; const r = a.getBoundingClientRect(), link = qs('#lb_url'); link.href = a.href; link.textContent = a.getAttribute('href');
  lb.style.display = 'flex';
  const u = rem();   /* gaps in rem: they scale with the interface */
  lb.style.left = clamp(r.left, u / 2, innerWidth - lb.offsetWidth - u / 2) + 'px';
  lb.style.top = Math.min(r.bottom + u * 0.375, innerHeight - u * 3.125) + 'px';
}
export function hide_link_bubble() { const lb = link_bubble(); if (lb) lb.style.display = 'none'; bubble_link = null; }
