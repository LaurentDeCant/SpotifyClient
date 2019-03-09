import React, { FunctionComponent, ComponentType } from "react";
import styled from "styled-components";

interface Props {
  isLoading: boolean;
}

const Wrapper = styled.div`
  height: 100%;
  position: relative;
`;

const Loader = styled.div`
  background: rgba(0, 0, 0, 0.5);
  height: calc(100% + 50px);
  margin: -25px;
  position: absolute;
  top: 0;
  width: calc(100% + 50px);

  &::before {
    animation: scale 2s linear infinite;
    background: white;
    content: "";
    height: 5px;
    position: absolute;
    transform-origin: 0;
    width: 100%;

    @keyframes scale {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }
  }
`;

const Container = styled.div`
  opacity: ${(props: Props) => (props.isLoading ? "0" : "1")};
  transition: ${(props: Props) => (props.isLoading ? "all 0s" : "all 0.5s")};
`;

const withLoader = <P extends Props>(
  WrappedComponent: ComponentType<P>
): FunctionComponent<P> => {
  return ({ isLoading, ...rest }: any) => {
    return (
      <Wrapper>
        <Container isLoading={isLoading}>
          <WrappedComponent {...rest} />
        </Container>
        {isLoading && <Loader />}
      </Wrapper>
    );
  };
};

export default withLoader;
