import React from "react";
import { GameSettings } from "types/GameTypes";
import { GameMode } from "enums/GameEnums";
import GameForm from "components/GameForm";
import GameAreaContainer from "containers/GameAreaContainer";

interface GamePageContainerState {
  settings: GameSettings;
  isStarted: boolean;
}

const settingsDefault: GameSettings = {
  gameMode: GameMode.FREE,
  userName: "",
  fieldSize: 2,
};

class GamePageContainer extends React.PureComponent<unknown, GamePageContainerState> {
  constructor(props = null) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = (): GamePageContainerState => {
    return {
      settings: settingsDefault,
      isStarted: false,
    };
  };

  handleSubmit = (settings: GameSettings): void => {
    this.setState({ settings, isStarted: true });
  };

  handleReset = (): void => {
    this.setState(this.getInitialState);
  };

  render(): JSX.Element {
    return (
      <>
        <GameForm initialValues={this.state.settings} onSubmit={this.handleSubmit} onReset={this.handleReset} />
        {this.state.isStarted && <GameAreaContainer settings={this.state.settings} />}
      </>
    );
  }
}

export default GamePageContainer;
