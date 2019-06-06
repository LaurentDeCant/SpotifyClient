import { EntitiesAction, FetchDispatch } from "./types";
import { Schemas } from "./schemas";

export enum ActionType {
  UserAlbumsRequest = "USER_ALBUMS_REQUEST",
  UserAlbumsSuccess = "USER_ALBUMS_SUCCESS",
  UserAlbumsFailure = "USER_ALBUMS_FAILURE",
  UserTracksRequest = "USER_TRACKS_REQUEST",
  UserTracksSuccess = "USER_TRACKS_SUCCESS",
  UserTracksFailure = "USER_TRACKS_FAILURE"
}

export interface UserAlbumsSuccessAction
  extends EntitiesAction<ActionType.UserAlbumsSuccess> {}

export function getUserAlbums() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.UserAlbumsRequest,
        ActionType.UserAlbumsSuccess,
        ActionType.UserAlbumsFailure
      ],
      path: "me/albums",
      schema: Schemas.PagedAlbums
    });
  };
}

export interface UserTracksSuccessAction
  extends EntitiesAction<ActionType.UserTracksSuccess> {}

export function getUserTracks() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.UserTracksRequest,
        ActionType.UserTracksSuccess,
        ActionType.UserTracksFailure
      ],
      path: "me/tracks",
      schema: Schemas.PagedTracks
    });
  };
}
