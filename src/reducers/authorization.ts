import {
  ActionType,
  ReceiveAuthorizationAction
} from "../actions/authorization";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";

export interface State {
  isAuthorized: boolean;
}

const initialState: State = {
  isAuthorized: false
};

export default createReducer(initialState, {
  [ActionType.ReceiveAuthorization]: (
    state: State,
    action: ReceiveAuthorizationAction
  ) => ({
    ...state,
    isAuthorized: true
  })
});

export function isAuthorized(state: CombinedState): boolean {
  return !!state.authorization.isAuthorized;
}
