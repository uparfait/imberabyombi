/* editor/content/install.js: install_content(): the source's top-level listeners of this area (images, links, editor
   events, paste & drop). Called by core's editor_start after the refs are filled; returns the cleanup. */
import { qs, pages_el } from '../core/index.js';
import { install_img_box } from './img_box_events.js';
