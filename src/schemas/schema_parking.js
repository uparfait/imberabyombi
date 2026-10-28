/* schemas/schema_parking.js: smart parking: cars checked in and out of numbered slots, with the fee per started hour.
   A slot can hold one parked car: saving a second one shows an error on the slot field. */
import { cfg } from '../config/index.js';
import { lorem, pad, now_dt } from '../lib/index.js';
import { db } from '../store/index.js';
import { show_err } from '../feedback/index.js';
import { field_spec, STATUS, slot_ids, ABC } from './fields.js';

export const parking_schema = {
  l: 'parking record', n: 13, cols: ['plate', 'driver', 'slot', 'in', 'out', 'fee', 'status'], sec: { Vehicle: 'plate,driver,slot', Stay: 'in,out,fee,status' },
  f: [
    field_spec('plate', 'Plate number', 'text', 0, 1), field_spec('driver', 'Driver'), field_spec('slot', 'Slot', 'select', slot_ids, 1),
    field_spec('in', 'Checked in', 'datetime-local', 0, 1, { def: () => now_dt() }), field_spec('out', 'Checked out', 'datetime-local'),
