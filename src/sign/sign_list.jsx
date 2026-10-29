/* sign/sign_list.jsx: the lists. All, Drafts, Waiting, Completed: the documents you prepared; To sign: the ones sent to
   you (waiting first, then the ones you signed). A row opens the document where it belongs: a draft to prepare it, a sent
   one to follow it, one sent to you to sign it. Empty lists say how they fill up. */
import { ic, i3 } from '../icons/index.js';
import { empty, initials } from '../ui/index.js';
import { auth } from '../auth/index.js';
