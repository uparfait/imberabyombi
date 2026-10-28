# Before production

The template is a complete front end with demo data in the browser. Before real users rely on it:

## Security
- `localStorage` is not secure storage, and the demo sign-in accepts any details. Replace `db` (src/store/db.js)
  and `auth` (src/auth) with calls to your API; see [connecting a backend](connecting_a_backend.md).
- Enforce every permission on the server. `auth.can()` in the browser only decides what the interface shows.
