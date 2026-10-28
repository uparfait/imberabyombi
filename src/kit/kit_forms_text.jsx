/* kit/kit_forms_text.jsx: the "Text inputs" fieldset of the Forms specimen: one field per input type. Date and time
   types are text fields with a mask (dt_attrs) and an empty hint the field helpers fill; search gets the search buttons. */
import { lorem } from '../lib/index.js';
import { DTF, dt_attrs } from '../fields/index.js';
import { search_ui } from '../ui/index.js';

const TYPES = [['text', 'Text'], ['email', 'Email'], ['password', 'Password'], ['number', 'Number'], ['tel', 'Phone'], ['url', 'URL'], ['search', 'Search'],
