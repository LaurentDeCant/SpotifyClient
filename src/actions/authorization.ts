import { Action, Dispatch } from "redux";
import { authorize } from "../helpers/authorization";

export enum ActionType {
  RequestAuthorization = "REQUEST_AUTHORIZATION",
  ReceiveAuthorization = "RECEIVE_AUTHORIZATION"
}

export interface RequestAuthorizationAction extends Action {
  type: ActionType.RequestAuthorization;
}

function requestAuthorization(): RequestAuthorizationAction {
  return {
    type: ActionType.RequestAuthorization
  };
}

export interface ReceiveAuthorizationAction extends Action {
  type: ActionType.ReceiveAuthorization;
}

export function receiveAuthorization(): ReceiveAuthorizationAction {
  return {
    type: ActionType.ReceiveAuthorization
  };
}

export function getAuthorization() {
  return async (
    dispatch: Dispatch<RequestAuthorizationAction | ReceiveAuthorizationAction>
  ) => {
    dispatch(requestAuthorization());
    await authorize();
    dispatch(receiveAuthorization());
  };
}
