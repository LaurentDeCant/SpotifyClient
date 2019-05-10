import merge from "lodash/merge";
import { denormalize } from "normalizr";
import {
  NormalizedPlaylist,
  DenormalizedPlaylist,
  DenormalizedTrack
} from "../types";
import { EntitiesAction } from "../actions/types";
import {
  BrowseActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { schemas } from "./schemas";

export interface State {
  [id: string]: NormalizedPlaylist;
}

const initialState: State = {};

function mergePlaylists(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, action.payload.playlists);
}

export default createReducer(initialState, {
  [PlaylistActionType.PlaylistSuccess]: mergePlaylists,
  [BrowseActionType.CategoryPlaylistsSuccess]: mergePlaylists,
  [BrowseActionType.FeaturedPlaylistsSuccess]: mergePlaylists,
  [SearchActionType.SearchSuccess]: mergePlaylists
});

export function selectIsPlaylist(
  state: CombinedState,
  playlistId: string
): boolean {
  return !!state.playlists[playlistId];
}

export function selectPlaylist(
  state: CombinedState,
  playlistId: string
): DenormalizedPlaylist {
  return denormalize(state.playlists[playlistId], schemas.playlist, state);
}

export function selectPlaylists(
  state: CombinedState,
  playlistIds: string[]
): DenormalizedPlaylist[] {
  return playlistIds ? playlistIds.map(id => selectPlaylist(state, id)) : [];
}

export function selectPlayableTracks(
  state: CombinedState,
  playlistId: string
): DenormalizedTrack[] {
  const playlist = selectPlaylist(state, playlistId);
  return playlist && playlist.tracks
    ? playlist.tracks.filter(track => track.preview_url)
    : [];
}

export function selectIsPlayable(
  state: CombinedState,
  playlistId: string
): boolean {
  return !!selectPlayableTracks(state, playlistId).length;
}
