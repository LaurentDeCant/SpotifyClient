import { Action, Dispatch } from "redux";
import { UserProfile } from "../types";
import PayloadAction from "./types";
import { authorizedFetch } from "../helpers/authorization";

export enum ActionType {
  RequestUserProfile = "REQUEST_USER_PROFILE",
  ReceiveUserProfile = "RECEIVE_USER_PROFILE"
}

export interface RequestUserProfileAction
  extends Action<ActionType.RequestUserProfile> {}

function requetUserProfile(): RequestUserProfileAction {
  return {
    type: ActionType.RequestUserProfile
  };
}

export interface ReceiveUserProfileAction
  extends PayloadAction<ActionType.ReceiveUserProfile, UserProfile> {}

function receiveUserProfile(
  userProfile: UserProfile
): ReceiveUserProfileAction {
  return {
    type: ActionType.ReceiveUserProfile,
    payload: userProfile
  };
}

export function getUserProfile() {
  return async (dispatch: Dispatch) => {
    dispatch(requetUserProfile());
    const response = await authorizedFetch(
      `${process.env.REACT_APP_BASE_URL}/me`
    );
    const json = await response.json();
    dispatch(receiveUserProfile(json));
  };
}
