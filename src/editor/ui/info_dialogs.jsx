/* editor/ui/info_dialogs.jsx: Tools › Word count (document and selection) and Help › Keyboard shortcuts, as template
   modal views (closed by their x or Esc), plus doc_text(): the text of every page, blocks kept apart by a space. */
import { state, bodies, last_range, qsa } from '../core/index.js';
import { modal } from '../../overlays/index.js';

export function doc_text() {
  return bodies().map(b => { const c = b.cloneNode(true); qsa('p,h1,h2,h3,h4,h5,h6,li,td,th,br', c).forEach(x => x.after(' ')); return c.textContent; })
    .join(' ').replace(/​/g, '');
}
function count(t) {
