import createReducer from "../helpers/createReducer";
import { Album, Track } from "../types";
import {
  ActionType,
  AlbumSuccessAction,
  AlbumTracksSuccessAction
} from "../actions/albums";
import { State as CombinedState } from ".";
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";

export interface State extends FetchableState {
  album?: Album;
  tracks: Track[];
}

const initialState: State = {
  fetchs: 0,
  album: undefined,
  tracks: []
};

export default createReducer(initialState, {
  [ActionType.AlbumRequest]: startFetching,
  [ActionType.AlbumSuccess]: (state: State, action: AlbumSuccessAction) =>
    endFetching({
      ...state,
      album: action.payload
    }),
  [ActionType.AlbumFailure]: endFetching,

  [ActionType.AlbumTracksRequest]: startFetching,
  [ActionType.AlbumTracksSuccess]: (
    state: State,
    action: AlbumTracksSuccessAction
  ) =>
    endFetching({
      ...state,
      tracks: action.payload
    }),
  [ActionType.AlbumTracksFailure]: endFetching
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.albums);
}

export function selectAlbum(state: CombinedState): Album | undefined {
  return state.albums.album;
}

export function selectAlbumTracks(state: CombinedState): Track[] {
  return state.albums.tracks;
}
