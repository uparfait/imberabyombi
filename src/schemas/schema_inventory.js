/* schemas/schema_inventory.js: reservations (rooms, buses, projectors… by people) and inventory items (stock with a
   minimum level; the quantity cell shows a stock meter). */
import { lorem, pad, ymd, add_d } from '../lib/index.js';
import { stock_cell } from '../ui/index.js';
import { field_spec, option_list, STATUS, people, ABC } from './fields.js';

export const reservations_schema = {
  l: 'reservation', n: 8, cols: ['resource', 'by', 'date', 'from', 'to', 'status'],
  f: [
    field_spec('resource', 'Resource', 'select', option_list('Main hall|Science lab|Computer room|School bus|Projector|Sports field'), 1),
