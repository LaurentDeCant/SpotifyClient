import createReducer from "../helpers/createReducer";
import {
  ActionType,
  LoadedAction,
  UpdateAction,
  PlayTrackSuccessAction
} from "../actions/player";
import { State as CombinedState } from ".";

export interface State {
  source?: string;
  isLoaded: boolean;
  duration: number;
  isPlaying: boolean;
  elapsed: number;
  remaining: number;
  shouldPlay: boolean;
  shouldPause: boolean;
}

const initialState: State = {
  isLoaded: false,
  duration: 0,
  isPlaying: false,
  elapsed: 0,
  remaining: 0,
  shouldPlay: false,
  shouldPause: false
};

export default createReducer(initialState, {
  [ActionType.LoadTrackSuccess]: (
    state: State,
    action: PlayTrackSuccessAction
  ) => ({
    ...state,
    source: action.payload.preview_url,
    isLoaded: true,
    shouldPlay: true,
    shouldPause: false
  }),
  [ActionType.Loaded]: (state: State, action: LoadedAction) => ({
    ...state,
    duration: action.payload
  }),
  [ActionType.Playing]: (state: State) => ({
    ...state,
    isPlaying: true
  }),
  [ActionType.Update]: (state: State, action: UpdateAction) => ({
    ...state,
    elapsed: action.payload,
    remaining: state.duration - action.payload
  }),
  [ActionType.Paused]: (state: State) => ({
    ...state,
    isPlaying: false
  }),
  [ActionType.TryPlay]: (state: State) => ({
    ...state,
    shouldPlay: true,
    shouldPause: false
  }),
  [ActionType.TryPause]: (state: State) => ({
    ...state,
    shouldPlay: false,
    shouldPause: true
  })
});

export interface Context {
  isLoaded: boolean;
  duration: number;
  isPlaying: boolean;
  elapsed: number;
  remaining: number;
  shouldPlay: boolean;
  shouldPause: boolean;
}

export function selectSource(state: CombinedState): string | undefined {
  return state.player.source;
}

export function selectContext(state: CombinedState): Context {
  const { player } = state;

  return {
    isLoaded: player.isLoaded,
    duration: player.duration,
    isPlaying: player.isPlaying,
    elapsed: player.elapsed,
    remaining: player.remaining,
    shouldPlay: player.shouldPlay,
    shouldPause: player.shouldPause
  };
}
