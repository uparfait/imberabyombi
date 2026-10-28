/* editor/content/img_pos.js: image position and alignment. In line / wrap left / wrap right / break stay in the text
   flow; front / behind are absolute: a direct child of its .pg_body (core keeps it on its page and out of the flow),
   left / top in px inside the body, z-index above or below the text. Switching keeps the image where it is on screen
   when it can. The absolute image sits before the block at its top, so exports put it in line at that place. */
import { el, qsa, is_abs, flow_kids, offset_in, editable_of, caret_from_point } from '../core/index.js';
import { img_op } from './img_ops.js';
import { img_box, pos_of } from './img_sel.js';

export const ABS_Z = { front: '3', behind: '-1' };
const clear_abs = img => { ['position', 'left', 'top', 'zIndex'].forEach(p => { img.style[p] = ''; }); };
/* a block left empty by a moved image keeps a line */
const keep_line = par => { if (par && par.nodeType === 1 && !par.childNodes.length && !par.classList.contains('pg_body')) par.appendChild(document.createElement('br')); };

/* an absolute image goes before the first text block that reaches its top */
export function anchor_abs(img) {
  const body = img.closest('.pg_body'); if (!body || img.parentNode !== body) return;
  const top = img.offsetTop, blk = flow_kids(body).find(b => b.offsetTop + b.offsetHeight > top) || null;
  if (blk !== img.nextElementSibling) body.insertBefore(img, blk);
}
/* absolute images that came in nested (paste, drop) go to the top level of their page body, where core keeps them */
export function adopt_abs(host) {
  if (!host || !host.classList.contains('pg_body')) return;
  qsa('img[data-pos="front"],img[data-pos="behind"]', host).forEach(img => {
    if (img.parentNode === host) return; const par = img.parentNode; host.appendChild(img); keep_line(par); anchor_abs(img);
  });
}
function to_abs(img, pos) {
