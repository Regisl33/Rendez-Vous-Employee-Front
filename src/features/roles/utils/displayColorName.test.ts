import displayColorName from "./displayColorName";

test("display function receives colOpt1", () => {
  expect(displayColorName("colOpt1")).toBe("Jaune");
});
test("display function receives colOpt4", () => {
  expect(displayColorName("colOpt4")).toBe("Rouge");
});
test("display function receives colOpt7", () => {
  expect(displayColorName("colOpt7")).toBe("Turquoise");
});
test("display function receives colOpt9", () => {
  expect(displayColorName("colOpt9")).toBe("Bleu");
});
