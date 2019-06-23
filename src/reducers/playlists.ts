import merge from "lodash/merge";
import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import {
  BrowseActionType,
  FollowingActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { EntitiesAction } from "../actions/types";
import { State as CombinedState } from ".";
import { PlaylistDictionary } from "./types";
import createReducer from "./createReducer";
import { selectTracks } from "./tracks";
import {
  FollowPlaylistSuccessAction,
  UnfollowPlaylistSuccessAction,
  CheckFollowedPlaylistSuccessAction
} from "../actions/following";

export interface State extends PlaylistDictionary {}

export const initialState: State = {};

function mergePlaylists(state: State, { payload }: EntitiesAction) {
  return merge({}, state, payload.playlists);
}

function updatePlaylist(state: State, playlistId: string, props: any) {
  return {
    ...state,
    [playlistId]: {
      ...state[playlistId],
      ...props
    }
  };
}

export default createReducer(initialState, {
  [PlaylistActionType.PlaylistSuccess]: mergePlaylists,
  [BrowseActionType.CategoryPlaylistsSuccess]: mergePlaylists,
  [BrowseActionType.FeaturedPlaylistsSuccess]: mergePlaylists,
  [SearchActionType.SearchSuccess]: mergePlaylists,
  [FollowingActionType.FollowedPlaylistsSuccess]: mergePlaylists,
  [FollowingActionType.CheckFollowedPlaylistSuccess]: (
    state: State,
    { payload }: CheckFollowedPlaylistSuccessAction
  ) => updatePlaylist(state, payload.playlistId, { isFollowed: payload[0] }),
  [FollowingActionType.FollowPlaylistSuccess]: (
    state: State,
    { payload }: FollowPlaylistSuccessAction
  ) => updatePlaylist(state, payload.playlistId, { isFollowed: true }),
  [FollowingActionType.UnfollowPlaylistSuccess]: (
    state: State,
    { payload }: UnfollowPlaylistSuccessAction
  ) => updatePlaylist(state, payload.playlistId, { isFollowed: false })
});

export function selectPlaylist(
  { playlists }: CombinedState,
  playlistId: string
) {
  return playlists[playlistId];
}

export function selectPlaylistTracks(state: CombinedState, albumId: string) {
  const playlist = selectPlaylist(state, albumId);
  if (playlist) {
    const tracks = selectTracks(state)(playlist.tracks);
    if (tracks) {
      return tracks.filter(track => !!track);
    }
  }

  return [];
}

export const selectPlaylists = createSelector(
  ({ playlists }: CombinedState) => playlists,
  (playlists: PlaylistDictionary) =>
    memoize((playlistIds: string[]) =>
      playlistIds ? playlistIds.map(playlistId => playlists[playlistId]) : []
    )
);

export function selectPlayableTracks(state: CombinedState, playlistId: string) {
  const tracks = selectPlaylistTracks(state, playlistId);
  return tracks ? tracks.filter(track => track.preview_url) : [];
}

export function selectIsPlayable(state: CombinedState, playlistId: string) {
  return !!selectPlayableTracks(state, playlistId).length;
}
