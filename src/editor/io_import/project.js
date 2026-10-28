/* editor/io_import/project.js: project files (.json with every tab, the page setup and the comments): load one as the
   whole document, or turn its tabs into new tabs; "Replace this tab" (replace_tab); and the "is it still empty?" tests
   (the upload dialog starts on Replace when the tab on screen is empty). */
import { state, default_setup, new_tab, uid, bodies, el, qsa, active_tab, commit, save_soon } from '../core/index.js';
import { sanitize_html } from '../content/index.js';
import { render_all, save_tab } from '../ui/index.js';

/* project files written by the original editor name these setup keys in camelCase */
const OLD_KEYS = { pageColor: 'page_color', pageNumbers: 'page_numbers', headerHTML: 'header_html', footerHTML: 'footer_html' };
const setup_of = s => Object.fromEntries(Object.entries(s || {}).map(([k, v]) => [OLD_KEYS[k] || k, v]));

export function load_project(d) {
  if (!d || !Array.isArray(d.tabs) || !d.tabs.length) throw new Error('bad project');
  state.title = d.title || 'Untitled document';
  state.setup = Object.assign(default_setup(), setup_of(d.setup)); state.setup.margins = Object.assign(default_setup().margins, (d.setup || {}).margins || {});
  state.tabs = d.tabs.map(t => Object.assign(new_tab(String(t.name || 'Tab'), sanitize_html(String(t.html || ''))), { id: t.id || uid() }));
  state.active = state.tabs.some(t => t.id === d.active) ? d.active : state.tabs[0].id;
  state.comments = Array.isArray(d.comments) ? d.comments.filter(c => c && c.id).map(c => Object.assign({ replies: [] }, c, { draft: false })) : [];
  render_all();
}

export function is_doc_empty() {
  const bs = bodies();
  return state.tabs.length === 1 && bs.length === 1 && !bs[0].textContent.replace(/\u200b/g, '').trim() && !bs[0].querySelector('img,table,hr,.file_chip');
}
/* the tabs of a project file as new tabs (comment marks removed: its comments are not imported) */
export function project_tabs(d) {
  return (d.tabs || []).map(t => {
    const x = el('div'); x.innerHTML = sanitize_html(String(t.html || '')); qsa('.cmt', x).forEach(s => s.replaceWith(...s.childNodes));
    return new_tab(String(t.name || 'Tab'), x.innerHTML || '<p><br></p>');
  });
}
