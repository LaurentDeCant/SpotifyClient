import { EntitiesAction, FetchDispatch } from "./types";
import { Schemas } from "./schemas";

export enum ActionType {
  UserArtistsRequest = "USER_ARTISTS_REQUEST",
  UserArtistsSuccess = "USER_ARTISTS_SUCCESS",
  UserArtistsFailure = "USER_ARTISTS_FAILURE",
  UserPlaylistsRequest = "USER_PLAYLISTS_REQUEST",
  UserPlaylistsSuccess = "USER_PLAYLISTS_SUCCESS",
  UserPlaylistsFailure = "USER_PLAYLISTS_FAILURE"
}

export interface UserArtistsSuccessAction
  extends EntitiesAction<ActionType.UserArtistsSuccess> {}

export function getUserArtists() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.UserArtistsRequest,
        ActionType.UserArtistsSuccess,
        ActionType.UserArtistsFailure
      ],
      path: "me/following?type=artist",
      schema: Schemas.PagedArtists
    });
  };
}

export interface UserPlaylistsSuccessAction
  extends EntitiesAction<ActionType.UserPlaylistsSuccess> {}

export function getUserPlaylists() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.UserPlaylistsRequest,
        ActionType.UserPlaylistsSuccess,
        ActionType.UserPlaylistsFailure
      ],
      path: `me/playlists`,
      schema: Schemas.PagedPlaylists
    });
  };
}
