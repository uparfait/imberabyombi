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
    <div className="sun" aria-hidden="true"></div><div className="pattern_layer" aria-hidden="true"></div>{inner}{wave()}
  </div>
);
export const sec_head = (label, title, text, light) => (
  <header className="max-w-2xl" data-reveal="">
    <p className={`kicker ${light ? 'text-brand' : ''}`}>{ic('diamond', 'h-3.5 w-3.5')}{label}</p>
    <h2 className={`mt-3 text-3xl sm:text-5xl ${light ? 'text-white' : ''}`}>{title}</h2>
    {text ? <p className={`mt-4 text-lg ${light ? 'text-white/70' : 'text-muted'}`}>{text}</p> : null}
  </header>
);
export const more = (k, c = 'btn_primary') => (
