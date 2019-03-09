import createReducer from "../helpers/createReducer";
import { Track } from "../types";
import { ActionType, AlbumTracksSuccessAction } from "../actions/albums";
import { State as CombinedState } from ".";
import { startFetching, endFetching } from "./fetching";

export interface State {
  isFetching: boolean;
  tracks: Track[];
}

const initialState: State = {
  isFetching: false,
  tracks: []
};

export default createReducer(initialState, {
  [ActionType.AlbumTracksRequest]: startFetching,
  [ActionType.AlbumTracksSuccess]: (
    state: State,
    action: AlbumTracksSuccessAction
  ) => ({
    ...state,
    isFetching: false,
    tracks: action.payload
  }),
  [ActionType.AlbumTracksFailure]: endFetching
});

export function selectIsFetching(state: CombinedState): boolean {
  return state.albums.isFetching;
}

export function selectAlbumTracks(state: CombinedState): Track[] {
  return state.albums.tracks;
}
