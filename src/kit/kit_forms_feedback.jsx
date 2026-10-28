/* kit/kit_forms_feedback.jsx: the "Feedback" fieldset of the Forms specimen: progress, the one spinner and busy
   buttons (data-act="demo_busy"), meters, and a live sum (the form's data-calc: behaviors write a + b into "sum"). */
import { spinner } from '../feedback/index.js';

export const kit_forms_feedback = () => (
  <fieldset className="grid gap-5 sm:grid-cols-2"><legend>Feedback</legend>
    <div className="grid gap-2"><p className="text-sm font-medium">Progress (known amount)</p><progress max="100" value="64"></progress></div>
    <div className="grid gap-2"><p className="text-sm font-medium">Loading (one spinner everywhere)</p>
      <div className="flex flex-wrap items-center gap-5">{spinner()}{spinner('!h-8 !w-8')}
        <button type="button" className="btn btn_primary" data-act="demo_busy">Busy button</button>
        <button type="button" className="btn btn_outline" data-act="demo_busy">Busy outline</button></div></div>
    <div className="grid gap-2"><p className="text-sm font-semibold">Meter (good, fair, poor)</p>{[90, 55, 15].map(v => (
      <meter key={v} min="0" max="100" low="30" high="70" optimum="100" value={v}></meter>
    ))}</div>
    <div className="flex flex-wrap items-center gap-2 sm:col-span-2"><label className="sr-only" htmlFor="demo_a">A</label>
      <input id="demo_a" name="a" type="number" defaultValue="4" className="w-28" /> + <label className="sr-only" htmlFor="demo_b">B</label>
