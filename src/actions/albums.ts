import { Action, Dispatch } from "redux";
import { Track } from "../types";
import PayloadAction from "./types";
import { authorizedFetch } from "../helpers/authorization";

export enum ActionType {
  RequestAlbumTracks = "REQUEST_ALBUM_TRACKS",
  ReceiveAlbumTracks = "RECEIVE_ALBUM_TRACKS"
}

export interface RequestAlbumTracksAction
  extends Action<ActionType.RequestAlbumTracks> {}

function requestAlbumTracks(): RequestAlbumTracksAction {
  return {
    type: ActionType.RequestAlbumTracks
  };
}

export interface ReceiveAlbumTracksAction
  extends PayloadAction<ActionType.ReceiveAlbumTracks, Track[]> {}

function receiveAlbumTracks(tracks: Track[]): ReceiveAlbumTracksAction {
  return {
    type: ActionType.ReceiveAlbumTracks,
    payload: tracks
  };
}

export function getAlbumTracks(albumId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(requestAlbumTracks());
    const response = await authorizedFetch(
      `${process.env.REACT_APP_BASE_URL}/albums/${albumId}/tracks`
    );
    const json = await response.json();
    dispatch(receiveAlbumTracks(json.items));
  };
}
