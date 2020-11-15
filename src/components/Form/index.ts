import styled from "@emotion/styled";
import { Field } from "formik";

export const Label = styled.label({
  color: "#212121",
  marginBottom: "10px",
});

export const Input = styled(Field)({
  border: "1px solid #9e9e9e",
  borderRadius: "5px",
  color: "rgba(0, 0, 0, 0.87)",
  fontSize: "1.1rem",
  outline: "none",
  padding: "12px 14px",
});
