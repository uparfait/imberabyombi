/* site/detail_blocks.jsx: Extra blocks for detail pages: the staff directory (team filter chips, search, twelve
   cards), the questions list (FAQ) and the Overview page's top (video, key numbers, audio). */
import { lorem } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { search_box, player } from '../ui/index.js';
import { sec_head } from './site_bits.jsx';
import { staff_card } from './strategies_staff.jsx';

export function staff_dir() {
  lorem.seed(77); const teams = [lorem.t(1), lorem.t(1), lorem.t(1), lorem.t(1)];
  return (
    <section className="wrap section"><div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by team">{['All', ...teams].map((t, i) => (
        <button key={i} className="chip_btn" aria-pressed={i === 0} data-act="team" data-v={i ? t : ''}>{t}</button>
      ))}</div>
      {search_box({ 'data-filter': '.filter_card' }, 'Search staff', 'ml-auto w-full sm:w-72')}</div>
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }, (_, i) => staff_card(i, teams[i % 4]))}</div></section>
  );
}

export const faq = () => (
