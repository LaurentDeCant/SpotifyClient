import { Dispatch } from "redux";
import { Track } from "../types";
import { FetchDispatch, PayloadAction } from "./types";

export enum ActionType {
  Play = "PLAY",
  PlayTrackRequest = "PLAY_TRACK_REQUEST",
  PlayTrackSuccess = "PLAY_TRACK_SUCCESS",
  PlayTrackFailure = "PLAY_TRACK_FAILURE",
  Pause = "PAUSE"
}

export function play() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Play
    });
  };
}

export interface PlayTrackSuccessAction
  extends PayloadAction<ActionType.PlayTrackSuccess, Track> {}

export function playTrack(trackId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.PlayTrackRequest,
        ActionType.PlayTrackSuccess,
        ActionType.PlayTrackFailure
      ],
      path: `tracks/${trackId}`
    });
  };
}

export function pause() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Pause
    });
  };
}
