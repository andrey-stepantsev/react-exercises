import { cloneDeep, sample } from "lodash";
import { Direction } from "./enum";
import { ICoordinate, ICoordinates, ICell } from "./interface";

export const createGameField = (size: number): ICell[][] => {
  const gameField: ICell[][] = new Array(size);
  const row: ICell[] = new Array(size);

  for (let i = 0; i < size; i++) {
    row[i] = { value: 0, isMerged: false };
  }

  for (let i = 0; i < size; i++) {
    gameField[i] = cloneDeep(row);
  }

  const startCount = size / 2;

  for (let i = 0; i < startCount; i++) {
    setRandom(gameField);
  }

  return gameField;
};

export const setRandom = (gameField: ICell[][]): void => {
  const arrEmpty = getEmpty(gameField);
  const random = sample(arrEmpty);
  random && (gameField[random.y][random.x].value = 2);
};

export const getEmpty = (gameField: ICell[][]): ICoordinate[] => {
  const arrEmpty: ICoordinate[] = [];
  for (let y = 0; y < gameField.length; y++) {
    for (let x = 0; x < gameField.length; x++) {
      gameField[y][x].value === 0 && arrEmpty.push({ x, y });
    }
  }
  return arrEmpty;
};

export const getCoordinates = (gameField: ICell[][], vector: ICoordinate): ICoordinates => {
  const coordinates: ICoordinates = { Xs: [], Ys: [] };

  for (let i = 0; i < gameField.length; i++) {
    coordinates.Xs.push(i);
    coordinates.Ys.push(i);
  }

  vector.x === 1 && coordinates.Xs.reverse();
  vector.y === 1 && coordinates.Ys.reverse();

  return coordinates;
};

export const getNext = (gameField: ICell[][], current: ICoordinate, vector: ICoordinate): ICoordinate => {
  const nextCoordinate = { x: current.x + vector.x, y: current.y + vector.y };
  const result = cloneDeep(current);

  while (isInBound(gameField, nextCoordinate) && isAvailable(gameField, current, nextCoordinate)) {
    result.x = nextCoordinate.x;
    result.y = nextCoordinate.y;
    nextCoordinate.x = nextCoordinate.x + vector.x;
    nextCoordinate.y = nextCoordinate.y + vector.y;
  }

  return result;
};

export const isInBound = (gameField: ICell[][], coordinate: ICoordinate): boolean => {
  const { x, y } = coordinate;
  return x >= 0 && x < gameField.length && y >= 0 && y < gameField.length;
};

export const isAvailable = (gameField: ICell[][], current: ICoordinate, next: ICoordinate): boolean => {
  const { value: currentValue } = gameField[current.y][current.x];
  const { value: nextValue, isMerged: nextMerged } = gameField[next.y][next.x];
  return nextValue === 0 || (nextValue === currentValue && !nextMerged);
};

export const isMovesAvailable = (gameField: ICell[][]): boolean => {
  const arrEmpty = getEmpty(gameField);
  return arrEmpty.length > 0 || isMergeAvailable(gameField);
};

export const isMergeAvailable = (gameField: ICell[][]): boolean => {
  const vectors = Object.values(Direction);
  for (let y = 0; y < gameField.length; y++) {
    for (let x = 0; x < gameField.length; x++) {
      const currentValue = gameField[y][x].value;
      if (currentValue) {
        for (let i = 0; i < vectors.length; i++) {
          const vector = vectors[i];
          const nextCoordinate = { x: x + vector.x, y: y + vector.y };
          if (isInBound(gameField, nextCoordinate) && gameField[y + vector.y][x + vector.x].value === currentValue) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

export const clearMergeStatus = (gameField: ICell[][]): void => {
  for (let y = 0; y < gameField.length; y++) {
    for (let x = 0; x < gameField.length; x++) {
      gameField[y][x].isMerged = false;
    }
  }
};
