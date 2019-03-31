import React, { Component, createRef, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Track } from "../../types";
import { State } from "../../reducers";
import {
  selectCurrent,
  Times,
  Commands,
  selectTimes,
  selectCommands
} from "../../reducers/player";
import { loaded, playing, update, paused, seeked } from "../../actions/player";

interface Props {
  track?: Track;
  times: Times;
  commands: Commands;
  loaded: (duration: number) => void;
  playing: () => void;
  update: (elaped: number) => void;
  paused: () => void;
  seeked: () => void;
}

class Audio extends Component<Props> {
  audio = createRef<HTMLAudioElement>();

  componentDidUpdate() {
    const audio = this.audio.current;

    if (audio) {
      const {
        times: { currentTime },
        commands: { shouldPlay, shouldPause, shouldSeek }
      } = this.props;

      if (shouldPlay) {
        audio.play();
      } else if (shouldPause) {
        audio.pause();
      } else if (shouldSeek) {
        console.log("seek");
        audio.currentTime = currentTime;
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
      />
    );
  }
}

const mapState = (state: State) => ({
  track: selectCurrent(state),
  times: selectTimes(state),
  commands: selectCommands(state)
});

const mapDispatch = {
  loaded: loaded,
  playing: playing,
  update: update,
  paused: paused,
  seeked: seeked
};

export default connect(
  mapState,
  mapDispatch
)(Audio);
