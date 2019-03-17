import createReducer from "../helpers/reducer";
import { Playlist, PlaylistTrack, Track } from "../types";
import {
  ActionType,
  PlaylistSuccessAction,
  PlaylistTracksSuccessAction
} from "../actions/playlists";
import { State as CombinedState } from ".";
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";

export interface State extends FetchableState {
  playlist?: Playlist;
  playlistTracks: PlaylistTrack[];
}

const initialState: State = {
  fetchs: 0,
  playlist: undefined,
  playlistTracks: []
};

export default createReducer(initialState, {
  [ActionType.PlaylistRequest]: startFetching,
  [ActionType.PlaylistSuccess]: (state: State, action: PlaylistSuccessAction) =>
    endFetching({
      ...state,
      playlist: action.payload
    }),
  [ActionType.PlaylistFailure]: endFetching,

  [ActionType.PlaylistTracksRequest]: startFetching,
  [ActionType.PlaylistTracksSuccess]: (
    state: State,
    action: PlaylistTracksSuccessAction
  ) =>
    endFetching({
      ...state,
      playlistTracks: action.payload
    }),
  [ActionType.PlaylistTracksFailure]: endFetching
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.playlists);
}

export function selectPlaylist(state: CombinedState): Playlist | undefined {
  return state.playlists.playlist;
}

export function selectPlaylistTracks(state: CombinedState): Track[] {
  return state.playlists.playlistTracks
    .filter(playlistTrack => playlistTrack.track)
    .map(playlistTrack => playlistTrack.track);
}
