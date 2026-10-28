# Naming and file rules

These rules keep the template easy to read, easy to search and easy to reuse for any kind of website.

## 1. Every file stays short
No file is longer than **100 lines**: code, styles, configuration and documentation. When a file grows, split it by
topic (for example `schema_tasks.js`, `schema_staff.js`) and re-export the parts from the folder's `index.js`.
Short files are easy to review, easy to replace and load only what a page needs.
