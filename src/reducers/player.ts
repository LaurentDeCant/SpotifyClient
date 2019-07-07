import _ from "lodash";
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
  playQueue: string[];
  currentTrack: number;
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
  playQueue: [],
  currentTrack: 0,
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
      trackIds,
      playQueue: state.isShuffled ? _.shuffle(trackIds) : trackIds,
      currentTrack: trackId ? state.playQueue.indexOf(trackId) : 0,
      command: Command.Play
    };
  },
  [ActionType.LoadTrack]: (state: State, { payload }: LoadTrackAction) => ({
    ...state,
    currentTrack: state.trackIds.indexOf(payload.trackId),
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
    const { currentTrack, playQueue } = state;
    return currentTrack === playQueue.length - 1
      ? state.isLooped
        ? { ...state, currentTrack: 0, command: Command.Play }
        : { ...state, playState: PlayState.Paused }
      : {
          ...state,
          currentTrack: currentTrack + 1,
          command: Command.Play
        };
  },
  [ActionType.Previous]: (state: State) => {
    const { currentTrack, playQueue } = state;
    return {
      ...state,
      currentTrack:
        currentTrack === 0 ? playQueue.length - 1 : state.currentTrack - 1,
      command: Command.Play
    };
  },
  [ActionType.Next]: (state: State) => {
    const { currentTrack, playQueue } = state;
    return {
      ...state,
      currentTrack:
        currentTrack === playQueue.length - 1 ? 0 : state.currentTrack + 1,
      command: Command.Play
    };
  },
  [ActionType.ToggleShuffle]: (state: State) => {
    const playQueue = state.isShuffled
      ? state.trackIds
      : _.shuffle(state.trackIds);
    const currentTrack = playQueue.indexOf(state.playQueue[state.currentTrack]);
    return {
      ...state,
      playQueue,
      currentTrack,
      isShuffled: !state.isShuffled
    };
  },
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
