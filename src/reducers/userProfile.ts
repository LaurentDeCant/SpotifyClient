import createReducer from "../helpers/createReducer";
import UserProfile from "../types/userProfile";
import { ActionType, ReceiveUserProfileAction } from "../actions/userProfile";

export interface State {
  userProfile?: UserProfile;
}

const initialState: State = {
  userProfile: undefined
};

export default createReducer(initialState, {
  [ActionType.RECEIVE_USER_PROFILE]: (
    state: State,
    action: ReceiveUserProfileAction
  ) => ({
    ...state,
    userProfile: action.payload
  })
});

export function selectUserProfile(state: {
  userProfile: State;
}): UserProfile | undefined {
  return state.userProfile.userProfile;
}
