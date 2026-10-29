/* sign/use_marks.js: use_marks(id, version), the signatures and stamps saved on document id ({ field id: PNG }), read from
   IndexedDB; { } until they arrive. version (the record's updated time) reads them again after someone signs. */
import { useEffect, useState } from 'react';
import { marks_get } from './sign_idb.js';
