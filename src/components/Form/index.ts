import styled from "@emotion/styled";
import { Form, Field } from "formik";

export const FormFlex = styled(Form)`
  display: flex;
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

export const Label = styled.label`
  color: #212121;
  margin-bottom: 10px;
`;

export const Input = styled(Field)`
  border: 1px solid #9e9e9e;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.87);
  font-size: 18px;
  outline: none;
  padding: 14px 14px 13px;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
