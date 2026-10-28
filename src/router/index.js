/* router: path routes (History API) and progressive enhancement. Addresses and navigation (to, go, navigate), the route and
export * from './parse.js';
export * from './pages.jsx';
export * from './enhance.js';
export * from './render_hooks.js';
export * from './render_route.jsx';
export * from './boot.js';
/* ROUTE / AFTER / render / rerender live in the store; re-exported here too, so router imports find them (route as ROUTE) */
export { route as ROUTE, AFTER, render, rerender } from '../store/index.js';
