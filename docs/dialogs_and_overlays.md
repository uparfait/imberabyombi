# Dialogs and overlays

One element of each kind lives in `index.html`, outside the React root, and every module reuses it:
`#modal` (forms, details, views), `#confirm` (questions), `#drawer` (phone menu), `#viewer` (files), `#picker`,
`#tip` (tooltip), `#viz_tip` (chart tooltip), `#toasts`, `#loader`.
React draws the dialog contents through portals (`Dialog_hosts`, src/overlays); the rest is plain JavaScript.
