import styled from "../../styles/styled";

const Wrapper = styled.div`
  margin-bottom: ${props => props.theme.thickness.large}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default Wrapper;
