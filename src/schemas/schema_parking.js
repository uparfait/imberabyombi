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
    field_spec('fee', 'Fee', 'number', 0, 0, { min: 0 }), field_spec('status', 'Status', 'select', STATUS.park, 1, { def: () => 'Parked' })
  ],
  before: (d, row, f) => {
    if (d.status === 'Parked' && db.list('parking').some(p => p.status === 'Parked' && p.slot === d.slot && p.id !== row.id)) {
      show_err(f.elements.slot, `Slot ${d.slot} is taken. Choose a free slot.`); f.elements.slot.focus(); return false;
    }
    return d;
  },
  g: i => {
    const parked = i < 7, in_d = new Date(Date.now() - lorem.int(1, parked ? 5 : 30) * 3.6e6), out = new Date(in_d.getTime() + lorem.int(1, 4) * 3.6e6);
    return {
      plate: `R${lorem.pick(ABC)}${lorem.pick(ABC)} ${lorem.int(100, 999)} ${lorem.pick(ABC)}`, driver: lorem.name(),
      slot: 'P' + pad(parked ? i * 3 + 1 : lorem.int(1, 24)), in: now_dt(in_d), out: parked ? '' : now_dt(out),
      fee: parked ? 0 : Math.ceil((out - in_d) / 3.6e6) * cfg.parking_rate, status: parked ? 'Parked' : 'Exited'
    };
  }
};
