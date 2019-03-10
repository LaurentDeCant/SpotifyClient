import createReducer from "../helpers/createReducer";
import { ActionType } from "../actions/player";
import { State as CombinedState } from ".";

export interface State {
  isPlaying: boolean;
}

const initialState: State = {
  isPlaying: false
};

export default createReducer(initialState, {
  [ActionType.Play]: (state: State) => ({
    ...state,
    isPlaying: true
  }),
  [ActionType.Pause]: (state: State) => ({
    ...state,
    isPlaying: false
  })
});

export function isPlaying(state: CombinedState): boolean {
  return !!state.player.isPlaying;
}
