/* overlays/copy.jsx: copy() puts text on the clipboard (with a fallback for older browsers) and says so;
   copy_box() is the copyable value (code, key, link, token) with its Copy button (data-act="copy"). */
import { ic } from '../icons/index.js';
import { notify } from '../feedback/index.js';

export async function copy(text, what = 'Link', quiet = false) {
  const done = () => quiet || notify('Paste it anywhere you need it.', 'ok', `${what} copied`);
  try { await navigator.clipboard.writeText(text); done(); }
  catch { const ta = document.createElement('textarea'); ta.value = text; document.body.append(ta); ta.select(); try { document.execCommand('copy'); done(); } catch { prompt(`Copy this ${what.toLowerCase()}:`, text); } ta.remove(); }
}
/* Copyable value (code, key, link, token): dashed brand box + Copy button. It pulses twice when it appears to draw the eye;
   big = one-time code (digits rise in one by one). */
export const copy_box = (value, what = 'Code', big = false) => (
  <div className={`copy_box ${big ? 'copy_big' : ''}`}><code className={big ? 'copy_val' : 'copy_val truncate'}>{big ? [...value].map((c, i) => <span key={i} style={{ '--i': i }}>{c}</span>) : value}</code>
    <button type="button" className="copy_btn" data-act="copy" data-text={value.replace(/\s/g, big ? '' : ' ')} data-what={what} aria-label={`Copy ${what.toLowerCase()}`}>{ic('copy', 'h-4 w-4')}<span>Copy</span></button></div>
);
