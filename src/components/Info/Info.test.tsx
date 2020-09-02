import React from "react";
import { mount } from "enzyme";
import { GameSettings } from "types/GameTypes";
import { GameMode } from "enums/GameEnums";
import Info from "./Info";

const settingsRatingGameMode: GameSettings = {
  gameMode: GameMode.RATING,
  userName: "Test",
  fieldSize: 4,
};

const settingsFreeGameMode: GameSettings = {
  gameMode: GameMode.FREE,
  userName: "Test",
  fieldSize: 4,
};

describe("Info", () => {
  it("rendered info contains three rows in rating game mode", () => {
    const wrapper = mount(<Info timer="00:00" stepsCount={0} settings={settingsRatingGameMode} />);
    expect(wrapper.find("p").length).toBe(3);
  });
  it("rendered info contains two rows in free game mode", () => {
    const wrapper = mount(<Info timer="00:00" stepsCount={0} settings={settingsFreeGameMode} />);
    expect(wrapper.find("p").length).toBe(2);
  });
});
