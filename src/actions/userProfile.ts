import { UserProfileActionType as ActionType } from ".";
import { UserProfile } from "../types";
import { FetchDispatch, PayloadAction } from "./types";

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
