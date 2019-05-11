import { Action, Dispatch } from "redux";
import { logInRedirect } from "../utils/authorization";

export enum ActionType {
  RequestLogIn = "REQUEST_LOG_IN",
  ReceiveLogIn = "RECEIVE_LOG_IN"
}

export interface RequestLogInAction extends Action<ActionType.RequestLogIn> {}

function requestLogIn(): RequestLogInAction {
  return {
    type: ActionType.RequestLogIn
  };
}

export interface ReceiveLogInAction extends Action<ActionType.ReceiveLogIn> {}

export function receiveLogIn(): ReceiveLogInAction {
  return {
    type: ActionType.ReceiveLogIn
  };
}

export function logIn() {
  return async (
    dispatch: Dispatch<RequestLogInAction | ReceiveLogInAction>
  ) => {
    dispatch(requestLogIn());
    await logInRedirect();
    dispatch(receiveLogIn());
  };
}
