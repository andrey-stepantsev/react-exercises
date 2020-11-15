import styled from "@emotion/styled";

interface IGrid {
  rows?: number;
  columns?: number;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  margin?: string;
}

export const Grid = styled.div<IGrid>(
  {
    display: "grid",
  },
  (props) => ({
    gridTemplateRows: props.rows && `repeat(${props.rows}, 1fr)`,
    gridTemplateColumns: props.columns && `repeat(${props.columns}, 1fr)`,
    gridGap: props.gap,
    rowGap: props.rowGap,
    columnGap: props.columnGap,
    margin: props.margin,
  })
);
