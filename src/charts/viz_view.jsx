/* charts/viz_view.jsx: the Charts & KPIs page (#/admin/charts): date range, group links, the KPIs, then one card per chart.
   Charts draw at their real width after the page is on screen (AFTER) and redraw when their own box changes width. */
import { useLayoutEffect, useState } from 'react';
import { qsa, lorem, hash_str } from '../lib/index.js';
import { ui, after_render, before_render, rerender } from '../store/index.js';
import { page_title, help_tip } from '../ui/index.js';
import { count_up } from '../router/index.js';
import { VIZ, VIZGROUPS } from './viz_charts.js';
