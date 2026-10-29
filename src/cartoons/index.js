/* cartoons: flat cartoon pictures drawn in the browser from a seed. Nothing is downloaded (light on any connection),
   and a seed always draws the same picture. cartoon(seed, w, h) is a scene (a street, a park, an office, an event
   stage, mountains); cartoon_face(n, w, h) a person's portrait. Both return an image address (an SVG data URI) for
   <img src>; cfg.img and cfg.face (src/config) use them. The parts are exported too, to draw your own pictures.
   Import from here: import { cartoon, cartoon_face } from '../cartoons/index.js' */
import { scene_svg } from './scene.js';
import { portrait_svg } from './portrait.js';

const made = new Map();   // address by seed and size: a picture drawn twice is built once
const memo = (key, fn) => made.get(key) || (made.set(key, fn()), made.get(key));
