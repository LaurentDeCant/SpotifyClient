import createReducer from "../helpers/reducer";
import { Track } from "../types";
import {
  ActionType,
  LoadedAction,
  UpdateAction,
  LoadAction,
  SeekAction
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
  currentId?: string;
  state: TrackState;
  duration: number;
  currentTime: number;
  shouldPlay: boolean;
  shouldPause: boolean;
  shouldSeek: boolean;
}

const initialState: State = {
  state: TrackState.None,
  duration: 0,
  currentTime: 0,
  shouldPlay: false,
  shouldPause: false,
  shouldSeek: false
};

export default createReducer(initialState, {
  [ActionType.Load]: (state: State, action: LoadAction): State => ({
    ...state,
    currentId: action.payload,
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
  [ActionType.Seek]: (state: State, Action: SeekAction): State => ({
    ...state,
    currentTime: Action.payload,
    shouldSeek: true
  }),
  [ActionType.Seeked]: (state: State): State => ({
    ...state,
    shouldSeek: false
  })
});

export function selectCurrent(state: CombinedState): Track | undefined {
  const { currentId } = state.player;

  if (currentId) {
    return selectTrack(state, currentId);
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
}

export function selectCommands(state: CombinedState): Commands {
  const {
    player: { shouldPlay, shouldPause, shouldSeek }
  } = state;

  return {
    shouldPlay,
    shouldPause,
    shouldSeek
  };
}
