# Design tokens: change one line, everything follows

All tokens live in `:root` in [`src/styles/base/01_design_tokens.css`](../src/styles/base/01_design_tokens.css).
`tailwind.config.js` maps every colour, radius and spacing utility to these variables, so `bg-brand`, `rounded-2xl`
or `p-4` always read the tokens. Colours are stored as `R G B` triplets so opacity modifiers work (`bg-brand/15`).

| Token              | Default             | Drives                                                           |
|--------------------|---------------------|------------------------------------------------------------------|
| `--brand`          | `224 102 27`        | Primary orange: buttons, links, active states, charts, icons     |
| `--brand_2`        | `150 62 14`         | Deep rust: gradients, hover                                      |
| `--ink`            | `26 18 12`          | Brand black: hero, footer, vision band, ink buttons              |
| `--radius`         | `1rem`              | Corners of larger surfaces: fields, cards, menus, dialogs, tiles |
| `--pill`           | `999px`             | Small things fully round: buttons, chips, badges, avatars, toggles |
| `--space`          | `1rem`              | Every `p-*`, `m-*`, `gap-*`, `space-*` utility (`p-4` = 1 × `--space`) |
| `--font_sans`      | Figtree             | Body text                                                        |
| `--font_display`   | Bricolage Grotesque | Headings, numbers, logo                                          |
| `--font_mono`      | JetBrains Mono      | `code`, `kbd`, `samp`, `pre`, `var`                              |
| `--series_1..8`    | brand, blue, …      | Chart colours in a fixed order (dark mode has its own steps)     |
| `--ease` / `--speed` | curve / `.3s`     | Transitions everywhere                                           |
| `--scale_phone`    | `360`               | Phone design width (see [scaling](scaling_and_themes.md))        |
| `--scale_desk`     | `15`                | Root size in px on laptops and desktops                          |
| `--scale_ref`      | `1536`              | Reference desktop width; wider views show it scaled up, never smaller |
| `--bg` … `--line`  | per theme           | Surfaces, text, muted text, borders (light and `.dark` sets)     |
| `--ok` `--warn` `--bad` `--info` | per theme | Status badges, meters, alerts                               |
| `--shadow`         | `none`              | Kept for compatibility: the system is flat, borders carry depth  |
| `--pattern`        | SVG data URI        | Diamond lattice from the brand artwork (used as a CSS mask)      |

## Examples
```css
:root { --brand: 37 99 235; }     /* every orange becomes blue */
:root { --radius: 0; }            /* larger surfaces go square, small things stay round */
:root { --space: 1.25rem; }       /* every padding, margin and gap grows 25% */
```

## The accent colour
Small orange text uses `text-accent`: 80% brand mixed with 20% text colour. It stays at or above 4.5:1 contrast in
both themes and follows any brand change automatically. Use it instead of `text-brand` for small text.

## Changing tokens while the app runs
Settings → Appearance edits brand, radius, spacing and font live. The overrides are stored (`tokens` key) and written as
inline styles on `<html>`; **Reset to stylesheet values** removes them so the CSS file applies again.

## Rules
- Never hard-code a colour in a component: use `brand`, `ink`, `fg`, `muted`, `line`, `surface*` or a status colour.
- Variables are snake_case (`--surface_2`); the Tailwind colour names keep Tailwind's style (`bg-surface-2`).
- Dark mode is the `.dark` class on `<html>` with its own set of tokens; see [scaling and themes](scaling_and_themes.md).
