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
    <div className="grid gap-4">{player('video', cfg.video, cfg.poster)}{player('audio', cfg.audio)}</div>
    <iframe className="map aspect-video" src={cfg.map} title="Map embedded with an iframe" loading="lazy"></iframe>
    <div className="grid gap-4"><embed type="image/svg+xml" src={svg_uri(brand_hex)} title="SVG through embed" className="h-36" />
      <object type="image/svg+xml" data={svg_uri('#1A120C')} className="h-36" aria-label="SVG through object"><p>Your browser cannot show this object.</p></object></div>
    <div className="card p-4"><canvas id="chart_demo" className="h-56 w-full" role="img" aria-label="Sample bar chart drawn on canvas"></canvas></div>
    <div className="card grid place-items-center gap-6 p-6"><svg viewBox="0 0 200 60" className="w-full max-w-xs" aria-label="Inline SVG wave" role="img">
      <path d="M0 40 C 50 70 120 10 200 30" fill="none" style={{ stroke: 'rgb(var(--brand))' }} strokeWidth="5" strokeLinecap="round" /></svg>
      {formula}</div>
  </div>
);
