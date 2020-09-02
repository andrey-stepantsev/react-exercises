import { GameMode } from "enums/GameEnums";

export type SizeType = 2 | 4 | 6 | 8;

export type GameSettings = {
  gameMode: GameMode;
  userName: string;
  fieldSize: SizeType;
};
