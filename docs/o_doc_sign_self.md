# O-Doc Sign: signing it yourself

Part of [O-Doc Sign](o_doc_sign.md): the owner of a draft signs it before (or instead of) sending it.

- Under **Save draft**, **Sign it myself** (in ink, apart from Send and Save) adds you to the signers as **You**, picks you
  under Placing for, and goes. Place your signature or stamp fields.
- **Preview and sign**, at the foot of the right column (once you have a field): the document in an overlay with your
  fields to fill (your signature drawn, typed or uploaded, your stamp made or uploaded), **Next field** and **Finish and
  sign** (the agreement, and the certificate when forced). Signed, the overlay shows **Signed by you**, **Download a copy**
  and **Add other signers**. Your fields now show your marks and stay as they are (not moved, resized, removed or added
  to), and you are not edited or removed as a signer ([`self_sign.jsx`](../src/sign/self_sign.jsx)).
- **Preview**, at the foot once you (or anyone) have signed: the document with the marks so far, and
  **Download a copy**.
- You can go on adding other signers and send it: it goes to those who have not signed. When everyone on it has signed
  (you alone, say), **Send for signing** becomes **Finish**, which moves it to Completed.
