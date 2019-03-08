import createReducer from "../helpers/createReducer";
import { Track } from "../types";
import { ActionType, AlbumTracksSuccessAction } from "../actions/albums";
import { State as CombinedState } from ".";

export interface State {
  tracks: Track[];
}

const initialState: State = {
  tracks: []
};

export default createReducer(initialState, {
  [ActionType.AlbumTracksSuccess]: (
    state: State,
    action: AlbumTracksSuccessAction
  ) => ({
    ...state,
    tracks: action.payload
  })
});

export function selectAlbumTracks(state: CombinedState): Track[] {
  return state.albums.tracks;
}
