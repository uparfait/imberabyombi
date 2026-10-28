/* site/contact_sec.jsx: the contact form (data-form="contact": name, email, phone, topic, message, consent) and the
   Contact section (address lines, a map, the form). The section doubles as the top block of the Contact page. */
import { ic, i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { sec_head, spy_attrs } from './site_bits.jsx';

export function contact_form() {
  return (
    <form data-form="contact" className="card grid gap-5 p-6 sm:grid-cols-2 sm:p-8" data-reveal="" style={{ '--d': '.1s' }} noValidate>
      <div data-msg-slot="" className="empty:hidden sm:col-span-2"></div>
      <div className="field"><label htmlFor="contact_name">Full name</label>
        <input id="contact_name" name="name" autoComplete="name" required placeholder="Lorem Ipsum" /></div>
      <div className="field"><label htmlFor="contact_email">Email</label>
        <input id="contact_email" name="email" type="email" autoComplete="email" required placeholder="you@lorem.io" /></div>
      <div className="field"><label htmlFor="contact_phone">Phone</label>
        <input id="contact_phone" name="phone" type="tel" autoComplete="tel" placeholder="+250 7xx xxx xxx" /></div>
