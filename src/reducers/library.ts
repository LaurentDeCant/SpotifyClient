import createReducer from "./createReducer";
import {
  ActionType,
  UserAlbumsSuccessAction,
  UserTracksSuccessAction
} from "../actions/library";

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
