/* ── Account pages (sign in, forgot password, 2-step verification, set password): one minimal, mobile-first shell.
      Full-bleed on phones, one bordered column from sm up. All of them are demos: any details are accepted. ──
   account/auth_shell.jsx: that shell, the links to the other account pages, and the password field with its eye button. */
import { ic } from '../icons/index.js';
import { logo, theme_btn } from '../ui/index.js';
import { cfg } from '../config/index.js';

/* body: the page's form and links (JSX) */
export const auth_shell = (title, text, body) => (
  <main id="main" className="flex min-h-[100dvh] flex-col">
    <div className="flex justify-end p-2 sm:p-4">{theme_btn()}</div>
    <section className="mx-auto flex w-full max-w-[28rem] flex-1 flex-col px-6 pb-8 pt-4 sm:my-auto sm:flex-none sm:rounded-3xl sm:border sm:border-line sm:px-10 sm:py-12">
      {logo()}
      <h1 className="mt-8 text-[2rem] leading-tight">{title}</h1><p className="mt-2 text-muted">{text}</p>
      {body}
    </section>
    <p className="px-6 py-4 text-center text-xs text-muted">© {new Date().getFullYear()} {cfg.name} · <a href="#/sitemap" className="hover:text-accent">Privacy</a>
