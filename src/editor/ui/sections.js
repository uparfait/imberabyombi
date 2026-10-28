/* editor/ui/sections.js: the document as sections for the outline: a heading (Title, Heading 1–4) and everything after
   it up to the next heading of the same or a higher level. A move or delete rewrites the whole document (the pages'
   html joined, so split lists and tables are whole again), then the pages reflow: one undo step. Only headings that sit
