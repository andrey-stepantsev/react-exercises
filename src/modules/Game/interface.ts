export interface ICoordinate {
  x: number;
  y: number;
}

export interface ICoordinates {
  Xs: number[];
  Ys: number[];
}

export interface IDirection {
  [key: number]: ICoordinate;
}

export interface IColor {
  [key: number]: string;
}

export interface ICell {
  value: number;
  isMerged: boolean;
}

export interface IGameState {
  gameField: ICell[][];
  score: number;
  maxScore: number;
  timer: string;
  timerStart: number | undefined;
  gameStatus: number;
}
