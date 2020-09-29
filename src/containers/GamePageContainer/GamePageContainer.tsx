import React from "react";
import GameAreaContainer from "@/containers/GameAreaContainer";

interface GamePageContainerState {
  isStarted: boolean;
}

class GamePageContainer extends React.PureComponent<unknown, GamePageContainerState> {
  constructor(props = null) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = (): GamePageContainerState => {
    return {
      isStarted: false,
    };
  };

  render(): JSX.Element {
    return <>{this.state.isStarted && <GameAreaContainer />}</>;
  }
}

export default GamePageContainer;
