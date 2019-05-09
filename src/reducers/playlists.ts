import merge from "lodash/merge";
import { denormalize } from "normalizr";
import { NormalizedPlaylist, DenormalizedPlaylist } from "../types";
import { EntitiesAction } from "../actions/types";
import { ActionType, PlaylistSuccessAction } from "../actions/playlists";
import { ActionType as BrowseActionType } from "../actions/browse";
import { ActionType as SearchActionType } from "../actions/search";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";
import { schemas } from "./schemas";

export interface State extends FetchableState {
  byId: { [id: string]: NormalizedPlaylist };
}

const initialState: State = {
  isFetching: false,
  byId: {}
};

function mergePlaylists(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, { byId: action.payload.playlists });
}

export default createReducer(initialState, {
  [ActionType.PlaylistRequest]: startFetching,
  [ActionType.PlaylistSuccess]: (
    state: State,
    action: PlaylistSuccessAction
  ): State => endFetching(mergePlaylists(state, action)),
  [ActionType.PlaylistFailure]: endFetching,
  [BrowseActionType.CategoryPlaylistsSuccess]: mergePlaylists,
  [BrowseActionType.FeaturedPlaylistsSuccess]: mergePlaylists,
  [SearchActionType.SearchSuccess]: mergePlaylists
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.playlists);
}

export function selectHasPlaylist(
  state: CombinedState,
  playlistId: string
): boolean {
  return !!state.playlists.byId[playlistId];
}

export function selectPlaylist(
  state: CombinedState,
  playlistId: string
): DenormalizedPlaylist {
  return denormalize(state.playlists.byId[playlistId], schemas.playlist, {
    albums: state.albums.byId,
    artists: state.artists.byId,
    playlists: state.playlists.byId,
    tracks: state.tracks.byId
  });
}

export function selectPlaylists(
  state: CombinedState,
  playlistIds: string[]
): DenormalizedPlaylist[] {
  return playlistIds ? playlistIds.map(id => selectPlaylist(state, id)) : [];
}

export function selectPlayableTrackIds(
  state: CombinedState,
  playlistId: string
): string[] {
  const playlist = selectPlaylist(state, playlistId);
  return playlist.tracks
    .filter(track => track.preview_url)
    .map(track => track.id);
}
