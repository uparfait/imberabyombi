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
