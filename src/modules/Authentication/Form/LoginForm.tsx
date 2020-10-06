import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import { actions } from "../slice";
import { FormFlex, FormBody, FormTitle, FormInput, FormFooter, FormButton } from "@/components/Form";
import { RootState } from "@/redux/store";

const mapStateToProps = (state: RootState) => ({
  ...state.authentication,
});

const mapDispatchToProps = {
  login: actions.login,
};

export type LoginFormValues = ReturnType<typeof mapStateToProps>;
export type LoginFormProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const LoginFormComponent: React.FC<LoginFormProps> = ({ login, userName }) => {
  const handleSubmit = async ({ userName }: LoginFormValues): Promise<void> => {
    userName.trim().length && login(userName);
  };

  const FormFragment = (
    <Formik initialValues={{ userName }} onSubmit={handleSubmit}>
      <FormFlex>
        <FormBody>
          <FormTitle>Login Form</FormTitle>
          <label>User:</label>
          <FormInput type="text" name="userName" required />
          <FormFooter>
            <FormButton type="submit">Sign In</FormButton>
          </FormFooter>
        </FormBody>
      </FormFlex>
    </Formik>
  );

  return userName.trim().length == 0 ? FormFragment : <Redirect to="/" />;
};

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);
