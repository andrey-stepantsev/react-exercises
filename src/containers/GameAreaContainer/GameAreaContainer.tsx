import React from "react";
import cloneDeep from "lodash/cloneDeep";
import { generateField } from "@/utils/GameUtils";
import GameArea from "@/components/GameArea";

interface GameAreaContainerState {
  field: number[][];
  timer: string;
  stepsCount: number;
}

class GameAreaContainer extends React.PureComponent<unknown, GameAreaContainerState> {
  intervalID?: NodeJS.Timeout;
  initialTime: number;

  constructor(props = null) {
    super(props);
    const fieldSize = 2;
    this.state = { field: generateField(fieldSize), timer: "00:00", stepsCount: 0 };
    this.initialTime = Date.now();
    this.updateTimer = this.updateTimer.bind(this);
  }

  public onClick = (x: number, y: number): void => {
    const field: number[][] = cloneDeep(this.state.field);
    const blankY = field.findIndex((v) => v.includes(0));
    const blankX = field[blankY].indexOf(0);
    const offset = Math.abs(x - blankX) + Math.abs(y - blankY);

    if (offset === 1) {
      [field[y][x], field[blankY][blankX]] = [field[blankY][blankX], field[y][x]];
      this.setState({ field, stepsCount: this.state.stepsCount + 1 });
    } else {
      this.setState({ ...this.state });
    }
  };

  updateTimer(): void {
    const milliseconds = Date.now() - this.initialTime;
    const timer = this.convertTime(milliseconds);
    this.setState({ timer });
  }

  convertTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;
    return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  };

  componentDidMount(): void {
    this.intervalID = setInterval(this.updateTimer, 1000);
  }

  componentWillUnmount(): void {
    this.intervalID && clearInterval(this.intervalID);
  }

  render(): JSX.Element {
    return <GameArea {...this.state} onClick={this.onClick} />;
  }
}

export default GameAreaContainer;
