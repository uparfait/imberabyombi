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
    title: 'Word count',
    body: <table className="w-full sm:col-span-2"><tbody>
      <tr><td className={TD}></td><td className={NUM + ' text-muted'}>Document</td>{sel ? <td className={NUM + ' text-muted'}>Selection</td> : null}</tr>
      {row('Pages', state.setup.pageless ? '—' : bodies().length, '')}
      {row('Words', n(all.words), sel && n(sel.words))}
      {row('Characters', n(all.chars), sel && n(sel.chars))}
      {row('Characters excluding spaces', n(all.no_space), sel && n(sel.no_space))}
    </tbody></table>
  });
}

const KEYS = [['Bold / Italic / Underline', 'Ctrl+B / I / U'], ['Strikethrough', 'Ctrl+Shift+X'], ['Superscript / Subscript', 'Ctrl+. / Ctrl+,'],
  ['Font size bigger / smaller', 'Ctrl+Shift+. / ,'], ['Normal text', 'Ctrl+Alt+0'], ['Heading 1–4', 'Ctrl+Alt+1 … 4'],
  ['Numbered / bulleted list / checklist', 'Ctrl+Shift+7 / 8 / 9'], ['Align left / center / right / justify', 'Ctrl+Shift+L / E / R / J'],
