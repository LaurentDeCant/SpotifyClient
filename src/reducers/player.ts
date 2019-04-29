import createReducer from "../helpers/reducer";
import { Track } from "../types";
import {
  ActionType,
  LoadAction,
  LoadedAction,
  UpdateAction,
  SeekAction,
  ChangeVolumeAction,
  LoadCollectionAction
} from "../actions/player";
import { State as CombinedState } from ".";
import { selectTrack } from "./tracks";

export enum TrackState {
  None,
  isLoaded,
  isPlaying,
  isPaused
}

export interface State {
  trackId?: string;
  state: TrackState;
  duration: number;
  currentTime: number;
  shouldPlay: boolean;
  shouldPause: boolean;
  shouldSeek: boolean;
  volume: number;
  isMuted: boolean;
  shouldChange: boolean;
}

const initialState: State = {
  state: TrackState.None,
  duration: 0,
  currentTime: 0,
  shouldPlay: false,
  shouldPause: false,
  shouldSeek: false,
  volume: 1,
  isMuted: false,
  shouldChange: false
};

export default createReducer(initialState, {
  [ActionType.Load]: (state: State, action: LoadAction): State => ({
    ...state,
    trackId: action.payload,
    state: TrackState.isLoaded,
    shouldPlay: true,
    shouldPause: false
  }),
  [ActionType.Loaded]: (state: State, action: LoadedAction): State => ({
    ...state,
    duration: action.payload
  }),
  [ActionType.Playing]: (state: State): State => ({
    ...state,
    state: TrackState.isPlaying,
    shouldPlay: false
  }),
  [ActionType.Update]: (state: State, action: UpdateAction): State => ({
    ...state,
    currentTime: action.payload,
    shouldSeek: false
  }),
  [ActionType.Play]: (state: State): State => ({
    ...state,
    shouldPlay: true,
    shouldPause: false
  }),
  [ActionType.Pause]: (state: State): State => ({
    ...state,
    shouldPlay: false,
    shouldPause: true
  }),
  [ActionType.Paused]: (state: State): State => ({
    ...state,
    state: TrackState.isPaused,
    shouldPause: false
  }),
  [ActionType.Seek]: (state: State, action: SeekAction): State => ({
    ...state,
    currentTime: action.payload,
    shouldSeek: true
  }),
  [ActionType.Seeked]: (state: State): State => ({
    ...state,
    shouldSeek: false
  }),
  [ActionType.ChangeVolume]: (
    state: State,
    action: ChangeVolumeAction
  ): State => ({
    ...state,
    ...action.payload,
    shouldChange: true
  }),
  [ActionType.VolumeChanged]: (state: State): State => ({
    ...state,
    shouldChange: false
  }),
  [ActionType.LoadCollection]: (
    state: State,
    action: LoadCollectionAction
  ): State => ({
    ...state,
    trackId: action.payload[0],
    state: TrackState.isLoaded,
    shouldPlay: true,
    shouldPause: false
  })
});

export function selectLoadedTrack(state: CombinedState): Track | undefined {
  const { trackId } = state.player;

  if (trackId) {
    return selectTrack(state, trackId);
  }
}

export function selectState(state: CombinedState): TrackState {
  return state.player.state;
}

export interface Times {
  duration: number;
  currentTime: number;
}

export function selectTimes(state: CombinedState): Times {
  const { player } = state;

  return {
    duration: player.duration,
    currentTime: player.currentTime
  };
}

export interface Commands {
  shouldPlay: boolean;
  shouldPause: boolean;
  shouldSeek: boolean;
  shouldChange: boolean;
}

export function selectCommands(state: CombinedState): Commands {
  const {
    player: { shouldPlay, shouldPause, shouldSeek, shouldChange }
  } = state;

  return {
    shouldPlay,
    shouldPause,
    shouldSeek,
    shouldChange
  };
}

export interface Levels {
  volume: number;
  isMuted: boolean;
}

export function selectLevels(state: CombinedState): Levels {
  const {
    player: { volume, isMuted }
  } = state;

  return {
    volume,
    isMuted
  };
}
