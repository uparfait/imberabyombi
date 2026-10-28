/* schemas/schema_parking.js: smart parking: cars checked in and out of numbered slots, with the fee per started hour.
   A slot can hold one parked car: saving a second one shows an error on the slot field. */
import { cfg } from '../config/index.js';
import { lorem, pad, now_dt } from '../lib/index.js';
import { db } from '../store/index.js';
import { show_err } from '../feedback/index.js';
import { field_spec, STATUS, slot_ids, ABC } from './fields.js';
