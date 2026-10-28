/* charts/viz_time_b.js: change over time, part 2: candlestick, slope, Gantt, calendar heatmap.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { esc, fmt_d, ymd, add_d } from '../lib/index.js';
import { round1, linear, ticks, rnd, uwords, sequential, fit, pct, spread, tip_text } from './viz_math.js';
import { frame, svg, band, x_labels, dot, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';
import { legend, scale_legend } from './viz_legend.jsx';

export const VIZ_TIME_B = {
  candle: { t: 'Candlestick chart', g: 'time', d: 'Open, high, low and close per day. Hollow = up, filled = down.', f(w) {
    let c = 100; const days = Array.from({ length: 20 }, (_, i) => {
      const o = c, cl = o + rnd(-6, 6.5), hi = Math.max(o, cl) + rnd(.5, 4), lo = Math.min(o, cl) - rnd(.5, 4); c = cl;
      return { k: fmt_d(ymd(add_d(new Date(), i - 19))).replace(/,? \d{4}$/, ''), o, c: cl, hi, lo }; });
    const f = frame(w, 250), lo = Math.min(...days.map(d => d.lo)), hi = Math.max(...days.map(d => d.hi)), ts = ticks(lo, hi), y = linear(ts[0], ts.at(-1), f.t + f.ih, f.t);
    const x = band(days.length, f.l, f.w - f.r), bw = Math.min(12, x.bw * .55);
    return { svg: svg(f, ts.map(v => `<line class="grid_line" x1="${f.l}" x2="${f.w - f.r}" y1="${round1(y(v))}" y2="${round1(y(v))}"/>`
        + `<text x="${f.l - 8}" y="${round1(y(v)) + 3.5}" text-anchor="end">${v}</text>`).join('') + days.map((d, i) => {
      const up = d.c >= d.o, col = up ? 'var(--series_2)' : 'var(--series_1)';
      return mark_group(d.k, [[round1(d.o), 'Open', null], [round1(d.hi), 'High', null], [round1(d.lo), 'Low', null], [round1(d.c), 'Close', null]], hit_col(f, x, i)
        + `<line x1="${round1(x(i))}" x2="${round1(x(i))}" y1="${round1(y(d.hi))}" y2="${round1(y(d.lo))}" style="stroke:${col};stroke-width:1.5"/>`
        + `<rect class="mark" x="${round1(x(i) - bw / 2)}" y="${round1(y(Math.max(d.o, d.c)))}" width="${round1(bw)}"`
        + ` height="${round1(Math.max(1.5, Math.abs(y(d.o) - y(d.c))))}" rx="2" style="fill:${up ? 'rgb(var(--surface))' : col};stroke:${col};stroke-width:1.5"/>`); }).join('')
      + x_labels(f, days.map(d => d.k), x), 'Candlestick chart'),
      legend: legend(['Up (hollow)', 'Down (filled)'], 'rect', ['var(--series_2)', 'var(--series_1)']),
      table: [['Day', 'Open', 'High', 'Low', 'Close'], days.map(d => [d.k, round1(d.o), round1(d.hi), round1(d.lo), round1(d.c)])] }; } },
  slope: { t: 'Slope chart', g: 'time', d: 'Change between two moments for each item.', f(w) {
    const c = uwords(6), a = c.map(() => rnd(20, 80)), b = a.map(v => Math.max(5, v + rnd(-25, 25))), f = frame(w, 260, { l: 92, r: 92, t: 30, b: 16 });
    const y = linear(0, 100, f.t + f.ih, f.t), xa = f.l + 10, xb = f.w - f.r - 10;
    const top = b.map((v, i) => v - a[i]).reduce((m, d, i, arr) => Math.abs(d) > Math.abs(arr[m]) ? i : m, 0);
    const la = spread(a.map(v => y(v) + 4)), lb = spread(b.map(v => y(v) + 4));
    const ab = i => `x1="${xa}" x2="${xb}" y1="${round1(y(a[i]))}" y2="${round1(y(b[i]))}"`;
    return { svg: svg(f, `<text x="${xa}" y="14" text-anchor="middle">2025</text><text x="${xb}" y="14" text-anchor="middle">2026</text>`
        + `<line class="base_line" x1="${xa}" x2="${xa}" y1="${f.t}" y2="${f.t + f.ih}"/><line class="base_line" x1="${xb}" x2="${xb}" y1="${f.t}" y2="${f.t + f.ih}"/>`
      + c.map((k, i) => { const col = i === top ? 'var(--series_1)' : 'rgb(var(--muted) / .6)';
        return mark_group(k, [[round1(a[i]), '2025', null], [round1(b[i]), '2026', i === top ? 0 : null]],
          `<line class="hit_line" ${ab(i)}/><line class="series_line" ${ab(i)} style="stroke:${col}"/>${dot(xa, y(a[i]), col)}${dot(xb, y(b[i]), col)}`)
          + `<text x="${xa - 10}" y="${round1(la[i])}" text-anchor="end">${esc(fit(k, f.l - 24))} ${round1(a[i])}</text>`
          + `<text x="${xb + 10}" y="${round1(lb[i])}">${round1(b[i])}</text>`; }).join(''), 'Slope chart'),
      table: [['Item', '2025', '2026'], c.map((k, i) => [k, round1(a[i]), round1(b[i])])] }; } },
  gantt: { t: 'Gantt chart', g: 'time', d: 'Tasks on a timeline, with a today line and milestones.', f(w) {
    const t = uwords(6), wk = 10, d = t.map((_, i) => {
      const s = Math.min(wk - 2, Math.round(i * 1.3 + rnd(0, 1.5))); return { s, e: Math.min(wk, s + Math.round(rnd(2, 4))), done: rnd(0, 1) }; });
    const f = frame(w, 250, { l: 92, b: 28 }), x = linear(0, wk, f.l, f.l + f.iw), y = band(t.length, f.t, f.t + f.ih), bh = Math.min(18, y.bw * .55), today = 4.4;
    const bar = (i, wd, style) => `x="${round1(x(d[i].s))}" y="${round1(y(i) - bh / 2)}" width="${round1(wd)}" height="${round1(bh)}" rx="4" style="${style}"`;
    return { svg: svg(f, Array.from({ length: wk + 1 }, (_, i) => `<line class="grid_line" y1="${f.t}" y2="${f.t + f.ih}" x1="${round1(x(i))}" x2="${round1(x(i))}"/>`
        + `${i < wk && (i % Math.ceil(10 / Math.max(1, f.iw / 60)) === 0)
          ? `<text x="${round1((x(i) + x(i + 1)) / 2)}" y="${f.h - 8}" text-anchor="middle">W${i + 1}</text>` : ''}`).join('')
      + t.map((k, i) => mark_group(k, [[`W${d[i].s + 1}–W${d[i].e}`, 'Weeks', null], [pct(d[i].done), 'Done', 0]], hit_row(f, y, i)
