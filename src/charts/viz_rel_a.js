/* charts/viz_rel_a.js: relationship charts, part 1: scatter, bubble, heatmap, correlogram, radar.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { fmt_hour } from '../lib/index.js';
import { round1, num, linear, rnd, gauss, SER, scale_color, sequential, diverging, fit, tip_text } from './viz_math.js';
import { frame, svg, y_axis, path_of, dot, mark_group } from './viz_svg.js';
import { legend, scale_legend } from './viz_legend.jsx';

/* the 0..100 labels under a scatter or bubble chart */
const x_ticks = (f, xs) => [0, 25, 50, 75, 100].map(t => `<text x="${round1(xs(t))}" y="${f.h - 8}" text-anchor="middle">${t}</text>`).join('');

export const VIZ_REL_A = {
  scatter: { t: 'Scatter plot', g: 'rel', d: 'How two measures move together, by group (3 groups max).', f(w) {
    const gr = SER.slice(0, 3), pts = gr.flatMap((_, g) => Array.from({ length: 16 }, () => {
      const xv = rnd(5, 95); return { g, x: xv, y: Math.max(2, Math.min(98, xv * (.4 + g * .25) + 20 + gauss() * 10)) }; }));
    const f = frame(w, 260), ax = y_axis(f, 100), xs = linear(0, 100, f.l, f.l + f.iw);
    return { svg: svg(f, ax.g + x_ticks(f, xs) + pts.map(p => mark_group(gr[p.g], [[`${round1(p.x)}, ${round1(p.y)}`, 'x, y', p.g]],
      `<circle class="hit_area" cx="${round1(xs(p.x))}" cy="${round1(ax.y(p.y))}" r="12"/>${dot(xs(p.x), ax.y(p.y), scale_color(p.g))}`)).join(''), 'Scatter plot'),
      legend: legend(gr, 'dot'), table: [['Group', 'x', 'y'], pts.map(p => [gr[p.g], round1(p.x), round1(p.y)])] }; } },
  bubble: { t: 'Bubble chart', g: 'rel', d: 'A scatter plot where dot size shows a third measure.', f(w) {
    const gr = SER.slice(0, 2), pts = gr.flatMap((_, g) => Array.from({ length: 8 }, () => ({ g, x: rnd(8, 92), y: rnd(10, 90), s: rnd(5, 100) })));
    const f = frame(w, 260), ax = y_axis(f, 100), xs = linear(0, 100, f.l, f.l + f.iw), rs = s => 4 + Math.sqrt(s) * 2.2;
    return { svg: svg(f, ax.g + x_ticks(f, xs) + pts.sort((a, b) => b.s - a.s).map(p => mark_group(gr[p.g],
      [[num(p.s), 'Size', p.g], [`${round1(p.x)}, ${round1(p.y)}`, 'x, y', null]],
      `<circle class="mark" cx="${round1(xs(p.x))}" cy="${round1(ax.y(p.y))}" r="${round1(Math.max(12, rs(p.s)))}" style="fill:transparent"/>`
      + `<circle class="mark" cx="${round1(xs(p.x))}" cy="${round1(ax.y(p.y))}" r="${round1(rs(p.s))}"`
      + ` style="fill:color-mix(in srgb, ${scale_color(p.g)} 60%, transparent);stroke:rgb(var(--surface));stroke-width:2"/>`)).join(''), 'Bubble chart'),
      legend: legend(gr, 'dot'), table: [['Group', 'x', 'y', 'Size'], pts.map(p => [gr[p.g], round1(p.x), round1(p.y), num(p.s)])] }; } },
  heatmap: { t: 'Heatmap', g: 'rel', d: 'Values on a grid (day × hour). Darker = more.', f(w) {
    const days = Array.from({ length: 7 }, (_, i) => new Date(2026, 9, 25 + i).toLocaleDateString(undefined, { weekday: 'short' }));
    const hrs = Array.from({ length: 12 }, (_, i) => 8 + i);
    const v = days.map((_, d) => hrs.map(h => Math.max(0, Math.round((d % 6 ? 1 : .3) * (20 + 30 * Math.sin((h - 8) / 11 * Math.PI)) + rnd(-8, 8)))));
    const mx = Math.max(...v.flat());
    const f = frame(w, 230, { l: 40, b: 26, r: 10 }), cw = f.iw / hrs.length, ch = f.ih / days.length;
    return { svg: svg(f, v.map((r, d) => r.map((n, h) => `<rect class="mark mark_cell" x="${round1(f.l + h * cw + 1)}" y="${round1(f.t + d * ch + 1)}"`
        + ` width="${round1(cw - 2)}"`
        + ` height="${round1(ch - 2)}" rx="3" style="fill:${sequential(n / mx)}" ${tip_text(`${days[d]}, ${fmt_hour(hrs[h])}`, [[n, 'Visits', null]])}/>`).join('')
        + `<text x="${f.l - 8}" y="${round1(f.t + d * ch + ch / 2 + 4)}" text-anchor="end">${days[d]}</text>`).join('')
      + hrs.map((h, i) => i % Math.ceil(hrs.length / Math.max(1, f.iw / 40)) ? ''
        : `<text x="${round1(f.l + i * cw + cw / 2)}" y="${f.h - 8}" text-anchor="middle">${fmt_hour(h)}</text>`).join(''), 'Heatmap'),
      legend: scale_legend('0', [.1, .3, .5, .7, 1].map(sequential), mx), table: [['Day', ...hrs.map(fmt_hour)], days.map((k, d) => [k, ...v[d]])] }; } },
  correlogram: { t: 'Correlogram', g: 'rel', d: 'How strongly each pair of measures moves together (−1 to +1).', f(w) {
    const k = ['Visits', 'Signups', 'Revenue', 'Costs', 'Tickets', 'Churn'], n = k.length, m = k.map((_, i) => k.map((__, j) => i === j ? 1 : null));
    for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) m[i][j] = m[j][i] = round1(Math.max(-1, Math.min(1, (i + j) % 3 ? rnd(-.9, .95) : rnd(-.3, .3))) * 100) / 100;
    const f = frame(w, 270, { l: 64, t: 12, b: 50, r: 10 }), cs = Math.min(f.iw, f.ih) / n, x0 = f.l, y0 = f.t;
    return { svg: svg(f, m.map((r, i) => r.map((c, j) => mark_group(`${k[i]} × ${k[j]}`, [[c.toFixed(2), 'Correlation', null]],
        `<rect class="mark mark_cell" x="${round1(x0 + j * cs + 1)}" y="${round1(y0 + i * cs + 1)}" width="${round1(cs - 2)}" height="${round1(cs - 2)}" rx="3"`
        + ` style="fill:${diverging(c)}"/>${cs > 30 ? `<text class="${Math.abs(c) > .55 ? 'inner_label' : ''}" x="${round1(x0 + j * cs + cs / 2)}"`
        + ` y="${round1(y0 + i * cs + cs / 2 + 4)}" text-anchor="middle">${c.toFixed(1)}</text>` : ''}`)).join('')
