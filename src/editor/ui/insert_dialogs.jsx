/* editor/ui/insert_dialogs.jsx: Insert › Special characters (each click types the character at the caret while the dialog
   stays open) and Insert / Replace image by URL, in the template's modal. */
import { last_range, last_host, set_last, begin_op, end_op, body_index, editable_of, restore_focus, pages_el } from '../core/index.js';
import { can_edit } from '../format/index.js';
import { img_op, insert_image } from '../content/index.js';
import { modal } from '../../overlays/index.js';
import { show_err } from '../../feedback/index.js';
import { after_close } from './dialogs.jsx';

const CHARS = ('© ® ™ § ¶ † ‡ • · – — … ‰ ′ ″ « » ‹ › “ ” ‘ ’ € £ ¥ ¢ ₹ ₩ ₽ ° ± × ÷ ≈ ≠ ≤ ≥ ∞ √ ∑ ∏ ∫ ∂ ∆ π µ Ω α β γ δ ε θ λ σ φ ψ ω '
  + '← → ↑ ↓ ↔ ⇒ ⇔ ★ ☆ ✓ ✗ ☐ ☑ ♠ ♣ ♥ ♦ ½ ⅓ ¼ ¾ ¹ ² ³ ⁿ').split(' ');

/* the open modal makes the page inert (no focus there), so the character goes in through the DOM at the remembered caret */
function insert_char(c) {
  if (!can_edit()) return;
  const r = last_range, h = last_host;
  if (!r || !h || !h.isConnected || !r.startContainer.isConnected) return;
  begin_op();
  const at = r.cloneRange(); at.deleteContents(); const t = document.createTextNode(c); at.insertNode(t);
  end_op(Math.max(0, body_index(h)));
  if (t.isConnected) { const n = document.createRange(); n.setStartAfter(t); n.collapse(true); set_last(n, editable_of(t)); }
}

export function special_chars_dialog() {
  modal({
    title: 'Special characters',
    body: <div className="grid grid-cols-8 gap-1 sm:col-span-2 sm:grid-cols-10">{CHARS.map(c =>
      <button key={c} type="button" className="h-[2.125rem] rounded-lg border border-line text-lg hover:bg-fg/5"
        data-tip={'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}
        onMouseDown={e => e.preventDefault()} onClick={() => insert_char(c)}>{c}</button>)}</div>
  });
  after_close(() => { if (pages_el && pages_el.isConnected) restore_focus(); });
