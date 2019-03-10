import { Dispatch } from "redux";

export enum ActionType {
  Play = "PLAY",
  Pause = "PAUSE"
}

export function play() {
  return (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Play });
  };
}

export function pause() {
  return (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Pause });
  };
}
