import isActivated from "./isActivated";
import { ServiceType } from "../types/Service";

const testService1: ServiceType = {
  _id: "123",
  name: "test",
  description: "test",
  price: 15,
  duration: 15,
  appointementMethod: "online",
  appointementCategorie: "Diabète",
  baseService: true,
  storeID: ["1234"],
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 1,
};

const testService2: ServiceType = {
  _id: "123",
  name: "test",
  description: "test",
  price: 15,
  duration: 15,
  appointementMethod: "online",
  appointementCategorie: "Diabète",
  baseService: true,
  storeID: ["1"],
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 1,
};

const testService3: ServiceType = {
  _id: "123",
  name: "test",
  description: "test",
  price: 15,
  duration: 15,
  appointementMethod: "online",
  appointementCategorie: "Diabète",
  baseService: true,
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 1,
};

const storeID = "1234";

test("If the service as 1234 in is storeID array, it should return true", () => {
  expect(isActivated(testService1, storeID)).toBe(true);
});
test("If the service as not 1234 in is storeID array, it should return false", () => {
  expect(isActivated(testService2, storeID)).toBe(false);
});
test("If the service as no storeID array, it should return false", () => {
  expect(isActivated(testService3, storeID)).toBe(false);
});
