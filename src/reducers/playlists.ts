import createReducer from "../helpers/createReducer";
import { PlaylistTrack, Track } from "../types";
import { ActionType, ReceivePlaylistTracksAction } from "../actions/playlists";
import { State as CombinedState } from ".";

export interface State {
  playlistTracks: PlaylistTrack[];
}

const initialState: State = {
  playlistTracks: []
};

export default createReducer(initialState, {
  [ActionType.ReceivePlaylistTracks]: (
    state: State,
    action: ReceivePlaylistTracksAction
  ) => ({
    ...state,
    playlistTracks: action.payload
  })
});

export function selectPlaylistTracks(state: CombinedState): Track[] {
  return state.playlists.playlistTracks.map(
    playlistTrack => playlistTrack.track
  );
}
