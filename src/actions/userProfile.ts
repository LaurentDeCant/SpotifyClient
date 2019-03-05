import { Action, Dispatch } from "redux";
import UserProfile from "../types/userProfile";
import { authorizedFetch } from "../helpers/authorization";

export enum ActionType {
  REQUEST_USER_PROFILE = "REQUEST_USER_PROFILE",
  RECEIVE_USER_PROFILE = "RECEIVE_USER_PROFILE"
}

export interface RequestUserProfileAction extends Action {
  type: ActionType.REQUEST_USER_PROFILE;
}

function requetUserProfile(): RequestUserProfileAction {
  return {
    type: ActionType.REQUEST_USER_PROFILE
  };
}

export interface ReceiveUserProfileAction extends Action {
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

export function getUserProfile() {
  return async (
    dispatch: Dispatch<RequestUserProfileAction | ReceiveUserProfileAction>
  ) => {
    dispatch(requetUserProfile());
    const response = await authorizedFetch(
      `${process.env.REACT_APP_BASE_URL}/me`
    );
    const json = await response.json();
    dispatch(receiveUserProfile(json));
  };
}
