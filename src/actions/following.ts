import { State } from "../reducers";
import { selectArtist } from "../reducers/artists";
import { selectPlaylist } from "../reducers/playlists";
import { fetchJson } from "../utils/authorization";
import { FollowingActionType as ActionType } from ".";
import {
  EntitiesAction,
  FetchDispatch,
  FetchMethod,
  PayloadAction
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

export async function checkFollowedArtist(artistId: string) {
  const array = await fetchJson(
    `${
      process.env.REACT_APP_BASE_URL
    }/me/following/contains?type=artist&ids=${artistId}`
  );
  return array[0];
}

export interface FollowArtistSuccessAction
  extends PayloadAction<ActionType.FollowArtistSuccess, { artistId: string }> {}

export interface UnfollowArtistSuccessAction
  extends PayloadAction<
    ActionType.UnfollowArtistSuccess,
    { artistId: string }
  > {}

export function toggleFollowArtist(artistId: string) {
  return (dispatch: FetchDispatch, getState: () => State) => {
    const state = getState();
    const artist = selectArtist(state, artistId);
    let types, method;
    if (artist.isFollowed) {
      types = [
        ActionType.UnfollowArtistRequest,
        ActionType.UnfollowArtistSuccess,
        ActionType.UnfollowArtistFailure
      ];
      method = FetchMethod.Delete;
    } else {
      types = [
        ActionType.FollowArtistRequest,
        ActionType.FollowArtistSuccess,
        ActionType.FollowArtistFailure
      ];
      method = FetchMethod.Put;
    }
    dispatch({
      types,
      path: `me/following?type=artist&ids=${artistId}`,
      method,
      data: { artistId }
    });
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

export async function checkFollowedPlaylist(
  playlistId: string,
  userId: string
) {
  const array = await fetchJson(
    `${
      process.env.REACT_APP_BASE_URL
    }/playlists/${playlistId}/followers/contains?ids=${userId}`
  );
  return array[0];
}

export interface FollowPlaylistSuccessAction
  extends PayloadAction<
    ActionType.FollowPlaylistSuccess,
    { playlistId: string }
  > {}

export interface UnfollowPlaylistSuccessAction
  extends PayloadAction<
    ActionType.UnfollowPlaylistSuccess,
    { playlistId: string }
  > {}

export function toggleFollowPlaylist(playlistId: string) {
  return (dispatch: FetchDispatch, getState: () => State) => {
    const state = getState();
    const playlist = selectPlaylist(state, playlistId);
    let types, method;
    if (playlist.isFollowed) {
      types = [
        ActionType.UnfollowPlaylistRequest,
        ActionType.UnfollowPlaylistSuccess,
        ActionType.UnfollowPlaylistFailure
      ];
      method = FetchMethod.Delete;
    } else {
      types = [
        ActionType.FollowPlaylistRequest,
        ActionType.FollowPlaylistSuccess,
        ActionType.FollowPlaylistFailure
      ];
      method = FetchMethod.Put;
    }
    dispatch({
      types,
      path: `playlists/${playlistId}/followers`,
      method,
      data: { playlistId }
    });
  };
}
