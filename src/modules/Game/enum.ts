import { IDirection } from "./interface";

export enum GameStatus {
  NOT_STARTED,
  IN_PROCESS,
  WIN,
  LOSE,
}

export const Direction: IDirection = {
  37: { x: -1, y: 0 },
  38: { x: 0, y: -1 },
  39: { x: 1, y: 0 },
  40: { x: 0, y: 1 },
};
