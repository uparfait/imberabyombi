/* editor/core/idb.js: a tiny key–value store in IndexedDB for the document. Browsers give IndexedDB far more room than
   localStorage (about 5 MB), so documents keep their images, however many there are. */
const DB_NAME = (window.NS || 'loremds:v1:') + 'editor', STORE = 'docs';
let opening = null;

const open = () => opening || (opening = new Promise((resolve, reject) => {
  const req = indexedDB.open(DB_NAME, 1);
  req.onupgradeneeded = () => req.result.createObjectStore(STORE);
