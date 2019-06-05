import { FetchDispatch } from "./types";
import { Schemas } from "./schemas";

export enum ActionType {
  AlbumsRequest = "ALBUM_REQUEST",
  AlbumsSuccess = "ALBUM_SUCCESS",
  AlbumsFailure = "ALBUM_FAILURE",
  TracksRequest = "TRACKS_REQUEST",
  TracksSuccess = "TRACKS_SUCCESS",
  TracksFailure = "TRACKS_FAILURE"
}

export function getAlbums() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.AlbumsRequest,
        ActionType.AlbumsSuccess,
        ActionType.AlbumsFailure
      ],
      path: "me/albums",
      schema: Schemas.Albums
    });
  };
}

export function getTracks() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.TracksRequest,
        ActionType.TracksSuccess,
        ActionType.TracksFailure
      ],
      path: "me/tracks",
      schema: Schemas.Tracks
    });
  };
}
