/* site/footer.jsx: the public footer: logo, a line of text and social links, the Explore and Platform link lists,
   the newsletter form (data-form="news") and the copyright bar with "Back to top". */
import { ic } from '../icons/index.js';
import { logo } from '../ui/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { PUB } from './site_bits.jsx';

const SOCIAL_CLS = 'grid h-10 w-10 place-items-center rounded-full border border-line text-fg/80 transition hover:border-brand hover:bg-brand hover:text-white';

export function footer() {
  const y = new Date().getFullYear(), soc = [['mail', 'Email'], ['globe', 'Website'], ['send', 'Telegram'], ['link', 'LinkedIn']];
  const col = (t, items) => (
    <nav aria-label={t}><h2 className="text-sm font-semibold text-fg">{t}</h2><ul className="mt-4 grid gap-2.5 text-sm">{items.map(([h, l]) => (
