/* ── Account pages (sign in, forgot password, 2-step verification, set password): one minimal, mobile-first shell.
      Full-bleed on phones, one bordered column from sm up. All of them are demos: any details are accepted. ──
   account/auth_shell.jsx: that shell, the links to the other account pages, and the password field with its eye button. */
import { ic } from '../icons/index.js';
import { logo, theme_btn } from '../ui/index.js';
import { cfg } from '../config/index.js';

/* body: the page's form and links (JSX) */
export const auth_shell = (title, text, body) => (
  <main id="main" className="flex min-h-[100dvh] flex-col">
