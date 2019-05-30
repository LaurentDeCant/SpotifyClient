import { createSelector } from "reselect";
import {
  ActionType,
  LoadCollectionAction,
  LoadTrackAction,
  TrackLoadedAction,
  UpdateAction,
  SeekAction,
  ChangeVolumeAction
} from "../actions/player";
import { State as CombinedState } from ".";
import { Collection } from "./types";
import createReducer from "./createReducer";
import { selectTrack, selectTracks } from "./tracks";
import { selectAlbum } from "./albums";
import { selectArtists } from "./artists";

enum PlayerState {
  None = "NONE",
  Playing = "IS_PLAYING",
  Paused = "IS_PAUSED"
}

export enum Command {
  None = "NONE",
  Play = "PLAY",
  Pause = "PAUSE",
  Seek = "SEEK",
  ChangeVolume = "CHANGE_VOLUME"
}

export interface State {
  collections: Collection[];
  trackIds: string[];
  trackIndex: number;
  playerState: PlayerState;
  duration: number;
  currentTime: number;
  isShuffled: boolean;
  isLooped: boolean;
  volume: number;
  isMuted: boolean;
  command: Command;
}

const initialState: State = {
  collections: [],
  trackIds: [],
  trackIndex: 0,
  playerState: PlayerState.None,
  duration: 0,
  currentTime: 0,
  isShuffled: false,
  isLooped: false,
  volume: 1,
  isMuted: false,
  command: Command.None
};

export default createReducer(initialState, {
  [ActionType.LoadCollection]: (
    state: State,
    { payload }: LoadCollectionAction
  ): State => {
    const { collectionId, collectionType, trackIds, trackId } = payload;
    return {
      ...state,
      collections: [
        { id: collectionId, type: collectionType },
        ...state.collections.filter(recent => recent.id !== collectionId)
      ],
      trackIds: trackIds,
      trackIndex: trackId ? trackIds.indexOf(trackId) : 0,
      command: Command.Play
    };
  },
  [ActionType.LoadTrack]: (state: State, { payload }: LoadTrackAction) => ({
    ...state,
    trackIndex: state.trackIds.indexOf(payload.trackId),
    command: Command.Play
  }),
  [ActionType.TrackLoaded]: (
    state: State,
    { payload }: TrackLoadedAction
  ): State => ({
    ...state,
    duration: payload
  }),
  [ActionType.Playing]: (state: State): State => ({
    ...state,
    playerState: PlayerState.Playing,
    command: Command.None
  }),
  [ActionType.Update]: (state: State, { payload }: UpdateAction): State => ({
    ...state,
    currentTime: payload,
    command: Command.None
  }),
  [ActionType.Play]: (state: State): State => ({
    ...state,
    command: Command.Play
  }),
  [ActionType.Pause]: (state: State): State => ({
    ...state,
    command: Command.Pause
  }),
  [ActionType.Paused]: (state: State): State => ({
    ...state,
    playerState: PlayerState.Paused,
    command: Command.None
  }),
  [ActionType.Seek]: (state: State, { payload }: SeekAction): State => ({
    ...state,
    currentTime: payload,
    command: Command.Seek
  }),
  [ActionType.Seeked]: (state: State): State => ({
    ...state
  }),
  [ActionType.Ended]: (state: State): State => {
    const { trackIndex, trackIds } = state;
    return trackIndex === trackIds.length - 1
      ? { ...state, playerState: PlayerState.Paused }
      : {
          ...state,
          trackIndex: trackIndex + 1,
          command: Command.Play
        };
  },
  [ActionType.Next]: (state: State): State => ({
    ...state,
    trackIndex: state.trackIndex + 1,
    command: Command.Play
  }),
  [ActionType.Previous]: (state: State): State => ({
    ...state,
    trackIndex: state.trackIndex - 1,
    command: Command.Play
  }),
  [ActionType.ToggleShuffle]: (state: State): State => ({
    ...state,
    isShuffled: !state.isShuffled
  }),
  [ActionType.ToggleLoop]: (state: State): State => ({
    ...state,
    isLooped: !state.isLooped
  }),
  [ActionType.ChangeVolume]: (
    state: State,
    { payload }: ChangeVolumeAction
  ): State => ({
    ...state,
    ...payload,
    command: Command.ChangeVolume
  }),
  [ActionType.VolumeChanged]: (state: State): State => ({
    ...state,
    command: Command.None
  })
});

export function selectCollection({ player }: CombinedState) {
  const { collections: recents } = player;
  if (recents.length) {
    return recents[0];
  }
}

export function selectLoadedTrack(state: CombinedState) {
  const { trackIds, trackIndex } = state.player;
  if (trackIds) {
    return selectTrack(state, trackIds[trackIndex]);
  }
}

export function selectLoadedTracks(state: CombinedState) {
  const { trackIds } = state.player;
  return trackIds ? selectTracks(state)(trackIds) : [];
}

export function selectLoadedAlbum(state: CombinedState) {
  const track = selectLoadedTrack(state);
  if (track) {
    return selectAlbum(state, track.album);
  }
}

export function selectLoadedArtists(state: CombinedState) {
  const track = selectLoadedTrack(state);
  return track ? selectArtists(state)(track.artists) : [];
}

export function selectIsLoaded(state: CombinedState) {
  const { collections: recents, trackIds, trackIndex } = state.player;
  return (id: string) =>
    (recents.length && recents[0].id === id) ||
    (!!trackIds.length && trackIds[trackIndex] === id);
}

export function selectIsPlaying(state: CombinedState, id?: string) {
  const { playerState } = state.player;
  return (
    (!id || selectIsLoaded(state)(id)) && playerState === PlayerState.Playing
  );
}

export function selectCanPlayPause(state: CombinedState) {
  const { player } = state;
  return (
    player.playerState !== PlayerState.None &&
    player.currentTime !== player.duration
  );
}

export function selectCanSeek(state: CombinedState) {
  return state.player.playerState !== PlayerState.None;
}

export function selectCanNext(state: CombinedState) {
  const { trackIds, trackIndex } = state.player;
  return trackIds.length > 1 && trackIndex < trackIds.length - 1;
}

export function selectCanPrevious(state: CombinedState) {
  const { trackIds, trackIndex } = state.player;
  return trackIds.length > 1 && trackIndex > 0;
}

export function selectIsShuffled({ player }: CombinedState) {
  return player.isShuffled;
}

export function selectIsLooped({ player }: CombinedState) {
  return player.isLooped;
}

export interface Times {
  duration: number;
  currentTime: number;
}

export const selectTimes = createSelector(
  ({ player }: CombinedState) => player.duration,
  ({ player }: CombinedState) => player.currentTime,
  (duration: number, currentTime: number) => ({
    duration,
    currentTime
  })
);

export function selectVolume({ player }: CombinedState) {
  return player.volume;
}

export function selectIsMuted({ player }: CombinedState) {
  return player.isMuted;
}

export function selectCommand(state: CombinedState): Command {
  return state.player.command;
}
