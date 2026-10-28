/* kit/kit_forms_feedback.jsx: the "Feedback" fieldset of the Forms specimen: progress, the one spinner and busy
   buttons (data-act="demo_busy"), meters, and a live sum (the form's data-calc: behaviors write a + b into "sum"). */
import { spinner } from '../feedback/index.js';

export const kit_forms_feedback = () => (
  <fieldset className="grid gap-5 sm:grid-cols-2"><legend>Feedback</legend>
    <div className="grid gap-2"><p className="text-sm font-medium">Progress (known amount)</p><progress max="100" value="64"></progress></div>
    <div className="grid gap-2"><p className="text-sm font-medium">Loading (one spinner everywhere)</p>
