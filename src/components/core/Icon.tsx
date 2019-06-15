import React, { HTMLAttributes } from "react";

export enum IconType {
  Clear = "clear",
  Done = "done",
  Favorite = "favorite",
  Home = "home",
  LibraryBooks = "library_books",
  Loop = "loop",
  MusicNote = "music_note",
  MusicOff = "music_off",
  Pause = "pause",
  Person = "person",
  PlayArrow = "play_arrow",
  QueueMusic = "queue_music",
  Search = "search",
  SentimentVeryDissatisfied = "sentiment_very_dissatisfied",
  Shuffle = "shuffle",
  SkipNext = "skip_next",
  SkipPrevious = "skip_previous",
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
