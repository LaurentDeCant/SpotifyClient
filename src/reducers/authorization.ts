import { ActionType } from "../actions/authorization";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";

export interface State {
  isLoggedIn: boolean;
}

export const initialState: State = {
  isLoggedIn: false
};

export default createReducer(initialState, {
  [ActionType.ReceiveLogIn]: (state: State) => ({
    ...state,
    isLoggedIn: true
  })
});

export function selectIsLoggedIn(state: CombinedState): boolean {
  return !!state.authorization.isLoggedIn;
}
