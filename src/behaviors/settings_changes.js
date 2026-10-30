/* behaviors/settings_changes.js: the change listener's settings branches: the text-selection switch (account menu),
   a role's landing page, a role's access level per module, and importing a backup file. */
import { qs } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { request, toast, show_msg } from '../feedback/index.js';
import { MODS, roles, role_opens } from '../auth/index.js';
