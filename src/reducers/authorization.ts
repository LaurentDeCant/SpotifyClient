import createReducer from "../helpers/createReducer";
import {
  ActionType,
  ReceiveAuthorizationAction
} from "../actions/authorization";
import { State as CombinedState } from "./index";

export interface State {
  isAuthorized: boolean;
}

const initialState: State = {
  isAuthorized: false
};

export default createReducer(initialState, {
  [ActionType.RECEIVE_AUTHORIZATION]: (
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
