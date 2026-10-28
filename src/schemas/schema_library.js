/* schemas/schema_library.js: the library: books, rentals (a rented book past its due date shows "Overdue") and
   declarations (lost, damaged, found or donated books). */
import { lorem, ymd, add_d } from '../lib/index.js';
import { db } from '../store/index.js';
import { badge } from '../ui/index.js';
