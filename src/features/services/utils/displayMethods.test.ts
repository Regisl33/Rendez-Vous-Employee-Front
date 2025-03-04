import displayMethods from "./displayMethods";

test("displayMethods return the accurate translation", () => {
  expect(displayMethods("online")).toBe("En Ligne");
});
test("displayMethods return the accurate translation", () => {
  expect(displayMethods("none")).toBe("Sans-Rendez-Vous");
});
test("displayMethods return the accurate translation", () => {
  expect(displayMethods("phone")).toBe("Par Téléphone");
});
