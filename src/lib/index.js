/* lib: tiny pure helpers (text, ids, dates, page, colours, download), the deterministic lorem ipsum, seed_color (a
   colour from any text, e.g. a person's email), time zones (tz.js: the page's zone, converting times between zones) and
   repeat rules (repeat.js: the days a recurring activity falls on; repeat_words.js: the rule in words).
   Import from here: import { esc, fmt_d, lorem } from '../lib/index.js' */
export * from './text.js';
export * from './dates.js';
export * from './dom.js';
export * from './lorem.js';
export * from './seed_color.js';
export * from './tz.js';
export * from './repeat.js';
