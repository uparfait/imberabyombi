/* live_slot.jsx: the parts of the admin that the reference redrew on their own with innerHTML (side panel, sidebar mini
   calendar, sidebar links, the nested-navigation demo), plus ref helpers that set again, after every draw, the switches
   the actions flip in place (React only writes an attribute when its value changes; the reference drew fresh HTML). */
import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { get_version } from '../store/index.js';

const SLOTS = {};   /* name → redraw function of the slot on screen */

/* first = what the page drew (computed in order with the page, so lorem text matches); draw = how to draw it again.
   Each draw gives fresh DOM like innerHTML did (fresh = false: patched in place, so a clicked link stays connected). */
export function Live_slot({ name, first, draw, fresh = true }) {
  const [own, set_own] = useState(null), latest = useRef(null), count = useRef(0);
