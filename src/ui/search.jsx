/* ui/search.jsx: the Imberabyombi search pill, its search + clear buttons, the help icon (tooltip) and the visible
   page title. HTML-string twins of the search buttons for plain-JS overlays live in search_html.js. */
import { ic } from '../icons/index.js';

/* Imberabyombi search pill: filled, no outline until focused.
   attrs: props spread on the <input> (was an attribute string), e.g. { 'data-filter': '.filter_card', autoFocus: true } */
export const search_box = (attrs, ph = 'Search', c = '') => (
  <label className={c ? `relative block ${c}` : 'relative block'}>
    <span className="sr-only">{ph}</span>
    <input type="search" placeholder={ph} className="h-11 rounded-full border-transparent bg-surface-2 py-2 hover:border-transparent hover:bg-surface-3 focus:bg-surface" {...attrs} />
    {search_ui()}
  </label>
);
/* Search field buttons: .ss runs the search (left), .sx clears it (right, shown only while there is text) */
/* Help icon: the explanation shows as a tooltip on hover, keyboard focus or tap, instead of a paragraph under a title */
