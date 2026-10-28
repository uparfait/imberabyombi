# Tables, CRUD and export

`crud(collection, options)` ([src/table/crud.jsx](../src/table/crud.jsx)) turns a schema into a complete data table.
```jsx
import { crud } from '../table/index.js';
VIEWS.library = () => crud('books', { title: 'Books' });
```

## What every table gets
- A search box in every column header: text search, a select for fixed choices, a date field for date columns.
