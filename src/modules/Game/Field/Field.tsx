import React from "react";
import { connect } from "react-redux";
import { RootState } from "@/redux/store";
import { actions, GameStatus } from "../slice";
import Field from "@/components/Field";
import { StatisticCard } from "@/modules/Statistic";

const mapStateToProps = (state: RootState) => ({
  ...state.game,
});

const mapDispatchToProps = {
  playerMove: actions.playerMove,
};

export type FieldProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const FieldComponent: React.FC<FieldProps> = ({ gameField, gameStatus, playerMove }) => (
  <>
    {gameStatus === GameStatus.STARTED && (
      <>
        <Field field={gameField} onClick={playerMove} />
        <StatisticCard />
      </>
    )}
  </>
);

export const GameField = connect(mapStateToProps, mapDispatchToProps)(FieldComponent);
