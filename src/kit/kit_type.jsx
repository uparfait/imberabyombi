/* kit/kit_type.jsx: the Typography specimen: headings, every inline text element, a quote, an address and code.
   Lorem calls keep the reference's order. */
import { lorem } from '../lib/index.js';

export const kit_type = () => (
  <article className="grid gap-4"><h1>{lorem.t(3)}</h1><h2>{lorem.t(3)}</h2><h3>{lorem.t(4)}</h3><h4>{lorem.t(4)}</h4><h5>{lorem.t(5)}</h5><h6>{lorem.t(5)}</h6>
    <p className="max-w-prose">Lorem <em>ipsum</em> <strong>dolor</strong> <small>sit amet</small>, <s>consectetur</s> <cite>Adipiscing</cite> <q>sed do eiusmod</q>{' '}
      <abbr title="Lorem Ipsum Dolor">LID</abbr> <data value="42">quadraginta duo</data> <time dateTime="2026-11-04">4 Nov</time> <code>tempor()</code>{' '}
