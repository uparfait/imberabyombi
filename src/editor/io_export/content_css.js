/* editor/io_export/content_css.js: the document's own styles (paper look: Arial 11pt, black text, its headings, lists,
   tables, checklists), written into exported web pages and e-books. Document styling, not interface colours. */

/* the "app" mark of a project file (.json); the import side recognises project files by it */
export const PROJECT_APP = 'document-editor';

export const CONTENT_CSS = '\n' + [
  '.doc_content{font-family:Arial,sans-serif;font-size:11pt;line-height:1.15;color:#000;white-space:pre-wrap;overflow-wrap:break-word;'
    + 'word-wrap:break-word;tab-size:4;-moz-tab-size:4}',
  '.doc_content p{margin:0}',
