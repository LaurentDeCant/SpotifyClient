import { PlayerActionType as ActionType } from "../actions";
import {
  LoadCollectionAction,
  LoadTrackAction,
  TrackLoadedAction,
  UpdateAction,
  SeekAction,
  ChangeVolumeAction
} from "../actions/player";
import { Collection, PlayState } from "./types";
import createReducer from "./createReducer";

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
  currentIndex: number;
  playState: PlayState;
  duration: number;
  currentTime: number;
  isShuffled: boolean;
  isLooped: boolean;
  volume: number;
  isMuted: boolean;
  command: Command;
}

export const initialState: State = {
  collections: [],
  trackIds: [],
  currentIndex: 0,
  playState: PlayState.None,
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
  ) => {
    const { collectionId, collectionType, trackIds, trackId } = payload;
    return {
      ...state,
      collections: [
        { id: collectionId, type: collectionType },
        ...state.collections.filter(recent => recent.id !== collectionId)
      ],
      trackIds: trackIds,
      currentIndex: trackId ? trackIds.indexOf(trackId) : 0,
      command: Command.Play
    };
  },
  [ActionType.LoadTrack]: (state: State, { payload }: LoadTrackAction) => ({
    ...state,
    currentIndex: state.trackIds.indexOf(payload.trackId),
    command: Command.Play
  }),
  [ActionType.TrackLoaded]: (state: State, { payload }: TrackLoadedAction) => ({
    ...state,
    duration: payload
  }),
  [ActionType.Playing]: (state: State) => ({
    ...state,
    playState: PlayState.Playing,
    command: Command.None
  }),
  [ActionType.Update]: (state: State, { payload }: UpdateAction) => ({
    ...state,
    currentTime: payload,
    command: Command.None
  }),
  [ActionType.Play]: (state: State) => ({
    ...state,
    command: Command.Play
  }),
  [ActionType.Pause]: (state: State) => ({
    ...state,
    command: Command.Pause
  }),
  [ActionType.Paused]: (state: State) => ({
    ...state,
    playState: PlayState.Paused,
    command: Command.None
  }),
  [ActionType.Seek]: (state: State, { payload }: SeekAction) => ({
    ...state,
    currentTime: payload,
    command: Command.Seek
  }),
  [ActionType.Seeked]: (state: State) => ({
    ...state
  }),
  [ActionType.Ended]: (state: State) => {
    const { currentIndex, trackIds } = state;
    return currentIndex === trackIds.length - 1
      ? state.isLooped
        ? { ...state, currentIndex: 0, command: Command.Play }
        : { ...state, playState: PlayState.Paused }
      : {
          ...state,
          currentIndex: currentIndex + 1,
          command: Command.Play
        };
  },
  [ActionType.Previous]: (state: State) => {
    const { currentIndex, trackIds } = state;
    return {
      ...state,
      currentIndex:
        currentIndex === 0 ? trackIds.length - 1 : state.currentIndex - 1,
      command: Command.Play
    };
  },
  [ActionType.Next]: (state: State) => {
    const { currentIndex, trackIds } = state;
    return {
      ...state,
      currentIndex:
        currentIndex === trackIds.length - 1 ? 0 : state.currentIndex + 1,
      command: Command.Play
    };
  },
  [ActionType.ToggleShuffle]: (state: State) => ({
    ...state,
    isShuffled: !state.isShuffled
  }),
  [ActionType.ToggleLoop]: (state: State) => ({
    ...state,
    isLooped: !state.isLooped
  }),
  [ActionType.ChangeVolume]: (
    state: State,
    { payload }: ChangeVolumeAction
  ) => ({
    ...state,
    ...payload,
    command: Command.ChangeVolume
  }),
  [ActionType.VolumeChanged]: (state: State) => ({
    ...state,
    command: Command.None
  })
});
