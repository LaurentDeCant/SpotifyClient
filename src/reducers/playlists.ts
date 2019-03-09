import createReducer from "../helpers/createReducer";
import { PlaylistTrack, Track } from "../types";
import { ActionType, PlaylistTracksSuccessAction } from "../actions/playlists";
import { State as CombinedState } from ".";
import { startFetching, endFetching } from "./fetching";

export interface State {
  isFetching: boolean;
  playlistTracks: PlaylistTrack[];
}

const initialState: State = {
  isFetching: true,
  playlistTracks: []
};

export default createReducer(initialState, {
  [ActionType.PlaylistTracksRequest]: startFetching,
  [ActionType.PlaylistTracksSuccess]: (
    state: State,
    action: PlaylistTracksSuccessAction
  ) => ({
    ...state,
    isFetching: false,
    playlistTracks: action.payload
  }),
  [ActionType.PlaylistTracksFailure]: endFetching
});

export function selectIsFetching(state: CombinedState): boolean {
  return state.playlists.isFetching;
}

export function selectPlaylistTracks(state: CombinedState): Track[] {
  return state.playlists.playlistTracks
    .filter(playlistTrack => playlistTrack.track)
    .map(playlistTrack => playlistTrack.track);
}
