/* kit/kit_forms_when.jsx: the "Date and time row" fieldset of the Forms specimen: the one-line row the activity and event
   forms use (fields/when_row.jsx): soft blocks for the date, start, end and time zone, each a real field shown in words.
   What it is and how to use it is in the legend's help icon. */
import { when_row } from '../fields/index.js';
import { device_tz } from '../lib/index.js';
import { help_tip } from '../ui/index.js';

const FIELDS = [{ k: 'kit_date', l: 'Date', t: 'date' }, { k: 'kit_start', l: 'Starts', t: 'time' }, { k: 'kit_end', l: 'Ends', t: 'time' },
  { k: 'kit_tz', l: 'Time zone', t: 'tz' }];
const ABOUT = 'When something happens, on one line as in a calendar app: the date, the start and end times and the time zone, each a soft '
  + 'block with a small label, its value in words ("Pick a date" while empty) and an arrow. Click a block to pick from a calendar, a list '
  + 'of times or a searchable list of time zones (by city, name or offset, such as GMT+2), or type in it. Only the time zone is filled in at '
  + 'first, with the device\'s. It stays on one line on any screen: the words get smaller, then shorter; the date and times always show in '
  + 'full and only the time zone is cut (its whole name is on hover). A form uses it by giving the fields row: \'when\'.';

export const kit_forms_when = () => <fieldset className="grid gap-3"><legend className="flex items-center gap-1">Date and time row{help_tip(ABOUT, 'the date and time row')}</legend>
  {when_row(FIELDS, { kit_tz: device_tz() })}</fieldset>;
