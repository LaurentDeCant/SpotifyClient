import createReducer from "../helpers/reducer";
import { UserProfile } from "../types";
import { ActionType, UserProfileSuccessAction } from "../actions/userProfile";
import { State as CombinedState } from ".";

export interface State {
  userProfile?: UserProfile;
}

const initialState: State = {
  userProfile: undefined
};

export default createReducer(initialState, {
  [ActionType.UserProfileSuccess]: (
    state: State,
    action: UserProfileSuccessAction
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
