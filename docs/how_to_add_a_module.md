# How to add an admin module

A module is a page in the admin (`#/admin/<key>`) with its own sidebar link, permission and data. With a schema and
`crud()`, a full table (search, sort, pages, forms, details, export, seed data) takes about twenty lines.

## 1. Describe the data: a schema
`src/schemas/schema_transport.js`:
```js
/* schemas/schema_transport.js: buses (transport module) */
import { field_spec as F } from './fields.js';
import { lorem } from '../lib/index.js';
import { person } from '../ui/index.js';
