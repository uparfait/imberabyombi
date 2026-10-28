/* editor/io_export/docx_styles.js: the Word document's styles.xml (Arial 11pt defaults, Title, Subtitle, Heading 1–4,
   List Paragraph, Hyperlink): the same sizes and colours as the editor's paragraph styles. */

const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
const sty = (id, name, ppr, rpr, extra = '') => `<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${name}"/><w:basedOn w:val="Normal"/>`
  + `<w:next w:val="Normal"/><w:qFormat/>${extra}${ppr ? `<w:pPr>${ppr}</w:pPr>` : ''}${rpr ? `<w:rPr>${rpr}</w:rPr>` : ''}</w:style>`;

export const DOCX_STYLES = `${XML}<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">`
  + '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="Arial" w:cs="Arial"/><w:sz w:val="22"/><w:szCs w:val="22"/>'
  + '<w:lang w:val="en-US"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="0" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault>'
