import merge from "lodash/merge";
import createReducer from "../helpers/reducer";
import { Playlist } from "../types";
import { EntitiesAction } from "../actions/types";
import { ActionType, PlaylistSuccessAction } from "../actions/playlists";
import { ActionType as BrowseActionType } from "../actions/browse";
import { State as CombinedState } from ".";
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";
import { selectTracks } from "./tracks";

export interface State extends FetchableState {
  byId: { [id: string]: Playlist };
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
  [BrowseActionType.FeaturedPlaylistsSuccess]: mergePlaylists
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.playlists);
}

export function selectPlaylist(
  state: CombinedState,
  playlistId: string
): Playlist {
  let playlist = state.playlists.byId[playlistId];

  if (playlist) {
    playlist = { ...playlist, tracks: selectTracks(state, playlist.trackIds) };
  }

  return playlist;
}

export function selectPlaylists(
  state: CombinedState,
  playlistIds: string[]
): Playlist[] {
  return playlistIds ? playlistIds.map(id => selectPlaylist(state, id)) : [];
}
