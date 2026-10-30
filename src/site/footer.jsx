/* site/footer.jsx: the public footer: logo, a line of text, social links, the Qr-scan app badge and the map below them, the Explore and Platform link lists,
   the newsletter form (data-form="news") and the copyright bar with "Back to top". */
import { ic } from '../icons/index.js';
import { logo } from '../ui/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { PUB } from './site_bits.jsx';
import { to } from '../router/index.js';

const SOCIAL_CLS = 'grid h-10 w-10 place-items-center rounded-full border border-line text-fg/80 transition hover:border-brand hover:bg-brand hover:text-white';

export function footer() {
  const y = new Date().getFullYear(), soc = [['mail', 'Email'], ['globe', 'Website'], ['send', 'Telegram'], ['link', 'LinkedIn']];
  const col = (t, items) => (
    <nav aria-label={t}><h2 className="text-sm font-semibold text-fg">{t}</h2><ul className="mt-4 grid gap-2.5 text-sm">{items.map(([h, l]) => (
      <li key={h}><a href={to(`/${h}`)} className="transition hover:text-accent">{l}</a></li>
    ))}</ul></nav>
  );
  return (
    <footer className="relative isolate mt-10 overflow-hidden border-t border-line bg-surface-2 text-muted">
      <div className="pattern_layer" style={{ '--pa': '.05' }} aria-hidden="true"></div>
      <div className="wrap grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.5fr]">
        <div>{logo()}<p className="mt-4 max-w-xs text-sm">{lorem.s()}</p><div className="mt-6 flex gap-2">{soc.map(([i, l]) => (
          <a key={i} href={to('/contact')} className={SOCIAL_CLS} aria-label={l}>{ic(i, 'h-4 w-4')}</a>
        ))}</div>
        <iframe className="map mt-6 aspect-[4/3] w-full max-w-xs" src={cfg.map} title="Map showing our location" loading="lazy" referrerPolicy="no-referrer"></iframe></div>
        {col('Explore', PUB.map(([k, l]) => [k, l]))}
        {col('Platform', [['login', 'Sign in'], ['admin', 'Dashboard'], ['intro', 'Overview'], ['ui', 'Design system'], ['sitemap', 'Site map']])}
        <div><h2 className="text-sm font-semibold text-fg">Newsletter</h2><p className="mt-4 text-sm">{lorem.s(8, 12)}</p>
          <form data-form="news" className="mt-4 flex items-start gap-2" noValidate><div className="field min-w-0 flex-1">
            <label className="sr-only" htmlFor="newsletter_email">Email address</label>
            <input id="newsletter_email" name="email" type="email" required autoComplete="email" placeholder="you@lorem.io" /></div>
            <button className="btn btn_primary">Subscribe</button></form><div data-msg-slot="" className="mt-3 empty:hidden"></div></div>
      </div>
      <div className="border-t border-line"><div className="wrap flex flex-wrap items-center justify-between gap-4 py-6 text-xs">
        <small className="text-muted">© <time dateTime={y}>{y}</time> {cfg.name}. {lorem.t(3)}.</small>
        <button className="btn btn_outline btn_sm" data-act="top">{ic('chev_u', 'h-4 w-4')}Back to top</button></div></div>
    </footer>
  );
}
