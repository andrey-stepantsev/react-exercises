import React from "react";
import isEqual from "lodash/isEqual";
import FieldContainer, { SizeType } from "../FieldContainer/FieldContainer";
import GameForm from "../../components/GameForm/GameForm";

export interface GameSettings {
  userName: string;
  fieldSize: SizeType;
}

interface GamePageState {
  settings: GameSettings;
  isStarted: boolean;
}

const settingsDefault: GameSettings = {
  userName: "",
  fieldSize: 2,
};

class GamePageContainer extends React.Component<unknown, GamePageState> {
  constructor(props = null) {
    super(props);
    this.state = {
      settings: settingsDefault,
      isStarted: false,
    };
  }

  handleSubmit = (settings: GameSettings): void => {
    this.setState({ settings, isStarted: true });
  };

  resetHandler = (): void => {
    this.setState({ settings: settingsDefault, isStarted: false });
  };

  shouldComponentUpdate(_: unknown, nextState: GamePageState): boolean {
    return !isEqual(this.state, nextState);
  }

  render(): JSX.Element {
    return (
      <>
        <GameForm initialValues={this.state.settings} onSubmit={this.handleSubmit} onReset={this.resetHandler} />
        {this.state.isStarted && <FieldContainer size={this.state.settings.fieldSize} />}
      </>
    );
  }
}

export default GamePageContainer;
