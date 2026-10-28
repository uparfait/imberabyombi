/* editor/core/state.js: the document state (source "state"): page setup, tabs (each with its own html and undo / redo
   stacks), view flags; the active tab, the file base name, page size in px, and tab helpers (move, duplicate). */
import { DPI, PAPER } from './constants.js';
import { uid } from './utils.js';

export function default_setup() {
  return { paper: 'letter', orientation: 'portrait', margins: { top: 1, bottom: 1, left: 1, right: 1 }, page_color: '#ffffff', pageless: false,
    header: false, footer: false, page_numbers: false, header_html: '', footer_html: '' };
}
export function new_tab(name, html) { return { id: uid(), name, html: html || '<p><br></p>', undo: [], redo: [] }; }

export const state = {
  title: 'Untitled document', setup: default_setup(), tabs: [], active: null, zoom: 1, mode: 'edit', spell: true, comments: [],
  sidebar: typeof innerWidth === 'number' ? innerWidth >= 1000 : true, show_comments: false, show_ruler: true, menus: true
