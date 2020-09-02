import shuffle from "lodash/shuffle";

export const isSolvable = (arr: number[]): boolean => {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        count++;
      }
    }
  }

  return count % 2 == 0;
};

export const generateField = (size: number): number[][] => {
  const field: number[][] = [];

  let values: number[] = [...Array(size * size).keys()].splice(1);

  do values = shuffle(values);
  while (!isSolvable(values));

  values.push(0);

  while (values.length) field.push(values.splice(0, size));

  return field;
};
