import React from "react";
import { getDefaultProps } from "./medium-2";

type ClassComponentPropsType = {
  x: number;
  y: number;
};

type FunctionComponentPropsType = {
  name: string;
  age: number;
};

const ClassComponentProps: ClassComponentPropsType = {
  x: 1,
  y: 1,
};

const FunctionComponentProps: FunctionComponentPropsType = {
  name: "Andrey",
  age: 21,
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
class TestClassComponent extends React.Component<ClassComponentPropsType, any> {
  constructor(props: ClassComponentPropsType) {
    super(props);
  }
  static defaultProps: ClassComponentPropsType = ClassComponentProps;
}

const TestFunctionComponent: React.FC<FunctionComponentPropsType> = () => null;
const TestFunctionComponentEmpty: React.FC<FunctionComponentPropsType> = () => null;

TestFunctionComponent.defaultProps = FunctionComponentProps;

describe("Medium-2 test cases", () => {
  it("class component default props", () => {
    expect(getDefaultProps(TestClassComponent)).toEqual(ClassComponentProps);
  });
  it("function component default props", () => {
    expect(getDefaultProps(TestFunctionComponent)).toEqual(FunctionComponentProps);
  });
  it("function component empty default props", () => {
    expect(getDefaultProps(TestFunctionComponentEmpty)).toBeUndefined();
  });
});
