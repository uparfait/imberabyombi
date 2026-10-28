/* schemas/schema_library.js: the library: books, rentals (a rented book past its due date shows "Overdue") and
   declarations (lost, damaged, found or donated books). */
import { lorem, ymd, add_d } from '../lib/index.js';
import { db } from '../store/index.js';
import { badge } from '../ui/index.js';
import { field_spec, option_list, STATUS, names, ABC } from './fields.js';

export const books_schema = {
  l: 'book', n: 14, cols: ['title', 'author', 'isbn', 'category', 'copies', 'shelf'],
  f: [
    field_spec('title', 'Title', 'text', 0, 1), field_spec('author', 'Author'), field_spec('isbn', 'ISBN'),
    field_spec('category', 'Category', 'select', option_list('Fiction|Science|History|Languages|Reference')),
    field_spec('copies', 'Copies', 'number', 0, 1, { min: 1, def: () => 1 }), field_spec('shelf', 'Shelf')
  ],
  g: () => ({
    title: lorem.t(3), author: lorem.name(), isbn: `978-${lorem.int(1, 9)}-${lorem.int(1000, 9999)}-${lorem.int(1000, 9999)}-${lorem.int(0, 9)}`,
