/* editor/io_import/xml_helpers.js: XML helpers for the zipped office formats (Word, Excel, PowerPoint, OpenDocument,
   EPUB): parse, elements by local name (any namespace), child elements, folder of a path, relative paths, relationships. */

export const parse_xml = t => new DOMParser().parseFromString(t, 'application/xml');
export const by_tag = (n, local) => n ? Array.from(n.getElementsByTagNameNS('*', local)) : [];
export const kids = (n, local) => n ? Array.from(n.children).filter(c => !local || c.localName === local) : [];
export const dir_of = p => p.replace(/[^/]*$/, '');
export function resolve_path(dir, rel) {
  rel = (rel || '').split('#')[0]; const parts = rel.startsWith('/') ? [] : dir.split('/').filter(Boolean);
  rel.split('/').forEach(p => { if (p === '..') parts.pop(); else if (p && p !== '.') parts.push(p); });
  return parts.join('/');
}
export function rels_of(text) {
  const m = {}; if (!text) return m;
  by_tag(parse_xml(text), 'Relationship').forEach(r => {
    m[r.getAttribute('Id')] = { target: r.getAttribute('Target') || '', type: r.getAttribute('Type') || '', external: r.getAttribute('TargetMode') === 'External' };
