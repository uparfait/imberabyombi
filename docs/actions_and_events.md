# Actions and events

Markup declares behaviour with attributes; a few delegated document listeners (src/behaviors) do the rest. No
component needs its own click handler for app actions, and buttons inside dialogs, menus or tables all work the same way.

## data-act: a button names its job
```jsx
<button className="btn btn-primary btn-sm" data-act="add" data-col="tasks">Add a task</button>
```
- The click listener finds the closest `[data-act]` and runs `ACT[name](element, event)` from
