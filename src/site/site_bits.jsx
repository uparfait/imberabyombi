/* site/site_bits.jsx: 9. PUBLIC WEBSITE. The public menu (PUB) and the small pieces every section shares:
   the brand hero shell with its wave, section headings, "Read more" links and the scroll-spy ids of home sections. */
import { ic } from '../icons/index.js';

export const PUB = [['about', 'About'], ['mission', 'Mission'], ['vision', 'Vision'], ['strategies', 'Strategies'], ['staff', 'Staff'],
  ['partners', 'Partners'], ['thanks', 'Thanks'], ['contact', 'Contact']];

/* Brand artwork shell: used by home hero, page heroes, login and admin greeting */
export const wave = () => (
