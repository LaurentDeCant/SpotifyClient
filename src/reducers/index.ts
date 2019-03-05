import { combineReducers } from "redux";
import authorization, { State as AuthorizationState } from "./authorization";
import userProfile, { State as UserProfileState } from "./userProfile";
import browse, { State as BrowseState } from "./browse";

export interface State {
  authorization: AuthorizationState;
  userProfile: UserProfileState;
  browse: BrowseState;
}

export default combineReducers<State>({
  authorization,
  userProfile,
  browse
});
