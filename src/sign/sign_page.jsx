/* sign/sign_page.jsx: Sign_page, O-Doc Sign's whole window (no admin header or sidebar, like the document editor): its own
   top bar and the page for the address.
     /admin/sign · /drafts · /waiting · /completed · /inbox   the lists        /new   upload a PDF
     /edit/<id> prepare a draft   /doc/<id> follow a sent document   /sign/<id> sign it   /done/<id> signed
   A document opened at the wrong address moves to the right one (a sent draft to its page, someone else's to signing). */
import { useEffect } from 'react';
import './sign_styles.css';
import './sign_act.js';
import { route } from '../store/index.js';
import { auth } from '../auth/index.js';
import { loading } from '../feedback/index.js';
import { empty } from '../ui/index.js';
import { go, set_meta, to } from '../router/index.js';
import { forbidden } from '../modules/index.js';
import { LISTS, find_doc, all_docs, who } from './sign_store.js';
import { sweep } from './sign_idb.js';
import { sign_top, list_href } from './sign_top.jsx';
import { sign_list } from './sign_list.jsx';
import { Sign_new } from './sign_new.jsx';
import { P, prep_start } from './prep_state.js';
import { prep_page } from './prep_page.jsx';
import { owner_page } from './owner_page.jsx';
import { signer_page } from './signer_page.jsx';
import { sign_done } from './sign_done.jsx';

const LIST = new Set(LISTS.map(x => x[0]));
let swept = false;

/* the right address for a document opened at the wrong one, taken once this draw is over (a draw cannot start the next) */
const move = path => { setTimeout(() => go(path, { replace: true })); return { body: loading('Opening the document') }; };
const missing = () => <div className="sign_main max-w-2xl"><div className="card">{empty('Document not found',
  'It was deleted, or it is kept in another browser.', <a href={list_href('all')} className="btn btn_primary btn_sm">All documents</a>)}</div></div>;

/* /admin/sign/<a>/<id> → { title, cur (the list on show), back (Back's address), body }. A page's actions (Send, Save,
   Download, Finish) sit in its own right column or bottom bar, never in the top bar. */
function page_for(a, id) {
  if (!a || LIST.has(a)) { const k = a || 'all'; return { title: LISTS.find(x => x[0] === k)[1], cur: k, body: sign_list(k) }; }
  if (a === 'new') return { title: 'New document', back: list_href('all'),
    body: auth.can('sign', 2) ? <Sign_new /> : <div className="sign_main">{forbidden()}</div> };
  const d = find_doc(id), mine = d?.owner === who().email;
  if (!d) return { title: 'Not found', back: list_href('all'), body: missing() };
  if (a === 'edit') return !mine ? move(`/admin/sign/sign/${id}`) : d.status !== 'draft' ? move(`/admin/sign/doc/${id}`)
    : (prep_start(id), { title: d.title, back: list_href('drafts'), body: prep_page(P.doc) });
  if (a === 'doc') return !mine ? move(`/admin/sign/sign/${id}`) : d.status === 'draft' ? move(`/admin/sign/edit/${id}`)
    : { title: d.title, back: list_href(d.archived ? 'archived' : d.status === 'completed' ? 'completed' : 'waiting'), body: owner_page(d) };
  if (a === 'sign') return { title: d.title, back: mine && d.status === 'draft' ? to(`/admin/sign/edit/${id}`) : list_href('inbox'), body: signer_page(d) };
  if (a === 'done') return { title: 'Signing complete', back: list_href('inbox'), body: sign_done(d) };
  return { title: 'Not found', back: list_href('all'), body: missing() };
}

/* O-Doc Sign is made for computers: below 1280 px it is laid out 1280 px wide and scaled down to fit, never re-arranged or
   scrolled sideways. Phones and tablets: the viewport says 1280 px (the browser shows it to fit); a narrow computer window
   (which ignores that): the zoom --sign_z (01_layout.css). Both are put back when O-Doc Sign is left. */
const W = 1280;
function use_desktop() {
  useEffect(() => {
    const m = document.querySelector('meta[name=viewport]'), was = m?.content, root = document.documentElement;
    if (m) m.content = `width=${W}, viewport-fit=cover`;
    const fit = () => root.style.setProperty('--sign_z', String(Math.min(1, innerWidth / W)));
    fit(); addEventListener('resize', fit);
    return () => { if (m) m.content = was; removeEventListener('resize', fit); root.style.removeProperty('--sign_z'); };
  }, []);
}

export function Sign_page() {
  use_desktop();
  const [, , , a = '', id] = route.path.split('/'), p = page_for(a, id);
  useEffect(() => { set_meta(p.title ? `${p.title} · O-Doc Sign` : 'O-Doc Sign'); });
  /* once a visit: drop the stored files of documents that are gone */
  useEffect(() => { if (!swept) { swept = true; sweep(new Set(all_docs().map(d => d.id))); } }, []);
  return <div className="sign_app">{sign_top(p.cur || null, p.back)}<div className="sign_body">{p.body}</div></div>;
}
