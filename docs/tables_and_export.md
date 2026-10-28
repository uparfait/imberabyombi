# Tables, CRUD and export

`crud(collection, options)` ([src/table/crud.jsx](../src/table/crud.jsx)) turns a schema into a complete data table.
```jsx
import { crud } from '../table/index.js';
VIEWS.library = () => crud('books', { title: 'Books' });
```

## What every table gets
- A search box in every column header: text search, a select for fixed choices, a date field for date columns.
- Sort by any column (`aria-sort`), pages of `cfg.page_size` rows (Back · n of n · Next), a row count.
- **Action Buttons** as the first column, pinned while the table scrolls sideways (left out when no row has actions).
- A settings menu (left): rows per page (10, 20, 50) and which columns to show, remembered per table.
- Full screen (right): the table fills the tab (not the browser's full screen), header and actions stay pinned.
- A row click opens the details view: a COLUMN NAME / VALUE table grouped by category.
- Add, edit and delete with a generated form, validation, and a flash on the saved row; deleted rows slide out.
