/* feedback/basics.js: the feedback system's basics: reduced motion, the shortcut label for this device, sleep,
   the icon and title of each tone, and staff_page() (bottom-right notifications belong to staff pages only). */
import { auth } from '../auth/index.js';

/* =====================================================================
   7b. FEEDBACK SYSTEM
       Inline (instant, on the component): field errors, form results, blocked actions, media errors.
       notify() bottom-right: completed background actions (saved, deleted, copied…) + system issues.
       Loading: ONE segmented spinner everywhere (busy buttons, tables, the floating #loader).
   ===================================================================== */
export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Shortcut label for this device: ⌘K on Apple (Mac, iPhone, iPad), Ctrl K on Windows / Linux, nothing on touch-only devices
   (no keyboard to press it on). The shortcut itself works with either key. */
export const key_hint = k => !matchMedia('(any-pointer: fine)').matches ? '' : /Mac|iPhone|iPad|iPod/i.test(navigator.userAgentData?.platform || navigator.platform || navigator.userAgent) ? '⌘' + k : 'Ctrl ' + k;
export const sleep = ms => new Promise(r => setTimeout(r, ms));
export const TICON = { ok: 'check', bad: 'x', warn: 'bell', info: 'help' };
export const TTITLE = { ok: 'Done', bad: 'Something went wrong', warn: 'Heads up', info: 'Note' };

/* Bottom-right notifications belong to staff (admin) pages. Public and account pages get the same message inline
   instead: in the form or section that caused it (or at the top of the page). */
export const staff_page = () => { try { return location.hash.startsWith('#/admin') && !!auth.user; } catch { return false; } };
