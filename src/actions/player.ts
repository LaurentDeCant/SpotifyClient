import { Dispatch } from "redux";
import { PayloadAction } from "./types";

export enum ActionType {
  Load = "LOAD",
  Loaded = "LOADED",
  Playing = "PLAYING",
  Update = "UPDATE",
  Play = "PLAY",
  Pause = "PAUSE",
  Paused = "PAUSED",
  Seek = "SEEK",
  Seeked = "SEEKED"
}

export interface LoadAction extends PayloadAction<ActionType.Load, string> {}

export function load(trackId: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Load,
      payload: trackId
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

export function play() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Play
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

export function paused() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Paused
    });
  };
}

export interface SeekAction extends PayloadAction<ActionType.Seek, number> {}

export function seek(time: number) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Seek,
      payload: time
    });
  };
}

export function seeked() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Seeked
    });
  };
}
