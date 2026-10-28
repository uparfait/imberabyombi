/* editor/core/reflow.js: pagination engine, part 3: reflow from a page (paged or pageless) and the work after a layout
   change. Absolute images (front / behind text) never move: a page removed by the reflow hands them to the previous page. */
import { el } from './utils.js';
import { state } from './state.js';
import { pages_el } from './refs.js';
import { is_break, is_abs, bodies, page_wraps, first_flow, last_flow } from './dom.js';
import { add_page_after, remove_page, update_page_numbers } from './pages.js';
import { cur_sel, set_cur_sel, overflows, normalize_body, hoist_nested } from './flow.js';
import { push_overflow, pull_up, sig, same_sig, is_blank_body, break_with_rest } from './split.js';
import { fix_list_starts, join_conts, place_abs } from './collect.js';
import { save_sel, restore_sel } from './selection.js';
import { schedule_ui } from './schedule.js';
import { position_img_box } from '../content/index.js';

/* remove an empty page; its absolute images move to prev keeping left / top */
function drop_page(b, prev) { if (prev) Array.from(b.children).filter(is_abs).forEach(e => prev.appendChild(e)); remove_page(b); }
/* a body with no text flow gets one empty paragraph (absolute images stay) */
function ensure_para(b) { if (first_flow(b)) return; Array.from(b.childNodes).forEach(n => { if (!is_abs(n)) n.remove(); }); b.prepend(el('p', {}, '<br>')); }

export function reflow(cur = 0, full = false) {
  if (!pages_el || !bodies().length) return;
  if (state.setup.pageless) { reflow_pageless(); return; }
  set_cur_sel(save_sel());
  let bs = bodies();
  for (let i = Math.max(0, cur - 1); i < bs.length; i++) {
    const b = bs[i];
    normalize_body(b); hoist_nested(b);
    const before = sig(b);
    let next = bs[i + 1] || null;
    if (break_with_rest(b) || overflows(b)) {
      if (!next) { next = add_page_after(b); bs = bodies(); }
      push_overflow(b, next);
    } else {
      while (next) {
        pull_up(b, next);
        if (is_blank_body(next)) { drop_page(next, b); bs = bodies(); next = bs[i + 1] || null; continue; }
        break;
      }
    }
    if (!full && i >= cur && same_sig(before, sig(b))) break;
  }
  bs = bodies();
  for (let j = bs.length - 1; j >= 1; j--) if (is_blank_body(bs[j])) drop_page(bs[j], bs[j - 1]);
  bs = bodies();
  ensure_para(bs[0]);
  const last_b = bs[bs.length - 1];
  if (is_break(last_flow(last_b))) { const nb = add_page_after(last_b); nb.innerHTML = '<p><br></p>'; }
  place_abs(false); fix_list_starts();
  restore_sel(cur_sel); set_cur_sel(null);
