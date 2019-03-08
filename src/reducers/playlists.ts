import createReducer from "../helpers/createReducer";
import { PlaylistTrack, Track } from "../types";
import { ActionType, PlaylistTracksSuccessAction } from "../actions/playlists";
import { State as CombinedState } from ".";

export interface State {
  playlistTracks: PlaylistTrack[];
}

const initialState: State = {
  playlistTracks: []
};

export default createReducer(initialState, {
  [ActionType.PlaylistTracksSuccess]: (
    state: State,
    action: PlaylistTracksSuccessAction
  ) => ({
    ...state,
    playlistTracks: action.payload
  })
});

export function selectPlaylistTracks(state: CombinedState): Track[] {
  return state.playlists.playlistTracks
    .filter(playlistTrack => playlistTrack.track)
    .map(playlistTrack => playlistTrack.track);
}
