/* lib/seed_color.js: a colour from any text (an email, a name, an id): the same text always gives the same colour.
   The hue comes from a hash of the text; lightness and chroma are fixed in OKLCH, so every colour looks equally bright
   and rich, white initials on it stay readable (4.5:1 or more), and it works as a soft tint on light and dark backgrounds
   (color-mix(in srgb, <colour> 10%, transparent)). Only hues from green through blue and violet to magenta are used:
   reds, oranges, ambers and yellows read as alerts (errors, warnings) next to a person, and olives look muddy.
