import styled from "../../styles/styled";

const Heading = styled.h2`
  font-size: ${props => props.theme.font.size.extraExtraLarge};
  font-weight: ${props => props.theme.font.weight.bold};
  margin-bottom: 25px;
  text-align: center;
  width: 100%;
`;

export default Heading;
