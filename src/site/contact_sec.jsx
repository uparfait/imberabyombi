/* site/contact_sec.jsx: the contact form (data-form="contact": name, email, phone, topic, message, consent) and the
   Contact section (address lines, a map, the form). The section doubles as the top block of the Contact page. */
import { ic, i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { sec_head, spy_attrs } from './site_bits.jsx';

export function contact_form() {
