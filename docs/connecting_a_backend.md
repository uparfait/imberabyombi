# Connecting a backend

Out of the box every record lives in the browser (`localStorage`, with an in-memory fallback in private mode).
Two small objects stand between the screens and the data, so a real API replaces them without touching the pages.

## 1. The data store: `db` (src/store/db.js)
| Method                      | Demo behaviour                         | With an API                         |
|-----------------------------|----------------------------------------|-------------------------------------|
| `db.list(collection)`       | reads `c:<collection>` (seeds it once) | return the rows you fetched         |
| `db.find(collection, id)`   | one row                                | from the fetched rows or a request  |
| `db.upsert(collection, row)`| insert or update, returns the id       | `POST` / `PATCH`, then update cache |
| `db.remove(collection, id)` | delete                                 | `DELETE`, then update cache         |
| `db.get(key)` / `db.set(key, value)` | settings (theme, tokens, session…) | can stay in the browser          |

A simple pattern: keep `db` as a cache. Fetch a collection when a page opens, put the rows in the cache, call
`rerender()`. On save, send the request inside `request()` and update the cache when it answers.

## 2. Requests: `request()` (src/feedback)
Every user action already goes through `request(fn, { btn, delay })`: the button spins, the top loader shows, and an
error becomes a notification. Put your `fetch()` inside `fn` and set `cfg.latency` to `0`:
```js
request(async () => {
  const res = await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(row), headers: { 'Content-Type': 'application/json' } });
  if (!res.ok) throw new Error('save failed');          // shown as "The request could not be completed"
  db.upsert('tasks', await res.json()); rerender(); notify('Saved.', 'ok');
}, { btn });
```

## 3. Sign-in: `auth` (src/auth)
Replace `auth.login()` with a call to your sign-in endpoint and keep the returned user (`{ name, email, role }`) in the
