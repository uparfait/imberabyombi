/* ui/search_html.js: HTML-string twins of clear_x() and search_ui() (search.jsx), for plain-JS overlays that fill
   #picker with markup (the picker's search field). Same markup and classes as the JSX versions. */
import { ic_html } from '../icons/index.js';

export const clear_x_html = () => `<button type="button" class="clear_btn" data-act="clear_search" aria-label="Clear search" data-tip="Clear">${ic_html('x', 'h-4 w-4')}</button>`;
