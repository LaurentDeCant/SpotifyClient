import { combineReducers } from "redux";
import authorization, { State as AuthorizationState } from "./authorization";
import userProfile, { State as UserProfileState } from "./userProfile";

export interface State {
  authorization: AuthorizationState;
  userProfile: UserProfileState;
}

export default combineReducers<State>({
  authorization,
  userProfile
});
