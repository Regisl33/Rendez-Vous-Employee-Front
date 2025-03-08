import displayHours from "./displayHours";

test("displayHours receives a number > 9", () => {
  expect(displayHours(10)).toBe("10");
});
test("displayHours receives a number < 9", () => {
  expect(displayHours(1)).toBe("01");
});
test("displayHours receives 9", () => {
  expect(displayHours(9)).toBe("09");
});
