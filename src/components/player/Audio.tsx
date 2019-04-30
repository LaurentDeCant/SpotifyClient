import React, { Component, createRef, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Track } from "../../types";
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
  loaded,
  playing,
  update,
  paused,
  seeked,
  volumeChanged
} from "../../actions/player";

interface Props {
  loadedTrack?: Track;
  times: Times;
  command: Command;
  volumeLevels: VolumeLevels;
  loaded: (duration: number) => void;
  playing: () => void;
  update: (elaped: number) => void;
  paused: () => void;
  seeked: () => void;
  volumeChanged: () => void;
}

class Audio extends Component<Props> {
  audio = createRef<HTMLAudioElement>();

  componentDidUpdate() {
    const audio = this.audio.current;

    if (audio) {
      const {
        times: { currentTime },
        volumeLevels: { volume, isMuted },
        command
      } = this.props;

      switch (command) {
        case Command.Play:
          audio.play();
          break;
        case Command.Pause:
          audio.pause();
          break;
        case Command.Seek:
          audio.currentTime = currentTime;
          break;
        case Command.ChangeVolume:
          audio.volume = isMuted ? 0 : volume;
      }
    }
  }

  handleLoadedMetadata = (event: SyntheticEvent<HTMLAudioElement>) => {
    const target = event.target as HTMLAudioElement;
    this.props.loaded(target.duration);
  };

  handlePlay = () => {
    this.props.playing();
  };

  handleTimeUpdate = (event: SyntheticEvent<HTMLAudioElement>) => {
    const target = event.target as HTMLAudioElement;
    this.props.update(target.currentTime);
  };

  handlePause = () => {
    this.props.paused();
  };

  handleSeeked = () => {
    this.props.seeked();
  };

  handleVolumeChange = () => {
    this.props.volumeChanged();
  };

  handleEnded = () => {};

  render() {
    const { loadedTrack } = this.props;

    return (
      <audio
        ref={this.audio}
        src={loadedTrack && loadedTrack.preview_url}
        onLoadedMetadata={this.handleLoadedMetadata}
        onPlay={this.handlePlay}
        onTimeUpdate={this.handleTimeUpdate}
        onPause={this.handlePause}
        onSeeked={this.handleSeeked}
        onVolumeChange={this.handleVolumeChange}
        onEnded={this.handleEnded}
      />
    );
  }
}

const mapState = (state: State) => ({
  loadedTrack: selectLoadedTrack(state),
  times: selectTimes(state),
  command: selectCommand(state),
  volumeLevels: selectVolumeLevels(state)
});

const mapDispatch = {
  loaded,
  playing,
  update,
  paused,
  seeked,
  volumeChanged
};

export default connect(
  mapState,
  mapDispatch
)(Audio);
