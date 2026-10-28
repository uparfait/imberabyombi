/* feedback/spinner.jsx: the ONE segmented spinner (JSX for views; spinner_html() is the string twin for plain-JS
   overlays and busy buttons) and the loading block a view shows while its data comes. */
export const spinner = (c = '') => (
  <svg className={`spinner_segmented_svg ${c}`} viewBox="0 0 50 50" aria-hidden="true"><circle className="spinner_segmented_dash" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle></svg>
);
export const spinner_html = (c = '') => `<svg class="spinner_segmented_svg ${c}" viewBox="0 0 50 50" aria-hidden="true"><circle class="spinner_segmented_dash" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle></svg>`;
export const loading = (text = 'Loading') => (
