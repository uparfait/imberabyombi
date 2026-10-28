/* site/tiers.jsx: the Partners page's partnership tiers (three price cards, the first recommended) and the
   partners table (rows open a detail view through data-act="row"). */
import { ic } from '../icons/index.js';
import { lorem, cap } from '../lib/index.js';
import { tag } from '../ui/index.js';

export function tiers() {
  const t = [['400 GB', 1.29, 4.99], ['5 TB', 4.99, 19.99], ['20 TB', 99.99, null]];
  return (
    <section className="wrap pb-20"><div className="grid gap-5 lg:grid-cols-3">{t.map(([s, p, o], i) => (
