import React, { Component } from "react";
import Field from "../components/Field";
import { generateField } from "../utils/GameUtils";

type SizeType = 2 | 4 | 6 | 8;

interface FieldContainerProps {
  width: SizeType;
  height: SizeType;
}

interface FieldContainerState {
  field: number[][];
  blankXY: { x: number; y: number };
}

class FieldContainer extends Component<FieldContainerProps, FieldContainerState> {
  constructor(props: FieldContainerProps) {
    super(props);
    const { width, height } = props;
    this.state = {
      field: generateField(width, height),
      blankXY: { x: width - 1, y: height - 1 },
    };
  }

  public onClick = (x: number, y: number): void => {
    const field: number[][] = this.state.field;
    const { x: blankX, y: blankY } = this.state.blankXY;
    const offset = Math.abs(x - blankX) + Math.abs(y - blankY);

    if (offset === 1) {
      [field[y][x], field[blankY][blankX]] = [field[blankY][blankX], field[y][x]];
      this.setState({
        field: field,
        blankXY: { x, y },
      });
    }
  };

  render(): JSX.Element {
    return <Field field={this.state.field} onClick={this.onClick} />;
  }
}

export default FieldContainer;
