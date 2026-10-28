/* files/file_tile.jsx: one tile of the attachments row above a file field (fileTiles): a thumbnail for images and
   videos, an icon + name + type · size chip for the rest, and the x that removes it. The tile opens #viewer. */
import { ic } from '../icons/index.js';
import { furl, fmt_size, ext_of, file_kind, FICON } from './file_utils.js';
