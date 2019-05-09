import React, { useEffect, useRef, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { DenormalizedTrack as Track } from "../../types";
import { State } from "../../reducers";
import {
  selectLoadedTrack,
  Times,
  selectTimes,
  Command,
  selectCommand,
  VolumeLevels,
  selectVolumeLevels
} from "../../reducers/player";
import {
  trackLoaded,
  playing,
  update,
  paused,
  seeked,
  volumeChanged,
  ended
} from "../../actions/player";

interface Props {
  loadedTrack?: Track;
  times: Times;
  command: Command;
  volumeLevels: VolumeLevels;
  trackLoaded: (duration: number) => void;
  playing: () => void;
  update: (elaped: number) => void;
  paused: () => void;
  seeked: () => void;
  volumeChanged: () => void;
  ended: () => void;
}

function Audio({
  loadedTrack,
  times,
  volumeLevels,
  command,
  trackLoaded,
  playing,
  update,
  paused,
  seeked,
  volumeChanged,
  ended
}: Props) {
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const currentAudio = audio.current;

    if (currentAudio) {
      const { currentTime } = times;
      const { volume, isMuted } = volumeLevels;

      switch (command) {
        case Command.Play:
          currentAudio.play();
          break;
        case Command.Pause:
          currentAudio.pause();
          break;
        case Command.Seek:
          currentAudio.currentTime = currentTime;
          break;
        case Command.ChangeVolume:
          currentAudio.volume = isMuted ? 0 : volume;
      }
    }
  });

  function handleLoadedMetadata(event: SyntheticEvent<HTMLAudioElement>) {
    const target = event.target as HTMLAudioElement;
    trackLoaded(target.duration);
  }

  function handleTimeUpdate(event: SyntheticEvent<HTMLAudioElement>) {
    const target = event.target as HTMLAudioElement;
    update(target.currentTime);
  }

  function handlePause(event: SyntheticEvent<HTMLAudioElement>) {
    const target = event.target as HTMLAudioElement;
    if (target.currentTime !== target.duration) {
      paused();
    }
  }

  return (
    <audio
      ref={audio}
      src={loadedTrack && loadedTrack.preview_url}
      onLoadedMetadata={handleLoadedMetadata}
      onPlay={playing}
      onTimeUpdate={handleTimeUpdate}
      onPause={handlePause}
      onSeeked={seeked}
      onVolumeChange={volumeChanged}
      onEnded={ended}
    />
  );
}

const mapState = (state: State) => ({
  loadedTrack: selectLoadedTrack(state),
  times: selectTimes(state),
  command: selectCommand(state),
  volumeLevels: selectVolumeLevels(state)
});

const mapDispatch = {
  trackLoaded,
  playing,
  update,
  paused,
  seeked,
  volumeChanged,
  ended
};

export default connect(
  mapState,
  mapDispatch
)(Audio);
