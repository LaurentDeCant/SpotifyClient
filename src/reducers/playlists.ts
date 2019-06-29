import merge from "lodash/merge";
import {
  BrowseActionType,
  FollowingActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { EntitiesAction } from "../actions/types";
import {
  FollowPlaylistSuccessAction,
  UnfollowPlaylistSuccessAction,
  CheckFollowedPlaylistSuccessAction
} from "../actions/following";
import { PlaylistDictionary } from "./types";
import createReducer from "./createReducer";

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
