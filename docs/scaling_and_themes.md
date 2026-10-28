# Device scaling and themes

## Scaling: every device sees the same design
Everything is sized in `rem` (Tailwind's default), so the root font size on `<html>` scales the whole interface:
text, spacing, radii and layout together. The rules live in
[`src/styles/base/02_scaling.css`](../src/styles/base/02_scaling.css):

```css
html { font-size: calc(100vw * 16 / var(--scale_phone)); }                     /* phones */
@media (min-width: 430px)  { … eases from the phone size down to 16px … }      /* hand-off */
@media (min-width: 640px)  { html { font-size: 16px; } }                       /* tablets */
@media (min-width: 1024px) { html { font-size: max(desk px, 100vw * desk / ref); } }  /* desktops */
```

| Screen width        | Result                                                                          |
|---------------------|---------------------------------------------------------------------------------|
| up to 430px (phones) | The 360px design scaled to the screen: a 320px and a 430px phone look the same |
| 430–640px           | Eases down to 16px, so resizing never jumps                                     |
| 640–1023px (tablets) | 16px with the normal responsive layout (Tailwind `sm`, `md`)                   |
| 1024px up to `--scale_ref` | 15px (`--scale_desk`), with `lg` / `xl` layouts                          |
| wider than `--scale_ref` | The reference desktop view scaled up: a 4K screen looks like the reference, only bigger |

Make your own computer the reference: open the browser console, type `innerWidth`, and set `--scale_ref` to it.

Pages never scroll sideways (`overflow-x: clip` on `html` and `body`); wide content (tables, tab strips) scrolls
inside its own box. Nested scroll areas hand the wheel back to the page at their end.

## Themes: light, dark or system
- The choice is stored under the `theme` key. A tiny script in `index.html` applies it before the first paint,
  so there is never a light/dark flash. `set_theme()` (src/actions) switches it at runtime.
- Dark mode is the `.dark` class on `<html>`; it swaps the token values (surfaces, text, lines, status colours,
  chart steps). Components never need their own dark styles unless they sit on a special surface.
- Theme switches are instant: `.theme_switch` turns all transitions off for two frames.
- No shadows in any theme: every `box-shadow` and `text-shadow` is removed; borders carry depth.
- Charts are redrawn after a theme or token change because they read colours when they draw.
- Autofill: browsers are blocked from recolouring filled fields. Fields on dark surfaces add `.field_dark`.

## Motion
- Page changes cross-fade with the View Transitions API where supported, plus a short rise-in.
