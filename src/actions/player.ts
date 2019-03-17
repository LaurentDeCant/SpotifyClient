import { Dispatch } from "redux";
import { Track } from "../types";
import { PayloadAction } from "./types";

export enum ActionType {
  LoadTrack = "LOAD_TRACK",
  Loaded = "LOADED",
  Playing = "PLAYING",
  Update = "UPDATE",
  Paused = "PAUSED",
  PlayCurrent = "PLAY_CURRENT",
  PauseCurrent = "PAUSE_CURRENT"
}

export interface LoadTrackAction
  extends PayloadAction<ActionType.LoadTrack, Track> {}

export function loadTrack(track: Track) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Loaded,
      payload: track
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

export function playCurrent() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.PlayCurrent
    });
  };
}

export function pauseCurrent() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.PauseCurrent
    });
  };
}
