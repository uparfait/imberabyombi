/* lib/lorem.js: LOREM IPSUM. Deterministic, so a page renders the same text twice: lorem.seed(n) restarts the
   sequence (seed data and detail pages seed with hash_str(key)); every other call advances it. */
import { cap } from './text.js';
