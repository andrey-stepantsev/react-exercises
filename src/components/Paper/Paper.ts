import styled from "@emotion/styled";

interface IPaper {
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
}

export const Paper = styled.div<IPaper>(
  {
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
    minWidth: "245px",
  },
  ({ margin, padding, width, height }) => ({
    margin,
    padding,
    width,
    height,
  })
);
