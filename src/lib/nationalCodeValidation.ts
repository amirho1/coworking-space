export function isValidIranNationalCode(code: string): boolean {
  // reject all-equal digits
  if (/^(\d)\1{9}$/.test(code)) return false;

  const digits = code.split("").map(Number);
  const lastDigit = digits[9];
  const sum =
    digits[0] * 10 +
    digits[1] * 9 +
    digits[2] * 8 +
    digits[3] * 7 +
    digits[4] * 6 +
    digits[5] * 5 +
    digits[6] * 4 +
    digits[7] * 3 +
    digits[8] * 2;

  const reminder = sum % 11;
  const expected = reminder < 2 ? reminder : 11 - reminder;

  return lastDigit === expected;
}
