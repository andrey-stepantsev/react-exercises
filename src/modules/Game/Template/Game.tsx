import React from "react";
import { connect } from "react-redux";
import { RootState } from "@/redux/store";
import { actions, merge } from "../slice";
import { Direction } from "../enum";
import { Flex, Grid } from "@/components/Container";
import { Header, Paragraph, Icon, HeaderSecond } from "@/components/Text";
import { PrimaryButton } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { Cell } from "@/components/Cell";

const mapStateToProps = (state: RootState) => ({
  ...state.game,
});

const mapDispatchToProps = {
  merge,
  create: actions.create,
};

export type GameProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class GameComponent extends React.Component<GameProps> {
  createNewGame = () => {
    this.props.create(4);
  };

  onKeydown = (event: KeyboardEvent) => {
    Object.keys(Direction).map(Number).includes(event.keyCode) && this.props.merge(Direction[event.keyCode]);
  };

  componentDidMount(): void {
    this.createNewGame();
    document.addEventListener("keydown", this.onKeydown, false);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.onKeydown, false);
  }

  render(): JSX.Element {
    return (
      <Paper width="465px" padding="25px">
        <Grid columns={2} rowGap="30px" columnGap="10px" margin="0 0 25px">
          <Flex direction="column" align="flex-start" padding="0 10px">
            <Header margin="0 0 8px" primary bold>
              2048
            </Header>
            <Paragraph>
              Join the tiles, get to <strong>2048</strong>!
            </Paragraph>
          </Flex>
          <Flex justify="flex-end">
            <Flex direction="column" margin="0 0 0 25px">
              <HeaderSecond margin="0 0 8px">{this.props.score}</HeaderSecond>
              <Paragraph uppercase>Score</Paragraph>
            </Flex>
            <Flex direction="column" margin="0 0 0 25px">
              <HeaderSecond margin="0 0 8px">{this.props.maxScore}</HeaderSecond>
              <Paragraph uppercase>Best</Paragraph>
            </Flex>
          </Flex>
          <Flex justify="flex-start" padding="0 10px">
            <Icon className="material-icons">query_builder</Icon>
            <Paragraph>{this.props.timer}</Paragraph>
          </Flex>
          <Flex justify="flex-end">
            <PrimaryButton type="button" text="New Game" icon="cached" onClick={this.createNewGame} />
          </Flex>
        </Grid>
        <Grid columns={4} gap="10px">
          {this.props.gameField.map((row, y) => [
            ...row.map((column, x) => <Cell key={`${x}_${y}`} value={column.value} />),
          ])}
        </Grid>
      </Paper>
    );
  }
}

export const GameTemplate = connect(mapStateToProps, mapDispatchToProps)(GameComponent);
