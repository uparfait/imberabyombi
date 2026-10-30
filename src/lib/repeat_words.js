/* lib/repeat_words.js: a repeat rule (lib/repeat.js) in plain words: "Every 2 weeks on Monday and Wednesday, until
   December 31, 2026", "Every month on the last Friday, 10 times", "Every year in March and June on the 15th". */
import { parse_d } from './dates.js';
import { week_of } from './repeat.js';

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const WEEK_NAMES = { 1: 'first', 2: 'second', 3: 'third', 4: 'fourth', [-1]: 'last' };
/* "a", "a and b", "a, b and c" */
export const and_list = xs => xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs.at(-1)}`;
