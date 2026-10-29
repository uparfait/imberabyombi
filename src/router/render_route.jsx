/* router/render_route.jsx: what goes into #app. It parses the address into the store's route, then draws
   the admin page, an account page or a public page (or the error page when a view fails). A new page is a fresh tree (keyed),
   so animations, observers and local state start over; a redraw of the same page keeps the tree. */
import { Component } from 'react';
import { route, set_route, render_flags, get_version } from '../store/index.js';
import { parse, set_meta } from './parse.js';
import { public_page, admin_page, AUTH_ROUTES, error_page } from './pages.jsx';
import { skip_after_render } from './render_hooks.js';

/* A view that fails while React draws it (a component inside the page) shows the same error page; the next draw tries again */
class Page_guard extends Component {
  state = { err: null, v: null };
  static getDerivedStateFromError(err) { return { err }; }
  static getDerivedStateFromProps(p, s) { return p.v !== s.v ? { err: null, v: p.v } : null; }   /* React logs the error */
  render() { return this.state.err ? error_page() : this.props.children; }
}

let page_key = 0, last = null;

/* the public website (and the design system): neither an admin page nor an account page */
export const is_public = path => !(path === '/admin' || path.startsWith('/admin/')) && !AUTH_ROUTES[path];
export function render_route() {
  if (get_version() === 0) { skip_after_render(); return null; }   /* before boot's first navigate() draws: #app stays empty */
  set_route(parse()); const r = route; let html;
  try { html = r.path === '/admin' || r.path.startsWith('/admin/') ? admin_page(r)
    : AUTH_ROUTES[r.path] ? (set_meta(AUTH_ROUTES[r.path][0]), AUTH_ROUTES[r.path][1](r)) : public_page(r); }
  catch (err) { console.error(err); html = error_page(); }
  if (html == null) { skip_after_render(); return last; }   /* redirected (admin_page): the old page stays until the next one */
  if (!render_flags.keep) page_key = get_version();
  return (last = <Page_guard key={page_key} v={get_version()}>{html}</Page_guard>);
}
