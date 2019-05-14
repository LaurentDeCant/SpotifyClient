import React, { HTMLAttributes } from "react";

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
  VolumeOff = "volume_off",
  VolumeUp = "volume_up",
  Wifi = "wifi"
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  type: IconType;
}

function Icon({ className, type }: Props) {
  return <i className={`material-icons ${className}`}>{type}</i>;
}

export default Icon;
