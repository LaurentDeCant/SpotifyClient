import UserProfile from "../types/UserProfile";
import { Action, ActionType } from "../actions/userProfile";
import { State as CombinedState } from "./index";

export interface State {
  userProfile?: UserProfile;
}

const initialState: State = {
  userProfile: undefined
};

export default function(state: State = initialState, action: Action) {
  switch (action.type) {
    case ActionType.RECEIVE_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      };
    default:
      return state;
  }
}

export function selectUserProfile(state: CombinedState) {
  return state.userProfile.userProfile;
}
