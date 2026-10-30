# Forms, fields and pickers

## One field from a schema field
`field(spec, value)` ([src/fields/field.jsx](../src/fields/field.jsx)) returns the outlined field: a box with the label
resting inside, which floats onto the border on focus or once filled. A spec comes from `field_spec()` (src/schemas):
```js
import { field_spec as F, option_list as O } from '../schemas/index.js';
F('title', 'Title', 'text', 0, 1)                         // key, label, type, options, required
F('status', 'Status', 'select', O('To do|In progress|Done'), 1, { def: () => 'To do' })
F('due', 'Due', 'datetime-local', 0, 0, { when: '!Done' })   // shown only while status is not Done
F('link', 'Meeting link', 'text', 0, 0, { when: 'place=Virtual' })   // shown only while place is Virtual
F('notes', 'Notes', 'textarea')
```
Types: `text`, `email`, `tel`, `number` (`min`, `max`), `password`, `select`, `textarea`, `list` (suggestions),
`date`, `time`, `datetime-local`, `month`, `week`, `hidden`, `files` (a file field), `subtasks` (task checklist editor),
`tz` (a time zone), `seg` (a few choices as one segmented pill), `repeat` (how a recurring one repeats, see
[events](events.md)).

```jsx
<form data-form="note" noValidate className="grid gap-4">
  <div data-msg-slot="" className="empty:hidden" />
  {field(F('title', 'Title', 'text', 0, 1), '')}
  <button className="btn btn-primary">Save</button>
</form>
```

## Date and time fields
Dates and times are text inputs with a mask: type freely (`20261028` becomes `2026-10-28`), a grey hint shows the rest of
the format, or click to open the mini calendar (dates, weeks, months) and the 15-minute time list. The clock follows the
12/24-hour setting. Saved values are ISO: `YYYY-MM-DD`, `HH:MM` and `YYYY-MM-DDTHH:MM` (`form_obj()` converts them).

## Selects and suggestions: one shared picker
- Every `<select>` inside `.field` or `.pick` opens a menu with a search box; multiple selects get checkboxes,
  **Clear** and **Done**. Typing a letter on a focused select opens it with the search filled in.
- `<input data-list="list_id">` shows suggestions from `<datalist id="list_id">` while typing.
- Keyboard: `Alt + ↓` or `F4` opens, arrows move, `Enter` picks, `Esc` closes only the picker.
- The picker lives outside React (`#picker`); when it sets a value it uses `set_native_value()` so React sees it.

## Files
`<File_box id="photos" name="photos" multiple />` (src/files) shows chosen files as tiles above the button: × removes one,
a tile opens the file viewer (images, video, audio, PDF and text inside; other types get Open and Download).

## Validation
- Forms carry `noValidate`; browser bubbles never show. `validate(form)` checks required fields, types, patterns, ranges
  and date formats, writes a short message under each bad field (`aria-invalid`), focuses the first one, and puts a
  summary in the form's `[data-msg-slot]`. Messages clear while the user fixes the field.
- `show_err(input, text)` / `clear_err(input)` mark one field from your own checks (e.g. "Use a time after the start").

## Reading values
`form_obj(form)` returns `{ name: value }` with date and time values already in ISO form. Inputs are uncontrolled, so
there is nothing to sync while typing.
