/* events/my_role.js: the signed-in person's part in an activity or event, found by their email: Organiser, Co-organiser,
   Presenter (of an agenda item) or Invited; null when they have none. */
import { auth } from '../auth/index.js';

const same = (a, m) => !!a && String(a).trim().toLowerCase() === m;
export function my_role(r) {
