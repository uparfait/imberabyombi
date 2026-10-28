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
  latest.current = draw;
  useLayoutEffect(() => {
    const fn = () => { const jsx = latest.current(); flushSync(() => set_own({ v: get_version(), n: ++count.current, jsx })); };
    SLOTS[name] = fn;
    return () => { if (SLOTS[name] === fn) delete SLOTS[name]; };
  });
  const v = get_version(), mine = !!own && own.v === v;   /* a page draw since the last own draw wins */
  return <Fragment key={!fresh ? 'slot' : mine ? 'r' + own.n : 'v' + v}>{mine ? own.jsx : first}</Fragment>;
}

/* draw one slot again, synchronously (code right after can query the new DOM). false = that slot is not on screen */
export const redraw_slot = name => { const fn = SLOTS[name]; if (fn) fn(); return !!fn; };

/* ref={sync_ref(el => …)}: a new function on every draw, so React calls it after every draw of that element */
export const sync_ref = fn => el => { if (el) fn(el); };
