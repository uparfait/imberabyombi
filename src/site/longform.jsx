/* site/longform.jsx: the long text under every detail page: four sections (headings, lists, figure, quote, terms)
   with an aside: "On this page" (data-act="scroll" to each section), a contact card and related pages. */
import { Fragment } from 'react';
import { ic, i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { PUB } from './site_bits.jsx';

const TOC_CLS = 'w-full rounded-lg px-2 py-1.5 text-left text-muted transition hover:bg-fg/5 hover:text-accent';
const REL_CLS = 'flex items-center justify-between rounded-lg px-2 py-1.5 text-muted transition hover:bg-fg/5 hover:text-accent';

export function longform(k) {
  const secs = Array.from({ length: 4 }, (_, i) => ({ id: `${k}_${i + 1}`, t: lorem.t(3) }));
  const li = n => Array.from({ length: n }, (_, j) => <li key={j}>{lorem.s(6, 12)}</li>);
  /* like the reference, every call builds all four variants (same lorem sequence) and returns the i-th */
  const extra = i => [
