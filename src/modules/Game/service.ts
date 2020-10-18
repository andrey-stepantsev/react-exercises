import shuffle from "lodash/shuffle";
import { Coordinates, Blank } from "./slice";

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

export const getBlank = (gameField: number[][]): Blank => {
  const blankY = gameField.findIndex((v) => v.includes(0));
  const blankX = gameField[blankY].indexOf(0);
  return { blankX, blankY };
};

export const checkPlayerClick = (coordinates: Coordinates, blank: Blank): boolean => {
  const { x, y } = coordinates;
  const offset = Math.abs(x - blank.blankX) + Math.abs(y - blank.blankY);
  return offset === 1;
};
