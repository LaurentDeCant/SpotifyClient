import styled from "../../styles/styled";

const Heading = styled.h2`
  font-size: ${props => props.theme.fontSize.extraLarge}px;
  font-weight: ${props => props.theme.fontWeight.bold};
  margin-bottom: ${props => props.theme.thickness.medium}px;
  text-align: center;
  width: 100%;
  word-break: break-word;
`;

export default Heading;
