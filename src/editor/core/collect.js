/* editor/core/collect.js: pagination engine, part 4: ordered-list numbering across pages, joining split parts, the
   whole tab's html (split parts re-joined), and absolute images (front / behind text) kept on their page: collect_html
   tags each with data-page="<page index>" and place_abs() puts it back on that page after a full reflow. */
import { qsa } from './utils.js';
import { bodies, is_abs, same_kind, first_flow, last_flow, prev_flow } from './dom.js';
import { merge_into } from './flow.js';

export function fix_list_starts() {
  const bs = bodies();
  for (let i = 1; i < bs.length; i++) {
    const f = first_flow(bs[i]);
    if (f && f.tagName === 'OL' && f.hasAttribute('data-cont')) {
      const p = last_flow(bs[i - 1]);
      if (p && p.tagName === 'OL') f.setAttribute('start', (parseInt(p.getAttribute('start')) || 1) + Array.from(p.children).filter(x => x.tagName === 'LI').length);
    }
  }
}
export function join_conts(root) {
  qsa(':scope > [data-cont]', root).forEach(e => { const p = prev_flow(e); if (p && same_kind(p, e)) merge_into(p, e); else e.removeAttribute('data-cont'); });
}
export function collect_html() {
  const c = document.createElement('div');
  bodies().forEach((b, i) => Array.from(b.childNodes).forEach(n => {
    const k = n.cloneNode(true); if (is_abs(k)) k.setAttribute('data-page', String(i)); c.appendChild(k);
  }));
  join_conts(c);
  qsa('[data-cont]', c).forEach(e => e.removeAttribute('data-cont'));
  qsa('ol[data-cont],ol', c).forEach(o => { if (o.getAttribute('start') === '1') o.removeAttribute('start'); });
  return c.innerHTML;
}
/* absolute images loaded from collected html go back to their page (or the last page); pageless: one page */
export function place_abs(pageless) {
  const bs = bodies();
  bs.forEach((b, i) => qsa(':scope > [data-page]', b).forEach(e => {
    if (!is_abs(e)) return;
    const k = pageless ? 0 : Math.max(0, Math.min(bs.length - 1, parseInt(e.getAttribute('data-page')) || 0));
