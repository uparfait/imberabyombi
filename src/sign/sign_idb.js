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
