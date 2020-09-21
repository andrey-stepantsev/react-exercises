import React from "react";
import styled from "@emotion/styled";
import { Formik, Form, Field } from "formik";
import { SizeType, GameSettings } from "@/types/GameTypes";
import { GameMode } from "@/enums/GameEnums";

interface GameFormProps {
  initialValues: GameSettings;
  onSubmit(settings: GameSettings): void;
  onReset(): void;
}

const sizeOptions: SizeType[] = [2, 4, 6, 8];

const FormFlex = styled(Form)`
  display: flex;
  margin: 25px 15px;
  width: 340px;
`;

const FormBody = styled.fieldset`
  border-radius: 10px;
  padding: 15px;
  width: 100%;
`;

const FormTitle = styled.legend`
  margin-left: auto;
  margin-right: auto;
  padding: 0 5px;
  width: auto;
`;

const FormInput = styled(Field)`
  border: 1px solid #a69999;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 5px 0 15px 0;
  padding: 8px;
  width: 100%;
`;

const FormFooter = styled.div`
  text-align: center;
`;

const FormButton = styled.button`
  background-color: #eee4da;
  border: 1px solid #b4a89c;
  border-radius: 5px;
  color: #776e65;
  cursor: pointer;
  font-weight: bold;
  margin: 0 5px;
  padding: 8px 10px;
  &:hover {
    background-color: #f8efe6;
  }
`;

const GameForm: React.FC<GameFormProps> = ({ initialValues, onSubmit, onReset }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
      <FormFlex>
        <FormBody>
          <FormTitle>Game Settings</FormTitle>
          <label>Game Mode:</label>
          <FormInput type="text" name="gameMode" as="select">
            {Object.values(GameMode).map((value) => (
              <option key={value}>{value}</option>
            ))}
          </FormInput>
          <label>Field Size:</label>
          <FormInput type="number" name="fieldSize" as="select">
            {sizeOptions.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </FormInput>
          <FormFooter>
            <FormButton type="submit">New Game</FormButton>
            <FormButton type="button" onClick={onReset}>
              Reset
            </FormButton>
          </FormFooter>
        </FormBody>
      </FormFlex>
    </Formik>
  );
};

export default GameForm;
