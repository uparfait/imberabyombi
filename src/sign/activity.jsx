/* sign/activity.jsx: a document's activity, newest first, at a glance: the person's initials in their colour with the
   action's icon on them, their first name and one verb (uploaded, sent, opened, verified, signed, archived), and how long ago; the full
   sentence and date show on hover. Sending shows who it went to as faces, not a list of emails. */
import { ic } from '../icons/index.js';
import { initials } from '../ui/index.js';
import { seed_color } from '../lib/index.js';
import { when, ago } from './sign_store.js';

const ACTS = { upload: ['upload', 'uploaded it'], send: ['send', 'sent it to'], open: ['eye', 'opened it'], cert: ['shield', 'verified a certificate'],
  sign: ['signature', 'signed'], archive: ['archive', 'archived it'], restore: ['restart_alt', 'restored it'] };
