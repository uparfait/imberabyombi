/* site/hero_about.jsx: Home sections (each doubles as the top block of its detail page when full=true):
   the hero (title, typed words, portrait in an arch) and About (three points, photos, a counter). */
import { ic, i3, hue_at } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { hero_shell, sec_head, more, spy_attrs } from './site_bits.jsx';
import { to } from '../router/index.js';

const GO_CLS = 'grid h-8 w-8 place-items-center rounded-full bg-white text-brand transition group-hover:translate-x-1';

export function hero_sec() {
  return (
    <section id="s_hero" className="wrap pt-3 sm:pt-6" aria-label="Introduction">{hero_shell(
      <div className="relative grid w-full items-end gap-10 px-6 pb-20 pt-14 sm:px-12 sm:pb-28 sm:pt-20 lg:grid-cols-[1.2fr_.8fr] xl:px-20">
        <div className="hero_in">
          <h1 className="hero_title">{lorem.t(1)}<br />{lorem.t(2)}</h1>
          <p className="mt-6 font-display text-2xl text-brand sm:text-3xl"><span>{lorem.t(1)} </span><span className="caret"
            data-type={JSON.stringify([lorem.w(2), lorem.w(1), lorem.w(2)])}></span></p>
          <p className="mt-5 max-w-lg text-fg/70">{lorem.p(2)}</p>
          <div className="mt-9 flex flex-wrap gap-3"><a href={to('/login')} className="btn btn_primary group py-2 pl-6 pr-2">Get started<span
            className={GO_CLS}>{ic('arrow_r', 'h-4 w-4')}</span></a><a href={to('/intro')} className="btn btn_glass">Read the overview</a></div>
        </div>
        <figure className="hero_in relative mx-auto w-full max-w-[19rem] lg:mr-6" style={{ '--d': '.2s' }}>
          <div className="arch"><img src={cfg.hero} alt="Illustrated portrait" width="408" height="438"
            className="h-full w-full bg-transparent object-cover object-bottom" fetchPriority="high" /></div>
        </figure>
      </div>, 'flex min-h-[calc(100svh-4.75rem)] items-center sm:min-h-[calc(100svh-6.5rem)]')}</section>
  );
}
export function about_sec(full) {
  return (
    <section {...spy_attrs('about', full)} className="wrap section grid items-center gap-14 lg:grid-cols-2">
      <div>{sec_head('About', lorem.t(4), lorem.p(2))}
        <ul className="mt-8 grid gap-5">{['users', 'target', 'sparkle'].map((x, i) => (
          <li key={x} className="flex gap-4" data-reveal="" style={{ '--d': `${i * .08}s` }}>{i3(x, 'h-12 w-12')}
            <div><h3 className="text-lg">{lorem.t(3)}</h3><p className="mt-1 text-sm text-muted">{lorem.s()}</p></div></li>
        ))}</ul>
        {full ? null : more('about')}</div>
      <div className="grid grid-cols-2 gap-4" data-reveal="" style={{ '--d': '.1s' }}>
        <figure className="row-span-2 m-0"><img src={cfg.img('about-a', 600, 820)} alt={lorem.t(4)} width="600" height="820" loading="lazy"
          className="h-full w-full rounded-3xl object-cover" /><figcaption>{lorem.t(3)}</figcaption></figure>
        <img src={cfg.img('about-b', 600, 600)} alt={lorem.t(3)} width="600" height="600" loading="lazy" className="aspect-square w-full rounded-3xl object-cover" />
        <div className="card grid place-content-center p-5 text-center"><data value="12" className="font-display text-5xl font-extrabold text-brand"
          data-count="12">0</data><p className="mt-1 text-sm text-muted">{lorem.t(3)}</p></div>
      </div></section>
  );
}
