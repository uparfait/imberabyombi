/* actions/forms.js: FORMS, the submit handler of every form with data-form, FORMS[k](values, form): values = form_obj(form).
   Sign-in, contact, newsletter, side-panel note, profile, forgot password, one-time code, set password. Return false to
   keep the form as it is (an error is shown). */
import { qs, qsa, esc, uid } from '../lib/index.js';
import { db, route, rerender } from '../store/index.js';
import { auth, role_name, landing } from '../auth/index.js';
import { notify_next, form_msg, show_err } from '../feedback/index.js';
import { refresh_panel, ensure_mine } from '../admin/index.js';
import { PW_RULES } from '../account/index.js';
