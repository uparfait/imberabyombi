/* sign/sign_idb.js: O-Doc Sign's files in IndexedDB, which has far more room than localStorage: 'pdf:<id>' the uploaded
   PDF (its bytes) and 'marks:<id>' the signatures and stamps placed on it ({ field id: PNG data URL }). sweep(ids) drops
   the files of documents that no longer exist (deleted, or demo data reset in Settings). */
import { cfg } from '../config/index.js';

const NAME = cfg.ns + 'sign', STORE = 'files';
let opening = null;

const open = () => opening || (opening = new Promise((resolve, reject) => {
  const req = indexedDB.open(NAME, 1);
  req.onupgradeneeded = () => req.result.createObjectStore(STORE);
  req.onsuccess = () => resolve(req.result);
  req.onerror = () => { opening = null; reject(req.error); };
}));
/* one request in its own transaction; resolves with its result once the transaction is done */
const run = (mode, fn) => open().then(db => new Promise((resolve, reject) => {
  const tx = db.transaction(STORE, mode), req = fn(tx.objectStore(STORE));
  tx.oncomplete = () => resolve(req.result); tx.onerror = tx.onabort = () => reject(tx.error);
}));

/* the value under key (undefined when there is none or IndexedDB is not available) */
export const file_get = key => run('readonly', s => s.get(key)).catch(() => undefined);
/* true when it is stored, false when the browser refused it (storage full, private mode) */
export const file_set = (key, value) => run('readwrite', s => s.put(value, key)).then(() => true, () => false);
export const file_del = key => run('readwrite', s => s.delete(key)).catch(() => {});
export const drop_files = id => Promise.all([file_del('pdf:' + id), file_del('marks:' + id)]);

export const marks_get = async id => (await file_get('marks:' + id)) || {};
export const sweep = ids => run('readonly', s => s.getAllKeys())
