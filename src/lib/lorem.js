/* lib/lorem.js: LOREM IPSUM. Deterministic, so a page renders the same text twice: lorem.seed(n) restarts the
   sequence (seed data and detail pages seed with hash_str(key)); every other call advances it. */
import { cap } from './text.js';

export const WORDS = ('lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ' +
  'enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip commodo consequat duis aute irure reprehenderit ' +
  'voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa officia deserunt mollit anim laborum').split(' ');
export let SEED = 1;
