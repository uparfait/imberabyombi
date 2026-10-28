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
