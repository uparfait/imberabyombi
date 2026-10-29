/* cartoons/scene.js: picks and draws the scene for a seed. A seed's start can ask for a kind (event… → a stage, a park
   or a street; about… → the office or the park); any other seed gets one of the five. */
import { rng } from './rng.js';
import { n } from './shapes.js';
import { city } from './scene_city.js';
import { park } from './scene_park.js';
import { office } from './scene_office.js';
import { stage } from './scene_stage.js';
import { mountains } from './scene_mountains.js';
