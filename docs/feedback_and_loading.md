# Feedback, messages and loading

Three channels, each with one job. Pick one by asking "where is the user looking?". Code: [`src/feedback/`](../src/feedback/).

| Channel                   | Used for                                                                 | API |
|---------------------------|--------------------------------------------------------------------------|-----|
| Inline, on the component  | Field errors, form results (sent, saved, subscribed), blocked actions, invalid imports, media that fails, empty and no-result states | `show_err`, `validate`, `form_msg`, `show_msg`, `inline_note`, `empty` |
