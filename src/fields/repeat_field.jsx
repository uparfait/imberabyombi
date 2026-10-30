/* fields/repeat_field.jsx: how a recurring activity or event repeats (field type 'repeat', shown while its type is
   Recurring): how often and every how many, on which weekdays (weekly), in which months (yearly), on which dates or which
   weeks of the month (monthly and yearly), and when it stops (never, on a date, after a number of times). The rule in
   words shows under it and follows every change (repeat_say). repeat_from(form) reads the rule (lib/repeat.js). */
import { REPEAT_NEW, DAY_NAMES, MONTH_NAMES, WEEK_NAMES, repeat_text, cap } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { help_tip } from '../ui/index.js';
import { dt_attrs } from './date_formats.js';

const FREQS = [['daily', 'Daily'], ['weekdays', 'Every weekday (Mon–Fri)'], ['weekly', 'Weekly'], ['monthly', 'Monthly'], ['yearly', 'Yearly']];
const UNIT = { daily: 'day', weekly: 'week', monthly: 'month', yearly: 'year' };
const MON_FIRST = [1, 2, 3, 4, 5, 6, 0];
