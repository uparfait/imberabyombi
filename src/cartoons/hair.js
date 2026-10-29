/* cartoons/hair.js: hairstyles around a head (centre cx, cy; radius R), in two parts: hair_back goes behind the head
   (long hair, a bob, an afro, a bun) and hair_front over it (the top and the fringe). 'bald' draws nothing. */
import { n, path, circle } from './shapes.js';

export const HAIR_STYLES = ['short', 'side', 'long', 'bob', 'bun', 'curly', 'afro', 'short', 'bald'];
