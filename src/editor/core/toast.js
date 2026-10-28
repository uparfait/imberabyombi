/* editor/core/toast.js: the editor's short messages. toast(msg, ms) keeps the source's name: on staff pages it shows
   the template's notification (notify(msg, 'info')); elsewhere a short status line at the bottom of the screen.
   ms = 0 is a progress message (kept open and updated in place until hide_toast()). While a live preview runs, messages
   are collected instead of shown (quiet), and shown if the preview is kept. */
import { notify, staff_page } from '../../feedback/index.js';
import { qs, el } from './utils.js';

let sink = null, prog = null, line = null, timer = null;

/* run fn with messages collected into the array `into` (live previews) */
export function quiet(fn, into) { const prev = sink; sink = into; try { return fn(); } finally { sink = prev; } }

const alive = () => !!(prog && prog.isConnected && !prog.classList.contains('out'));
const LINE_CSS = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:95;display:none;max-width:calc(100vw - 32px);'
  + 'padding:.55rem 1rem;border:1px solid rgb(var(--line));border-radius:var(--pill);background:rgb(var(--surface));color:rgb(var(--fg));'
  + 'font:500 .85rem/1.4 var(--font_sans)';
function status_line() {
  if (!line || !line.isConnected) {
    line = el('div', { class: 'ed_status no_print', role: 'status', 'aria-live': 'polite', style: LINE_CSS }); document.body.appendChild(line);
  }
  return line;
}

export function toast(msg, ms = 2800) {
  if (sink) { sink.push([msg, ms]); return; }
  if (!staff_page()) {
    const n = status_line(); n.textContent = msg; n.style.display = 'block';
    clearTimeout(timer); if (ms) timer = setTimeout(() => { n.style.display = 'none'; }, ms);
    return;
  }
  if (ms === 0 && alive()) { const m = prog.querySelector('[data-msg]'); if (m) m.textContent = msg; return; }
  if (alive()) hide_toast();
  notify(msg, 'info');
  if (ms === 0) {   // progress: keep it open (a paused notification) until hide_toast()
    prog = qs('#toasts')?.lastElementChild || null;
    prog?.dispatchEvent(new Event('mouseenter'));
  }
}
export function hide_toast() {
  if (alive()) prog.querySelector('[data-close]')?.click();
  prog = null;
  clearTimeout(timer); if (line) line.style.display = 'none';
}
/* editor_start's stop(): remove the status line */
export function toast_cleanup() { hide_toast(); if (line) line.remove(); line = null; }
