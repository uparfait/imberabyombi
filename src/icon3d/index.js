/* icon3d: the 3D icon engine. render(input, { style, colors, size, px, view }) turns a letter, number, symbol, SVG or
   Iconify icon into a 3D-looking SVG string (the look comes from SVG lighting filters).
     input   'A' | '#' | 'Hi' (up to 3 characters) · '<svg viewBox="0 0 24 24">…</svg>' · { body, width, height, left, top }
     style   'classic' | 'balloon' | 'ribbon' | 'glossy' | 'clay' | 'glass'
     colors  ['#primary', '#secondary', '#tertiary']: 1, 2 or 3 (missing ones are worked out from the first)
     size    pixels or any CSS size ('100%')
     px      the device pixels the icon is drawn at (default: size when it is a number, else 200). The lighting and the
             goo work per device pixel, so their numbers follow it (parts.js): render one SVG per size you show, with
             the real px (CSS px × devicePixelRatio), rather than scaling one SVG down.
