/* cartoons/person.js: a cartoon person standing on (x, y), s tall: legs, shoes, a top (or a dress), arms, neck, and a
   head with hair and a face. look(r) picks a look; pose: 'stand', 'wave', 'walk', 'point' or 'cheer'; phase 0…1 swings
   the arms and legs (the sample video animates it). from_back draws a member of an audience seen from behind. */
import { n, line, path, rect, circle, ellipse, stroke } from './shapes.js';
import { INK, SKINS, HAIRS, CLOTHES, PANTS, shade, lum } from './palette.js';
import { HAIR_STYLES, hair_back, hair_front } from './hair.js';
import { face_bits } from './features.js';

export function look(r) {
  const style = r.pick(HAIR_STYLES), skin = r.pick(SKINS);
  let hair = r.pick(HAIRS);
  if (Math.abs(lum(hair) - lum(skin)) < 45) hair = lum(skin) > 128 ? shade(hair, -.45) : '#1A120C';   // keep the face clear of the hair
