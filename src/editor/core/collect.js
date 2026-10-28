/* editor/core/collect.js: pagination engine, part 4: ordered-list numbering across pages, joining split parts, the
   whole tab's html (split parts re-joined), and absolute images (front / behind text) kept on their page: collect_html
   tags each with data-page="<page index>" and place_abs() puts it back on that page after a full reflow. */
import { qsa } from './utils.js';
import { bodies, is_abs, same_kind, first_flow, last_flow, prev_flow } from './dom.js';
