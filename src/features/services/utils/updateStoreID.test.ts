import updateStoreID from "./updateStoreID";

test("The storeNum is already in the array and checked is true", () => {
  expect(updateStoreID(["1", "2", "3"], "1", true)).toStrictEqual([
    "1",
    "2",
    "3",
  ]);
});
test("The storeNum is already in the array and checked is false", () => {
  expect(updateStoreID(["1", "2", "3"], "1", false)).toStrictEqual(["2", "3"]);
});
test("The storeNum is not in the array and checked is true", () => {
  expect(updateStoreID(["1", "2", "3"], "4", true)).toStrictEqual([
    "1",
    "2",
    "3",
    "4",
  ]);
});
test("The storeNum is not in the array and checked is false", () => {
  expect(updateStoreID(["1", "2", "3"], "4", false)).toStrictEqual([
    "1",
    "2",
    "3",
  ]);
});
test("The storeID array is undefined checked is true", () => {
  expect(updateStoreID(undefined, "1", true)).toStrictEqual(["1"]);
});
test("The storeID array is undefined checked is false", () => {
  expect(updateStoreID(undefined, "1", false)).toStrictEqual([]);
});
