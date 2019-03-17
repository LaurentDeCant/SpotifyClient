import createReducer from "../helpers/reducer";
import { Playlist, Track } from "../types";
import { ActionType, PlaylistSuccessAction } from "../actions/playlists";
import { State as CombinedState } from ".";
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";

export interface State extends FetchableState {
  playlist?: Playlist;
}

const initialState: State = {
  fetchs: 0,
  playlist: undefined
};

export default createReducer(initialState, {
  [ActionType.PlaylistRequest]: startFetching,
  [ActionType.PlaylistSuccess]: (state: State, action: PlaylistSuccessAction) =>
    endFetching({
      ...state,
      playlist: action.payload
    }),
  [ActionType.PlaylistFailure]: endFetching
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.playlists);
}

export function selectPlaylist(state: CombinedState): Playlist | undefined {
  return state.playlists.playlist;
}

export function selectPlaylistTracks(state: CombinedState): Track[] {
  const { playlist } = state.playlists;

  return playlist
    ? playlist.tracks.items
        .filter(playlistTrack => playlistTrack.track)
        .map(playlistTrack => playlistTrack.track)
    : [];
}
