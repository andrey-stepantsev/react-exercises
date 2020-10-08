import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { FormFlex, FormBody, FormTitle, FormInput, FormFooter, FormButton } from "@/components/Form";
import { actions, GameMode } from "../slice";
import { RootState } from "@/redux/store";

const mapStateToProps = (state: RootState) => ({
  ...state.settings,
});

const mapDispatchToProps = {
  ...actions,
};

const sizeOptions = [2, 4, 6, 8];

export type SettingsFormValues = ReturnType<typeof mapStateToProps>;
export type SettingsFormProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const SettingsFormComponent: React.FC<SettingsFormProps> = ({ update, reset, gameMode, fieldSize }) => {
  const handleSubmit = (settings: SettingsFormValues): void => {
    update(settings);
  };

  const handleReset = (): void => {
    reset();
  };

  return (
    <Formik initialValues={{ gameMode, fieldSize }} onSubmit={handleSubmit} enableReinitialize>
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
            <FormButton id="js-reset" type="button" onClick={handleReset}>
              Reset
            </FormButton>
          </FormFooter>
        </FormBody>
      </FormFlex>
    </Formik>
  );
};

export const SettingsForm = connect(mapStateToProps, mapDispatchToProps)(SettingsFormComponent);
