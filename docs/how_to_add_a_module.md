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

export const buses_schema = {
  l: 'bus', n: 6, cols: ['plate', 'driver', 'route', 'seats'],
  f: [F('plate', 'Plate number', 'text', 0, 1), F('driver', 'Driver'), F('route', 'Route'), F('seats', 'Seats', 'number', 0, 1, { min: 1 })],
  r: { driver: v => person(v) },
  g: () => ({ plate: `RAB ${lorem.int(100, 999)} A`, driver: lorem.name(), route: lorem.t(2), seats: lorem.int(20, 60) })
};
```
Register it in `src/schemas/schemas.js`: import it and add `buses: buses_schema` to `schemas`.

## 2. Add the module
In `src/auth/mods.js`, add an entry to `MODS` (key, label, short label, icon, sidebar group):
```js
{ k: 'transport', l: 'Transport', s: 'Transport', i: 'car', g: 'Operations' },
```

## 3. Draw the view
`src/modules/transport.jsx`:
