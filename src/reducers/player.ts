import createReducer from "../helpers/createReducer";
import { ActionType, PlayTrackSuccessAction } from "../actions/player";
import { State as CombinedState } from ".";

export interface State {
  source?: string;
  isPlaying: boolean;
}

const initialState: State = {
  source: undefined,
  isPlaying: false
};

export default createReducer(initialState, {
  [ActionType.Play]: (state: State) => ({
    ...state,
    isPlaying: true
  }),
  [ActionType.PlayTrackSuccess]: (
    state: State,
    action: PlayTrackSuccessAction
  ) => ({
    ...state,
    source: action.payload.preview_url,
    isPlaying: true
  }),
  [ActionType.Pause]: (state: State) => ({
    ...state,
    isPlaying: false
  })
});

export function selectIsPlaying(state: CombinedState): boolean {
  return !!state.player.isPlaying;
}

export function selectSource(state: CombinedState): string | undefined {
  return state.player.source;
}
