/* ui/search.jsx: the Imberabyombi search pill, its search + clear buttons, the help icon (tooltip) and the visible
   page title. HTML-string twins of the search buttons for plain-JS overlays live in search_html.js. */
import { ic } from '../icons/index.js';

/* Imberabyombi search pill: filled, no outline until focused.
   attrs: props spread on the <input> (was an attribute string), e.g. { 'data-filter': '.filter_card', autoFocus: true } */
export const search_box = (attrs, ph = 'Search', c = '') => (
