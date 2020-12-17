import { date } from "../src/client/js/date";
describe(date, () => {
  test("The date is valid", () => {
    expect(date(18, 7, 1998)).toBe(false);
  });
});
