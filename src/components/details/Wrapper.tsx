import styled from "../../styles/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 960px) {
    flex-direction: row;
  }
`;

export default Wrapper;
