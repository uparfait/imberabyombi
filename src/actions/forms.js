/* actions/forms.js: FORMS, the submit handler of every form with data-form, FORMS[k](values, form): values = form_obj(form).
   Sign-in, contact, newsletter, side-panel note, profile, forgot password, one-time code, set password. Return false to
   keep the form as it is (an error is shown). */
import { qs, qsa, esc, uid } from '../lib/index.js';
