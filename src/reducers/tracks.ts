import { createSelector } from "reselect";
import merge from "lodash/merge";
import memoize from "lodash/memoize";
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
import { State as CombinedState } from ".";
import { TrackDictionary } from "./types";
import createReducer from "./createReducer";
import { selectAlbum } from "./albums";
import { selectArtists } from "./artists";

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

export function selectTrack({ tracks }: CombinedState, trackId: string) {
  return tracks[trackId];
}

export function selectTrackAlbum(state: CombinedState, trackId: string) {
  const track = selectTrack(state, trackId);
  if (track) {
    return selectAlbum(state, track.album);
  }
}

export function selectTrackArtists(state: CombinedState, trackId: string) {
  const track = selectTrack(state, trackId);
  return track ? selectArtists(state)(track.artists) : [];
}

export const selectTracks = createSelector(
  (state: CombinedState) => state.tracks,
  (tracks: TrackDictionary) =>
    memoize((trackIds: string[]) =>
      trackIds ? trackIds.map(trackId => tracks[trackId]) : []
    )
);
