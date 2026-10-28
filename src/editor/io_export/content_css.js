/* editor/io_export/content_css.js: the document's own styles (paper look: Arial 11pt, black text, its headings, lists,
   tables, checklists), written into exported web pages and e-books. Document styling, not interface colours. */

/* the "app" mark of a project file (.json); the import side recognises project files by it */
export const PROJECT_APP = 'document-editor';

export const CONTENT_CSS = '\n' + [
  '.doc_content{font-family:Arial,sans-serif;font-size:11pt;line-height:1.15;color:#000;white-space:pre-wrap;overflow-wrap:break-word;'
    + 'word-wrap:break-word;tab-size:4;-moz-tab-size:4}',
  '.doc_content p{margin:0}',
  '.doc_content h1,.doc_content h2,.doc_content h3,.doc_content h4,.doc_content h5,.doc_content h6{margin:0;font-weight:400;line-height:1.15}',
  '.doc_content h1{font-size:20pt;padding:20pt 0 6pt}',
  '.doc_content h2{font-size:16pt;padding:18pt 0 6pt}',
  '.doc_content h3{font-size:14pt;padding:16pt 0 4pt;color:#434343}',
  '.doc_content h4{font-size:12pt;padding:14pt 0 4pt;color:#666666}',
  '.doc_content h5,.doc_content h6{font-size:11pt;padding:12pt 0 4pt;color:#666666}',
  '.doc_content p.title{font-size:26pt;padding:0 0 3pt}',
  '.doc_content p.subtitle{font-size:15pt;padding:0 0 16pt;color:#666666}',
  '.doc_content ul,.doc_content ol{margin:0;padding-left:.5in}',
  '.doc_content li{padding-left:2px}',
  '.doc_content blockquote{margin:0 0 0 .5in;padding:0}',
  ".doc_content pre{margin:0;font-family:'Source Code Pro','Courier New',monospace;font-size:10pt;background:#f8f9fa;padding:6pt}",
  '.doc_content hr{border:0;border-top:1px solid #9aa0a6;margin:6pt 0}',
  '.doc_content a{color:#1155cc;text-decoration:underline}',
  '.doc_content img{max-width:100%;height:auto;vertical-align:bottom;box-sizing:border-box}',
  '.doc_content table{border-collapse:collapse;width:100%;table-layout:fixed;margin:0;--bw:1px;--bc:#000000}',
  '.doc_content td,.doc_content th{border:var(--bw) solid var(--bc);padding:var(--pad,5pt);vertical-align:top;overflow-wrap:anywhere;min-width:20px}',
  '.doc_content th{font-weight:700;text-align:left}',
  '.doc_content ul.checklist{list-style:none;padding-left:.4in}',
  '.doc_content ul.checklist>li{position:relative}',
  '.doc_content ul.checklist>li::before{content:"";position:absolute;left:-22px;top:.18em;width:12px;height:12px;border:1.5px solid #5f6368;'
    + 'border-radius:2px;background:#fff;cursor:pointer}',
  '.doc_content ul.checklist>li[data-checked="true"]::before{background:#1a73e8 url("data:image/svg+xml;utf8,'
    + "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='white' d='M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z'/></svg>\")"
    + ' center/11px no-repeat;border-color:#1a73e8}',
  '.doc_content ul.checklist[data-strike]>li[data-checked="true"]{text-decoration:line-through;color:#80868b}',
  '.doc_content .page_break{height:0;overflow:hidden;user-select:none}',
  '.doc_content .cmt{background:rgba(251,188,4,.3);border-bottom:2px solid #fbbc04}',
  '.doc_content .cmt.active{background:rgba(251,188,4,.65)}',
  '.doc_content img[data-pos="wrap_left"]{float:left;margin:2px 14px 8px 0}',
  '.doc_content img[data-pos="wrap_right"]{float:right;margin:2px 0 8px 14px}',
  '.doc_content img[data-pos="break"]{display:block;margin:8px auto}',
  '.doc_content img[data-pos="break"]{display:block;margin:6px auto 6px 0}',
  '.doc_content img[data-pos="break"][data-align="center"]{margin-left:auto;margin-right:auto}',
  '.doc_content img[data-pos="break"][data-align="right"]{margin-left:auto;margin-right:0}',
  '.doc_content td[data-hdr],.doc_content th[data-hdr]{font-weight:700}',
  '.doc_content table[data-style="minimal"] td,.doc_content table[data-style="minimal"] th{border-left-color:transparent;border-right-color:transparent}',
  '.doc_content .file_chip{display:inline-block;max-width:100%;padding:2px 10px;margin:1px 0;border:1px solid #dadce0;border-radius:14px;background:#f1f3f4;'
    + 'color:#1f1f1f;text-decoration:none;font-size:10pt;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;vertical-align:bottom}',
  '.doc_content .file_chip:hover{background:#e8eaed}'
].join('\n') + '\n';
