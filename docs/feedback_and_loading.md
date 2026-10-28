# Feedback, messages and loading

Three channels, each with one job. Pick one by asking "where is the user looking?". Code: [`src/feedback/`](../src/feedback/).

| Channel                   | Used for                                                                 | API |
|---------------------------|--------------------------------------------------------------------------|-----|
| Inline, on the component  | Field errors, form results (sent, saved, subscribed), blocked actions, invalid imports, media that fails, empty and no-result states | `show_err`, `validate`, `form_msg`, `show_msg`, `inline_note`, `empty` |
| Bottom-right notification | Staff (admin) pages only: work that finished after a dialog closed or a page changed (saved, added, deleted, exported, copied, signed in) and system issues (storage full, request failed) | `notify(text, tone, title)`, `notify_next(...)` |
| Loading (one spinner)     | Every request the user asked for: in the busy button when there is one; on staff pages also the round `#loader` at the top, above open dialogs too | `request(fn, { btn, delay })`, `spinner()`, `loading()` |

## Inline messages
- Forms use custom validation; browser error bubbles never show (forms carry `noValidate`).
- `validate(form)` marks each bad field with `aria-invalid`, writes a short fix-it message under it, focuses the first
  one and puts a summary in the form's `[data-msg-slot]`. Errors clear while the user fixes them.
- Success messages hide after 7 seconds; errors stay until dismissed or fixed.
- Add `<div data-msg-slot className="empty:hidden"></div>` where a form's messages should appear.

## Notifications
- Staff pages only. On public and account pages `notify()` shows the same message inline, in the form or section the
  user is working in. `notify_next()` carries a message to the page a form goes to next (signed in, signed out…).
- Slide in from the right, stack up to 4, pause on hover, close button, a line shows the time left.
- Tones: `ok`, `bad`, `warn`, `info`. Errors stay 7 s, others 4.5 s. Errors use `role="alert"`.
- `#toasts` and `#loader` are manual popovers in the browser's top layer, so they also show above open dialogs;
  `show_dialog()` lifts them back on top whenever a dialog opens.

## Loading: one segmented spinner everywhere
- `request(fn, { btn, delay })` spins `btn` in place (its text hidden) or, without a button, shows `#loader` after
  150 ms (instant work never flashes it), waits `delay` ms, runs `fn`, then stops. A thrown error becomes a
  "The request could not be completed" notification.
