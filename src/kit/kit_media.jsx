/* kit/kit_media.jsx: the Media specimen: figure + image, the video and audio players, a map iframe, SVG through
   <embed> and <object>, a canvas bar chart (drawn after the render by kit()), inline SVG and MathML. */
import { lorem } from '../lib/index.js';
import { player } from '../ui/index.js';
import { cfg } from '../config/index.js';
import { svg_uri } from './kit_block.jsx';

/* x = (−b ± √(b² − 4ac)) / 2a */
const formula = (
  <math display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi>
    <mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>
);

export const kit_media = brand_hex => (
  <div className="grid gap-6 md:grid-cols-2">
    <figure className="m-0"><img src={cfg.img('kit-img', 900, 600)} alt={lorem.t(3)} width="900" height="600" loading="lazy" className="w-full rounded-3xl object-cover" />
      <figcaption>{'<img> inside <figure>'}</figcaption></figure>
    <div className="grid gap-4">{player('video', cfg.video, cfg.img('kit-poster', 900, 506))}{player('audio', cfg.audio)}</div>
