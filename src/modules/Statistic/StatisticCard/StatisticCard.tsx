import React from "react";
import styled from "@emotion/styled";
import { RootState } from "@/redux/store";
import { connect } from "react-redux";

const StatisticCardBlock = styled.div`
  border: 2px solid #b4a89c;
  border-radius: 5px;
  margin: 25px;
  padding: 10px;
`;

const StatisticCardText = styled.p`
  color: #776e65;
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.5rem;
  text-decoration: underline;
  &:last-child {
    margin-bottom: 0;
  }
`;

const mapStateToProps = (state: RootState) => ({
  ...state.statistic,
});

export type StatisticCardProps = ReturnType<typeof mapStateToProps>;

export const StatisticCardComponent: React.FC<StatisticCardProps> = ({ time, stepsCount }) => {
  return (
    <StatisticCardBlock>
      <StatisticCardText>Time: {time}</StatisticCardText>
      <StatisticCardText>Steps: {stepsCount}</StatisticCardText>
    </StatisticCardBlock>
  );
};

export const StatisticCard = connect(mapStateToProps)(StatisticCardComponent);
