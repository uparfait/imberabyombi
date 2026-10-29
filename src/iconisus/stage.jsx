/* iconisus/stage.jsx: the preview: the icon large on a soft stage, and under it at 64, 40 and 24 pixels (the sizes icons
   are used at), so its look can be checked small. draw(options) gives the SVG markup. */
const svg = html => ({ __html: html });

export const Stage = ({ draw }) => <section className="card ico_stage" aria-label="Preview">
  <div className="ico_big" dangerouslySetInnerHTML={svg(draw({ size: '100%' }))} />
  <div className="flex items-end gap-6 text-xs text-muted">{[64, 40, 24].map(n =>
    <div key={n} className="grid justify-items-center gap-1"><span className="ico_small" dangerouslySetInnerHTML={svg(draw({ size: n }))} />{n}</div>)}</div>
</section>;
