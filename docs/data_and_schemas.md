# Data and schemas

## The store: `db` ([src/store/db.js](../src/store/db.js))
Everything is kept in `localStorage` under the prefix `loremds:v1:` (`window.NS`), with an in-memory fallback when storage
