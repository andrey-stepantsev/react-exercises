import styled from "@emotion/styled";

interface IGrid {
  rows?: number;
  columns?: number;
  gridGap?: string;
  rowGap?: string;
  columnGap?: string;
  margin?: string;
}

export const Grid = styled.div<IGrid>(
  {
    display: "grid",
  },
  ({ rows, columns, gridGap, rowGap, columnGap, margin }) => ({
    gridTemplateRows: rows && `repeat(${rows}, 1fr)`,
    gridTemplateColumns: columns && `repeat(${columns}, 1fr)`,
    gridGap,
    rowGap,
    columnGap,
    margin,
  })
);
