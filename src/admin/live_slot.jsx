/* live_slot.jsx: the parts of the admin that the reference redrew on their own with innerHTML (side panel, sidebar mini
   calendar, sidebar links, the nested-navigation demo), plus ref helpers that set again, after every draw, the switches
   the actions flip in place (React only writes an attribute when its value changes; the reference drew fresh HTML). */
import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
