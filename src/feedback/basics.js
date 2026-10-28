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
