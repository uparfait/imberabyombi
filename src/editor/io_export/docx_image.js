/* editor/io_export/docx_image.js: Word pictures (in line, or wrapped left / right with their border), prepare_images
   (natural sizes; linked images redrawn as PNG data, unreadable ones dropped) and the list numbering definitions. */
import { qsa, to_hex } from '../core/index.js';
