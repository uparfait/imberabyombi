/* editor/content/img_io.js: images in and out: insert at the caret (insert_image, insert_image_file), copy to the
   clipboard, download, and the "Replace image › Upload from computer" file input (#image_replace). */
import { el, toast, download, read_as_data_url, restore_focus, begin_op, end_op, body_index } from '../core/index.js';
import { can_edit, previewing } from '../format/index.js';
import { data_ur_lto_blob } from '../io_import/index.js';
import { load_img, img_op, CROSS_MSG } from './img_ops.js';
