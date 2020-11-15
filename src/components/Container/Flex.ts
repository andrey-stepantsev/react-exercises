import styled from "@emotion/styled";

interface IFlex {
  direction?: "row" | "column";
  align?: string;
  justify?: string;
  margin?: string;
  padding?: string;
}

export const Flex = styled.div<IFlex>(
  {
    display: "flex",
  },
  (props) => ({
    flexDirection: props.direction || "row",
    alignItems: props.align || "center",
    justifyContent: props.justify || "center",
    margin: props.margin,
    padding: props.padding,
  })
);
