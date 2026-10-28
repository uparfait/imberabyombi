/* editor/io_export/docx_styles.js: the Word document's styles.xml (Arial 11pt defaults, Title, Subtitle, Heading 1–4,
   List Paragraph, Hyperlink): the same sizes and colours as the editor's paragraph styles. */

const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
const sty = (id, name, ppr, rpr, extra = '') => `<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${name}"/><w:basedOn w:val="Normal"/>`
