import getPosByDay from "./getPosByDay";

test("getPosByDay receives Dimanche", () => {
  expect(getPosByDay("Dimanche")).toBe(1);
});

test("getPosByDay receives Mardi", () => {
  expect(getPosByDay("Mardi")).toBe(3);
});

test("getPosByDay receives Vendredi", () => {
  expect(getPosByDay("Vendredi")).toBe(6);
});
