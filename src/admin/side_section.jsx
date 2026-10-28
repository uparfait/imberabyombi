/* side_section.jsx: collapsible sidebar section (mini calendar + nav groups): header button with a rotating chevron, body
   that eases its height open and closed. Open/closed state is remembered in this browser (key "sideClosed"). */
import { ic } from '../icons/index.js';
import { ui } from '../store/index.js';

/* ACT.group folds it in place (aria-expanded, data-closed, inert) and saves ui.closed, so later draws agree */
export const side_section = (k, title, body) => { const open = !ui.closed[k];
  return <div key={k} className="mb-1">
    <button className="flex w-full items-center justify-between rounded-xl px-4 py-2 text-sm font-medium hover:bg-fg/5" data-act="group" data-g={k}
      aria-expanded={String(open)}>{title}{ic('chevD', 'chev h-4 w-4 text-muted')}</button>
    <div className="fold" data-closed={String(!open)} inert={!open}><div>{body}</div></div></div>; };
