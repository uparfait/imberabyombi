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
