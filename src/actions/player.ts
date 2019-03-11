import { Dispatch } from "redux";
import { Track } from "../types";
import { FetchDispatch, PayloadAction } from "./types";

export enum ActionType {
  LoadTrackRequest = "LOAD_TRACK_REQUEST",
  LoadTrackSuccess = "LOAD_TRACK_SUCCESS",
  LoadTrackFailure = "LOAD_TRACK_FAILURE",
  Loaded = "LOADED",
  Playing = "PLAYING",
  Update = "UPDATE",
  Paused = "PAUSED",
  TryPlay = "TRY_PLAY",
  TryPause = "TRY_PAUSE"
}

export interface PlayTrackSuccessAction
  extends PayloadAction<ActionType.LoadTrackSuccess, Track> {}

export function loadTrack(trackId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.LoadTrackRequest,
        ActionType.LoadTrackSuccess,
        ActionType.LoadTrackFailure
      ],
      path: `tracks/${trackId}`
    });
  };
}

export interface LoadedAction
  extends PayloadAction<ActionType.Loaded, number> {}

export function loaded(duration: number) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Loaded,
      payload: duration
    });
  };
}

export function playing() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Playing
    });
  };
}

export interface UpdateAction
  extends PayloadAction<ActionType.Update, number> {}

export function update(elapsed: number) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Update,
      payload: elapsed
    });
  };
}

export function paused() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Paused
    });
  };
}

export function tryPlay() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.TryPlay
    });
  };
}

export function tryPause() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.TryPause
    });
  };
}
