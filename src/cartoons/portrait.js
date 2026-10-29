/* cartoons/portrait.js: a cartoon portrait (head and shoulders) on a soft background, for avatars and team cards.
   Drawn on a 100-wide canvas as tall as the picture's shape (100 × 125 for a 4:5 card); the face sits a little above the
   middle so round avatars crop well. */
import { n, path, rect, circle } from './shapes.js';
import { BACKS, WHITE, BRAND, shade } from './palette.js';
