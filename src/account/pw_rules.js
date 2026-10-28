/* Set password: strength meter + live rules + confirm match
   account/pw_rules.js: the password rules ([key, label, test]) and pw_check(input), run by behaviors on every input
   into a [data-pw] field: ticks the rules, sets the meter and its word. */
export const PW_RULES = [['len', 'At least 8 characters', v => v.length >= 8], ['case', 'Upper and lower case letters', v => /[a-z]/.test(v) && /[A-Z]/.test(v)],
  ['num', 'A number', v => /\d/.test(v)], ['sym', 'A symbol, such as ! ? # @', v => /[^\w\s]/.test(v)]];

export function pw_check(i) {
  const f = i.form, v = i.value;
  const ok = PW_RULES.map(([k, , t]) => { const p = t(v); f.querySelector(`[data-rule="${k}"]`)?.classList.toggle('ok', p); return p; }).filter(Boolean).length;
  const m = f.querySelector('[data-pw-meter]'); if (m) m.value = ok;
