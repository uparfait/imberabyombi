/* editor/io_export/export_docx.js: Word (.docx) with no external library: the body (paragraphs, lists, tables, pictures,
   links), the page size and margins, the header and footer (with page numbers), the styles and the list numbering. */
import { state, dims, DPI, toast, download } from '../core/index.js';
import { xesc, RELNS, WNS } from './docx_runs.js';
import { list_kind } from './docx_paras.js';
import { blocks_xml } from './docx_table.js';
import { prepare_images, abstract_xml } from './docx_image.js';
import { DOCX_STYLES } from './docx_styles.js';
import { docx_types, DOCX_RELS, docx_core, docx_numbering, docx_doc_rels, docx_header, docx_footer } from './docx_parts.js';
import { zip_store } from './zip_store.js';

const tw = v => Math.round(v * 1440);   /* inches → twentieths of a point */
const sect_xml = (refs, win, hin, m) => `<w:sectPr>${refs}<w:pgSz w:w="${tw(win)}" w:h="${tw(hin)}"${win > hin ? ' w:orient="landscape"' : ''}/>`
  + `<w:pgMar w:top="${tw(m.top)}" w:right="${tw(m.right)}" w:bottom="${tw(m.bottom)}" w:left="${tw(m.left)}" w:header="${tw(Math.max(.3, m.top / 2))}"`
  + ` w:footer="${tw(Math.max(.3, m.bottom / 2))}" w:gutter="0"/></w:sectPr>`;
const num_of = n => `<w:num w:numId="${n.num_id}"><w:abstractNumId w:val="${n.abs}"/><w:lvlOverride w:ilvl="0"><w:startOverride w:val="${n.start}"/></w:lvlOverride></w:num>`;

export async function export_docx(root, name) {
  toast('Preparing Word document…', 0);
  try {
    await prepare_images(root);
    const { win, hin } = dims(), s = state.setup, m = s.margins;
    const rels = [], media = [], nums = [], abstracts = new Map(); let rid = 10, img_n = 0;
    const ctx = {
      content_tw: Math.round((win - m.left - m.right) * 1440), content_px: (win - m.left - m.right) * DPI,
      add_link(href) {
        const id = 'rId' + (++rid); rels.push(`<Relationship Id="${id}" Type="${RELNS}/hyperlink" Target="${xesc(href)}" TargetMode="External"/>`); return id;
      },
      add_media(bytes, ext) {
        const n = ++img_n, id = 'rId' + (++rid); media.push({ name: `word/media/image${n}.${ext}`, data: bytes });
        rels.push(`<Relationship Id="${id}" Type="${RELNS}/image" Target="media/image${n}.${ext}"/>`); return { rid: id, n };
      },
      new_num(l) {
        const kind = list_kind(l); if (!abstracts.has(kind)) abstracts.set(kind, abstracts.size); const num_id = nums.length + 1;
        nums.push({ num_id, abs: abstracts.get(kind), start: parseInt(l.getAttribute('start')) || 1 }); return num_id;
      }
    };
    let body_xml = blocks_xml(root, ctx) || '<w:p/>'; if (body_xml.endsWith('</w:tbl>')) body_xml += '<w:p/>';
    const has_header = s.header && !s.pageless && s.header_html.replace(/<[^>]*>/g, '').trim();
    const has_footer = !s.pageless && ((s.footer && s.footer_html.replace(/<[^>]*>/g, '').trim()) || s.page_numbers);
    const plain = { content_tw: ctx.content_tw, content_px: ctx.content_px };
    let sect_refs = '';
    const files = [];
    if (has_header) {
      rels.push(`<Relationship Id="rIdH1" Type="${RELNS}/header" Target="header1.xml"/>`); sect_refs += '<w:headerReference w:type="default" r:id="rIdH1"/>';
      files.push({ name: 'word/header1.xml', data: docx_header(s.header_html, plain) });
    }
    if (has_footer) {
      rels.push(`<Relationship Id="rIdF1" Type="${RELNS}/footer" Target="footer1.xml"/>`); sect_refs += '<w:footerReference w:type="default" r:id="rIdF1"/>';
      files.push({ name: 'word/footer1.xml', data: docx_footer(s, plain) });
    }
    const doc_xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${WNS}><w:body>${body_xml}${sect_xml(sect_refs, win, hin, m)}</w:body></w:document>`;
    const abs_xml = Array.from(abstracts.entries()).map(([k, id]) => abstract_xml(k, id)).join('');
    const num_xml = nums.map(num_of).join('');
    const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    files.unshift(
      { name: '[Content_Types].xml', data: docx_types(has_header, has_footer) },
      { name: '_rels/.rels', data: DOCX_RELS },
      { name: 'docProps/core.xml', data: docx_core(state.title, now) },
      { name: 'word/document.xml', data: doc_xml },
      { name: 'word/styles.xml', data: DOCX_STYLES },
      { name: 'word/numbering.xml', data: docx_numbering(abs_xml, num_xml) },
