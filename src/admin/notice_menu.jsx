/* admin/notice_menu.jsx: the bell in the header: a count of unread notices (admin/notices.js) and, on click, the list
   (newest worries first). A notice opens what it is about and is then read; "Mark all read" clears the count. The list
   is drawn at the top of the page like the account menu (a portal placed under its button). */
import { createPortal } from 'react-dom';
import { ic } from '../icons/index.js';
import { closed_pop } from './live_slot.jsx';
import { notices, notices_read } from './notices.js';

const TONE = { bad: 'bg-bad/15 text-bad', warn: 'bg-warn/15 text-warn', info: 'bg-info/15 text-info', ok: 'bg-ok/15 text-ok' };

export function notice_menu(n = '') {
  const all = notices(), read = notices_read(), fresh = all.filter(x => !read.has(x.id)).length;
  return <div className="relative">
    <button className="icon_btn notice_btn" data-act="pop" data-pop={`pop_notice${n}`} aria-label={fresh ? `Notifications, ${fresh} new` : 'Notifications'}>
      {ic('bell')}{fresh ? <span className="notice_count" aria-hidden="true">{fresh > 9 ? '9+' : fresh}</span> : null}</button>
    {createPortal(<div id={`pop_notice${n}`} ref={closed_pop()} className="pop pop_fixed w-[22rem] max-w-[calc(100vw-1rem)] p-2" hidden>
      <div className="flex min-h-10 items-center justify-between gap-2 px-2"><p className="font-semibold">Notifications</p>
        {fresh ? <button type="button" className="btn btn_ghost btn_sm" data-act="notice_all">Mark all read</button> : null}</div>
      {all.length ? <ul className="notice_list">{all.map(x => <li key={x.id}>
        <button type="button" className={`notice ${read.has(x.id) ? '' : 'is_new'}`} data-act="notice_open" data-id={x.id} data-href={x.href}>
          <span className={`notice_ic ${TONE[x.tone]}`}>{ic(x.icon, 'h-4 w-4')}</span>
          <span className="min-w-0 flex-1 text-left"><b className="block truncate text-sm font-medium">{x.title}</b><span className="block truncate text-xs text-muted">{x.text}</span></span>
        </button></li>)}</ul>
        : <p className="px-3 py-8 text-center text-sm text-muted">All caught up</p>}
