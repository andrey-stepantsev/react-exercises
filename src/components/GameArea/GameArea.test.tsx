import React from "react";
import { mount } from "enzyme";
import { GameSettings } from "types/GameTypes";
import { GameMode } from "enums/GameEnums";
import GameArea from "./GameArea";

const arrFilled: number[][] = [
  [9, 3, 1, 7],
  [11, 10, 14, 12],
  [4, 6, 8, 2],
  [15, 5, 13, 0],
];

const settings: GameSettings = {
  gameMode: GameMode.FREE,
  userName: "Test",
  fieldSize: 4,
};

const onClick = jest.fn();

const GameAreaComponent = (
  <GameArea field={arrFilled} timer={"00:00"} stepsCount={0} settings={settings} onClick={onClick} />
);

describe("GameArea", () => {
  it("rendered game area consists of two parts", () => {
    const wrapper = mount(GameAreaComponent);
    expect(wrapper.find("div").first().children().length).toBe(2);
  });
});
