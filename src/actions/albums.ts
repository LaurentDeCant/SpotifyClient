import { Album, Track } from "../types";
import { PayloadAction, FetchDispatch } from "./types";

export enum ActionType {
  AlbumRequest = "ALBUM_REQUEST",
  AlbumSuccess = "ALBUM_SUCCESS",
  AlbumFailure = "ALBUM_FAILURE",
  AlbumTracksRequest = "ALBUM_TRACKS_REQUEST",
  AlbumTracksSuccess = "ALBUM_TRACKS_SUCCESS",
  AlbumTracksFailure = "ALBUM_TRACKS_FAILURE"
}

export interface AlbumSuccessAction
  extends PayloadAction<ActionType.AlbumSuccess, Album> {}

export function getAlbum(albumId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.AlbumRequest,
        ActionType.AlbumSuccess,
        ActionType.AlbumFailure
      ],
      path: `albums/${albumId}`
    });
  };
}

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
