import React, { HTMLAttributes } from "react";

export enum IconType {
  Favorite = "favorite",
  Home = "home",
  LibraryBooks = "library_books",
  LibraryMusic = "library_music",
  Loop = "loop",
  MusicNote = "music_note",
  MusicOff = "music_off",
  Pause = "pause",
  Person = "person",
  PlayArrow = "play_arrow",
  PlaylistPlay = "playlist_play",
  QueueMusic = "queue_music",
  Refresh = "refresh",
  Search = "search",
  SentimentVeryDissatisfied = "sentiment_very_dissatisfied",
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
