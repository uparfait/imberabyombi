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
