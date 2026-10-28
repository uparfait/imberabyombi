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
  const body = img.closest('.pg_body'), par = img.parentNode, { x, y } = is_abs(img) ? { x: img.offsetLeft, y: img.offsetTop } : offset_in(img, body);
  img.removeAttribute('data-align'); img.setAttribute('data-pos', pos);
  Object.assign(img.style, { position: 'absolute', left: Math.round(x) + 'px', top: Math.round(y) + 'px', zIndex: ABS_Z[pos] });
  if (par !== body) { body.appendChild(img); keep_line(par); }
  anchor_abs(img);
}
/* the text position under a screen point (the box and the image itself ignored), or null outside a page body */
export function drop_point(x, y, img) {
  const hide = [img_box, img].filter(Boolean), vis = hide.map(e => e.style.visibility);
  hide.forEach(e => { e.style.visibility = 'hidden'; });
  const p = caret_from_point(x, y);
  hide.forEach((e, i) => { e.style.visibility = vis[i]; });
  const host = p && editable_of(p.node);
  return host && host.classList.contains('pg_body') && !(img && img.contains(p.node)) ? p : null;
}
/* move the same image node to a text position (never a copy) */
export function place_at(img, p) {
  const par = img.parentNode, r = document.createRange(); r.setStart(p.node, p.off); r.collapse(true); r.insertNode(img); keep_line(par);
}
/* an absolute image back in the flow: to the text under its top-left corner, else in a paragraph of its own */
function from_abs(img) {
  const rc = img.getBoundingClientRect(), p = drop_point(rc.left + 2, rc.top + 2, img);
  clear_abs(img);
  if (p) place_at(img, p); else { const para = el('p'); img.replaceWith(para); para.appendChild(img); }
}
export function set_img_pos(img, pos) {
  img_op(img, x => {
    if (pos === 'front' || pos === 'behind') { to_abs(x, pos); return; }
    if (is_abs(x)) from_abs(x);
    if (pos === 'inline') { x.removeAttribute('data-pos'); x.removeAttribute('data-align'); }
    else { x.setAttribute('data-pos', pos); if (pos !== 'break') x.removeAttribute('data-align'); }
  });
}
export function set_img_align(img, a) {
  img_op(img, x => {
    const pos = pos_of(x);
