# Forms, fields and pickers

## One field from a schema field
`field(spec, value)` ([src/fields/field.jsx](../src/fields/field.jsx)) returns the outlined field: a box with the label
resting inside, which floats onto the border on focus or once filled. A spec comes from `field_spec()` (src/schemas):
```js
import { field_spec as F, option_list as O } from '../schemas/index.js';
F('title', 'Title', 'text', 0, 1)                         // key, label, type, options, required
F('status', 'Status', 'select', O('To do|In progress|Done'), 1, { def: () => 'To do' })
F('due', 'Due', 'datetime-local', 0, 0, { when: '!Done' })   // shown only while status is not Done
