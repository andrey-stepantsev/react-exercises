import styled from "@emotion/styled";

export const CardBlock = styled.div`
  border: 2px solid #b4a89c;
  border-radius: 5px;
  margin: 25px 15px;
  padding: 15px;
  position: relative;
  width: 305px;
`;

export const CardHeader = styled.h3`
  color: #776e65;
  font-weight: bold;
  margin: 0;
  margin-bottom: 10px;
`;

export const CardText = styled.p`
  color: #776e65;
  font-weight: bold;
  margin: 0;
  margin-bottom: 5px;
  text-decoration: underline;
  &:last-child {
    margin-bottom: 0;
  }
`;
