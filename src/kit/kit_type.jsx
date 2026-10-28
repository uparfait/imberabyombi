/* kit/kit_type.jsx: the Typography specimen: headings, every inline text element, a quote, an address and code.
   Lorem calls run in a fixed order, so the sample text stays the same. */
import { lorem } from '../lib/index.js';

export const kit_type = () => (
  <article className="grid gap-4"><h1>{lorem.t(3)}</h1><h2>{lorem.t(3)}</h2><h3>{lorem.t(4)}</h3><h4>{lorem.t(4)}</h4><h5>{lorem.t(5)}</h5><h6>{lorem.t(5)}</h6>
    <p className="max-w-prose">Lorem <em>ipsum</em> <strong>dolor</strong> <small>sit amet</small>, <s>consectetur</s> <cite>Adipiscing</cite> <q>sed do eiusmod</q>{' '}
      <abbr title="Lorem Ipsum Dolor">LID</abbr> <data value="42">quadraginta duo</data> <time dateTime="2026-11-04">4 Nov</time> <code>tempor()</code>{' '}
      <var>x</var> <samp>incididunt ok</samp> <kbd>Ctrl</kbd> + <kbd>K</kbd>, H<sub>2</sub>O, E = mc<sup>2</sup>, <mark>magna aliqua</mark>.<br />
      Ut enim <span className="font-semibold text-accent">ad minim</span> <a href="#/" className="text-accent underline underline-offset-4">veniam</a>.</p>
    <blockquote><p>{lorem.s(14, 20)}</p><footer className="mt-2 text-sm text-muted"><cite className="text-fg">{lorem.name()}</cite></footer></blockquote><hr />
    <address className="text-muted">{lorem.t(2)} 12<br />{lorem.t(1)} 00100<br /><a href="mailto:hello@lorem.io" className="text-accent">hello@lorem.io</a></address>
    <pre><code>{`const ${lorem.w(1)} = (${lorem.w(1)}) => ${lorem.w(1)}.map(x => x * 2);`}</code></pre></article>
);
