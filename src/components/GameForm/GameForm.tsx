import React from "react";
import { Formik, Form, Field } from "formik";
import { SizeType } from "../../containers/FieldContainer/FieldContainer";
import { GameSettings } from "../../containers/GamePageContainer/GamePageContainer";
import "./GameForm.css";

interface GameFormProps {
  initialValues: GameSettings;
  onSubmit(data: GameSettings): void;
  onReset(): void;
}

const sizeOptions: SizeType[] = [2, 4, 6, 8];

const GameForm: React.FC<GameFormProps> = ({ initialValues, onSubmit, onReset }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
      <Form className="form">
        <fieldset className="form__body">
          <legend className="form__body__title">Game Settings</legend>
          <label>User:</label>
          <Field className="form__input" type="text" name="userName" />
          <label>Field Size:</label>
          <Field className="form__input" type="number" name="fieldSize" as="select">
            {sizeOptions.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </Field>
          <div className="form__footer">
            <button className="form__button" type="submit">
              Start
            </button>
            <button className="form__button" type="button" onClick={onReset}>
              Reset
            </button>
          </div>
        </fieldset>
      </Form>
    </Formik>
  );
};

export default GameForm;
