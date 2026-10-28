/* editor/content/install.js: install_content(): the source's top-level listeners of this area (images, links, editor
   events, paste & drop). Called by core's editor_start after the refs are filled; returns the cleanup. */
import { qs, pages_el } from '../core/index.js';
import { install_img_box } from './img_box_events.js';
import { install_link_bubble } from './link_bubble.js';
import { on_image_replace } from './img_io.js';
import { pages_keydown, pages_beforeinput, pages_input } from './keys.js';
import { pages_click, pages_pointerdown, pages_dragstart, pages_mouseup, pages_mousedown, pages_dblclick } from './pointer.js';
import { pages_paste, drop_handler, window_dragover } from './paste.js';

export function install_content() {
  const offs = [install_img_box(), install_link_bubble()];
  const on = (t, k, f, o) => { if (!t) return; t.addEventListener(k, f, o); offs.push(() => t.removeEventListener(k, f, o)); };
  on(qs('#image_replace'), 'change', on_image_replace);
  const p = pages_el;
