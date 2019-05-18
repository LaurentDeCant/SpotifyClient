import React, { HTMLAttributes } from "react";

export enum IconType {
  Loop = "loop",
  MusicNote = "music_note",
  MusicOff = "music_off",
  Pause = "pause",
  Person = "person",
  PlayArrow = "play_arrow",
  PlaylistPlay = "playlist_play",
  Refresh = "refresh",
  Search = "search",
  Shuffle = "shuffle",
  SkipNext = "skip_next",
  SkipPrevious = "skip_previous",
  ViewModule = "view_module",
  VolumeOff = "volume_off",
  VolumeUp = "volume_up",
  Wifi = "wifi"
}

interface Props {
  type: IconType;
}

function Icon({ className, type }: Props & HTMLAttributes<HTMLElement>) {
  return <i className={`material-icons ${className}`}>{type}</i>;
}

export default Icon;
