import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { actions } from "../slice";
import { FormFlex, FormBody, FormTitle, FormInput, FormFooter, FormButton } from "@/components/Form";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";

const mapStateToProps = (state: RootState) => ({
  ...state.authentication,
});

const mapDispatchToProps = {
  login: actions.login,
};

export type LoginFormValues = ReturnType<typeof mapStateToProps>;
export type LoginFormProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const LoginFormComponent: React.FC<LoginFormProps> = ({ login, userName }) => {
  const router = useRouter();

  const handleSubmit = async ({ userName }: LoginFormValues): Promise<void> => {
    userName.trim().length && login(userName);
    router.replace("/game");
  };

  return (
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
};

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);
