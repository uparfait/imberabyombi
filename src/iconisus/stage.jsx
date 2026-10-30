/* iconisus/stage.jsx: the preview: the icon large on a soft stage, and under it at 64, 40 and 24 pixels (the sizes icons
   are used at), so its look can be checked small. draw(options) gives the SVG markup; each is drawn for its own pixel
   size (px), as the engine tunes its lighting to it. */
import { device_px } from '../icon3d/index.js';

const svg = html => ({ __html: html });

export const Stage = ({ draw }) => <section className="card ico_stage" aria-label="Preview">
