import React, { ComponentType, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "../styles/styled";
import { State } from "../reducers";
import { selectIsLoading } from "../reducers/loading";

const Fader = styled.div<{ isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  opacity: ${props => (props.isLoading ? "0" : "1")};
  transition: ${props => (props.isLoading ? "all 0" : "all 0.2s")};
`;

const Loader = styled.div<{ isLoading: boolean }>`
  height: 5px;
  left: 0;
  position: absolute;
  opacity: ${props => (props.isLoading ? "1" : "0")};
  top: 0;
  transition: ${props => (props.isLoading ? "all 0" : "all 0.2s")};
  width: 100%;
  z-index: 2;

  &::before {
    background: ${props => props.theme.foreground.secondary};
    content: "";
    height: 100%;
    position: absolute;
    width: 100%;
  }

  &::after {
    animation: transform 2s linear infinite;
    background: ${props => props.theme.foreground.primary};
    content: "";
    height: 100%;
    position: absolute;
    transform-origin: 0;
    width: 100%;

    @keyframes transform {
      0% {
        left: 0;
        width: 0;
      }
      50% {
        left: 0;
        width: 100%;
      }
      100% {
        left: 100%;
        width: 0;
      }
    }
  }
`;

const withLoader = (WrappedComponent: ComponentType<any>) => {
  const WithLoader = ({ match, isLoading, ...rest }: any) => {
    const [prevUrl, setPrevUrl] = useState(match.url);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
      setHasLoaded(!isLoading);
    }, [isLoading]);

    if (prevUrl !== match.url) {
      setHasLoaded(false);
      setPrevUrl(match.url);
    }

    return (
      <>
        <Loader isLoading={!hasLoaded || isLoading} />
        <Fader isLoading={!hasLoaded || isLoading}>
          <WrappedComponent {...rest} />
        </Fader>
      </>
    );
  };

  const mapState = (state: State) => ({
    isLoading: selectIsLoading(state)
  });

  return withRouter(
    //@ts-ignore
    connect(
      mapState,
      null
    )(WithLoader)
  );
};

export default withLoader;
