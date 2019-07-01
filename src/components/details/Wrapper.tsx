import styled from "../../styles/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;

  :not(:last-child) {
    margin-bottom: ${props => props.theme.thickness.medium}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.small}px) {
    flex-direction: row;
  }
`;

export default Wrapper;
