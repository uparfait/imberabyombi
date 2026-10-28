/* schemas/schema_inventory.js: reservations (rooms, buses, projectors… by people) and inventory items (stock with a
   minimum level; the quantity cell shows a stock meter). */
import { lorem, pad, ymd, add_d } from '../lib/index.js';
import { stock_cell } from '../ui/index.js';
import { field_spec, option_list, STATUS, people, ABC } from './fields.js';

export const reservations_schema = {
  l: 'reservation', n: 8, cols: ['resource', 'by', 'date', 'from', 'to', 'status'],
  f: [
    field_spec('resource', 'Resource', 'select', option_list('Main hall|Science lab|Computer room|School bus|Projector|Sports field'), 1),
    field_spec('by', 'Reserved by', 'list', people, 1), field_spec('date', 'Date', 'date', 0, 1), field_spec('from', 'From', 'time'), field_spec('to', 'To', 'time'),
    field_spec('purpose', 'Purpose', 'textarea'), field_spec('status', 'Status', 'select', STATUS.res, 1, { def: () => 'Pending' })
  ],
  g: () => {
    const h = lorem.int(8, 15);
    return {
      resource: lorem.pick(['Main hall', 'Science lab', 'Computer room', 'School bus', 'Projector']), by: lorem.pick(people()),
      date: ymd(add_d(new Date(), lorem.int(0, 10))), from: `${pad(h)}:00`, to: `${pad(h + 2)}:00`, purpose: lorem.s(), status: lorem.pick(STATUS.res)
    };
  }
};

export const inventory_schema = {
  l: 'inventory item', n: 12, cols: ['item', 'category', 'qty', 'unit', 'location'],
  f: [
    field_spec('item', 'Item', 'text', 0, 1), field_spec('category', 'Category', 'select', option_list('Kitchen|Cleaning|Stationery|Electronics|Sports|Furniture')),
    field_spec('qty', 'Quantity', 'number', 0, 1, { min: 0 }), field_spec('min', 'Minimum stock', 'number', 0, 0, { min: 0, def: () => 5 }),
    field_spec('unit', 'Unit', 'select', option_list('pcs|kg|L|boxes|packs')), field_spec('location', 'Location')
  ],
  r: { qty: (v, row) => stock_cell(v, row) },
  g: () => ({
