import { LibraryActionType as ActionType } from "../actions";
import {
  SavedAlbumsSuccessAction,
  SavedTracksSuccessAction
} from "../actions/library";
import createReducer from "./createReducer";

export interface State {
  userAlbumIds: string[];
  userTrackIds: string[];
}

export const initialState: State = {
  userAlbumIds: [],
  userTrackIds: []
};

export default createReducer(initialState, {
  [ActionType.SavedAlbumsSuccess]: (
    state: State,
    { payload }: SavedAlbumsSuccessAction
  ) => ({ ...state, userAlbumIds: Object.keys(payload.albums || {}) }),
  [ActionType.SavedTracksSuccess]: (
    state: State,
    { payload }: SavedTracksSuccessAction
  ) => ({ ...state, userTrackIds: Object.keys(payload.tracks || {}) })
});
