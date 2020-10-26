import styled from "@emotion/styled";

interface IPaper {
  width: string;
}

export const Paper = styled.div<IPaper>`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 40px;
  width: ${({ width }) => width};
`;
