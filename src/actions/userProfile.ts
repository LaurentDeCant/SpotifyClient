import { Dispatch } from "redux";
import { authorizedFetch } from "../services/authorization";
import UserProfile from "../types/UserProfile";

export enum ActionType {
  REQUEST_USER_PROFILE = "REQUEST_USER_PROFILE",
  RECEIVE_USER_PROFILE = "RECEIVE_USER_PROFILE"
}

interface RequestUserProfileAction {
  type: ActionType.REQUEST_USER_PROFILE;
}

function requetUserProfile(): RequestUserProfileAction {
  return {
    type: ActionType.REQUEST_USER_PROFILE
  };
}

interface ReceiveUserProfileAction {
  type: ActionType.RECEIVE_USER_PROFILE;
  payload: UserProfile;
}

function receiveUserProfile(
  userProfile: UserProfile
): ReceiveUserProfileAction {
  return {
    type: ActionType.RECEIVE_USER_PROFILE,
    payload: userProfile
  };
}

export type Action = RequestUserProfileAction | ReceiveUserProfileAction;

export function getUserProfile() {
  return function(dispatch: Dispatch<Action>) {
    dispatch(requetUserProfile());
    authorizedFetch(`${process.env.REACT_APP_BASE_URL}/me`)
      .then(reponse => reponse.json())
      .then(json => dispatch(receiveUserProfile(json)));
  };
}
