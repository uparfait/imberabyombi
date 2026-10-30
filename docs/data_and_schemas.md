# Data and schemas

## The store: `db` ([src/store/db.js](../src/store/db.js))
Everything is kept in `localStorage` under the prefix `loremds:v1:` (`window.NS`), with an in-memory fallback when storage
is blocked (private mode, sandboxes).
| Call                         | Does                                                        |
|------------------------------|-------------------------------------------------------------|
| `db.get(key, fallback)`      | a setting (`theme`, `tokens`, `session`, `sideMin` …)       |
| `db.set(key, value)`         | save a setting (a full storage shows a notification)        |
| `db.list(collection)`        | all rows of a collection; seeds it once from its schema     |
| `db.find(collection, id)`    | one row                                                     |
| `db.upsert(collection, row)` | insert or update (by `id`), returns the id                  |
| `db.remove(collection, id)`  | delete a row                                                |
| `db.bytes()`                 | how much storage the app uses (Settings shows it)           |

Collections are stored as `c:<collection>` (`c:tasks`, `c:staff`…). Settings → Data exports and imports a JSON backup
and resets the demo data.

## Schemas: one object per data type ([src/schemas/](../src/schemas/))
```js
/* src/schemas/schema_transport.js */
import { field_spec as F } from './fields.js';
import { lorem } from '../lib/index.js';
import { person } from '../ui/index.js';
export const buses_schema = {
  l: 'bus',                                // the singular label ("Add a bus")
  n: 6,                                    // how many demo rows to seed
  cols: ['plate', 'driver', 'route'],      // table columns, in order
  f: [F('plate', 'Plate', 'text', 0, 1), F('driver', 'Driver'), F('route', 'Route')],   // form fields
  r: { driver: v => person(v) },           // optional cell renderers (return JSX)
  g: () => ({ plate: 'RAB 100 A', driver: lorem.name(), route: lorem.t(2) })            // one demo row
};
```
Register it in `src/schemas/schemas.js` (`buses: buses_schema` in `schemas`). Tables, forms, validation, details view, export, search and seed data follow.

Optional keys: `before(values, row, form)` adjusts values before saving (may be async, e.g. to read files),
`sec` groups fields into categories in the details view, `form_sec: true` shows those groups as headings in the form too.

## Lorem ipsum that does not change
`lorem` (src/lib) is deterministic: the same seed gives the same text every time, so a page looks the same on every visit
and in every screenshot. Methods: `t(n)` title of n words, `s()` sentence, `p()` paragraph, `name()`, `pick(list)`,
`int(a, b)`, `r()` random 0–1, `seed(n)`.

## Storage keys
`theme`, `tokens`, `session`, `lastRole`, `roles`, `notes`, `messages`, `allowSelect`, `sideMin`, `sideClosed`,
`tview` (table settings) and `c:<collection>` for each data type. Change the prefix in `index.html` to start a fresh dataset.
