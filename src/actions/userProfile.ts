import { UserProfile } from "../types";
import { FetchDispatch, PayloadAction } from "./types";

export enum ActionType {
  UserProfileRequest = "USER_PROFILE_REQUEST",
  UserProfileSuccess = "USER_PROFILE_SUCCESS",
  UserProfileFailure = "USER_PROFILE_FAILURE"
}

export interface UserProfileSuccessAction
  extends PayloadAction<ActionType.UserProfileSuccess, UserProfile> {}

export function getUserProfile() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.UserProfileRequest,
        ActionType.UserProfileSuccess,
        ActionType.UserProfileFailure
      ],
      path: "me"
    });
  };
}
