import {
  ActionType,
  UserAlbumsSuccessAction,
  UserTracksSuccessAction
} from "../actions/library";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { selectAlbums } from "./albums";
import { selectTracks } from "./tracks";

export interface State {
  userAlbumIds: string[];
  userTrackIds: string[];
}

const initialState: State = {
  userAlbumIds: [],
  userTrackIds: []
};

export default createReducer(initialState, {
  [ActionType.UserAlbumsSuccess]: (
    state: State,
    { payload }: UserAlbumsSuccessAction
  ) => ({ ...state, userAlbumIds: Object.keys(payload.albums || {}) }),
  [ActionType.UserTracksSuccess]: (
    state: State,
    { payload }: UserTracksSuccessAction
  ) => ({ ...state, userTrackIds: Object.keys(payload.tracks || {}) })
});

export function selectUserAlbums(state: CombinedState) {
  return selectAlbums(state)(state.library.userAlbumIds);
}

export function selectUserTracks(state: CombinedState) {
  return selectTracks(state)(state.library.userTrackIds);
}
