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
export const help_tip = (text, about = 'this') => (
  <button type="button" className="help_tip" data-act="help_tip" data-tip={text} aria-label={`About ${about}. ${text}`}>{ic('help', 'h-4 w-4')}</button>
);
/* Visible page title + help icon (the page's h1 stays in the header for screen readers, so this one is hidden from them) */
export const page_title = (title, text) => (
  <div className="mb-5 flex items-center gap-1">
