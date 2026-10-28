/* site/site_bits.jsx: 9. PUBLIC WEBSITE. The public menu (PUB) and the small pieces every section shares:
   the brand hero shell with its wave, section headings, "Read more" links and the scroll-spy ids of home sections. */
import { ic } from '../icons/index.js';

export const PUB = [['about', 'About'], ['mission', 'Mission'], ['vision', 'Vision'], ['strategies', 'Strategies'], ['staff', 'Staff'],
  ['partners', 'Partners'], ['thanks', 'Thanks'], ['contact', 'Contact']];

/* Brand artwork shell: used by home hero, page heroes, login and admin greeting */
export const wave = () => (
  <svg className="pointer-events-none absolute inset-x-0 -bottom-px h-10 w-full sm:h-16" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 72 C 380 128 840 36 1440 62 V120 H0Z" style={{ fill: 'rgb(var(--bg))' }} />
    <path d="M0 72 C 380 128 840 36 1440 62" fill="none" style={{ stroke: 'rgb(var(--brand))' }} strokeWidth="4" vectorEffect="non-scaling-stroke" />
  </svg>
);
/* inner: the JSX inside the shell; c: extra classes on the shell */
export const hero_shell = (inner, c = '') => (
  <div className={`hero relative isolate overflow-hidden rounded-4xl text-fg ${c}`}>
