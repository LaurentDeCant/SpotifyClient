import { UserProfile } from "../types";
import { UserProfileActionType as ActionType } from "../actions";
import { UserProfileSuccessAction } from "../actions/userProfile";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";

export interface State {
  userProfile?: UserProfile;
}

const initialState: State = {};

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
