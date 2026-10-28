# Connecting a backend

Out of the box every record lives in the browser (`localStorage`, with an in-memory fallback in private mode).
Two small objects stand between the screens and the data, so a real API replaces them without touching the pages.

## 1. The data store: `db` (src/store/db.js)
