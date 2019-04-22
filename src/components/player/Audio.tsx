import React, { Component, createRef, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Track } from "../../types";
import { State } from "../../reducers";
import {
  selectCurrent,
  Times,
  selectTimes,
  Commands,
  selectCommands,
  Levels,
  selectLevels
} from "../../reducers/player";
import {
  loaded,
  playing,
  update,
  paused,
  seeked,
  changed
} from "../../actions/player";

interface Props {
  track?: Track;
  times: Times;
  commands: Commands;
  levels: Levels;
  loaded: (duration: number) => void;
  playing: () => void;
  update: (elaped: number) => void;
  paused: () => void;
  seeked: () => void;
  changed: () => void;
}

class Audio extends Component<Props> {
  audio = createRef<HTMLAudioElement>();

  componentDidUpdate() {
    const audio = this.audio.current;

    if (audio) {
      const {
        times: { currentTime },
        levels: { volume, isMuted },
        commands: { shouldPlay, shouldPause, shouldSeek, shouldChange }
      } = this.props;

      if (shouldPlay) {
        audio.play();
      } else if (shouldPause) {
        audio.pause();
      } else if (shouldSeek) {
        audio.currentTime = currentTime;
      } else if (shouldChange) {
        audio.volume = isMuted ? 0 : volume;
      }
    }
  }

  handleLoaded = (event: SyntheticEvent<HTMLAudioElement>) => {
    const target = event.target as HTMLAudioElement;
    this.props.loaded(target.duration);
  };

  handlePlay = () => {
    this.props.playing();
  };

  handleUpdate = (event: SyntheticEvent<HTMLAudioElement>) => {
    const target = event.target as HTMLAudioElement;
    this.props.update(target.currentTime);
  };

  handlePause = () => {
    this.props.paused();
  };

  handleSeeked = () => {
    this.props.seeked();
  };

  handleChange = () => {
    this.props.changed();
  };

  render() {
    const { track } = this.props;

    return (
      <audio
        ref={this.audio}
        src={track && track.preview_url}
        onLoadedMetadata={this.handleLoaded}
        onPlay={this.handlePlay}
        onTimeUpdate={this.handleUpdate}
        onPause={this.handlePause}
        onSeeked={this.handleSeeked}
        onVolumeChange={this.handleChange}
      />
    );
  }
}

const mapState = (state: State) => ({
  track: selectCurrent(state),
  times: selectTimes(state),
  commands: selectCommands(state),
  levels: selectLevels(state)
});

const mapDispatch = {
  loaded,
  playing,
  update,
  paused,
  seeked,
  changed
};

export default connect(
  mapState,
  mapDispatch
)(Audio);
