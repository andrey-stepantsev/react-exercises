import deepFreeze from "deep-freeze";
import { IColor, IDirection } from "./interface";

export enum GameStatus {
  NOT_STARTED,
  IN_PROCESS,
  WIN,
  LOSE,
}

export const Direction: IDirection = deepFreeze({
  37: { x: -1, y: 0 },
  38: { x: 0, y: -1 },
  39: { x: 1, y: 0 },
  40: { x: 0, y: 1 },
});

export const Colors: IColor = deepFreeze({
  2: "#00bcd4",
  4: "#4caf50",
  8: "#1565c0",
  16: "#ff9800",
  32: "#ff5722",
  64: "#795548",
  128: "#7b1fa2",
  256: "#e91e63",
  512: "#009688",
  1024: "#d50000",
  2048: "#ffea00",
});
