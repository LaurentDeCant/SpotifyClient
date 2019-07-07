import { merge } from "lodash";
import {
  AlbumActionType,
  ArtistActionType,
  LibraryActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { EntitiesAction } from "../actions/types";
import {
  SaveTrackSuccessAction,
  UnsaveTrackSuccessAction,
  CheckSavedTrackSuccess
} from "../actions/library";
import { TrackDictionary } from "./types";
import createReducer from "./createReducer";

export interface State extends TrackDictionary {}

export const initialState: State = {};

function mergeTracks(state: State, { payload }: EntitiesAction) {
  return merge({}, state, payload.tracks);
}

function updateTrack(state: State, trackId: string, props: any) {
  return {
    ...state,
    [trackId]: {
      ...state[trackId],
      ...props
    }
  };
}

export default createReducer(initialState, {
  [AlbumActionType.AlbumSuccess]: mergeTracks,
  [ArtistActionType.ArtistTopTracksSuccess]: mergeTracks,
  [PlaylistActionType.PlaylistSuccess]: mergeTracks,
  [SearchActionType.SearchSuccess]: mergeTracks,
  [LibraryActionType.SavedAlbumsSuccess]: mergeTracks,
  [LibraryActionType.SavedTracksSuccess]: mergeTracks,
  [LibraryActionType.CheckSavedTracksSuccess]: (
    state: State,
    { payload }: CheckSavedTrackSuccess
  ) =>
    payload.trackIds.reduce(
      (previous, current, index) =>
        updateTrack(previous, current, { isSaved: payload[index] }),
      state
    ),
  [LibraryActionType.SaveTrackSuccess]: (
    state: State,
    { payload }: SaveTrackSuccessAction
  ) => updateTrack(state, payload.trackId, { isSaved: true }),
  [LibraryActionType.UnsaveTrackSuccess]: (
    state: State,
    { payload }: UnsaveTrackSuccessAction
  ) => updateTrack(state, payload.trackId, { isSaved: false })
});
