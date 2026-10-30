/* iconisus/stage.jsx: the preview: the icon large on a soft stage, and under it at 64, 40 and 24 pixels (the sizes icons
   are used at), so its look can be checked small. draw(options) gives the SVG markup; each is drawn for its own pixel
   size (px), as the engine tunes its lighting to it. */
import { device_px } from '../icon3d/index.js';

const svg = html => ({ __html: html });

export const Stage = ({ draw }) => <section className="card ico_stage" aria-label="Preview">
  <div className="ico_big" dangerouslySetInnerHTML={svg(draw({ size: '100%', px: device_px(Math.min(300, innerWidth * .72)) }))} />
  <div className="flex items-end gap-6 text-xs text-muted">{[64, 40, 24].map(n =>
    <div key={n} className="grid justify-items-center gap-1"><span className="ico_small" dangerouslySetInnerHTML={svg(draw({ size: n, px: device_px(n) }))} />{n}</div>)}</div>
</section>;
