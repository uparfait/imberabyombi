/* account/otp_boxes.jsx: six one-digit boxes (typing moves on, Backspace moves back, a pasted code fills them all;
   behaviors handle the .otp_box keys, and FORMS.otp reads the six values). */
export const otp_boxes = label => (
  <fieldset className="border-0 p-0"><legend className="sr-only">{label}</legend><div className="otp" data-otp="">{Array.from({ length: 6 }, (_, i) => (
    <input key={i} className="otp_box" inputMode="numeric" maxLength={1} autoComplete={i ? 'off' : 'one-time-code'} aria-label={`Digit ${i + 1} of 6`} />
  ))}</div></fieldset>
);
