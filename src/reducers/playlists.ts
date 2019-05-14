import merge from "lodash/merge";
import { Playlist } from "../types";
import { EntitiesAction } from "../actions/types";
import {
  BrowseActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { selectTracks } from "./tracks";

export interface State {
  [id: string]: Playlist;
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

export function selectIsPlaylist(state: CombinedState, playlistId: string) {
  return !!state.playlists[playlistId];
}

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
      return tracks;
    }
  }

  return [];
}

export function selectPlaylists(state: CombinedState, playlistIds: string[]) {
  return playlistIds ? playlistIds.map(id => selectPlaylist(state, id)) : [];
}

export function selectPlayableTracks(state: CombinedState, playlistId: string) {
  const tracks = selectPlaylistTracks(state, playlistId);
  return tracks.filter(track => track.preview_url);
}

export function selectIsPlayable(state: CombinedState, playlistId: string) {
  return !!selectPlayableTracks(state, playlistId).length;
}
