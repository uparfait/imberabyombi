/* cartoons/person.js: a cartoon person standing on (x, y), s tall: legs, shoes, a top (or a dress), arms, neck, and a
   head with hair and a face. look(r) picks a look; pose: 'stand', 'wave', 'walk', 'point' or 'cheer'; phase 0…1 swings
   the arms and legs (the sample video animates it). from_back draws a member of an audience seen from behind. */
import { n, line, path, rect, circle, ellipse, stroke } from './shapes.js';
