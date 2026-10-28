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
