# Feedback, messages and loading

Three channels, each with one job. Pick one by asking "where is the user looking?". Code: [`src/feedback/`](../src/feedback/).

| Channel                   | Used for                                                                 | API |
|---------------------------|--------------------------------------------------------------------------|-----|
| Inline, on the component  | Field errors, form results (sent, saved, subscribed), blocked actions, invalid imports, media that fails, empty and no-result states | `show_err`, `validate`, `form_msg`, `show_msg`, `inline_note`, `empty` |
| Bottom-right notification | Staff (admin) pages only: work that finished after a dialog closed or a page changed (saved, added, deleted, exported, copied, signed in) and system issues (storage full, request failed) | `notify(text, tone, title)`, `notify_next(...)` |
| Loading (one spinner)     | Every request the user asked for: in the busy button when there is one; on staff pages also the round `#loader` at the top, above open dialogs too | `request(fn, { btn, delay })`, `spinner()`, `loading()` |

## Inline messages
- Forms use custom validation; browser error bubbles never show (forms carry `noValidate`).
