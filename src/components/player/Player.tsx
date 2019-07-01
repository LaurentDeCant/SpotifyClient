import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import styled from "../../styles/styled";
import { seek } from "../../actions/player";
import { State } from "../../reducers";
import { Times, selectTimes, selectCanSeek } from "../../selectors/player";
import { IconType, RoundButton } from "../core";
import TrackInfos from "./TrackInfos";
import Audio from "./Audio";
import Controls from "./Controls";
import Playback from "./Playback";
import Volume from "./Volume";

const Wrapper = styled.div`
  align-items: center;
  background: ${props => props.theme.background.tertiary};
  box-sizing: border-box;
  box-shadow: ${props => props.theme.shadow.middle};
  display: flex;
  padding: ${props => props.theme.thickness.small}px;
  z-index: 2;
`;

const ThirdWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
`;

const LeftWrapper = styled(ThirdWrapper)`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    display: block;
    width: 25%;
  }
`;

const CenterWrapper = styled(ThirdWrapper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    padding: 0 ${props => props.theme.thickness.small}px;
    width: 50%;
  }
`;

const RightWrapper = styled(ThirdWrapper)`
  align-items: center;
  display: none;
  justify-content: flex-end;

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    display: flex;
    width: 25%;
  }
`;

const StyledVolume = styled(Volume)`
  flex-grow: 1;
`;

const QueueButton = styled(RoundButton).attrs(() => ({
  iconType: IconType.QueueMusic
}))``;

interface Props extends RouteComponentProps {
  times: Times;
  canSeek: boolean;
  seek: (time: number) => void;
}

function Player({
  className,
  history,
  times,
  canSeek,
  seek
}: Props & HTMLAttributes<HTMLElement>) {
  function handleQueueClick() {
    history.push(`${process.env.PUBLIC_URL}/queue`);
  }

  return (
    <Wrapper className={className}>
      <LeftWrapper>
        <TrackInfos />
      </LeftWrapper>

      <CenterWrapper>
        <Controls />

        <Playback
          duration={times.duration}
          currentTime={times.currentTime}
          canSeek={canSeek}
          onSeek={seek}
        />
      </CenterWrapper>

      <RightWrapper>
        <QueueButton onClick={handleQueueClick} />
        <StyledVolume />
      </RightWrapper>

      <Audio />
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  times: selectTimes(state),
  canSeek: selectCanSeek(state)
});

const mapDispatch = {
  seek
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Player)
);
