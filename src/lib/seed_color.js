/* lib/seed_color.js: a colour from any text (an email, a name, an id): the same text always gives the same colour.
   The hue comes from a hash of the text; lightness and chroma are fixed in OKLCH, so every colour looks equally bright
   and rich, white initials on it stay readable (4.5:1 or more), and it works as a soft tint on light and dark backgrounds
