/* modules/tzconv.jsx: TZ PlayGround (Timezone PlayGround, /admin/tz), the time zone converter. Its page loads the first time someone opens it (a separate file
   in the build); meanwhile the page shows the loading spinner. */
import { lazy, Suspense } from 'react';
import { VIEWS } from './views.js';
import { loading } from '../feedback/index.js';

const Tz_page = lazy(() => import('../tzconv/index.js').then(m => ({ default: m.Tz_page })));
