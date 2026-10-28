/* editor/core/flow.js: pagination engine, part 1 (source "pagination engine").
   Content lives in one contenteditable body per page. After each edit we push overflowing blocks to the next page
   and pull blocks back when there is room. Paragraphs, lists and tables can be split across pages; split parts carry
   data-cont="1" and are re-joined on save/export. This part: measuring, cleaning a body, moving / merging blocks.
   Absolute images (front / behind text) are skipped everywhere: never wrapped, measured or moved. */
import { BLOCK_RE, TEXT_BLOCK_RE } from './constants.js';
