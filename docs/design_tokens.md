# Design tokens: change one line, everything follows

All tokens live in `:root` in [`src/styles/base/01_design_tokens.css`](../src/styles/base/01_design_tokens.css).
`tailwind.config.js` maps every colour, radius and spacing utility to these variables, so `bg-brand`, `rounded-2xl`
or `p-4` always read the tokens. Colours are stored as `R G B` triplets so opacity modifiers work (`bg-brand/15`).
