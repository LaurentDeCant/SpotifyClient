import { Action, Dispatch } from "redux";
import { authorize } from "../helpers/authorization";

export enum ActionType {
  REQUEST_AUTHORIZATION = "REQUEST_AUTHORIZATION",
  RECEIVE_AUTHORIZATION = "RECEIVE_AUTHORIZATION"
}

export interface RequestAuthorizationAction extends Action {
  type: ActionType.REQUEST_AUTHORIZATION;
}

function requestAuthorization(): RequestAuthorizationAction {
  return {
    type: ActionType.REQUEST_AUTHORIZATION
  };
}

export interface ReceiveAuthorizationAction extends Action {
  type: ActionType.RECEIVE_AUTHORIZATION;
}

function receiveAuthorization(): ReceiveAuthorizationAction {
  return {
    type: ActionType.RECEIVE_AUTHORIZATION
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
