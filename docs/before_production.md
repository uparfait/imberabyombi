# Before production

The template is a complete front end with demo data in the browser. Before real users rely on it:

## Security
- `localStorage` is not secure storage, and the demo sign-in accepts any details. Replace `db` (src/store/db.js)
  and `auth` (src/auth) with calls to your API; see [connecting a backend](connecting_a_backend.md).
