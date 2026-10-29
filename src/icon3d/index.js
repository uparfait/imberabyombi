/* icon3d: the 3D icon engine. render(input, { style, colors, size }) turns a letter, number, symbol, SVG or Iconify icon
   into a 3D-looking SVG string (vector: scale it freely; the look comes from SVG lighting filters).
     input   'A' | '#' | 'Hi' (up to 3 characters) · '<svg viewBox="0 0 24 24">…</svg>' · { body, width, height, left, top }
     style   'classic' | 'balloon' | 'ribbon' | 'glossy' | 'clay' | 'glass'
     colors  ['#primary', '#secondary', '#tertiary']: 1, 2 or 3 (missing ones are worked out from the first)
     size    pixels or any CSS size ('100%')
