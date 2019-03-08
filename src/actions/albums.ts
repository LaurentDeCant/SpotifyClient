import { Action } from "redux";
import { Track } from "../types";
import { FetchDispatch, PayloadAction } from "./types";

export enum ActionType {
  AlbumTracksRequest = "ALBUM_TRACKS_REQUEST",
  AlbumTracksSuccess = "ALBUM_TRACKS_SUCCESS",
  AlbumTracksFailure = "ALBUM_TRACKS_FAILURE"
}

export interface AlbumTracksRequestAction
  extends Action<ActionType.AlbumTracksRequest> {}

export interface AlbumTracksSuccessAction
  extends PayloadAction<ActionType.AlbumTracksSuccess, Track[]> {}

export function getAlbumTracks(albumId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.AlbumTracksRequest,
        ActionType.AlbumTracksSuccess,
        ActionType.AlbumTracksFailure
      ],
      path: `albums/${albumId}/tracks`,
      select: (object: any) => object.items
    });
  };
}
