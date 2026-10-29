/* sign/sign_page.jsx: Sign_page, O-Doc Sign's whole window (no admin header or sidebar, like the document editor): its own
   top bar and the page for the address.
     /admin/sign · /drafts · /waiting · /completed · /inbox   the lists        /new   upload a PDF
     /edit/<id> prepare a draft   /doc/<id> follow a sent document   /sign/<id> sign it   /done/<id> signed
   A document opened at the wrong address moves to the right one (a sent draft to its page, someone else's to signing). */
import { useEffect } from 'react';
import './sign_styles.css';
import './sign_act.js';
import { ic } from '../icons/index.js';
import { route } from '../store/index.js';
import { auth } from '../auth/index.js';
import { loading } from '../feedback/index.js';
import { empty } from '../ui/index.js';
import { go, set_meta } from '../router/index.js';
import { forbidden } from '../modules/index.js';
import { LISTS, find_doc, all_docs, who } from './sign_store.js';
import { sweep } from './sign_idb.js';
import { sign_top, list_href } from './sign_top.jsx';
import { sign_list } from './sign_list.jsx';
import { Sign_new } from './sign_new.jsx';
import { P, prep_start } from './prep_state.js';
import { prep_page, prep_btns } from './prep_page.jsx';
import { owner_page, dl_label } from './owner_page.jsx';
import { signer_page } from './signer_page.jsx';
import { sign_done } from './sign_done.jsx';

const LIST = new Set(LISTS.map(x => x[0]));
let swept = false;

/* the right address for a document opened at the wrong one, taken once this draw is over (a draw cannot start the next) */
const move = path => { setTimeout(() => go(path, { replace: true })); return { body: loading('Opening the document') }; };
const missing = () => <div className="sign_main max-w-2xl"><div className="card">{empty('Document not found',
  'It was deleted, or it is kept in another browser.', <a href={list_href('all')} className="btn btn_primary btn_sm">All documents</a>)}</div></div>;
const dl = d => <button type="button" className="btn btn_outline btn_sm" data-act="sign_dl" data-id={d.id} aria-label={dl_label(d)}>
