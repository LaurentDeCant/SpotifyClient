import { combineReducers } from "redux";
import userProfileReducer, { State as userProfileState } from "./userProfile";

export interface State {
  userProfile: userProfileState;
}

export default combineReducers<State>({
  userProfile: userProfileReducer
});
