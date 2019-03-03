import { combineReducers } from "redux";
import authorization, { State as AuthorizationState } from "./authorization";
import userProfile, { State as UserProfileState } from "./userProfile";

export interface State {
  logging: any;
  authorization: AuthorizationState;
  userProfile: UserProfileState;
}

export default combineReducers<State>({
  logging: (state = {}, action) => {
    console.log(action);
    return state;
  },
  authorization,
  userProfile
});
