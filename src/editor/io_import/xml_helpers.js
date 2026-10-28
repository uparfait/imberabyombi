/* editor/io_import/xml_helpers.js: XML helpers for the zipped office formats (Word, Excel, PowerPoint, OpenDocument,
   EPUB): parse, elements by local name (any namespace), child elements, folder of a path, relative paths, relationships. */

export const parse_xml = t => new DOMParser().parseFromString(t, 'application/xml');
export const by_tag = (n, local) => n ? Array.from(n.getElementsByTagNameNS('*', local)) : [];
export const kids = (n, local) => n ? Array.from(n.children).filter(c => !local || c.localName === local) : [];
export const dir_of = p => p.replace(/[^/]*$/, '');
