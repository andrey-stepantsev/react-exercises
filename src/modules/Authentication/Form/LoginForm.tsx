import React from "react";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import { actions } from "../slice";
import { Label, Input, Group } from "@/components/Form";
import { Button } from "@/components/Button";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { WelcomeText } from "@/components/Text";
import { Paper } from "@/components/Paper";

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
    <Paper width="400px">
      <Formik initialValues={{ userName }} onSubmit={handleSubmit}>
        <Form>
          <WelcomeText />
          <Group>
            <Label>Username</Label>
            <Input type="text" name="userName" required />
          </Group>
          <Button type="submit" icon="person_add" text="New Session" />
        </Form>
      </Formik>
    </Paper>
  );
};

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);
