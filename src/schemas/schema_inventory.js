/* schemas/schema_inventory.js: reservations (rooms, buses, projectors… by people) and inventory items (stock with a
   minimum level; the quantity cell shows a stock meter). */
import { lorem, pad, ymd, add_d } from '../lib/index.js';
import { stock_cell } from '../ui/index.js';
