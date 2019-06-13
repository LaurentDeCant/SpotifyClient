import { LibraryActionType as ActionType } from "../actions";
import {
  SavedAlbumsSuccessAction,
  SavedTracksSuccessAction
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
  [ActionType.SavedAlbumsSuccess]: (
    state: State,
    { payload }: SavedAlbumsSuccessAction
  ) => ({ ...state, userAlbumIds: Object.keys(payload.albums || {}) }),
  [ActionType.SavedTracksSuccess]: (
    state: State,
    { payload }: SavedTracksSuccessAction
  ) => ({ ...state, userTrackIds: Object.keys(payload.tracks || {}) })
});

export function selectSavedAlbums(state: CombinedState) {
  return selectAlbums(state)(state.library.userAlbumIds);
}

export function selectSavedTracks(state: CombinedState) {
  return selectTracks(state)(state.library.userTrackIds);
}

export function selectPlayableTracks(state: CombinedState) {
  const tracks = selectSavedTracks(state);
  return tracks ? tracks.filter(track => track.preview_url) : [];
}
