# Data and schemas

## The store: `db` ([src/store/db.js](../src/store/db.js))
Everything is kept in `localStorage` under the prefix `loremds:v1:` (`window.NS`), with an in-memory fallback when storage
is blocked (private mode, sandboxes).
| Call                         | Does                                                        |
|------------------------------|-------------------------------------------------------------|
| `db.get(key, fallback)`      | a setting (`theme`, `tokens`, `session`, `sideMin` …)       |
| `db.set(key, value)`         | save a setting (a full storage shows a notification)        |
