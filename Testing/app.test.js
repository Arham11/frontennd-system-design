import { userSortedAge } from "./app";

test("testing if the first user is Alice", () => {
  const sortedData = userSortedAge();
  expect(sortedData[0].name).toBe("Alice");
}, 1000);

test("testing if the last user is Ellie", () => {
  const sortedData = userSortedAge();
  expect(sortedData.at(-1).name).toBe("Ellie");
}, 1000);
