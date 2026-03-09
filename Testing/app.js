let users = [
  { name: "Tom", age: 30 },
  { name: "Alice", age: 8 },
  { name: "Ellie", age: 50 },
  { name: "John", age: 20 },
];

export function userSortedAge() {
  return users.toSorted((a, b) => a.age - b.age);
}
