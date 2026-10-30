/* qr/qr_parts.jsx: Qr-scan's pieces: the top bar (its name, Install, light / dark, back to the site), what a scan found (a
   secure link, opened in a new tab; an http link, which does not open from here; any other text, to copy) and the recent
   scans. */
import { useState } from 'react';
import { ic } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { secure } from './qr_engine.js';
import { can_install, install, apple, standalone } from './qr_install.js';

function Copy({ text, label = 'Copy', cls = 'btn btn_outline' }) {
  const [ok, set] = useState(false);
  const copy = () => navigator.clipboard?.writeText(text).then(() => { set(true); setTimeout(() => set(false), 1500); }, () => {});
  return <button type="button" className={cls} onClick={copy} aria-label={label || 'Copy'} title={label ? undefined : 'Copy'}>
    {ic(ok ? 'check' : 'copy', 'h-4 w-4')}{label ? ok ? 'Copied' : label : null}</button>;
}
const theme = () => { const html = document.documentElement, dark = !html.classList.contains('dark'); html.classList.toggle('dark', dark);
  try { localStorage.setItem('loremds:v1:theme', JSON.stringify(dark ? 'dark' : 'light')); } catch { /* kept for this visit only */ } };

export const top_bar = () => <header className="qr_top">
