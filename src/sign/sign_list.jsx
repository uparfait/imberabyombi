/* sign/sign_list.jsx: the lists. All, Drafts, Waiting, Completed: the documents you prepared; To sign: the ones sent to
   you (waiting first, then the ones you signed). A row opens the document where it belongs: a draft to prepare it, a sent
   one to follow it, one sent to you to sign it. Empty lists say how they fill up. */
import { ic, i3 } from '../icons/index.js';
import { empty, initials } from '../ui/index.js';
import { auth } from '../auth/index.js';
import { to } from '../router/index.js';
import { LISTS, STATUS, of_list, my_turn, my_rec, signed_n, ago } from './sign_store.js';

export const status_chip = d => <span className={`chip ${STATUS[d.status][1]}`}>{STATUS[d.status][0]}</span>;
export const new_btn = (c = '') => auth.can('sign', 2)
  ? <a href={to('/admin/sign/new')} className={`btn btn_primary btn_sm ${c}`}>{ic('upload', 'h-4 w-4')}New document</a> : null;
