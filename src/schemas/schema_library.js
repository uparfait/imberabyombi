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
    category: lorem.pick(['Fiction', 'Science', 'History', 'Languages', 'Reference']), copies: lorem.int(1, 6), shelf: `${lorem.pick(ABC)}${lorem.int(1, 12)}`
  })
};

export const rentals_schema = {
  l: 'rental', n: 10, cols: ['book', 'borrower', 'out', 'due', 'status'],
  f: [
    field_spec('book', 'Book', 'list', () => db.list('books').map(b => b.title), 1), field_spec('borrower', 'Borrower', 'list', () => names('students', 'staff'), 1),
    field_spec('out', 'Rented on', 'date', 0, 1, { def: () => ymd() }), field_spec('due', 'Due date', 'date', 0, 1, { def: () => ymd(add_d(new Date(), 14)) }),
    field_spec('returned', 'Returned on', 'date'), field_spec('status', 'Status', 'select', STATUS.rent, 1, { def: () => 'Rented' })
  ],
  r: { status: (v, row) => badge(v === 'Rented' && row.due < ymd() ? 'Overdue' : v) },
  g: () => {
    const o = add_d(new Date(), -lorem.int(1, 25)), st = lorem.pick(['Rented', 'Rented', 'Returned']);
    return {
      book: lorem.pick(db.list('books')).title, borrower: lorem.pick(db.list('students')).name, out: ymd(o), due: ymd(add_d(o, 14)),
      returned: st === 'Returned' ? ymd(add_d(o, lorem.int(3, 13))) : '', status: st
    };
  }
};

export const declarations_schema = {
  l: 'declaration', n: 5, cols: ['book', 'type', 'by', 'date', 'note'],
  f: [
    field_spec('book', 'Book', 'list', () => db.list('books').map(b => b.title), 1), field_spec('type', 'Type', 'select', option_list('Lost|Damaged|Found|Donated'), 1),
    field_spec('by', 'Declared by', 'list', () => names('students', 'staff')), field_spec('date', 'Date', 'date', 0, 1, { def: () => ymd() }),
    field_spec('note', 'Note', 'textarea')
  ],
  g: () => ({
    book: lorem.pick(db.list('books')).title, type: lorem.pick(['Lost', 'Damaged', 'Found', 'Donated']), by: lorem.pick(db.list('students')).name,
    date: ymd(add_d(new Date(), -lorem.int(0, 30))), note: lorem.s()
  })
};
