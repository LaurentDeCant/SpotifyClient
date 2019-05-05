import styled from "../styles/styled";

const Fader = styled.div<{ isLoading: boolean }>`
  opacity: ${props => (props.isLoading ? "0" : "1")};
  transition: ${props => (props.isLoading ? "all 0" : "all 0.2s")};
`;

export default Fader;
