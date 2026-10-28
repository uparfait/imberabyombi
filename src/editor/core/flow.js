/* editor/core/flow.js: pagination engine, part 1 (source "pagination engine").
   Content lives in one contenteditable body per page. After each edit we push overflowing blocks to the next page
   and pull blocks back when there is room. Paragraphs, lists and tables can be split across pages; split parts carry
