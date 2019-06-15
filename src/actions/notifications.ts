import { Dispatch } from "react";
import { PayloadAction } from "./types";

export enum ActionType {
  DeleteNotification = "DELETE_NOTIFICATION"
}

export interface DeleteNotificationAction
  extends PayloadAction<
    ActionType.DeleteNotification,
    { notificationId: string }
  > {}

export function deleteNotification(notificationId: string) {
  return (dispatch: Dispatch<DeleteNotificationAction>) => {
    dispatch({
      type: ActionType.DeleteNotification,
      payload: { notificationId }
    });
  };
}
