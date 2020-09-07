import React from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { logIn } from "utils/AuthUtils";

interface LoginFormType {
  userName: string;
}

export const FormFlex = styled(Form)`
  display: flex;
  margin: 25px 15px;
  width: 340px;
`;

export const FormBody = styled.fieldset`
  border-radius: 10px;
  padding: 15px;
  width: 100%;
`;

export const FormTitle = styled.legend`
  margin-left: auto;
  margin-right: auto;
  padding: 0 5px;
  width: auto;
`;

export const FormInput = styled(Field)`
  border: 1px solid #a69999;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 5px 0 15px 0;
  padding: 8px;
  width: 100%;
`;

export const FormFooter = styled.div`
  text-align: center;
`;

export const FormButton = styled.button`
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

const LoginForm: React.FC = () => {
  const history = useHistory();

  const handleSubmit = async (values: LoginFormType): Promise<void> => {
    await logIn(values.userName);
    history.push("/");
  };

  return (
    <Formik initialValues={{ userName: "" }} onSubmit={handleSubmit}>
      <FormFlex>
        <FormBody>
          <FormTitle>Login Form</FormTitle>
          <label>User:</label>
          <FormInput type="text" name="userName" />
          <FormFooter>
            <FormButton type="submit">Sign In</FormButton>
          </FormFooter>
        </FormBody>
      </FormFlex>
    </Formik>
  );
};

export default React.memo(LoginForm);
