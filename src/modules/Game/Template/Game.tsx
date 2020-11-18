import React from "react";
import { connect } from "react-redux";
import { RootState } from "@/redux/store";
import { Flex, Grid } from "@/components/Container";
import { Header, HeaderSecond, Paragraph, Icon } from "@/components/Text";
import { PrimaryButton } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { Cell } from "@/components/Cell";
import { Colors, Direction, GameStatus } from "@/modules/Game/enum";
import { actions, gameOver } from "@/modules/Game/slice";

const mapStateToProps = (state: RootState) => ({
  ...state.game,
});

const mapDispatchToProps = {
  create: actions.create,
  merge: actions.merge,
  gameOver,
};

export type GameProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class GameComponent extends React.Component<GameProps> {
  createNewGame = () => {
    this.props.create(4);
    document.addEventListener("keydown", this.onKeydown, false);
  };

  onKeydown = (event: KeyboardEvent) => {
    Object.keys(Direction).map(Number).includes(event.keyCode) && this.props.merge(Direction[event.keyCode]);
  };

  removeKeyListener = () => {
    document.removeEventListener("keydown", this.onKeydown, false);
  };

  componentDidMount(): void {
    this.createNewGame();
  }

  componentWillUnmount(): void {
    this.removeKeyListener();
  }

  componentDidUpdate(): void {
    if (this.props.gameStatus === GameStatus.WIN || this.props.gameStatus === GameStatus.LOSE) {
      this.removeKeyListener();
      this.props.gameOver();
    }
  }

  render(): JSX.Element {
    return (
      <Paper width="465px" padding="25px">
        <Grid columns={2} rowGap="30px" columnGap="10px" margin="0 0 25px">
          <Flex flexDirection="column" alignItems="flex-start" padding="0 10px">
            <Header margin="0 0 8px" primary bold>
              2048
            </Header>
            <Paragraph>
              Join the tiles, get to <strong>2048</strong>!
            </Paragraph>
          </Flex>
          <Flex justifyContent="flex-end">
            <Flex flexDirection="column" alignItems="center" justifyContent="center" margin="0 0 0 25px">
              <HeaderSecond margin="0 0 8px">{this.props.score}</HeaderSecond>
              <Paragraph uppercase>Score</Paragraph>
            </Flex>
            <Flex flexDirection="column" alignItems="center" justifyContent="center" margin="0 0 0 25px">
              <HeaderSecond margin="0 0 8px">{this.props.maxScore}</HeaderSecond>
              <Paragraph uppercase>Best</Paragraph>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-start" padding="0 10px">
            <Icon className="material-icons">query_builder</Icon>
            <Paragraph>{this.props.timer}</Paragraph>
          </Flex>
          <Flex justifyContent="flex-end">
            <PrimaryButton type="button" text="New Game" icon="cached" onClick={this.createNewGame} />
          </Flex>
        </Grid>
        <Flex flexDirection="column" position="relative">
          {this.props.gameStatus === GameStatus.WIN && (
            <>
              <Flex
                flexDirection="column"
                position="absolute"
                width="100%"
                height="100%"
                alignItems="center"
                justifyContent="center"
                transparent
              >
                <Header letterSpacing="3px" margin="0 0 15px" bold>
                  You Win
                </Header>
                <Paragraph>You can start again by clicking &quot;New Game&quot;</Paragraph>
              </Flex>
            </>
          )}
          {this.props.gameStatus === GameStatus.LOSE && (
            <>
              <Flex
                flexDirection="column"
                position="absolute"
                width="100%"
                height="100%"
                alignItems="center"
                justifyContent="center"
                transparent
              >
                <Header letterSpacing="3px" margin="0 0 15px" bold>
                  Game Over
                </Header>
                <Paragraph>Try again by clicking &quot;New Game&quot;</Paragraph>
              </Flex>
            </>
          )}
          <Grid columns={4} gridGap="10px">
            {this.props.gameField.map((row, y) => [
              ...row.map(({ value }, x) => <Cell key={`${x}_${y}`} value={value} background={Colors[value]} />),
            ])}
          </Grid>
        </Flex>
      </Paper>
    );
  }
}

export const GameTemplate = connect(mapStateToProps, mapDispatchToProps)(GameComponent);
