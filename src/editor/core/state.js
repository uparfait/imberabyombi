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
  sidebar: typeof innerWidth === 'number' ? innerWidth >= 1000 : true, show_comments: false, show_ruler: false, menus: true
};
state.tabs.push(new_tab('Tab 1')); state.active = state.tabs[0].id;

/* persist.js registers its debounced save here (state.js stays free of imports that reach other areas) */
let on_change = () => {};
export function set_on_change(fn) { on_change = fn; }
export function state_changed() { on_change(); }

export function active_tab() { return state.tabs.find(t => t.id === state.active); }
export function file_base() { return (state.title || 'document').replace(/[\\/:*?"<>|]+/g, '').trim() || 'document'; }

export function dims() {
  const p = PAPER[state.setup.paper] || PAPER.letter; let w = p.w, h = p.h;
  if (state.setup.orientation === 'landscape') [w, h] = [h, w];
  return { w: Math.round(w * DPI), h: Math.round(h * DPI), win: w, hin: h };
}

/* tab order helpers (sidebar drag-reorder, Move up / down). move_tab returns the moved tab (or null). */
export function move_tab(from, to) {
  const n = state.tabs.length;
  if (from < 0 || from >= n) return null;
  to = Math.max(0, Math.min(n - 1, to));
  const [t] = state.tabs.splice(from, 1); state.tabs.splice(to, 0, t); state_changed();
  return t;
}
/* a copy of tab t: every field (folded headings, …) deep-copied, but a fresh id and empty undo / redo stacks.
   html defaults to t.html; pass the live html (collect_html()) when t is the active tab. Not inserted: the caller places it. */
export function duplicate_tab(t, name = t.name + ' (copy)', html = t.html) {
  const { undo, redo, id, ...rest } = t;
  return { ...JSON.parse(JSON.stringify(rest)), id: uid(), name, html: html || '<p><br></p>', undo: [], redo: [] };
}
