# Actions and events

Markup declares behaviour with attributes; a few delegated document listeners (src/behaviors) do the rest. No
component needs its own click handler for app actions, and buttons inside dialogs, menus or tables all work the same way.

## data-act: a button names its job
```jsx
<button className="btn btn-primary btn-sm" data-act="add" data-col="tasks">Add a task</button>
```
- The click listener finds the closest `[data-act]` and runs `ACT[name](element, event)` from
  [`src/actions/`](../src/actions/). `Enter` / `Space` do the same on any element with `data-act` and a `tabIndex`.
- `REQ` decides which actions are requests: `1` = a change (the button spins, the top loader shows on staff pages),
  `2` = a get (open details, change page, sort, switch tab…). Others run at once.
- Handlers read their data from the element (`t.dataset.id`, `t.closest('[data-task]')`), change data or `ui`, and call
  `rerender()`.

```js
/* src/actions/act_example.js */
import { db, rerender } from '../store/index.js';
import { notify } from '../feedback/index.js';
export const EXAMPLE_ACT = {
  archive: t => { db.upsert('tasks', { id: t.dataset.id, status: 'Done' }); rerender(); notify('Archived.', 'ok'); }
};
```
Add the object to `ACT` in `src/actions/act.js`, and `archive: 1` to `REQ` if it should spin its button. A module whose
code loads on demand (O-Doc Sign) adds its handlers when it arrives: `add_act(EXAMPLE_ACT, { archive: 1 })`.

## data-form: a form names its handler
`<form data-form="contact" noValidate>` → on a valid submit `FORMS.contact(values, form)` runs, inside `request()`
with the submit button busy. Validation (required, email, patterns, date formats) runs first and writes messages inline.

## Attributes the listeners understand
| Attribute                       | Effect                                                             |
|---------------------------------|--------------------------------------------------------------------|
| `data-act="name"`               | run `ACT.name` on click (and Enter / Space)                        |
| `data-form="name"`              | run `FORMS.name` on a valid submit                                 |
| `data-search="col" data-k="key"`| live column search of a data table                                 |
| `data-type="date|time|datetime-local|month|week"` (input) | text date/time field with the picker   |
| `data-list="id"`                | suggestions from `<datalist id>` while typing                      |
| `data-tip="text"`               | tooltip (icon buttons use their `aria-label`)                      |
| `data-filter=".selector"`       | a search box that hides elements whose text does not match         |
| `data-pop="id"`                 | toggle a popover menu                                              |
| `data-reveal`                   | fade and rise in when scrolled into view (`style={{ '--d': '.1s' }}` delays it) |
| `data-count="n"`                | count up when visible                                              |
| `data-type='["a","b"]'` (not an input) | typing effect                                               |
| `data-out="#id"`                | mirror a range value into an `<output>`                            |
| `data-token="brand|radius|space|font"` | live design-token editor (Settings)                         |

## The listeners
click · input (masks, suggestions, live search) · change (selects, ticks, files) · submit · keydown (Esc, Ctrl K,
arrows in menus) · pointer and focus (tooltips, chart hover) · scroll and resize (header line, pinned rows, wheel hand-off)
They are installed once by `boot()`. A right click is left to the browser (its own menu).

## Keyboard shortcuts
