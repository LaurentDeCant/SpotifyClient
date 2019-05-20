import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { State } from "../../reducers";
import { Times, selectTimes, selectCanSeek } from "../../reducers/player";
import { seek } from "../../actions/player";
import TrackInfos from "./TrackInfos";
import Audio from "./Audio";
import Controls from "./Controls";
import Playback from "./Playback";
import Volume from "./Volume";

const Wrapper = styled.div`
  align-items: center;
  background: ${props => props.theme.background.light};
  box-sizing: border-box;
  box-shadow: 0 -2px 4px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  height: ${props => props.theme.thickness.extraLarge}px;
  padding: ${props => props.theme.thickness.small}px;
  z-index: 2;
`;

const ThirdWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
`;

const LeftWrapper = styled(ThirdWrapper)`
  display: none;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    display: block;
    width: 25%;
  }
`;

const CenterWrapper = styled(ThirdWrapper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-evenly;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    padding: 0 ${props => props.theme.thickness.small}px;
    width: 50%;
  }
`;

const RightWrapper = styled(ThirdWrapper)`
  display: none;
  justify-content: flex-end;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    display: flex;
    width: 25%;
  }
`;

interface Props {
  times: Times;
  canSeek: boolean;
  seek: (time: number) => void;
}

function Player({
  className,
  times,
  canSeek,
  seek
}: Props & HTMLAttributes<HTMLElement>) {
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
        <Volume />
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

export default connect(
  mapState,
  mapDispatch
)(Player);
