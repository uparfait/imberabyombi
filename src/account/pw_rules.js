/* Set password: strength meter + live rules + confirm match
   account/pw_rules.js: the password rules ([key, label, test]) and pw_check(input), run by behaviors on every input
   into a [data-pw] field: ticks the rules, sets the meter and its word. */
export const PW_RULES = [['len', 'At least 8 characters', v => v.length >= 8], ['case', 'Upper and lower case letters', v => /[a-z]/.test(v) && /[A-Z]/.test(v)],
  ['num', 'A number', v => /\d/.test(v)], ['sym', 'A symbol, such as ! ? # @', v => /[^\w\s]/.test(v)]];

export function pw_check(i) {
