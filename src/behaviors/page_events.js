/* behaviors/page_events.js: the tab icon (brand colour in front, ink behind), form resets, Esc on dialogs, file dialogs closed
   without a choice, broken-image fallbacks and the system theme following the OS. */
import { qs, qsa, css_var, rgb2hex } from '../lib/index.js';
import { db } from '../store/index.js';
import { pick, ms_sync, request_close } from '../overlays/index.js';
import { file_tiles } from '../files/index.js';
import { set_theme } from '../actions/index.js';

/* Tab icon: brand colour while this tab is in front, black (brand ink) while the user is on another tab (a data: URL string) */
export const tab_icon = c => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${c}"/>`
  + '<path d="M32 10 54 32 32 54 10 32Z" fill="none" stroke="white" stroke-width="6"/><path d="M32 24 40 32 32 40 24 32Z" fill="white"/></svg>');
/* the file dialog took focus away while a file box was waiting */
export let file_blur = false;
const FALLBACK = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3">'
  + '<rect width="4" height="3" fill="#E0661B" opacity=".18"/>'
  + '<path d="M2 .9 2.6 1.5 2 2.1 1.4 1.5Z" fill="#E0661B"/></svg>');

/* Media that fails inside the file viewer shows the file's details instead: the viewer (React) does that with onError,
   so it is skipped here. Any other broken image gets the brand placeholder once. */
function on_error(e) {
  const t = e.target;
  if (t.matches?.('[data-view] :is(img, video, audio)')) return;
  if (t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = 1; t.src = FALLBACK; }
}

export function install_page() {
  document.addEventListener('visibilitychange', () => { const l = qs('link[rel=icon]'); if (l) l.href = tab_icon(rgb2hex(css_var(document.hidden ? '--ink' : '--brand'))); });
  document.addEventListener('reset', e => setTimeout(() => {
    qsa('input[type=file]', e.target).forEach(i => i.closest('.filebox') && file_tiles(i)); qsa('select[multiple]', e.target).forEach(ms_sync); }));
  /* Clicking outside an overlay never closes it; Esc acts like its Close button (with the unsaved-changes check) */
  ['modal', 'drawer', 'viewer', 'confirm'].forEach(id => { const d = document.getElementById(id);
    d?.addEventListener('cancel', e => { e.preventDefault(); if (!pick.esc) request_close(d); }); });
  /* File dialog closed without choosing: stop the waiting spinner (cancel event, plus a focus fallback for older browsers) */
  document.addEventListener('cancel', e => { if (e.target.type === 'file') e.target.closest('.filebox')?.classList.remove('picking'); }, true);
