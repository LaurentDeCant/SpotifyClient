import React, { Props } from "react";

export enum IconType {
  MusicNote = "music_note",
  MusicOff = "music_off",
  Pause = "pause",
  Person = "person",
  PlayArrow = "play_arrow",
  Refresh = "refresh",
  Search = "search",
  SkipNext = "skip_next",
  SkipPrevious = "skip_previous",
  ViewModule = "view_module",
  Wifi = "wifi"
}

interface OwnProps {
  type: IconType;
  className?: string;
}

const Icon = (props: OwnProps) => {
  const { type, className } = props;

  return <i className={`material-icons ${className}`}>{type}</i>;
};

export default Icon;
