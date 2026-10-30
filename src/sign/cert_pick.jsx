/* sign/cert_pick.jsx: signing with a digital certificate (asked for per signer by the sender). The "Sign this document?"
   dialog adds the certificate file and its password; verify() checks them, then signs. The check is simulated in this
   demo: any file and any password are accepted after a short wait, and the file's name and the time are recorded. */
import { useState } from 'react';
import { i3 } from '../icons/index.js';
import { form_msg } from '../feedback/index.js';

export function Cert_pick() {
  const [name, set_name] = useState('');
  return <div className="grid gap-3 sm:col-span-2">
    <label className="sign_drop sm"><input type="file" name="cert_file" className="sr-only" onChange={e => set_name(e.target.files[0]?.name || '')} />
      {i3('shield', 'h-11 w-11', 'violet')}<span className="mt-2 block font-medium [overflow-wrap:anywhere]">{name || 'Choose your digital certificate'}</span>
