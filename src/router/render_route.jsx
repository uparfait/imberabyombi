/* router/render_route.jsx: what the reference's render() put into #app. It parses the hash into the store's route, then draws
   the admin page, an account page or a public page (or the error page when a view fails). A new page is a fresh tree (keyed),
   as innerHTML was: animations, observers and local state start over; a redraw of the same page keeps the tree. */
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

export function render_route() {
  if (get_version() === 0) { skip_after_render(); return null; }   /* before boot's first navigate() draws: #app stays empty */
  set_route(parse()); const r = route; let html;
  try { html = r.path === '/admin' || r.path.startsWith('/admin/') ? admin_page(r)
    : AUTH_ROUTES[r.path] ? (set_meta(AUTH_ROUTES[r.path][0]), AUTH_ROUTES[r.path][1](r)) : public_page(r); }
