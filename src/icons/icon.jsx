/* icons/icon.jsx: flat line icons. ic(name, cls) draws one as JSX; ic_html(name, cls) gives the same markup as a string
   for the parts plain JS fills (picker, tooltips, toasts, quick menu). Unknown names fall back to the diamond. */
import { PATHS } from './paths.js';

/* names are snake_case PATHS keys ('chev_d'); a reference-style name ('chevD') still finds its icon */
export const icon_key = n => PATHS[n] ? n : String(n ?? '').replace(/[A-Z]/g, c => '_' + c.toLowerCase());
export const icon_path = n => PATHS[icon_key(n)] || PATHS.diamond;

export const ic = (n, c = 'w-5 h-5') => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={c} aria-hidden="true">
    <path d={icon_path(n)} />
  </svg>
);

export const ic_html = (n, c = 'w-5 h-5') =>
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ' +
