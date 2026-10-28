/* router/history.js: path routes on the browser History API. to(path) is the address of an app path (the base path in front:
   import.meta.env.BASE_URL, '/' by default), app_path() reads it back, go(path) moves there and navigate() draws the page.
   Back / Forward (popstate) draw the page of the new address. */
import { qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { render, render_flags } from '../store/index.js';
