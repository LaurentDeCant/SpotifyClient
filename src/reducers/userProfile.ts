import createReducer from "../helpers/createReducer";
import { UserProfile } from "../types";
import { ActionType, ReceiveUserProfileAction } from "../actions/userProfile";
import { State as CombinedState } from ".";

export interface State {
  userProfile?: UserProfile;
}

const initialState: State = {
  userProfile: undefined
};

export default createReducer(initialState, {
  [ActionType.ReceiveUserProfile]: (
    state: State,
    action: ReceiveUserProfileAction
  ) => ({
    ...state,
    userProfile: action.payload
  })
});

export function selectUserProfile(
  state: CombinedState
): UserProfile | undefined {
  return state.userProfile.userProfile;
}
