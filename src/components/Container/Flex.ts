import styled from "@emotion/styled";

interface IFlex {
  flexDirection?: "row" | "column";
  position?: "absolute" | "relative";
  alignItems?: string;
  justifyContent?: string;
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
  transparent?: boolean;
}

export const Flex = styled.div<IFlex>(
  {
    display: "flex",
  },
  ({ flexDirection = "row", alignItems = "unset", justifyContent = "unset", ...props }) => ({
    flexDirection,
    position: props.position,
    alignItems,
    justifyContent,
    margin: props.margin,
    padding: props.padding,
    width: props.width,
    height: props.height,
    backgroundColor: props.transparent ? "rgba(215, 215, 215, 0.9)" : "",
  })
);
