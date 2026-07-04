import { isValidTaiwanPhone } from "../validation";

describe("isValidTaiwanPhone", () => {
  it.each([
    "0938-969-739",
    "0938969739",
    "0912 345 678",
    "03-1234567",
    "02-12345678",
    "+886 912 345 678",
    "+886-3-1234567",
  ])("accepts %s", (phone) => {
    expect(isValidTaiwanPhone(phone)).toBe(true);
  });

  it.each(["", "12345", "abcdefghij", "999999", "091234", "0912345678901"])(
    "rejects %s",
    (phone) => {
      expect(isValidTaiwanPhone(phone)).toBe(false);
    },
  );
});
