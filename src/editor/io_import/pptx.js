/* editor/io_import/pptx.js: PowerPoint → HTML: one section per slide (title as a heading, subtitle, bullet text,
   pictures, tables, speaker notes), slides separated by page breaks. PB = the page break markup every import uses. */
import { esc_html, clamp } from '../core/index.js';
import { unzip } from './unzip.js';
import { parse_xml, by_tag, kids, dir_of, resolve_path, rels_of } from './xml_helpers.js';
import { rows_to_table } from './tables.js';

export const PB = '<div class="page_break" contenteditable="false"></div>';

/* a text paragraph: runs and fields (bold / italic kept), line breaks */
function para_html(p) {
  let h = '';
  for (const c of Array.from(p.children)) {
    if (c.localName === 'r' || c.localName === 'fld') {
      const pr = kids(c, 'rPr')[0]; let s = esc_html(by_tag(c, 't').map(x => x.textContent).join(''));
      if (pr && pr.getAttribute('b') === '1') s = `<b>${s}</b>`; if (pr && pr.getAttribute('i') === '1') s = `<i>${s}</i>`; h += s;
    } else if (c.localName === 'br') h += '<br>';
  }
  return h;
}
/* one slide: '<h2>title</h2>' + its shapes in order + the speaker notes */
async function slide_html(z, sp, i) {
  const doc = parse_xml(await z.text(sp)), rel_path = dir_of(sp) + '_rels/' + sp.split('/').pop() + '.rels', rels = rels_of(z.has(rel_path) ? await z.text(rel_path) : '');
  let title = '', body = '';
  const tree = by_tag(doc, 'spTree')[0];
  const shapes = tree ? Array.from(tree.getElementsByTagNameNS('*', '*')).filter(n => n.localName === 'sp' || n.localName === 'pic' || n.localName === 'graphicFrame') : [];
  for (const s of shapes) {
    if (s.localName === 'sp') {
      const ph = by_tag(s, 'ph')[0], type = ph ? (ph.getAttribute('type') || 'body') : '', tx = by_tag(s, 'txBody')[0];
      const paras = tx ? kids(tx, 'p').map(para_html).filter(h => h.replace(/<[^>]+>/g, '').trim()) : [];
      if (!paras.length) continue;
      if ((type === 'title' || type === 'ctrTitle') && !title) { title = paras.join(' '); continue; }
      if (type === 'subTitle') body += paras.map(p => `<p class="subtitle">${p}</p>`).join('');
      else if (type === 'body' || type === 'obj') body += `<ul>${paras.map(p => `<li>${p}</li>`).join('')}</ul>`;
      else body += paras.map(p => `<p>${p}</p>`).join('');
    } else if (s.localName === 'pic') {
      const blip = by_tag(s, 'blip')[0], rel = blip && rels[blip.getAttribute('r:embed')];
      if (rel && !rel.external) {
        const url = await z.data_url(resolve_path(dir_of(sp), rel.target)), ex = by_tag(s, 'ext').find(e => e.hasAttribute('cx'));
        const w = ex ? Math.round(+ex.getAttribute('cx') / 9525) : 400;
        if (url) body += `<p><img src="${url}" alt="" style="width:${clamp(w, 16, 620)}px"></p>`;
      }
    } else {
      const tbl = by_tag(s, 'tbl')[0];
      if (tbl) {
        const rows = kids(tbl, 'tr').map(tr => kids(tr, 'tc').map(tc => by_tag(tc, 'p').map(p => p.textContent).join('\n')));
        if (rows.length) body += rows_to_table(rows, true);
      }
    }
  }
  let notes = '';
  const nr = Object.values(rels).find(r => /notesSlide$/.test(r.type));
  if (nr) {
    const np = resolve_path(dir_of(sp), nr.target);
    if (z.has(np)) {
      const t = by_tag(parse_xml(await z.text(np)), 'sp').filter(s => { const ph = by_tag(s, 'ph')[0]; return ph && ph.getAttribute('type') === 'body'; })
