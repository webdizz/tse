function query<T>(
  items: T[],
  query: {
    [TProp in keyof T]?: (val) => boolean;
  }
) {
  return items.filter((item) => {
    for (const property of Object.keys(item)) {
      const propertyQuery = query[property];
      if (propertyQuery && propertyQuery(item[property])) {
        return true;
      }
    }
    return false;
  });
}

const matches = query(
  [
    { name: "Ted", age: 12 },
    { name: "Angie", age: 31 },
  ],
  {
    name: (name) => name == "Angie",
    age: (age) => age > 30,
  }
);

console.log(matches);
