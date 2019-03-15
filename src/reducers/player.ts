import createReducer from "../helpers/createReducer";
import { Track } from "../types";
import {
  ActionType,
  LoadedAction,
  UpdateAction,
  PlayTrackSuccessAction
} from "../actions/player";
import { State as CombinedState } from ".";

export enum TrackState {
  None,
  isLoaded,
  isPlaying,
  isPaused
}

export interface State {
  current?: Track;
  state: TrackState;
  // isLoaded: boolean;
  duration: number;
  // isPlaying: boolean;
  elapsed: number;
  remaining: number;
  shouldPlay: boolean;
  shouldPause: boolean;
}

const initialState: State = {
  state: TrackState.None,
  // isLoaded: false,
  duration: 0,
  // isPlaying: false,
  elapsed: 0,
  remaining: 0,
  shouldPlay: false,
  shouldPause: false
};

export default createReducer(initialState, {
  [ActionType.LoadTrackSuccess]: (
    state: State,
    action: PlayTrackSuccessAction
  ): State => ({
    ...state,
    current: action.payload,
    // isLoaded: true,
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
    // isPlaying: true
    state: TrackState.isPlaying
  }),
  [ActionType.Update]: (state: State, action: UpdateAction): State => ({
    ...state,
    elapsed: action.payload,
    remaining: state.duration - action.payload
  }),
  [ActionType.Paused]: (state: State): State => ({
    ...state,
    // isPlaying: false
    state: TrackState.isPaused
  }),
  [ActionType.PlayCurrent]: (state: State): State => ({
    ...state,
    shouldPlay: true,
    shouldPause: false
  }),
  [ActionType.PauseCurrent]: (state: State): State => ({
    ...state,
    shouldPlay: false,
    shouldPause: true
  })
});

export function selectCurrent(state: CombinedState): Track | undefined {
  return state.player.current;
}

export function selectState(state: CombinedState): TrackState {
  return state.player.state;
}

export interface Times {
  duration: number;
  elapsed: number;
  remaining: number;
}

export function selectTimes(state: CombinedState): Times {
  const { player } = state;

  return {
    duration: player.duration,
    elapsed: player.elapsed,
    remaining: player.remaining
  };
}

export interface Commands {
  shouldPlay: boolean;
  shouldPause: boolean;
}

export function selectCommands(state: CombinedState): Commands {
  const { player } = state;

  return {
    shouldPlay: player.shouldPlay,
    shouldPause: player.shouldPause
  };
}
