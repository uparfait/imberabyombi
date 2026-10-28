/* editor/io_export/html_to_md.js: Markdown (.md): headings, bold / italic / strike marks, links, images, nested and
   check lists, pipe tables, rules, quotes, code blocks; a page break stays as an HTML page-break div. */
import { download, is_list, is_table, is_break } from '../core/index.js';

export function html_to_md(root) {
  const inline = n => {
    let s = '';
    n.childNodes.forEach(c => {
      if (c.nodeType === 3) { s += c.data.replace(/\u200b/g, '').replace(/([*_`\\[\]])/g, '\\$1'); return; }
      if (c.nodeType !== 1) return;
      const t = c.tagName, st = c.style;
      if (t === 'BR') { s += c.nextSibling ? '  \n' : ''; return; }
      if (t === 'IMG') { s += `![${c.getAttribute('alt') || ''}](${c.getAttribute('src')})`; return; }
      if (/^(UL|OL)$/.test(t)) return;
      let inner = inline(c);
      if (t === 'A') { s += /^data:/i.test(c.getAttribute('href') || '') ? inner : `[${inner}](${c.getAttribute('href')})`; return; }
      if (t === 'CODE') { s += '`' + c.textContent + '`'; return; }
      const bold = /^(B|STRONG)$/.test(t) || /^(bold|[6-9]00)$/.test(st.fontWeight), ital = /^(I|EM)$/.test(t) || st.fontStyle === 'italic';
      const strike = /^(S|DEL|STRIKE)$/.test(t) || /line-through/.test(st.textDecoration || '');
      if (inner.trim()) { if (strike) inner = `~~${inner}~~`; if (ital) inner = `*${inner}*`; if (bold) inner = `**${inner}**`; }
      s += inner;
    });
    return s;
  };
  const list = (l, depth) => {
    let k = parseInt(l.getAttribute('start')) || 1; const out = [];
    Array.from(l.children).forEach(li => {
      if (is_list(li)) { out.push(list(li, depth + 1)); return; }
      const pre = l.classList.contains('checklist') ? (li.getAttribute('data-checked') === 'true' ? '- [x] ' : '- [ ] ') : l.tagName === 'OL' ? `${k++}. ` : '- ';
      out.push('  '.repeat(depth) + pre + inline(li).trim());
      Array.from(li.children).filter(is_list).forEach(sub => out.push(list(sub, depth + 1)));
    });
    return out.join('\n');
  };
  const table = b => {
    const rows = Array.from(b.rows).map(r => '| ' + Array.from(r.cells).map(c => inline(c).replace(/\|/g, '\\|').replace(/\n/g, ' ').trim()).join(' | ') + ' |');
    if (rows.length) { const n = b.rows[0].cells.length; rows.splice(1, 0, '|' + ' --- |'.repeat(n)); }
    return rows.join('\n');
  };
  const blocks = [];
  Array.from(root.children).forEach(b => {
    const t = b.tagName;
    if (/^H[1-6]$/.test(t)) blocks.push('#'.repeat(+t[1]) + ' ' + inline(b).trim());
    else if (t === 'P' && b.classList.contains('title')) blocks.push('# ' + inline(b).trim());
    else if (t === 'P' && b.classList.contains('subtitle')) blocks.push('*' + inline(b).trim() + '*');
    else if (is_list(b)) blocks.push(list(b, 0));
    else if (is_table(b)) blocks.push(table(b));
    else if (t === 'HR') blocks.push('---');
    else if (is_break(b)) blocks.push('<div style="page-break-after: always"></div>');
    else if (t === 'BLOCKQUOTE') blocks.push(inline(b).split('\n').map(x => '> ' + x).join('\n'));
    else if (t === 'PRE') blocks.push('```\n' + b.textContent + '\n```');
    else { const s = inline(b).trim(); blocks.push(s || ''); }
  });
  return blocks.join('\n\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}
export function export_md(root, name) { download(new Blob([html_to_md(root)], { type: 'text/markdown;charset=utf-8' }), name + '.md'); }
