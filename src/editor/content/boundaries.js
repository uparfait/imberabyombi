/* editor/content/boundaries.js: the caret at a page boundary: at the start / end of a page body, on its first / last
   line, and Backspace / Delete across two pages (merging the split paragraph back, removing a page break).
   Absolute images (front / behind text) are not text: the flow helpers (first_flow, last_flow) skip them. */
