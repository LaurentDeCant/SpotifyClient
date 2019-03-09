import React, { FunctionComponent, ComponentType } from "react";
import styled from "styled-components";

interface Props {
  isLoading: boolean;
}

const Wrapper = styled.div`
  opacity: ${(props: Props) => (props.isLoading ? "0" : "1")};
  transition: ${(props: Props) => (props.isLoading ? "all 0s" : "all 0.2s")};
`;

const withLoader = <P extends Props>(
  WrappedComponent: ComponentType<P>
): FunctionComponent<P> => {
  return ({ isLoading, ...rest }: any) => {
    return (
      <Wrapper isLoading={isLoading}>
        <WrappedComponent {...rest} />
      </Wrapper>
    );
  };
};

export default withLoader;
