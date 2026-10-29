/* sign/sign_done.jsx: "Signing complete" (/admin/sign/done/<id>), shown right after you sign: the document, when you
   signed, its status now, and the way back (the document, or your To sign list). */
import { i3 } from '../icons/index.js';
import { to } from '../router/index.js';
import { my_rec, when } from './sign_store.js';
import { status_chip } from './sign_list.jsx';

export function sign_done(d) {
  const r = my_rec(d), all = d.status === 'completed';
  return <div className="sign_main page_enter grid place-items-center">
    <section className="card w-full max-w-md p-7 text-center sm:p-9">
      <span className="sign_done_badge">{i3('check', 'h-20 w-20', 'ok')}</span>
