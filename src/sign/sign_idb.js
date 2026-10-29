/* sign/sign_idb.js: O-Doc Sign's files in IndexedDB, which has far more room than localStorage: 'pdf:<id>' the uploaded
   PDF (its bytes) and 'marks:<id>' the signatures and stamps placed on it ({ field id: PNG data URL }). sweep(ids) drops
