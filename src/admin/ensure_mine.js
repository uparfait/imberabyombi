/* ensure_mine.js: gives a person who signs in some tasks of their own (assigned to them, by them, one done), once,
   so My tasks, the calendar and the dashboard have something to show. */
import { lorem, hash_str, ymd, add_d } from '../lib/index.js';
import { db } from '../store/index.js';
import { people } from '../schemas/index.js';

export function ensure_mine(n) {
