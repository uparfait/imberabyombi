/* site/longform.jsx: the long text under every detail page: four sections (headings, lists, figure, quote, terms)
   with an aside: "On this page" (data-act="scroll" to each section), a contact card and related pages. */
import { Fragment } from 'react';
import { ic, i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { PUB } from './site_bits.jsx';
import { to } from '../router/index.js';

const TOC_CLS = 'w-full rounded-lg px-2 py-1.5 text-left text-muted transition hover:bg-fg/5 hover:text-accent';
const REL_CLS = 'flex items-center justify-between rounded-lg px-2 py-1.5 text-muted transition hover:bg-fg/5 hover:text-accent';

export function longform(k) {
  const secs = Array.from({ length: 4 }, (_, i) => ({ id: `${k}_${i + 1}`, t: lorem.t(3) }));
  const li = n => Array.from({ length: n }, (_, j) => <li key={j}>{lorem.s(6, 12)}</li>);
  /* every call builds all four variants (the same lorem sequence, so each variant's text is stable) and returns the i-th */
  const extra = i => [
    <><h3>{lorem.t(3)}</h3><p>{lorem.p(3)}</p><ul>{li(4)}</ul></>,
    <><figure><img src={cfg.img(k + i, 1200, 700)} alt={lorem.t(4)} width="1200" height="700" loading="lazy" /><figcaption>{lorem.s(6, 10)}</figcaption></figure>
      <p>{lorem.p(3)}</p></>,
    <><blockquote><p>{lorem.s(14, 22)}</p><footer className="mt-2 text-sm"><cite>{lorem.name()}</cite></footer></blockquote><h4>{lorem.t(3)}</h4><p>{lorem.p(2)}</p>
      <dl>{[0, 1, 2].map(j => <Fragment key={j}><dt>{lorem.t(2)}</dt><dd>{lorem.s()}</dd></Fragment>)}</dl></>,
    <><h5>{lorem.t(2)}</h5><ol>{li(4)}</ol><h6>{lorem.t(2)}</h6><p>{lorem.p(2)}</p></>][i];
  return (
    <div className="wrap grid gap-12 pb-24 lg:grid-cols-[minmax(0,1fr)_17rem]">
      <article className="prose_x max-w-3xl">{secs.map((s, i) => (
        <Fragment key={s.id}>{i ? <hr /> : null}<section id={s.id} className="scroll-mt-28"><h2>{s.t}</h2><p>{lorem.p(4)}</p>{extra(i)}</section></Fragment>
      ))}</article>
      <aside className="grid content-start gap-6 lg:sticky lg:top-24 lg:self-start">
        <nav className="card p-5" aria-label="On this page"><h2 className="text-sm font-semibold">On this page</h2><ol className="mt-3 grid gap-1 text-sm">{secs.map(s => (
          <li key={s.id}><button className={TOC_CLS} data-act="scroll" data-to={s.id}>{s.t}</button></li>
        ))}</ol></nav>
        <div className="card relative isolate overflow-hidden p-6"><div className="pattern_layer" aria-hidden="true"></div>{i3('send', 'h-12 w-12', 'blue')}
          <h2 className="mt-4 text-lg">{lorem.t(3)}</h2><p className="mt-1 text-sm text-muted">{lorem.s()}</p>
          <a href={to('/contact')} className="btn btn_primary btn_sm mt-4">Contact us</a></div>
        <nav className="card p-5" aria-label="Related pages"><h2 className="text-sm font-semibold">Related</h2><ul className="mt-3 grid gap-1 text-sm">
          {PUB.filter(([x]) => x !== k).slice(0, 4).map(([x, l]) => (
            <li key={x}><a href={to(`/${x}`)} className={REL_CLS}>{l}{ic('chev_r', 'h-4 w-4')}</a></li>
          ))}</ul></nav>
      </aside></div>
  );
}
