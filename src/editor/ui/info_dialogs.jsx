/* editor/ui/info_dialogs.jsx: Tools › Word count (document and selection) and Help › Keyboard shortcuts, as template
   modal views (closed by their x or Esc), plus doc_text(): the text of every page, blocks kept apart by a space. */
import { state, bodies, last_range, qsa } from '../core/index.js';
import { modal } from '../../overlays/index.js';

export function doc_text() {
  return bodies().map(b => { const c = b.cloneNode(true); qsa('p,h1,h2,h3,h4,h5,h6,li,td,th,br', c).forEach(x => x.after(' ')); return c.textContent; })
    .join(' ').replace(/​/g, '');
}
function count(t) {
  t = t.replace(/​/g, '');
  return { words: (t.match(/[\p{L}\p{N}][\p{L}\p{N}'’\-]*/gu) || []).length, chars: t.replace(/[\n\r]/g, '').length, no_space: t.replace(/\s/g, '').length };
}
const TD = 'border-b border-line px-2 py-1.5 text-sm', NUM = TD + ' text-right tabular-nums';

export function word_count_dialog() {
  const all = count(doc_text()), sel_t = last_range && !last_range.collapsed ? last_range.toString() : '', sel = sel_t ? count(sel_t) : null;
  const row = (l, a, b) => <tr key={l}><td className={TD}>{l}</td><td className={NUM}>{a}</td>{sel ? <td className={NUM}>{b}</td> : null}</tr>;
  const n = v => v.toLocaleString();
  modal({
