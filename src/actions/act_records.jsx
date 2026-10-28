/* actions/act_records.jsx: data-act handlers of the module pages: check in / out (attendance), a student's bulletin,
   library returns and reservations, parking check-in and check-out. */
import { qs, ymd, hm, fmt_d, money, now_dt } from '../lib/index.js';
import { ui, db, rerender } from '../store/index.js';
import { cfg } from '../config/index.js';
import { me } from '../auth/index.js';
import { SUBJECTS, TERMS, slot_ids } from '../schemas/index.js';
