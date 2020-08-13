import React, { Component } from "react";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import Field from "../../components/Field";
import { generateField } from "../../utils/GameUtils";

export type SizeType = 2 | 4 | 6 | 8;

interface FieldContainerProps {
  size: SizeType;
}

interface FieldContainerState {
  field: number[][];
  blankXY: { x: number; y: number };
}

class FieldContainer extends Component<FieldContainerProps, FieldContainerState> {
  constructor(props: FieldContainerProps) {
    super(props);
    const { size } = this.props;
    this.state = { field: generateField(size), blankXY: { x: size - 1, y: size - 1 } };
  }

  public onClick = (x: number, y: number): void => {
    const field: number[][] = cloneDeep(this.state.field);
    let { x: blankX, y: blankY } = this.state.blankXY;
    const offset = Math.abs(x - blankX) + Math.abs(y - blankY);

    if (offset === 1) {
      [field[y][x], field[blankY][blankX]] = [field[blankY][blankX], field[y][x]];
      blankX = x;
      blankY = y;
    }

    this.setState({ field, blankXY: { x: blankX, y: blankY } });
  };

  shouldComponentUpdate(nextProps: FieldContainerProps, nextState: FieldContainerState): boolean {
    return this.props.size !== nextProps.size || !isEqual(this.state.field, nextState.field);
  }

  componentDidUpdate(prevProps: FieldContainerProps): void {
    if (prevProps.size !== this.props.size) {
      const { size } = this.props;
      this.setState({ field: generateField(size), blankXY: { x: size - 1, y: size - 1 } });
    }
  }

  render(): JSX.Element {
    return <Field field={this.state.field} onClick={this.onClick} />;
  }
}

export default FieldContainer;
