// Accepts Taiwan phone formats: 09xx mobile (10 digits), area-code landlines
// (9-10 digits starting with 0), or +886-prefixed equivalents.
export function isValidTaiwanPhone(input: string): boolean {
  const digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith("+886")) {
    const rest = digits.slice(4);
    return /^\d{8,9}$/.test(rest);
  }
  return /^0\d{8,9}$/.test(digits);
}
