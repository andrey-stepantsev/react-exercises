import React from "react";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";
import { Flex } from "@/components/Container";
import { Paper } from "@/components/Paper";
import { Label, Input } from "@/components/Form";
import { HeaderSecond, Paragraph } from "@/components/Text";
import { PrimaryButton } from "@/components/Button";
import { actions, AuthenticationState } from "../slice";

export const mapStateToProps = (state: RootState): AuthenticationState => ({
  ...state.authentication,
});

const mapDispatchToProps = {
  login: actions.login,
};

export type LoginFormValues = ReturnType<typeof mapStateToProps>;
export type LoginFormProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const LoginFormComponent: React.FC<LoginFormProps> = ({ login, userName }) => {
  const router = useRouter();

  const onSubmit = async ({ userName }: LoginFormValues): Promise<void> => {
    login(userName);
    router.replace("/game");
  };

  return (
    <Paper margin="30px" padding="30px">
      <Formik initialValues={{ userName }} onSubmit={onSubmit}>
        <Form>
          <Flex direction="column" margin="35px">
            <HeaderSecond spacing="3px" margin="0 0 10px" primary bold uppercase>
              The House of Logic
            </HeaderSecond>
            <Paragraph spacing="3px" margin="0 0 10px" primary bold uppercase>
              Raise Your Skills
            </Paragraph>
          </Flex>
          <Flex direction="column" align="stretch" margin="0 0 15px">
            <Label>Username</Label>
            <Input type="text" name="userName" required />
          </Flex>
          <PrimaryButton type="submit" text="New Session" icon="person_add" fluid />
        </Form>
      </Formik>
    </Paper>
  );
};

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);
