/* kit/kit_tokens.jsx: the Tokens specimen: every colour token (its hex label is a copy button, filled after each draw
   by hex_refresh() in actions, so React renders it empty), the radius scale and the one-line token override. */

/* colour tokens (CSS variable names, snake_case) */
const TOKS = ['brand', 'brand_2', 'ink', 'bg', 'surface', 'surface_2', 'surface_3', 'fg', 'muted', 'line', 'ok', 'warn', 'bad', 'info'];
/* written out in full so Tailwind finds every class */
const RADII = ['rounded-sm', 'rounded-md', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full'];

export const kit_tokens = () => (
  <>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">{TOKS.map(k => (
      <div key={k} className="overflow-hidden rounded-2xl border border-line"><div className="h-16" style={{ background: `rgb(var(--${k}))` }}></div>
        <p className="flex flex-wrap items-center justify-between gap-1 px-3 py-2 text-xs"><code>{`--${k}`}</code>
