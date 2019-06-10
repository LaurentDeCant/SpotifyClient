import { State } from "../reducers";
import { selectArtist } from "../reducers/artists";
import { selectPlaylist } from "../reducers/playlists";
import { FollowingActionType as ActionType } from ".";
import {
  PayloadAction,
  EntitiesAction,
  FetchDispatch,
  FetchMethod
} from "./types";
import { Schemas } from "./schemas";

export interface FollowedArtistsSuccessAction
  extends EntitiesAction<ActionType.FollowedArtistsSuccess> {}

export function getFollowedArtists() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.FollowedArtistsRequest,
        ActionType.FollowedArtistsSuccess,
        ActionType.FollowedArtistsFailure
      ],
      path: "me/following?type=artist",
      schema: Schemas.PagedArtists
    });
  };
}

export interface CheckFollowedArtistSuccessAction
  extends PayloadAction<
    ActionType.CheckFollowedArtistSuccess,
    { artistId: string; [key: number]: boolean }
  > {}

export function checkFollowedArtist(artistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.CheckFollowedArtistRequest,
        ActionType.CheckFollowedArtistSuccess,
        ActionType.CheckFollowedArtistFailure
      ],
      path: `me/following/contains?type=artist&ids=${artistId}`,
      data: { artistId }
    });
  };
}

export interface FollowArtistSuccessAction
  extends PayloadAction<ActionType.FollowArtistSuccess, { artistId: string }> {}

function followArtist(artistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.FollowArtistRequest,
        ActionType.FollowArtistSuccess,
        ActionType.FollowArtistFailure
      ],
      path: `me/following?type=artist&ids=${artistId}`,
      method: FetchMethod.Put,
      data: { artistId }
    });
  };
}

export interface UnfollowArtistSuccessAction
  extends PayloadAction<
    ActionType.UnfollowArtistSuccess,
    { artistId: string }
  > {}

function unfollowArtist(artistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.UnfollowArtistRequest,
        ActionType.UnfollowArtistSuccess,
        ActionType.UnfollowArtistFailure
      ],
      path: `me/following?type=artist&ids=${artistId}`,
      method: FetchMethod.Delete,
      data: { artistId }
    });
  };
}

export function toggleFollowArtist(artistId: string) {
  return (dispatch: FetchDispatch, getState: () => State) => {
    const state = getState();
    const artist = selectArtist(state, artistId);
    if (artist.isFollowed) {
      unfollowArtist(artistId)(dispatch);
    } else {
      followArtist(artistId)(dispatch);
    }
  };
}

export interface FollowedPlaylistsSuccessAction
  extends EntitiesAction<ActionType.FollowedPlaylistsSuccess> {}

export function getFollowedPlaylists() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.FollowedPlaylistsRequest,
        ActionType.FollowedPlaylistsSuccess,
        ActionType.FollowedPlaylistsFailure
      ],
      path: "me/playlists",
      schema: Schemas.PagedPlaylists
    });
  };
}

export interface CheckFollowedPlaylistSuccessAction
  extends PayloadAction<
    ActionType.CheckFollowedPlaylistSuccess,
    { playlistId: string; [key: number]: boolean }
  > {}

export function checkFollowedPlaylist(playlistId: string, userId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.CheckFollowedPlaylistRequest,
        ActionType.CheckFollowedPlaylistSuccess,
        ActionType.CheckFollowedPlaylistFailure
      ],
      path: `playlists/${playlistId}/followers/contains?ids=${userId}`,
      data: { playlistId }
    });
  };
}

export interface FollowPlaylistSuccessAction
  extends PayloadAction<
    ActionType.FollowPlaylistSuccess,
    { playlistId: string }
  > {}

function followPlaylist(playlistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.FollowPlaylistRequest,
        ActionType.FollowPlaylistSuccess,
        ActionType.FollowPlaylistFailure
      ],
      path: `playlists/${playlistId}/followers`,
      method: FetchMethod.Put,
      data: { playlistId }
    });
  };
}

export interface UnfollowPlaylistSuccessAction
  extends PayloadAction<
    ActionType.UnfollowPlaylistSuccess,
    { playlistId: string }
  > {}

function unfollowPlaylist(playlistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.UnfollowPlaylistRequest,
        ActionType.UnfollowPlaylistSuccess,
        ActionType.UnfollowPlaylistFailure
      ],
      path: `playlists/${playlistId}/followers`,
      method: FetchMethod.Delete,
      data: { playlistId }
    });
  };
}

export function toggleFollowPlaylist(playlistId: string) {
  return (dispatch: FetchDispatch, getState: () => State) => {
    const state = getState();
    const playlist = selectPlaylist(state, playlistId);
    if (playlist.isFollowed) {
      unfollowPlaylist(playlistId)(dispatch);
    } else {
      followPlaylist(playlistId)(dispatch);
    }
  };
}
