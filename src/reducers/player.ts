import { createSelector } from "reselect";
import { Track, Album } from "../types";
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
import createReducer from "./createReducer";
import { selectTrack } from "./tracks";
import { selectAlbum } from "./albums";

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
  collectionId?: string;
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
    action: LoadCollectionAction
  ): State => {
    const { collectionId, trackIds, trackId } = action.payload;
    return {
      ...state,
      collectionId: collectionId,
      trackIds: trackIds,
      trackIndex: trackId ? trackIds.indexOf(trackId) : 0,
      command: Command.Play
    };
  },
  [ActionType.LoadTrack]: (state: State, action: LoadTrackAction) => ({
    ...state,
    trackIndex: state.trackIds.indexOf(action.payload.trackId),
    command: Command.Play
  }),
  [ActionType.TrackLoaded]: (
    state: State,
    action: TrackLoadedAction
  ): State => ({
    ...state,
    duration: action.payload
  }),
  [ActionType.Playing]: (state: State): State => ({
    ...state,
    playerState: PlayerState.Playing,
    command: Command.None
  }),
  [ActionType.Update]: (state: State, action: UpdateAction): State => ({
    ...state,
    currentTime: action.payload,
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
  [ActionType.Seek]: (state: State, action: SeekAction): State => ({
    ...state,
    currentTime: action.payload,
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
    action: ChangeVolumeAction
  ): State => ({
    ...state,
    ...action.payload,
    command: Command.ChangeVolume
  }),
  [ActionType.VolumeChanged]: (state: State): State => ({
    ...state,
    command: Command.None
  })
});

export function selectLoadedTrack(state: CombinedState): Track | undefined {
  const { trackIds, trackIndex } = state.player;

  if (trackIds) {
    return selectTrack(state, trackIds[trackIndex]);
  }
}

export function selectTrackAlbum(state: CombinedState): Album | undefined {
  const { trackIds, trackIndex } = state.player;
  const trackId = trackIds[trackIndex];
  const track = selectTrack(state, trackId);
  if (track) {
    return selectAlbum(state, track.album);
  }

  return undefined;
}

export function selectIsLoaded(state: CombinedState) {
  const { collectionId, trackIds, trackIndex } = state.player;
  return (id: string) =>
    collectionId === id || (!!trackIds.length && trackIds[trackIndex] === id);
}

export function selectIsPlaying(state: CombinedState, id?: string) {
  const { playerState } = state.player;
  return (
    (!id || selectIsLoaded(state)(id)) && playerState === PlayerState.Playing
  );
}

export function selectCanTogglePlay(state: CombinedState) {
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

export interface VolumeLevels {
  volume: number;
  isMuted: boolean;
}

export const selectVolumeLevels = createSelector(
  ({ player }: CombinedState) => player.volume,
  ({ player }: CombinedState) => player.isMuted,
  (volume: number, isMuted: boolean) => ({
    volume,
    isMuted
  })
);

export function selectCommand(state: CombinedState): Command {
  return state.player.command;
}
