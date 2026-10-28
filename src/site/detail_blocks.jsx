/* site/detail_blocks.jsx: Extra blocks for detail pages: the staff directory (team filter chips, search, twelve
   cards), the questions list (FAQ) and the Overview page's top (video, key numbers, audio). */
import { lorem } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { search_box, player } from '../ui/index.js';
import { sec_head } from './site_bits.jsx';
import { staff_card } from './strategies_staff.jsx';

export function staff_dir() {
  lorem.seed(77); const teams = [lorem.t(1), lorem.t(1), lorem.t(1), lorem.t(1)];
