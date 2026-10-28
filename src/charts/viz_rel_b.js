/* charts/viz_rel_b.js: relationship charts, part 2: Sankey diagram, network graph, dendrogram.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { esc, cap, lorem } from '../lib/index.js';
import { round1, linear, uwords, scale_color, fit } from './viz_math.js';
import { frame, svg, band, dot, mark_group } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

export const VIZ_REL_B = {
  sankey: { t: 'Sankey diagram', g: 'rel', d: 'Flows from sources, through stages, to outcomes.', f(w) {
    const cols = [['Search', 'Social', 'Email'], ['Pricing', 'Docs'], ['Signed up', 'Left']];
    const links = [[0, 0, 0, 30], [0, 0, 1, 20], [0, 1, 0, 12], [0, 1, 1, 18], [0, 2, 0, 15], [0, 2, 1, 5], [1, 0, 0, 34], [1, 0, 1, 23], [1, 1, 0, 14], [1, 1, 1, 26]];
    const f = frame(w, 260, { l: 8, r: 8, t: 10, b: 10 }), nw = 12, col_x = i => f.l + (f.iw - nw) * i / (cols.length - 1), gap = 14;
    const val = (c, i) => Math.max(links.filter(l => l[0] === c && l[1] === i).reduce((s, l) => s + l[3], 0),
      links.filter(l => l[0] === c - 1 && l[2] === i).reduce((s, l) => s + l[3], 0));
    /* one scale for every column (so a flow is equally thick at both ends), each column centred */
    const tots = cols.map((nodes, c) => nodes.reduce((s, _, i) => s + val(c, i), 0)), k = Math.min(...cols.map((nodes, c) => (f.ih - gap * (nodes.length - 1)) / tots[c]));
    const pos = cols.map((nodes, c) => { let y = f.t + (f.ih - tots[c] * k - gap * (nodes.length - 1)) / 2;
      return nodes.map((_, i) => { const h = val(c, i) * k, o = { y, h, k, out: y, in: y }; y += h + gap; return o; }); });
    const flows = links.map(([c, a, b, v]) => {
      const na = pos[c][a], nb = pos[c + 1][b], h = v * na.k, x0 = col_x(c) + nw, x1 = col_x(c + 1), y0 = na.out + h / 2, y1 = nb.in + h / 2;
      na.out += h; nb.in += h; const mx = (x0 + x1) / 2;
      return mark_group(`${cols[c][a]} → ${cols[c + 1][b]}`, [[v, 'People', c ? null : a]],
        `<path class="mark mark_flow" d="M${round1(x0)} ${round1(y0)}C${round1(mx)} ${round1(y0)} ${round1(mx)} ${round1(y1)} ${round1(x1)} ${round1(y1)}"`
        + ` style="stroke:${c ? 'rgb(var(--muted))' : scale_color(a)};stroke-width:${round1(Math.max(1, h))}"/>`); }).join('');
    return { svg: svg(f, flows + cols.map((nodes, c) => nodes.map((k, i) => { const o = pos[c][i], x = col_x(c), last = c === cols.length - 1;
      return `<rect x="${round1(x)}" y="${round1(o.y)}" width="${nw}" height="${round1(o.h)}" rx="3" style="fill:${c ? 'rgb(var(--fg))' : scale_color(i)}"/>`
        + `<text x="${round1(last ? x - 6 : x + nw + 6)}" y="${round1(o.y + o.h / 2 + 4)}" text-anchor="${last ? 'end' : 'start'}" class="value_label">${k}</text>`; })
      .join('')).join(''), 'Sankey diagram'),
      legend: legend(cols[0], 'rect'), table: [['From', 'To', 'People'], links.map(([c, a, b, v]) => [cols[c][a], cols[c + 1][b], v])] }; } },
  network: { t: 'Network graph', g: 'rel', d: 'Who connects to whom; size = number of links, colour = community.', f(w) {
    const n = 14, nodes = Array.from({ length: n }, (_, i) => ({ k: cap(lorem.w(1)), g: i % 3 })), edges = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if ((nodes[i].g === nodes[j].g ? .42 : .07) > lorem.r()) edges.push([i, j]);
    const f = frame(w, 270, { l: 10, r: 10, t: 10, b: 10 }), deg = nodes.map((_, i) => edges.filter(e => e.includes(i)).length), cx = f.w / 2, cy = f.t + f.ih / 2;
    const rad = Math.min(f.iw, f.ih) / 2 - 28;
    nodes.forEach((o, i) => { const ga = o.g / 3 * Math.PI * 2 + .5, gx = cx + Math.cos(ga) * rad * .55, gy = cy + Math.sin(ga) * rad * .55;
      const k = nodes.filter((p, j) => j < i && p.g === o.g).length, a = k / 5 * Math.PI * 2; o.x = gx + Math.cos(a) * rad * .38; o.y = gy + Math.sin(a) * rad * .38; });
    return { svg: svg(f, edges.map(([a, b]) => `<line x1="${round1(nodes[a].x)}" y1="${round1(nodes[a].y)}" x2="${round1(nodes[b].x)}" y2="${round1(nodes[b].y)}"`
        + ` style="stroke:rgb(var(--muted) / .45);stroke-width:1"/>`).join('')
      + nodes.map((o, i) => mark_group(o.k, [[deg[i], 'Links', o.g]], `<circle class="hit_area" cx="${round1(o.x)}" cy="${round1(o.y)}" r="14"/>`
        + `<circle class="mark" cx="${round1(o.x)}" cy="${round1(o.y)}" r="${round1(4 + deg[i] * 1.3)}"`
        + ` style="fill:${scale_color(o.g)};stroke:rgb(var(--surface));stroke-width:2"/>`))
        .join(''), 'Network graph'),
      legend: legend(['Community 1', 'Community 2', 'Community 3'], 'dot'), table: [['Node', 'Community', 'Links'], nodes.map((o, i) => [o.k, o.g + 1, deg[i]])] }; } },
