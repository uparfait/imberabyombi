# O-Doc Sign: signing it yourself

Part of [O-Doc Sign](o_doc_sign.md): the owner of a draft signs it before (or instead of) sending it.

- Under **Save draft**, **Sign it myself** (in ink, apart from Send and Save) adds you to the signers as **You** and picks
  you under Placing for; place your signature or stamp fields. **Sign my fields** then opens the signing page with every
  step (your signature drawn, typed or uploaded, your stamp made or uploaded, the agreement, the certificate when forced)
  and brings you back to the draft: **Signed by you**. Your fields now show your marks and stay as they are (not moved,
  resized, removed or added to), and you are not edited or removed as a signer ([`self_sign.jsx`](../src/sign/self_sign.jsx)).
- **Preview**, at the foot of the right column once someone has signed: the document with the marks so far, and
  **Download a copy**.
- You can go on adding other signers and send it: it goes to those who have not signed. When everyone on it has signed
