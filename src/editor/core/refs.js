/* editor/core/refs.js: DOM references, filled by editor_start(root) (never looked up at module load).
   refs.<id> = the element with that (snake_case) id inside the editor root: refs.pages, refs.scroller, refs.hruler,
   refs.vruler, refs.workspace, refs.toolbar, refs.doc_title, refs.find_panel, refs.size_input, refs.tab_list, …
   plus refs.root (the editor root) and refs.pages_el (= refs.pages). Any other key is looked up by id on first use
