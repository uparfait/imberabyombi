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
- A loading row on the first view of a page, like a real API; empty and no-result states.
- Export: CSV, JSON or Excel (see below).

## Options
| Option          | Meaning                                                                        |
|-----------------|--------------------------------------------------------------------------------|
| `title`         | the table's title                                                              |
| `mod`           | the permission key (defaults to the current module): level 2 can add, edit and delete |
| `filter(row)`   | show only some rows (e.g. a tab of the same collection)                        |
| `preset`        | values a new record starts with                                                |
| `acts(row, can)`| extra Action Buttons for a row (JSX or nothing)                                |
| `can_row(row)`  | whether this row can be edited or deleted                                      |
| `view(id)`      | open your own details view instead of the generic one                          |

## Export
The Export menu offers CSV, JSON and Excel. The dialog then asks for:
- a **From / To** range (date and time) on the table's first date column;
- **filters** for every fixed-choice column (status, priority, assigned to…), "All" by default;
- the **columns** to include and what each is called in the file. An unticked column cannot be renamed, and with no column
  ticked the download is turned off.
Rows follow the table's current search, then the dialog's range and filters. Files are named `<collection>-<date>.<ext>`.

## Under the hood
